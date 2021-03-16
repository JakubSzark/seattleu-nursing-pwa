import firebase from "firebase/app";
import { EventSource } from "./observer";
import $ from "jquery";

// Exports

export interface Component {
    created(): void;
}

/**
 * This is the App's global state and component manager.
 * This holds functions and data that other components might need.
 */
export class App {
    static page = new EventSource("home");
    static fullscreen = new EventSource(false);
    static user?: firebase.User;
    static isAdmin: boolean = false;

    private static components: Array<Component> = [];
    private static pages: Array<Page> = [];

    private static getStoredUser(): firebase.User | undefined {
        const user = localStorage.getItem("user");
        return user === null ? undefined : JSON.parse(user);
    }

    static register(component: Component): void {
        App.components.push(component);
    }

    static addPage(page: Page): void {
        App.pages.push(page);
    }

    static displayMessage(message: string) {
        const $message = $("#message");
        $message.text(message);
        $message.slideDown("fast", () => {
            setTimeout(() => {
                $message.slideUp("fast");
            }, 3000);
        });
    }

    static initialize(): void {
        App.user = App.getStoredUser();

        if (App.user) {
            Database.userIsAdmin(App.user?.uid!).then(
                (isAdmin) => (App.isAdmin = isAdmin)
            );
        }

        App.components.forEach((component) => component.created());
        App.pages.forEach((page) => page.created());
        App.page.value = "home";
    }
}

/**
 * A Page in our App. Contains code for transitioning and
 * for moving between fullscreen and non-fullscreen.
 */
export class Page implements Component {
    /** The name of this page */
    public readonly page: string = "home";
    /** Whether this page is fullscreen */
    protected fullscreen: boolean = false;
    /** The fallback / last page */
    protected lastPage: string = "home";

    private setupBackButton() {
        const $backBtn = $("#back");
        $backBtn.off("click").on("click", () => {
            App.page.value = this.lastPage;
        });

        if (this.fullscreen) $backBtn.fadeIn("fast");
        else $backBtn.fadeOut("fast");
    }

    created(): void {
        App.page.listen((page) => {
            if (page === this.page) {
                App.fullscreen.value = this.fullscreen;
                this.setupBackButton();

                const $content = $("#content");

                // Load the Page HTML in the the App
                $content.fadeOut("fast", () => {
                    $content.load(`./pages/${this.page}.html`, () => {
                        $content.fadeIn("fast");
                        this.loaded();
                    });
                });
            }
        });
    }

    /** Called when the page is loaded */
    loaded(): void {}
}

// Components

import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages

import HomePage from "./pages/pageHome";
import LoginPage from "./pages/pageLogin";
import BookingPage from "./pages/pageBooking";
import ContactPage from "./pages/pageContact";
import ProfilePage from "./pages/pageProfile";
import SignupPage from "./pages/pageSignup";
import { Database } from "./database";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Main

(async () => {
    firebase.initializeApp({
        apiKey: "AIzaSyBLMWAQ8OJ5xpzsO2QudO39XLSM7gC_enQ",
        authDomain: "polonez-automotive.firebaseapp.com",
        projectId: "polonez-automotive",
        storageBucket: "polonez-automotive.appspot.com",
        messagingSenderId: "539924750906",
        appId: "1:539924750906:web:28271644cfc08939ae0b03",
        measurementId: "G-ZTP2SPCLP4",
    });

    // Components

    App.register(new Navbar());
    App.register(new Footer());

    // Pages

    App.addPage(new HomePage());
    App.addPage(new LoginPage());
    App.addPage(new BookingPage());
    App.addPage(new ContactPage());
    App.addPage(new ProfilePage());
    App.addPage(new SignupPage());

    App.initialize();
})();
