export default (type) => {
    let contentType = '';
    if (!type) {
        contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    } else {
        switch (type) {
            case "form":
                contentType = "application/x-www-form-urlencoded; charset=UTF-8";
                break;
            case "json":
                contentType = "application/json";
                break;
            case "xml":
                contentType = "text/xml";
                break;
            case "form-data":
                contentType = "multipart/form-data";
                break;
        }
    }
}