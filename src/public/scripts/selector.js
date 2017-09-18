class Spring {
    constructor() {
        this.container = new WeakMap();
    };
    getElement(elementInfo = "document") {
        if (this.container.has(elementInfo)) {
            return this.container.get(elementInfo);
        } else {
            const matchElement = document.querySelectorAll(elementInfo);
            let element
            if (matchElement.length == 1) {
                element = matchElement[0];
            } else {
                element = matchElement;
            }
            this.container.set({
                elementInfo: element
            });
            return element;
        }
    }
}

export default new Spring()