const CACHE_NAME = 'dynamic-authenticator-pwa-v3';
const ASSETS = ['./index.html', './manifest.json', './assets/icon.svg'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Important for iOS Safari: do not intercept page navigations.
  // Some Vercel clean-url/navigation responses are marked as redirected, and Safari rejects
  // redirected responses served through a service worker.
  if (request.mode === 'navigate') return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (!response || !response.ok || response.redirected) return response;

    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone()).catch(() => {});
    return response;
  })());
});
