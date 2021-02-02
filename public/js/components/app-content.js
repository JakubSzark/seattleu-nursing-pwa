import HomePage from "./pages/home-page.js";
import ContactPage from "./pages/contact-page.js";
import BookPage from "./pages/book-page.js";

const AppContent = {
    name: 'app-content',
    template: `
        <main class="app-content">
            <home-page v-if="page === 0" />
            <contact-page v-if="page === 2" />
            <book-page v-if="page === 1" />
        </main>
    `,
    components: {
        HomePage,
        ContactPage,
        BookPage,
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        }
    }
};

export default AppContent;