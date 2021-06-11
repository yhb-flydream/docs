# Angular

[TOC]

- 前端 JS 框架
- 数据交互
- 模块化
- 双向数据绑定
- 语义化标签
- 依赖注入
- 可以轻松构建 SPA（单页面应用程序）
  - 模拟 CS(客户端、服务器)结构做出的 BS(浏览器、服务器)结构的网站
  - 带有客户端的功能性（页面局部刷新的特点）

### 安装 Angular

- 1、直接从本地复制一个 angular.js 文件到项目中
- 2、通过工具安装
  - `npm install angular`
  - 通过 bower 安装
    - `bower install angular`
    - 安装 bower
      - `npm install -g bower`

### 指令

- 以 ng-开头的属性的扩展形式称之为指令

- `ng-app`告诉 angular 从这里开始管理代码，初始化一个 AngularJS 应用程序

- `ng-model` 把元素值（比如输入域的值）绑定到应用程序

  - 用于绑定应用程序数据到 HTML 控制器`(input, select, textarea)`的值
  - 将输入域的值`{{data}}`与 AngularJS 创建的变量`($scope.data)`绑定
  - **双向绑定**

- `ng-click`添加点击事件

- `ng-init`初始化一个对象值*(不常用)*

- `ng-controller`控制器

  - 控制 `AngularJS` 应用程序的数据
  - 是常规的 `JavaScript` 对象，由标准的 JavaScript 对象的构造函数 创建
  - `ng-controller` 指令定义了一个应用程序控制器。

- `ng-bind`绑定数据模型的值，**只能用于双标签**

- `ng-bind-html`用于安全的渲染 html 代码，必须和`ngSanitize`搭配使用

- `ng-cloak`用测属性的元素会被`Angular`检测并移除

- `ng-repead`用来循环数组或对象数据，使其全部展示到页面
  - `ng-repead = "item in data"`

```
<li ng-repeat="item in data">
  {{ item.xxx }}
</li>
```

- `ng-class`操作属性样式

  - `ng-class = {key1 : 样式名1, key2 : 样式名2, key3 : 样式名3}[item.item中包含key的属性]`
  - `{key1 : 布尔值, key2 : 布尔值, key3 : 布尔值}`

- `ng-hide/ng-show`显示隐藏需要一个布尔值

  - true
  - false

- `ng-if/ng-switch ng-switch-when`

#### 自定义的指令

- `directive`
  - 使用驼峰法来命名一个指令， `runoobDirective`,
  - 但在使用它时需要以 - 分割, `runoob-directive`:
  -
  - 可以通过以下方式来调用指令：
    - 元素名
    - 属性
    - 类名
    - 注释

```javascript
app.directive("runoobDirective", function() {
    return {
        template : "<h1>自定义指令!</h1>"
    };
});


//元素名
<runoob-directive></runoob-directive>

//属性
<div runoob-directive></div>

//类名
<div class="runoob-directive"></div>

//注释
<!-- directive: runoob-directive -->
var app = angular.module("myApp", []);
app.directive("runoobDirective", function() {
    return {
        restrict : "M",
        replace : true,
        template : "<h1>自定义指令!</h1>"
    };
});

//注意： 需要在该实例添加 replace 属性， 否则评论是不可见的。
//注意： 必须设置 restrict 的值为 "M" 才能通过注释来调用指令。
```

- 限制使用
- 限制你的指令只能通过特定的方式来调用
  - E 作为元素名使用
  - A 作为属性使用
  - C 作为类名使用
  - M 作为注释使用

```
var app = angular.module("myApp", []);
app.directive("runoobDirective", function() {
    return {
        restrict : "A",
        template : "<h1>自定义指令!</h1>"
    };
});

// 通过设置 restrict 属性值为 "A" 来设置指令只能通过 HTML 元素的属性来调用。
// 可以设置一个也可以设置多个"EACM"
```

- `{{}}`表示一个表达式
  - 里面不能写对象的形式`{'a':'123'}`

#### Scope(作用域)【模型】

- `$scope`
  - 是一个对象，有可用的方法和属性
  - 是应用在 HTML (视图) 和 JavaScript (控制器)之间的纽带
  - 可应用在视图和控制器上
  - 当你在 AngularJS 创建控制器时，你可以将 $scope 对象当作一个参数传递:
  - 当在控制器中添加 $scope 对象时，视图 (HTML) 可以获取了这些属性。
  - 视图中，你不需要添加 $scope 前缀, 只需要添加属性名即可，如： {{carname}}。

```
<div ng-app="myApp" ng-controller="myCtrl">
<h1>{{carname}}</h1>
</div>
<script>
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.carname = "Volvo";
});
</script>
```

#### 根作用域

- `$rootScope`
  - 所有的应用都有一个 `$rootScope`，它可以作用在 ng-app 指令包含的所有 HTML 元素中
  - `$rootScope` 可作用于整个应用中。是各个 `controller` 中 `scope` 的桥梁。用 `rootscope` 定义的值，可以在各个 `controller` 中使用

```javascript
<div ng-app="myApp" ng-controller="myCtrl">

<h1>姓氏为 {{lastname}} 家族成员:</h1>

<ul>
    <li ng-repeat="x in names">{{x}} {{lastname}}</li>
</ul>

</div>

<script>
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $rootScope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
    $rootScope.lastname = "Refsnes";
});
</script>
//  $rootScope 在循环对象内外都可以访问
```

#### 过滤器`|`

- date
  - 时间过滤器

