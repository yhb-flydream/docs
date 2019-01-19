# 对象的扩展

## 属性的简洁表示法

ES6 允许**直接写入变量和函数，作为对象的属性和方法**。这样的书写更加简洁。

```js
let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```

## 属性名表达式

ES6 允许字面量定义对象时，**把表达式放在方括号内**。

```js
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world',
  ['h' + 'ello']() {
    return 'hi';
  }
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
a.hello() // hi
```

**注意，属性名表达式与简洁表示法，不能同时使用，会报错。**

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

**注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`，这一点要特别小心。**

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

上面代码中，`[keyA]`和`[keyB]`得到的都是`[object Object]`，所以`[keyB]`会把`[keyA]`覆盖掉，而myObject最后只有一个`[object Object]`属性。

## 方法的 name 属性

- 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

```js
const person = {
  sayName() {
    console.log('hello')
  },
};
person.sayName.name // 'sayName'
```

- 如果对象的方法使用了取值函数（`getter`）和存值函数（`setter`），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。

```js
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```

- 有两种特殊情况：
  - bind方法创造的函数，name属性返回bound加上原函数的名字；
  - Function构造函数创造的函数，name属性返回anonymous。

```js
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

- 如果对象的方法是一个 `Symbol` 值，那么name属性返回的是这个 Symbol 值的描述。

```js
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

## 属性的可枚举性和遍历

### 可枚举

### 遍历

- （1）`for...in`
  - `for...in`循环遍历对象自身的和继承的可枚举属性（不含 `Symbol` 属性）。

- （2）`Object.keys(obj)`
  - `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 `Symbol` 属性）的键名。

- （3）`Object.getOwnPropertyNames(obj)`
  - `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

- （4）`Object.getOwnPropertySymbols(obj)`
  - `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 `Symbol` 属性的键名。

- （5）`Reflect.ownKeys(obj)`
  - `Reflect.ownKeys`返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

- **以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。**
  - 首先遍历所有数值键，按照数值升序排列。
  - 其次遍历所有字符串键，按照加入时间升序排列。
  - 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

## super

`this`关键字总是指向**函数所在的当前对象**

ES6 又新增了另一个类似的关键字`super`，指向**当前对象的原型对象**。

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

**`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错**

```js
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```

第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。

**目前，只有对象方法的简写法可以让 `JavaScript` 引擎确认，定义的是对象的方法。**

JavaScript 引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）或`Object.getPrototypeOf(this).foo.call(this)`（方法）。

```js
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

上面代码中，`super.foo`指向原型对象`proto`的`foo`方法，但是绑定的`this`却还是当前对象`obj`，因此输出的就是`world`。