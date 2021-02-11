export default {
    template: `
        <nav class="app-nav">
            <img 
                class="app-nav-logo"
                src="./images/icons/logo.svg" 
                alt="logo" 
                width="38px" 
                @click="onLogoPressed"
            >
            <div class="app-nav-name">
                Polonez Automotive
            </div>
            <img
                class="app-nav-account"
                :src="accountImage"
                alt="account"
                width="38px"
                @click="onAccountPressed"
            >
        </nav>
    `,
    computed: {
        accountImage: function() {
            const isLoggedIn = this.$store.state.user !== undefined;

            if (isLoggedIn) {
                const profileImg = this.$store.state.user.photoURL;
                return profileImg !== null ? profileImg : "./images/icons/account.svg";
            } else {
                return "./images/icons/login.svg";
            }
        }
    },
    methods: {
        onLogoPressed: function() {
            this.$store.dispatch('changePage', 0);
        },

        onAccountPressed: function() {
            const isLoggedIn = this.$store.state.user !== undefined;
            this.$store.dispatch('changePage', isLoggedIn ? 4 : 3);
        }
    }
};