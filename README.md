# tentcoo-frontend-framework
a scaffold consist of gulp,webpack,sass,postcss,art-template

## 版本
v1.1 
- 新增常用操作类
1. ajax类，用Fetch定义，并统一操作的接口，简化操作
2. array操作类，由es6的array方法的IE8可用的polyfill
3. database操作类(未完成)，使用统一化的接口对前端数据库进行操作，已对数据进行缓存
4. dom类，统一化dom的操作方法，集中解决dom操作的兼容性问题，包括事件的兼容
5. image_preview类，统一化的图像预览方案，绑定input与img。实现直至IE8的本地预览
6. test_input类，常用的正则表达式操作与校验函数。
- 逻辑结构优化
1. private文件夹中的每个页面有填充该页面独立的controller
2. 添加事件及判断的activity
3. 准备添加build.page.js，用于art-template生成页面的配置读取
- 输出
1. 打包生成的文件更合理，均在文件夹内。

## 说明
此项目用于天高前端框架的开发，用于将HTML,CSS,JavaScript实现模块化。
同时支持CSS使用SCSS,HTML使用art-template,JS使用ES6

## 兼容性
已经确认常用兼容性到IE6

## 特点
### JavaScript
1. 使用类似Spring容器的工厂方法，将与dom有关的操作全部交由Spring类完成(还在实现中，目前仅完成创建对象)
2. ajax类，用Fetch定义，并统一操作的接口，简化操作
3. array操作类，由es6的array方法的IE8可用的polyfill
4. database操作类(未完成)，使用统一化的接口对前端数据库进行操作，已对数据进行缓存
5. dom类，统一化dom的操作方法，集中解决dom操作的兼容性问题，包括事件的兼容
6. image_preview类，统一化的图像预览方案，绑定input与img。实现直至IE8的本地预览
7. test_input类，常用的正则表达式操作与校验函数。
### Webpack
使用了Webpack-dev-server中的HMR，让资源全部在内存中运行，提高开发编译效率。

## 如何使用
1. git clone git@github.com:xkelveinx666/tentcoo-frontend-framework.git
2. 解压并cd到该文件夹之内
3. - npm run dev 进入开发模式,进入private文件夹内编码，访问localhost/文件夹名查看效果。(由于使用80端口,所以UNIX/Linux系需要使用sudo)
 - npm run build 编译所有文件到/dist文件夹，最终生成文件为CSS+HTML+JS，可在IE6+上运行
 - npm run new 快速新建网页/模块，自动在private文件夹下创建完所需的文件夹
4. 注意页面/模块对应的JS，CSS需要在entry.xxxx.js中使用es6方法import导入,已自动导入IE8Fix,CSS可使用@import导入。