# Vue 重要点

[TOC]

## Vue 没有完全遵循 [MVVM 模型](https://zh.wikipedia.org/wiki/MVVM)

## 如果知道晚些时候会需要一个属性，但一开始它不存在，那么最好先声明一下这个属性，并设置一些初始值

## `Object.freeze(obj)` 会阻止修改现有的属性，也就意味着相应系统无法在追踪变化

## Vue 实例包含了一些属性和方法，它们都有 `$` 前缀，以便与用户自定义属性区分

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data,
})

vm.$data === data // true
vm.el === document.getElementById('example') // true

vm.watch('a', function (nerwValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

## 实例的生命周期钩子函数

每个 `Vue` 实例在被创建时都要经过一系列的初始化过程

例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。
同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会

例如：`created`

```js
new Vue({
  data: {
    a: 1,
  },
  created: function () {
    console.log('a is' + this.a)
  },
})

// "a is 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 `mounted`、`updated` 和 `destroyed`。
生命周期钩子的 `this` 上下文指向调用它的 `Vue 实例`

**<b style="color: red;">注意!</b>**

不要在选项属性或回调上使用`箭头函数`，
比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。
因为箭头函数是和父级上下文绑定在一起的，
this 不会是如你所预期的 Vue 实例，经常导致
`Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误

## `v-once` 可以一次性的插入数值，以后数据变化时此处内容将不会变化

```html
<span v-once>这里将不会变化：{{ message }}</span>
```

## 最好不要动态显然任意的 HTML 这很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)

## `Mustache(双大括号)` 数据绑定的形式不适用与 HTML 特性的绑定，此时应该使用 `v-bind`

```html
<div v-bind:id="divId"></div>

<button v-bind:disabled="idBtnDisabled">Button</button>
```

## 修饰符 以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()：`

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

## 缩写 `v-bind 缩写为:` `v-on 缩写为@`

```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>

<!-- 完整与法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

## 计算属性缓存 vs 方法

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello',
  },
  // 在组件中
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    },
  },
})
```

此处方法和计算属性两种方式的最终结果确实是完全相同的

**不同的是计算属性是基于它们的依赖进行缓存的**

只在相关依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数

## 计算属性 vs 侦听属性

使用 `watch`

```js
;<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar',
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    },
  },
})
```

使用计算属性

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
  },
  computed: {
    fullName: function () {
      return this.firstName + '' + this.lastName
    },
  },
})
```

## 计算属性的 `setter`

计算属性默认只有 `getter` ，不过在需要时你也可以提供一个 `setter` ：

```js
computed: {
  fullName: {
    // getter
    get: function() {
      return this.firstName + '' + this.lastName
    },
    // setter
    set: function(newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 `vm.fullName = 'John Doe'` 时，`setter` 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新

## [监听器](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

## [Class 与 Style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html)

## 在 `<template>` 元素上使用 `v-if` 条件渲染分组，可以同时切换多个元素

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## `v-else` 来表示 `v-if` 的 else 块，**必须紧跟在 `v-if` 或 `v-else-if` 后面，否则将不会被识别**

## `Vue` 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" />
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" />
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`

## Vue 提供了一种方式来表达**这两个元素是完全独立的不要复用它们**，只需要添加一个具有唯一值的 `key 属性`即可

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input" />
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input" />
</template>
```

现在切换后，输入框都将被重新渲染，但 `<leabel>` 因没有设置 `key` 仍将被复用

## `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性 `display`。`v-show` 不支持 `<template>` 元素，也不支持 `v-else`

## `v-if` vs `v-show`

- `v-if` 是**真正**的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

- `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

- 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 进行切换。

- 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## 不推荐同时使用 `v-if` 和 `v-for`。查阅[风格指南](https://cn.vuejs.org/v2/style-guide/#Avoid-v-if-with-v-for-essential)获取更多信息

## 在 `v-for` 中 `in` 可以用 `of` 替换，因为它是最接近 JavaScript 迭代器的语法

```html
<!-- in -->
<ul id="example-2">
  <li v-for="(item, index) in items">{{ parentMessage }} - {{ index }} - {{ item.message }}</li>
</ul>

<!-- of -->
<ul id="example-2">
  <li v-for="(item, index) of items">{{ parentMessage }} - {{ index }} - {{ item.message }}</li>
</ul>
```

## `v-for` 循环数组的参数[`(item) 或 (item, index)`]

```html
<ul id="example-1">
  <li v-for="item in items">{{ item.message }}</li>
</ul>

或

<ul id="example-2">
  <li v-for="(item, index) in items">{{ parentMessage }} - {{ index }} - {{ item.message }}</li>
</ul>
```

- item 数组的每一项
- index 数组的索引

## `v-for` 循环对象的参数[(value) 或 (value, key) 或 (value, key, index)]

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">{{ value }}</li>
</ul>

或

<ul id="v-for-object" class="demo">
  <li v-for="(value, key) in object">{{ key }} --- {{ value }}</li>
</ul>

或

<ul id="v-for-object" class="demo">
  <li v-for="(value, key, index) in object">{{ index }} {{ key }} {{ value }}</li>
</ul>
```

- value 对象每一个属性的值
- key 对象的每一个属性
- index 对象每一个属性的索引

## `v-for` 结合 `key` 使用

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态**

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。理想的 `key` 值是每项都有的唯一 `id`，但它的工作方式类似于一个属性，所以你需要用 `v-bind` 来绑定动态值:

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 数组更新检查

### 变异方法 Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新

#### `push()`

#### `pop()`

#### `shift()`

#### `unshift()`

#### `splice()`

#### `sort()`

#### `reverse()`

### 替换数组 调用此方法后不会改变原来的数组，总会返回一个新数组

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

#### 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

##### 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

##### 当你修改数组的长度时，例如：`vm.items.length = newLength`

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c'],
  },
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

##### 解决办法

- 解决第一类问题 (`vm.items[indexOfItem] = newValue`)

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

也可以使用 `vm.$set` 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```

- 解决第二类问题(`vm.items.length = newLength`)，可以使用 `splice`：

```js
vm.items.splice(newLength)
```

## 对象更改检测注意事项

由于 JavaScript 的限制，**Vue 不能检测对象属性的添加或删除**：

```js
var vm = new Vue({
  data: {
    a: 1,
  },
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika',
    },
  },
})
```

可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
```

