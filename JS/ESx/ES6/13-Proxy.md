# Proxy

> 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“**元编程**”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，**在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写**。
Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
var obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`)
      return Reflect.get(target, propKey, receiver)
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`)
      return Reflect.set(target, propKey, value, receiver)
    },
  }
)
```

上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象 obj，去读写它的属性，就会得到下面的结果。

```js
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```js
var proxy = new Proxy(target, handler)
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。
其中，new Proxy()表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return 35
    },
  }
)

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

作为构造函数，Proxy 接受两个参数。

- 第一个参数是所要代理的目标对象（上例是一个空对象），即如果没有 Proxy 的介入，操作原来要访问的就是这个对象；
- 第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。

**注意，要使得 Proxy 起作用，必须针对 Proxy 实例（上例是 proxy 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。**

如果 handler 没有设置任何拦截，那就等同于直接通向原对象。

```js
var target = {}
var handler = {}
var proxy = new Proxy(target, handler)
proxy.a = 'b'
target.a // "b"
```

## Proxy 实例的方法

### get()

拦截某个属性的读取操作，可以接受三个参数，依次为**目标对象**、**属性名**和 **proxy 实例本身**（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

```js
var person = {
  name: '张三',
}

var proxy = new Proxy(person, {
  get: function (target, propKey) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw new ReferenceError('Prop name "' + propKey + '" does not exist.')
    }
  },
})

proxy.name // "张三"
proxy.age // 抛出一个错误
```

get 方法可以继承。

```js
let proto = new Proxy(
  {},
  {
    get(target, propertyKey, receiver) {
      console.log('GET ' + propertyKey)
      return target[propertyKey]
    },
  }
)

let obj = Object.create(proto)
obj.foo // "GET foo"
```

```js
// 使用get拦截，实现数组读取负数的索引
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    },
  }

  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
arr[-1] // c
```

**如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。**

```js
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false,
    },
  }
)

const handler = {
  get(target, propKey) {
    return 'abc'
  },
}

const proxy = new Proxy(target, handler)

proxy.foo
// TypeError: Invariant check failed
```

### set()

用来拦截某个属性的赋值操作，可以接受四个参数，依次为**目标对象**、**属性名**、**属性值**和 **Proxy 实例本身**，其中最后一个参数可选。

```js
let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value
  },
}

let person = new Proxy({}, validator)

person.age = 100

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合 get 和 set 方法，就可以做到防止这些内部属性被外部读写。

```js
const handler = {
  get(target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set(target, key, value) {
    invariant(key, 'set')
    target[key] = value
    return true
  },
}
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

set 方法第四个参数

```js
const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = receiver
  },
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
proxy.foo === proxy // true
```

```js
const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = receiver
  },
}
const proxy = new Proxy({}, handler)
const myObj = {}
Object.setPrototypeOf(myObj, proxy)

myObj.foo = 'bar'
myObj.foo === myObj // true
```

设置 myObj.foo 属性的值时，myObj 并没有 foo 属性，因此引擎会到 myObj 的原型链去找 foo 属性。myObj 的原型对象 proxy 是一个 Proxy 实例，设置它的 foo 属性会触发 set 方法。这时，第四个参数 receiver 就指向原始赋值行为所在的对象 myObj。

**注意，如果目标对象自身的某个属性，不可写且不可配置，那么 set 方法将不起作用。**

```js
const obj = {}
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
})

const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = 'baz'
  },
}

const proxy = new Proxy(obj, handler)
proxy.foo = 'baz'
proxy.foo // "bar"
```

**注意，严格模式下，set 代理如果没有返回 true，就会报错。**

```js
'use strict'
const handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = receiver
    // 无论有没有下面这一行，都会报错
    return false // 返回false或者undefined，都会报错。
  },
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

### apply()

拦截函数的调用、call 和 apply 操作。

接受三个参数，分别是**目标对象**、**目标对象的上下文对象（this）**和**目标对象的参数数组**。

```js
var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments)
  },
}
```

