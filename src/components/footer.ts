import { App, Component } from "../index";
import $ from "jquery";

export default class Footer implements Component {
    $buttons = $("#footer button");
    $footer = $("#footer");

    created() {
        // Click Buttons to Change Page
        $("#home-btn").on("click", () => (App.page.value = "home"));
        $("#booking-btn").on("click", () => (App.page.value = "booking"));
        $("#contact-btn").on("click", () => (App.page.value = "contact"));

        // Page Change
        App.page.listen((page) => {
            this.selectFooterButton(page);
        });

        // Fullscreen Change
        App.fullscreen.listen((fullscreen) => {
            if (!fullscreen) this.$footer.slideDown("fast");
            else this.$footer.slideUp("fast");
        });

        this.selectFooterButton(App.page.value);
    }

    selectFooterButton(page: string): void {
        const pageVal = page == "home" ? 0 : page == "booking" ? 1 : 2;
        this.$buttons.each(function (index) {
            (<HTMLButtonElement>this).disabled = pageVal === index;
        });
    }
}
