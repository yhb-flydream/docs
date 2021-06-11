# vue-resource

[TOC]

- [Vue.js——vue-resource 全攻略](https://www.cnblogs.com/chenhuichao/p/8308993.html)
- [Vue_VueResource](https://segmentfault.com/a/1190000007087934)

## 特点

- 体积小
- 支持主流浏览器（不支持 IE 9 以下的浏览器，其他主流的浏览器都支持）
- 支持 `Promise` 和 `URI Template`
- 支持拦截器

## 使用

- 引入 `vue-resource`

```js
<script src="https://unpkg.com/vue@2.5.22/dist/vue.js"></script>
<script src="https://unpkg.com/vue-resource@1.5.1/dist/vue-resource.min.js"></script>
```

### 配置

分为：

- 全局配置
- 组件实例配置
- 调用配置

这三部分的优先级依次增高，优先级高的配置会覆盖优先级低的配置

- 全局配置

```js
Vue.http.options.root = '/root'
```

- 组件实例时配置

在实例化组件时可以传入 http 选项来进行配置

```js
new Vue({
  http: {
    root: '/root',
    headers: {
      Authorization: '',
    },
  },
})
```

- 调用时配置

在调用 vue-resource 请求方法是传入选项对象。

```js
new Vue({
  ready: function () {
    // get 请求
    this.$http.get({ url: '', headers: { Authorization: '' } }).then(
      () => {
        // 请求成功回调
      },
      () => {
        // 请求失败回调
      }
    )
  },
})
```

### headers 配置

通过 headers 属性来配置请求头。除了参数配置 headers 属性可以设置请求头外，在 vue-resource 中也提供了全局默认的 headers 配置

- `put`
  - `{'Content-Type': 'application/json'}`
- `post`
  - `{'Content-Type': 'application/json'}`
- `common`
  - `{'Accept': 'application/json,text/plain', */*}`
- `custom`
  - `{'X-Requested-With': 'XMLHttpRequest'}`
- `patch`
  - `{'Content-Type': 'application/json'}`
- `delete`
  - `{'Content-Type': 'application/json'}`

`Vue.http.headers`键值可以是 HTTP 方法名，common，custom，三种类型。

这三种类型的配置会进行合并，**优先级从低到高依次是 common,custom,HTTP 方法名**

其中:

- common 对应的请求头会在所有请求中设置
- custom 对应的请求头在非跨域时设置
- HTTP 方法名对应的请求头只有在请求的 method 匹配方法名时才会被设置

### 基本语法

引入 vue-resource 后，可以基于全局的 Vue 对象使用 http，也可以基于某个 Vue 实例(通过`this.$http`)使用 http

```js
// 基于全局Vue对象使用http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback)
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback)

// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback)
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback)

new Vue({
  ready: function () {
    // POST请求
    this.$http({
      url: '',
      method: 'POST',
      // 请求体重发送的数据
      data: {
        cat: 1,
      },
      // 设置请求头
      headers: {
        'Content-Type': 'x-www-from-urlencoded',
      },
    }).then(
      function () {
        // 请求成功回调
      },
      function () {
        // 请求失败回调
      }
    )
  },
})
```

在发送请求后，使用 then 方法来处理响应结果，then 方法有两个参数：

- 第一个参数是响应成功时的回调函数
- 第二个参数是响应失败时的回调函数。

```js
// 传统写法
this.$http.get('/someUrl', [options]).then(
  function (response) {
    // 响应成功回调
  },
  function (response) {
    // 响应错误回调
  }
)

// Lambda写法
this.$http.get('/someUrl', [options]).then(
  (response) => {
    // 响应成功回调
  },
  (response) => {
    // 响应错误回调
  }
)
```

### 支持的 HTTP 方法

- `get(url, [data], [options])`
- `head(url, [data], [options])`
- `delete(url, [data], [options])`
- `jsonp(url, [data], [options])`
- `post(url, [data], [body], [options])`
- `put(url, [data], [body], [options])`
- `patch(url, [data], [body], [options])`

除了 jsonp 以外，另外 6 种的 API 名称是标准的 HTTP 方法。当服务端使用 REST API 时，客户端的编码风格和服务端的编码风格近乎一致，这可以减少前端和后端开发人员的沟通成本。

#### options

发送请求时的 options 选项对象包含以下属性：

- url
  - string
  - 请求的 URL
- method
  - string
  - 请求的 HTTP 方法，例如：'GET', 'POST'或其他 HTTP 方法
- body
  - Object, FormData string
  - request body
- data
  - Object 或 string
  - 默认值为: `''`
  - 需要发送给服务端的数据
  - data 属性的值对 method 为 POST，PUT，DElETE 等请求会作为请求体来传送，对于 GET，JSONP 等方式的请求将会拼接在 URL 查询参数中。
- params
  - Object
  - 默认值为：`{}`
  - 用来替换 url 中的模板变量，模板变量中未匹配到的属性添加在 URL 地址后边作为查询参数

```js
Vue.http({
  url: 'http://example.com/{book}',
  params: {
    book: 'vue',
    cat: 1,
  },
})
```

最终 url 为：`http//example.com/vue?cat=1`

- headers
  - Object
  - 默认值为: `{}`
  - 设置 HTTP 请求头
- timeout
  - number
  - 单位为毫秒的请求超时时间 (0 表示无超时时间)
- before
  - function(request)
  - 请求发送前的处理函数，类似于 jQuery 的 beforeSend 函数
- progress
  - function(event)
  - ProgressEvent 回调处理函数
- credentials
  - boolean
  - 表示跨域请求时是否需要使用凭证
- emulateHTTP
  - boolea
  - 发送 PUT, PATCH, DELETE 请求时以 HTTP POST 的方式发送，并设置请求头的 X-HTTP-Method-Override
    - **作用**
    - 如果 Web 服务器无法处理 PUT, PATCH 和 DELETE 这种 REST 风格的请求，你可以启用 enulateHTTP 现象。
    - 启用该选项后，请求会以普通的 POST 方法发出，并且 HTTP 头信息的`X-HTTP-Method-Override`属性会设置为实际的 HTTP 方法。
    - `Vue.http.options.emulateHTTP = true;`
- emulateJSON
  - boolean
  - 将 request body 以`application/x-www-form-urlencoded` content type 发送
    - **作用**
    - 如果 Web 服务器无法处理编码为 application/json 的请求，你可以启用 emulateJSON 选项。
    - 启用该选项后，请求会以`application/x-www-form-urlencoded`作为 MIME type，就像普通的 HTML 表单一样。
    - `Vue.http.options.emulateJSON = true;`
- crossOrigin
  - boolean
  - 默认值为：null
  - 表示是否跨域，如果没有设置该属性，vue-resource 内部会判断浏览器当前 URL 和请求 URL 是否跨域
  - 如果最终 crossOrigin 为 true 并且浏览器不支持 CORS，即不支持 XMLHttpRequest2 时，则会使用 XDomainRequest 来请求。
  - 目前 XDomainRequest 只有 IE8，IE9 浏览器支持用来进行 AJAX 跨域

```js
if (request.crossOrgin === null) {
  request.corssOrigin = corssOrigin(request)
}
if (request.corssOrigin) {
  if (!xhrCors) {
    request.client = xdrClient
  }
  request.enumlateHTTP = false
}
```

#### response

response 对象包含以下属性和方法：

- 方法
  - text()
    - string
    - 以 string 形式返回 response body
  - json()
    - Objec
    - 以 JSON 对象形式返回 response body
  - blob()
    - Blob
    - 以二进制形式返回 response body
- 属性
  - ok
    - boolean
    - 响应的 HTTP 状态码在 200~299 之间时，该属性为 true
  - status
    - number
    - 响应的 HTTP 状态码
  - statusText
    - string
    - 响应的状态文本
  - headers
    - Object
    - 响应头

## CURD 示例

### GET

```js
var demo = new Vue({
  el: '#app',
  data: {
    gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
    gridData: [],
    apiUrl: 'http://xxxxx',
  },
  ready: function () {
    this.getCustomers()
  },
  methods: {
    getCustomers: function () {
      this.$http
        .get(this.apiUrl)
        .then((response) => {
          this.$set('gridData', response.data)
        })
        .catch(function (response) {
          console.log(response)
        })
    },
  },
})
```

这段程序的 then 方法只提供了 successCallback，而省略了 errorCallback。

**`catch`方法用于捕捉程序的异常，catch 方法和 errorCallback 是不同的，errorCallback 只在响应失败时调用，而 catch 则是在整个请求到响应过程中，只要程序出错了就会被调用。**

在 then 方法的回调函数内，你也可以直接使用 this，this 仍然是指向 Vue 实例的：

```js
getCustomers: function() {
  this.$http.get(this.apiUrl)
    .then((response) => {
      this.$set('gridData', response.data)
    })
    .catch(function(response) {
      console.log(response)
    })
}
```

**为了减少作用域链的搜索，建议使用一个局部变量(`_this`或`that`)来接收`this`。**

### JSONP

```js
getCustomers: function() {
    this.$http.jsonp(this.apiUrl).then(function(response){
        this.$set('gridData', response.data)
    })
}
```

### POST

```js
var demo = new Vue({
  el: '#app',
  data: {
    show: false,
    gridColumns: [
      {
        name: 'customerId',
        isKey: true,
      },
      {
        name: 'companyName',
      },
      {
        name: 'contactName',
      },
      {
        name: 'phone',
      },
    ],
    gridData: [],
    apiUrl: 'http://211.149.193.19:8080/api/customers',
    item: {},
  },
  ready: function () {
    this.getCustomers()
  },
  methods: {
    closeDialog: function () {
      this.show = false
    },
    getCustomers: function () {
      var vm = this
      vm.$http.get(vm.apiUrl).then((response) => {
        vm.$set('gridData', response.data)
      })
    },
    createCustomer: function () {
      var vm = this
      vm.$http.post(vm.apiUrl, vm.item).then((response) => {
        vm.$set('item', {})
        vm.getCustomers()
      })
      this.show = false
    },
  },
})
```

### PUT

```js
updateCustomer: function() {
  var vm = this
  vm.$http.put(this.apiUrl + '/' + vm.item.customerId, vm.item)
    .then((response) => {
      vm.getCustomers()
    })
}
```

### Delete

```js
deleteCustomer: function(customer){
    var vm = this
    vm.$http.delete(this.apiUrl + '/' + customer.customerId)
        .then((response) => {
            vm.getCustomers()
        })
}
```

## 使用 resource 服务

`vue-resource`提供了另外一种方式访问 HTTP——`resource服务`，resource 服务包含以下几种默认的 action：

- `get: {method: 'GET'},`
- `save: {method: 'POST'},`
- `query: {method: 'GET'},`
- `update: {method: 'PUT'},`
- `remove: {method: 'DELETE'},`
- `delete: {method: 'DELETE'}`

resource 对象也有两种访问方式：

- 全局访问：`Vue.resource`
- 实例访问：`this.$resource`

```js
resource(url, [params], [actions], [options])
```

- url
  - string
  - 请求地址，可以包含占位符，会被 parms 对象中的同名属性的值替换

```js
this.$resource('/books/{cat}', { cat: 1 })
// 解析的URL为：/books/1
```

- params
  - Object
  - 参数对象，可用来提供 url 中的占位符，多出来的属性拼接 url 的查询参数
- actions
  - Object
  - 可以用来对已有的 action 进行配置，也可以用来定义新的 action
  - 默认的 aciton 配置如下：

```js
Resource.actions = {
  get: { method: 'GET' },
  save: { method: 'POST' },
  query: { method: 'GET' },
  update: { method: 'PUT' },
  remove: { method: 'delete' },
  delete: { method: 'DELETE' },
}
```

**修改默认值`action`配置**

```js
this.$resource(
  '/books/{cat}',
  {
    cat: 1,
  },
  {
    charge: {
      method: 'POST',
      params: {
        charge: true,
      },
    },
  }
)
```

actions 对象中的单个 action 如 charge 对象可以包含 options 中的所有属性，且有限即高于 options 对象

- opions
  - Object

resource 可以结合 URI Template 一起使用，以下示例的 apiUrl 都设置为{/id}了：

`apiUrl: 'http://211.149.193.19:8080/api/customers{/id}'`

### GET

使用 get 方法发送 GET 请求，下面这个请求没有指定{/id}。

```js
getCustomers: function() {
    var resource = this.$resource(this.apiUrl)
        vm = this
    resource.get()
        .then((response) => {
            vm.$set('gridData', response.data)
        })
        .catch(function(response) {
            console.log(response)
        })
}
```

### POST

使用 save 方法发送 POST 请求，下面这个请求没有指定{/id}。

```js
createCustomer: function() {
    var resource = this.$resource(this.apiUrl)
        vm = this
    resource.save(vm.apiUrl, vm.item)
        .then((response) => {
            vm.$set('item', {})
            vm.getCustomers()
        })
    this.show = false
}
```

### PUT

使用 update 方法发送 PUT 请求，下面这个请求指定了{/id}。

```js
updateCustomer: function() {
    var resource = this.$resource(this.apiUrl)
        vm = this

    resource.update({ id: vm.item.customerId}, vm.item)
        .then((response) => {
            vm.getCustomers()
        })
}
```

`{/id}`相当于一个占位符，当传入实际的参数时该占位符会被替换。
例如，`{ id: vm.item.customerId}`中的 vm.item.customerId 为 12，那么发送的请求 URL 为：

`http://211.149.193.19:8080/api/customers/12`

### DELETE

使用 remove 或 delete 方法发送 DELETE 请求，下面这个请求指定了{/id}。

```js
deleteCustomer: function(customer){
    var resource = this.$resource(this.apiUrl)
        vm = this
    resource.remove({ id: customer.customerId})
        .then((response) => {
            vm.getCustomers()
        })
}
```

## 使用 inteceptor (拦截器)

拦截器可以在请求发送前和发送请求后做一些处理

### 基本用法

```js
Vue.http.interceptors.push((request, next) => {
  // ...
  // 请求发送前的处理逻辑
  // ...
  next((response) => {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
})

// 或

Vue.http.interceptors.push(function (request, next) {
  // ...
  // 请求发送前的处理逻辑
  // ...
  next(function (response) {
    // ...
    // 请求发送后的处理逻辑
    // ...
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
})
```

```js
Vue.http.interceptors.push({
  request: function (request) {
    // 更改请求类型为POST
    request.method = 'POST'
    return request
  },
  response: function (response) {
    // 修改返回数据
    response.data = [
      {
        custom: 'custom',
      },
    ]
    return response
  },
})

// 或

Vue.http.interceptors.push(function () {
  return {
    request: function (request) {
      return request
    },
    response: function (response) {
      return response
    },
  }
})
```

在 response 返回给 successCallback 或 errorCallback 之前，你可以修改 response 中的内容，或做一些处理。
例如，响应的状态码如果是 404，你可以显示友好的 404 界面。

### 示例

之前的 CURD 示例有一处用户体验不太好，用户在使用一些功能的时候如果网络较慢，画面又没有给出反馈，用户是不知道他的操作是成功还是失败的，他也不知道是否该继续等待。

通过 inteceptor，我们可以为所有的请求处理加一个 loading：请求发送前显示 loading，接收响应后隐藏 loading

```js
Vue.http.interceptors.push((request, next) => {
  loading.show = true
  next((response) => {
    loading.show = false
    return response
  })
})
```
