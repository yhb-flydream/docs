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
    foo: 'bar',
  },
})
export default {
  data: {
    foo: 'bar',
  },
}
```

```js
好例子
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar',
    }
  },
})

// In a .vue file
export default {
  data() {
    return {
      foo: 'bar',
    }
  },
}

// 在一个 Vue 的根实例上直接使用对象是可以的，
// 因为只存在一个这样的实例。
new Vue({
  data: {
    foo: 'bar',
  },
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
  <li v-for="todo in todos">{{ todo.text }}</li>
</ul>
```

```html
好例子
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

## [永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)

```html
反例
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">{{ user.name }}</li>
</ul>
<ul>
  <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">{{ user.name }}</li>
</ul>
```

```html
好例子
<ul>
  <li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
</ul>
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">{{ user.name }}</li>
</ul>
```

## 为组件样式设置作用域，不一定要使用 `scoped` 特性。设置作用域也可以通过 `CSS Modules`，那是一个基于 class 的类似 BEM(Block Element Modifier 块元素修饰符) 的策略(`yhb-body-wrap`)

对于应用来说，顶级 `APP` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的

**对于组件库，我们应该更倾向于选用基于 `class` 的策略而不是 `scoped` 特性，这让覆写内部样式更容易：使用了常人可理解的 `class` 名称且没有太高的选择器优先级，而且不太会导致冲突**

```html
反例
<template>
  <button class="btn btn-close">X</button>
</template>

<style>
  .btn-close {
    background-color: red;
  }
</style>
```

```html
好例子
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }

  .button-close {
    background-color: red;
  }
</style>
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
  .button {
    border: none;
    border-radius: 2px;
  }

  .buttonClose {
    background-color: red;
  }
</style>
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
  .c-Button {
    border: none;
    border-radius: 2px;
  }

  .c-Button--close {
    background-color: red;
  }
</style>
```

## 私有属性名 在插件、混入等扩展中始终为自定义的私有属性使用 `$_` 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 `$_yourPluginName_`)

`Vue` 使用 `_` 前缀来定义其自身的私有属性，所以使用相同的前缀 (比如 `_update`) 有覆写实例属性的风险。即便你检查确认 `Vue` 当前版本没有用到这个属性名，也不能保证和将来的版本没有冲突。

对于 `$` 前缀来说，其在 `Vue` 生态系统中的目的是暴露给用户的一个特殊的实例属性，所以把它用于私有属性并不合适。

不过，我们推荐把这两个前缀结合为 `$_`，作为一个用户定义的私有属性的约定，以确保不会和 `Vue` 自身相冲突

```js
反例
var myGreatMixin = {
  // ...
  methods: {
    update: function () {
      // ...
    },
  },
}
var myGreatMixin = {
  // ...
  methods: {
    _update: function () {
      // ...
    },
  },
}
var myGreatMixin = {
  // ...
  methods: {
    $update: function () {
      // ...
    },
  },
}
var myGreatMixin = {
  // ...
  methods: {
    $_update: function () {
      // ...
    },
  },
}
```

```js
好例子
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    },
  },
}
```

## 只要有能够拼接文件的构建系统，就把每个组件单独分成文件

```js
反例
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```

```json
好例子
components/
|- TodoList.js
|- TodoItem.js

components/
|- TodoList.vue
|- TodoItem.vue
```

## 单文件组件的文件名应该要么始终是单词大写开头 (`PascalCase`)，要么始终是横线连接 (`kebab-case`)

```html
反例 components/ |- mycomponent.vue components/ |- myComponent.vue
```

```html
好例子 components/ |- MyComponent.vue components/ |- my-component.vue
```

## 基础组件名 应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 `Base`、`App` 或 `V` [更多](https://cn.vuejs.org/v2/style-guide/#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E5%90%8D-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

```html
反例 components/ |- MyButton.vue |- VueTable.vue |- Icon.vue
```

```html
好例子 components/ |- BaseButton.vue |- BaseTable.vue |- BaseIcon.vue components/ |- AppButton.vue |- AppTable.vue |- AppIcon.vue components/ |-
VButton.vue |- VTable.vue |- VIcon.vue
```

## 只应该拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性

这不意味着组件只可用于一个单页面，而是**每个页面只使用一次**。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次

```html
反例 components/ |- Heading.vue |- MySidebar.vue
```

```html
好例子 components/ |- TheHeading.vue |- TheSidebar.vue
```

## 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起

```html
反例 components/ |- TodoList.vue |- TodoItem.vue |- TodoButton.vue components/ |- SearchSidebar.vue |- NavigationForSearchSidebar.vue
```

```html
好例子 components/ |- TodoList.vue |- TodoListItem.vue |- TodoListItemButton.vue components/ |- SearchSidebar.vue |- SearchSidebarNavigation.vue
```

## 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾[更多](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E5%90%8D%E4%B8%AD%E7%9A%84%E5%8D%95%E8%AF%8D%E9%A1%BA%E5%BA%8F-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

```html
反例 components/ |- ClearSearchButton.vue |- ExcludeFromSearchInput.vue |- LaunchOnStartupCheckbox.vue |- RunSearchButton.vue |- SearchInput.vue |-
TermsCheckbox.vue
```

```html
好例子 components/ |- SearchButtonClear.vue |- SearchButtonRun.vue |- SearchInputQuery.vue |- SearchInputExcludeGlob.vue |- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

## 在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做[更多](https://cn.vuejs.org/v2/style-guide/#%E8%87%AA%E9%97%AD%E5%90%88%E7%BB%84%E4%BB%B6-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

```html
反例
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent></MyComponent>
<!-- 在 DOM 模板中 -->
<my-component />
```

```html
好例子
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent />
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

## 对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该总是 `PascalCase` 的——但是在 DOM 模板中总是 `kebab-case` 的[更多](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

```html
反例
<!-- 在单文件组件和字符串模板中 -->
<mycomponent />
<!-- 在单文件组件和字符串模板中 -->
<myComponent />
<!-- 在 DOM 模板中 -->
<MyComponent></MyComponent>
```

```html
好例子
<!-- 在单文件组件和字符串模板中 -->
<MyComponent />
<!-- 在 DOM 模板中 -->
<my-component></my-component>
或者

<!-- 在所有地方 -->
<my-component></my-component>
```

## JS/JSX 中的组件名应该始终是 `PascalCase` 的，尽管在较为简单的应用中只使用 `Vue.component` 进行全局组件注册时，可以使用 `kebab-case` 字符串

在 JavaScript 中，PascalCase 是类和构造函数 (本质上任何可以产生多份不同实例的东西) 的命名约定。Vue 组件也有多份实例，所以同样使用 PascalCase 是有意义的。额外的好处是，在 JSX (和模板) 里使用 PascalCase 使得代码的读者更容易分辨 Vue 组件和 HTML 元素。

然而，对于只通过 Vue.component 定义全局组件的应用来说，我们推荐 kebab-case 作为替代。原因是:

- 全局组件很少被 JavaScript 引用，所以遵守 JavaScript 的命名约定意义不大
- 这些应用往往包含许多 DOM 内的模板，这种情况下是必须使用 `kebab-case` 的

```js
反例
Vue.component('myComponent', {
  // ...
})

import myComponent from './MyComponent.vue'
export default {
  name: 'myComponent',
  // ...
}

export default {
  name: 'my-component',
  // ...
}
```

```js
好例子
Vue.component('MyComponent', {
  // ...
})

Vue.component('my-component', {
  // ...
})

import MyComponent from './MyComponent.vue'
export default {
  name: 'MyComponent',
  // ...
}
```

## 组件名应该倾向于完整单词而不是缩写

```html
反例 components/ |- SdSettings.vue |- UProfOpts.vue
```

```html
好例子 components/ |- StudentDashboardSettings.vue |- UserProfileOptions.vue
```

## 在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板和 JSX 中应该始终使用 `kebab-case`

```html
反例 props: { 'greeting-text': String } <WelcomeMessage greetingText="hi" />
```

```html
好例子 props: { greetingText: String } <WelcomeMessage greeting-text="hi" />
```

## 多个特性的元素应该分多行撰写，每个特性一行

```html
反例
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />
<MyComponent foo="a" bar="b" baz="c" />
```

```html
好例子
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" />
<MyComponent foo="a" bar="b" baz="c" />
```

## 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法

```js
反例
{
  {
    fullName
      .split(' ')
      .map(function (word) {
        return word[0].toUpperCase() + word.slice(1)
      })
      .join(' ')
  }
}
```

```js
好例子
<!-- 在模板中 -->
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

## 应该把复杂计算属性分割为尽可能多的更简单的属性

```js
反例
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

```js
好例子
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

## 非空 HTML 特性值应该始终带引号 (单引号或双引号，选你 JS 里不用的那个)

```html
反例
<input type="text" />
<AppSidebar :style={width:sidebarWidth+'px'}>
```

```html
好例子
<input type="text" />
<AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```

## 指令缩写 (用 `:` 表示 `v-bind:` 和用 `@` 表示 `v-on:`) 应该要么都用要么都不用

```html
反例
<input v-bind:value="newTodoText" :placeholder="newTodoInstructions" />
<input v-on:input="onInput" @focus="onFocus" />
```

```html
好例子
<input :value="newTodoText" :placeholder="newTodoInstructions" />
<input v-bind:value="newTodoText" v-bind:placeholder="newTodoInstructions" />
<input @input="onInput" @focus="onFocus" />
<input v-on:input="onInput" v-on:focus="onFocus" />
```

## [组件/实例的选项应该有统一的顺序](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90)

## [元素 (包括组件) 的特性应该有统一的顺序](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90)

## 组件/实例的选项中的空行

```js
好例子
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue: function () {
    // ...
  },

  inputClasses: function () {
    // ...
  }
}


// 没有空行在组件易于阅读和导航时也没问题。
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue: function () {
    // ...
  },
  inputClasses: function () {
    // ...
  }
}
```

## 单文件组件应该总是让 `<script>、<template> 和 <style>` 标签的顺序保持一致。且 _`<style>` 要放在最后_，因为另外两个标签至少要有一个

```html
反例
<style>
  /* ... */
