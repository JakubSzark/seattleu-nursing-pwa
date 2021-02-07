import HomePage from "./pages/home-page.js";
import ContactPage from "./pages/contact-page.js";
import ProfilePage from "./pages/profile-page.js";
import LoginPage from "./pages/login-page.js";
import BookPage from "./pages/book-page.js";

const AppContent = {
    name: 'app-content',
    template: `
        <main class="app-content">
            <home-page v-if="page === 0" />
            <book-page v-if="page === 1" />
            <contact-page v-if="page === 2" />
            <login-page v-if="page == 3" />
            <profile-page v-if="page == 4" />
        </main>
    `,
    components: {
        HomePage,
        ContactPage,
        ProfilePage,
        LoginPage,
        BookPage,
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        }
    }
};

export default AppContent;