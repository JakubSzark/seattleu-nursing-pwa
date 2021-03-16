export type Observer<T> = (value: T) => void;

export class EventSource<T> {
    private _value: T;
    private _observers: Array<Observer<T>>;

    constructor(value: T) {
        this._value = value;
        this._observers = [];
    }

    listen(observer: Observer<T>): void {
        this._observers.push(observer);
    }

    set value(newValue: T) {
        this._value = newValue;
        this._observers.forEach((o) => o(newValue));
    }

    get value(): T {
        return this._value;
    }
}
