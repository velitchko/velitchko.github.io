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
                        className="emoji-large glitch neon-glow-gold pulse-chicken"
                        data-text="🐔"
                        style={{
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
    const [reels, setReels] = React.useState<string[][]>([[], [], []]);
    const [spinning, setSpinning] = React.useState(false);
    const reelRefs = [
        React.useRef<HTMLDivElement | null>(null),
        React.useRef<HTMLDivElement | null>(null),
        React.useRef<HTMLDivElement | null>(null)
    ];

    // prepare 3 independent reels with shuffled emojis
    React.useEffect(() => {
        const createReel = () => {
            const repeats = 12;
            const reel: string[] = [];
            for (let i = 0; i < repeats; i++) {
                // Shuffle emoji set for each repeat to avoid patterns
                const shuffled = [...EMOJI_SET].sort(() => Math.random() - 0.5);
                reel.push(...shuffled);
            }
            // insert a chicken at random position
            const insertPos = 12 + Math.floor(Math.random() * 20);
            if (insertPos >= reel.length) reel.push('🐔'); 
            else reel.splice(insertPos, 0, '🐔');
            reel.push('🐔'); // ensure one at the end
            return reel;
        };

        setReels([createReel(), createReel(), createReel()]);
    }, []);

    const start = React.useCallback(() => {
        if (reels[0].length === 0) {
            setPhase('result');
            return;
        }
        setPhase('spinning');
        setSpinning(true);

        requestAnimationFrame(async () => {
            // Animate each reel with different speeds
            const speeds = [150, 180, 210]; // ms per step, increasing for cascading effect
            
            // Calculate shared measurements from first reel to ensure all reels align on center row
            const firstViewport = reelRefs[0].current;
            if (!firstViewport) return;
            const firstItem = firstViewport.querySelector('[data-item]') as HTMLElement | null;
            if (!firstItem) return;
            
            // Use offsetHeight to include padding and get exact rendered height
            const sharedItemHeight = firstItem.offsetHeight;
            const sharedContainerHeight = firstViewport.offsetHeight;
            // Account for the 1.5x scale transform on centered items: shift up by ~20% of item height
            const sharedCenterOffset = (sharedContainerHeight / 2) - (sharedItemHeight / 2) - (sharedItemHeight * 0.5); // Center align with silver bar
            
            const promises = reelRefs.map(async (reelRef, index) => {
                const viewport = reelRef.current;
                if (!viewport) return;

                const listEl = viewport.querySelector('.wheel-list') as HTMLElement | null;
                if (!listEl) return;

                const itemHeight = sharedItemHeight;
                const centerOffset = sharedCenterOffset;

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

                listEl.style.filter = 'blur(2px) saturate(1.05)';

                const minSteps = 16;
                const maxSteps = 36;
                const currentReel = reels[index];
                let targetIndex = currentReel.findIndex((v, idx) => v === '🐔' && idx >= minSteps && idx <= maxSteps);
                if (targetIndex === -1) targetIndex = currentReel.length - 1;

                const stepDuration = speeds[index];
                let timedOut = false;
                const timeout = setTimeout(() => { timedOut = true; }, 6000);

                for (let step = 1; step <= targetIndex; step++) {
                    if (timedOut) break;
                    const y = -(step * itemHeight) + centerOffset;
                    // eslint-disable-next-line no-await-in-loop
                    await animateTo(listEl, y, stepDuration);
                }

                clearTimeout(timeout);
                
                // Final alignment: ensure target emoji is perfectly centered
                const finalY = -(targetIndex * itemHeight) + centerOffset;
                listEl.style.transform = `translateY(${finalY}px)`;
                
                listEl.style.transition = '';
                listEl.style.filter = '';
                listEl.style.willChange = '';
            });

            // Wait for all reels to finish spinning
            await Promise.all(promises);
            setSpinning(false);
            
            // Wait 3 seconds before showing game over screen (keep phase as 'spinning' to keep reels visible)
            await new Promise<void>(resolve => {
                setTimeout(() => resolve(), 3000);
            });
            
            setPhase('result');
        });
    }, [reels]);

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
                        <span role="img" aria-label="Die" data-text="🎲" className="emoji-large die-large angled glitch pulse-die neon-glow-gold" style={{ color: '#FFD700', opacity: 0.95 }}>🎲</span>
                        <button aria-label="Play the chicken game" className={`play-btn glitch`} onClick={playClick}>
                            PLAY
                        </button>
                    </div>
                )}

                {phase === 'spinning' && (
                    <div>
                        <div style={{ opacity: 1, transition: 'opacity 260ms ease' }}>
                            <div className="chicken-stack">
                                <div className={`wheel-viewport-container ${spinning ? 'spinning' : ''}`}>
                                    {reelRefs.map((reelRef, reelIndex) => (
                                        <div key={reelIndex} ref={reelRef} className="wheel-viewport">
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div className="wheel-list">
                                                    {reels[reelIndex].map((e, i) => (
                                                        <div data-item key={i} data-index={i} className={`wheel-item`} style={{ color: e === '🐔' ? '#ffd700' : '#fff' }}>{e}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="wheel-center-ring" aria-hidden />
                                </div>
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
                                // reset all reels
                                reelRefs.forEach(reelRef => {
                                    const viewport = reelRef.current;
                                    if (viewport) {
                                        const listEl = viewport.querySelector('.wheel-list') as HTMLElement | null;
                                        if (listEl) {
                                            listEl.style.transition = '';
                                            listEl.style.transform = 'translateY(0px)';
                                            listEl.style.filter = '';
                                        }
                                    }
                                });
                                setPhase('idle');
                            }}>Try again</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
