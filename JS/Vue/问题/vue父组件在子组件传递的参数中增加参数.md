# vue 父组件在子组件传递的参数中增加参数

参见[自定义事件传参问题](https://github.com/vuejs/vue/issues/5735)
参见[vue 父组件在子组件传递的参数中增加参数--2019-01-11](https://github.com/lizhongzhen11/dailyGain/issues/21)

- Child component:

```js
...
this.$emit('custom', arg1, arg2);
...
// arg1, arg2 是子组件传给父组件的参数
```

- Parent component:

```js
<child v-for="(item, index) in data" @custom="parentMethod(arguments, $1, $2)"></child>

// arguments 这里可以接收到子组件的参数 为一个数组
// $1, $2 父组件的 parentMethod 需要的参数

...
parentMethod(childArgs,  $1, $2)
...
```
