import isDom from 'judgement/is_dom';
import support from '../dom/event_support';
import error from 'error';
import isTextBox from 'judgement/is_text_box';
import isFileDom from 'judgement/is_file_dom';
import isInput from 'judgement/is_input';

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
        if (isTextBox(dom)) {
            this.value = dom.value;
            this.inputBind();
        } else if (isFileDom(dom)) {
            this.value = dom.value;
            this.changeBind();
        }
    };
    getAttr(attrName) {
        if (typeof (attrName) !== 'string') {
            error(attrName + " is not a string in getAttr function");
        }
        return this.dom.getAttribute(attrName) || this.dom[attrName];
    }
    setAttr(attrName, attrValue) {
        if (typeof (attrName) !== 'string') {
            error(attrName + " is not a string in setAttr function");

        }
        if (typeof (attrValue) !== 'string') {
            error(attrValue + " is not a string in setAttr function");
        }
        if (this.dom[attrName]) {
            this.dom[attrName] = attrValue;
        } else {
            this.dom.setAttribute(attrName, attrValue);
        }
    }

    getClassName() {
        return this.className;
    }
    setClassName(newClassName) {
        if (typeof (newClassName) !== 'string') {
            error(newClassName + " is illegal in setClassName function");
        }
        this.className = newClassName;
    }
    addClassName(newClassName) {
        if (typeof (newClassName) !== 'string') {
            error(newClassName + " is illegal in addClassName function");
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
        this.updateNode();
    }
    removeClassName(existClassName) {
        if (typeof (existClassName) !== 'string') {
            error(existClassName + " is illegal in removeClassName function");
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
    getChildren(selector) {
        let children = [],
            child = this.getFirstChild();
        if (!child) {
            return null;
        } else {
            child = child.getDom();
        }
        while (child) {
            if (child.nodeType !== 3 && child.nodeType !== 8) {
                if (selector) {
                    if (typeof (selector) !== "string") {
                        error(selector + " is not a string");
                    }
                    if (selector.charAt(0) === '.') {
                        if (child.className === selector.substring(1, selector.length)) {
                            children.push(new Dom(child));
                            continue;
                        }
                    } else if (selector.charAt(0) === '#') {
                        if (child.id === selector.substring(1, selector.length)) {
                            children.push(new Dom(child));
                            continue;
                        }
                    } else {
                        if (child.tagName === selector.substring(1, selector.length)) {
                            children.push(new Dom(child));
                            continue;
                        }
                    }
                    error(selector + " has not matched element in " + this.tagName);
                } else {
                    children.push(new Dom(child));
                }
            }
            child = child.nextSibling;
        }
        return children;
    }
    getFirstChild() {
        return this.dom.firstElementChild ? new Dom(this.dom.firstElementChild) : this.dom.children[0] ? new Dom(this.dom.children[0]) : null;
    }
    addChildFront(childDom) {
        if (!childDom || !childDom instanceof Dom) {
            error(childDom + "is not a instance of Dom");
        }
        this.dom.insertBefore(childDom.getDom(), this.getFirstChild().getDom());
    }
    addChildTail(childDom) {
        if (!childDom || !childDom instanceof Dom) {
            error(childDom + "is not a instance of Dom");
        }
        this.dom.appendChild(childDom.getDom());
    }
    removeChild(childDom) {
        if (!childDom || !childDom instanceof Dom) {
            error(childDom + "is not a instance of Dom");
        }
        this.dom.removeChild(childDom.getDom());
    }
    cleanChildren() {
        while (this.getFirstChild()) {
            this.dom.removeChild(this.getFirstChild().getDom());
        }
    }
    replaceNode(newNode) {
        if (!newNode instanceof Dom) {
            error(newNode + "is not a Dom");
        }
        this.getParent().getDom().replaceChild(newNode.getDom(), this.getDom());
    }
    setValue(newValueStr) {
        if (typeof (newValueStr) !== 'string') {
            error(newValueStr + " is illegal for value in setValue")
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
        while (node.nodeType === 3 || node.nodeType === 8) {
            node = node.nextSibling;
        }
        return new Dom(node);
    }
    getPreSibling() {
        //排除文本节点
        let node = this.dom.previousSibling;
        while (node.nodeType === 3 || node.nodeType === 8) {
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
                const value = isTextBox(this.dom) || isInput(this.dom) ? target.value : this.dom.innerHTML;
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
                const value = isTextBox(this.dom) || isInput(this.dom) ? target.value : this.dom.innerHTML;
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
        if (deep === true) {
            return new Dom(this.getDom().cloneNode(true));
        } else {
            return new Dom(this.getDom().cloneNode(false));
        }
    }
    inputBind() {
        //双向绑定
        this.addListener('input', ({
            value
        }) => {
            this.value = value;
        });
    }
    changeBind() {
        this.addListener('change', ({
            value
        }) => {
            this.value = value;
        });
    }
}

export default Dom;