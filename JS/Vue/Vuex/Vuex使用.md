# Vuex 使用

- 全局注册 `store`

```js
Vue.use(Vuex); // 使用前先调用

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
```

- 组件中使用 **`this.$store`**

通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```