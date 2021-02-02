import AppNav from "./components/app-nav.js";
import AppContent from "./components/app-content.js";
import AppFooter from "./components/app-footer.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {}
});

new Vue({
    el: '#app',
    store: store,
    template: `
        <div class="app">
            <app-nav></app-nav>
            <app-content></app-content>
            <app-footer></app-footer>
        </div>
    `,
    components: {
        AppNav,
        AppContent,
        AppFooter
    }
});