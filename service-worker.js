const CACHE_NAME = 'latinica2cirilica-cache';

const urlsToCache = [
	'/latinica2cirilica/',
	'/latinica2cirilica/icons/icon-72x72.png',
	'/latinica2cirilica/icons/icon-96x96.png',
	'/latinica2cirilica/icons/icon-128x128.png',
	'/latinica2cirilica/icons/icon-144x144.png',
	'/latinica2cirilica/icons/icon-152x152.png',
	'/latinica2cirilica/icons/icon-192x192.png',
	'/latinica2cirilica/icons/icon-384x384.png',
	'/latinica2cirilica/icons/icon-512x512.png',
	'/latinica2cirilica/launch-screens/launch-screen-2048x2732.png',
	'/latinica2cirilica/launch-screens/launch-screen-2732x2048.png',
	'/latinica2cirilica/launch-screens/launch-screen-1668x2388.png',
	'/latinica2cirilica/launch-screens/launch-screen-2388x1668.png',
	'/latinica2cirilica/launch-screens/launch-screen-1668x2224.png',
	'/latinica2cirilica/launch-screens/launch-screen-2224x1668.png',
	'/latinica2cirilica/launch-screens/launch-screen-1536x2048.png',
	'/latinica2cirilica/launch-screens/launch-screen-2048x1536.png',
	'/latinica2cirilica/launch-screens/launch-screen-1536x2048.png',
	'/latinica2cirilica/launch-screens/launch-screen-2048x1536.png',
	'/latinica2cirilica/launch-screens/launch-screen-1242x2688.png',
	'/latinica2cirilica/launch-screens/launch-screen-2688x1242.png',
	'/latinica2cirilica/launch-screens/launch-screen-1125x2436.png',
	'/latinica2cirilica/launch-screens/launch-screen-2436x1125.png',
	'/latinica2cirilica/launch-screens/launch-screen-828x1792.png',
	'/latinica2cirilica/launch-screens/launch-screen-1792x828.png',
	'/latinica2cirilica/launch-screens/launch-screen-1125x2436.png',
	'/latinica2cirilica/launch-screens/launch-screen-2436x1125.png',
	'/latinica2cirilica/launch-screens/launch-screen-1242x2208.png',
	'/latinica2cirilica/launch-screens/launch-screen-2208x1242.png',
	'/latinica2cirilica/launch-screens/launch-screen-750x1334.png',
	'/latinica2cirilica/launch-screens/launch-screen-1334x750.png',
	'/latinica2cirilica/launch-screens/launch-screen-1242x2208.png',
	'/latinica2cirilica/launch-screens/launch-screen-2208x1242.png',
	'/latinica2cirilica/launch-screens/launch-screen-750x1334.png',
	'/latinica2cirilica/launch-screens/launch-screen-1334x750.png',
	'/latinica2cirilica/launch-screens/launch-screen-1242x2208.png',
	'/latinica2cirilica/launch-screens/launch-screen-2208x1242.png',
	'/latinica2cirilica/launch-screens/launch-screen-750x1334.png',
	'/latinica2cirilica/launch-screens/launch-screen-1334x750.png',
	'/latinica2cirilica/launch-screens/launch-screen-640x1136.png',
	'/latinica2cirilica/launch-screens/launch-screen-1136x640.png',
	'/latinica2cirilica/favicons/apple-touch-icon-57x57.png',
	'/latinica2cirilica/favicons/apple-touch-icon-60x60.png',
	'/latinica2cirilica/favicons/apple-touch-icon-72x72.png',
	'/latinica2cirilica/favicons/apple-touch-icon-76x76.png',
	'/latinica2cirilica/favicons/apple-touch-icon-114x114.png',
	'/latinica2cirilica/favicons/apple-touch-icon-120x120.png',
	'/latinica2cirilica/favicons/apple-touch-icon-144x144.png',
	'/latinica2cirilica/favicons/apple-touch-icon-152x152.png',
	'/latinica2cirilica/favicons/favicon-16x16.png',
	'/latinica2cirilica/favicons/favicon-32x32.png',
	'/latinica2cirilica/favicons/favicon-96x96.png',
	'/latinica2cirilica/favicons/favicon-128x128.png',
	'/latinica2cirilica/favicons/favicon-196x196.png',
	'/latinica2cirilica/favicons/ms-tile-70x70.png',
	'/latinica2cirilica/favicons/ms-tile-144x144.png',
	'/latinica2cirilica/favicons/ms-tile-150x150.png',
	'/latinica2cirilica/favicons/ms-tile-310x150.png',
	'/latinica2cirilica/favicons/ms-tile-310x310.png',
	'/latinica2cirilica/favicons/favicon.ico'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          })
        );

        return response;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
  );
});
