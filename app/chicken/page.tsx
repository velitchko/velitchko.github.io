"use client"

import React from 'react'

const EMOJI_SET = [
    '🍉','🍇','🍓','🍒','🍑','🍍','🥭',
    '🍏','🍎','🍐','🍑','🍌','🍓','🍈',
    '⭐️','✨','🌟','💫','🔥','⚡️','💥', 
    '🐟','🐠','🐬','🐳','🦀','🦐','🐙',
    '🍕','🍔','🍟','🍩','🍪','🍰','🍀',
    '🌈','🎲','🎯','🎵','🎉','🎁','🐔'
]; // chicken is last

function GameOverDisplay() {
    return (
        <section aria-labelledby="chicken-gameover" className="chicken-container">
            <div className="chicken-stack" style={{ textAlign: 'center' }}>
                <h1 id="chicken-gameover" style={{ margin: 0, fontSize: '6vmin', letterSpacing: '0.25em', textTransform: 'uppercase' }} className="neon-glow-gold">
                    GAME OVER
                </h1>

                <div>
                    <span
                        role="img"
                        aria-label="Giant glowing chicken"
                        className="glitch neon-glow-gold pulse-chicken"
                        data-text="🐔"
                        style={{
                            fontSize: '40vmin',
                            lineHeight: 0.9,
                            transform: 'rotate(-8deg)',
                            WebkitFontSmoothing: 'antialiased',
                            filter: `
                        drop-shadow(0 0 40px #FFD70088)
                        drop-shadow(0 0 80px #FFF70066)
                        drop-shadow(0 0 120px #FFEB3B44)
                        drop-shadow(0 0 160px #FFFDE722)
                    `,
                            color: '#FFD700',
                            opacity: 0.85,
                        }}   >
                        🐔
                    </span>
                </div>

                <p style={{ margin: 0, fontSize: '3vmin', opacity: 0.95 }} className="neon-glow-gold">
                    you lost the chicken game
                </p>
            </div>
        </section>
    )
}

