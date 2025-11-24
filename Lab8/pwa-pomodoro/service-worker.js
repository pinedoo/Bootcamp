const CACHE_NAME = 'pwa-pomodoro-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/dist/bundle.js',
    '/manifest.json',
    '/src/assets/sounds/sheep.mp3',
    '/src/assets/logos/TimerPWA-logos_transparent.png',
    '/src/assets/logos/TimerPWA-logos_white.png',
    '/src/assets/fonts/estandar.woff2'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker instalado y cache abierto');
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
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