```js
var target = function () {
  return 'I am the target'
}
var handler = {
  apply: function () {
    return 'I am the proxy'
  },
}

var p = new Proxy(target, handler)

p()
// "I am the proxy"
```

上面代码中，变量 p 是 Proxy 的实例，当它作为函数调用时（p()），就会被 apply 方法拦截，返回一个字符串。

```js
var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  },
}
function sum(left, right) {
  return left + right
}
var proxy = new Proxy(sum, twice)
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

上面代码中，每当执行 proxy 函数（直接调用或 call 和 apply 调用），就会被 apply 方法拦截。

另外，直接调用 Reflect.apply 方法，也会被拦截。

```js
Reflect.apply(proxy, null, [9, 10]) // 38
```

### has()

用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。
典型的操作就是 in 运算符。

has()方法可以接受两个参数，分别是**目标对象**、**需查询的属性名**。

下面的例子使用 has() 方法隐藏某些属性，不被 in 运算符发现。

```js
var handler = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  },
}
var target = { _prop: 'foo', prop: 'foo' }
var proxy = new Proxy(target, handler)
'_prop' in proxy // false
```

上面代码中，如果原对象的属性名的第一个字符是下划线，proxy.has()就会返回 false，从而不会被 in 运算符发现。

**如果原对象不可配置或者禁止扩展，这时 has()拦截会报错。**

```js
var obj = { a: 10 }
Object.preventExtensions(obj)

var p = new Proxy(obj, {
  has: function (target, prop) {
    return false
  },
})

'a' in p // TypeError is thrown
```

上面代码中，obj 对象禁止扩展，结果使用 has 拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则 has()方法就不得“隐藏”（即返回 false）目标对象的该属性。

值得注意的是，has()方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即**has()方法不判断一个属性是对象自身的属性，还是继承的属性。**

**虽然 for...in 循环也用到了 in 运算符，但是 has()拦截对 for...in 循环不生效。**

```js
let stu1 = { name: '张三', score: 59 }
let stu2 = { name: '李四', score: 99 }

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`)
      return false
    }
    return prop in target
  },
}

let oproxy1 = new Proxy(stu1, handler)
let oproxy2 = new Proxy(stu2, handler)

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a])
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b])
}
// 李四
// 99
```

### construct()

用于拦截 `new` 命令，下面是拦截对象的写法。

```js
const handler = {
  construct(target, args, newTarget) {
    return new target(...args)
  },
}
```

接受三个参数：**目标对象(`必需是函数`)**、**构造函数的参数数组**、**创造实例对象时，new 命令作用的构造函数**

```js
const p = new Proxy(function () {}, {
  construct: function (target, args) {
    console.log('called: ' + args.join(', '))
    return { value: args[0] * 10 }
  },
})

new p(1).value
// "called: 1"
// 10
```

**construct() 方法返回的必须是一个对象，否则会报错。**

```js
const p = new Proxy(function () {}, {
  construct: function (target, argumentsList) {
    return 1
  },
})

new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
```

**由于 construct() 拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。**

```js
const p = new Proxy(
  {},
  {
    construct: function (target, argumentsList) {
      return {}
    },
  }
)

new p() // 报错
// Uncaught TypeError: p is not a constructor
```

**construct() 方法中的 `this` 指向的是 `handler`，而不是实例对象。**

```js
const handler = {
  construct: function (target, args) {
    console.log(this === handler)
    return new target(...args)
  },
}

let p = new Proxy(function () {}, handler)
new p() // true
```

### deleteProperty()

用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除。

```js
var handler = {
  deleteProperty(target, key) {
    invariant(key, 'delete')
    delete target[key]
    return true
  },
}
function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

var target = { _prop: 'foo' }
var proxy = new Proxy(target, handler)
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

**注意，目标对象自身的不可配置（configurable）的属性，不能被 deleteProperty 方法删除，否则报错。**

### defineProperty()

拦截了 Object.defineProperty()操作

```js
var handler = {
  defineProperty(target, key, descriptor) {
    return false
  },
}
var target = {}
var proxy = new Proxy(target, handler)
proxy.foo = 'bar' // 不会生效
```

defineProperty() 方法内部没有任何操作，只返回 false，导致添加新属性总是无效。注意，这里的 false 只是用来提示操作失败，**本身并不能阻止添加新属性**。

**注意，如果目标对象不可扩展（non-extensible），则 defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty()方法不得改变这两个设置。**

### getOwnPropertyDescriptor()

拦截 Object.getOwnPropertyDescriptor()，返回一个**属性描述对象**或者 **undefined**。

```js
var handler = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === '_') {
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  },
}
var target = { _foo: 'bar', baz: 'tar' }
var proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

