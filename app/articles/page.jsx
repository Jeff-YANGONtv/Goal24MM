import { fetchRssPosts } from '../../lib/rss';
import NewsCard from '../../components/NewsCard';

export const metadata = {
  title: 'All Articles - Goal24MM',
  description: 'Browse all football articles from Goal24MM.',
};

export default async function ArticlesPage() {
  let posts = [];
  try {
    posts = await fetchRssPosts();
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Articles</h1>
        <p className="text-gray-400">Browse all football articles and news from Goal24MM</p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
