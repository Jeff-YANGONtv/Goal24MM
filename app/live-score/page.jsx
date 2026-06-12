import Link from 'next/link';

export const metadata = {
  title: 'Live Scores - Goal24MM',
  description: 'Live football scores and match updates',
};

export default function LiveScorePage() {
  // Mock data for demonstration
  const liveMatches = [
    {
      id: 1,
      team1: 'Manchester United',
      team2: 'Liverpool',
      score1: 2,
      score2: 1,
      status: 'Live',
      time: '45+2',
    },
    {
      id: 2,
      team1: 'Real Madrid',
      team2: 'Barcelona',
      score1: 1,
      score2: 1,
      status: 'Live',
      time: '67',
    },
    {
      id: 3,
      team1: 'Bayern Munich',
      team2: 'Borussia Dortmund',
      score1: 3,
      score2: 0,
      status: 'Finished',
      time: 'FT',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">⚽</span>
              <h1 className="text-3xl font-bold text-white">Goal24MM</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-accent hover:text-red-600 text-sm font-semibold">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-8">Live Scores</h1>

        {/* Matches Grid */}
        <div className="space-y-4">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              className="bg-primary rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* Team 1 */}
                <div className="flex-1 text-center">
                  <p className="text-white font-semibold text-lg mb-2">{match.team1}</p>
                  <p className="text-4xl font-bold text-accent">{match.score1}</p>
                </div>

                {/* Match Info */}
                <div className="flex-1 text-center mx-4">
                  <div
                    className={`inline-block px-3 py-1 rounded text-sm font-semibold mb-2 ${
                      match.status === 'Live'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {match.status}
                  </div>
                  <p className="text-gray-400 text-sm">{match.time}</p>
                </div>

                {/* Team 2 */}
                <div className="flex-1 text-center">
                  <p className="text-white font-semibold text-lg mb-2">{match.team2}</p>
                  <p className="text-4xl font-bold text-accent">{match.score2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-primary rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">
            🔄 Live score integration coming soon! Subscribe to get real-time updates.
          </p>
        </div>
      </main>
    </div>
  );
}
