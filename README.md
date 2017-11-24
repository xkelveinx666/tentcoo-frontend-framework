# tentcoo-frontend-framework
a scaffold consist of gulp,webpack,sass,postcss,art-template

## 版本
v1.17
- 修复在正常ajax提交下能用content-type产生对应的头
- 修复dom在对取value值和innerHTML之间的判断
- 修复file类型的type没有正确的获取value
- 修复图像预览
- 修复Spring容器的多次取值和数组的dom判断

## 说明
此项目用于天高前端框架的开发，用于将HTML,CSS,JavaScript实现模块化。
同时支持CSS使用SCSS,HTML使用art-template,JS使用ES6

## 兼容性
已经确认常用兼容性到IE8+

## 特点
### JavaScript
1. 使用类似Spring容器的工厂方法，将与dom有关的操作全部交由Spring类完成(还在实现中，目前仅完成创建对象)
2. ajax类，用Fetch定义，并统一操作的接口，简化操作
3. array操作类，由es6的array方法的IE8可用的polyfill
4. database操作类(未完成)，使用统一化的接口对前端数据库进行操作，已对数据进行缓存
5. dom类，统一化dom的操作方法，集中解决dom操作的兼容性问题，包括事件的兼容
6. image_preview类，统一化的图像预览方案，绑定input与img。实现直至IE8的本地预览
7. test_input类，常用的正则表达式操作与校验函数。
### ajax
- ajax传入函数使用POJO类，类似formdata能快速进行参数的打包与发送
- content-type类以提供更快的匹配所需的header说明
### 文件上传
- 使用ajax.fileupload.js文件用于文件上传，使用统一的接口
- async参数用于决定同步或异步
- 参考了jquery.form.js代码
- fileDom为上传文件的input的Dom对象，可以是数组
- IE8使用iframe异步提交方式，现代浏览器使用了file api+formdata的方式
- 目前实现了ie8标准模式下的文件上传,无刷新，可获取返回值，进度条问题解决
### input双向绑定
1. 创建对象时自动添加input事件，保证输入框的内容与js对象中的数据保持同步。
2. 使用setValue()方法，在设置js对象的value值时，同步更改input输入框内容。
- 只针对text,password
- input事件不支持阻止默认事件
### Webpack
使用了Webpack-dev-server中的HMR，让资源全部在内存中运行，提高开发编译效率。
### 错误提示
- 使用window.onerror拦截所有异常并输出,防止低版本ie或手机浏览器无法查看错误信息
- 可以使用传入不同函数以实现美观的错误提示。

## 如何使用
1. git clone git@github.com:xkelveinx666/tentcoo-frontend-framework.git
2. 解压并cd到该文件夹之内
3. - npm run dev 进入开发模式,进入private文件夹内编码，访问localhost/文件夹名查看效果。(由于使用80端口,所以UNIX/Linux系需要使用sudo)
 - npm run build 编译所有文件到/dist文件夹，最终生成文件为CSS+HTML+JS，可在IE6+上运行
 - npm run new 快速新建网页/模块，自动在private文件夹下创建完所需的文件夹
4. 注意页面/模块对应的JS，CSS需要在entry.xxxx.js中使用es6方法import导入,已自动导入IE8Fix,CSS可使用@import导入。