const CACHE_NAME = 'my-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/logo.png',
    '/images/search.svg',
    '/images/voice.png',
    '/favicon.ico',
    '/offline.html' // Include the offline page in the cache
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return the cached response if found
                if (response) {
                    return response;
                }
                // Fetch from network otherwise
                return fetch(event.request)
                    .catch(() => {
                        // Return the offline page when network request fails
                        return caches.match('/offline.html');
                    });
            })
    );
});
