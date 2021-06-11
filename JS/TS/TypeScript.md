# TypeScript

- [Typescript](https://www.typescriptlang.org/)
- [Typescript github](https://github.com/Microsoft/TypeScript)
- [Typescript 中文网](https://www.tslang.cn/)
- [TypeScript 中文手册](https://typescript.bootcss.com/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [深入理解 Typescript](https://jkchao.github.io/typescript-book-chinese/)
- [TypeScript Handbook（中文版）](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [TypeScript 精通指南](https://nodelover.gitbook.io/typescript/)

[TOC]

## 安装

- 通过 `npm` 或者 `yarn`

```bash
npm install -g typescript

or

yarn global add typescript
```

## Hello TypeScript

**TypeScript 中，使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以**

在 `hello.ts` 文件中写入一下代码

```ts
function sayHello(name: string) {
  return 'Hello ' + name
}
let myName: string = 'TypeScript'
console.log(sayHello(myName))
```

运行

```bash
tsc hello.ts
```

会生成 `hello.js`

```js
function sayHello(name) {
  return 'Hello ' + name
}
var myName = 'TypeScript'
console.log(sayHello(myName))
```

## 基础

### 原始数据类型

- 数值（number）
  - `let num: number = 1`
- 字符串（string）
  - `let str: string = '1'`
- 布尔值（boolean）
  - `let bl: boolean = true`
- undefined
  - `let un: undefined = undefined`
- null
  - `let nu: null = null`
- Void（空值）
  - `let vo: void = undefined`
  - `let vo: void = null`
- Symbol

**注意：**

- 声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`
- `undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 和 `null` 类型的变量可以赋值给任意类型的值

### 任意值

任意值的类型为 `any`

顾名思义，任意值的变量可以被赋值为任意类型的值

```ts
let a: any = 1
a = '1'
a = true
```

- 声明变量类型为了 `any` 的变量，为任意值

```ts
let a: any = 1
a = '1'
```

- 初始声明变量时，没有声明类型的变量为任意值

```ts
let a
a = 1
a = '1'
```

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。使用 `|` 分隔每个类型。

```ts
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

_当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。_

### 对象的类型——接口

接口（`Interfaces`）来定义对象的类型

> 什么是接口
>
> 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
> TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

```ts
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

**定义的变量比接口少(多)一些属性都是不允许的：**
接口定义之后，在赋值的时候，变量的形状必须和接口的形状保持一致。

#### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性(_该属性可以不存在_)：

```ts
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
}

// OR

let tom: Person = {
  name: 'Tom',
  age: 25,
}
```

**但此时仍不能添加未定义属性。**

#### 任意属性

```ts
interface Person {
  name: string
  age: number
  [propName: string]: any
}
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值

**注意，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
}

// 此时编译会报错，因为 任意属性的类型为 string，但是 age 的类型为 number
```

**一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：**

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string | number
}
```

#### 只读属性

使用 `readonly` 标注属性为只读：

```ts
interface Person {
  readonly id: number
  name: string
  age: number
  [propName: string]: string | number
}
```

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：**

### 数组的类型

#### 「类型 + 方括号」表示法

```ts
let arr: number[] = [1, 2, 3]
```

此时规定数组中只能出现 number 类型，不允许出现其他类型

**数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：**

```ts
let arr: number[] = [1, 2, 3]
arr.push('4')

// Argument of type '"4"' is not assignable to parameter of type 'number'.
```

#### 数组泛型

```ts
let arr: Array<number> = [1, 2, 3]
```

#### 用接口表示数组

```ts
interface NumberArray {
  [index: number]: number
}
let arr: NumberArray = [1, 2, 3]
```

`NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

#### 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```ts
function sum() {
  let args: number[] = arguments
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```ts
function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}
```

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```ts
function sum() {
  let args: IArguments = arguments
}
```

`IArguments` 是 `TypeScript` 中定义好了的类型，它实际上就是：

```ts
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}
```

#### any 在数组中的应用

用 any 表示数组中允许出现任意类型：

```ts
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }]
```

### 函数的类型

在 JavaScript 中，有两种常见的定义函数的方式

- ——函数声明（Function Declaration）
- 函数表达式（Function Expression）

```js
// 函数声明（Function Declaration）
function sum(x, y) {
  return x + y
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
  return x + y
}
```

#### 函数声名式

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function (x: number, y: number): number {
  return x + y;
}
```

**注意，输入多余的（或者少于要求的）参数，是不被允许的。**

#### 函数表达式

```ts
let mySum = function (x: number, y: number): number {
  return x + y
}
```

上面书写是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
```

#### 用接口定义函数的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1
}
```

#### 可选参数

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName
  } else {
    return firstName
  }
}
let tomcat = buildName('Tom', 'cat')
let tom = buildName('Tom')
```

**需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：**

```ts
// 可选参数 firstName 之后，还有必选参数是不允许的
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + ' ' + lastName
  } else {
    return lastName
  }
}
let tomcat = buildName('Tom', 'Cat')
let tom = buildName(undefined, 'Tom')

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```

#### 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将添加了默认值的参数识别为可选参数：**

```ts
function buildName(firstName: string, lastName: string = 'cat') {
  return firstName + ' ' + lastName
}
let tomCat = buildName('Tom', 'cat')
let tom = buildName('Tom')
```

此时就不受「_可选参数必须接在必需参数后面_」的限制了：

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let cat = buildName(undefined, 'Cat')
```

#### 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```ts
function push(array, ...itsms) {
  items.forEach(function (item) {
    array.push(item)
  })
}
let a: any[] = []
push(a, 1, 2, 3)
```

items 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item)
  })
}

let a = []
push(a, 1, 2, 3)
```

**注意，rest 参数只能是最后一个参数。**

#### 重载 **\***

**重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。**

比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else {
    return x.split('').reverse().join('')
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```

上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

**注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。**

### 类型断言

> 可以用来手动指定一个值的类型

```ts
;(值 as 类型) < 类型 > 值
```

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 `值 as 类型`。

形如 `<Foo>` 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个**范型**。

故建议在使用类型断言时，统一使用 `值 as 类型` 这样的语法。

#### 用途

##### 将一个联合类型断言为其中一个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法：

```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
    return true
  }
  return false
}

// index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

因为 Cat 接口没有定义 swim 方法，所以使用 animal.swim 的时候就会报错

此时可以使用类型断言，将 animal 断言成 Fish：

```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}
```

**需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误。**

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

##### 将一个父类断言为一个更加具体的子类

```ts
class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 200
}
function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true
  }
  return false
}
```

上面的例子中，我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。

但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。

##### 将任何一个类型断言为 any

当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const foo: number = 1
foo.length = 1

// index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
```

但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

```ts
window.foo = 1

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 window 上添加一个属性 foo，但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性。

此时我们可以使用 as any 临时将 window 断言为 any 类型：

```ts
;(window as any).foo = 1
```

**在 any 类型的变量上，访问任何属性都是允许的。**

_需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。_

**它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。**

**一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡。**

##### 将 any 断言为一个具体的类型

举例来说，历史遗留的代码中有个 getCacheData，它的返回值是 any：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key]
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  return(): void
}

let cat = getCacheData('tom') as Cat
tom.run()
```

上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。

#### [类型断言的限制](https://ts.xcatliu.com/basics/type-assertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80%E7%9A%84%E9%99%90%E5%88%B6)

**但并不是任何一个类型都可以被断言为任何另一个类型。**

综述：

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 any
- any 可以被断言为任何类型
- **要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可**

其实前四种情况都是最后一个的特例。

#### 双重断言

既然：

- 任何类型都可以被断言为 any
- any 可以被断言为任何类型

那么我们是不是可以使用双重断言 `as any as Foo` 来将任何一个类型断言为任何另一个类型呢？

```ts
interface Cat {
  run(): void
}
interface Fish {
  swim(): void
}
function testCat(cat: Cat) {
  return (cat as any) as Fish
}
```

在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。

但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。

_若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。_

**除非迫不得已，千万别用双重断言。**

#### 类型断言 vs 类型转换

类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：

```ts
function toBoolean(something: any): boolean {
  return something as boolean
}
toBoolean(1) // 1
```

在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

```ts
function toBoolean(something) {
  return something
}

toBoolean(1)
// 返回值为 1
```

所以类型断言不是类型转换，它不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：

```ts
function toBoolean(something: any): boolean {
  return Boolean(something)
}

toBoolean(1) // true
```

#### [类型断言 vs 类型声明](https://ts.xcatliu.com/basics/type-assertion#lei-xing-duan-yan-vs-lei-xing-sheng-ming)

```ts
function getCacheData(key: string): any {
  return (window as any).cathe[key]
}
interface Cat {
  name: string
  run(): void
}
const tom = getCacheData('tom') as Cat
tom.run()
```

上例中，使用 as Cat 将 any 类型断言为了 Cat 类型。但实际上还有其他方式可以解决这个问题：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom: Cat = getCacheData('tom')
tom.run()
```

上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。

这和类型断言是非常相似的，而且产生的结果也几乎是一样的 —— tom 在接下来的代码中都变成了 Cat 类型。它们的区别，可以通过这个例子来理解：

```ts
interface Animal {
  name: string
}
interface Cat {
  name: string
  run(): void
}
const animal: Animal = {
  name: 'tom',
}
let tom = animal as Cat
```

...

#### 类型断言 vs 范型

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key]
}

