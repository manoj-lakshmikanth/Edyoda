// Register the service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
        askPermissionForNotifications();
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

// Ask user permission for push notifications

// Subscribe to push notifications

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push notification received:', data);

  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'You have a new notification',
    icon: data.icon || '/path/to/default/icon.png',
    badge: data.badge || '/path/to/badge.png',
  };

  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => {
        return self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });
      })
      .then((clients) => {
        for (const client of clients) {
          client.focus();
          client.navigate(data.url); // Replace 'data.url' with the desired page URL
        }
      })
  );
});

// Service Worker installation and activation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',

        // Add other static assets to cache here
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete outdated caches
            return cacheName.startsWith('my-cache') && cacheName !== 'my-cache';
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Intercept network requests and serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if available, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
