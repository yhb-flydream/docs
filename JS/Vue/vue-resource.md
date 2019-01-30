# vue-resource

- [Vue.js——vue-resource全攻略](https://www.cnblogs.com/chenhuichao/p/8308993.html)

## 特点

- 体积小
- 支持主流浏览器（不支持IE 9以下的浏览器，其他主流的浏览器都支持）
- 支持 `Promise` 和 `URI Template`
- 支持拦截器

## 使用

- 引入 `vue-resource`

```js
<script src="https://unpkg.com/vue@2.5.22/dist/vue.js"></script>
<script src="https://unpkg.com/vue-resource@1.5.1/dist/vue-resource.min.js"></script>
```

### 基本语法

引入vue-resource后，可以基于全局的Vue对象使用http，也可以基于某个Vue实例使用http

```js
// 基于全局Vue对象使用http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```