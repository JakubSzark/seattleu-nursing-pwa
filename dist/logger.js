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
class Logger {
    constructor(message) {
        this.message = message;
    }
    output() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const $log = jquery_1.default(document.body).append("<h1>Loading...</h1>");
                $log.html();
                setTimeout(() => {
                    $log.fadeOut('fast', () => {
                        $log.html(`<h1>${this.message}</h1>`);
                        $log.fadeIn('fast', () => resolve());
                    });
                }, 1000);
            });
        });
    }
}
exports.default = Logger;
