import selector from "selector";
import selectOptionBindSingle from './select_option_bind_single';

/**
 * 使用闭包＋setTimeout异步加载提高加载速度
 * 将页面的select-option找出，快速创建下拉菜单
 */
setTimeout(() => {
    const selectArray = selector.getElement("[select-option]");
    const body = selector.getElement("body");
    if (selectArray && selectArray.length > 0) {
        selectArray.forEach((select) => {
            selectOptionBindSingle(select,body[0]);
        })
    }
});