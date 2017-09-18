const ajax = ({ url, method, parameter, acceptFunction, failFunction }) => {
    if (!url) {
        console.log("url is null");
        return;
    }
    const requestBody = {
        "method": method,
        "header": new Headers(),
    };
    const request = new Request(url, requestBody);
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                failFunction();
                console.log('fail fetch ' + url);
            }
        }).then((text) => {
            if (acceptFunction) {
                acceptFunction(JSON.parse(text));
            }
        }).catch((error) => {
            failFunction();
            console.log(error);
        });
};

export default ajax;