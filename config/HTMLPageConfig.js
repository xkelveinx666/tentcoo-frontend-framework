class HTMLPageConfig {
    constructor({
        filePath,
        title = "天高科技工作室",
        icon = "天高科技工作室logo",
        description = "华南理工大学广州学院计算机工程学院天高科技工作室",
        keywords = "tentcoo, GCU",
        filename,
        chunks,
        pageName
    } = {
        title: "天高科技工作室",
        icon: "天高科技工作室logo",
        description: "华南理工大学广州学院计算机工程学院天高科技工作室",
        keywords: "tentcoo, GCU"
    }) {
        this.filePath = filePath;
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.keywords = keywords;
        this.filename = filename;
        this.chunks = chunks;
        this.pageName = pageName;
    }
    toString() {
        return `const pageInitConfig = require('./build.${this.pageName}');
const path = global.path || require('path'),
common = global.common || require(path.resolve(__dirname, './common_config')),
${this.pageName} = {
    "filepath": ${this.filePath},
    "title": "${this.title}",
    "icon": "${this.icon}",
    "description": "${this.description}",
    "keywords": "${this.keywords}",
    "filename": ${this.filename},
    "chunks": ${this.chunks},
    "initConfig": pageInitConfig,
}

module.exports = ${this.pageName};`
    }
}

module.exports = HTMLPageConfig;