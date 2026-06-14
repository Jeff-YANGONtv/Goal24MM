'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Optimized Image Component
 * Handles image loading states, errors, and optimization
 */
export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes = null,
  onLoad = null,
  onError = null,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Fallback for failed images
  if (hasError) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <span className="text-gray-600 text-sm">Image unavailable</span>
      </div>
    );
  }

  const imageProps = {
    src: src || '/placeholder-news.jpg',
    alt: alt || 'Image',
    className: `${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`,
    onLoadingComplete: handleLoadingComplete,
    onError: handleError,
    priority,
    ...props,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
}
