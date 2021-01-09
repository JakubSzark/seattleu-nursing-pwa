function main() {
    console.log("[Main]: Loaded");
    if (!navigator.onLine) {
        const offlineMode = document.querySelector('#offline-mode');
        offlineMode === null || offlineMode === void 0 ? void 0 : offlineMode.attributes.removeNamedItem('hidden');
    }
}
export default main;
