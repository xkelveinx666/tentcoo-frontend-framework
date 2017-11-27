import Dom from './dom';
import $ from './selector';
export default (function () {
    const errorDialog = new Dom('div');
    window.onerror = (message, url, line) => {
        const p = new Dom('p');
        p.setValue("ERROR:In line " + line + " about " + message + " from " + url);
        errorDialog.addChildTail(p);
    }
    errorDialog.addClassName("pf l0 t0 z999 error");
    $.getElement("body").addChildFront(errorDialog);
})()