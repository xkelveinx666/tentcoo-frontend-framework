# tentcoo-frontend-framework
a scaffold consist of gulp,webpack,sass,postcss,art-template

## 说明
此项目用于天高前端框架的开发，用于将HTML,CSS,JavaScript实现模块化。
同时支持CSS使用SCSS,HTML使用art-template,JS使用ES6

## 兼容性
已经确认常用兼容性到IE6

## 特点
### JavaScript
使用类似Spring容器的工厂方法，将与dom有关的操作全部交由Spring类完成(还在实现中，目前仅完成创建对象)
### Webpack
使用了Webpack-dev-server中的HMR，让资源全部在内存中运行，提高开发编译效率。

## 如何使用
1. git clone git://github.com/xkelvinx666/tentcoo-frontend-framework.git
2. 解压并cd到该文件夹之内
3. - npm run dev 进入开发模式,进入private文件夹内编码，访问localhost/文件夹名查看效果。(由于使用80端口,所以UNIX/Linux系需要使用sudo)
 - npm run build 编译所有文件到/dist文件夹，最终生成文件为CSS+HTML+JS，可在IE6+上运行
 - npm run new 快速新建网页/模块，自动在private文件夹下创建完所需的文件夹
4. 注意页面/模块对应的JS，CSS需要在entry.xxxx.js中使用es6方法import导入,已自动导入IE8Fix,CSS可使用@import导入。