export default function ChickenPage() {
    const DEBUG = false; // debug visuals disabled
    const [phase, setPhase] = React.useState<'idle'|'spinning'|'result'>('idle');
    const wheelRef = React.useRef<HTMLDivElement | null>(null);
    const itemRef = React.useRef<HTMLDivElement | null>(null);
    const [items, setItems] = React.useState<string[]>([]);
    const [spinning, setSpinning] = React.useState(false);

    // prepare a long list of emojis so the wheel can spin a long distance
    React.useEffect(() => {
        const repeats = 12;
        const long: string[] = [];
        for (let i = 0; i < repeats; i++) {
            long.push(...EMOJI_SET);
        }
        // insert an extra chicken early so we can land within a short number of steps
    const insertPos = 12 + Math.floor(Math.random() * 20); // between 12 and 31
        if (insertPos >= long.length) long.push('🐔'); else long.splice(insertPos, 0, '🐔');
        // finally ensure the very last item is also a chicken so we always have one at the end
        long.push('🐔');
        setItems(long);
    }, []);

    const start = React.useCallback(() => {
        if (!wheelRef.current || items.length === 0) {
            setPhase('result');
            return;
        }
        setPhase('spinning');
        setSpinning(true);

    // small delay to allow CSS transitions to apply
    requestAnimationFrame(async () => {
            const viewport = wheelRef.current!;
            const listEl = viewport.querySelector('.wheel-list') as HTMLElement | null;
            const firstItem = viewport.querySelector('[data-item]') as HTMLElement | null;
            if (!listEl || !firstItem) {
                setPhase('result');
                setSpinning(false);
                return;
            }

            const itemHeight = firstItem.getBoundingClientRect().height || 64;
            const containerRect = viewport.getBoundingClientRect();
            const centerOffset = containerRect.height / 2 - itemHeight / 2;

            // compute offsets per-item below; we choose a nearby chicken index for target

            // Animate one emoji per step for smooth consistent motion (350ms per emoji).
            const animateTo = (el: HTMLElement, y: number, dur: number) => new Promise<void>(resolve => {
                const onEndOne = () => {
                    el.removeEventListener('transitionend', onEndOne);
                    resolve();
                };
                el.style.transition = `transform ${dur}ms cubic-bezier(.08,.9,.22,1)`;
                el.style.willChange = 'transform';
                el.style.transform = `translateY(${y}px)`;
                el.addEventListener('transitionend', onEndOne);
            });

            // small blur while moving
            listEl.style.filter = 'blur(2px) saturate(1.05)';

            const minSteps = 16;
            const maxSteps = 36;
            // find an inserted chicken within the early range, otherwise fall back to last
            let targetIndex = items.findIndex((v, idx) => v === '🐔' && idx >= minSteps && idx <= maxSteps);
            if (targetIndex === -1) targetIndex = items.length - 1;

            const stepDuration = 150;

            // enforce a maximum spin time (6 seconds) — race the per-step loop against a timeout
            let timedOut = false;
            const timeout = setTimeout(() => { timedOut = true; }, 6000);

            for (let step = 1; step <= targetIndex; step++) {
                if (timedOut) break;
                const y = -(step * itemHeight) + centerOffset;
                // eslint-disable-next-line no-await-in-loop
                await animateTo(listEl, y, stepDuration);
            }

            clearTimeout(timeout);

            // if we timed out, snap to a nearby chicken (or leave at current transform) and end
            listEl.style.transition = '';
            listEl.style.filter = '';
            listEl.style.willChange = '';
            setSpinning(false);
            setPhase('result');
        });
    }, [items]);

    const playClick = () => {
        // fade out button then start
        setPhase('spinning');
        // small UX pause so PLAY fades
        setTimeout(() => start(), 260);
    };

    return (
        <main className="chicken-main">

            <div className="chicken-container">
                {phase === 'idle' && (
                    <div className="chicken-stack">
                        <div>
                            <h2 className="neon-glow-gold chicken-heading" style={{ margin: 0, fontSize: '4vmin', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Chicken Game</h2>
                            <p style={{ margin: 0, opacity: 0.9, fontSize: '2.25vmin' }}>Press PLAY to spin the wheel — try not to lose the chicken.</p>
                        </div>
                        <span role="img" aria-label="Die" data-text="🎲" className="die-large angled glitch pulse-die neon-glow-gold" style={{ color: '#FFD700', opacity: 0.95 }}>🎲</span>
                        <button aria-label="Play the chicken game" className={`play-btn glitch`} onClick={playClick}>
                            PLAY
                        </button>
                    </div>
                )}

                {phase === 'spinning' && (
                    <div>
                        <div style={{ opacity: spinning ? 1 : 0, transition: 'opacity 260ms ease' }}>
                            <div className="chicken-stack">
                                <div ref={wheelRef} className={`wheel-viewport ${spinning ? 'spinning' : ''}`}>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="wheel-list" style={{ transform: 'translateY(0px)' }}>
                                            {items.map((e, i) => (
                                                <div data-item key={i} data-index={i} data-item-style className={`wheel-item`} style={{ color: e === '🐔' ? '#ffd700' : '#fff' }}>{e}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="wheel-center-ring" aria-hidden />
                                </div>
                                {/* debug panel removed */}
                                <div style={{ marginTop: 12 }}>
                                    <button className="play-btn glitch" onClick={() => { /* allow restart mid-spin? do nothing */ }}>Spinning…</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {phase === 'result' && (
                    <div>
                        <GameOverDisplay />
                        <div style={{ marginTop: 24 }}>
                            <button className="play-btn glitch" onClick={() => {
                                // reset list transform so wheel shows initial state
                                const viewport = wheelRef.current;
                                if (viewport) {
                                    const listEl = viewport.querySelector('.wheel-list') as HTMLElement | null;
                                    if (listEl) {
                                        listEl.style.transition = '';
                                        listEl.style.transform = 'translateY(0px)';
                                        listEl.style.filter = '';
                                    }
                                }
                                setPhase('idle');
                            }}>Try again</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
