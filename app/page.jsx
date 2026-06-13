import { fetchRssPosts } from '../lib/rss';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';

export const metadata = {
  title: 'Goal24MM - Myanmar Football News',
  description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
  openGraph: {
    title: 'Goal24MM - Myanmar Football News',
    description: 'Latest football news, articles, live scores, and odds for Myanmar fans.',
    url: 'https://goal24mm.com',
    type: 'website',
  },
};

export default async function HomePage() {
  let posts = [];
  try {
    posts = await fetchRssPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">Breaking News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map(post => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      
      <AdBanner position="middle" />

      <section>
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(6, 12).map(post => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