### getPrototypeOf()

用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

```js
var proto = {}
var p = new Proxy(
  {},
  {
    getPrototypeOf(target) {
      return proto
    },
  }
)
Object.getPrototypeOf(p) === proto // true
```

**注意，getPrototypeOf()方法的返回值必须是`对象`或者 `null`，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回`目标对象的原型对象`。**

### isExtensible()

拦截 Object.isExtensible()操作。

```js
var p = new Proxy(
  {},
  {
    isExtensible: function (target) {
      console.log('called')
      return true
    },
  }
)

Object.isExtensible(p)
// "called"
// true
```

**注意，该方法只能返回`布尔值`，否则返回值会被自动转为布尔值。**

**这个方法有一个强限制，它的返回值必须与目标对象的 isExtensible 属性保持一致，否则就会抛出错误。**

```js
Object.isExtensible(proxy) === Object.isExtensible(target)
```

```js
var p = new Proxy(
  {},
  {
    isExtensible: function (target) {
      return false
    },
  }
)

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
```

### ownKeys()

用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in循环`

```js
let target = {
  a: 1,
  b: 2,
  c: 3,
}

let handler = {
  ownKeys(target) {
    return ['a']
  },
}

let proxy = new Proxy(target, handler)

Object.keys(proxy)
// [ 'a' ]
```

```js
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz',
}

let handler = {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter((key) => key[0] !== '_')
  },
}

let proxy = new Proxy(target, handler)
for (let key of Object.keys(proxy)) {
  console.log(target[key])
}
// "baz"
```

**注意，使用 Object.keys()方法时，有三类属性会被 ownKeys()方法自动过滤，不会返回。**

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（enumerable）的属性

```js
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
}

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static',
})

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key']
  },
}

let proxy = new Proxy(target, handler)

Object.keys(proxy)
// ['a']
```

上面代码中，ownKeys()方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。

ownKeys()方法还可以拦截 Object.getOwnPropertyNames()。

```js
var p = new Proxy(
  {},
  {
    ownKeys: function (target) {
      return ['a', 'b', 'c']
    },
  }
)

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]
```

for...in 循环也受到 ownKeys()方法的拦截。

```js
const obj = { hello: 'world' }
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b']
  },
})

for (let key in proxy) {
  console.log(key) // 没有任何输出
}
```

上面代码中，ownkeys()指定只返回 a 和 b 属性，由于 obj 没有这两个属性，因此 for...in 循环不会有任何输出。

**ownKeys()方法返回的数组成员，只能是`字符串`或 `Symbol` 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。**

```js
var obj = {}

var p = new Proxy(obj, {
  ownKeys: function (target) {
    return [123, true, undefined, null, {}, []]
  },
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name
```

**如果目标对象自身包含不可配置的属性，则该属性必须被 ownKeys()方法返回，否则报错。**

```js
var obj = {}
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10,
})

