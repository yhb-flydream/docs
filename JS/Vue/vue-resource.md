# vue-resource

[TOC]

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

在发送请求后，使用then方法来处理响应结果，then方法有两个参数：

- 第一个参数是响应成功时的回调函数
- 第二个参数是响应失败时的回调函数。

```js
// 传统写法
this.$http.get('/someUrl', [options]).then(function(response){
    // 响应成功回调
}, function(response){
    // 响应错误回调
});


// Lambda写法
this.$http.get('/someUrl', [options]).then((response) => {
    // 响应成功回调
}, (response) => {
    // 响应错误回调
});
```

### 支持的HTTP方法

- `get(url, [options])`
- `head(url, [options])`
- `delete(url, [options])`
- `jsonp(url, [options])`
- `post(url, [body], [options])`
- `put(url, [body], [options])`
- `patch(url, [body], [options])`

除了jsonp以外，另外6种的API名称是标准的HTTP方法。当服务端使用REST API时，客户端的编码风格和服务端的编码风格近乎一致，这可以减少前端和后端开发人员的沟通成本。

#### options

发送请求时的options选项对象包含以下属性：

- url
  - string
  - 请求的URL
- method
  - string
  - 请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法
- body
  - Object, FormData string
  - request body
- params
  - Object
  - 请求的URL参数对象
- headers
  - Object
  - request header
- timeout
  - number
  - 单位为毫秒的请求超时时间 (0 表示无超时时间)
- before
  - function(request)
  - 请求发送前的处理函数，类似于jQuery的beforeSend函数
- progress
  - function(event)
  - ProgressEvent回调处理函数
- credentials
  - boolean
  - 表示跨域请求时是否需要使用凭证
- emulateHTTP
  - boolea
  - 发送PUT, PATCH, DELETE请求时以HTTP POST的方式发送，并设置请求头的X-HTTP-Method-Override
    - **作用**
    - 如果Web服务器无法处理PUT, PATCH和DELETE这种REST风格的请求，你可以启用enulateHTTP现象。
    - 启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的`X-HTTP-Method-Override`属性会设置为实际的HTTP方法。
    - `Vue.http.options.emulateHTTP = true;`
- emulateJSON
  - boolean
  - 将request body以`application/x-www-form-urlencoded` content type发送
    - **作用**
    - 如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。
    - 启用该选项后，请求会以`application/x-www-form-urlencoded`作为MIME type，就像普通的HTML表单一样。
    - `Vue.http.options.emulateJSON = true;`

#### response

response对象包含以下属性和方法：

- 方法
  - text()
    - string
    - 以string形式返回response body
  - json()
    - Objec
    - 以JSON对象形式返回response body
  - blob()
    - Blob
    - 以二进制形式返回response body
- 属性
  - ok
    - boolean
    - 响应的HTTP状态码在200~299之间时，该属性为true
  - status
    - number
    - 响应的HTTP状态码
  - statusText
    - string
    - 响应的状态文本
  - headers
    - Object
    - 响应头

## CURD示例

### GET

```js
var demo = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: 'http://xxxxx'
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('gridData', response.data)
                })
                .catch(function(response) {
                    console.log(response)
                })
        }
    }
})
```

这段程序的then方法只提供了successCallback，而省略了errorCallback。

**`catch`方法用于捕捉程序的异常，catch方法和errorCallback是不同的，errorCallback只在响应失败时调用，而catch则是在整个请求到响应过程中，只要程序出错了就会被调用。**

在then方法的回调函数内，你也可以直接使用this，this仍然是指向Vue实例的：

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
        gridColumns: [{
            name: 'customerId',
            isKey: true
        }, {
            name: 'companyName'
        }, {
            name: 'contactName'
        }, {
            name: 'phone'
        }],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers',
        item: {}
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        closeDialog: function() {
            this.show = false
        },
        getCustomers: function() {
            var vm = this
            vm.$http.get(vm.apiUrl)
                .then((response) => {
                    vm.$set('gridData', response.data)
                })
        },
        createCustomer: function() {
            var vm = this
            vm.$http.post(vm.apiUrl, vm.item)
                .then((response) => {
                    vm.$set('item', {})
                    vm.getCustomers()
                })
            this.show = false
        }
    }
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

## 使用resource服务

`vue-resource`提供了另外一种方式访问HTTP——`resource服务`，resource服务包含以下几种默认的action：

- `get: {method: 'GET'},`
- `save: {method: 'POST'},`
- `query: {method: 'GET'},`
- `update: {method: 'PUT'},`
- `remove: {method: 'DELETE'},`
- `delete: {method: 'DELETE'}`

resource对象也有两种访问方式：

- 全局访问：`Vue.resource`
- 实例访问：`this.$resource`

resource可以结合URI Template一起使用，以下示例的apiUrl都设置为{/id}了：

`apiUrl: 'http://211.149.193.19:8080/api/customers{/id}'`

### GET

使用get方法发送GET请求，下面这个请求没有指定{/id}。

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

使用save方法发送POST请求，下面这个请求没有指定{/id}。

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

使用update方法发送PUT请求，下面这个请求指定了{/id}。

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
例如，`{ id: vm.item.customerId}`中的vm.item.customerId为12，那么发送的请求URL为：

`http://211.149.193.19:8080/api/customers/12`

### DELETE

使用remove或delete方法发送DELETE请求，下面这个请求指定了{/id}。

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

Vue.http.interceptors.push(function(request, next) {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next(function(response) {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})
```

在response返回给successCallback或errorCallback之前，你可以修改response中的内容，或做一些处理。
例如，响应的状态码如果是404，你可以显示友好的404界面。

### 示例

之前的CURD示例有一处用户体验不太好，用户在使用一些功能的时候如果网络较慢，画面又没有给出反馈，用户是不知道他的操作是成功还是失败的，他也不知道是否该继续等待。

通过inteceptor，我们可以为所有的请求处理加一个loading：请求发送前显示loading，接收响应后隐藏loading

```js
Vue.http.interceptors.push((request, next) => {
    loading.show = true
    next((response) => {
        loading.show = false
        return response
    });
});
```