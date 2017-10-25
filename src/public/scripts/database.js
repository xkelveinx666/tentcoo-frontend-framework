class DataBase {
    constructor() {
        // this.map = new Map();
    }
    save(key, value) {
        if (typeof (key) !== 'string') {
            throw TypeError();
        }
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
        // return this.map.set(key, value);
    }
    find(key) {
        if (typeof (key) !== 'string') {
            throw TypeError();
        }
        return JSON.parse(window.localStorage.getItem(key));
    }
    delete(key) {
        if (typeof (key) !== 'string') {
            throw TypeError();
        }
        return window.localStorage.removeItem(key);
    }
}

export default new DataBase();