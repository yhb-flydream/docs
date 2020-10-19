# Set 和 Map 数据结构

## Set

**类似于数组，但是成员的值都是唯一的，没有重复的值。**

Set 本身是一个**构造函数**，用来生成 **Set 数据结构**。

```js
const s = new Set()

;[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x))

for (let i of s) {
  console.log(i) // 2 3 5 4
}
```

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
// 去除数组的重复成员
console.log([...new Set(array)])

// 去除字符串里面的重复字符
console.log([...new Set('ababbc')].join(''))
// "abc"
```

向 Set 加入值的时候，不会发生类型转换，所以 5 和"5"是两个不同的值。
Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），**主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身**。

```js
let set = new Set()
let a = NaN
let b = NaN
set.add(a)
set.add(b)
console.log(set) // Set {NaN}
```

上面代码向 Set 实例添加了两次 NaN，但是只会加入一个。这表明，在 Set 内部，两个 NaN 是相等的。

两个对象总是不相等的

```js
let set = new Set()

set.add({})
set.size() // 1

set.add({})
set.size() // 2
```

### Set 实例的属性和方法

#### 属性

- `Set.prototype.constructor` 构造函数，默认就是 Set 函数。
- `Set.prototype.size` `Set` 实例的成员总数

#### 方法

- 操作方法（用于操作数据）
  - `Set.prototype.add(value)` 添加某个值，返回 Set 结构本身
  - `Set.prototype.delete(value)` 删除某个值，返回 一个布尔值，表示是否删除成功
  - `Set.prototype.has(value)` 返回 一个布尔值，表示该值是否是 Set 的成员
  - `Set.prototype.clear()` 清除所有成员，没有返回

```js
let s = new Set()

s.add(1).add(2).add(2)

s.size() // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
s.has(2) // false
```

`Array.from` 可以将 Set 结构转换为数组

```js
const items = new Set([1, 2, 3, 4, 5]) // Set(5) {1, 2, 3, 4, 5}
const array = Array.from(items) // [1, 2, 3, 4, 5]
```

- 遍历操作（用于遍历成员）
  - `Set.prototype.keys()` 返回键名的遍历器
  - `Set.prototype.values()` 返回键值的遍历器
  - `Set.prototype.entries()` 返回键值对的遍历器
  - `Set.prototype.forEach()` 使用回调函数遍历每个成员

**需要特别指出的是，Set 的遍历顺序就是插入顺序。**

这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

- `keys` 方法、`values` 方法、`entries` 方法返回的都是遍历器对象。

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 `keys` 方法和 `values` 方法的行为完全一致。

```js
let set = new Set(['red', 'green', 'blue'])

