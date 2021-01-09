async function installServiceWorker() {
    if ('serviceWorker' in navigator) {
        const path = './ServiceWorker.js';
        await navigator.serviceWorker.register(path);
    } else {
        console.warn("Service workers are not supported!");
    }
}

(async () => {
    await installServiceWorker();
})();

