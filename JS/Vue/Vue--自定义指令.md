# Vue 自定义指令

**`autofocus` 在移动版 Safari 上不工作**

现在用自定义指令来实现这个功能

- 注册一个全局指令 `v-focus`

```js
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  },
})
```

- 注册局部指令，组件中也可以接受一个 `directive` 选项：

```js
directive: {
  focus: {
    inserted(el) {
      el.focus()
    }
  }
}
```

然后可以在模板中任何元素上使用新的`v-focus`属性 `<input v-focus>`

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind` 知道用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted` 被绑定元素插入父亲节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
- `update` 所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前。**指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)
- `componentUpdated` 指令所在组件的 VNode**及其子 VNode**全部更新后调用
- `unbind` 只调用一次，指令与元素解绑时调用

## 钩子函数参数

- `el` 指令所绑定的元素，可以用来直接操作 DOM
- `binding` 一个对象，包含以下属性：
  - `name` 指令名，不包括`v-`前缀
  - `value` 指令绑定值，例如： `v-my-directive="1 + 1"` 中，绑定值为 2
  - `oldValue` 指令绑定的前一个值，仅在`update`和`componentUpdated`钩子中可用。无论值是否改变都可用
  - `expression` 字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
  - `arg` 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
  - `modifiers` 一个包含修饰符的对象。例如 `v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
- `vnode` Vue 编译生成的虚拟节点。
- `oldVnode` 上一个虚拟节点，仅在`update`和`componentUpdated`钩子中可用

**除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 `dataset` 来进行**

如下例子：

```html
<div id="hook-arguments-exaple" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: ' +
      s(binding.name) +
      '<br>' +
      'value: ' +
      s(binding.value) +
      '<br>' +
      'expression: ' +
      s(binding.expression) +
      '<br>' +
      'argument: ' +
      s(binding.arg) +
      '<br>' +
      'modifiers: ' +
      s(binding.modifiers) +
      '<br>' +
      'vnode keys: ' +
      Object.keys(vnode).join(', ')
  },
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!',
  },
})
```

## 简写函数

在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

## 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。

**指令函数能够接受所有合法的 JavaScript 表达式。**

```js
;<div v-demo="{ color: 'white', text: 'hello!' }"></div>

Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // white
  console.log(binding.value.text) // hello!
})
```
