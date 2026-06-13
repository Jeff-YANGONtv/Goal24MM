import { fetchRssPosts } from '@/lib/rss';
import NewsCard from '@/components/NewsCard';

export const metadata = {
  title: 'All Articles - Goal24MM',
  description: 'Browse all football articles and news on Goal24MM.',
};

export default async function ArticlesPage() {
  let posts = [];
  try {
    posts = await fetchRssPosts();
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">All Articles</h1>
        <p className="text-gray-400 mt-2">Discover our full collection of football stories.</p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