```
<p>{{time|date:"yyyy年MM月dd日 HH:mm:ss"}}</p><!--日期   四位年份-->
<p>{{time|date:"yy年MM月dd日 HH:mm:ss"}}</p><!--日期     两位年份-->
<p>{{time|date:"YY年MM月dd日 HH:mm:ss"}}</p><!--日期     两位年份-->
```

- currency
  - 货币过滤器

```
<p>{{price|currency}}</p><!--价格         默认$符-->
<p>{{price|currency:'￥'}}</p><!--价格     人民币-->
<p>{{price|currency:'€'}}</p><!--价格     欧元-->
<p>{{price|currency:'￥':3}}</p><!--价格   小数点位数-->
```

- lowercase

  - 格式化字符串为小写

- uppercase

  - 格式化字符串为大写

- orderBy
  - 向指令添加过滤器

```
<div ng-app="myApp" ng-controller="namesCtrl">

<ul>
  <li ng-repeat="x in names | orderBy:'country'">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

<div>
```

#### 服务(Service)

- `$location`
  - 可以创建自己的服务，或使用内建服务
  - 服务是一个函数或对象
  - 有个 `$location` 服务，它可以返回当前页面的 `URL` 地址

```javascript
var app = angular.module('myApp', [])
app.controller('customersCtrl', function ($scope, $location) {
  $scope.myUrl = $location.absUrl()
})
//  $location 服务是作为一个参数传递到 controller 中。如果要使用它，需要在 controller 中定义
```

- `$http`
  - 服务向 web 服务器发送请求，应用响应服务器传送过来的数据
  - `$http`服务只是简单的封装了浏览器原生的`XMLHttpRequest`对象
  - `$http`服务是只能接受一个参数的函数，这个参数是一个对象
  - 包含了用来生成 HTTP 请求的配置内容。这个函数返回一个 promise 对象，具有 success 和 error 两个方法

> **1、链式调用**

```javascript
$http({
  url: 'data.json',
  method: 'GET',
})
  .success(function (data, header, config, status) {
    //响应成功
  })
  .error(function (data, header, config, status) {
    //处理响应失败
  })
```

---

> **2、返回一个 promise 对象**

```javascript
var promise = $http({
  method: 'GET',
  url: 'data.json',
})

// 响应返回时用then方法来处理回调
promise.then(
  function (resp) {
    //resp是一个响应对象
  },
  function (resp) {
    //带有错误信息的resp
  }
)

// 综合写法
$http({
  method: 'GET',
  url: 'data.json',
}).then(
  function (resp) {
    //resp是一个响应对象
  },
  function (resp) {
    //带有错误信息的resp
  }
)
```

---

> **示例：直接用 get 传入地址，接收数据**

```javascript
var app = angular.module('myApp', [])
app.controller('siteCtrl', function ($scope, $http) {
  $http.get('data.json').success(function (response) {
    $scope.names = response.sites
  })
})
```

- `$timeout`
  - `$timeout` 服务对应了 `JS window.setTimeout` 函数

```javascript
var app = angular.module('myApp', [])
app.controller('myCtrl', function ($scope, $timeout) {
  $scope.myHeader = 'Hello World!'
  $timeout(function () {
    $scope.myHeader = 'How are you today?'
  }, 2000)
})
```

- `$interval`
  - `$interval` 服务对应了 `JS window.setInterval` 函数

```javascript
var app = angular.module('myApp', [])
app.controller('myCtrl', function ($scope, $interval) {
  $scope.theTime = new Date().toLocaleTimeString()
  $interval(function () {
    $scope.theTime = new Date().toLocaleTimeString()
  }, 1000)
})
```

- ## 创建自定义服务

```javascript
//创建名为hexafy 的访问:
app.service('hexafy', function () {
  this.myFunc = function (x) {
    return x.toString(16)
  }
})

//使用自定义的的服务 hexafy 将一个数字转换为16进制数:
app.controller('myCtrl', function ($scope, hexafy) {
  $scope.hex = hexafy.myFunc(255)
})
```

### MVC 模式

- MVC 是三个单词的首字母缩写

  - `View（视图）`
    - 最上一层
    - 提供给用户的操作界面，是程序的外壳
  - `Controller（控制）`
    - 中间的一层
    - 它负责根据用户从"视图层"输入的指令，选取"数据层"中的数据，然后对其进行相应的操作，产生最终结果
  - `Model（模型）` - 最底下的一层(核心层) - 程序需要操作的数据或信息
    > 这三层是紧密联系在一起的，但又是互相独立的，每一层内部的变化不影响其他层。
    > 每一层都对外提供接口（Interface），供上面一层调用。
    > 这样一来，软件就可以实现模块化，修改外观或者变更数据都不用修改其他层，大大方便了维护和升级

- `ng-app`表示了 angular 管辖的范围

- 双向绑定

```
// 举例双向绑定
<input type="text" ng-model="dir"/>
<input type="text" ng-model="dir"/>
```

- 依赖注入
  - 参数由定义方决定
  - 普通函数：由调用方决定参数
  - ng-函数：由定义方决定参数
  -

angular 和 javascript 不互通

- 函数不互通
- 变量也不互通
- 事件也不互通
  angular 的开发模式和传统完全不同--只要盯住数据(数据是核心)

- angularjs 中所有能用的东西都在$scope 中，

- controller 控制器

  - 放`JS`代码
  - 桥梁

- 一个页面里有多个 module
- 一个 module 里有多个 controller

- filter 过滤器
- 语法：`|`

- `ng-src`添加图片地址

- `ng-href`

- ## `$http`
