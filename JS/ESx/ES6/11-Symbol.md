# Symbol

ES6 引入了一种新的原始数据类型 `Symbol`，**表示独一无二的值**。
它是 JavaScript 语言的**第七种数据类型**，前六种是：

- undefined
- null
- 布尔值（Boolean）
- 字符串（String）
- 数值（Number）
- 对象（Object）

Symbol 值通过 `Symbol` 函数生成。

这就是说，对象的属性名现在可以有两种类型：

- 一种是原来就有的字符串
- 另一种就是新增的 Symbol 类型。

**凡是属性名属于 `Symbol` 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。**

```js
let s = Symbol()

typeof s
// "symbol" s 就是独一无二的值
```

**注意，`Symbol` 函数前不能使用 `new` 命令，否则会报错。**

这是因为生成的 `Symbol` 是一个**原始类型的值，不是对象**。
也就是说，由于 `Symbol` 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

`Symbol` 函数可以接受一个字符串作为参数，表示对 `Symbol` 实例的描述，**主要是为了在控制台显示，或者转为字符串时，比较容易区分**。

```js
let s1 = Symbol('foo')
let s2 = Symbol('bar')

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

上面代码中，s1 和 s2 是两个 `Symbol` 值。如果不加参数，它们在控制台的输出都是 `Symbol()`，不利于区分。

如果 `Symbol` 的参数是一个对象，就会调用该对象的 `toString` 方法，将其转为字符串，然后才生成一个 `Symbol` 值。

```js
const obj = {
  toString() {
    return 'abc'
  },
}
const sym = Symbol(obj)
sym // Symbol(abc)
```

**注意，`Symbol` 函数的参数只是表示对当前 `Symbol` 值的描述，因此相同参数的 `Symbol` 函数的返回值是不相等的。**

```js
let s1 = Symbol()
let s2 = Symbol()

s1 === s2 // false

let s1 = Symbol('foo')
let s2 = Symbol('foo')

s1 === s2
```

**`Symbol` 值不能与其他类型的值进行运算，会报错。**

```js
let sym = Symbol('My symbol')

console.log('your symbol is ' + sym)
// TypeError: can't convert symbol to string
console.log(`your symbol is ${sym}`)
// TypeError: can't convert symbol to string
```

但是，`Symbol` 值可以显式转为字符串。

```js
let sym = Symbol('My symbol')

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

另外，`Symbol` 值也可以转为布尔值，但是不能转为数值。

```js
let sym = Symbol()
Boolean(sym) // true
!sym // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```

## Symbol.prototype.description

创建 Symbol 的时候，可以添加一个描述。

```js
const sym = Symbol('foo')
// sym 的描述就是字符串 foo
```

读取这个描述需要将 `Symbol` 显式转为字符串，即下面的写法。

```js
const sym = Symbol('foo')

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"
```

ES2019 提供了一个实例属性 `description`，直接返回 Symbol 的描述。

```js
const sym = Symbol('foo')

sym.description // "foo"
```

## 作为属性名的 Symbol

由于每一个 `Symbol` 值都是不相等的，这意味着 `Symbol` 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```js
let mySymbol = Symbol()

// 第一种写法
let a = {}
a[mySymbol] = 'Hello!'

// 第二种写法
let a = {
  [mySymbol]: 'Hello!',
}

// 第三种写法
let a = {}
Object.defineProperty(a, mySymbol, { value: 'Hello!' })

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

**注意，Symbol 值作为对象属性名时，不能用`点运算符`。**

```js
const mySymbol = Symbol()
const a = {}

a.mySymbol = 'Hello!'
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

因为点运算符后面总是`字符串`，所以不会读取 `mySymbol` 作为标识名所指代的那个值，导致 a 的属性名实际上是一个字符串，而不是一个 `Symbol` 值。

**在对象的内部，使用 `Symbol` 值定义属性时，`Symbol` 值必须`放在方括号之中`。**

```js
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

// 简写
let obj = {
  [s](arg) { ... }
};

obj[s](123);
```

如果 s 不放在方括号中，该属性的键名就是`字符串 s`，而不是 s 所代表的那个 `Symbol` 值。

`Symbol` 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```js
const COLOR_RED = Symbol()
const COLOR_GREEN = Symbol()

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN
    case COLOR_GREEN:
      return COLOR_RED
    default:
      throw new Error('Undefined color')
  }
}
```

常量使用 `Symbol` 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的 `switch` 语句会按设计的方式工作。

还有一点需要注意，`Symbol` 值作为属性名时，**该属性还是公开属性，不是私有属性**。

## 实例：消除魔术字符串

**魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。**

```js
function getArea(shape, options) {
  let area = 0

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = 0.5 * options.width * options.height
      break
    /* ... more code ... */
  }

  return area
}

getArea('Triangle', { width: 100, height: 100 }) // 魔术字符串
```

上面代码中，字符串 `'Triangle'` 就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

**常用的消除魔术字符串的方法，就是把它写成一个变量。**

