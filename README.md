# mul_template

> MX2 前端基本目录结构，可根据自身需要进行修改, 针对多页面应用进行使用
> 使用webpack进行打包

## why webpack?
webpack是一个预编译模块的方案，支持 AMD / CMD / ES6 风格的模块化。
而gulp不支持。

## 提供了什么功能？
- 入口页面根据模板自动生成，自动引用同名入口文件，CSS等
- 模块化管理，自动处理依赖文件进行打包
- sass等预编译语言自动编译
- 资源打包、压缩、构建等
- 可在html页面按原有方式使用smarty模板

注意：view内入口模板需和pages内入口文件js命名一致

## 使用方法

``` bash
# 安装依赖
npm install

# 调试模式, 与单页面应用不同，通过watch方式进行实时打包，通过项目地址进行预览
npm run dev

# 编译打包模式
# 区分三种方式: 区分是否进行压缩, 不同环境变量等
# 通过config/*.env.js进行不同环境的配置, 程序中全局引用环境变量EVN_OPT

# 开发环境 
npm run build dev
# 测试环境
npm run build test
# 正式环境
npm run build prod

```

## 目录结构

- src 前端开发环境代码存放目录
  + img: 共用图片路径
  + js: 
  	 - components: 共用组件存放路径，资源独立维护
  	 - pages: 入口文件存放路径
  + scss: 样式路径
  + view: 入口页面模板配置路径

- tpl: 模板生成路径（不需要进行维护

## webpack配置

/config/index.js
包括入口文件等配置方案。

具体配置参考：https://wohugb.gitbooks.io/webpack/content/
