import { Trophy } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Live Scores - Goal24MM',
  description: 'Real-time football scores and match updates.',
};

export default function LivePage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <Trophy className="w-10 h-10 text-yellow-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Live Scores</h1>
      <p className="text-xl text-gray-400 max-w-md mb-10">
        We're currently building our real-time score engine to bring you the fastest updates.
      </p>
      <div className="glass-card p-8 max-w-sm w-full border-yellow-500/20">
        <div className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-2">Coming Soon</div>
        <p className="text-gray-300 text-sm mb-6">
          Get ready for live match tracking, instant goal alerts, and detailed match statistics.
        </p>
        <Link href="/" className="btn-3d w-full">
          Back to News
        </Link>
      </div>
    </div>
  );
}
