# let 和 const

[TOC]

## let

- **不存在变量提升**
  - 所声明的变量一定要在声明后使用，否则报错
- **暂时性死区**
  - 只要块级作用域内存在 `let` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
  - 在代码块内，使用 `let` 命令声明变量之前，该变量都是不可用的
  - “暂时性死区”也意味着 `typeof` 不再是一个百分之百安全的操作
    - `typeof x; // ReferenceError` `let x;`
  - 如果一个变量根本没有被声明，使用 `typeof` 反而不会报错
    - `typeof undeclared_variable // "undefined"`

是因为参数 x 默认值等于另一个参数 y，而此时 y 还没有声明，属于“死区”

```js
function bar(x = y, y = 2) {
  return [x, y]
}
bar() // 报错
```

如果 y 的默认值是 x，就不会报错，因为此时 x 已经声明了

```js
function bar(x = 2, y = x) {
  return [x, y]
}
bar() // [2, 2]
```

在变量 x 的声明语句还没有执行完成前，就去取 x 的值，导致报错”x 未定义“

```js
// 不报错
var x = x

// 报错
let x = x
// ReferenceError: x is not defined
```

- **不允许重复声明**
  - 不允许在相同作用域内 `{}`，重复声明同一个变量
  - 不能在函数内部重新声明参数
- **有块级作用域**，一定程度上替代了`立即执行函数(function() {})()`

## 块级作用域

### 没有块级作用域，这带来很多不合理的场景

- 内层变量可能会覆盖外层变量

if 代码块的外部使用外层的 tmp 变量，内部使用内层的 tmp 变量。但是，函数 f 执行后，输出结果为 undefined，原因在于变量提升，导致内层的 tmp 变量覆盖了外层的 tmp 变量

```js
var tmp = new Date()

function f() {
  console.log(tmp)
  if (false) {
    var tmp = 'hello world'
  }
}

f() // undefined
```

- 用来计数的循环变量泄露为全局变量

变量 i 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量

```js
var s = 'hello'

for (var i = 0; i < s.length; i++) {
  console.log(s[i])
}

console.log(i) // 5
```

### ES6 的块级作用域

- let 实际上为 JavaScript 新增了块级作用域

```js
function f1() {
  let n = 5
  if (true) {
    let n = 10
  }
  console.log(n) // 5
}
```

- ES6 允许块级作用域的任意嵌套

```js
{
  {
    {
      {
        {
          let insane = 'Hello World'
        }
        console.log(insane) // 报错
      }
    }
  }
}
```

- 内层作用域可以定义外层作用域的同名变量

```js
{
  {
    {
      {
        let insane = 'Hello World'
        {
          let insane = 'Hello World'
        }
      }
    }
  }
}
```

### 块级作用域与函数声明

[块级作用域与函数声明](https://es6.ruanyifeng.com/#docs/let#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E)

## const

- 只读的常量。一旦声明，常量的值就不能改变
- 声明的变量不得改变值。一旦声明变量，就必须立即初始化，不能留到以后赋值
- 只在声明所在的块级作用域内有效
- **不存在变量提升**
  - 所声明的变量一定要在声明后使用，否则报错
- **暂时性死区**
  - 只要块级作用域内存在 `const` 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
  - 在代码块内，使用 `const` 命令声明变量之前，该变量都是不可用的
  - “暂时性死区”也意味着 `typeof` 不再是一个百分之百安全的操作
    - `typeof x; // ReferenceError` `const x;`
  - 如果一个变量根本没有被声明，使用 `typeof` 反而不会报错
    - `typeof undeclared_variable // "undefined"`
- **不允许重复声明**
  - `const` 不允许在相同作用域内`{}`，重复声明同一个变量
- **有块级作用域**，一定程度上替代了`立即执行函数(function() {}())`

### 本质

`const` 实际上保证的，**并不是变量的值不得改动**，而是`变量指向的那个内存地址所保存的数据不得改动`。

- 简单类型的数据（数值、字符串、布尔值）
  - 值就保存在变量指向的那个内存地址，因此等同于常量。
- 复合类型的数据（主要是对象和数组）
  - 变量指向的内存地址，保存的只是一个指向实际数据的指针
  - `const` 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

```js
const a = []
a.push('Hello') // 可执行
a.length = 0 // 可执行
a = ['Dave'] // 报错
```

**如果真的想将对象冻结，应该使用 `Object.freeze` 方法。**

```js
const foo = Object.freeze({})

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123
```

**_除了将对象本身冻结，对象的属性也应该冻结_**

```js
var constantize = (obj) => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}
```

### ES6 声明变量的六种方法

- `var`
- `function`
- `let`
- `const`
- `import`
- `class`

## 顶层对象的属性

- 在浏览器环境指的是 `window` 对象
- 在 `Node` 指的是 `global` 对象
- ES5 之中，顶层对象的属性与全局变量是等价的

```js
window.a = 1
a // 1

a = 2
window.a // 2
```

> 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
> 这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
> 其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
> 最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
> 另一方面，window 对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的

ES6 为了改变这一点，一方面规定，为了保持兼容性，

- `var` 命令和 `function` 命令声明的全局变量，**依旧是顶层对象的属性**；
- 另一方面规定，`let` 命令、`const` 命令、`class` 命令**声明的全局变量，不属于顶层对象的属性**。
- 也就是说，**从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩**

```js
var a = 1
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1
window.b // undefined
```

## globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 `window`，但 `Node` 和 `Web Worker` 没有 `window`。
- 浏览器和 `Web Worker` 里面，`self` 也指向顶层对象，但是 `Node` 没有 `self`。
- `Node` 里面，顶层对象是 `global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 `this` 变量，但是有局限性

- 全局环境中，`this` 会返回顶层对象。但是，`Node.js` 模块中 `this` 返回的是当前模块，`ES6` 模块中 `this` 返回的是 `undefined`。
- 函数里面的 `this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this` 会指向顶层对象。但是，严格模式下，这时 `this` 会返回 `undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法

```js
// 方法一
typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('unable to locate global object')
}
```

**ES2020 在语言标准的层面，引入 `globalThis` 作为顶层对象。也就是说，任何环境下，`globalThis` 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 `this`。**

**垫片库 `global-this` 模拟了这个提案，可以在所有环境拿到 `globalThis`**
