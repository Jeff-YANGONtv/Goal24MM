'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegister() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          setRegistration(reg);
          console.log('Service Worker registered successfully:', reg);

          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is ready
                setUpdateAvailable(true);
              }
            });
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="glass-card p-4 border-yellow-500/50">
        <p className="text-sm text-white mb-3">A new version of Goal24MM is available!</p>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="flex-1 px-3 py-2 bg-yellow-500 text-black font-bold rounded text-sm hover:bg-yellow-400 transition-colors"
          >
            Update
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            className="flex-1 px-3 py-2 bg-gray-800 text-white font-bold rounded text-sm hover:bg-gray-700 transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
