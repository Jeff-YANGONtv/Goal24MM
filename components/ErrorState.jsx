'use client';

import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading this content.',
  onRetry = null,
  showHome = true 
}) {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h1>
      <p className="text-lg text-gray-400 max-w-md mb-10">{message}</p>
      
      <div className="flex gap-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
        {showHome && (
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ 
  title = 'No content found',
  message = 'We couldn\'t find what you were looking for.',
  icon: Icon = null,
  action = null
}) {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      {Icon && (
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-yellow-500" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-lg text-gray-400 max-w-md mb-10">{message}</p>
      
      {action && (
        <Link 
          href={action.href} 
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function NotFoundState() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-9xl font-black text-yellow-500 mb-4">404</div>
      <h1 className="text-4xl font-bold mb-4 text-white">Page Not Found</h1>
      <p className="text-lg text-gray-400 max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
