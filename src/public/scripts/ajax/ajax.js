import error from 'error';
import getContentType from 'content_type';
import POJO from 'pojo';

const ajax = ({
    url,
    param,
    type,
    contentType = "form",
    async = true,
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
    contentType = getContentType(contentType);
    const xhr = new XMLHttpRequest();
    xhr.open(type, encodeURI(url), async);
    if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const responseText = decodeURI(xhr.responseText);
                let pojo;
                try {
                    pojo = new POJO(responseText);
                } catch (JSONPraseError) {
                    acceptFunc(responseText);
                }
                if (pojo.get("status") === "accept") {
                    acceptFunc(pojo);
                } else {
                    failFunc(pojo);
                }
            } else {
                failFunc();
            }
        }
    }
    xhr.onerror = () => {
        failFunc();
    }
    xhr.send(param);
};

export default ajax;