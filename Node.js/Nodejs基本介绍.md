# Nodejs
> Node.js是一种服务器端框架，所以它的一个主要工作就是处理浏览器请求

[TOC]
- 1、非阻塞或异步I/O
> **阻塞I / O**
>
> 传统的I/O系统中，当前请求只有当先前请求的响应（HTML页面）已到达才会发出。
>
> 服务器阻塞其他请求是为了处理当前的请求，而这会导致浏览器的等待
>
> **非阻塞I/O**
>
> 如果一个请求需要花费较长时间，那么Node.js会发送请求到事件循环（event loop）中，并继续在调用栈（call stack）中处理下一个请求。
>
> 一旦未决请求完成处理，它就会告诉Node.js，并将响应渲染在浏览器上


- 2、原型
- 3、模块
  - 核心模块
    - 这些模块是用Node.js库预编译过的。
    - 核心模块的目的是提供开发者经常发生和重复的代码段，
    - 这些代码段如果不可用的话，会导致开发者陷入不得不一次又一次地写相同代码的处境。
    - 一些常见的核心模块是HTTP，URL，EVENTS，FILE SYSTEM，等等
  - 用户定义模块
    - 用户定义模块是开发人员在应用程序内创建用于特定目的的模块。
    - 当核心模块不能满足期望功能的时候就需要用户定义模块
- 4、回调函数

- 单线程
- 跨平台
- 适合高并发场景
- 不适合CPU密集型场景
- 轻量



#### 前后端都干什么？
- 前端：
  - 写静态页面  html、css、js
- 后端：
  - 操作服务器端



- `__dirname`
  - 当前文件所在的文件夹的路径
- `__filename`
  - 当前文件所在的文件夹的路径+文件名
- console
  - `assert(判断语句，"断言语句")`
    - 断言，用来测试

  - `time('timer')`
  - `timeEnd('timer')`
    - 测试代码执行时间
    - 成对出现

- 一个js就成为nodejs的一个模块
  - `require("依赖的文件路径");`
  - `module.exports = xxx`
  - `module.exports.xx = xxx`
  - `exports.xx = xxx`

- 模块作用域
  - 一个模块内的变量、函数、对象都属于这个模块，对外是封闭的


#### 模块系统
- 模块种类
  - 核心模块
    - fs file system
    - http
    - os
    - path
    - querystring
    - url

  - 文件模块

- `require('路径')`
  - 可以不写后缀
  - 可以解析`js、node、json`
    - 优先补全`.js`
    - 后补全`.json`

---
#### i5ting_toc把makedown在浏览器显示
- `Instell`
  - `npm install -g i5ting_toc`
- **执行**（在当前文件夹下）
  - `i5ting_toc -f xxxxxx.md -o`

#### BrowserSync代码编写在浏览器同步显示
- `Instell`
  - `npm install -g browser-sync`
- **执行**（在当前文件夹下）
  - `browser-sync start --server --files "**/*.css, **/*.html"`

---