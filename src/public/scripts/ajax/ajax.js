import error from 'error';
import getContentType from './content_type';
import POJO from 'pojo';

/**
 * ajax函数 兼容至IE6
 * @param url 请求地址
 * @param param 请求参数
 * @param type 请求类型, GET或POST,忽略大小写
 * @param contentType 请求参数类型,默认为from格式，可传入json,xml,会用getContentType自动转换
 * @param original 是否原样输出，用于非标准JSON格式的返回,默认否
 * @param async 是否开启异步,默认是
 * @param cache 是否开启缓存,默认是
 * @param acceptFunc 成功的回调函数,传入参数为POJO类型
 * @param failFunc 失败的回调函数,传入参数为POJO类型
 */
const ajax = ({
    url,
    param,
    type = "GET",
    contentType = "form", original = false,
    async = true,
    cache = true,
    acceptFunc = (data) => {
        if (data) {
            console.log(data);
        }
    },
    failFunc = (err) => {
        if (err) {
            if (err.get && err.get("message")) {
                alert(err.get("message"));
            } else {
                alert(err);
            }
        } else {
            error("请检查网络连接，或尝试刷新页面");
        }
    }
}) => {
    if (!url) {
        error("url is null");
        return;
    }
    if (param && param instanceof POJO) {
        param.changeType(contentType);
    }
    contentType = getContentType(contentType);
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
    type = type.toUpperCase();
    xhr.open(type, encodeURI(url), async);
    if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }
    //设置缓存，用于去除IE8的自动缓存
    if(!cache) {
        xhr.setRequestHeader('If-Modified-Since', '0');
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //判断是原样返回还是转换为POJO类型返回
                if(original) {
                    acceptFunc(xhr.responseText);
                    return;
                }
                const responseText = decodeURI(xhr.responseText);
                if(responseText.indexOf("{") == -1) {
                    acceptFunc(responseText);
                } else {
                    let pojo = null;
                    try {
                        pojo = new POJO(responseText);
                    } catch (JSONPraseError) {
                        acceptFunc(responseText);
                        return;
                    }
                    if (pojo.get("status") === "accept") {
                        acceptFunc(pojo);
                    } else {
                        failFunc(pojo);
                    }
                }
            } else {
                failFunc();
            }
        }
    }
    if(xhr.onerror) {
        xhr.onerror = () => {
            failFunc();
        }
    }
    if(param) {
        if(param instanceof POJO) {
            xhr.send(param.toString());
        } else {
            xhr.send(param);
        }
    } else {
        xhr.send();
    }
};

export default ajax;