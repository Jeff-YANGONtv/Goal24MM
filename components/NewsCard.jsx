'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NewsCard({ article }) {
  const formattedDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/news/${article.slug}`}>
      <article className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-700 overflow-hidden">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <span className="text-4xl">⚽</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Date */}
          <p className="text-xs text-gray-400 mb-2">{formattedDate}</p>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-accent transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2 mb-3">
            {article.description}
          </p>

          {/* Read More Link */}
          <div className="flex items-center text-accent text-sm font-semibold hover:text-red-600 transition-colors">
            Read More
            <span className="ml-2">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
