export default {
    template: `
        <footer class="app-footer">
            <div class="app-footer-link"
                @click="onLinkPressed(0)"
            >
                <img
                    src="./images/icons/home.svg"
                    alt="home"
                    width="30px"
                >
                <span>Home</span>
            </div>
            <div class="app-footer-link"
                @click="onLinkPressed(1)"
            >
                <img
                    src="./images/icons/book.svg"
                    alt="booking"
                    width="30px"
                    
                >
                <span>Booking</span>
            </div>
            <div class="app-footer-link"
                @click="onLinkPressed(2)"
            >
                <img
                    src="./images/icons/contact.svg"
                    alt="contact"
                    width="30px"
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