import { Page } from "../index";
import $ from "jquery";

import firebase from "firebase/app";
import "firebase/auth";
import { App } from "..";

export default class SignupPage extends Page {
    page = "signup";
    fullscreen = true;
    lastPage = "login";

    loaded() {
        $("#signup-form").on("submit", (ev) => {
            const email = $("#email").val() as string;
            const password = $("#password").val() as string;
            const confirm = $("#confirm-password").val() as string;

            if (password === confirm) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.user)
                        );
                        window.location.reload();
                    })
                    .catch((error) => {
                        App.displayMessage(error.message);
                    });
            }

            ev.preventDefault();
            return false;
        });
    }
}
