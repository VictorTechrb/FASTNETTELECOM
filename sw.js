
const CACHE_NAME = 'fastnet-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/css/utilities.css',
  '/assets/css/carrossel.css',
  '/assets/css/components.css',
  '/assets/js/performance.js',
  '/assets/js/carrossel.js',
  '/assets/js/scripts.js',
  '/assets/js/planos-interativos.js',
  '/assets/images/fastsimbol.ico',
  '/includes/navbar.html',
  '/includes/footer.html',
  'https:
  'https:
  'https:
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
