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
const jquery_1 = __importDefault(require("jquery"));
class Footer {
    constructor() {
        this.$buttons = jquery_1.default('#footer button');
    }
    created(app) {
        return __awaiter(this, void 0, void 0, function* () {
            this.$buttons.each(function (index) {
                this.addEventListener('click', () => app.page.value = index);
            });
            app.page.listen((page) => __awaiter(this, void 0, void 0, function* () {
                this.selectFooterButton(page);
            }));
            app.fullscreen.listen((fullscreen) => __awaiter(this, void 0, void 0, function* () {
                jquery_1.default('#footer').toggle(fullscreen);
            }));
            this.selectFooterButton(app.page.value);
        });
    }
    selectFooterButton(page) {
        this.$buttons.each(function (index) {
            this.disabled = page === index;
        });
    }
}
exports.default = Footer;
