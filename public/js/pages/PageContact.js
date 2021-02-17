import Card from "../components/Card.js";

export default {
    template: `
        <div class="contact-page">
            <Card>
                <h2 class="center">Contact Information</h2>
                <h3 class="center">Address</h3>
                <p class="center">
                    22201 Marine View Drive South, Unit D Des Moines, WA 98198
                </p>
                <h3 class="center">Phone Number</h3>
                <a class="center" href="#">
                    206-824-3024
                </a>
            </Card>
            
            <div class="contact-page-map">
                <a style="display:block;" href="https://www.google.com/maps/search/?api=1&amp;channel=mws-visit&amp;hl=en-US&amp;query=47.402844,-122.325106" target="_blank">            
                    <img id="map_image_5872057" data-src="https://maps.googleapis.com/maps/api/staticmap?channel=mws-visit&amp;language=en_US&amp;center=47.403038681564%2C-122.3252559037&amp;zoom=16&amp;size=860x400&amp;maptype=roadmap&amp;client=gme-11internet&amp;markers=47.402844,-122.325106&amp;signature=RuAuR0WlGPFIWclsnRJ3uYksV80=" 
                    src="https://maps.googleapis.com/maps/api/staticmap?channel=mws-visit&amp;language=en_US&amp;center=47.403038681564%2C-122.3252559037&amp;zoom=16&amp;size=860x400&amp;maptype=roadmap&amp;client=gme-11internet&amp;markers=47.402844,-122.325106&amp;signature=RuAuR0WlGPFIWclsnRJ3uYksV80=" alt="">
                </a>
            </div>

            <Card :imageUrl="'./images/towing.jpg'">
                <h2 class="center">Need a Tow?</h2>
                <p class="center">Call Hobbies Towing Service<a>206-529-7321</a></p>
            </Card>
        </div>
    `,
    components: {
        Card
    },
    mounted: function() {
        this.$store.dispatch("setFullscreen", false);
    },
};