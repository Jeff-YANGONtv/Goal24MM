import { fetchRssPosts, fetchSingleRssPost, fetchRelatedPosts } from '@/lib/rss';
import Image from 'next/image';
import PostContent from '@/components/PostContent';
import NewsCard from '@/components/NewsCard';
import AdBanner from '@/components/AdBanner';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await fetchSingleRssPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Goal24MM',
    };
  }

  return {
    title: `${post.title} - Goal24MM`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export const revalidate = 3600; // revalidate at most every hour
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await fetchRssPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = await fetchSingleRssPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await fetchRelatedPosts(slug, 3);
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goal24mm.vercel.app';
  
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: [{
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Goal24MM',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    description: post.excerpt,
  };

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Featured Image */}
      <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 768px) 100vw, 896px"
          loading="eager"
        />
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-400 text-sm space-x-4 border-b border-gray-800 pb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>•</span>
          <span className="text-yellow-500 font-medium">{post.author}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-yellow max-w-none mb-12">
        <PostContent content={post.content} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-gray-800 pt-10">
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-yellow-500 pl-3 uppercase tracking-wider">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <NewsCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad Banner */}
      <div className="mt-12">
        <AdBanner position="bottom" />
      </div>
    </article>
  );
}
