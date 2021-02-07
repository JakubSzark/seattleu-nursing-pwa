import AppNav from "./components/app-nav.js";
import AppContent from "./components/app-content.js";
import AppFooter from "./components/app-footer.js";

// Vue

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        page: 0,
        user: undefined,
    },
    mutations: {
        CHANGE_USER: function(state, user) {
            state.user = user;
        },
        
        CHANGE_PAGE: function(state, index) {
            state.page = index;
        }
    },
    actions: {
        changePage: function(context, index) {
            if (context.state.page !== index) {
                console.log(`store: changing to page ${index}`)
                context.commit("CHANGE_PAGE", index);
            }
        },

        signIn: function(context, info) {
            if (context.state.user !== undefined) return;
            firebase.auth()
                .signInWithEmailAndPassword(info.email, info.password)
                .then((result) => {
                    console.log("info: signed in");
                    localStorage.setItem("user", JSON.stringify(result.user));
                    context.commit("CHANGE_USER", result.user);
                    context.commit("CHANGE_PAGE", 0);
                })
                .catch(() => {
                    console.log("error: failed to sign in!");
                });
        },

        signOut: function(context) {
            if (context.state.user === undefined) return;
            console.log("info: signing out");
            firebase.auth().signOut().then(() => {
                localStorage.removeItem("user");
                context.commit("CHANGE_USER", undefined);
                context.commit("CHANGE_PAGE", 0);
            });
        }
    },
    getters: {
        isLoggedIn: state => state.user !== undefined,

        profileImg: (state, getters) => { 
            return getters.isLoggedIn && state.user.photoURL !== null ? 
                state.user.photoURL : "./images/icons/account.svg";
        }
    }
});

new Vue({
    el: '#app',
    store: store,
    template: `
        <div class="app">
            <app-nav :style="isFullscreen" />
            <app-content />
            <app-footer :style="isFullscreen" />
        </div>
    `,
    components: {
        AppNav,
        AppContent,
        AppFooter
    },
    computed: {
        isFullscreen: function() {
            const fullscreen = store.state.page === 3;

            return {
                'opacity': (fullscreen ? 0 : 1),
                'pointer-events': (fullscreen ? 'none' : 'auto')
            };
        }
    },
    created: function() {
        const user = localStorage.getItem("user");
        if (user === null) return;
        store.commit('CHANGE_USER', JSON.parse(user));
    }
});