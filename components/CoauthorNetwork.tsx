"use client";

import React from 'react';
import { publications } from '@/data/publications';
import { YOUR_NAME } from '@/data/publications';
import type { Simulation, SimulationNodeDatum, SimulationLinkDatum, ForceLink, ForceManyBody, ForceCollide } from 'd3-force';

// Simulation node/link typings to avoid using `any` everywhere
interface SimNode extends SimulationNodeDatum {
    id: string;
    name: string;
    degree: number;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
    source: string | SimNode;
    target: string | SimNode;
    value?: number;
}

type Node = { id: string; name: string; degree: number; x?: number; y?: number };
type Link = { source: string; target: string; weight: number };

function buildCoauthorGraph() {
    const edgeMap = new Map<string, number>();
    const nodeMap = new Map<string, number>();

    publications.forEach(pub => {
        const authors = pub.authors || [];
        // ensure node exists
        authors.forEach(a => nodeMap.set(a, nodeMap.get(a) || 0));
        for (let i = 0; i < authors.length; i++) {
            for (let j = i + 1; j < authors.length; j++) {
                const a = authors[i];
                const b = authors[j];
                const key = a < b ? `${a}|||${b}` : `${b}|||${a}`;
                edgeMap.set(key, (edgeMap.get(key) || 0) + 1);
            }
        }
    });

    // compute node degrees from edges
    edgeMap.forEach((w, key) => {
        const [a, b] = key.split('|||');
        nodeMap.set(a, (nodeMap.get(a) || 0) + w);
        nodeMap.set(b, (nodeMap.get(b) || 0) + w);
    });

    const nodes: Node[] = Array.from(nodeMap.entries()).map(([name]) => ({
        id: name,
        name,
        degree: nodeMap.get(name) || 0
    }));

    const links: Link[] = Array.from(edgeMap.entries()).map(([key, weight]) => {
        const [a, b] = key.split('|||');
        return { source: a, target: b, weight };
    });

    return { nodes, links };
}

