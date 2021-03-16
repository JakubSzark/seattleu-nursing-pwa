import { App, Page } from "../index";
import $ from "jquery";

import firebase from "firebase/app";
import "firebase/auth";

export default class LoginPage extends Page {
    page = "login";
    fullscreen = true;

    loaded() {
        $(document).on("click", "#signup", () => {
            App.page.value = "signup";
        });

        $(document).on("submit", "#login-form", function (ev) {
            const email = $("#email").val() as string;
            const password = $("#password").val() as string;

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    if (response.user !== null) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.user)
                        );
                    }

                    window.location.reload();
                })
                .catch((error) => {
                    App.displayMessage(error.message);
                });

            ev.preventDefault();
            return false;
        });
    }
}
