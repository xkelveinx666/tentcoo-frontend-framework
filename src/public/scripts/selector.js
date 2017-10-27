import Dom from './dom';
import error from './error';

class Spring {
    constructor() {
        this.container = new Map();
    };
    getElement(elementInfo) {
        if (!elementInfo || typeof (elementInfo) !== 'string') {
            error(elementInfo + " is not a selector");
        }
        if (this.container.has(elementInfo)) {
            //保证单实例
            return this.container.get(elementInfo);
        } else {
            const matchElement = document.querySelectorAll(elementInfo);
            if (!matchElement || matchElement.length == 0) {
                error(matchElement + " has not matched element");
            }
            let element
            if (matchElement.length == 1) {
                element = new Dom(matchElement[0]);
            } else {
                element = [];
                const nodeListArray = Array.from(matchElement);
                nodeListArray.forEach((node) => {
                    element.push(new Dom(node));
                });
            }
            this.container.set(elementInfo, element);
            return element;
        }
    };
}

export default new Spring()