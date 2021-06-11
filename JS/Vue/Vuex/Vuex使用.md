# Vuex 使用

## 全局注册 `store`

```js
Vue.use(Vuex) // 使用前先调用 vuex

new Vue({
  el: '#app',
  store, // 添加到根实例中，就可在所有子组件中使用 `this.$store` 访问
  components: { App },
  template: '<App/>',
})
```

## 组件中使用 **`this.$store`**

通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    },
  },
}
```

## mapState 辅助函数？？？

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: (state) => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount
    },
  }),
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count',
])
```

## Getter（_可以认为是 `store` 的计算属性_）

就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

**`Getter` 接受 `state` 作为其第一个参数：**

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done)
    },
  },
})
```

- `Getter` 会暴露为 `store.getters` 对象，可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

- `Getter` 也可以接受其他 `getter` 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

store.getters.doneTodosCount // -> 1
```

可以很容易地在任何组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

**注意，`getter` 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的**

- 可以通过让 `getter` 返回一个函数，来实现给 `getter` 传参。在你对 `store` 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id)
  }
}

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

**注意，`getter` 在通过方法访问时，每次都会去进行调用，而不会缓存结果**

## `mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...

  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ]),
  },
}
```

如果你想将一个 `getter` 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount',
})
```

## Mutation (_类似于事件 methods_)

**更改 Vuex 的 store 中的状态的唯一方法是提交 `mutation`**

`Vuex` 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的 `事件类型 (type)` 和 一个 `回调函数 (handler)`

这个回调函数就是我们实际进行状态更改的地方，并且它会接受 `state` 作为第一个参数：

```js
const store = new Vue.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    },
  },
})
```

**不能直接调用一个 `mutation handler`。**

这个选项更像是事件注册：**当触发一个类型为 `increment` 的 `mutation` 时，调用此函数。** 要唤醒一个 mutation handler，你需要以相应的 type 调用 `store.commit` 方法：

```js
store.commit('increment')
```

- 提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 `mutation` 的 `载荷`（payload）：

```js
// ...
mutations: {
  increment(state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```

**在大多数情况下，载荷应该是一个`对象`，这样可以包含多个字段并且记录的 `mutation` 会更易读：**

```js
// ...
mutations: {
  increment: (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```

- 对象风格的提交方式

提交 `mutation` 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10,
})
```

**当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此 `handler` 保持不变：**

```js
mutations: {
  increment: (state, payload) {
    state.count += payload.amount
  }
}
```

- Mutation 需遵守 Vue 的响应规则

既然 `Vuex` 的 `store` 中的状态是响应式的，那么当我们变更状态时，监视状态的 `Vue` 组件也会自动更新。这也意味着 `Vuex` 中的 `mutation` 也需要与使用 `Vue` 一样遵守一些注意事项：

- 最好提前在你的 `store` 中初始化好所有需要的属性
- 当需要在对象上添加新属性时，你应该
  - 使用 `Vue.set(obj, 'newProp', 123)`，或者
  - 以新对象替换老对象。
    - 例如：利用的**对象展开运算符** `state.obj = { ...state.obj, newProp, 123 }`
