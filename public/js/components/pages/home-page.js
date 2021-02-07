import BaseCard from "../base-card.js";

const HomePage = {
    name: 'home-page',
    template: `
        <div class="home-page">
            <base-card 
                :imageUrl="'./images/shop/1.jpg'" 
                :title="'About Us'"
            >
                <p>
                    Polonez Automotive has been serving the auto service needs of 
                    customers in Des Moines and the surrounding area for 11 years.
                    During that time we have gained the trust and friendship of 
                    our customers.
                </p>
            </base-card>
            <base-card 
                :imageUrl="'./images/shop/2.jpg'" 
                :title="'Services'"
            >
                <ul>
                    <li>Auto Repair</li>
                    <li>Custom Parts Installation</li>
                    <li>Factory Maintenance</li>
                </ul>
                <br>
                <p class="center">
                    We work on most American, European, and Asian Vehicles!
                </p>
            </base-card>
            <base-card 
                :imageUrl="'./images/shop/3.jpg'" 
                :title="'Payment Options'"
            >
                <ul>
                    <li>Visa</li>
                    <li>Mastercard</li>
                </ul>
                <br>
                <p class="center">
                    AARP and Military Discounts Available
                </p>
            </base-card>
        </div>
    `,
    components: {
        BaseCard
    }
};

export default HomePage;
