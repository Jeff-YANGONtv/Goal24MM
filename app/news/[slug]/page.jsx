import { fetchRssPosts, fetchSingleRssPost } from '../../../lib/rss';
import PostContent from '../../../components/PostContent';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const post = await fetchSingleRssPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: post.image,
      url: post.link,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchRssPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function SingleArticlePage({ params }) {
  const post = await fetchSingleRssPost(params.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-400 mb-6">Sorry, the article you're looking for doesn't exist.</p>
        <Link href="/" className="text-red-600 hover:text-red-500">
          Back to Home
        </Link>
      </div>
    );
  }

  const allPosts = await fetchRssPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-400 mb-6">
          <div>
            <span>{new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
            <span className="mx-2">|</span>
            <span>Goal24MM</span>
            {post.creator && (
              <>
                <span className="mx-2">|</span>
                <span>By {post.creator}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {post.image && (
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        </div>
      )}

      <PostContent content={post.content} />

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link key={relatedPost.slug} href={`/news/${relatedPost.slug}`}>
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  {relatedPost.image && (
                    <div className="relative w-full h-40">
                      <Image 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-bold line-clamp-2 hover:text-red-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(relatedPost.date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