for (let item of set.keys()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 `values` 方法。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values // true
```

可以省略 `values` 方法，直接用 `for...of` 循环遍历 `Set`。

```js
let set = new Set(['red', 'green', 'blue'])

for (let x of set) {
  console.log(x)
}
// red green blue
```

- forEach()

Set 结构的实例与数组一样，也拥有 forEach 方法，用于对每个成员执行某种操作，没有返回值。

```js
let set = new Set([1, 4, 9])
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

- 遍历的应用

扩展运算符（`...`）内部使用 `for...of` 循环，所以也可以用于 Set 结构。

```js
let set = new Set([1, 2, 3])
let arr = [...set] // [1, 2, 3]
```

扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

```js
let arr = [1, 2, 3, 4, 5, 4]
let unique = [...new Set(arr)] // [1, 2, 3, 4, 5]
```

数组的 map 和 filter 方法也可以间接用于 Set 了。

```js
let set = new Set([1, 2, 3])
set = new Set([...set].map((x) => x * 2)) // 返回 set 结构 {2, 4, 6}

let set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter((x) => x % 2 == 0)) // 返回 set 结构 {2, 4}
```

使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```js
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))

// 差集
let difference = new Set([...a].filter((x) => !b.has(x)))
```

如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。

- 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；
- 另一种是利用 Array.from 方法。

```js
let set = new Set([1, 2, 3])

// 方法一
set = new Set([...set].map((x) => x * 2)) // set的值是2, 4, 6

// 方法二
set = new Set(Array.from(set, (x) => x * 2)) // set的值是2, 4, 6
```

## WeakSet

WeakSet 结构与 Set 类似，也是**不重复的值的集合**。

但是，它与 Set 有两个区别。

- 1、WeakSet 的**成员只能是对象**，而不能是其他类型的值。

```js
const ws = new WeakSet()
ws.add(1) // TypeError: Invalid value used in weak set
ws.add(Symbol()) // TypeError: Invalid value used in weak set
```

- 2、WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在内存泄漏问题。因此，**WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息**。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 **WeakSet 不可遍历**。

### 语法

WeakSet 是一个构造函数，可以使用 new 命令，创建 WeakSet 数据结构。

接受一个数组或类似数组的对象作为参数。

```js
const ws = new WeakSet()

const a = [
  [1, 2],
  [3, 4],
]
const ws = new WeakSet(a) // WeakSet {[1, 2], [3, 4]}
```

注意，是 a 数组的**成员**成为 WeakSet 的成员，而不是 a 数组本身。这意味着，数组的成员只能是对象。

```js
const b = [3, 4]
const ws = new WeakSet(b)
// Uncaught TypeError: Invalid value used in weak set(…)
```

数组 b 的成员不是对象，加入 WeakSet 就会报错。

方法：

- `WeakSet.prototype.add(value)`：向 WeakSet 实例添加一个新成员。
- `WeakSet.prototype.delete(value)`：清除 WeakSet 实例的指定成员。
- `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

```js
const ws = new WeakSet()
const obj = {}
const foo = {}

ws.add(window)
ws.add(obj)

ws.has(window) // true
ws.has(foo) // false

ws.delete(window)
ws.has(window) // false
```

WeakSet 没有 size 属性，没有办法遍历它的成员。

```js
let arr = [
  [1, 2],
  [3, 4],
]
let ws = new WeakSet(arr)
ws.size // undefined
ws.forEach // undefined

ws.forEach(function (item) {
  console.log('WeakSet has ' + item)
})
// TypeError: undefined is not a function
```

```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method() {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！')
    }
  }
}
```

上面代码保证了 Foo 的实例方法，只能在 Foo 的实例上调用。这里使用 WeakSet 的好处是，foos 对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑 foos，也不会出现内存泄漏。

## Map

JavaScript 的对象（Object），本质上是**键值对的集合（Hash 结构）**，但是传统上**只能用字符串当作键**。这给它的使用带来了很大的限制。

```js
const data = {}
const element = document.getElementById('myDiv')

data[element] = 'metadata'
data['[object HTMLDivElement]'] // "metadata"
```

上面代码原意是将一个 DOM 节点作为对象 data 的键，但是由于对象只接受字符串作为键名，所以 element 被自动转为字符串 `[object HTMLDivElement]`。

ES6 提供了 Map 数据结构。

它类似于对象，也是键值对的集合，但是**“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键**。
也就是说，Object 结构提供了“**字符串—值**”的对应，Map 结构提供了“**值—值**”的对应，是一种更完善的 Hash 结构实现。
如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
const m = new Map()
const o = { p: 'Hello World' }

m.set(o, 'content')
m.get(o) // content

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

作为构造函数，Map 也可以接受一个数组作为参数。
**该数组的成员是一个个表示`键值对的数组`。**

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author'],
])

map.size // 2
map.has('name') // true
map.get('name') // 张三
map.has('title') // true
map.get('title') // Author
```

在新建 Map 实例时，就指定了两个键 name 和 title。

Map 构造函数接受数组作为参数，实际上执行的是下面的算法。

```js
const items = [
  ['name', '张三'],
  ['title', 'Author'],
]

const map = new Map()

items.forEach(([key, value]) => map.set(key, value))
```

