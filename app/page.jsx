import { fetchRSSFeed } from '@/lib/rss';
import { PostList } from '@/components/PostList';
import { AdBanner } from '@/components/AdBanner';

export const metadata = {
  title: 'Goal24MM - Latest Football News',
  description: 'Get the latest football news, scores, and updates from around the world',
  openGraph: {
    title: 'Goal24MM - Latest Football News',
    description: 'Get the latest football news, scores, and updates',
    type: 'website',
  },
};

export default async function HomePage() {
  const articles = await fetchRSSFeed();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">⚽</span>
              <h1 className="text-3xl font-bold text-white">Goal24MM</h1>
            </div>
            <p className="text-gray-400 text-sm hidden md:block">
              Football News 24/7
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Ad Banner */}
        <AdBanner position="top" />

        {/* Featured Article */}
        {articles.length > 0 && (
          <section className="mb-12">
            <div className="bg-primary rounded-lg overflow-hidden shadow-xl">
              <div className="relative w-full h-64 md:h-96 bg-gray-700">
                {articles[0].image && (
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(articles[0].pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {articles[0].title}
                </h2>
                <p className="text-gray-300 mb-4">{articles[0].description}</p>
                <a
                  href={`/news/${articles[0].slug}`}
                  className="inline-block bg-accent hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
                >
                  Read Full Article
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Middle Ad Banner */}
        <AdBanner position="middle" />

        {/* All Articles */}
        <PostList articles={articles.slice(1)} title="More News" />

        {/* Bottom Ad Banner */}
        <AdBanner position="bottom" className="mt-12" />
      </main>
    </div>
  );
}
