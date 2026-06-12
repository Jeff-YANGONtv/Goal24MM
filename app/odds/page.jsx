import Link from 'next/link';

export const metadata = {
  title: 'Odds & Betting - Goal24MM',
  description: 'Football betting odds and predictions',
};

export default function OddsPage() {
  // Mock data for demonstration
  const oddsData = [
    {
      id: 1,
      match: 'Manchester United vs Liverpool',
      team1Win: 2.1,
      draw: 3.5,
      team2Win: 3.2,
    },
    {
      id: 2,
      match: 'Real Madrid vs Barcelona',
      team1Win: 1.95,
      draw: 3.6,
      team2Win: 3.8,
    },
    {
      id: 3,
      match: 'Bayern Munich vs Borussia Dortmund',
      team1Win: 1.65,
      draw: 4.0,
      team2Win: 5.5,
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

        <h1 className="text-4xl font-bold text-white mb-2">Betting Odds</h1>
        <p className="text-gray-400 mb-8">
          Compare betting odds from top sportsbooks
        </p>

        {/* Odds Table */}
        <div className="space-y-4">
          {oddsData.map((odds) => (
            <div
              key={odds.id}
              className="bg-primary rounded-lg p-6 shadow-lg overflow-x-auto"
            >
              <h3 className="text-white font-semibold mb-4">{odds.match}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Team 1 Win</p>
                  <p className="text-2xl font-bold text-accent">{odds.team1Win}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Draw</p>
                  <p className="text-2xl font-bold text-accent">{odds.draw}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Team 2 Win</p>
                  <p className="text-2xl font-bold text-accent">{odds.team2Win}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-900 border border-yellow-700 rounded-lg p-6">
          <p className="text-yellow-100 text-sm">
            ⚠️ <strong>Disclaimer:</strong> Betting involves risk. Please gamble responsibly.
            Only bet what you can afford to lose. If you have a gambling problem, please seek help.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-primary rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">
            🔄 Advanced odds analysis and predictions coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
