"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.App = void 0;
const app_1 = __importDefault(require("firebase/app"));
const observer_js_1 = require("./observer.js");
// Components
const navbar_js_1 = __importDefault(require("./navbar.js"));
const content_js_1 = __importDefault(require("./content.js"));
const footer_js_1 = __importDefault(require("./footer.js"));
// Pages
const homePage_js_1 = __importDefault(require("./pages/homePage.js"));
const loginPage_js_1 = __importDefault(require("./pages/loginPage.js"));
const bookingPage_js_1 = __importDefault(require("./pages/bookingPage.js"));
const contactPage_js_1 = __importDefault(require("./pages/contactPage.js"));
class App {
    constructor() {
        this.page = new observer_js_1.EventSource(0);
        this.fullscreen = new observer_js_1.EventSource(false);
        this.components = [];
    }
    register(component) {
        this.components.push(component);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.components.forEach((component) => __awaiter(this, void 0, void 0, function* () {
                yield component.created(this);
            }));
            this.page.value = 0;
        });
    }
}
exports.App = App;
class Page {
    constructor() {
        this.index = 0;
        this.fullscreen = false;
    }
    created(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.page.listen((page) => __awaiter(this, void 0, void 0, function* () {
                if (page === this.index) {
                    app.fullscreen.value = this.fullscreen;
                    this.pageLoaded(app);
                }
            }));
        });
    }
    pageLoaded(app) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Page = Page;
(() => __awaiter(void 0, void 0, void 0, function* () {
    app_1.default.initializeApp({
        apiKey: "AIzaSyBLMWAQ8OJ5xpzsO2QudO39XLSM7gC_enQ",
        authDomain: "polonez-automotive.firebaseapp.com",
        projectId: "polonez-automotive",
        storageBucket: "polonez-automotive.appspot.com",
        messagingSenderId: "539924750906",
        appId: "1:539924750906:web:28271644cfc08939ae0b03",
        measurementId: "G-ZTP2SPCLP4"
    });
    const app = new App();
    // Components
    app.register(new navbar_js_1.default());
    app.register(new content_js_1.default());
    app.register(new footer_js_1.default());
    // Pages
    app.register(new homePage_js_1.default());
    app.register(new loginPage_js_1.default());
    app.register(new bookingPage_js_1.default());
    app.register(new contactPage_js_1.default());
    app.initialize();
}))();
