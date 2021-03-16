import { App, Component } from "..";
import $ from "jquery";

export default class Navbar implements Component {
    $navbar = $("#navbar");
    isHidden = false;

    created() {
        const $loginBtn = $('#navbar img[alt="login"]');

        if (App.user !== undefined) {
            $loginBtn.attr("src", "./images/icons/account.svg");
        }

        $loginBtn.on("click", function () {
            App.page.value = App.user ? "profile" : "login";
        });

        App.fullscreen.listen((fullscreen) => {
            if (fullscreen) this.$navbar.slideUp("fast");
            else this.$navbar.slideDown("fast");
        });

        $(window).on("scroll", () => {
            if (!App.fullscreen.value) {
                if (window.pageYOffset > 0) {
                    this.$navbar.slideUp(100);
                    this.isHidden = true;
                } else {
                    if (this.isHidden) {
                        this.$navbar.slideDown(100);
                        this.isHidden = false;
                    }
                }
            }
        });
    }
}
