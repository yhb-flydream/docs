# let 和 const

[TOC]

## let

- **无变量提升**，必须先定义否则报错
- **暂时性死区**
  - 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
  - 在代码块内，使用let命令声明变量之前，该变量都是不可用的
- **不允许重复声明**
  - let不允许在相同作用域内`{}`，重复声明同一个变量
- **有块级作用域**，一定程度上替代了`立即执行函数(function() {}())`

## 块级作用域

### 没有块级作用域，这带来很多不合理的场景

- 内层变量可能会覆盖外层变量

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。
但是，函数f执行后，输出结果为undefined，原因在于变量提升，
导致内层的tmp变量覆盖了外层的tmp变量
```

- 用来计数的循环变量泄露为全局变量

```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量
```

### ES6 的块级作用域

### const

- 一旦声明，常量的值就不能改变
- 一旦声明变量，就必须立即初始化，不能留到以后赋值
- **无变量提升**，必须先定义否则报错
- **暂时性死区**
  - 只要块级作用域内存在const命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
  - 在代码块内，使用const命令声明变量之前，该变量都是不可用的
- **不允许重复声明**
  - const不允许在相同作用域内`{}`，重复声明同一个变量
- **有块级作用域**，一定程度上替代了`立即执行函数(function() {}())`

#### 本质

const实际上保证的，**并不是变量的值不得改动**，而是`变量指向的那个内存地址所保存的数据不得改动`。

- 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
- 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

**如果真的想将对象冻结，应该使用`Object.freeze`方法。**

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

**除了将对象本身冻结，对象的属性也应该冻结**

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

### ES6 声明变量的六种方法

- `var`
- `function`
- `let`
- `const`
- `import`
- `class`

### 顶层对象的属性

- 在浏览器环境指的是window对象
- 在 Node 指的是global对象
- ES5 之中，顶层对象的属性与全局变量是等价的

```js
window.a = 1;
a // 1

a = 2;
window.a // 2
```

> 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
> 这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
> 其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
> 最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
> 另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的

ES6 为了改变这一点，一方面规定，为了保持兼容性，

- `var`命令和`function`命令声明的全局变量，**依旧是顶层对象的属性**；
- 另一方面规定，`let`命令、`const`命令、`class`命令**声明的全局变量，不属于顶层对象的属性**。
- 也就是说，**从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩**

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

### global 对象

ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的

- 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
- Node 里面，顶层对象是global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性

- 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法

```js
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

**现在有一个提案，在语言标准的层面，引入global作为顶层对象。也就是说，在所有环境下，global都是存在的，都可以从它拿到顶层对象。**

**垫片库system.global模拟了这个提案，可以在所有环境拿到global**

```js
// CommonJS 的写法
require('system.global/shim')();

// ES6 模块的写法
import shim from 'system.global/shim'; shim();
```

以上代码可以保证各种环境里面，global对象都是存在的。

```js
// CommonJS 的写法
var global = require('system.global')();

// ES6 模块的写法
import getGlobal from 'system.global';
const global = getGlobal();
```

上面代码将顶层对象放入变量global。
