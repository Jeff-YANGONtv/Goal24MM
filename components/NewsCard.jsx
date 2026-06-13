import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-4 shadow-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
            <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-widest">
              Featured
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center text-gray-300 text-sm space-x-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
              <span>•</span>
              <span className="text-yellow-500 font-medium">{post.author}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${post.slug}`} className="group flex flex-col h-full bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-GB')}
          </time>
          <span>•</span>
          <span className="text-yellow-500 font-medium uppercase tracking-tighter">News</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center text-yellow-500 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
