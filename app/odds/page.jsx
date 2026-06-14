import { BarChart2, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Betting Odds & Predictions - Goal24MM',
  description: 'Expert football predictions, betting odds, and analysis from top bookmakers and professional analysts.',
};

export default function OddsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Odds & Predictions</h1>
        <p className="text-gray-400">Expert analysis and the best odds from top bookmakers.</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="glass-card p-8 md:p-12 border-yellow-500/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart2 className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <div className="inline-block bg-yellow-500/20 text-yellow-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Under Development
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Professional Predictions & Analysis</h2>
              <p className="text-gray-400 mb-6">
                We are integrating data from premium odds providers and expert analysts to give you the edge in your football predictions. Get access to real-time odds, expert picks, and detailed match analysis.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Real-time odds from multiple bookmakers
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Expert predictions and analysis
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Match statistics and form analysis
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  Betting tips from professional analysts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4 text-white">What's Coming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 border-yellow-500/10">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Live Odds Comparison</h3>
                <p className="text-sm text-gray-400">Compare odds from multiple bookmakers and find the best value for your bets.</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 border-yellow-500/10">
            <div className="flex items-start gap-4">
              <BarChart2 className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Expert Analysis</h3>
                <p className="text-sm text-gray-400">Get detailed match analysis and predictions from professional football analysts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Markets */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4 text-white">Popular Betting Markets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Match Winner', 'Over/Under', 'Both Teams Score', 'Correct Score'].map((market) => (
            <div key={market} className="glass-card p-6 text-center hover:border-yellow-500/50 transition-colors">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                {market}
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
            <h3 className="text-white font-bold mb-2">Responsible Betting</h3>
            <p className="text-gray-400 text-sm mb-4">
              Please gamble responsibly. Our predictions and odds are for informational purposes only. Always bet within your means.
            </p>
            <Link href="/" className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors text-sm">
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
