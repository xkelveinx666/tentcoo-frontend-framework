import Dom from 'dom';
import error from 'error';

/**
 * POJO类，模仿formdata
 * 用于ajax传输，快速创建对象
 * 自动根据contentType返回对应的参数值
 */
class POJO {
    constructor(form) {
        this.data = new Map();
        this.type = "form";
        if (form) {
            if (typeof (form) === 'string' && JSON.parse(form)) {
                this.strToMap(form);
                return;
            } else if('object' === typeof (form)) {
                if(form instanceof Dom) {
                    if (form.tagName.toString().toLowerCase() !== 'form') {
                        error(form + " is not a form");
                    }
                    form.getChildren().forEach((input) => {
                        if (input.getAttr("tagName") === "input" && input.getAttr("type") === "text" || input.getAttr("type") === "password") {
                            const key = input.getAttr("name");
                            const value = input.getValue();
                            if (key && value && key !== '') {
                                this.data.set(key, value);
                            }
                        }
                    });
                } else {
                    this.strToMap(JSON.stringify(form));
                }
            }
        }
    }
    //转换contentType类型
    changeType(type) {
        this.type = type;
    }
    setType(type) {
        this.type = type;
    }
    getType(type) {
        return this.type;
    }
    isEmpty() {
        return 0 ==this.data.size;
    }
    //获取参数
    get(key) {
        if (typeof (key) !== 'string') {
            error(key + " is a string");
        }
        return this.data.get(key);
    }
    //插入参数
    append(key, value) {
        if (typeof (key) !== 'string') {
            error(key + " is not a string");
        }
        if(null != value && 'string' === typeof(value)) {
            value = value.toString().trim();
        }
        if(value instanceof POJO) {
            value = JSON.parse(value.toString());
        }
        this.data.set(key.trim(), value);
    }
    forEach(func) {
        return this.data.forEach(func);
    }
    toString() {
        if (this.type === 'form') {
            let result = '';
            this.data.forEach((value, key) => {
                result += `${key}=${encodeURIComponent(value)}&`;
            });
            return result.substring(0, result.length - 1);
        } else if (this.type = 'json') {
            let result = {};
            this.data.forEach((value, key) => {
                result[key] = value;
            });
            return JSON.stringify(result);
        }

    }
    //转换为formdata
    getFormData() {
        if (!window.FormData) {
            return null;
        }
        const fd = new FormData();
        this.data.forEach((value, key) => {
            fd.append(key, value);
        });
        return fd;
    }
    //对json字符串自动进行转换
    strToMap(json) {
        const jsonObj = JSON.parse(json);
        for (let key in jsonObj) {
            if('string' === typeof (jsonObj[key])) {
                const jsonStr = jsonObj[key].toString().trim();
                if(jsonStr.charAt(0) == '[') {
                    this.append(key, jsonStr.slice(1, -1).split(','));
                } else if(jsonStr.charAt(0) == '{'){
                    this.append(key, JSON.parse(jsonStr));
                } else {
                    this.append(key, jsonStr);
                }
            } else {
                this.append(key, jsonObj[key]);
            }
        }
    }
}

export default POJO;