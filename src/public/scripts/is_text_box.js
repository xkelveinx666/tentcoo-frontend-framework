export default (dom) => {
    const tagName = dom.tagName.toString().toLowerCase();
    let type = "undefined";
    if (tagName === "input" && dom.type) {
        type = dom.type.toString().toLowerCase();
    }
    return tagName === 'input' && (type === "text" || type === "password") || tagName === 'textarea';
}