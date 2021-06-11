# JavaScript 高级程序设计(第 4 版)

## 2.1.4 动态加载脚本

除了`<script>`标签，还有其他方式可以加载脚本。因为 JavaScript 可以使用 DOM API，所以通过 向 DOM 中动态添加 script 元素同样可以加载指定的脚本。只要创建一个 script 元素并将其添加到 DOM 即可。

```js
let script = document.createElement('script')
script.src = 'gibberish.js'
document.head.appendChild(script)
```

当然，在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。

默认情况下， 以这种方式创建的`<script>`元素是以异步方式加载的，相当于添加了 `async` 属性。

**不过这样做可能会 有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。**

因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载:

```js
let script = document.createElement('script')
script.src = 'gibberish.js'
script.async = false
document.head.appendChild(script)
```

**以这种方式获取的资源对浏览器预加载器是不可见的。**这会严重影响它们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。

**要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们:**

```html
<link rel="preload" href="gibberish.js" />
```

## 2.4 `<noscript>` 元素

针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案。

最终，`<noscript>` 元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容。虽然如今的浏览器已经 100%支持 JavaScript，但对于禁用 JavaScript 的浏览器来说，这个元素仍然有它的用处。

`<noscript>` 元素可以包含任何可以出现在 `<body>` 中的 HTML 元素，`<script>` 除外。在下列两种情况下，浏览器将显示包含在 `<noscript>` 中的内容:

- 浏览器不支持脚本
- 浏览器对脚本的支持被关闭

任何一个条件被满足，包含在 `<noscript>` 中的内容就会被渲染。否则，浏览器不会渲染 `<noscript>` 中的内容。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Example HTML Page</title>
    <script defer="defer" src="example1.js"></script>
    <script defer="defer" src="example2.js"></script>
  </head>
  <body>
    <noscript> <p>This page requires a JavaScript-enabled browser.</p> </noscript>
  </body>
</html>
```

上面代码是在脚本不可用时让浏览器显示一段话。如果浏览器支持脚本，则用户永远不会看到它。

## 3.1.5 语句

ECMAScript 中的语句以分号结尾。省略分号意味着由解析器确定语句在哪里结尾，如下面的例子所示:

```js
// let sum = a + b // 没有分号也有效，但不推荐
// let diff = a - b; // 加分号有效，推荐
```

if 之类的控制语句只在执行多条语句时要求必须有代码块。不过，最佳实践是始终在控制语句中使用代码块，即使要执行的只有一条语句，如下例所示:

```js
// 有效，但容易导致错误，应该避免
if (test) console.log(test)

// 推荐
if (test) {
  console.log(test)
}
```

在控制语句中使用代码块可以让内容更清晰，在需要修改代码时也可以减少出错的可能性。

## 3.3.2 let 声明

1. ~
2. 全局声明

**与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性(var 声 明的变量则会)。**

```js
var name = 'Matt'
console.log(window.name) // 'Matt'

let age = 26
console.log(window.age) // undefined
```

不过，let 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续。因此，为了 避免 SyntaxError，必须确保页面不会重复声明同一个变量。
