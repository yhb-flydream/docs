# Vue 开发风格指南

## 组件名应该始终是多个单词的，根组件 `App` 除外

这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的

```js
反例
Vue.component('todo', {
  // ...
})
export default {
  name: 'Todo',
  // ...
}
```

```js
好例子
Vue.component('todo-item', {
  // ...
})
export default {
  name: 'TodoItem',
  // ...
}
```

## 组件的 `data` 必须是一个函数

当 `data` 的值是一个对象时，它会在这个组件的所有实例之间共享，但是当我们重用多个组件时，就会有问题，因为每个组件都引用了同一个 data 对象，就导致数据会被同事修改，我们需要的是每个组件管理自己的数据，所以每个实例必须生成一个独立的数据对象，在 JavaScript 中，在一个函数中返回这个对象就可以了

```js
反例
Vue.component('some-comp', {
  data: {
    foo: 'bar'
  }
})
export default {
  data: {
    foo: 'bar'
  }
}
```

```js
好例子
Vue.component('some-comp', {
  data: function() {
    return {
      foo: 'bar'
    }
  }
})

// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}

// 在一个 Vue 的根实例上直接使用对象是可以的，
// 因为只存在一个这样的实例。
new Vue({
  data: {
    foo: 'bar'
  }
})
```

## `prop` 的定义应该尽量详细

细致的 prop 定义有两个好处

- 它们写明了组件的 API，所以很容易看懂组件的用法
- 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源

```js
反例
// 这样做只有开发原型系统时可以接受
props: ['status']
```

```js
好例子
props: {
  status: String
}

// 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

## 总是用 `key` 配合 `v-for`

在组件上总是必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的对象固化 (object constancy)，也是一种好的做法

```html
反例
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

```html
好例子
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

## [永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)

```html
反例
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```html
好例子
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

## 为组件样式设置作用域

对于应用来说，顶级 `APP` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的