不仅仅是数组，**任何具有 `Iterator` 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数。**
这就是说，Set 和 Map 都可以用来生成新的 Map。

```js
const set = new Set([
  ['foo', 1],
  ['bar', 2],
])
const m1 = new Map(set)
m1.get('foo')

const m2 = new Map([['baz', 3]])
const m3 = new Map(m2)
m3.get('baz') // 3
```

**如果对同一个键多次赋值，后面的值将覆盖前面的值。**

```js
const map = new Map()

map.set(1, 'aaa').set(1, 'bbb')

map.get(1) // bbb
```

**如果读取一个未知的键，则返回 `undefined`。**

```js
new Map().get('asfddfsasadf') // undefined
```

**注意，只有对`同一个对象`的引用，Map 结构才将其视为同一个键。**

```js
const map = new Map()

map.set(['a'], 1)
map.get(['a']) // undefined
```

上面代码的 set 和 get 方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此 get 方法无法读取该键，返回 undefined。

```js
const map = new Map()

const k1 = ['a']
const k2 = ['a']

map.set(k1, 111).set(k2, 222)

map.get(k1) // 111
map.get(k2) // 222
```

变量 k1 和 k2 的值是一样的，但是它们在 Map 结构中被视为两个键。

由上可知，**Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键**。
这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键。
比如 `0` 和 `-0` 就是一个键，布尔值 true 和 字符串 true 则是两个不同的键。
另外，undefined 和 null 也是两个不同的键。虽然 NaN 不严格相等于自身，但 Map 将其视为同一个键。

```js
let map = new Map()

map.set(-0, 123)
map.get(+0) // 123

map.set(true, 1)
map.set('true', 2)
map.get(true) // 1

map.set(undefined, 3)
map.set(null, 4)
map.get(undefined) // 3

map.set(NaN, 123)
map.get(NaN) // 123
```

### 实例的属性

- size
  - 返回 Map 结构的成员总数

```js
const map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
```

- Map.prototype.set(key, value)
  - 设置键名 key 对应的键值为 value，然后返回整个 Map 结构。
  - 如果 key 已经有值，则键值会被更新，否则就新生成该键。

```js
const m = new Map()

m.set('edition', 6) // 键是字符串
m.set(262, 'standard') // 键是数值
m.set(undefined, 'nah') // 键是 undefined
```

set 方法返回的是**当前的 `Map` 对象**，因此可以采用链式写法。

```js
let map = new Map().set(1, 'a').set(2, 'b').set(3, 'c')
```

- Map.prototype.get(key)
  - 读取 key 对应的键值，如果找不到 key，返回 undefined。

```js
const m = new Map()

const hello = function () {
  console.log('hello')
}
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello) // Hello ES6!
```

- Map.prototype.has(key)
  - 返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```js
const m = new Map()

m.set('edition', 6)
m.set(262, 'standard')
m.set(undefined, 'nah')

m.has('edition') // true
m.has('years') // false
m.has(262) // true
m.has(undefined) // true
```

- Map.prototype.delete(key)
  - 删除某个键，返回 true。如果删除失败，返回 false。

```js
const m = new Map()
m.set(undefined, 'nah')
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
```

- Map.prototype.clear()
  - 清除所有成员，没有返回值。

```js
let map = new Map()
map.set('foo', true)
map.set('bar', false)

map.size // 2
map.clear()
map.size // 0
```

### 实例的操作方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

**需要特别注意的是，Map 的遍历顺序就是插入顺序。**

```js
const map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
])
```

```js
for (let key of map.keys()) {
  console.log(key) // "F" "T"
}
```

```js
for (let value of map.values()) {
  console.log(value) // "no" "yes"
}
```

```js
for (let item of map.entries()) {
  console.log(item[0], item[1])
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"
```

```js
// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value)
}
// "F" "no"
// "T" "yes"
```

上面代码，表示 Map 结构的默认遍历器接口（`Symbol.iterator` 属性），就是 `entries` 方法。

