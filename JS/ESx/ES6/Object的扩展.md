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

## 对象的扩展运算符 `...`

### 解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js
let { x, y, ...z } = {x: 1, y: 2, a: 3, b:4};
x // 1
y // 2
z // {a: 3, b: 4}
```

- **解构赋值要求等号右边是一个对象，所以如果等号右边是`undefined`或`null`，就会报错，因为它们无法转为对象**

```js
let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误
```

- **解构赋值必须是最后一个参数，否则会报错。**

```js
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```

<b style="color: red;">解构赋值的拷贝是`浅拷贝`，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个`值的引用`，而不是这个值的副本。</b>

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2

// x是解构赋值所在的对象，拷贝了对象obj的a属性。
// a属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用
```

- 扩展运算符的解构赋值，**不能复制继承自原型对象的属性**。

```js
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
```

<b style="color: red;">ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式</b>

```js
let { x, ...{ y, z } } = o;
// SyntaxError: ... must be followed by an identifier in declaration contexts
```

### 扩展运算符

对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

- 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。

```js
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```

- 如果扩展运算符后面是一个空对象，则没有任何效果。

```js
{...{}, a: 1}
// { a: 1 }
```

- 如果扩展运算符后面不是对象，则会自动将其转为对象。

```js
// 等同于 {...Object(1)}
{...1} // {}

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
```

- 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```js
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

- **对象的扩展运算符等同于使用`Object.assign()`方法**

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

- 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

```js
// 写法一 （不推荐）
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二 （推荐）
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三 （推荐）
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

- 扩展运算符可以用于合并两个对象

```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

- 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```

- 对象的扩展运算符后面可以跟表达式

```js
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```

- 扩展运算符的参数对象之中，如果有`取值函数get`，这个函数是会执行的。

```js
// 并不会抛出错误，因为 x 属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error('not throw yet');
  }
};

// 会抛出错误，因为 x 属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error('throw now');
    }
  }
};
```