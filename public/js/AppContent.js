import PageHome from "./pages/PageHome.js";
import PageContact from "./pages/PageContact.js";
import PageProfile from "./pages/PageProfile.js";
import PageBooking from "./pages/PageBooking.js";
import PageLogin from "./pages/PageLogin.js";
import PageSignup from "./pages/PageSignup.js";

export default {
    template: `
        <main class="app-content" :style="raised">
            <transition name="fade">
                <PageHome v-if="page === 0" />
                <PageBooking v-if="page === 1" />
                <PageContact v-if="page === 2" />
                <PageLogin v-if="page == 3" />
                <PageProfile v-if="page == 4" />
                <PageSignup v-if="page == 5" />
            </transition>
        </main>
    `,
    components: {
        PageHome,
        PageContact,
        PageProfile,
        PageBooking,
        PageLogin,
        PageSignup,
    },
    props: {
        isScrolled: false,
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        },

        raised: function() {
            return {
                'margin-top': this.isScrolled ? '-3.5rem' : '0',
            };
        }
    }
};