import template from "enhance/template_web";
import selector from "../dom/selector";

//还在改善的art-template
export default (scriptID, contentID, data) => {
    const html = template(scriptID, data);
    selector.getElement(contentID).setValue(html);
}