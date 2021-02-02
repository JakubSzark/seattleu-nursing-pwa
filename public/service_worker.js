const cacheName = 'sucs-cache';

// Put important files here
const initialCachedFiles = [
    "index.html",
    "images/icon.png",
    "js/main.js",
    "service_worker.js",
    "css/style.css"
];

// Handy method for printing with Serice Worker prefix
function log(message) {
    console.log(`worker: ${message}`);
}

// Install this service worker and cache initial files
self.addEventListener('install', (event) => {
    log("installing");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            log("caching initial files...");
            return cache.addAll(initialCachedFiles)
                .catch((err) => console.log(err));
        })
    );
});

// Await browser to fetch for resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // We want to check and see if we already cached the request
        caches.match(event.request).then((cacheResponse) => {
            log(`fetching resource\n[${event.request.url}]`);

            // If we already have it return, if not retrieve from internet
            return cacheResponse || fetch(event.request).then(async (response) => {
                log(`caching new resource\n[${event.request.url}]`);

                // Clone the data we just retrieved into cache
                const cache = await caches.open(cacheName);
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});