import JSONData from './json_data';
import $ from './jquery-1.12.3.min';

const ajax = ({
    url,
    method,
    param,
    acceptFunc,
    failFunc
}) => {
    if (!url) {
        console.log("url is null");
        return;
    }
    $.ajax({
        "url": url,
        "type": "POST",
        "secureuri": false,
        "dataType": 'json',
        data: param.Object(),
        success: function (data) {
            const jsonData = new JSONData(JSON.stringify(data));
            if (acceptFunc) {
                acceptFunc(jsonData);
            }
        },
        error: function (data) {
            if (failFunc) {
                failFunc(data);
            } else {
                alert(data);
            }
        }
    })
};

export default ajax;