export default (dom) => {
    const tagName = dom.tagName.toString().toLowerCase();
    let type = "undefined";
    if (tagName === "input") {
        type = dom.type.toString().toLowerCase();
    }
    return tagName === 'input' && (type === "text" || type === "password") || tagName === 'textarea';
}