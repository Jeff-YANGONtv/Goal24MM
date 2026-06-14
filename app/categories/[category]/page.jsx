import { fetchPostsByCategory, getAllCategories } from '@/lib/rss';
import NewsCard from '@/components/NewsCard';
import { EmptyState } from '@/components/ErrorState';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} - Goal24MM`,
    description: `Latest football news and articles about ${decodedCategory}.`,
    openGraph: {
      title: `${decodedCategory} - Goal24MM`,
      description: `Latest football news and articles about ${decodedCategory}.`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: encodeURIComponent(category),
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);

  let posts = [];
  let error = null;

  try {
    posts = await fetchPostsByCategory(decodedCategory, 30);
  } catch (err) {
    console.error(`Failed to fetch posts for category ${decodedCategory}:`, err);
    error = 'Failed to load category posts.';
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-yellow-500 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-yellow-500">{decodedCategory}</span>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
          {decodedCategory}
        </h1>
        <p className="text-gray-400">
          {posts.length > 0
            ? `Showing ${posts.length} article${posts.length !== 1 ? 's' : ''} in ${decodedCategory}`
            : `No articles found in ${decodedCategory}`}
        </p>
      </header>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && !error && (
        <EmptyState
          title="No Articles Found"
          message={`We don't have any articles in the ${decodedCategory} category yet.`}
          action={{
            href: '/',
            label: 'Back to Home',
          }}
        />
      )}

      {/* Posts Grid */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
