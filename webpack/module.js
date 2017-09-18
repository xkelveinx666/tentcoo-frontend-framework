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
            presets: ['es2015']
        }
    }
}, {
    test: /\.(png|jpg)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 8192,
        },
    }
}]

module.exports = { "rules": rules };