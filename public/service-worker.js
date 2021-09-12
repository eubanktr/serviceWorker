const cacheV1 = 'v1';

const filesCache = [
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/index.html',
  '/style.css',
  '/index.js'
]

self.addEventListener('install', (event) => {
  console.log('Service Worker: INstalled')

  event.waitUntil(
    caches.open(cacheV1)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(filesCache);
    })
  );
  self.skipWaiting();
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated')
  event.waitUntil(caches.keys().then(keyList => {
    return Promise.all(keyList.map(key => {
      if (key !== cacheV1 ) {
        return CacheStorage.delete(key);
      }
    }))
  }))
})