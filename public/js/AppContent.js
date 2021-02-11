import PageHome from "./pages/PageHome.js";
import PageContact from "./pages/PageContact.js";
import PageProfile from "./pages/PageProfile.js";
import PageBooking from "./pages/PageBooking.js";
import PageLogin from "./pages/PageLogin.js";

export default {
    template: `
        <main class="app-content">
            <PageHome v-if="page === 0" />
            <PageBooking v-if="page === 1" />
            <PageContact v-if="page === 2" />
            <PageLogin v-if="page == 3" />
            <PageProfile v-if="page == 4" />
        </main>
    `,
    components: {
        PageHome,
        PageContact,
        PageProfile,
        PageBooking,
        PageLogin,
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        }
    }
};