import CoauthorNetwork from '@/components/CoauthorNetwork';

export default function CoauthorsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-2 sm:px-3 lg:px-4">
                <h1 className="text-3xl neon-glow-pink font-retro mb-6">Co-author Network</h1>
                <CoauthorNetwork />
            </div>
        </div>
    );
}
