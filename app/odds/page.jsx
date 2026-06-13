import { BarChart2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Betting Odds & Predictions - Goal24MM',
  description: 'Expert football predictions and latest betting odds.',
};

export default function OddsPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <BarChart2 className="w-10 h-10 text-yellow-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Odds & Predictions</h1>
      <p className="text-xl text-gray-400 max-w-md mb-10">
        Professional analysis and the best odds from top bookmakers are coming your way.
      </p>
      <div className="glass-card p-8 max-w-sm w-full border-yellow-500/20">
        <div className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-2">Under Development</div>
        <p className="text-gray-300 text-sm mb-6">
          We are integrating data from premium providers to give you the edge in your football predictions.
        </p>
        <Link href="/" className="btn-3d w-full">
          Back to News
        </Link>
      </div>
    </div>
  );
}
