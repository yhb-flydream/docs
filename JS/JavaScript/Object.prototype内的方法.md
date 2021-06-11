# Object.prototype 内的方法

[TOC]

- `hasOwnproperty`: **(是否有自己的特性)**
  - 作用：
    - 判断一个对象是否含有自己的某个属性
  - 语法：
    - `对象. hasOwnproperty (要判断的属性名)`
  - 返回值：
    - boolean

```javascript
var obj = { a: 1 }
console.log(obj.hasOwnProperty('a')) // true
console.log(obj.hasOwnProperty('b')) // false
console.log(obj.hasOwnProperty('constructor')) // false
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')) // true
```

- `propertyIsEnumerable`: **(特性是否可枚举)**
  - 作用：
    - 判断一个对象是否含有**自己**的某个属性，并且还判断这个属性**是否可枚举(遍历)**【双重判断，是`hasOwnproperty`的加强版】
  - 语法：
    - `对象. propertyIsEnumerable (要判断的属性名)`
  - 返回值：
    - boolean

```javascript
var obj2 = { a: 1 }
console.log(obj2.propertyIsEnumerable('a')) // true

console.log(obj2.propertyIsEnumerable('b')) // false

console.log(obj2.propertyIsEnumerable('constructor')) // false

console.log(Object.prototype.propertyIsEnumerable('hasOwnProperty')) // false
```

- `isPrototypeOf()`:**(判断是不是原型对象)**
  - 作用：
    - 判断一个`对象`是不是`另一个对象`的**原型对象**,如果传入的不是一个对象，或不是另一对象的原型，返回 false
  - 语法：
    - `被判断的对象. isPrototypeOf (对象)`
  - 返回值：
    - boolean

```javascript
var obj2 = { a: 1 }
console.log(Object.prototype.isPrototypeOf(obj2)) // true

console.log(Object.prototype.isPrototypeOf(Object)) // true

console.log(Function.prototype.isPrototypeOf(Function)) // true

console.log(Function.prototype.isPrototypeOf(Math)) // false，因为Math只继承Object.prototype
```

- `toString`:**(判断内置对象类型)**

  - 作用：

    - 根据方法执行时内部的 this 指向，返回一个类似于`["object this指向的对象的类型名称"]`字符串
    - 一般用来判断`ECMAScript`内置的十大对象类型**(9 大构造函数的实例 + Math)**
    - 在内置 9 大构造函数中，它们的`prototype`显示原型对象中，都定义了自己的`toString`方法，所以它们的实例会优先使用自己的`toString`方法
    - 通过这个字符串可以得知**内部对象**指向的类型

  - 语法：
    - `Object.prototype.toString(要判断的对象)`
    - 简写 `([]).toString.call(要判断的对象)`
  - 返回值：
    - boolean

```javascript
Object.prototype.toString() //Object.prototype 内部的toString方法，调用后返回字符串 '[object Object]'

console.log(Object.prototype.toString.call([1, 2])) // [object Array]
console.log(Object.prototype.toString.call(Array)) // [object Function]
console.log(Object.prototype.toString.call(Math)) // [object Math]
//利用 call 方法可以使 [1,2]、Array、Math等对象，使用Object.prototype的toString方法，来查看自己所属的类型
```
