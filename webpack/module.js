// const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
    test: /\.art$/,
    use: {
        loader: "art-template-loader",
    },
}, {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env']
        }
    }
}, {
    test: /\.(png|jpg)$/,
    use: {
        loader: 'url-loader',
        options: {
            "limit": "256",
            "name": "[name].[ext]",
            "outputPath": "img/",
        },
    }
}]

module.exports = {
    "rules": rules
};