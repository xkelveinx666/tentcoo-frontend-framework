const fs = require('fs-extra');
const common = global.common || require('../config/common_config');
const privatePath = common.location.private;
const path = global.path || require('path');
// 网页名正则，以小写字母，数字下划线组成,3位到12位不能过长也不能过短
const pageNameRegex = /^[a-z0-9_]{2}/;
const onlyNumberRegex = /^[0-9]/;
const HTMLPageConfig = require('../config/HTMLPageConfig');

const fileExist = (path) => {
    try {
        fs.accessSync(path);
    } catch (e) {
        return false;
    }
    return true;
}

const newFileCallBack = (err) => {
    if (err) {
        console.log(err);
    }
}

const touchFile = (name) => {
    const workplace = path.resolve(privatePath, name);
    fs.mkdirSync(workplace);
    const config = path.resolve(workplace, 'config'),
        mock = path.resolve(workplace, 'mock'),
        pages = path.resolve(workplace, 'pages'),
        styles = path.resolve(workplace, 'styles'),
        scripts = path.resolve(workplace, 'scripts'),
        mainPage = path.resolve(pages, name + '.art'),
        entryConfigPath = path.resolve(config, 'entry.' + name + '.js'),
        pageConfigPath = path.resolve(config, 'page.' + name + '.js');
    fs.mkdir(config, (err) => {
        if (err) {
            console.log(err);
        }
        fs.open(entryConfigPath, 'w', newFileCallBack);
        fs.open(pageConfigPath, 'w', (err, data) => {
            if (err) {
                console.log(err);
            }
            var pageConfig = new HTMLPageConfig({
                "filepath": `path.resolve(common.location.private, '${name}', 'pages', '${name}' + '.art')`,
                "chunks": `['${name}']`,
                "filename": `'${name}.html'`,
                "pagename": name,
            });
            console.log(pageConfig);
            fs.write(data, pageConfig, newFileCallBack);
        });
    });
    fs.mkdir(mock, newFileCallBack);
    fs.mkdir(pages, (err) => {
        if (err) {
            console.log(err);
        }
        fs.copy(common.location.defaultHTML, mainPage, (err, file) => {
            console.log(file);
        });
    });
    fs.mkdir(styles, newFileCallBack);
    fs.mkdir(scripts, newFileCallBack);
}

const createNewPage = () => {
    process.stdin.setEncoding('utf8');
    console.log("请输入页面名称");
    process.stdin.on('readable', () => {
        const input = process.stdin.read();
        if (input && input !== null && input.length > 2) {
            const name = input.replace(/\r|\n/ig, "");
            if (name.match(pageNameRegex)) {
                if (name.match(onlyNumberRegex)) {
                    console.log("不能为纯数字");
                } else {
                    let filePath = path.resolve(privatePath, name);
                    if (fileExist(filePath)) {
                        console.log("文件已存在，请重新命名")
                    } else {
                        process.stdin.end();
                        console.log("正在创建文件中");
                        touchFile(name);
                    }
                }
            } else {
                console.log("请重新输入，只能以小写字母，数字，下划线组成，3位到12位");
            }
        }
    });
}

(function() {
    createNewPage();
})();