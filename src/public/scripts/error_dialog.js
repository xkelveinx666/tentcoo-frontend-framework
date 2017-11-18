import Dom from './dom';
import $ from './selector';
export default (function () {
    const errorDialog = new Dom('div');
    window.onerror = (message, url, line) => {
        const p = new Dom('p');
        p.setValue("ERROR:In line " + line + " about " + message + " from " + url);
        errorDialog.addChildTail(p);
    }
    errorDialog.addClassName("t0");
    errorDialog.addClassName("l0");
    errorDialog.addClassName("pf");
    errorDialog.addClassName("z999");
    $.getElement("body").addChildTail(errorDialog);
})()