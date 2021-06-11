# Vue

> [官网](https://cn.vuejs.org/v2/guide/)

[TOC]

## Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：

```js
var vm = new Vue({
  // 选项对象
})
```

vm 为 Vue 实例

当创建一个 Vue 实例时，你可以传入一个**选项对象**。使用这些选项可以创建你想要的行为

一个 Vue 应用由一个通过 `new Vue` 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成

**所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)**

### v-model

- 双向绑定

```html
<input type="text" v-model="demo" />
<p>{{demo}}</p>
```

- `v-model.lazy`懒加载，当 input 框失去焦点时才去同步改变
- `v-model.number`内容必须是数字，有其他字符不进行数据绑定（当内容开头为非数字，则按一般情况处理）
- `v-model.trim`内容前后有空格会自动去除，中间无效

### v-text

### v-html

### v-bind（简写：）

- 可以绑定 html 标签的任何一个属性
- 示例：

```html
<a href="#" v-html="msg" v-bind:title="tip" v-bind:pid="id"></a>
// 省略简写
<a href="#" v-html="msg" :title="tip" :pid="id"></a>
```

### v-if/v-else

```html
<h1 v-if="isShow">isShow 为true时现实{{message}}</h1>
<h1 v-else>isShow 为false时不显示!</h1>
```

绑定一 个 boolean 值，如果为 true 输出，如果为 false 则不输出

### v-show

`<span v-show="isOK" v-text="msg"></span>`

- 绑定一个 boolean 值，如果为 true 显示，如果为 false 则不显示 display:none

### v-for

- 遍历

```html
//第一种写法
<ul>
  <li v-for="item in names">
    {{item}}
    <span v-text="item"></span>
  </li>
</ul>

//第二种写法 设置唯一标示
<ul>
  <li v-for="(item,index) in names" :key="index">
    {{index}} {{item}}
    <span v-text="item"></span>
  </li>
</ul>

//第三种写法 遍历对象 :key="item.id"
<ul>
  <li v-for="(item,key,index) in user" :key="index">{{index}} {{key}} {{item}}</li>
</ul>
```

### v-on

- 注册事件

  - `<button v-on:click="btnClick">`显示或隐藏`</button>`

- 简写
  - `<button @click="btnClick">` 显示或隐藏 `</button>`

```js
//script中添加执行的方法
export default {
  data() {
    return {
      msg: '<b>Hello Vue</b>',
      tip: '这是一个提示',
      isOK: false,
    }
  },
  methods: {
    btnClick() {
      this.isOK = !this.isOK
    },
  },
}
```

## 指令的两个缩写

- `v-on:click --> @click`
- `v-bind:id --> :id`

## 组件

- 子组件的基本使用

```html
<my-item></my-item> //注意：component中的data要返回function Vue.component('my-item', { data() { return { count: 0 } }, template: '
<li @click="count += 1">{{count}}</li>
' }) var app = new Vue({ el: '#app', data: { msg: 'world' } })
```

- 控制组件的范围（父组件给子组件传值）

```html
<my-item v-bind:test="msg"></my-item>

var app = new Vue({ el: '#app', data: { msg: 'hello' }, components: { 'my-item': { props: ['test'], template: '
<p>{{test}}</p>
' } } });
```

- 子组件通知父组件

```html
<my-item :count="count" @increate="increateDemo"></my-item>

Vue.component('my-item', { data() { return {} }, props: ['count'], template: '
<div @click="divClick">count: {{count}}</div>
', methods: { divClick() { this.$emit('increate', '子组件传来的值'); } } }) var app = new Vue({ el: '#app', data: { count: 0 }, methods: {
increateDemo(c) { console.log(c); } } });
```

- 加载.vue 的子组件（需要配置好 webpack）

```
import App from './07-vue.vue' //加载.vue组件

new Vue({
    el: '#app', //将组件中的内容插入到页面中指定的元素
    render: c => c(App) //编译app.vue组件
})
```

## 过滤器

- 私有过滤器

```
<div id="app">
    <span>
      {{msg | toLower | replace('l','x')}}
    </span>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue'
      },
      filters: {
         toLower: function(input) {
          return input.toLowerCase();
        },
        replace: function(input, old, newValue) {
          var r = new RegExp(old, 'g');
          return input.replace(r, newValue);
        }
      }
    })
  </script>
```

- 全局过滤器

```
<div id="app">
    <span>
      {{msg | toLower | replace('l','n')}}
    </span>
  </div>
  <script>
    Vue.filter('toLower', function(input) {
      return input.toLowerCase();
    })

    Vue.filter('replace', function(input, old, newValue) {
      var r = new RegExp(old, 'g');
      return input.replace(r, newValue);
    })

    var app = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue'
      }
    })
```

## 路由

- `vue-router`组件
- `https://router.vuejs.org/zh-cn/`

- 示例

```
<div id="app">
  <!-- <a href="#/index">首页</a> -->
    <router-link to="/index">首页</router-link>
    <router-link to="/login">登录</router-link>
    <!-- a 和router-link 作用相同 -->
    <br>

    <router-view></router-view>
  </div>

  <script>
    var index =  Vue.component('index', {
      template: '<div>这是首页</div>'
    })
    var login = Vue.component('login', {
      template: '<div>这是登录</div>'
    })
    var router = new VueRouter({
      routes: [
        {name:'index', path: '/index', component: index},
        {name:'login', path: '/login', component: login}
      ]
    })
    var vm = new Vue({
      el: '#app',
      router: router
    })
```

- 获取路由参数

```
<div id="app">
    <router-link to="/index/laozhao">首页</router-link>
    <router-link to="/login">登录</router-link>

    <br>

    <router-view></router-view>
  </div>

  <script>
    var index =  Vue.component('index', {
      template: '<div>这是首页, {{username}}</div>',
      data: function() {
        return {
          username: ''
        }
      },
      created: function() {
        this.username = this.$route.params.username;
      }
    })
    var login = Vue.component('login', {
      template: '<div>这是登录</div>'
    })
    var router = new VueRouter({
      routes: [
        {name:'index', path: '/index/:username', component: index},
        {name:'login', path: '/login', component: login}
      ]
    })
    var vm = new Vue({
      el: '#app',
      router: router
    })
```

## 发送 ajax 请求-vue-resource

https://github.com/pagekit/vue-resource

- **发送`get`请求**

```
<div id="app">
    <button @click="getdata">按钮</button>
    <ul>
      <li v-for="item in menus">{{item.title}}</li>
    </ul>
  </div>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        menus: []
      },
      methods: {
         getdata() {
           this.$http.get('http://127.0.0.1:8899/api/getmenus').then(function( res) {
             this.menus = res.body.message;
           })
         }
      }
    });
```

- **发送`post`请求**

```
<div id="app">
    <button @click="senddata">按钮</button>

  </div>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        menus: []
      },
      methods: {
         senddata() {
           this.$http.post('http://127.0.0.1:8899/api/postcomment/43', {content: 'wokao'},{emulateJSON:true}).then(function( res) {
             console.log(res.body)
           })
         }
      }
    });
  </script>
```

### 库和框架

- 库
  - 用时须调用
- 框架
  - 自动完成

#### 目录结构

- `dist`
  - 发布内容文件
- `src`
  - 开发源代码`（.js文件）`
- `statics`
  - 外部静态资源
  - `css、fonts、js、images`
