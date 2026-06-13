import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ post }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4 hover:shadow-xl transition-shadow">
      {post.image && (
        <div className="relative w-full h-48">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}
      <div className="p-4">
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-red-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-2">
          {new Date(post.date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
      </div>
    </div>
  );
}
