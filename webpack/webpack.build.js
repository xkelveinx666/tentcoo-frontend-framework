const webpack = global.webpack || require("webpack");
const common = global.common || require("../config/common_config");
const extractTextPlugin = global.extractTextPlugin || require("extract-text-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');

const config = {
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        alias: {
                            "public": "../../../public",
                            "img": "../../../public/images",
                        }
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, "webpack", "postcss.config.js")
                        },
                    }
                }, "sass-loader"],
                publicPath: '../',
            })
        }],
    },
    plugins: [
        new extractTextPlugin({
            filename: "css/[name].css"
        }),
        new es3ifyPlugin(),
    ],
}

module.exports = config;