var p = new Proxy(obj, {
  ownKeys: function (target) {
    return ['b']
  },
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
```

obj 对象的 a 属性是不可配置的，这时 ownKeys()方法返回的数组之中，必须包含 a，否则会报错。

**如果目标对象是不可扩展的（non-extensible），这时 ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。**

```js
var obj = {
  a: 1,
}

Object.preventExtensions(obj)

var p = new Proxy(obj, {
  ownKeys: function (target) {
    return ['a', 'b']
  },
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
```

上面代码中，obj 对象是不可扩展的，这时 ownKeys()方法返回的数组之中，包含了 obj 对象的多余属性 b，所以导致了报错。

### preventExtensions()

拦截 Object.preventExtensions()。该方法**必须返回一个布尔值，否则会被自动转为布尔值**。

**这个方法有一个限制，只有目标对象不可扩展时（即 Object.isExtensible(proxy)为 false），proxy.preventExtensions 才能返回 true，否则会报错。**

```js
var proxy = new Proxy(
  {},
  {
    preventExtensions: function (target) {
      return true
    },
  }
)

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
```

上面代码中，proxy.preventExtensions()方法返回 true，但这时 Object.isExtensible(proxy)会返回 true，因此报错。

为了防止出现这个问题，通常要在 proxy.preventExtensions()方法里面，调用一次 Object.preventExtensions()。

```js
var proxy = new Proxy(
  {},
  {
    preventExtensions: function (target) {
      console.log('called')
      Object.preventExtensions(target)
      return true
    },
  }
)

Object.preventExtensions(proxy)
// "called"
// Proxy {}
```

### setPrototypeOf()

主要用来拦截 Object.setPrototypeOf()方法。

```js
var handler = {
  setPrototypeOf(target, proto) {
    throw new Error('Changing the prototype is forbidden')
  },
}
var proto = {}
var target = function () {}
var proxy = new Proxy(target, handler)
Object.setPrototypeOf(proxy, proto)
// Error: Changing the prototype is forbidden
```

**注意，该方法只能返回`布尔值`，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。**

## Proxy.revocable()

返回一个可取消的 Proxy 实例。

```js
let target = {}
let handler = {}

let { proxy, revoke } = Proxy.revocable(target, handler)

proxy.foo = 123
proxy.foo // 123

revoke()
proxy.foo // TypeError: Revoked
```

返回一个对象，该对象的 proxy 属性是 Proxy 实例，revoke 属性是一个函数，可以取消 Proxy 实例。上面代码中，当执行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。

Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## this

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，**即不做任何拦截的情况下，也无法保证与目标对象的行为一致**。

**主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。**

```js
const target = {
  m: function () {
    console.log(this === proxy)
  },
}
const handler = {}

const proxy = new Proxy(target, handler)

target.m() // false
proxy.m() // true
```

上面代码中，一旦 proxy 代理 target，target.m()内部的 this 就是指向 proxy，而不是 target。

```js
const _name = new WeakMap()

class Person {
  constructor(name) {
    _name.set(this, name)
  }
  get name() {
    return _name.get(this)
  }
}

const jane = new Person('Jane')
jane.name // 'Jane'

const proxy = new Proxy(jane, {})
proxy.name // undefined
```

上面代码中，目标对象 jane 的 name 属性，实际保存在外部 WeakMap 对象 `_name` 上面，通过 this 键区分。由于通过 proxy.name 访问时，this 指向 proxy，导致无法取到值，所以返回 undefined。

此外，有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

```js
const target = new Date()
const handler = {}
const proxy = new Proxy(target, handler)

proxy.getDate()
// TypeError: this is not a Date object.
```

**this 绑定原始对象，就可以解决这个问题。**

```js
const target = new Date('2015-01-01')
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target)
    }
    return Reflect.get(target, prop)
  },
}
const proxy = new Proxy(target, handler)

proxy.getDate() // 1
```

**另外，Proxy 拦截函数内部的 this，指向的是 handler 对象。**

```js
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler)
    return 'Hello, ' + key
  },
  set: function (target, key, value) {
    console.log(this === handler)
    target[key] = value
    return true
  },
}

const proxy = new Proxy({}, handler)

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true
```

上面例子中，get()和 set()拦截函数内部的 this，指向的都是 handler 对象。

## Web 服务的客户端

Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```js
const service = createWebService('http://example.com/data')

service.employees().then((json) => {
  const employees = JSON.parse(json)
  // ···
})
```

Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```js
function createWebService(baseUrl) {
  return new Proxy(
    {},
    {
      get(target, propKey, receiver) {
        return () => httpGet(baseUrl + '/' + propKey)
      },
    }
  )
}
```
