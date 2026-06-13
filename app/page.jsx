import { fetchRssPosts } from '@/lib/rss';
import NewsCard from '@/components/NewsCard';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'Goal24MM - Latest Football News & Live Scores',
  description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
};

export default async function HomePage() {
  let posts = [];
  let error = null;

  try {
    posts = await fetchRssPosts();
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    error = 'Failed to load news. Please try again later.';
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-400">No news available at the moment.</p>
      </div>
    );
  }

  // Sectioning the posts
  const featuredNews = posts.slice(0, 1);
  const breakingNews = posts.slice(1, 5);
  const latestNews = posts.slice(5, 11);

  return (
    <main className="container mx-auto px-4 py-6 space-y-10">
      {/* Featured News */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">Featured News</h2>
        <div className="grid grid-cols-1 gap-6">
          {featuredNews.map((post) => (
            <NewsCard key={post.slug} post={post} featured={true} />
          ))}
        </div>
      </section>

      {/* Breaking News */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">Breaking News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {breakingNews.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Advertisement Banner */}
      <AdBanner position="middle" />

      {/* Latest News */}
      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
