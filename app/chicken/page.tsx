import React from 'react'

export default function ChickenPage() {
    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
            }}
        >
            <style>
                {`
                    @keyframes pulse {
                        0% {
                            transform: scale(0.92) rotate(-8deg);
                            opacity: 0.9;
                        }
                        50% {
                            transform: scale(1) rotate(-8deg);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(0.92) rotate(-8deg);
                            opacity: 0.9;
                        }
                    }
                    .pulse-chicken { animation: pulse 1.6s ease-in-out infinite; }
                `}
            </style>

            <section aria-labelledby="chicken-gameover" style={{ width: '100%', maxWidth: 960 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', textAlign: 'center' }}>
                    <h1 id="chicken-gameover" style={{ margin: 0, fontSize: '6vmin', letterSpacing: '0.25em', textTransform: 'uppercase' }} className="neon-glow-gold">
                        GAME OVER
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        </main>
    )
}
