export default (dom) => {
    const tagName = dom.tagName.toString().toLowerCase();
    return tagName === 'input';
}