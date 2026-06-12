import { fetchRSSFeed, getArticleBySlug, getRelatedArticles } from '@/lib/rss';
import { PostList } from '@/components/PostList';
import { AdBanner } from '@/components/AdBanner';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: `${article.title} - Goal24MM`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.pubDate.toISOString(),
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await fetchRSSFeed();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  const relatedArticles = await getRelatedArticles(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-secondary">
        <header className="bg-primary border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="text-accent hover:text-red-600">
              ← Back to News
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-400 mb-6">
              The article you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="inline-block bg-accent hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-primary border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-accent hover:text-red-600 text-sm font-semibold">
            ← Back to News
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="mb-8">
          {/* Featured Image */}
          {article.image && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6 bg-gray-700">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-3">
              {new Date(article.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none mb-8">
            <div
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </div>
        </article>

        {/* Ad Banner */}
        <AdBanner position="article" className="my-8" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-700">
            <PostList articles={relatedArticles} title="Related Articles" />
          </section>
        )}
      </main>
    </div>
  );
}
