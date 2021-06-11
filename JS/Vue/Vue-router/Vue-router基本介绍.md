# Vue-router

[TOC]

## 参考

- [vue-router 基本使用](https://www.cnblogs.com/SamWeb/p/6610733.html)

## 基本概念理解

路由中有三个基本概念

- `route` 一条路由，由 `path` 和 `component` 组成
  - `path` 路由路径
  - `component` 路由页面组件
- `routes` 一组路由
- `router` 一个机制，相当于一个管理者，它来管理路由

**客户端中的路由，实际上就是 `dom` 元素的显示和隐藏，有两种实现方式**

- 基于 hash
- 基于 html5 history api

## 安装使用

### 使用链接/CDN

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-router"></script>
```

### NPM

```js
// 下载
npm install vue-router

// 模块化工程中使用
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
```

## 基本使用

```html
<div>
  <h1>Hello Vue-Router</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to foo</router-link>
    <router-link to="/bar">Go to bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```js
// 0、如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1、定义路由组件
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2、定义路由
// 每个路由应该应设一个组件，其中 component 可以是通过 Vue.extend() 创建的组件构造器
// 或者只是一个组件配置对象
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

// 3、创建router实例，然后传入 routes 配置
const router = new VueRouter({
  routes,
})

// 4、创建和挂载根实例
// 要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router,
}).$mount('#app')
```

**`通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由：`**

```js
// Home.vue
export default {
  computed: {
    username() {
      return this.$route.params.username
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
```

该文档通篇都常使用 `router` 实例。留意一下 `this.$router` 和 `router` 使用起来完全一样。

我们使用 `this.$router` 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。

## 动态路由匹配

适用于把某种模式匹配到的所有路由

例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。

```js
const User = { template: '<div>User</div>' }

const routes = [{ path: '/user/:id', component: User }]

const router = new VueRouter({
  routes,
})
```

现在 `/user/foo` 和 `/user/bar` 都可以映射到相同的路由

可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 响应路由参数的变化

当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用。**

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 `watch` (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化做出响应
    },
  },
}
```

### 匹配优先级 【谁先定义，谁优先】

## 嵌套路由

要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      { path: 'profile', component: UserProfile },
      // 当 /user/:id/posts 匹配成功
      // UserPosts 会被渲染在 User 的 <router-view> 中
      { path: 'posts', component: UserPosts },
    ],
  },
]

const router = new VueRouter({
  routes,
})
```

**如果访问的路径不存在，或者没有匹配到合适的路由，可以添加一个空的路由**

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [{ path: '', component: UserHome }],
  },
]
```

## 编程式的导航

### router.push(location, onComplete?, onAbort?)

<b style="color:red">注意：在 Vue 实例内部，你可以通过 `$router` 访问到路由实例，因此你可以用 `this.$router.push`</b>

**想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 `history` 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。**

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是`一个字符串路径`，或者`一个描述地址的对象`。

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 } })
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
```

<b style="color:red">注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`</b>

```js
const userId = 123
router.push({ name: 'user', params: { userId } }) // /user/123
router.push({ path: `/user/${userId}` }) // /user/123

// 这里 params 不生效
router.push({ path: '/user', params: { userId } }) // /user
```

**同样的规则也适用于 `router-link` 组件的 `to` 属性。**

### router.replace(location, onComplete?, onAbort?)

跟 `router.push` **唯一的不同就是**，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

### router.go(n)

- `n` 参数是一个整数，意思是在 history 记录中向前或者后退几步，类似 `window.history.go(n)`

```js
// 在浏览器中前进一步 等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进3步
router.go(3)

// 如果history记录不够用。默认失败
router.go(-100)
router.go(100)
```

### 操作 history

## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。

可以在创建 `Router` 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User,
    },
  ],
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个`对象`：

```js
<router-link :to="{ name: 'user', params: { userId: 123 } }">User</router-link>
```

跟 `router.push()` 一样，都把路由导航到 `/user/123`

```js
router.push({ name: 'user', params: { userId: 123 } })
```

## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示

例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。

你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。

**确保正确使用 `components` 配置 (带上 s)：**

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
})
```

### 嵌套命名视图

## 重定向和别名

### 重定向 redirect

通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [{ path: '/a', redirect: '/b' }],
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [{ path: '/a', redirect: { name: 'foo' } }],
})
```

甚至一个方法，动态返回重定向目标

```js
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: (to) => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      },
    },
  ],
})
```

### 别名 alias

**`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，`URL` 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样**

```js
const router = new VueRouter({
  routes: [{ path: '/a', component: A, alias: '/b' }],
})
```

## 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 `URL` 上使用，限制了其灵活性

**使用 `props` 将组件和路由解耦：**

```js
const User = {
  template: '<div>User {{ $router.params.id }}</div>',
}

const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }],
})
```

通过 `props` 解耦

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>',
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, slidebar: false },
    },
  ],
})
```

<b style="color:red">如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。</b>

### 对象模式

如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

```js
const router = new VueRouter({
  routes: [{ path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }],
})
```

### 函数模式

可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```js
const router = new VueRouter({
  routes: [{ path: '/search', component: SearchUser, props: (route) => (query: route.query.q) }],
})
```

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件

请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。

如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

## HTML5 History 模式

`vue-router` 默认 `hash` 模式 —— 使用 `URL` 的 `hash` 来模拟一个完整的 `URL`，于是当 `URL` 改变时，页面不会重新加载

如果不想要 `hash`，我们可以用路由的 `history` 模式，这种模式充分利用 `history.pushState` API 来完成 `URL` 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 `history` 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`

### 警告

因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 `index.html` 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [{ path: '*', component: NotFoundComponent }],
})
```

## 导航守卫
