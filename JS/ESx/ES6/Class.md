# Class 类

[TOC]

> ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

> **类的数据类型就是函数，类本身就指向构造函数。**

> 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

## 简介

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

- `constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。
- 定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了
- **方法之间不需要逗号分隔，加了会报错**

### constructor 方法

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

- `constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。
- **类必须使用`new`调用，否则会报错**。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

### 类的实例

- 实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）
- **带有`this`的属性和方法都属于实例的属性和方法，不带有`this`的都属于class的**

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

### 取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，**对某个属性设置存值函数和取值函数**，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter:' + value);
  }
}
let inst = new MyClass();

inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

**存值函数和取值函数是设置在属性的 `Descriptor` 对象上的。**

### 属性表达式

类的属性名可以采用表达式

```js
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

### Class 表达式

```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

**需要注意的是，这个类的名字是`MyClass`而不是`Me`，`Me`只在 `Class` 的内部代码可用，指代当前类。**

```js
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

```js
const MyClass = class { /* ... */ };
```

采用 Class 表达式，可以写出立即执行的 Class。

```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 注意

- 1、类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
- 2、类不存在变量提升
- 3、name属性总是返回紧跟在class关键字后面的类名
- 4、如果某个方法之前加上星号（`*`），就表示该方法是一个 `Generator` 函数。
- 5、类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

## 静态方法

- 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。

- 如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod(); // hello

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
```

- 如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

- 父类的静态方法，可以被子类继承。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

- 静态方法也是可以从`super`对象上调用的。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

## 实例属性的新写法

实例属性除了定义在`constructor()`方法里面的this上面，也可以定义在类的最顶层。

```js
// 定义在`constructor()`方法里面
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// 定义在类的最顶层
class IncreasingCounter {
  _count = 0;
  bar = 'hello';
  baz = 'world';

  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

## 静态属性

指的是 `Class` 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性

```js
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上`static`关键字。

```js
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```

## 私有方法和私有属性

### 现有的解决方案

**私有方法和私有属性，是`只能在类的内部访问的方法和属性`，外部不能访问。**

这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

- 一种做法是在命名上加以区别。

```js
class Widget {
  // 共有方法
  foo () {
    this._bar()
  }

  // 私有方法
  _bar() {
    return 'hello';
  }
}
```

- 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}

// 上面代码中，foo是共有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。
```

- 还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个Symbol值。

```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

### 私有实属的提案

有一个提案，为class加了私有属性。方法是在属性名之前，使用`#`表示。

私有属性只能在类的内部使用（`this.#count`）。如果在类的外部使用，就会报错。

```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}


const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
```

这种写法不仅可以写私有属性，还可以用来写私有方法。

```js
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  // 私有方法
  #sum() {
    return #a + #b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
```

另外，私有属性也可以设置 `getter` 和 `setter` 方法。

```js
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
```

私有属性不限于从`this`引用，只要是在类的内部，实例也可以引用私有属性。

```js
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
```

私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。

```js
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

## new.target 属性

new是从构造函数生成实例对象的命令。

ES6 为new命令引入了一个`new.target`属性，**该属性一般用在构造函数之中，返回new命令作用于的那个构造函数**。

如果构造函数不是通过new命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例')
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

**Class 内部调用`new.target`，`返回当前 Class`。**

```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

**子类继承父类时，`new.target`会返回子类。**

```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
  }
}

class Square extends Rectangle {
  constructor(lenght) {
    squer(length, lngth);
  }
}

var obj = new Square(3); // 输出 false
```

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
// 上面代码中，Shape类不能被实例化，只能用于继承。
```

**在函数外部，使用`new.target`会报错。**

## Class 的继承

**Class 可以通过`extends`关键字实现继承，通过`extends`关键字，继承了另一个类的所有属性和方法。**

