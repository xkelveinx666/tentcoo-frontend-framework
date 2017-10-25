module.exports = ({
    file,
    options,
    env
}) => ({
    parser: file.extname === '.scss' ? 'postcss-scss' : false,
    plugins: {
        'postcss-font-magician': true,
        'postcss-csssimple': true,
        'autoprefixer': env == 'production' ? true : false,
    }
})