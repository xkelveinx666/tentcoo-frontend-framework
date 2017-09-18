const webpack = global.webpack || require('webpack');

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
]

module.exports = plugins;