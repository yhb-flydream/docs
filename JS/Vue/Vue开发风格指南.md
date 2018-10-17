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