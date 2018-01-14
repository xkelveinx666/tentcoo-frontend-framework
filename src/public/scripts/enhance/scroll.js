/**
 * 禁止滑动
 */

var mo = function (e) {
    e.preventDefault();
};

/***禁止滑动***/
export function stop() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", mo, false); //禁止页面滑动
}

/***取消滑动限制***/
export function move() {
    document.body.style.overflow = ''; //出现滚动条
    document.removeEventListener("touchmove", mo, false);
}