import error from './error';
import getContentType from './content_type';
import POJO from './pojo';

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
            console.log(err);
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
    const requestBody = {
        "method": type,
        "body": param
    };
    if (contentType) {
        requestBody.headers = {
            "Content-Type": contentType,
        };
    }
    const request = new Request(url, requestBody);
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                error('fail fetch ' + url);
            }
        }).then((text) => {
            try {
                const pojo = new POJO(text);
                if (pojo.get("status") === "accept") {
                    acceptFunc(pojo);
                } else {
                    failFunc(pojo);
                }
            } catch (JSONPraseError) {
                acceptFunc(text);
            }
        }).catch((errorDesc) => {
            failFunc(errorDesc);
        });
};

export default ajax;