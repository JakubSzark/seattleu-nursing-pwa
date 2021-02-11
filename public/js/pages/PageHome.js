import Card from "../components/Card.js";

export default {
    template: `
        <div class="home-page">
            <Card>
                <h2 class="center"><u>Open 9AM - 6PM on Weekdays</u></h2>
            </Card>
            
            <Card 
                :imageUrl="'./images/shop/1.jpg'" 
                :title="'About Us'"
            >
                <p>
                    Polonez Automotive has been serving the auto service needs of 
                    customers in Des Moines for <strong>11 years.</strong>
                </p>
                <p>
                    During that time we have gained the <strong>trust</strong> and <strong>friendship</strong> of 
                    our customers.
                </p>
            </Card>

            <Card 
                :imageUrl="'./images/shop/2.jpg'" 
                :title="'Services'"
            >
                <p>
                    We provide a range of services to our customers.
                    Common services include:
                </p>
                <ul>
                    <li>Auto Repair</li>
                    <li>Custom Parts Installation</li>
                    <li>Factory Maintenance</li>
                </ul>
                <br>
                <p class="center">
                    We can work on most American, European, and Asian Vehicles!
                </p>
            </Card>

            <Card :title="'Payment Options'">
                <p>
                    Many payment and financing options are available 
                    including AARP and military discounts.
                </p>
                <ul>
                    <li>Visa</li>
                    <li>American Express</li>
                    <li>Mastercard</li>
                    <li>Cash</li>
                </ul>
                <br>
            </Card>

            <Card :title="'Questions?'">
                <a href="#" @click="onContactUsPressed">Contact Us</a>
            </Card>
        </div>
    `,
    components: {
        Card
    },
    methods: {
        onContactUsPressed: function() {
            this.$store.dispatch('changePage', 2);
        }
    }
};