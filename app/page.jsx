import { fetchRssPosts, fetchTrendingPosts, getAllCategories } from '@/lib/rss';
import NewsCard from '@/components/NewsCard';
import AdBanner from '@/components/AdBanner';
import { TrendingUp, Clock, LayoutGrid, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Goal24MM - Latest Football News & Live Scores',
  description: 'Stay updated with the latest football news, live scores, odds, and predictions on Goal24MM.',
};

export const revalidate = 3600; // revalidate at most every hour

export default async function HomePage() {
  let posts = [];
  let trendingPosts = [];
  let categories = [];
  let error = null;

  try {
    posts = await fetchRssPosts();
    trendingPosts = await fetchTrendingPosts(5);
    categories = await getAllCategories();
  } catch (err) {
    console.error('Failed to fetch homepage data:', err);
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
  const featuredNews = posts.slice(0, 1);
  const breakingNews = posts.slice(1, 5);
  const latestNews = posts.slice(5, 14);

  return (
    <main className="container mx-auto px-4 py-8 space-y-16">
      {/* Hero Featured Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="text-yellow-500 w-6 h-6" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Featured Story</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {featuredNews.map((post) => (
            <NewsCard key={post.slug} post={post} featured={true} />
          ))}
        </div>
      </section>

      {/* Trending News Section */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="text-yellow-500 w-6 h-6" />
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingPosts.slice(0, 4).map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Advertisement Banner */}
      <div className="py-4">
        <AdBanner position="middle" />
      </div>

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
        <div className="text-center mt-12">
          <Link 
            href="/articles" 
            className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="pb-10">
          <h2 className="text-2xl font-black mb-8 border-l-4 border-yellow-500 pl-4 uppercase tracking-tighter text-white">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="glass-card p-6 text-center hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-500 transition-colors line-clamp-2">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Popular Leagues Section */}
      <section className="pb-10">
        <h2 className="text-2xl font-black mb-8 border-l-4 border-yellow-500 pl-4 uppercase tracking-tighter text-white">
          Popular Leagues
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Premier League', 'Champions League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS', 'World Cup'].map((league) => (
            <div key={league} className="glass-card p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer group">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-500 transition-colors">{league}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
