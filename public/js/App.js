import AppNav from "./AppNav.js";
import AppContent from "./AppContent.js";
import AppFooter from "./AppFooter.js";
import Store from "./Store.js";

// Vue

Vue.use(Vuex);

const store = new Vuex.Store(Store);

new Vue({
    el: '#app',
    store: store,
    template: `
        <div class="app">
            <AppNav v-if="!fullscreen" :isScrolled="isScrolled" />
            <AppContent :isScrolled="isScrolled && !fullscreen" />
            <AppFooter v-if="!fullscreen"/>
        </div>
    `,
    components: {
        AppNav,
        AppContent,
        AppFooter
    },
    data: function() {
        return {
            isScrolled: false,
        };
    },
    computed: {
        fullscreen: function() {
            return this.$store.state.fullscreen;
        }
    },
    created: function() {
        const user = localStorage.getItem("user");
        if (user === null) return;
        store.commit('CHANGE_USER', JSON.parse(user));
    },
    mounted: function() {
        window.addEventListener('scroll', () => {
            this.isScrolled = window.pageYOffset > 0;
        });
    },
});