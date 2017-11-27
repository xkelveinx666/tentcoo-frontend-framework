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
            for (let index = 0, len = matchElement.length; index < len; index++) {
                element.push(new Dom(matchElement[index]));
            }
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
            //直邮容器中存在该条信息，且该信息没有被垃圾回收或没被销毁时才返回，其他时候皆重新获取dom
            const elements = this.container.get(elementInfo);
            try {
                if (elements instanceof Array) {
                    let isDomArr = true;
                    elements.forEach((element) => {
                        if (!isDom(element.getDom())) {
                            isDomArr = false;
                            return;
                        }
                    })
                    return isDomArr ? elements : this.selectElement(elementInfo);
                } else if (isDom(elements.getDom())) {
                    return elements;
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