"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cacheName = 'sucs-cache';
// Put important files here
const initialCachedFiles = [
    "index.html",
    "Images/Favicon.png",
    "Core/Main.js",
    "ServiceWorker.js"
];
// Handy method for printing with Serice Worker prefix
function log(message) {
    console.log(`[Service Worker]: ${message}`);
}
// Install this service worker and cache initial files
self.addEventListener('install', (event) => {
    log("Installing");
    event.waitUntil(caches.open(cacheName).then((cache) => {
        log("Caching Initial Files...");
        return cache.addAll(initialCachedFiles)
            .catch((err) => console.log(err));
    }));
});
// Await browser to fetch for resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
    // We want to check and see if we already cached the request
    caches.match(event.request).then((cacheResponse) => {
        log(`Fetching Resource [${event.request.url}]`);
        // If we already have it return, if not retrieve from internet
        return cacheResponse || fetch(event.request).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            log(`Caching New Resource: ${event.request.url}`);
            // Clone the data we just retrieved into cache
            const cache = yield caches.open(cacheName);
            cache.put(event.request, response.clone());
            return response;
        }));
    }));
});
