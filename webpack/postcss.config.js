const path = global.path || require("path");

module.exports = ({
    file,
    options,
    env
}) => ({
    parser: file.extname === '.scss' ? 'postcss-scss' : false,
    plugins: {
        "postcss-sprites": {
            spritePath: path.resolve(__dirname, '../dist/img/sprite.png'),
            retina: true,
            outputDimensions: true
        },
        'postcss-csssimple': true,
        'autoprefixer': env == 'production' ? true : false,
        "css-mqpacker": true,
        "cssnano": {
            preset: 'default',
        },
    }
})