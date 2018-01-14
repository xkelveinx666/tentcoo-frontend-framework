import Dom from 'dom';
import $ from 'selector';

/**
 * 错误弹框，用于显示未被捕获的消息
 * 默认只显示最新的错误
 * 错误将会有行号，具体信息和错误文件
 * 快速在没有console的地方发现错误
 * 高效用于手机调试
 */

(function () {
    const errorDialog = new Dom('div');
    window.onerror = (message, url, line) => {
        errorDialog.cleanChildren();
        const p = new Dom('p');
        p.setValue("ERROR:In line " + line + " about " + message + " from " + url);
        errorDialog.addChildTail(p);
        errorDialog.show();
    }
    errorDialog.addClassName("pf l0 t0 w100 tc z999 error");
    errorDialog.hide();
    $.getElement("body")[0].addChildFront(errorDialog);
})()