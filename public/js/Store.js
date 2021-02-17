export default {
    state: {
        page: 0,
        user: undefined,
        fullscreen: false,
    },
    mutations: {
        CHANGE_USER: function(state, user) {
            state.user = user;
        },
        
        CHANGE_PAGE: function(state, index) {
            state.page = index;
        },

        CHANGE_FULLSCREEN: function(state, fullscreen) {
            state.fullscreen = fullscreen;
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
        },

        signUp: function(context, info) {
            if (context.state.user !== undefined) return;
            firebase.auth()
                .createUserWithEmailAndPassword(info.email, info.password)
                .then((result) => {
                    console.log("info: account created");
                    localStorage.setItem("user", JSON.stringify(result.user));
                    context.commit("CHANGE_USER", result.user);
                    context.commit("CHANGE_PAGE", 0);
                })
                .catch(() => {
                    console.log("error: failed to make account!");
                });
        },

        setFullscreen: function(context, fullscreen) {
            console.log("info: setting fullscreen");
            context.commit("CHANGE_FULLSCREEN", fullscreen);
        }
    },
    getters: {
        isLoggedIn: state => state.user !== undefined,

        profileImg: (state, getters) => { 
            return getters.isLoggedIn && state.user.photoURL !== null ? 
                state.user.photoURL : "./images/icons/account.svg";
        }
    }
};