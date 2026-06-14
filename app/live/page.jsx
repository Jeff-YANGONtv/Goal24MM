import { Trophy, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Live Scores - Goal24MM',
  description: 'Real-time football scores, match updates, and live statistics from all major leagues.',
};

export default function LivePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Live Scores</h1>
        <p className="text-gray-400">Real-time football scores and match updates from all major leagues.</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="glass-card p-8 md:p-12 border-yellow-500/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <div className="inline-block bg-yellow-500/20 text-yellow-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Coming Soon
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Live Match Tracking</h2>
              <p className="text-gray-400 mb-6">
                We're building a real-time score engine to bring you the fastest match updates, instant goal alerts, and detailed match statistics from all major football leagues worldwide.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Real-time match updates
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Instant goal and event notifications
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Detailed match statistics and lineups
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Coverage from all major leagues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Leagues */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4 text-white">Featured Leagues</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Premier League', 'Champions League', 'La Liga', 'Serie A'].map((league) => (
            <div key={league} className="glass-card p-6 text-center hover:border-yellow-500/50 transition-colors">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-500 transition-colors">
                {league}
              </p>
              <p className="text-xs text-gray-500 mt-2">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>

      {/* Information Box */}
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-6 border-blue-500/20 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              In the meantime, you can follow our latest news and updates on football matches from around the world.
            </p>
            <Link href="/" className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm">
              View Latest News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