interface Cat {
  name: string
  run(): void
}

const tom = getCacheData('tom') as Cat
tom.run()
```

使用泛型替代断言

```ts
function getCacheData<T>(key: string): T {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom = getCacheData<Cat>('Tom')
tom.run()
```

### 声明文件

#### 什么是声明语句 `declare var`

使用 `jQuery` 时，一般方式是直接用 script 标签引入，然后就可以使用`$` 和 `jQuery` 了。

但是在 ts 中，编译器并不知道 `$` 和 `jQuery`：

```ts
jQuery('#foo')
// ERROR: Cannot find name 'jQuery'.
```

这时，我们就需要使用 `declare var` 来定义它的类型：

```ts
declare var jQuery: (selector: string) => any
jQuery('#foo')
```

上面，`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会删除：

```js
jQuery('#foo')
```

#### 什么是声明文件 `*.d.ts`

通常会把声明语句放在一个单独的文件中（比如 `jQuery.d.ts`）：

```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any
```

```ts
// src/index.ts
jQuery('#foo')
```

**声明文件必须以 `.d.ts` 为后缀。**

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包括以 `.d.ts` 为后缀的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `.ts` 文件都可以获得 `jQuery` 的类型定义

```txt
/path/to/project
|- src
|   |- index.ts
|   |- jQuery.d.ts
|- tsconfig.json
```

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include`、`exclude` 配置，确定包含了 `jQuery.d.ts` 文件。

##### 第三方声明文件

当然 `jQuery` 的声明文件不需要再定义了，社区已经帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

我们可以直接下载下来使用，但是更推荐的是使用 `@types` 统一管理第三方库的声明文件。

`@types` 的使用方式很简单，直接使用 npm 安装对应的声明模块即可，以 `jQuery` 举例：

```bash
npm install @types/jquery --save-dev
或
npm i @types/jquery -S
```

可以在[这里](https://microsoft.github.io/TypeSearch/)搜索你需要的声明文件

#### 书写声明文件
