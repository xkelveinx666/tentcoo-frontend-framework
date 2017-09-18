class HTMLPageConfig {
    constructor({ filepath, title = "天高科技工作室", icon = "天高科技工作室logo", description = "华南理工大学广州学院计算机工程学院天高科技工作室", keywords = "tentcoo, GCU", filename, chunks, pagename } = { title: "天高科技工作室", icon: "天高科技工作室logo", description: "华南理工大学广州学院计算机工程学院天高科技工作室", keywords: "tentcoo, GCU" }) {
        this.filepath = filepath;
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.keywords = keywords;
        this.filename = filename;
        this.chunks = chunks;
        this.pagename = pagename;
    }
    toString() {
        return `const path = global.path || require('path'),
common = global.common || require(path.resolve(__dirname, './common_config')),
${this.pagename} = {
    "filepath": ${this.filepath},
    "title": "${this.title}",
    "icon": "${this.icon}",
    "description": "${this.description}",
    "keywords": "${this.keywords}",
    "filename": ${this.filename},
    "chunks": ${this.chunks},
}

module.exports = ${this.pagename};

        `
    }
}

module.exports = HTMLPageConfig;