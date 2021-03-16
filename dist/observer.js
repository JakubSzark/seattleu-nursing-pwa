"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSource = void 0;
class EventSource {
    constructor(value) {
        this._value = value;
        this._observers = [];
    }
    listen(observer) {
        this._observers.push(observer);
    }
    set value(newValue) {
        this._value = newValue;
        this._observers.forEach(o => o(newValue));
    }
    get value() {
        return this._value;
    }
}
exports.EventSource = EventSource;
