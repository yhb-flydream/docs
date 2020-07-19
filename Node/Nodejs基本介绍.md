# Nodejs

参照
[七天学会NodeJS](http://nqdeng.github.io/7-days-nodejs/)

> Node.js 是一种服务器端框架，所以它的一个主要工作就是处理浏览器请求

[TOC]

## 模块

### require

`require` 函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以`./`开头），或者是绝对路径（以`/`或`C:`之类的盘符开头）。
另外，模块中的`.js`扩展名可以省略

```js
var foo1 = require('./foo')
var foo2 = require('./foo.js')
var foo3 = require('/home/user/foo')
var foo4 = require('/home/user/foo.js')

// 用以下方式加载和使用一个JSON文件
var data = require('./data.json')
```

### exports

`exports` 对象是当前模块的导出对象，用于导出模块公用方法和属性。
别的模块通过 `require` 函数使用当前模块时得到的就是当前模块的 `exports` 对象。

```js
exports.hello = function () {
  console.log('hello')
}
```

### module

通过 `module` 对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。
例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

```js
module.exports = function () {
  console.log('1111')
}
```

### 模块初始化

一个模块中的js代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。
之后缓存起来的导出对象被重复利用。

### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。
主模块负责调动组成整个程序的其他模块完成工作。
例如通过以下命令启动程序时，`main.js` 就是主模块。

```bash
node main.js
```

### 小结

- NodeJS 是一个JS脚本解析器，在任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用 `node` 命令。
- 终端下直接输入 `node` 命令可以进入命令交互模式，很适合用来测试一些js代码片段，比如正则表达式。
- NodeJS 使用 [CMD](https://github.com/seajs/seajs/issues/242) 模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。
- 除非JS模块不能满足需求，否则不要轻易使用二进制模块。

- 1、非阻塞或异步 I/O

  > **阻塞 I / O**
  >
  > 传统的 I/O 系统中，当前请求只有当先前请求的响应（HTML 页面）已到达才会发出。
  >
  > 服务器阻塞其他请求是为了处理当前的请求，而这会导致浏览器的等待
  >
  > **非阻塞 I/O**
  >
  > 如果一个请求需要花费较长时间，那么 Node.js 会发送请求到事件循环（event loop）中，并继续在调用栈（call stack）中处理下一个请求。
  >
  > 一旦未决请求完成处理，它就会告诉 Node.js，并将响应渲染在浏览器上

- 2、原型
- 3、模块
  - 核心模块
    - 这些模块是用 Node.js 库预编译过的。
    - 核心模块的目的是提供开发者经常发生和重复的代码段，
    - 这些代码段如果不可用的话，会导致开发者陷入不得不一次又一次地写相同代码的处境。
    - 一些常见的核心模块是 HTTP，URL，EVENTS，FILE SYSTEM，等等
  - 用户定义模块
    - 用户定义模块是开发人员在应用程序内创建用于特定目的的模块。
    - 当核心模块不能满足期望功能的时候就需要用户定义模块
- 4、回调函数

- 单线程
- 跨平台
- 适合高并发场景
- 不适合 CPU 密集型场景
- 轻量

## 前后端都干什么

- 前端：
  - 写静态页面 html、css、js
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

- 一个 js 就成为 nodejs 的一个模块

  - `require("依赖的文件路径");`
  - `module.exports = xxx`
  - `module.exports.xx = xxx`
  - `exports.xx = xxx`

- 模块作用域
  - 一个模块内的变量、函数、对象都属于这个模块，对外是封闭的

## 模块系统

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

## i5ting_toc 把 makedown 在浏览器显示

- `Instell`
  - `npm install -g i5ting_toc`
- **执行**（在当前文件夹下）
  - `i5ting_toc -f xxxxxx.md -o`

## BrowserSync 代码编写在浏览器同步显示

- `Instell`
  - `npm install -g browser-sync`
- **执行**（在当前文件夹下）
  - `browser-sync start --server --files "**/*.css, **/*.html"`

---
