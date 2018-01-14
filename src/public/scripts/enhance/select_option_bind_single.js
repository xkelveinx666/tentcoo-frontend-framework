import isIMG from "../judgement/is_img";
import Dom from "dom";
import selector from  "selector";

/**
 * 根据后端返回的数据数组快速生成下拉菜单
 * 需要select-option表明菜单ul对象的ID
 * 需要select-label表明显示内容的span或label对象
 * @param select  被点击的外围对象
 * @param body 点击隐藏下拉菜单的区域dom
 * @param dataList 选项的数据数组
 */
export default (select, body, dataList) => {
    const list = selector.getElement(select.getAttr("select-option"));
    const label = selector.getElement(select.getAttr("select-label"));
    (function (select, list, label) {
        setTimeout(() => {
            select.addListener("click", () => {
                if(list.getFirstChild()) {
                    list.show();
                }
            });
        });
        setTimeout(() => {
            body.addListener("click", () => {
                list.hide();
            }, true);
        });
        if (list.tagName == 'ul') {
            list.hide();
            if(dataList && dataList instanceof Array) {
                list.cleanChildren();
                let li = new Dom("li");
                list.addChildTail(li);
                dataList.forEach((data) => {
                    if('string' !== typeof (data)) {
                        try {
                            data = data.toString().trim();
                        }catch(Exception) {
                            return;
                        }
                    }
                    li.setValue(data);
                    li = li.clone(false);
                    list.addChildTail(li);
                });
                list.removeChild(li);
            }
            const liArray = list.getChildren("li");
            if(!liArray) {
                return;
            }
            liArray.forEach((li) => {
                setTimeout(() => {
                    li.addListener("click", ({context, value}) => {
                        list.hide();
                        (function (context, value) {
                            setTimeout(() => {
                                const newLabel = context.getFirstChild();
                                if (!isIMG(label.getDom())) {
                                    if (newLabel) {
                                        label.setValue(newLabel.getValue());
                                    } else {
                                        label.setValue(value);
                                    }
                                } else {
                                    label.replaceNode(newLabel);
                                }
                            });
                        })(context, value);
                    })
                });
            })
        }
    })(select, list, label);
}