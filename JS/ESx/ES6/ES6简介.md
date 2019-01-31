# ES6简介

[TOC]

## 变量的解构赋值

从数组和对象中提取值，对变量进行赋值，这被称为解构

### 数组的解构赋值

ES6 允许写成下面这样

```js
let [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ['foo', 'bar', 'baz'];
third // 'baz'

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
```

**如果解构不成功，变量的值就等于`undefined`**

```js
let [foo] = []; foo // undefined
let [bar, foo] = [1]; foo // undefined
```

**不完全解构**

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功

```js
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```

**如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错**

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）

对于 Set 结构，也可以使用数组的解构赋值

```js
let [x, y, z] = new set(['a', 'b', 'c']);
x // 'a'
```

**事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值**

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sexth // 5
```

#### 默认值

解构允许指定默认值

```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a'];
x // 'a'
y // 'b'

let [x, y = 'b'] = ['a', undefined];
x // 'a'
y // 'b'
```

**注意<b style="color: red;">!</b>**，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有**当一个数组成员严格等于`undefined`**，默认值才会生效

```js
let [x = 1] = [];
x // 1

let [x = 1] = [null]
x // null
```

**如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`**

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

```js
function f() {
  console.log('aaa')
}

let [x = f()] = [1];
```

上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。上面的代码其实等价于下面的代码

```js
function f() {
  console.log('aaa')
}

let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```js
let [x = 1, y = x] = []; // x = 1, y = 1
let [x = 1, y = x] = [2]; // x = 2, y = 2
let [x = 2, y = x] = [1, 2]; // x = 1, y = 2
let [x = y, y = 1] = [] // ReferenceError: y is not defined

最后一个表达式会报错，是因为x用y做默认值时，y还没有声明
```

### 对象结构赋值

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
```

**对象的解构与数组有一个重要的不同。<b style="color: red;">★</b>**

数组的元素是按次序排列的，变量的取值由它的位置决定；
而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

如果变量名与属性名不一致，必须写成下面这样

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

**这实际上说明，对象的解构赋值是下面形式的简写**

```js
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

上面说明了，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

与数组一样，解构也可以用于嵌套结构的对象

```js
let obj = {
  p: [
    'hello',
    { y: 'world' }
  ]
};

let { p: [x, { y }] } = obj;
x // "hello"
y // "world"
```

**注意<b style="color: red;">!</b>**，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样

```js
let obj = {
  p: [
    'hello',
    { y : 'world' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "hello"
y // "world"
p // ["hello", { y: "world" }]

// -------------------------------

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
start // Object {start: Object}
start // Object { line: 1, column: 5 }

// -------------------------------

let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop: 123}
arr // [true]
```

对象的解构也可以指定默认值

```js
var { x = 3 } = {}; // x = 3
var { x, y = 5 } = { x = 1 }; // x = 1  y = 5
var {X: y = 3 } = {}; // y = 3
var { x: y = 5 } = { x = 5 }; // y = 5
var { message: msg = 'something went wrong' } = {} // msg = something went wrong
```

默认值生效的条件是，对象的属性值严格等于undefined。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

如果结构失败，变量值等于 `undefined`

```js
let {foo} = { bar: 'baz' }; // foo = undefined
```

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```js
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，**则会先转化为对象**

```js
let {toString: s} = 123;
s === Number.protopery.toString // true

let {toString: s} = true;
s === Boolean.protopery.toString // true
```

### 函数参数的解构赋值

```js
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b) // [3, 7]

function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

**注意，下面的写法会得到不一样的结果。**

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

## Symbol

ES6 引入了一种新的**`原始数据类型Symbol`**，表示独一无二的值

- `undefined`
- `null`
- `boolean`
- `string`
- `number`
- `object`
- `symbol`

Symbol 值通过**Symbol函数**生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 `Symbol` 类型。**凡是属性名属于 `Symbol` 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突**

**注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。**

Symbol函数可以接受一个字符串作为参数，表示对 `Symbol` 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let s1 = Symbol('foo); // s1 = Symbol('foo')
let s2 = Symbol('bar); // s2 = Symbol('bar')
s1.toString() // 'Symbol(foo)'
s2.toString() // 'Symbol(bar)'
```

如果 `Symbol` 的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个 `Symbol` 值

注意，Symbol函数的参数只是表示对当前 `Symbol` 值的描述，因此相同参数的Symbol函数的返回值是不相等的

Symbol 值不能与其他类型的值进行运算，会报错

```js
let sym = Symbol('My symbol')

'your symbol is ' + sym // TypeError: can't convert symbol to string

`your symbol is ${sym}` // TypeError: can't convert symbol to string
```

### 作为属性名的 Symbol

用于对象的属性名，就能保证不会出现同名的属性

```js
let mySymbol = Symbol()

// 第一种写法
let a = {}
a[mySymbol] = 'hello'

// 第二种写法
let a = {
  [mySymbol] = 'hello'
}

// 第三种写法
let a = {}
Object.defineProperty(a, mySymbol, { value: 'hello' })

// 以上写法会得到同样结果
a[mySymbol] // hello
```

注意，Symbol 值作为对象属性名时，不能用点运算符

```js
const mySymbol = Symbol()
const a = {}

a.my
```

## 函数的扩展

### 函数参数的默认值

```js
function log(x, y = 'world') {
  console.log( x + y );
}

log('hello'); // hello world
log('hello', 'es6'); // hello es6
log('hello', ''); // hello
```

通常情况下，定义了默认值的参数，应该是函数的**尾参数**。因为这样比较容易看出来，到底省略了哪些参数。
如果非尾部的参数设置默认值，实际上这个参数是没法省略的

### rest 参数 (`...变量名`)

用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}

add(2, 5, 3); // 10
```

### 箭头函数

### 双冒号运算符