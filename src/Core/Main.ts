function main() {
    console.log("[Main]: Loaded");

    if (!navigator.onLine) {
        const offlineMode = document.querySelector('#offline-mode');
        offlineMode?.attributes.removeNamedItem('hidden');
    }
}

export default main;