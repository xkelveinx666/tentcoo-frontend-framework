import isDom from './is_dom';
import support from './event_support';
import error from './error';
import isTextBox from './is_text_box';

class Dom {
    constructor(dom) {
        if (!dom) {
            error("dom has not defined");
        }
        if (typeof (dom) === 'string') {
            dom = document.createElement(dom);
        }
        if (!isDom(dom)) {
            error(dom + " is no the type of dom");
        }
        this.dom = dom;
        this.className = dom.className;
        this.tagName = dom.tagName.toLowerCase();
        this.id = dom.id;
        this.value = dom.innerHTML;
        if (isTextBox(this.dom)) {
            this.value = dom.value;
            this.bind();
        }
    };
    getAttr(attrName) {
        if (typeof (attrName) !== 'string') {
            error(attrName + " is not a string in getAttr function");
            return false;
        }
        return this.dom.getAttribute(attrName);
    }
    setAttr(attrName, attrValue) {
        if (typeof (attrName) !== 'string') {
            error(attrName + " is not a string in setAttr function");
            return false;

        }
        if (typeof (attrValue) !== 'string') {
            error(attrValue + " is not a string in setAttr function");
            return false;
        }
        this.dom.setAttribute(attrName, attrValue);
    }

    getClassName() {
        return this.className;
    }
    setClassName(newClassName) {
        if (typeof (newClassName) !== 'string') {
            error(newClassName + " is illegal in setClassName function");
            return false;
        }
        this.className = newClassName;
    }
    addClassName(newClassName) {
        if (typeof (newClassName) !== 'string') {
            error(newClassName + " is illegal in addClassName function");
            return false;
        }
        const classNameArray = this.className.split(' ');
        classNameArray.forEach((name) => {
            if (newClassName === name.trim()) {
                console.log(newClassName + " has existed in addClassName function");
                //提前结束
                return true;
            }
        });
        let className = this.className + ' ' + newClassName;
        this.className = className;
    }
    removeClassName(existClassName) {
        if (typeof (existClassName) !== 'string') {
            error(existClassName + " is illegal in removeClassName function");
            return false;
        }
        const classNameArray = this.className.split(' ');
        let newClassName = "";
        classNameArray.forEach((name) => {
            if (existClassName !== name.trim()) {
                newClassName += " " + name;
            }
        });
        this.className = newClassName;
    }
    getDom() {
        return this.dom;
    }
    getFirstChild() {
        return this.dom.firstElementChild || this.dom.children[0];
    }
    addChildFront(childDom) {
        if (!childDom || !childDom instanceof Dom) {
            error(childDom + "is not a instance of Dom");
            return false;
        }
        this.dom.insertBefore(childDom.getDom(), this.getFirstChild());
    }
    addChildTail(childDom) {
        if (!childDom || !childDom instanceof Dom) {
            error(childDom + "is not a instance of Dom");
            return false;
        }
        this.dom.appendChild(childDom.getDom());
    }
    cleanChildren() {
        while (this.getFirstChild()) {
            this.dom.removeChild(this.getFirstChild());
        }
    }
    setValue(newValueStr) {
        if (typeof (newValueStr) !== 'string') {
            error(newValueStr + " is illegal for value in setValue")
            return false;
        }
        if (newValueStr !== this.value) {
            this.value = newValueStr;
            this.updateNode();
        }
    }
    getValue() {
        return this.value;
    }
    appendValue(newValueStr) {
        if (typeof (newValueStr) !== 'string') {
            error(newValueStr + " is illegal for value in appendValue")
            return false;
        }
        this.value += newValueStr;
        this.updateNode();
    }
    getParent() {
        return new Dom(this.dom.parentNode);
    }
    getNextSibling() {
        //排除文本节点
        let node = this.dom.nextSibling;
        while (node.nodeType == 3 || node.nodeType == 8) {
            node = node.nextSibling;
        }
        return new Dom(node);
    }
    getPreSibling() {
        //排除文本节点
        let node = this.dom.previousSibling;
        while (node.nodeType == 3 || node.nodeType == 8) {
            node = node.previousSibling;
        }
        return new Dom(node);
    }
    hide() {
        this.addClassName("nd");
        this.updateNode();
    }
    show() {
        this.removeClassName("nd");
        this.updateNode();
    }
    updateNode() {
        if (this.dom.className !== this.className) {
            this.dom.className = this.className;
        }
        if (this.dom.id !== this.id) {
            this.dom.id = this.id
        }
        if (isTextBox(this.dom)) {
            if (this.dom.value !== this.value) {
                this.dom.value = this.value;
            }
        } else if (this.dom.innerHTML !== this.value && !this.getFirstChild()) {
            this.dom.innerHTML = this.value;
        }
    }
    addListener(eventName, callback) {
        if (eventName === 'input' && !support('input')) {
            if (support("propertychange")) {
                this.addListener('propertychange', callback);
                return;
            } else {
                this.addListener('keydown', callback);
                return;
            }
        }
        if (this.dom.addEventListener) {
            this.dom.addEventListener(eventName, (e) => {
                e.preventDefault();
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
                const event = e || window.event;
                const target = event.target || event.srcElement;
                const value = isTextBox(this.dom) ? target.value : this.dom.innerHTML;
                callback({
                    'context': this,
                    'event': event,
                    'value': value,
                });
            }, false);
        } else if (this.dom.attachEvent) {
            this.dom.attachEvent("on" + eventName, (e) => {
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
                const event = e || window.event;
                const target = event.target || event.srcElement;
                const value = isTextBox(this.dom) ? target.value : this.dom.innerHTML;
                callback({
                    'context': this,
                    'event': event,
                    'value': value,
                });
            });
        } else {
            this.dom['on' + eventName] = callback;
        }
    }
    removeListener(eventName, callback) {
        if (eventName.removeEventListener) {
            this.dom.removeEventListener(eventName, callback, false);
        } else {
            this.dom.detachEvent(eventName, callback);
        }
    }
    clone(deep) {
        if (deep) {
            return JSON.parse(JSON.stringify(this));
        } else {
            let domClone = this.dom.cloneNode(true);
            return new Dom(domClone);
        }
    }
    bind() {
        //双向绑定
        this.addListener('input', ({
            value
        }) => {
            this.value = value;
        });
    }
}

export default Dom;