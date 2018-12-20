# Vue mixins(混入)

一种分发 `Vue` 组件中**可复用功能**的非常灵活的方式

**混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。**

```js
// 定义一个混入对象
var myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var Component = new Component();
```

## 选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合

比如，数据对象在内部会进行浅合并（一层属性深度），在和组件的数据发生冲突时以组件数据优先。

```js
var mimin = {
  data() {
    return {
      message: 'mimin hello',
      foo: 'mixin foo'
    }
  }
}

new Vue({
  mixins: [mixin],
  data() {
    return {
      message: 'component hello',
      bar: 'component bar'
    }
  },
  created() {
    console.log(this.$data) // => { message: 'component hello', foo: 'mixin foo', bar: 'component bar' }
  }
})
```

同名钩子函数将混合为一个数组，因此都将被调用。

另外，混入对象的钩子将在组件自身钩子之前调用。

```js
var mixin = {
  created() {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created() {
    console.log('组件钩子被调用');
  }
})

// 混入对象的钩子被调用
// 租建钩子被调用
```

值为对象的选项，例如 `methods, components 和 directives`，将被混合为同一个对象。

两个对象键名冲突时，取组件对象的键值对。

```js
var mixin = {
  methods: {
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar() {
      console.log('bar')
    },
    conflicting() {
      console.log('from self')
    }
  }
})

vm.foo() // foo
vm.bar() // bar
vm.conflicting() // from self
```

**`Vue.extend()` 也使用同样的策略进行合并**

## 全局混入

也可以全局注册混入对象。

注意使用！ 一旦使用全局混入对象，将会影响到 **所有** 之后创建的 `Vue` 实例。

使用恰当时，可以为自定义对象注入处理逻辑。

```js
Vue.mixin({
  created() {
    var myOption = this.$options.myOptions
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello'
})

// hello
```

---
谨慎使用全局混入对象，因为会影响到每个单独创建的 Vue 实例 (包括第三方模板)。

大多数情况下，只应当应用于自定义选项，就像上面示例一样。也可以将其用作 `Plugins` 以避免产生重复应用

---

## 自定义选项合并策略

自定义选项将使用默认策略，即简单地覆盖已有值。

如果想让自定义选项以自定义逻辑合并，可以向`Vue.config.optionMergeStrateGies`添加一个函数：

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVla) {
  // return mergedVal
}
```

对于大多数对象选项，可以使用`methods`的合并策略：

```js
var strategies = Vue.config.optionMergeStrategies
strategies.myOption = strategies.methods
```