还可以使用 `vm.$set` 实例方法，它只是全局 `Vue.set` 的别名：

```js
vm.$set(vm.userProfile, 'age', 27)
```

有时可能需要为已有对象赋予**多个新属性**，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

```js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green',
})
```

应该这样做：

```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green',
})
```

## 展示排序/过滤后的结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的**计算属性**

```html
<li v-for="n in evenNumbers">{{ n }}</li>

data: { numbers: [1, 2, 3, 4] }, computed: { evenNumbers: function() { return this.numbers.filter(function(number) { return number % 2 === 0 }) } }
```

在计算属性不适用的情况下 (_例如，在嵌套 `v-for` 循环中_) 你可以使用一个 `method` 方法：

```html
<li v-for="n in even(numbers)">{{ n }}</li>

data: { numbers: [1, 2, 3, 4] }, methods: { even: function(numbers) { return numbers.filter(function(number) { return number % 2 === 0 }) } }
```

## `v-for` 对于整数的循环

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>

结果： 1 2 3 4 5 6 7 8 9 10
```

## `v-for` with `v-if`

**当它们处于同一节点，v-for 的优先级比 v-if 更高**，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你想为仅有的一些项渲染节点时，这种优先级的机制会十分有用，如下：

```html
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
```

上面的代码只传递了未完成的 `todos`。

而如果你的目的是**有条件地跳过循环的执行**，那么可以将 `v-if` 置于外层元素 (或 `<template>`)上。如：

```html
<ul v-if="todos.length">
  <li v-for="todo in todos">{{ todo }}</li>
