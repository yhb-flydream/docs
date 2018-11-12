# Vuex基本介绍

> 一个专为 Vue.js 应用程序开发的**状态管理模式**

每一个 Vuex 应用的核心就是 `store`（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的`状态 (state)`

## Vuex 和单纯的全局对象有以下两点不同：

- 1、**Vuex 的状态存储是响应式的**。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 2、**你不能直接改变 store 中的状态**。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

- **通过`store.state`来获取状态对象**

- **通过`store.commit`来触发状态变更**

## State

### 在 Vue 组件中获得 Vuex 状态

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态。

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

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：

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

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

`Vuex` 允许我们在 `store` 中定义`“getter”`（*可以认为是 store 的计算属性*）。

就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

**`Getter` 接受 `state` 作为其第一个参数：**

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### 通过属性访问

`Getter` 会暴露为 `store.getters` 对象，可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

`Getter` 也可以接受其他 `getter` 作为第二个参数：

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

### 通过方法访问

你也可以通过让 `getter` 返回一个函数，来实现给 `getter` 传参。在你对 `store` 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

**注意，`getter` 在通过方法访问时，每次都会去进行调用，而不会缓存结果**

`mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```js
import { mapGetters } from 'vuex';

export default {
  // ...

  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 `getter` 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

## Mutation

**更改 Vuex 的 store 中的状态的唯一方法是提交 `mutation`**

`Vuex` 中的 `mutation` 非常类似于事件：每个 `mutation` 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)

这个回调函数就是我们实际进行状态更改的地方，并且它会接受 `state` 作为第一个参数：

```js
const store = new Vue.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    }
  }
})
```

**不能直接调用一个 `mutation handler`。**

这个选项更像是事件注册：**“当触发一个类型为 increment 的 mutation 时，调用此函数。”**要唤醒一个 mutation handler，你需要以相应的 type 调用 `store.commit` 方法：

```js
store.commit('increment');
```

### 提交载荷（Payload）

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

### 对象风格的提交方式

提交 `mutation` 的另一种方式是直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
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

### Mutation 需遵守 Vue 的响应规则

既然 `Vuex` 的 `store` 中的状态是响应式的，那么当我们变更状态时，监视状态的 `Vue` 组件也会自动更新。这也意味着 `Vuex` 中的 `mutation` 也需要与使用 `Vue` 一样遵守一些注意事项：

- 最好提前在你的 `store` 中初始化好所有需要的属性
- 当需要在对象上添加新属性时，你应该
  - 使用 `Vue.set(obj, 'newProp', 123)`，或者
  - 以新对象替换老对象。
    - 例如：利用的**对象展开运算符** `state.obj = { ...state.obj, newProp, 123 }`

### 使用常量代替 Mutation 事件类型

使用常量替代 `mutation` 事件类型在各种 `Flux` 实现中是很常见的模式。这样可以使 `linter` 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 `app` 包含的 `mutation` 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex form 'vuex';
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性来命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

### Mutation 必须是同步函数

<b style="color: red;">一条重要的原则就是要记住 mutation 必须是同步函数。</b>为什么？请参考下面的例子：

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的.

### 在组件中提交 Mutation

你可以在组件中使用 `this.$store.commit('xxx')` 提交 `mutation`，或者使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需要在根节点注入 store）。

```js
import { mapMutations } from 'vuex';

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('increment', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## Action

Action 类似于 mutation，不同在于：

- Action 提交的是mutation，而不是直接变更状态
- Action 可以包含任何异步操作

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})
```

`Action` 函数接受**一个与 `store` 实例具有相同方法和属性的 `context` 对象(而不是 `store` 实例本身)**，因此你可以调用 `context.commit` 提交一个 `mutation`，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。

实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  increment({commit}) {
    commit('increment')
  }
}
```

### 分发 Action

`Action` 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
```

我们可以在 action 内部执行**异步操作**：

```js
actions: {
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('incremnt')
    }, 1000)
  }
}
```

`Actions` 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

一个更加实际的购物车示例，涉及到调用异步 `API` 和分发多重 `mutation:`

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把购物车的物品备份起来
    const saveCartItems = [...state.cart.added]
    // 发出结账请求，然后亲空购物差额
    commit(type.CHECKOUT_REQUEST)
    // 购物车 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 操作
      () => commit(types.CHECKOUT_FAILURE, savedCarItems)
    )
  }
}
```

注意我们正在进行一系列的异步操作，并且通过提交 `mutation` 来记录 `action` 产生的副作用（即状态变更）。

### 在组件中分发 Action

你在组件中使用 `this.$store.dispatch('xxx')` 分发 `action`，或者使用 `mapActions` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex';

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将`this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incremntBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

### 结合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，要明白 `store.dispatch` 可以处理被触发的action的处理函数返回的`Promise`，并且 `store.dispatch` 仍旧返回 `Promise`:

```js
actions: {
  actionA({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})

// ------------------------

actionB({ dispatch, commit }) {
  return dispatch('actionA').then(() => {
    commit('someOtherMutation')
  })
}
```

利用 `async / await` 我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

**一个 `store.dispatch` 在不同模块中可以触发多个 `action` 函数。在这种情况下，只有当所有触发函数完成后，返回的 `Promise` 才会执行**

## Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿。

为了解决以上问题，`Vuex` 允许我们将 `store` 分割成模块（module）。每个模块拥有自己的 `state、mutation、action、getter、甚至是嵌套子模块`——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 模块的局部状态

对于模块内部的 `mutation` 和 `getter`，接收的第一个参数是模块的局部状态对象。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment(state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 `action`，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`:

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 `getter`，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

### 命名空间

默认情况下，模块内部的 `action、mutation 和 getter` 是注册在全局命名空间的————这样使得多个模块能够对同一 `mutation` 或 `action` 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter、action 及 mutation` 都会自动根据模块注册的路径调整命名。例如：

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaces: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: { ... },
          getters: {
            popular () { ... } // -> getter['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 `getter 和 action` 会收到局部化的 `getter，dispatch 和 commit`。

换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。

#### 在带命名空间的模块内访问全局内容（Global Assets）

如果你希望使用全局 `state 和 getter，rootState 和 rootGetter` 会作为第三和第四参数传入 `getter`，也会通过 `context` 对象的属性传入 `action`。

若需要在全局命名空间内分发 `action` 或提交 `mutation`，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGettert'
        rootGetters.someOtherGetter // -> 'someOtherGettert'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中，dispatch 和 commit 也被局部化了
      someAction ({ dispatch, commit, getters, rootgetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutatation'
        commit('someMutation', null, { root: true }) // -> someMutation
      },

    }
  }
}
```

https://vuex.vuejs.org/zh/guide/modules.html