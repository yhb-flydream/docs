# Function.prototype 补充(`call`和`apply`和`bind`)

- **`Function.prototype`自身是一个**函数**，且是唯一一个没有`prototype`属性的函数**

  > `({}).toString.call(Function.prototype) ` > `// 结果 "[object Function]"`

- `arguments`
  - 之前函数的属性，现已废弃
- `caller`
  - 返回调用该函数的函数
- `constructor`
  - 指向对应的构造函数，即`Function`
- `length`
  - 形参个数
- `name`
  - 函数名
- `toString`
  - 转换为字符串
- `__proto__`
  - `Function.prototype`所继承的对象，即`Object.prototype`

---

- `apply`

  - 改变函数执行时内部 this 指向
  - **语法：**

    - 1、`函数名.apply( this指向，[实参1, 实参2....] )`
    - 2、`函数名.apply( this指向，{0: 实参1, 1: 实参2, length: 2} )`

  - **注意：**
    - 第一个参数只是为了指定函数执行时 this 的指向，并不会作为参数传进去
    - 第二个参数要求是**数组或伪数组**，apply 会自动把数组中的内容平铺后传入到函数中

```javascript
function add(a, b) {
  console.log(a + b)
}
add.apply(300, [50, 50]) // 数组  结果100
add.apply(300, { 0: 20, 1: 20, length: 2 }) // 伪数组  结果40
```

- `call`
  - 改变函数执行时内部 this 指向
  - **语法：**
    - `函数名.call( this指向，实参1, 实参2.... )`
  - **注意：**
    - 第一个参数只是为了指定函数执行时 this 的指向，并不会作为参数传进去，后面的才是要传入执行的参数

```javascript
function add(a, b) {
  console.log(a + b)
}
add.call(300, 10, 20) // 300 不参加传入函数，结果为30
```

- `bind`**（ES5 提供的方法）**
  - 返回一个`函数的copy版本`，并且可以指定该函数执行时内部 this 的指向
  - **语法：**
    - `var fn = 函数名.bind( this指向，要绑定的实参1, 要绑定的实参2.... );`
  - **返回值：**
    - 函数的 copy 版本

```javascript
var baseNumber = 0
var o = { baseNumber: 100 }
function add(a, b, c) {
  console.log(this.baseNumber + a + b + c)
}
// 1、bind基本使用：
var fn = add.bind(o)
fn(1, 2, 3)
fn(1, 2, 54)

// 2、bind绑定实参的使用：
// 如果前两个参数一直是10，
// 就可以通过bind绑定死，以后就不用传了
var fn = add.bind(o, 10, 10) // 相当于固定形参a为10，形参b为10
fn(50) // 调用fn时，只需再传形参c的值即可
fn(30) // 调用fn时，只需再传形参c的值即可
```

---

**`call`和`apply`和`bind`**

- 都是来自于`Function.prototype`，所以所有函数都可以使用
- call 和 apply 方法会马上执行
- bind 不会马上执行，会返回一个函数的 copy 版本，供以后执行时调用
- **共同点：**

  - 是可以指定**这个函数**执行时内部 this 的指向

- **不同点：**

  - 传参形式不同

- **方法借用**

```javascript
// 借用数组的push方法，给obj对象按照下标添加属性值
var obj = {}
;[].push.call(obj, 1)
;[].push.call(obj, 10)
console.log(obj)

// 借用数组的pop方法，删除伪数组o对象最后一个下标属性值
var o = {
  0: 10,
  1: 20,
  2: 30,
  length: 3,
}
;[].pop.call(o)
console.log(o)
```

- **构造函数借用**

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

function Student(name, age) {
  Person.call(this, name, age)
}
// 想给Student的实例也添加name和age属性
// new Student执行时，其函数内的this指向小红(即小红就是this，this就是小红)
// 那么我想要Person执行时，它里面的this指向小红
// 我就可以通过call指定Person里面的this为小红

var xiaohong = new Student('小红', 16)
console.log(xiaohong)
```

- **把一个伪数组转换为真数组(`[].slice.call(obj)`)**

```javascript
var obj = {
  0: 100,
  1: 200,
  length: 2,
}
// slice可以通过一个旧数组，截取获取一个新数组
console.log([1, 2, 3].slice(0, 1)) //[1]
console.log([1, 2, 3].slice()) // [1, 2, 3]
console.log([].slice.call(obj)) // [100, 200]

// 获取最大值
function getMax() {
  // 借用apply平铺arguments，给max方法传参
  console.log(Math.max.apply(null, arguments))
}
getMax(1, 2, 4, 20) // 20
```