```js
const shapeType = {
  triangle: 'Triangle',
}

function getArea(shape, options) {
  let area = 0
  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height
      break
  }
  return area
}

getArea(shapeType.triangle, { width: 100, height: 100 })
```

上面代码中，我们把 Triangle 写成 shapeType 对象的 triangle 属性，这样就消除了强耦合。

如果仔细分析，可以发现 shapeType.triangle 等于哪个值并不重要，只要确保不会跟其他 shapeType 属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```js
const shapeType = {
  triangle: Symbol(),
}
```

上面代码中，除了将 shapeType.triangle 的值设为一个 Symbol，其他地方都不用修改。

## 属性名的遍历

Symbol 作为属性名，遍历对象的时候，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回。

但是，它也不是私有属性，有一个 `Object.getOwnPropertySymbols()` 方法，可以获取指定对象的所有 `Symbol` 属性名。该方法返回一个*数组*，成员是当前对象的所有用作属性名的 _`Symbol` 值_。

```js
const obj = {}
let a = Symbol('a')
let b = Symbol('b')

obj[a] = 'Hello'
obj[b] = 'World'

const objectSymbols = Object.getOwnPropertySymbols(obj)

console.log('objectSymbols', objectSymbols)
// [Symbol(a), Symbol(b)]
```

`Object.getOwnPropertySymbols()` 方法与 `for...in` 循环、`Object.getOwnPropertyNames` 方法进行对比

```js
const obj = {}
const foo = Symbol('foo')

obj[foo] = 'bar'

for (let i in obj) {
  console.log(i) /// 无输出
}

Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [Symbol(foo)]
```

使用 `for...in` 循环和 `Object.getOwnPropertyNames()` 方法都得不到 `Symbol` 键名，需要使用 `Object.getOwnPropertySymbols()` 方法。

另一个新的 API，`Reflect.ownKeys()` 方法可以返回所有类型的键名，包括常规键名和 `Symbol` 键名。

```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3,
}

Reflect.ownKeys(obj)
// ['enum', 'nonEnum', Symbol(my_key)]
```

由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

```js
let size = Symbol('size')

class Collection {
  constructor() {
    this[size] = 0
  }

  add(item) {
    this[this[size]] = item
    this[size]++
  }

  static sizeOf(instance) {
    return instance[size]
  }
}

let x = new Collection()
Collection.sizeOf(x) // 0

x.add('foo')
Collection.sizeOf(x) = 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

上面代码中，对象 x 的 size 属性是一个 `Symbol` 值，所以 `Object.keys(x)`、`Object.getOwnPropertyNames(x)` 都无法获取它。这就造成了一种非私有的内部方法的效果。

## Symbol.for()，Symbol.keyFor()

### Symbol.for()

接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 `Symbol` 值。如果有，就返回这个 `Symbol` 值，否则就新建一个以该字符串为名称的 `Symbol` 值，并将其注册到全局。

```js
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')

s1 === s2 // true
```

s1 和 s2 都是 `Symbol` 值，但是它们都是由同样参数的 `Symbol.for` 方法生成的，所以实际上是同一个值。

**`Symbol.for()` 与 `Symbol()` 异同**

- 都会生成新的 `Symbol`
- `Symbol.for()` 会被登记在全局环境中供搜索，`Symbol` 不会
- `Symbol.for()` 不会每次调用就返回一个新的 `Symbol` 类型的值，而是会先检查给定的 `key` 是否已经存在，如果不存在才会新建一个值
- `Symbol()` 写法没有登记机制，所以每次调用都会返回一个不同的值。

### Symbol.keyFor()

返回一个已登记的 `Symbol` 类型值的 `key`

```js
let s1 = Symbol.for('foo')
Symbol.keyFor(s1) // foo

let s2 = Symbol(foo)
Symbol.keyFor(s2) // undefined
```

变量 s2 属于未登记的 `Symbol` 值，所以返回 `undefined`

**注意，`Symbol.for()` 为 `Symbol` 值登记的名字，是全局环境的，不管有没有在全局环境运行。**

```js
function foo() {
  return Symbol.for('bar')
}

const x = foo()
const y = Symbol.for('bar')
x === y // true
```

- `Symbol.for()` 的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

```js
const iframe = document.createElement('iframe')
iframe.src = String(window.location)
document.body.appendChild(iframe)

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo') // true
```

## 实例：模块的 Singleton 模式

Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

## 内置的 Symbol 值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### Symbol.hasInstance

指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法

### Symbol.isConcatSpreadable

等于一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开

### Symbol.species

指向一个构造函数。创建衍生对象时，会使用该属性

### Symbol.match

指向一个函数。当执行 str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值

### Symbol.replace

指向一个方法，当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回值

### Symbol.search

指向一个方法，当该对象被 String.prototype.search 方法调用时，会返回该方法的返回值

### Symbol.split

指向一个方法，当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值

### Symbol.iterator

指向该对象的默认遍历器方法

### Symbol.toPrimitive

指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

### Symbol.toStringTag

指向一个方法。在该对象上面调用 Object.prototype.toString 方法时，如果这个属性存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中 object 后面的那个字符串。

### Symbol.unscopables

指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除