export default function CoauthorNetwork({ width = 760, height = 460 }: { width?: number; height?: number }) {
    const [layoutReady, setLayoutReady] = React.useState(false);
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [links, setLinks] = React.useState<Link[]>([]);

    // pan & zoom state
    // start with no translation — the simulation places nodes in absolute svg user coords
    // so a group translate of 0,0 will show them where the simulation put them.
    const [tx, setTx] = React.useState(0);
    const [ty, setTy] = React.useState(0);
    const [scale, setScale] = React.useState(1);

    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const simRef = React.useRef<Simulation<SimNode, SimLink> | null>(null);
    const draggingNodeRef = React.useRef<string | null>(null);
    const dragPointerIdRef = React.useRef<number | null>(null);

    // responsive sizing: measure container and use sizes for viewBox/simulation
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    // start at 0 so we don't start the simulation with a stale default size —
    // measurement effect will set the real size and then layout will begin.
    const [containerWidth, setContainerWidth] = React.useState<number>(0);
    const [containerHeight, setContainerHeight] = React.useState<number>(0);

    // tooltip & selection state
    const [hoverAuthor, setHoverAuthor] = React.useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = React.useState<{ left: number; top: number } | null>(null);
    const [selectedAuthor, setSelectedAuthor] = React.useState<string | null>(null);
    const [selectedPubs, setSelectedPubs] = React.useState<typeof publications>([]);
    // computed outer height to fill remaining viewport under header
    const [outerHeight, setOuterHeight] = React.useState<string>('60vh');

    // layout tuning parameters (exposed via small UI)
    const [linkBaseDistance, setLinkBaseDistance] = React.useState<number>(160);
    const [chargeStrength, setChargeStrength] = React.useState<number>(-320);
    const [collideBaseRadius, setCollideBaseRadius] = React.useState<number>(18);
    const [centerStrength, setCenterStrength] = React.useState<number>(1);
    const [radialStrength, setRadialStrength] = React.useState<number>(0.05);
    const [controlsOpen, setControlsOpen] = React.useState<boolean>(true);

    // pointer move/up listeners to handle node dragging
    React.useEffect(() => {
        const clientToSvg = (clientX: number, clientY: number) => {
            const svg = svgRef.current;
            if (!svg) return { x: clientX, y: clientY };
            const pt = (svg as SVGSVGElement).createSVGPoint();
            pt.x = clientX;
            pt.y = clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return { x: clientX, y: clientY };
            const inv = ctm.inverse();
            const p = pt.matrixTransform(inv);
            return { x: p.x, y: p.y };
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!draggingNodeRef.current) return;
            if (!svgRef.current) return;
            if (dragPointerIdRef.current != null && e.pointerId !== dragPointerIdRef.current) return;
                const p = clientToSvg(e.clientX, e.clientY);
                const x = p.x / scale - tx;
                const y = p.y / scale - ty;
            if (simRef.current) {
                const simNode = simRef.current.nodes().find((d: SimNode) => d.id === draggingNodeRef.current);
                if (simNode) {
                    simNode.fx = x;
                    simNode.fy = y;
                }
            }
        };

        const onPointerUp = (e: PointerEvent) => {
            if (!draggingNodeRef.current) return;
            if (dragPointerIdRef.current != null && e.pointerId !== dragPointerIdRef.current) return;
            if (simRef.current) {
                const simNode = simRef.current.nodes().find((d: SimNode) => d.id === draggingNodeRef.current);
                if (simNode) {
                    simNode.fx = null;
                    simNode.fy = null;
                    simRef.current.alphaTarget(0);
                }
            }
            try {
                // release pointer capture if possible
                const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
                if (el && dragPointerIdRef.current != null) {
                    try { (el as Element).releasePointerCapture(dragPointerIdRef.current); } catch { }
                }
            } catch {
                // ignore
            }
            draggingNodeRef.current = null;
            dragPointerIdRef.current = null;
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [scale, tx, ty, layoutReady]);

    // Run layout only after we have measured the container size (so centering is correct).
    React.useEffect(() => {
        // guard: don't start until we have a sensible measured size
        if (containerWidth < 100 || containerHeight < 80) return;
        // also don't start if simulation already created
        if (simRef.current) return;
        const { nodes: n, links: l } = buildCoauthorGraph();

        let mounted = true;
    (async () => {
            // Use measured container size for layout centering
            const cxLocal = containerWidth / 2;
            const cyLocal = containerHeight / 2;

            try {
                const d3 = (await import('d3-force')) as typeof import('d3-force');
                const simNodes: SimNode[] = n.map(d => ({ ...d }));
                const simLinks: SimLink[] = l.map(d => ({ source: d.source, target: d.target, value: d.weight }));

                const simulation = d3.forceSimulation(simNodes)
                    .force('link', d3.forceLink(simLinks).id((d: SimulationNodeDatum) => (d as SimNode).id).distance((d: SimulationLinkDatum<SimNode>) => linkBaseDistance - Math.min(80, ((d as SimLink).value ?? 0) * 10)))
                    .force('charge', d3.forceManyBody().strength(chargeStrength as unknown as number))
                    .force('collide', d3.forceCollide().radius((d: SimulationNodeDatum) => collideBaseRadius + Math.min(14, ((d as SimNode).degree ?? 0) * 0.7)).iterations(3))
                    .force('center', d3.forceCenter(cxLocal, cyLocal).strength(centerStrength))
                    .force('centering', d3.forceRadial(Math.min(cxLocal, cyLocal) * 0.7, cxLocal, cyLocal).strength(radialStrength));

                simRef.current = simulation;

                simulation.on('tick', () => {
                    if (!mounted) return;
                    setNodes(simNodes.map((nd: SimNode) => ({ ...nd })));
                    setLinks(l);
                });

                simulation.alpha(1).restart();
                setLayoutReady(true);
            } catch {
                // fallback radial
                const you = n.find(x => x.id === YOUR_NAME) || null;
                const others = n.filter(x => x.id !== YOUR_NAME).sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name));
                const radiusBase = Math.min(containerWidth || width, containerHeight || height) / 3.2;

                const positions = new Map<string, { x: number; y: number }>();
                if (you) positions.set(you.id, { x: (containerWidth || width) / 2, y: (containerHeight || height) / 2 });
                const total = others.length;
                others.forEach((node, i) => {
                    const angle = (i / Math.max(1, total)) * Math.PI * 2;
                    const r = radiusBase - Math.min(60, node.degree * 8);
                    positions.set(node.id, { x: (containerWidth || width) / 2 + Math.cos(angle) * r, y: (containerHeight || height) / 2 + Math.sin(angle) * r });
                });

                const positioned = n.map(nd => ({ ...nd, ...(positions.get(nd.id) || { x: width / 2, y: height / 2 }) }));
                setNodes(positioned);
                setLinks(l);
                setLayoutReady(true);
            }
        })();

        return () => {
            // mark this layout run as no longer mounted so async callbacks stop
            mounted = false;
                // stop any running simulation from the previous run and clear the ref
            // IMPORTANT: we clear simRef.current so a subsequent effect run (e.g. after resize)
            // will recreate and restart the simulation instead of leaving a stopped sim.
            if (simRef.current) {
                try { simRef.current.stop(); } catch { }
                try { simRef.current = null; } catch { /* ignore */ }
            }
        };
    }, [containerWidth, containerHeight]);

    // measure wrapper/svg so component fills available space
    React.useEffect(() => {
        const el = wrapperRef.current || svgRef.current;
        if (!el) return;
        const update = (rect: DOMRect) => {
            setContainerWidth(Math.max(100, Math.floor(rect.width)));
            setContainerHeight(Math.max(80, Math.floor(rect.height)));
        };

        const rect = (el as Element).getBoundingClientRect();
        update(rect);

        const ro = new ResizeObserver(entries => {
            for (const entry of entries) {
                const r = entry.contentRect;
                setContainerWidth(Math.max(100, Math.floor(r.width)));
                setContainerHeight(Math.max(80, Math.floor(r.height)));
            }
        });
    try { ro.observe(el as Element); } catch { }
        return () => {
            ro.disconnect();
            // clear any pending hover timeout on unmount
            if (hoverTimeoutRef.current) {
                window.clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
        };
    }, [layoutReady]);

    const cx = containerWidth / 2;
    const cy = containerHeight / 2;

    // when any tuning parameter changes, update the live simulation forces
    React.useEffect(() => {
        const sim = simRef.current;
        if (!sim) return;
        let cancelled = false;
        (async () => {
                try {
                    const d3 = (await import('d3-force')) as typeof import('d3-force');
                    // update link distance
                    const linkF = sim.force('link') as unknown as ForceLink<SimNode, SimLink> | undefined;
                    if (linkF && typeof linkF.distance === 'function') {
                        linkF.distance((d: SimulationLinkDatum<SimNode>) => linkBaseDistance - Math.min(80, ((d as SimLink).value ?? 0) * 10));
                    }
                    // update charge
                    const chargeF = sim.force('charge') as unknown as ForceManyBody<SimNode> | undefined;
                    if (chargeF && typeof chargeF.strength === 'function') {
                        chargeF.strength(chargeStrength as unknown as number);
                    }
                    // update collide radius function
                    const collideF = sim.force('collide') as unknown as ForceCollide<SimNode> | undefined;
                    if (collideF && typeof collideF.radius === 'function') {
                        collideF.radius((d: SimulationNodeDatum) => collideBaseRadius + Math.min(14, ((d as SimNode).degree ?? 0) * 0.7));
                    }
                // replace center & radial forces so they capture new cx/cy and strengths
                sim.force('center', d3.forceCenter(cx, cy).strength(centerStrength));
                sim.force('centering', d3.forceRadial(Math.min(cx, cy) * 0.7, cx, cy).strength(radialStrength));

                if (!cancelled) sim.alphaTarget(0.25).restart();
            } catch {
                // ignore
            }
        })();
        return () => { cancelled = true; };
    }, [linkBaseDistance, chargeStrength, collideBaseRadius, centerStrength, radialStrength, cx, cy]);

    // ...autoscale fitToBounds logic removed...

    // helper: convert an SVG point (user-space) to client/screen coords
    const svgUserToClient = React.useCallback((ux: number, uy: number) => {
        const svg = svgRef.current;
        if (!svg) return null;
        try {
            // the nodes live in a transformed group: transform="translate(tx,ty) scale(scale)"
            // so the root-user coordinates of a node are ((ux + tx) * scale, (uy + ty) * scale)
            const rootX = (ux + tx) * scale;
            const rootY = (uy + ty) * scale;
            const pt = (svg as SVGSVGElement).createSVGPoint();
            pt.x = rootX;
            pt.y = rootY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return null;
            const p = pt.matrixTransform(ctm);
            return { x: p.x, y: p.y };
        } catch {
            return null;
        }
    }, [tx, ty, scale]);

    const hoverTimeoutRef = React.useRef<number | null>(null);
    const lastTooltipUpdateRef = React.useRef<number>(0);
    const isFittingRef = React.useRef(false);
    const hoverAuthorRef = React.useRef<string | null>(null);

    // when hovered author or nodes/transform change, recompute tooltip pos anchored to node
    React.useEffect(() => {
        // keep a ref of hoverAuthor for use by non-react callbacks (e.g. fitToBounds)
        hoverAuthorRef.current = hoverAuthor;

        if (!hoverAuthor) return;
        if (isFittingRef.current) return; // skip while fitting/animating to avoid jumps
        const node = nodes.find(n => n.id === hoverAuthor || n.name === hoverAuthor || n.id === selectedAuthor);
        if (!node) return;
        const now = Date.now();
        // rate-limit tooltip adjustments to ~25fps to avoid thrashing while simulation runs
        if (now - lastTooltipUpdateRef.current < 36) return;
        lastTooltipUpdateRef.current = now;

        const screen = svgUserToClient(node.x ?? cx, node.y ?? cy);
        const svg = svgRef.current;
        if (!screen || !svg) return;
        const svgRect = svg.getBoundingClientRect();
        // position tooltip relative to SVG, not wrapper
        const left = Math.round(screen.x - svgRect.left);
        const top = Math.max(6, Math.round(screen.y - svgRect.top + 8));
        // Clamp tooltip to stay within SVG bounds
        const tooltipWidth = 180; // px, estimate
        const tooltipHeight = 48; // px, estimate
        let clampedLeft = left;
        let clampedTop = top;
        if (svgRect) {
            if (clampedLeft < tooltipWidth / 2) clampedLeft = tooltipWidth / 2;
            if (clampedLeft > svgRect.width - tooltipWidth / 2) clampedLeft = svgRect.width - tooltipWidth / 2;
            if (clampedTop < 0) clampedTop = 0;
            if (clampedTop > svgRect.height - tooltipHeight) clampedTop = svgRect.height - tooltipHeight;
        }
        setTooltipPos(prev => {
            if (prev && prev.left === clampedLeft && prev.top === clampedTop) return prev;
            return { left: clampedLeft, top: clampedTop };
        });
    // note: intentionally exclude tooltipPos from deps to avoid update-loop; the effect
    // should run when hoverAuthor, nodes, or transforms change
    }, [hoverAuthor, nodes, tx, ty, scale, containerWidth, containerHeight, selectedAuthor, cx, cy, svgUserToClient]);

    // pointer-based pan handlers
    React.useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

    let dragging = false;
        let startTx = 0;
        let startTy = 0;
        let startSvgX = 0;
        let startSvgY = 0;

        const onPointerDown = (e: PointerEvent) => {
            // only start pan on primary button and when target is svg (background)
            if (e.button !== 0) return;
            const tgt = e.target as HTMLElement | null;
            // if the pointer down happened on an interactive control (overlay) or a node label/circle, don't start pan
            if (!tgt) return;
            if (tgt.closest('[data-no-pan]') || tgt.closest('circle') || tgt.closest('text')) return;
            e.preventDefault();
            e.stopPropagation();

            dragging = true;
            startTx = tx;
            startTy = ty;
            // convert start client to svg user coords
            const pt = (svg as SVGSVGElement).createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const ctm = svg.getScreenCTM();
            if (ctm) {
                const inv = ctm.inverse();
                const p = pt.matrixTransform(inv);
                startSvgX = p.x;
                startSvgY = p.y;
            } else {
                startSvgX = e.clientX;
                startSvgY = e.clientY;
            }

            const docMove = (ev: PointerEvent) => {
                if (!dragging) return;
                const pt2 = (svg as SVGSVGElement).createSVGPoint();
                pt2.x = ev.clientX;
                pt2.y = ev.clientY;
                const ctm2 = svg.getScreenCTM();
                let curX = ev.clientX;
                let curY = ev.clientY;
                if (ctm2) {
                    const inv2 = ctm2.inverse();
                    const p2 = pt2.matrixTransform(inv2);
                    curX = p2.x;
                    curY = p2.y;
                }
                const dx = curX - startSvgX;
                const dy = curY - startSvgY;
                // dx/dy are in svg root coordinates; convert to group-local by dividing by current scale
                setTx(startTx + dx / Math.max(1e-6, scale));
                setTy(startTy + dy / Math.max(1e-6, scale));
            };

            const docUp = (ev: PointerEvent) => {
                if (!dragging) return;
                dragging = false;
                try { svg.releasePointerCapture(ev.pointerId); } catch { }
                document.removeEventListener('pointermove', docMove);
                document.removeEventListener('pointerup', docUp);
            };

            document.addEventListener('pointermove', docMove);
            document.addEventListener('pointerup', docUp);
        };

        const targets: (Element | null)[] = [svg, wrapperRef.current];
        targets.forEach(t => { if (t) t.addEventListener('pointerdown', onPointerDown); });

        return () => {
            targets.forEach(t => { if (t) t.removeEventListener('pointerdown', onPointerDown); });
        };
    }, [tx, ty, layoutReady]);

    // wheel zoom
    React.useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

    const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const delta = -e.deltaY;
            const zoomFactor = delta > 0 ? 1.08 : 0.92;
            // zoom around mouse: map pointer to svg root-user coordinates
            const pt = (svg as SVGSVGElement).createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const ctm = svg.getScreenCTM();
            if (!ctm) return;
            const inv = ctm.inverse();
            const p = pt.matrixTransform(inv); // p is in svg root coordinates

            const newScale = Math.max(0.25, Math.min(3, scale * zoomFactor));
            // compute new tx/ty so the point under the cursor stays fixed on screen
            // derivation: p.x == (u + tx)*scale, want (u + tx')*newScale == p.x
            // so tx' = tx + p.x*(1/newScale - 1/scale)
            const nx = tx + p.x * (1 / newScale - 1 / scale);
            const ny = ty + p.y * (1 / newScale - 1 / scale);
            setScale(newScale);
            setTx(nx);
            setTy(ny);
        };

        const target = wrapperRef.current || svg;
        if (target) target.addEventListener('wheel', onWheel as unknown as EventListener, { passive: false });
        return () => {
            if (target) target.removeEventListener('wheel', onWheel as unknown as EventListener);
        };
    }, [scale, tx, ty, layoutReady]);

    // compute available height after header on mount and resize
    React.useEffect(() => {
        const compute = () => {
            try {
                // look for a site header/nav element; fall back to 120px
                const headerEl = document.querySelector('nav, header, .navigation, .site-header');
                const headerH = headerEl ? (headerEl as Element).getBoundingClientRect().height : 120;
                // leave some breathing room (padding/margins)
                const extra = 200; // px
                setOuterHeight(`calc(100vh - ${Math.round(headerH + extra)}px)`);
            } catch {
                setOuterHeight('60vh');
            }
        };
        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    return (
    <div className="rounded-lg bg-black/40" style={{ userSelect: 'none', WebkitUserSelect: 'none', height: outerHeight, display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'stretch', gap: 0, padding: 0 }}>
                <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', width: '100%', margin: 0, flex: 1, overflow: 'hidden' }}>
                    {/* left: svg area (measured) */}
                    <div ref={wrapperRef} style={{ flex: 1, position: 'relative', minWidth: 0, height: '100%', overflow: 'hidden' }}>
                        <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 ${containerWidth} ${containerHeight}`} style={{ touchAction: 'none', userSelect: 'none', width: '100%', height: '100%', display: 'block' }}>
                        <style>{`
                            .glitch-animate { animation: glitch-burst 4s infinite; }
                            @keyframes glitch-burst {
                                0% { filter: none; transform: none; }
                                2% { filter: url(#glitch); transform: translate(2px, 0); }
                                4% { filter: none; transform: none; }
                                20% { filter: none; transform: none; }
                                22% { filter: url(#glitch); transform: translate(-2px, 0); }
                                24% { filter: none; transform: none; }
                                100% { filter: none; transform: none; }
                            }
                        `}</style>
                        <defs>
                            {/* glitch displacement filter */}
                            <filter id="glitch" x="-20%" y="-20%" width="140%" height="140%">
                                {/* animate the turbulence slightly for motion - animate must be a child of feTurbulence */}
                                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="2" result="turb">
                                    <animate attributeName="baseFrequency" dur="1s" values="0.02;0.04;0.015;0.02" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" in2="turb" scale="8" xChannelSelector="R" yChannelSelector="G" />
                                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
                            </filter>
                            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* everything that should pan/zoom together */}
                        <g transform={`translate(${tx},${ty}) scale(${scale})`}>
                            <g filter="url(#glow-gold)">
                                {links.map((l, i) => {
                                    const aNode = nodes.find(n => n.id === l.source);
                                    const bNode = nodes.find(n => n.id === l.target);
                                    const a = aNode || { x: cx, y: cy };
                                    const b = bNode || { x: cx, y: cy };
                                    const strokeWidth = Math.min(6, 0.8 + l.weight * 0.8);
                                    // Dashed if neither endpoint is YOU (indirect), solid if direct
                                    const isDirect = (aNode && aNode.id === YOUR_NAME) || (bNode && bNode.id === YOUR_NAME);
                                    return (
                                        <line
                                            key={i}
                                            x1={a.x}
                                            y1={a.y}
                                            x2={b.x}
                                            y2={b.y}
                                            stroke={isDirect ? "#ffd70088" : "#ffd70044"}
                                            strokeWidth={isDirect ? strokeWidth : Math.max(1.5, strokeWidth * 0.7)}
                                            strokeLinecap="round"
                                            opacity={isDirect ? 0.95 : 0.55}
                                            strokeDasharray={isDirect ? undefined : "8 6"}
                                        />
                                    );
                                })}
                            </g>

                            {/* nodes (with drag handlers) */}
                            <g>
                                {nodes.map((node) => {
                                    const p = { x: node.x ?? cx, y: node.y ?? cy };
                                    const isYou = node.id === YOUR_NAME;
                                    const r = isYou ? 10 + Math.min(12, node.degree) : 6 + Math.min(8, node.degree * 0.4);
                                    const stroke = isYou ? '#ff00ff' : '#ffd670';
                                    // subtle fill: gentle tint behind each node for better legibility
                                    const fill = isYou ? 'rgba(255,119,238,0.5)' : 'rgba(255,215,112,0.5)';
                                    const filter = isYou ? 'url(#glow-pink)' : undefined;

                                    const onNodePointerDown = (e: React.PointerEvent) => {
                                        // prevent other handlers (pan) from interfering
                                        e.stopPropagation();
                                        e.preventDefault();
                                        try { (e.nativeEvent as Event & { stopImmediatePropagation?: () => void }).stopImmediatePropagation?.(); } catch {}

                                        draggingNodeRef.current = node.id;
                                        dragPointerIdRef.current = e.pointerId;
                                        const targetEl = e.target as Element;
                                        try { targetEl.setPointerCapture(e.pointerId); } catch {}

                                        if (simRef.current) {
                                            const simNode = simRef.current.nodes().find((d: SimNode) => d.id === node.id);
                                            if (simNode) {
                                                simNode.fx = node.x;
                                                simNode.fy = node.y;
                                                simRef.current.alphaTarget(0.3).restart();
                                            }
                                        }

                                        // attach temporary document-level handlers to ensure consistent dragging
                                        const docMove = (ev: PointerEvent) => {
                                            if (ev.pointerId !== e.pointerId) return;
                                            const svg = svgRef.current;
                                            if (!svg) return;
                                            const pt = (svg as SVGSVGElement).createSVGPoint();
                                            pt.x = ev.clientX;
                                            pt.y = ev.clientY;
                                            const ctm = svg.getScreenCTM();
                                            let px = ev.clientX;
                                            let py = ev.clientY;
                                            if (ctm) {
                                                const inv = ctm.inverse();
                                                const ptt = pt.matrixTransform(inv);
                                                px = ptt.x;
                                                py = ptt.y;
                                            }
                                            const x = px / scale - tx;
                                            const y = py / scale - ty;
                                            if (simRef.current) {
                                                const simNode = simRef.current.nodes().find((d: SimNode) => d.id === draggingNodeRef.current);
                                                if (simNode) {
                                                    simNode.fx = x;
                                                    simNode.fy = y;
                                                }
                                            }
                                        };

                                        const docUp = (ev: PointerEvent) => {
                                            if (ev.pointerId !== e.pointerId) return;
                                            try { targetEl.releasePointerCapture(ev.pointerId); } catch {}
                                            draggingNodeRef.current = null;
                                            dragPointerIdRef.current = null;
                                            if (simRef.current) {
                                                const simNode = simRef.current.nodes().find((d: SimNode) => d.id === node.id);
                                                if (simNode) {
                                                    simNode.fx = null;
                                                    simNode.fy = null;
                                                    simRef.current.alphaTarget(0);
                                                }
                                            }
                                            document.removeEventListener('pointermove', docMove);
                                            document.removeEventListener('pointerup', docUp);
                                        };

                                        document.addEventListener('pointermove', docMove);
                                        document.addEventListener('pointerup', docUp);
                                    };

                                    const onNodePointerEnter = (e: React.PointerEvent) => {
                                        // position tooltip centered under the node (compute from node coords)
                                        try {
                                            const screen = svgUserToClient(node.x ?? cx, node.y ?? cy);
                                            const wr = wrapperRef.current;
                                            if (!screen || !wr) {
                                                // immediate fallback: set hover immediately
                                                if (!hoverAuthor) setHoverAuthor(node.id);
                                                return;
                                            }
                                            const r = wr.getBoundingClientRect();
                                            const left = Math.round(screen.x - r.left);
                                            const top = Math.round(screen.y - r.top + 8);
                                            // update position immediately (no state change if same)
                                            setTooltipPos(prev => {
                                                if (!prev || prev.left !== left || prev.top !== top) return { left, top };
                                                return prev;
                                            });

                                            // if nothing hovered yet, show immediately; otherwise debounce switch
                                            if (!hoverAuthor) {
                                                setHoverAuthor(node.id);
                                            } else if (hoverAuthor !== node.id) {
                                                if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
                                                hoverTimeoutRef.current = window.setTimeout(() => {
                                                    setHoverAuthor(node.id);
                                                    hoverTimeoutRef.current = null;
                                                }, 80);
                                            }
                                        } catch {
                                            if (!hoverAuthor) setHoverAuthor(node.id);
                                        }
                                    };

                                    const onNodePointerMove = (e: React.PointerEvent) => {
                                        // update tooltip position to stay under node during pointer moves
                                        try {
                                            const screen = svgUserToClient(node.x ?? cx, node.y ?? cy);
                                            const wr = wrapperRef.current;
                                            if (!screen || !wr) return;
                                            const r = wr.getBoundingClientRect();
                                            const left = Math.round(screen.x - r.left);
                                            const top = Math.round(screen.y - r.top + 8);
                                            setTooltipPos(prev => {
                                                if (!prev || prev.left !== left || prev.top !== top) return { left, top };
                                                return prev;
                                            });
                                        } catch {}
                                    };

                                    const onNodePointerLeave = () => {
                                        if (hoverTimeoutRef.current) {
                                            window.clearTimeout(hoverTimeoutRef.current);
                                            hoverTimeoutRef.current = null;
                                        }
                                        // if leaving the currently hovered node, clear immediately
                                        setHoverAuthor(prev => (prev === node.id ? null : prev));
                                        setTooltipPos(null);
                                    };

                                    const onNodeClick = (e: React.PointerEvent) => {
                                        e.stopPropagation();
                                        // compute position for panel
                                        const wr = wrapperRef.current;
                                        if (!wr) return;
                                        const r = wr.getBoundingClientRect();
                                        setSelectedAuthor(node.id);
                                        const pubs = publications.filter(p => (p.authors || []).includes(node.id));
                                        setSelectedPubs(pubs);
                                        // position tooltip near click
                                        setTooltipPos({ left: 0, top: Math.max(6, e.clientY - r.top + 8) });
                                    };

                                    return (
                                        <g key={node.id} transform={`translate(${p.x},${p.y})`}>
                                            <circle
                                                r={r}
                                                fill={fill}
                                                stroke={stroke}
                                                strokeWidth={2}
                                                filter={filter}
                                                onPointerDown={onNodePointerDown}
                                                onPointerEnter={onNodePointerEnter}
                                                onPointerMove={onNodePointerMove}
                                                onPointerLeave={onNodePointerLeave}
                                                onPointerUp={onNodeClick}
                                            />
                                            <text
                                                x={r + 6}
                                                y={4}
                                                fontSize={12}
                                                fill={isYou ? '#ff00ff' : '#ffdfe8'}
                                                style={{
                                                    fontFamily: 'ui-monospace, monospace',
                                                    pointerEvents: 'none',
                                                    userSelect: 'none',
                                                    WebkitUserSelect: 'none',
                                                    MozUserSelect: 'none',
                                                    msUserSelect: 'none',
                                                    fontWeight: isYou ? 700 : 400
                                                }}
                                            >
                                                {node.name.split(',')[0]}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        </g>
                        </svg>

                        {/* layout controls overlay */}
                        <div data-no-pan="true" style={{ position: 'absolute', right: 10, top: 10, zIndex: 80, background: 'linear-gradient(135deg, rgba(18,6,24,0.72), rgba(6,12,18,0.6))', padding: controlsOpen ? 10 : 6, borderRadius: 10, color: '#9ee6ff', fontSize: 12, minWidth: controlsOpen ? 260 : 40, width: controlsOpen ? 260 : 40, transition: 'width 220ms ease, padding 160ms ease' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: controlsOpen ? 8 : 0 }}>
                                <strong style={{ fontSize: 13, color: '#ff00ff' }}>{controlsOpen ? 'Layout' : ''}</strong>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                    {controlsOpen ? (
                                        <>
                                            <button onClick={() => { setLinkBaseDistance(220); setChargeStrength(-420); setCollideBaseRadius(20); setCenterStrength(0.9); setRadialStrength(0.06); }} style={{ background: 'transparent', color: '#ff00ff', border: '1px solid rgba(255,0,255,0.12)', padding: '3px 8px', borderRadius: 6 }}>Spread</button>
                                            <button onClick={() => { setLinkBaseDistance(120); setChargeStrength(-240); setCollideBaseRadius(14); setCenterStrength(1.2); setRadialStrength(0.03); }} style={{ background: 'transparent', color: '#00ffff', border: '1px solid rgba(0,255,255,0.08)', padding: '3px 8px', borderRadius: 6 }}>Compact</button>
                                        </>
                                    ) : null}
                                    <button aria-label={controlsOpen ? 'Collapse' : 'Open'} onClick={() => setControlsOpen(v => !v)} style={{ background: controlsOpen ? 'rgba(255,0,255,0.06)' : 'rgba(0,255,255,0.06)', color: controlsOpen ? '#ff00ff' : '#00ffff', border: 'none', padding: 6, borderRadius: 6 }}>{controlsOpen ? '–' : '≡'}</button>
                                </div>
                            </div>
                            {controlsOpen ? (
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontSize: 11, color: '#00ffff' }}>Link base distance: <span style={{ color: '#ff00ff', fontWeight: 700 }}>{linkBaseDistance}</span></label>
                                <input style={{ accentColor: '#ff00ff' }} type="range" min={60} max={300} value={linkBaseDistance} onChange={e => setLinkBaseDistance(Number(e.target.value))} />
                                <label style={{ fontSize: 11, color: '#00ffff' }}>Charge strength: <span style={{ color: '#ff00ff', fontWeight: 700 }}>{chargeStrength}</span></label>
                                <input style={{ accentColor: '#ff00ff' }} type="range" min={-800} max={-80} value={chargeStrength} onChange={e => setChargeStrength(Number(e.target.value))} />
                                <label style={{ fontSize: 11, color: '#00ffff' }}>Collide radius: <span style={{ color: '#ff00ff', fontWeight: 700 }}>{collideBaseRadius}</span></label>
                                <input style={{ accentColor: '#ff00ff' }} type="range" min={6} max={40} value={collideBaseRadius} onChange={e => setCollideBaseRadius(Number(e.target.value))} />
                                <label style={{ fontSize: 11, color: '#00ffff' }}>Center force: <span style={{ color: '#ff00ff', fontWeight: 700 }}>{Number(centerStrength.toFixed(2))}</span></label>
                                <input style={{ accentColor: '#ff00ff' }} type="range" min={0} max={2} step={0.01} value={centerStrength} onChange={e => setCenterStrength(Number(e.target.value))} />
                                <label style={{ fontSize: 11, color: '#00ffff' }}>Radial force: <span style={{ color: '#ff00ff', fontWeight: 700 }}>{Number(radialStrength.toFixed(3))}</span></label>
                                <input style={{ accentColor: '#ff00ff' }} type="range" min={0} max={0.2} step={0.005} value={radialStrength} onChange={e => setRadialStrength(Number(e.target.value))} />
                            </div>
                            ) : null}
                        </div>

                        {/* tooltip (hover) — inside left area */}
                        {hoverAuthor && tooltipPos ? (
                            <div style={{ position: 'absolute', left: tooltipPos.left, top: tooltipPos.top, transform: 'translateX(-50%)', background: 'rgba(10,10,12,0.95)', color: '#fff', padding: '6px 8px', borderRadius: 6, boxShadow: '0 6px 18px rgba(0,0,0,0.6)', pointerEvents: 'none', fontSize: 12, zIndex: 40, transition: 'left 120ms linear, top 120ms linear, opacity 120ms linear', willChange: 'left, top, opacity' }}>
                                <div style={{ fontWeight: 700 }} className="text-neon-cyan">{(hoverAuthor && hoverAuthor.split) ? hoverAuthor.split(',')[0] : hoverAuthor}</div>
                                <div style={{ fontSize: 11 }} className="text-neon-cyan/70">click to list publications · drag to move</div>
                            </div>
                        ) : null}
                    </div>

                    {/* right: publications panel (outside SVG) */}
                    <div style={{ width: selectedAuthor ? 340 : 180, transition: 'width 240ms ease', minWidth: 0 }}>
                        {selectedAuthor ? (
                            <div className="border-2 border-neon-cyan/30 bg-retro-darker/90 p-3 rounded" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-retro neon-glow-pink" style={{ lineHeight: 1 }}>{selectedAuthor.split(',')[0]}</h3>
                                        <div className="text-neon-cyan/80 text-sm">Publications</div>
                                    </div>
                                    <button onClick={() => { setSelectedAuthor(null); setSelectedPubs([]); }} className="text-neon-cyan/60 hover:text-neon-pink">✕</button>
                                </div>
                                {selectedPubs.length === 0 ? (
                                    <div className="text-neon-cyan/70">No publications found.</div>
                                ) : (
                                    <ul className="space-y-4">
                                        {selectedPubs.map((p, idx) => (
                                            <li key={idx} className="pb-2 border-b border-neon-cyan/10">
                                                <div className="text-neon-cyan font-bold text-base">{p.title}</div>
                                                <div className="text-neon-pink text-sm mt-1">with {selectedAuthor.split(',')[0]}</div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="text-neon-cyan/70 text-sm">{p.year}</div>
                                                    <div>
                                                        {p.doi ? <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="text-neon-pink text-sm">DOI</a> : p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="text-neon-cyan text-sm">Link</a> : null}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <div className="border-2 border-neon-cyan/30 bg-retro-darker/70 p-4 text-sm rounded text-neon-cyan/70">
                                Click a node to list publications for that author.
                            </div>
                        )}
                    </div>
                </div>

            <p className="text-sm text-neon-cyan/70 mt-3">
                Nodes are co-authors; edges show co-authorship counts.
            </p>
        </div>
    );
}
