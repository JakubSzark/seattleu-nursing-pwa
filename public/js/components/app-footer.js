const AppFooter = {
    name: 'app-footer',
    template: `
        <footer class="app-footer">
            <div class="app-footer-link"
                @click="onLinkPressed(0)"
            >
                <img
                    src="./images/home.svg"
                    alt="home"
                    width="38px"
                >
                <span>Home</span>
            </div>
            <div class="app-footer-link"
                @click="onLinkPressed(1)"
            >
                <img
                    src="./images/book.svg"
                    alt="booking"
                    width="38px"
                    
                >
                <span>Booking</span>
            </div>
            <div class="app-footer-link"
                @click="onLinkPressed(2)"
            >
                <img
                    src="./images/contact.svg"
                    alt="contact"
                    width="38px"
                >
                <span>Contact</span>
            </div>
        </footer>
    `,
    methods: {
        onLinkPressed: function(index) {
            this.$store.dispatch('changePage', index);
        }
    }
};

export default AppFooter;