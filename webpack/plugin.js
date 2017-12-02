const webpack = global.webpack || require('webpack');
const entries = global.entries || require('../config/entries_config').entries;
const privateEntries = global.privateEntries || require('../config/entries_config').privateEntries;

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        },
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: "js/" + "common.js",
        chunks: privateEntries
    })

]

module.exports = plugins;