</style>
<script>
  /* ... */
</script>
<template>...</template>
<!-- ComponentA.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>
```

```html
好例子
<!-- ComponentA.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<script>
  /* ... */
</script>
<template>...</template>
<style>
  /* ... */
</style>
<!-- ComponentA.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>
  /* ... */
</script>
<style>
  /* ... */
</style>
```

## 如果一组 `v-if + v-else` 的元素类型相同，最好使用 `key` (比如两个 `<div>` 元素)

```html
反例
<div v-if="error">错误：{{ error }}</div>
<div v-else>{{ results }}</div>
```

```html
好例子
<div v-if="error" key="search-status">错误：{{ error }}</div>
<div v-else key="search-results">{{ results }}</div>

<p v-if="error">错误：{{ error }}</p>
<div v-else>{{ results }}</div>
```

## 元素选择器应该避免在 `scoped` 中出现，在 `scoped` 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的

```html
反例
<template>
  <button>X</button>
</template>

<style scoped>
  button {
    background-color: red;
  }
</style>
```

```html
好例子
<template>
  <button class="btn btn-close">X</button>
</template>

<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```

## 应该优先通过 `prop` 和事件进行父子组件之间的通信，而不是 `this.$parent` 或改变 `prop`

**一个理想的 `Vue` 应用是 `prop` 向下传递，事件向上传递的**。

遵循这一约定会让你的组件更易于理解。然而，在一些边界情况下 `prop` 的变更或 `this.$parent` 能够简化两个深度耦合的组件。

问题在于，这种做法在很多简单的场景下可能会更方便。但请当心，不要为了一时方便 (少写代码) 而牺牲数据流向的简洁性 (易于理解)

```js
反例
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  template: '<input v-model="todo.text">',
})

Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeTodo() {
      var vm = this
      vm.$parent.todos = vm.$parent.todos.filter(function (todo) {
        return todo.id !== vm.todo.id
      })
    },
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        X
      </button>
    </span>
  `,
})
```

```js
好例子
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `,
})

Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        X
      </button>
    </span>
  `,
})
```

## 应该优先通过 `Vuex` 管理全局状态，而不是通过 `this.$root` 或一个全局事件总线

```js
反例
// main.js
new Vue({
  data: {
    todos: [],
  },
  created: function () {
    this.$on('remove-todo', this.removeTodo)
  },
  methods: {
    removeTodo: function (todo) {
      var todoIdToRemove = todo.id
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== todoIdToRemove
      })
    },
  },
})
```

```js
好例子
// store/modules/todos.js
export default {
  state: {
    list: []
  },
  mutations: {
    REMOVE_TODO (state, todoId) {
      state.list = state.list.filter(todo => todo.id !== todoId)
    }
  },
  actions: {
    removeTodo ({ commit, state }, todo) {
      commit('REMOVE_TODO', todo.id)
    }
  }
}
<!-- TodoItem.vue -->
<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo(todo)">
      X
    </button>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: mapActions(['removeTodo'])
}
</script>
```
