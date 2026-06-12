'use client';

import Image from 'next/image';

export function AdBanner({ position = 'top', className = '' }) {
  const adMessages = [
    'Premium Football Analysis',
    'Live Score Updates',
    'Expert Predictions',
    'Exclusive Interviews',
  ];

  const randomMessage = adMessages[Math.floor(Math.random() * adMessages.length)];

  return (
    <div
      className={`w-full bg-gradient-to-r from-accent to-red-600 rounded-lg overflow-hidden shadow-lg my-6 ${className}`}
    >
      <div className="relative w-full h-32 md:h-40 flex items-center justify-center">
        {/* Ad Banner Background */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {randomMessage}
            </h3>
            <p className="text-white text-sm md:text-base opacity-90">
              Stay updated with Goal24MM
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-4 text-white text-3xl opacity-20">⚽</div>
        <div className="absolute bottom-2 left-4 text-white text-3xl opacity-20">🏆</div>
      </div>
    </div>
  );
}
