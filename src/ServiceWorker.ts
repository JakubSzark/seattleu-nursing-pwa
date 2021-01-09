const cacheName = 'sucs-cache';

// Put important files here
const initialCachedFiles = [
    "index.html"
];

// Handy method for printing with Serice Worker prefix
function log(message: string): void {
    console.log(`[Service Worker]: ${message}`);
}

// Install this service worker and cache initial files
self.addEventListener('install', (event: any) => {
    log("Installing");
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            log("Caching Initial Files...");
            return cache.addAll(initialCachedFiles)
                .catch((err) => console.log(err));
        })
    );
});

// Await browser to fetch for resources
self.addEventListener('fetch', (event: any) => {
    event.respondWith(
        // We want to check and see if we already cached the request
        caches.match(event.request).then((cacheResponse) => {
            log(`Fetching Resource [${event.request.url}]`);

            // If we already have it return, if not retrieve from internet
            return cacheResponse || fetch(event.response).then(async (response) => {
                log(`Caching New Resource: ${event.request.url}`);

                // Clone the data we just retrieved into cache
                const cache = await caches.open(cacheName);
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});