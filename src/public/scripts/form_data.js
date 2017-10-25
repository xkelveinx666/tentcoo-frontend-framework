import Dom from './dom';

export default (function () {
    class FormData {
        constructor(dom) {
            const data = new WeakMap();
            if (!dom instanceof Dom) {
                console.error(dom + " is not the instance of Dom");
            }
        }
        append({
            key,
            value,
        }) {
            if (typeof (key) === 'string') {}
            map.set(key, value);
        }
    }

    return FormData;
})();