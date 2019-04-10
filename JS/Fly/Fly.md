# Axios

> 一个支持所有JavaScript运行环境的基于Promise的、支持请求转发、强大的http请求库。

- [Fly github](https://github.com/wendux/fly)
- [Fly 中文说明](https://wendux.github.io/dist/#/doc/flyio/readme)

## 简介

目前Fly.js支持的平台包括：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器，这些平台的 JavaScript 运行时都是不同的

- 提供统一的 Promise API
- 浏览器环境下，轻量且非常轻量
- 支持多种JavaScript 运行环境
- 支持请求／响应拦截器
- 自动转换 JSON 数据
- 支持切换底层 Http Engine，可轻松适配各种运行环境
- 浏览器端支持全局Ajax拦截
- H5页面内嵌到原生 APP 中时，支持将 http 请求转发到 Native。支持直接请求图片

## 安装

```bash
npm install flyio

或

bower install flyio

或 使用 CDN

<script src="https://unpkg.com/flyio/dist/fly.min.js"></script>
<script src="https://unpkg.com/flyio/dist/umd/fly.umd.min.js"></script>
```

## 不同平台引入flyio

### 浏览器、Node、React Native中引入

```js
var fly = require("flyio")
```

上面方式引入的是Fly的默认实例（浏览器、Node、React Native中相同），你也可以自己创建Fly实例：

```js
// 浏览器和React Native
var Fly = require("flyio/dist/npm/fly")
// Node 入口
// var Fly=require("flyio/src/node")
var fly = new Fly;
```

### 在微信小程序中引入

```js
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly
```

如果微信小程序项目没有使用npm来管理依赖，需要下载源码到小程序工程，[wx.js](https://github.com/wendux/fly/tree/master/dist/npm/wx.js) 或 [wx.umd.min.js](https://github.com/wendux/fly/tree/master/dist/umd/wx.umd.min.js) .下载任意一个，保存到本地工程目录，假设在“lib”目录，接下来引入：

```js
var Fly = require("../lib/wx") //wx.js为您下载的源码文件
var fly = new Fly; //创建fly实例
```

### 快应用中引入

快应用中Fly依赖 fetch模块，需要先在 `manifest.json` 中添加引用：

```js
"features": [
  ...
  {"name": "system.fetch"}
]
```

然后创建fly实例

```js
// 依赖快应用中的fetch模块，需要在
var fetch = require("@system.fetch")
var Fly = require("flyio/dist/npm/hap")
var fly = new Fly(fetch)
```

### Weex中引入

```js
var Fly = require("flyio/dist/npm/weex")
var fly = new Fly
```

## 简单使用

### `GET` 请求

```js
var fly=require("flyio")

// 参数直接写在url中
fly.get('/user?id=133')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

或

// query参数通过对象传递
fly.get('/user', {
    id: 133
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### `POST` 请求

```js
fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 多个并发请求

```js
function getUserName() {
  return fly.get('user/name');
}

function getUserAge() {
  return fly.get('user/age');
}

fly.all([getUserName(), getUserAge()])
  .then(fly.spread(function(acct, perms) {
    // 两个请求现在都执行完成
  }))
  .catch(function(error){
    console.log(error)
  })
```

### 直接通过 request 接口发起请求

```js
// 直接调用request函数发起post请求
fly.request("/test",{hh:5},{
  method:"post",
  timeout:5000 // 超时设置为5s
 })
.then(d=>{ console.log("request result:",d)})
.catch((e) => console.log("error", e))
```

### 发送 URLSearchParams

```js
const params = new URLSearchParams();
params.append('a', 1);
fly.post("",params)
.then(d=>{ console.log("request result:",d)})
```

**注：Node环境不存在`URLSearchParams`。各个浏览器对`URLSearchParams`的支持程度也不同，使用时务必注意**

### 发送 FormData

```js
var formData = new FormData();
var log = console.log
formData.append('username', 'Chris');
fly.post("../package.json", formData).then(log).catch(log)
```

**注：Fly目前只在支持 `FormData` 的浏览器环境中运行，node环境下对 formData 的支持方式稍有不同，详情查看[Node 下增强的API] **

### 请求二进制数据

```js
fly.get("/Fly/v.png", null, {
  responseType:"arraybuffer"
}).then(d => {
  // d.data 为ArrayBuffer实例
})
```

## 拦截器

Fly支持请求／响应拦截器，可以通过它在请求发起之前和收到响应数据之后做一些预处理

```js
// 添加请求拦截器
fly.interceptors.request.use(function(config) {
  // 在发送请求前 do something
  // 给所有请求添加自定义header
  config.headers["X-Tag"] = "flyio";
  // 打印出请求体
  console.log(config.body)
  // 可以显式返回 config, 也可以不返回，没有返回值时拦截器中默认返回config
  return config;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(function(res) {
  // 对响应数据 do something
  return res;
}, function(error) {
  // 对响应错误 do something
  return Promise.reject(error);
});
```

- 请求拦截器中的config对象结构如下：

```js
{
  baseURL,  // 请求的基地址
  body, // 请求的参数
  headers, // 自定义的请求头
  method, // 请求方法
  timeout, // 本次请求的超时时间
  url, // 本次请求的地址
  withCredentials // 跨域请求是否发送第三方cookie
}
```

- 响应拦截器中的config对象结构如下：

```js
{
  data, // 服务器返回的数据
  engine, // 请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
  headers, // 响应头信息
  request  // 本次响应对应的请求信息
}
```

#### 移除拦截器

如果你想移除拦截器，只需要将拦截器设为null即可：

```js
fly.interceptors.request.use(null)
fly.interceptors.response.use(null,null)
```

## 错误处理

请求失败之后，catch 捕获到的 err 为一个对象，它的字段如下:

```js
{
  message: "Not Find 404", // 错误消息
  status: 404, // 如果服务器可通，则为http请求状态码。网络异常时为0，网络超时为1
  request: {...}, // 对应的请求信息
  response: {}, // 响应信息
  engine: {} // 请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
}
```

- 错误码

|错误码|含义|
|---|---|
|0|网络错误|
|1|请求超时|
|2|文件下载成功，但保存失败，此错误只出现node环境下|
|>=200|http请求状态码|

```js
axios.get('user/name').catch(function(error) {
  console.log('Error', error.message);
  console.log('Error engine:', error.engine)
  // The request was made but no response was received
  // `error.request` holds the request info.
  console.log('Error request info:', error.request);
  if (error.response) {
    // 请求已发送，但服务器响应的状态码不在 `2xx` 范围内
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.statusText);
    console.log(error.response.headers);
  } else {
    // 在设置触发错误的请求时发生了一些事情
    console.log('Error', error.message);
  }
  console.log(error.config);
});
```

## 请求配置选项

可配置选项：

```js
{
  headers: {}, // http请求头，
  baseURL: "", // 请求基地址
  timeout: 0,// 超时时间，为0时则无超时限制
  // 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
  parseJson: true,
  withCredentials: false // 跨域时是否发送cookie
}
```

配置支持实例级配置和单次请求配置

### 实例级配置

实例级配置可用于当前Fly实例发起的所有请求

```js
// 定义公共headers
fly.config.headers = {xx: 5, bb: 6, dd: 7}
// 设置超时
fly.config.timeout = 10000;
// 设置请求基地址
fly.config.baseURL = "https://wendux.github.io/"
```

### 单次请求配置

需要对单次请求配置时，配置只对当次请求有效。

```js
fly.request("/test",{hh:5},{
  method:"post",
  timeout:5000 //超时设置为5s
})
```

**注：若单次配置和实例配置冲突，则会优先使用单次请求配置**

### API

- `fly.get(url, data, options)`

发起 get 请求，url请求地址，data为请求数据，在浏览器环境下类型可以是:

```txt
String|Json|Object|Array|Blob|ArrayBuffer|FormData
```

options 为请求配置项

- `fly.post(url, data, options)`

发起post请求，参数含义同 `fly.get`

- `fly.request(url, data, options)`

发起请求，参数含义同上，在使用此API时需要指定 options 的 method：

```js
//GET请求
fly.request("/user/8" null, {method:"get"})
//DELETE 请求
fly.request("/user/8/delete", null, {method:"delete"})
//PUT请求
fly.request("/user/register", {name:"doris"}, {method:"PUT"})
```

request 适合在 RESTful API 的场景下使用，为了方便使用，fly提供了响应的别名方法

- 别名方法
  - `fly.put(url, data, options)`
  - `fly.delete(url,data,options)`
  - `fly.patch(url,data,options)`
  - `fly.all([])`
  - `fly.spread([])`

发起多个并发请求，参数是一个 **`promise` 数组**；当所有请求都成功后才会调用then，只要有一个失败，就会调catch

## 使用 `application/x-www-form-urlencoded` 编码

Fly默认会将 JavaScript objects 序列化为 JSON 发送（RequestBody），如果想以 `application/x-www-form-urlencoded` 编码格式发送，你可以使用如下方式：

### 浏览器

在浏览器中，可以使用 `URLSearchParams`:

```js
var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
fly.post('/foo', params);
```

**注意，现在不是所有浏览器都支持 `URLSearchParams` (参考 [caniuse.com](caniuse.com)), 但是有一个 [polyfill](https://github.com/WebReflection/url-search-params) 可用 (确保polyfill为全局变量).**

另一种方法，你可以使用 qs 库:

```js
var qs = require('qs');
fly.post('/foo', qs.stringify({ 'bar': 123 }));
```

### Node.js

在node中，你可以使用 `querystring` 模块，如:

```js
var querystring = require('querystring');
fly.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

仍然可以使用 qs 库.

## Promises

Fly 依赖 ES6 Promise. 如果你的环境不支持 ES6 Promises, 你需要 [polyfill](https://github.com/jakearchibald/es6-promise).

## TypeScript

Fly 提供了 TypeScript 描述文件.你可以在TypeScript中方便使用：

```ts
import fly from 'flyio';
fly.get('/user?ID=12345');
```

## 创建Fly实例

为方便使用，在引入flyio库之后，会创建一个默认实例，一般情况下大多数请求都是通过默认实例发出的，但在一些场景中需要多个实例（可能使用不同的配置请求），这时你可以手动new一个：

```js
// npm、node环境下
var Fly = require("flyio/dist/npm/fly") // 注意！此时引入的是 "flyio/dist/npm/fly"
var nFly = new Fly();

// CDN引入时直接new
var nFly=new Fly();
```

## Http Engine

## 通过传参配置请求

- `axios(options)` 或 `axiso(url [, options])`

```js
axios({
  method: 'post',
  url: 'user/name',
  data: {
    id: 1111
  }
});

或

axios('user/name', {
  method: 'post',
  data: {
    id: 1111
  }
})
```

## 通过别名请求方法

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

**在使用别名时，`url、method、data` 属性都不必在配置中指定**

## 并发请求

- `axios.all(iterable)`
- `axios.spread(callback)`

## 创建实例

可以使用自定义配置新建一个 `axios` 实例

- `axios.create([config])`

```js
let instance = axios.create({
  baseURL: 'https://www.demo.com/api/',
  temeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});
```

## 实例方法

以下是可用的实例方法。指定的配置将与实例的配置合并

- `axios#request(config)`
- `axios#get(url[, config])`
- `axios#delete(url[, config])`
- `axios#head(url[, config])`
- `axios#post(url[, data[, config]])`
- `axios#put(url[, data[, config]])`
- `axios#patch(url[, data[, config]])`

## 请求配置

这些是创建请求时可以用的配置选项。

只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

```js
{
  // url 用于请求服务器的 url
  url: 'user/name',

  // method 请求方式
  method: 'get', // 默认是 get

  // baseURL 将自动加载 url 前面，除非 url 是一个绝对 URL
  // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://www.demo.com/api/',

  // transformREquest 允许在向服务器发送请求前，修改修请求数据
  // 只能用在 'PUT', 'POST', 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或者 ArrayBuffer， 或 Stream
  transformRequest: [function(data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // transformResponse 在传递给 then/catch 前，允许修改吸纳供应数据
  transformResponse: [function(data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // headers 是即将被发送的自定义请求头
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  // params 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象（plain object）或 URLSearchParams 对象
  params： {
    ID: 12345
  },

  // paramsSerializer 是一个负责 params 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.juqery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // data 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 'PATCH'
  // 在没有设置 transformRequest 时，必须是以下类型之一
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'firstname'
  },

  // timeout 指定请求超时时的毫秒数（0 表示无超时时间）
  // 如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: 1000,

  // withCredentials 表示跨域请求是否需要使用凭证
  withCredentials: false, // 默认为 false

  // adapter 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应
  adapter: function(config) {
    /*  */
  },

  // auth 表示应该使用 HTTP 基础验证，并提供凭证
  // 这将设置一个 Authorization 头，覆写掉现有的任意使用 headers 设置的自定义 Authorization 头
  auth: {
    username: 'username',
    password: 'possword'
  },

  // responseType 表示服务器响应的数据类型，可以是 arraybuffer, blob, document, json, text, stream
  responseType: 'json', // 默认为 json

  // xsrfCookieName 是用作 xsrf token 的值的 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // xsrfHeaderName 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN'

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 响应结构

```js
{
  // data 有服务器提供的响应数据
  data: {},

  // status 来自服务器的响应的 HTTP 状态码
  status: 200,

  // statusText 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // header 服务器响应的头
  headers: {},

  // config 是为请求提供的配置信息
  config: {}
}
```

使用 `then` 时，你将接收下面这样的响应：

```js
axios.get('user/name')
  .then(function(res) {
    console.log(res.data);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers);
    console.log(res.config);
  })
```

在使用 `catch` 时，或传递 `rejection callback` 作为 `then` 的第二个参数时，响应可以通过 `error` 对象可被使用

## 配置的默认值

### 全局的 `axios` 默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### 自定义实例默认值

```js
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: ''
});

// 在实例已经创建后修改默认值
instance.defaults.headers.common['Auth'] = AUTH_TOKEN;
```

### 配置的优先顺序

配置会以一个优先顺序进行合并。

这个顺序是：在 `lib/defaults.js` 找到的库的默认值，然后是实例的 `defaults` 属性，最后是请求的 `config` 参数。

后者将优先于前者。这里是一个例子：

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```

## 取消

使用 `cancel/token` 取消请求

> Axios 的 cancel token API 基于cancelable promises proposal，它还处于第一阶段。

可以使用 `CancelToken.source` 工厂方法创建 `cancel token`，像这样：

```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 `executor` 函数到 `CancelToken` 的构造函数来创建 `cancel token`：

```js
var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

**可以使用同一个 `cancel token` 取消多个请求**

## 使用 `application/x-www-form-urlencoded` 格式数据

默认情况下，`axios` 将JavaScript对象序列化为JSON。

要以 `application / x-www-form-urlencoded` 格式发送数据，您可以使用以下选项之一。

### 浏览器

- 可以使用 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) API

```js
cosnt params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

**并非所有浏览器都支持 `URLSearchParams` (查看[caniuse.com](http://www.caniuse.com/#feat=urlsearchparams)了解)，但可以使用 [polyfill](https://github.com/WebReflection/url-search-params)（确保为全局环境变量）**

- 使用 `qs` 库对数据进行编码

```js
cosnt qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

- 或者使用 `ES6`

```js
import qs from 'qs';
cosnt data = { 'bar': 123 };
cosnt options = {
  methods: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### Node.js

可以用 `querystring` 模块，也可以使用 `qs` 模块

```js
cosnt querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

## Demo

```js
import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 5000
});

service.interceptors.request.use(config => {
  // Do something before request
  return config;
}, error => {
  // Do something with request error
  console.log(error);
});

service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code === 200) {

  }
})
```