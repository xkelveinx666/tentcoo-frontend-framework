import Dom from './dom';
import error from './error';
import isDom from './is_dom';

class Spring {
    constructor() {
        this.container = new Map();
    };
    selectElement(elementInfo) {
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
    getElement(elementInfo) {
        if (!elementInfo || typeof (elementInfo) !== 'string') {
            error(elementInfo + " is not a selector");
        }
        if (this.container.has(elementInfo)) {
            //保证单实例,使用try,catch防止ie8中出现空的dom元素而出现的没有权限异常
            try {
                if (isDom(this.container.get(elementInfo).getDom())) {
                    return this.container.get(elementInfo);
                } else {
                    return this.selectElement(elementInfo);
                }
            } catch (nullElementException) {
                return this.selectElement(elementInfo);
            }
        } else {
            return this.selectElement(elementInfo);
        }
    };
}

export default new Spring()