# Vue 重要点

## Vue 没有完全遵循 [MVVM模型](https://zh.wikipedia.org/wiki/MVVM)

## 如果知道晚些时候会需要一个属性，但一开始它不存在，那么最好先声明一下这个属性，并设置一些初始值

## `Object.freeze(obj)` 会阻止修改现有的属性，也就意味着相应系统无法在追踪变化

## Vue 实例包含了一些属性和方法，它们都有 `$` 前缀，以便与用户自定义属性区分

```js
var data = { a: 1 };
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // true
vm.el === document.getElementById('example'); // true

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
    a: 1
  },
  created: function() {
    console.log('a is' + this.a);
  }
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
    message: 'Hello'
  },
  // 在组件中
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

此处方法和计算属性两种方式的最终结果确实是完全相同的

**不同的是计算属性是基于它们的依赖进行缓存的**

只在相关依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数

## 计算属性 vs 侦听属性

使用 `watch`

```js
<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

使用计算属性

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function() {
      return this.firstName + '' + this.lastName
    }
  }
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
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`

## Vue 提供了一种方式来表达**这两个元素是完全独立的不要复用它们**，只需要添加一个具有唯一值的 `key 属性`即可

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
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
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

<!-- of -->
<ul id="example-2">
  <li v-for="(item, index) of items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

## `v-for` 循环数组的参数[`(item) 或 (item, index)`]

```html
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

或

<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

- item 数组的每一项
- index 数组的索引

## `v-for` 循环对象的参数[(value) 或 (value, key) 或 (value, key, index)]

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

或

<ul id="v-for-object" class="demo">
  <li v-for="(value, key) in object">
    {{ key }} --- {{ value }}
  </li>
</ul>

或

<ul id="v-for-object" class="demo">
  <li v-for="(value, key, index) in object">
    {{ index }}  {{ key }}  {{ value }}
  </li>
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

https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B