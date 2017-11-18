import error from './error';
import contentType from './content_type';

const ajax = ({
    url,
    param,
    type,
    async = true,
    acceptFunc = (data) => {
        if (data) {
            console.log(data);
        }
    },
    failFunc = (err) => {
        if (data) {
            console.log(data);
        } else {
            console.log("请检查网络连接，或尝试刷新页面");
        }
    }
}) => {
    if (!url) {
        error("url is null");
        return;
    }
    const requestBody = {
        "method": type,
        "body": param
    };
    const request = new Request(url, requestBody);
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                error('fail fetch ' + url);
            }
        }).then((text) => {
            if (acceptFunc) {
                acceptFunc(text);
            }
        }).catch((errorDesc) => {
            failFunc(errorDesc);
            error(errorDesc);
        });
};

export default ajax;