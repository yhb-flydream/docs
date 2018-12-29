# Set 和 Map

## Set

- 新的数据结构
- 它类似于数组
- 但是成员的值都是唯一的，没有重复的值
- 是一个构造函数

```js
const s = new Set();
[3,2,3,4,5,4,5].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2,3,4,5
```

### `Set` 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1,2,3,4,4]);
console.log([...set]); // [1,2,3,4]

const items = new Set([1,2,3,4,5,5,5,5]);
console.log(items.size); // 5

const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56
```

- **向 `Set` 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。**

`Set` 内部判断两个值是否不同，使用的算法叫做`“Same-value-zero equality”`，它类似于精确相等运算符（===），**主要的区别是 `NaN` 等于自身，而精确相等运算符认为 `NaN` 不等于自身**

```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

- **两个对象总是不相等的。**

```js
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```

### 属性和方法

- 属性
  - `Set.prototype.constructor` 构造函数，默认值指向 `Set` 函数
  - `Set.prototype.size` 返回 `Set` 成员总数
- 方法
  - 1、操作方法（操作数据）
    - `add(value)` 添加某个值，返回Set结构本身
    - `delete(value)` 删除某个值，返回布尔值，表示是否删除成功
    - `has(value)` 返回布尔值，表示该值是否为 Set 成员
    - `clear()` 清除所有成员，无返回值
  - 2、遍历方法（遍历成员）
    - `keys()` 返回键名的遍历器
    - `vlaues()` 返回键值的遍历器
    - `entries()` 返回键值对的遍历器
    - `forEach` 使用回调函数遍历每个成员

<b style="color:red;">需要特别指出的是，`Set` 的遍历顺序就是插入顺序。</b>

这个特性有时非常有用，比如使用 `Set` 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

由于 `Set` 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`Set` 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。这意味着，可以省略values方法，直接用`for...of`循环遍历 `Set`。

```js
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

### 数组去重的方法

- 方法一

```js
let arr = [1,2,3,4,4,4];
[...new Set(arr)]; // [1,2,3,4]
```

- 方法二

`Array.from` 方法可以将 `Set` 结构转为数组。

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

```js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

## Map

- 它类似于对象
- 也是键值对的集合
- 但是“键”的范围不限于字符串
- 各种类型的值（包括对象）都可以当作键
- 也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // 'content'

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```