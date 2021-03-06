import Dom from 'dom';
import error from 'error';

const imgFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
function createObjectURL(blob){
    return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
}


/**
 * 快速图片本地预览
 * @param imgDom 需要预览的imgDom对象
 * @param inputDom 上传文件的inputDom对象
 * @param hint 错误提示回调函数
 * @param hintText 错误提示信息
 * @returns {boolean}
 */
export default function preview ({
        imgDom,
        inputDom,
        hint,
        hintText
    }) {
        if (!inputDom instanceof Dom) {
            error(inputDom + " is not instance of Dom in preview function");
            return false;
        }
        if (!imgDom instanceof Dom) {
            error(imgDom + " is not instance of Dom in preview function");
            return false;
        }
        if (inputDom.getValue() === "") {
            error("请先上传图片");
            return false;
        }
        if (inputDom.getDom().files) {
            let files = inputDom.getDom().files;
            let file = files[0];
            if (!imgFilter.test(file.type)) {
                if (typeof (hint) === "function") {
                    hint();
                } else if (typeof (hintText) === 'string') {
                    alert(hintText);
                } else {
                    alert("请上传正确的图片格式");
                }
                error(file + "is not the type of img");
                return false;
            }
            let imgDataURL = createObjectURL(file);
            imgDom.setAttr("src", imgDataURL);
        } else {
            inputDom.getDom().select();
            let imgDataURL = document.selection.createRange().text.trim();
            imgDom.getDom().style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + imgDataURL + "\")";
            // imgDom.getDom().style.backgroundImage = "url(" + imgDataURL + ")";
            // imgDom.setAttr("src", imgDataURL);
        }
        return true;
    }
