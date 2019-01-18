# Class 类

> ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已
> **类的数据类型就是函数，类本身就指向构造函数。**
> 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
// ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')'
}
var p = new Point(1,2);

// ES6
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
var p = new Point(1,2);
p.toString();
```

- `constructor`方法，这就是构造方法，而this关键字则代表实例对象。
- 定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了
- 方法之间不需要逗号分隔，加了会报错。

## constructor 方法

- constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。

- 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

```js
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

- constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
- 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

## 类的实例

- 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(1,2);
point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

- 类的所有实例共享一个原型对象。

## 取值函数（getter）和存值函数（setter）