</ul>
<p v-else>No todos left!</p>
```

## 一个组件的 `v-for`

https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B

## 事件处理

### 可以用 `v-on` 指令监听 DOM 事件，并在`触发时运行一些 JavaScript 代码`

```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>

var example1 = new Vue({ el: '#example-1', data: { counter: 0 } })
```

### 然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以`接收一个需要调用的方法名称`

```html
<div id="example-2">
  <!-- greet 是在下面定义的方法 -->
  <button v-on:click="greet">Greet</button>
</div>

var example2 = new Vue({ el: '#example-2', data: { name: 'Vue.js' }, 在 methods 对象中定义方法 methods: { greet: function (event) { alert('Hello' +
this.name + '!') // event 是原生 DOM 事件 if (event) { alert(event.target.tagName) } } } }) // 也可以用 JavaScript 直接调用方法 example2.greet() //
'Hello Vue.js'
```

### 除了直接绑定到一个方法，也可以`在内联 JavaScript 语句中调用方法`

```html
<div id="example-3">
  <button v-on:click="say('hi')">Say Hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>

new Vue({ el: '#example-3', methods: { say: function(message) { alert(message); } } })
```

### 有时也需要在内联语句处理器中访问原始的 DOM 事件。`可以用特殊变量 $event 把它传入方法`

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)"></button>

//... methods: { warn: function(message, event) { if (event) event.preventDefault() alert(message) } }
```

### 事件修饰符

#### `.stop` 阻止单击事件继续传播

```html
<a v-on:click.stop="doThis"></a>
```

#### `.prevent` 阻止默认事件的执行

```html
<!-- 提交事件不再重载页面 -->
<form v-on:click.prevent="onSubmit"></form>
```

#### `.capture` 添加事件监听器时使用事件捕获模式

即元素自身触发的事情先在此处理，然后再交由内部元素处理

```html
<div v-on:click.capture="doThis">...</div>
```

#### `.self` 只当在 `event.target` 是当前元素自身时触发处理函数，即事件不是冲内部触发的

```html
<div v-on:click.self="doThat"></div>
```

#### `.once` 点击事件只会触发一次

```html
<a v-on:click.once="doOnceThis"></a>
```

#### `.passive` 对 `addEventListener` 中的 `passive` 提供了 `.passive` 修饰符，`尤其能够提升移动端性能`

滚动事件的默认行为（即滚动行为）会被立即触发，而不会等待 `onScroll` 完成，这其中包含 `event.preventDefault()` 的情况

```html
<div v-on:scroll.passive="onScroll"></div>
```

##### 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为

#### 修饰符可以串联 `v-on:click.stop.prevent`

```html
<a v-on:click.stop.prevent="doThat"></a>
```

#### 可以只写修饰符 `<form v-on:submit.prevent></form>`

#### 使用修饰符时顺序很重要，相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会**阻止所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击

### 按键修饰符

在监听键盘事件时，我们经常需要检查常见的键值。`v-on` 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit" />
```

记住所有的 `keyCode` 比较困难，所以 `Vue` 为最常用的按键提供了别名：

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit" />

<!-- 缩写语法 -->
<input @keyup.enter="submit" />
```

#### `.enter`

#### `.tab`

#### `.delete`(包含“删除”和“退格”)

#### `.esc`

#### `.space`

#### `.up`

#### `.down`

#### `.left`

#### `.right`

#### 通过全局 `config.keyCode` 对象可自定义修改按年修饰符别名

```js
// 可以使用 v-on:keyup.f1
Vue.config.keyCode.f1 = 112
```

#### 也可以直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 kebab-case 来作为修饰符

```html
<input @keyup.page-down="onPageDown" />
```

此事件触发后近 `@event.key === 'PageDown'` 时被调用

#### 有一些按键（`.esc` 以及所有的方向键）在 IE9 中有不同的 key，如果要支持 IE9，它们的内置别名应该是首选

### [系统修饰键](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

## [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

## 组件<b style="color: red;">★</b>

### 组件是可复用的 Vue 实例，且带有一个名字。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>

Vue.component('button-counter', { data: function () { return { count: 0 } }, template: '<button @click="count++">
  You click me {{ count }} times</button
>' }); new Vue({ el: '#components-demo' })
```

### 因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项

### 可以将组件进行任意次数的复用：因为每用一次组件，就会有一个它的新实例被创建

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

### `data` 必须是一个`函数` 一个组件的 `data` 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

### 通过 `Prop` 向子组件传递数据 `Prop` 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 `prop` 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 `prop` 列表中

```js
Vue.component('component-demo', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>',
})
```

### `一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop`。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。一个 prop 被注册之后，就可以像这样把数据作为一个自定义特性传递进来

```html
<component-demo title="demo title 1"></component-demo>
<component-demo title="demo title 2"></component-demo>
<component-demo title="demo title 3"></component-demo>

结果 demo title 1 demo title 2 demo title 3
```

### 可能在 `data` 里有一个博文的数组

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'blog post title 01' },
      { id: 2, title: 'blog post title 02' },
      { id: 3, title: 'blog post title 03' },
    ],
  },
})
```

为每篇博文渲染一个组件

```html
<blog-post-demo v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"> </blog-post-demo>
```

### 可以使用 `v-bind` 来动态传递 `prop`。这在你一开始不清楚要渲染的具体内容，比如从一个 API 获取博文列表的时候，是非常有用的

### 构建一个组件时，`每个组件必须只有一个根元素`

```html
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

### 当组件需要的内容比较多时，为每个相关的信息定义一个 prop 会变得很麻烦，我们可以修改让其接受一个单独 `post` prop

```js
;<blog-post v-for="post in posts" v-bind:key="post.id" v-bind:post="post"></blog-post>

Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `,
})
```

### 通过事件向父级组件发送消息 在组件内，调用 Vue 内建的 `$emit` 方法并传入`事件的名字`，来向父级组件触发一个事件

```html
<button v-on:click="$emit('enlarge-text')">Button</button>
```

### 然后我们可以用 `v-on` 在博文组件上监听这个事件，就像监听一个原生 DOM 事件一样：

```html
<blog-post v-on:enlarge-text="postFontSize += 0.1"></blog-post>
```

### 有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值

```html
<button v-on:click="$emit('enlarge-text', 0.1)">Button</button>
```

### 然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值

```html
<blog-post v-on:enlarge-text="postFontSize += $event"></blog-post>
```

### 或者，如果这个事件处理函数是一个方法

```html
<blog-post v-on:enlarge-text="onEnlargeText"></blog-post>
```

### 那么这个值将作为第一个参数传入这个方法

```js
methods: {
  onEnlargeText: function(enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 在组件上使用 v-model <b style="color: red;">自定义事件也可以用于创建支持 v-model 的自定义输入组件</b>

```html
<custom-input v-model="searchText"></custom-input>
```

当普通使用 `v-model` 时

```html
<input v-model="searchInput" />
```

等价于

```html
<input v-bind:value="searchInput" v-on:input="searchInput = $event.target.value" />
```

当在组件上使用 `v-model` 时

```html
<custom-input v-bind:value="searchInput" v-on:input="searchInput = $event"></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须

- 将其 `value` 特性绑定在名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将其新值通过自定义的 `input` 事件抛出

```js
Vue.component('custom-input', {
  props: ['value']
  template: `
  <input
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)">
  `
})
```

### 通过插槽分发内容，可以向组件传递内容

如果直接这样向组件传递内容，是不可行的

```html
<alert-box> Something bad happend </alert-box>
```

如果要向组件传递内容需要在自定义组件添加 `<solt>` 元素

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      ...
      <solt></solt>
    </div>
  `,
})
```

### [动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

[示例](https://jsfiddle.net/chrisvfritz/o3nycadu/)

### [解析 DOM 模板时的注意事项](https://cn.vuejs.org/v2/guide/components.html#%E8%A7%A3%E6%9E%90-DOM-%E6%A8%A1%E6%9D%BF%E6%97%B6%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
