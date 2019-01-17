# Module 的语法

> ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
> **ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。**

## 严格模式

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected、static和interface）

## export

用于规定模块的对外接口

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。

- **导出方式**

```js
// 1
export var firstName = 'hello';
export var lastName = 'world';
export function multiply(x, y) {
  return x * y;
};

// 2 优先考虑使用这种写
var firstName = 'hello';
var lastName = 'world';
function multiply(x, y) {
  return x * y;
};
export {firstName, lastName, multiply};

// 3
var firstName = 'hello';
var lastName = 'world';
function multiply(x, y) {
  return x * y;
};

export {
  firstName as fN,
  lastName as lN,
  multiply as m1,
  multiply as m2
};
// 重命名后，multiply可以用不同的名字输出两次。
```

export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
```

<b style="color:red">export命令可以出现在模块的任何位置，只要处于模块顶层就可以，处于块级作用域内，就会报错</b>

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

## import

使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

- **导入方式**

```js
// 1
import {firstName, lastName, year} from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 2 取别名
import { lastName as surname } from './profile.js';
```

- import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`后缀可以省略

```js
import {myMethod} from 'util';
```

- import命令具有提升效果，会提升到整个模块的头部，首先执行

```js
foo();

import { foo } from 'my_module';
```

- import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

- import语句会执行所加载的模块，但是不输入任何值，因此可以有下面的写法。

```js
import 'lodash'
```

- 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次，如下只会执行一次

```js
import 'lodash'
import 'lodash'
```

- import命令输入的变量都是只读的，因为它的本质是输入接口，不允许在加载模块的脚本里面，改写接口。
- 如果a是一个对象，改写a的属性是允许的

```js
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
a.foo = 'hello'; // 合法操作
```

## 模快整体加载 `*`

一个circle.js文件，它输出两个方法`area`和`circumference`。

```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

加载这个模块，可以指定要加载的方法

```js
import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

也可以整体加载到一个对象上

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

- 模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

## export default 命令

- `export default` 默认输出是一个匿名函数，其他模块加载时就可以为该匿名函数指定任意名字

```js
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

- export default命令用在非匿名函数前，也是可以的。不过函数名在模块外部是无效的。加载的时候，视同匿名函数加载。

<b style="color:red">需要注意的是，这时`import`命令后面，`不使用大括号`。</b>

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句，可以直接将一个值写在export default之后。

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 正确
export default 42;

// 报错
export 42;
```

- 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
// lodash.js
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };

// main.js
import _, { each, forEach } from 'lodash';
```

- export default也可以用来输出类。

```js
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

## export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法如下。
export { default } from 'foo';
```

- 下面三种import语句，没有对应的复合写法。

```js
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
```

为了做到形式的对称，现在有提案，提出补上这三种复合写法。

```js
export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";
```

## 模块的继承

