const webpack = global.webpack || require("webpack");
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
                        root: path.resolve(__dirname, "../src/public"),
                        sourceMap: true,
                    },
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: path.resolve(__dirname, "postcss.config.js")
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
        //压缩JS代码,注意es3ifyPlugin必须放在后面，避免在IE8下出现default
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
            comments:false,
            mangle: {
                //兼容IE8的压缩
                screw_ie8: false
            },
            uglifyOptions: {
                ecma: 5, // specify one of: 5, 6, 7 or 8
                keep_classnames: true,
                keep_fnames: true,
                ie8: true,
                computed_props:false,
                nameCache: null, // or specify a name cache object
                safari10: true,
                toplevel: false,
                warnings: false,
            },
            compress: {
                drop_debugger: true,
                drop_console: true,
            }
        }),
        new es3ifyPlugin(),
    ],
}

module.exports = config;