```js
map[Symbol.iterator] === map.entries // true
```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）。

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

结合数组的 map 方法、filter 方法，可以实现 Map 的遍历和过滤（_Map 本身没有 map 和 filter 方法_）。

```js
const map0 = new Map().set(1, 'a').set(2, 'b').set(3, 'c')

const map1 = new Map([...map0].filter(([k, v]) => k < 3))
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map([...map0].map(([k, v]) => [k * 2, '_' + v]))
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

Map 还有一个 forEach 方法，与数组的 forEach 方法类似，也可以实现遍历。

```js
map.forEach(function (value, key, map) {
  console.log('Key: %s, Value: %s', key, value)
})
```

forEach 方法还可以接受第二个参数，用来绑定 this。

```js
const reporter = {
  report: function (key, value) {
    console.log('Key: %s, Value: %s', key, value)
  },
}

map.forEach(function (value, key, map) {
  this.report(key, value)
}, reporter)
// this 指向 reporter
```

### 与其他数据结构的互相转换

- Map 转换为数组
  - `[...map]`
- 数组转换为 Map
  - `new Map(array)`
- Map 转换为对象

如果所有 Map 的键都是字符串，它可以无损地转为对象。
如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

const myMap = new Map().set('yes', true).set('no', false)
strMapToObj(myMap)
// { yes: true, no: false }
```

- 对象转换为 Map

```js
let obj = { a: 1, b: 2 }
let map = new Map(Object.entries(obj))

// 或

function objToStrMap(obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}

objToStrMap({ yes: true, no: false })
// Map {"yes" => ue, "ntro" => false}
```

- Map 转换为 JSON

Map 转为 JSON 要区分两种情况。
一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap))
}

let myMap = new Map().set('yes', true).set('no', false)
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map])
}

let myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc'])
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

- JSON 转为 Map

JSON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr))
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr))
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

```js
// 使用 set 方法添加成员
const wm1 = new WeakMap()
const key = { foo: 1 }
wm1.set(key, 2)
wm1.get(key) // 2

// 也可以接受一个数组，作为构造函数的参数
const k1 = [1, 2, 3]
const k2 = [4, 5, 6]
const wm2 = new WeakMap([
  [k1, 'foo'],
  [k2, 'bar'],
])
wm2.get(k2) // bar
```

**WeakMap 与 Map 的区别有两点：**

- WeakMap 只接受**对象作为键名（null 除外）**，不接受其他类型的值作为键名。

```js
const map = new WeakMap()
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

- WeakMap 的键名所指向的对象，不计入垃圾回收机制。

WeakMap 的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
]
```

上面代码中，e1 和 e2 是两个对象，我们通过 arr 数组对这两个对象添加一些文字说明。这就形成了 arr 对 e1 和 e2 的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放 e1 和 e2 占用的内存。

```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
// 一旦忘了写，就会造成内存泄露。
arr[0] = null
arr[1] = null
```

### WeakMap 的语法

WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有 `keys()`、`values()`和 `entries()`方法），也没有 `size` 属性。

WeakMap 只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

```js
const wm = new WeakMap()

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined
```

### WeakMap 的用途

- DOM 节点作为键名

```js
let myWeakmap = new WeakMap()

myWeakmap.set(document.getElementById('logo'), { timesClicked: 0 })

document.getElementById('logo').addEventListener(
  'click',
  function () {
    let logoData = myWeakmap.get(document.getElementById('logo'))
    logoData.timesClicked++
  },
  false
)
```

我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

- 部署私有属性

```js
const _counter = new WeakMap()
const _action = new WeakMap()

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter)
    _action.set(this, action)
  }
  dec() {
    let counter = _counter.get(this)
    if (counter < 1) return
    counter--
    _counter.set(this, counter)
    if (counter === 0) {
      _action.get(this)()
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'))

c.dec()
c.dec()
// DONE
```

```js
Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
```
