module.exports = ({
    file,
    options,
    env
}) => ({
    parser: file.extname === '.scss' ? 'postcss-scss' : false,
    plugins: {
        'postcss-font-magician': true,
        'postcss-sprites': true,
        'postcss-csssimple': true,
        'postcss-cssnext': true,
        'autoprefixer': env == 'production' ? true : false,
    }
})