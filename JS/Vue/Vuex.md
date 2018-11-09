# Vuex

> 一个专为 Vue.js 应用程序开发的**状态管理模式**

每一个 Vuex 应用的核心就是 `store`（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的`状态 (state)`

## Vuex 和单纯的全局对象有以下两点不同：

- 1、**Vuex 的状态存储是响应式的**。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 2、**你不能直接改变 store 中的状态**。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

**通过`store.state`来获取状态对象**

**通过`store.commit`来触发状态变更**

## State

### 在 Vue 组件中获得 Vuex 状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态，然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：

```js
const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
  template: '<div id="app"><counter></counter></div>'
})
```

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 **`this.$store`** 访问到。让我们更新下 Counter 的实现：

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

### `mapState` 辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
import { mapState } from 'Vuex';

export default {
  computed: mapState({
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 this 获取局部状态，必须使用常规函数
    countPlusLoacalState(state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

### 对象展开运算符

**`mapState` 函数返回的是一个对象。**我们如何将它与局部计算属性混合使用呢？通常我们需要使用一个工具函数将多个对象合并成一个，以使我们可以将最终对象传给 `computed` 属性。但自从有个**对象扩展运算符**，就可以极大地简化写法

```js
computed: {
  localComputed() {},
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### 组件仍然保有局部状态

使用Vuex并不意味着你需要将所用状态放到Vuex。虽然将所有状态放到Vuex会使状态变化显示和易于调用，但也会使代码变得冗长不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。

## Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

```js
computed: {
  doneTodesCount() {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

https://vuex.vuejs.org/zh/guide/getters.html

https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8