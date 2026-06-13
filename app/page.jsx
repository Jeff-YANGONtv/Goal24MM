import { fetchRssPosts } from '@/lib/rss';
import NewsCard from '@/components/NewsCard';
import AdBanner from '@/components/AdBanner';
import { TrendingUp, Clock, LayoutGrid } from 'lucide-react';

export const metadata = {
  title: 'Goal24MM - Latest Football News & Live Scores',
  description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
};

export const revalidate = 3600; // revalidate at most every hour

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
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="glass-card p-10 inline-block border-red-500/20">
          <p className="text-red-500 font-bold">{error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="glass-card p-10 inline-block">
          <p className="text-gray-400">No news available at the moment.</p>
        </div>
      </div>
    );
  }

  // Sectioning the posts
  const trendingNews = posts.slice(0, 1);
  const breakingNews = posts.slice(1, 5);
  const latestNews = posts.slice(5, 14);

  return (
    <main className="container mx-auto px-4 py-8 space-y-16">
      {/* Trending / Featured Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="text-yellow-500 w-6 h-6" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Trending News</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {trendingNews.map((post) => (
            <NewsCard key={post.slug} post={post} featured={true} />
          ))}
        </div>
      </section>

      {/* Breaking News Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="text-yellow-500 w-6 h-6" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Breaking Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {breakingNews.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Advertisement Banner */}
      <div className="py-4">
        <AdBanner position="middle" />
      </div>

      {/* Latest News Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <LayoutGrid className="text-yellow-500 w-6 h-6" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Latest Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      
      {/* Categories Placeholder */}
      <section className="pb-10">
        <h2 className="text-2xl font-black mb-8 border-l-4 border-yellow-500 pl-4 uppercase tracking-tighter text-white">Popular Leagues</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Premier League', 'Champions League', 'La Liga', 'Serie A'].map((league) => (
            <div key={league} className="glass-card p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-500 transition-colors">{league}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
