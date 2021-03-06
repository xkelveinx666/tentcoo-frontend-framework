import selector from "selector";
/**
 * 取消页面所有img的拖拽
 * 默认加载
 * 使用闭包＋setTimeout异步加载提高加载速度
 */
setTimeout(() => {
    const imgArray = selector.getElement("img");
    if (imgArray && imgArray.length > 0) {
        imgArray.forEach((img) => {
            (function (img) {
                setTimeout(() => {
                    img.addListener("mousedown", () => {

                    }, true);
                });
            })(img);
            (function (img) {
                setTimeout(() => {
                    img.addListener("mousemove", () => {

                    }, true);
                });
            })(img);
        })
    }
});