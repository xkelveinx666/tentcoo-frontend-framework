import Dom from './dom';

class JSONData {
    constructor(data) {
        this.json;
        if (data) {
            if (data instanceof Map) {
                this.map = data;
                throw TypeError();
            } else if (typeof (data) === 'string' && JSON.parse(data)) {
                this.json = data;
                this.map = new Map();
                this.strToMap();
            } else {
                throw TypeError();
            }
        } else {
            this.map = new Map();
        }
    }
    get(key) {
        if (typeof (key) !== 'string') {
            throw TypeError();
        }
        return this.map.get(key);
    }
    append(key, value) {
        if (typeof (key) !== 'string') {
            throw TypeError();
        }
        this.map.set(key, value);
    }
    mapToStr() {
        let keys = [],
            values = [];
        if (this.map.keys() instanceof Array) {
            keys = this.map.keys();
            values = this.map.values();
        } else {
            keys = [...this.map.keys()];
            values = [...this.map.values()];
        }
        let result = `{`;
        for (let index = 0, length = keys.length; index < length; index++) {
            result += `"${keys[index]}":${JSON.stringify(values[index])},`;
        }
        result = result.substring(0, result.length - 1);
        result += `}`;
        this.json = result;
    }
    strToMap() {
        const jsonObj = JSON.parse(this.json);
        for (let key in jsonObj) {
            this.append(key, jsonObj[key]);
        }
    }
    toString() {
        this.mapToStr();
        return this.json;
    }
    JSON() {
        this.mapToStr();
        return this.json;
    }
    Object() {
        this.mapToStr();
        return JSON.parse(this.json);
    }
}

export default JSONData;