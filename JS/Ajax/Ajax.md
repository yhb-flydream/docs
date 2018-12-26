# Ajax

[TOC]

## 软件的基本架构

**CS架构**

- Client(客户端)
- Server(服务器)

**BS架构**`软件都是基于浏览器的`

- Browser(浏览器)
- Server(服务器)

**区别**

- BS:基于浏览器的  （升级方便，所有的页面都是从服务端去获取，性能比较低）
- CS: (都必须有一个安装包，升级不方便,性能比较高)
- **1．硬件环境不同:**
  - C/S 一般建立在专用的网络上, 小范围里的网络环境, 局域网之间再通过专门服务器提供连 接和数据交换服务.
  - B/S 建立在广域网之上的, 不必是专门的网络硬件环境,例与电话上网, 租用设备. 信息自己管理. 有比C/S更强的适应范围, 一般只要有操作系统和浏览器就行
- **2．对安全要求不同**
  - C/S 一般面向相对固定的用户群, 对信息安全的控制能力很强. 一般高度机密的信息系统采用C/S 结构适宜. 可以通过B/S发布部分可公开信息.
  - B/S 建立在广域网之上, 对安全的控制能力相对弱, 可能面向不可知的用户。
- **3．软件重用不同**
  - C/S 程序可以不可避免的整体性考虑, 构件的重用性不如在B/S要求下的构件的重用性好.
  - B/S 对的多重结构,要求构件相对独立的功能. 能够相对较好的重用.就入买来的餐桌可以再 利用,而不是做在墙上的石头桌子
- **4．系统维护不同**
  - C/S 程序由于整体性, 必须整体考察, 处理出现的问题以及系统升级. 升级难. 可能是再做一个全新的系统
  - B/S 构件组成,方面构件个别的更换,实现系统的无缝升级. 系统维护开销减到最小.用户从网上自己下载安装就可以实现升级.

**不管什么样的架构：所有的软件都需要有一个客户端，一个服务端**

## 客户端

**具有向服务器索取服务能力的终端**

- 常见的客户端软件：浏览器、QQ、迅雷、Foxmail等。
- 以浏览器为宿主环境，结合 HTML、CSS、Javascript等技术，而进行的一系列开发，通常称之为前端开发。

## 服务端

**首先必须明确，服务器是一个软件，装在一台计算的系统里面**

- 1：接收用户请求
- 2：对请求进行处理
- 3：给用户一个响应

**能对外提供服务的一台超级计算机（计算机，配置要高一些）**

> 假设我的这台超级计算机安装了一个操作系统，能对外提供服务，必须安装对应的 服务器应用软件才能对外提供服务
> 我安装了web 服务器对应的软件，我就可以对外提供web 服务

**分类：**

- **按照操作系统来分**
  - Linux服务器系统
  - Windows服务器系统等

- **按服务类型可分为**
  - 文件服务器，
  - 数据库服务器，
  - 邮件服务器,
  - Web 服务器 （对外提供web 服务）
    - 1：接收客户端的请求
    - 2：对客户端的请求的进行处理
    - 3: 还需要给客户端一个响应，响应一个html 页面。
    - **常见的web 服务器软件**
      - Apache服务器 它是一个软件，提供web 服务的软件
      - Nginx 服务器、IIS服务器、Tomcat服务器、Node服务器等

- **按应用软件可分为**
  - Apache服务器
  - Nginx 服务器
  - IIS服务器
  - Tomcat服务器
  - Node服务器等

## 网络基础

> 客户端与服务端之间要进行数据交互，进行数据交互的，数据交互走网络

- **ip 地址**
  - 在网络里面的计算的一个唯一标识，我们可以通过ip定位到一台计算机.
  - 查看本机IP地址 ping、ipconfig、ifconfig
  - 局域网ip
    - 局域网（Local Area Network，LAN）是指在某一区域内由多台计算机互联成的计算机组
    - 这个ip是32位地址 计算机里面都是二进制
    - 例：192.168.38.79
  - 公网ip
    - 如果是公网ip 的话，我现在只要我可以上网，我就可以访问到公网ip 对应的计算机
    - 以后我们的计算假设需要有一个公网ip，我是需要从电信申请的，需要备案的
  - **重点: 通过ip 地址可以找到对应的计算机**

- **域名**
  - 由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址，域名是一个IP地址的“面具”
  - 通过域名访问，方便记忆
  - 我们可以通过ip 访问，ping 可以找到域名的对应ip 地址（在CMD里）
  - 例：ping www.baidu.com

- **DNS（domain Name  System） 域名解析系统**
  - 它记录了域名与ip 的映射关系.例：www.baidu.com  ------> 119.75.217.109
  - 查找优先级：
    - 本机hosts文件、然后是DNS服务器
  - 在浏览器输入一个地址后，浏览器它帮我们发送一个请求给dns 服务器，dns 服务器去里面找一个映射关系
    - 找到了映射关系：找到映射关系，肯定就会有对应的ip，然后去访问这个ip 对应的计算机。
    - 没有找到映射关系：直接无法访问.

- **端口**
  - 端口号是计算机与外界通讯交流的出口，每个端口对应不同的服务
  - 常见端口号 80、8080、3306、21、22

> 假设我是一台计算机，我要对外提供服务器，我就需要安装对应的 应用软件。
> 这个应用软件要对外提供服务器，必须是占用一个端口对外提供服务。
> 我可以在一台计算机上面安装多个应用软件，只要端口不一样就可以。
> wamp 的软件，这个软件要对外提供服务器，web 服务器，到时候肯定是默认占用80端口。
> 假设有其它的软件，占用了80 端口，启动这个软件就失败.

## 资源的分类

**静态资源**

- 可以直接通过浏览器打开的
- html,js,css,2.jpg 我们把这些资源叫做静态资源

**动态资源**

- 我们去访问一个服务器上面的动态资源php，服务器需要把动态资源转换成静态资源然后响应给客户端浏览器
- .php , jsp  ,asp

**防止乱码：`header("Content-Type:text/html;charset=utf-8[或gbk]");`**

## PHP

**避免使用中文目录和中文文件名**

- **php 是在服务器端就运行的语言，js，html，css 是在客户端运行的语言**
- php 适合于做一些小型的web 网站，论坛，博客
- jsp 适合应用于做一些大型的系统：银行，企业办公系统，证劵系统
- **php 比 jsp 要快一些**

```php
/** 文件以.php后缀结尾所有程序包含在 **/
<?php
    /** 这里是代码 **/
?>

<?php
  /** 上面定义的变量，这里可以使用，可以在一个php文件里定义多个<?php?> **/
?>
```

**输出语句**

- `echo '';`输出简单数据类型，如字符串、数值
- `print_r()`输出复杂数据类型，如数组
- `var_dump()`输出详细信息，如对象、数组（了解）

```php
$array1=array("weidandan","luowanghua","zhangjie");

print_r($array1);
Array ( [0] => weidandan [1] => luowanghua [2] => zhangjie )

var_dump($array1);
array
  0 => string 'weidandan' (length=9)
  1 => string 'luowanghua' (length=10)
  2 => string 'zhangjie' (length=8)
```

**变量**

- 1、变量以`$开头` 字母/数字/下划线 `不能以数字开头`
- 2、大小写敏感（区分大小写）

**数据类型**

- 字符串
- 整型
- 布尔型
  - `$flag=false;  echo $flag;`
  - //输出1，1代表true ，false 没有任何输出
- 浮点型
- 数组

```php
1、普通数组(索引数组)
`$array=array("zhangsan","lisi","wangwu");`

遍历数组 用  for
for($i=0;$i<$count($array);$i++){
       echo $array[$i];
}

/*--------------------------------------*/
关联数组
$array=array("username"=>"zhangsan","age"=>11);

2、遍历数组   foreach

foreach($array as $key=>$val){

}
```

- 对象
- NULL

**函数**

```php
function sayHello($username="zhangsan"){
     echo "123".$username;
}
sayHello();
// 输出：123zhuangsan
```

- 常见函数
  - `count()`   统计数组的长度
  - `in_array()`   判断数组当中是否存在某个元素，返回true/false
  - `array_key_exists`  判断数组当中是否存在某个key
  - `file_get_contents` 读取文件的内容，文件的内容转换成字符串

**连字符`.`Javascript中为`+`号**

## 客户端跟服务端交互交互的目的就是为了进行数据传递

**客户端**

- 客户端给服务器发送请求，我们可以通过三种方式进行发送
  - 1：我们是直接在浏览器地址输入一个地址，回车就发送请求了
  - 2：在页面上面点击一个超链接也是发送请求。
  - 3：通过表单进行提交
  - **常见提交方式**
    - `get`
      - 1:我们是直接在浏览器地址输入一个地址，回车就发送请求了 默认就是get 方式提交，不可以更改
      - 2:在页面上面点击一个超链接，默认也是get 方式提交，不能修改
      - 例:`12get.php?username=zhangsan&age=11`
    - `post`
      - 可以是表单提交
      - 表单提交我们可以进行设置，可以是get ，也可以是post

**服务端**

- 1：接收客户端的请求
  - `$_GET`
  - `$_POST`
- 2：对客户端的请求进行处理 （对数据进行处理）
  - 获取到 数据，对请求进行处理
  - 一般我们在这里写逻辑，if， else ，for
- 3：给客户端一个响应
  - 响应就是要向客户端浏览器输出
  - 动态输出:  `echo`

**获得时间**

- `echo time();`
- **格式化事件**
  - `date("Y-m-d h:i:s", time())`
    - `Y` 四位年份
    - `y`两位年份
- **将一个字符串转换成时间戳**
  - `echo strtoitme("")`

## 上传文件（客户端向服务器端传递数据）

**文件上传对客户端的要求**

- 1: 必须是表单提交
- 2：我必须有一个input 选项  它的类型是`file`
- 3：我必须是post 方式提交
- 4：必须设置在表单上面的`<form>`标签里设置一个属性 `< form   enctype="multipart/form-data";>`

**文件上传在服务端怎么去获取数据**

- 服务器去获取客户端的数据，
- 假设客户端是以get 方式提交的数据 我就是用`$_GET`
- 假设客户端是以post 方式提交的数据，我就是用`$_POST`
- 假设客户端的数据是文件上传上传，我就是用  `$_FILES`

## HTTP协议

> w3c的规定，要求，按照要求去做
> 规定的客户端与服务器进行通讯的数据格式

### 客户端发送给服务器的数据  (请求的数据格式)

- 我假设在客户端浏览器发送一个http 请求，客户端浏览器会自动帮我封装数据格式，然后发送给服务器
- **请求的数据格式分为四部分**【方式get、post】
  - 1、请求首行
  - 2、请求头
  - 3、请求空行
  - 4、请求体

```
GET方式提交：
  1：请求首行
  GET /day08/mycode/02array.html HTTP/1.1
  2：请求头 (请求头的名称，请求头的值)
  3：请求空行 (请求空行没有什么作用)
  4：请求体  （get 方式提交没有请求体）

get 方式提交.
GET /day08/mycode/02array.html HTTP/1.1
Host  127.0.0.1
Cache-Control  max-age=0
Upgrade-Insecure-Requests  1
User-Agent  Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36
 告诉服务器客户端浏览器接收的数据格式。
Accept text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
//接受的编码，
Accept-Encoding  gzip, deflate, sdch
//接收的语言.
Accept-Language  zh-CN,zh;q=0.8
If-None-Match  "1900000000036e-af-53c595c55c0ef"
If-Modified-Since  Tue, 13 Sep 2016 01:16:22 GMT

/*--------------------------------------------------------*/
POST方式提交：
1、请求首行
/day07/mycode/12poPOSTst.php HTTP/1.1
Host: 127.0.0.1
Content-Length: 35
Cache-Control: max-age=0
Origin: http://127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36
★★★//如果是post 提交，一定会有这个请求头，
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

//请求来自于那个页面.
Referer: http://127.0.0.1/day07/mycode/12post.html
1:作用，做广告流量统计
2：防盗链

Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8

//请求体，这个请求体是发送到服务器的参数数据
username=zhangsan&password=zhangsan
```

**get  提交与post 提交的区别  （重点掌握）**

- **get提交**
  - 1：get 提交请求的参数都在地址栏当中。不安全
  - 2：get 提交没有请求体
  - 3：get 提交因为请求都在地址栏当中，所以发送给服务器的数据的大小会有限制 1kb 左右
  - 4、发送给服务器的请求头比较少，性能高，如果我不需要给服务器端发送参数数据，我就是用get
- **post提交**
  - 1：post 提交请求参数都在请求体当中，数据大小没有限制
  - 2：安全
  - 3：它必须有一个特殊的请求头 `Content-Type:"application/x-www-form-urlencoded";`
  - 4、如果我需要给服务器发送数据，并且发送到服务器的数据还带有中文，提交的数据量大，就是用post

### 服务器给客户端响应的数据  (响应的数据格式)

**数据格式也分为四部分**

- 1、响应首行
- 2、响应头
- 3、响应空行
- 4、响应体

```
 响应的协议版本
200 响应的状态吗 代表成功
404 请求的资源没有找到
500 服务器内部错误
HTTP/1.1 200 OK

//告诉客户端浏览器服务器的时候
Date: Tue, 13 Sep 2016 02:33:55 GMT
//告诉客户端浏览器我服务器时候的版本
Server: Apache/2.2.21 (Win32) PHP/5.3.10
//最后修改时间.
Last-Modified: Tue, 13 Sep 2016 01:16:22 GMT
ETag: "1900000000036e-af-53c595c55c0ef"
Accept-Ranges: bytes
//响应内容长度
Content-Length: 175
//Content-Type：服务器给客户端浏览器的，告诉客户端浏览器，我的内容类型.
Content-Type: text/html;
```

- 客户端浏览器接受到这个响应头，5秒钟之后会自动跳转到百度
  - `Refresh:5;url=http://www.baidu.com`

- php 有一个函数可以先个客户端输出响应头
  - `header(" Refresh:5;url=http://www.baidu.com;");`

## Ajax

**同步交互**

- 我发送一个请求，服务器接受到请求，
- 服务器要对请求进行处理，然后给客户端浏览器进行响应。
- 在处理的过程当中，我的客户端不能做其它的操作，
- 响应回来的页面会把之前的界面给覆盖掉.

**异步交互**

- 我发送一个请求给服务器，
- 服务器接受到请求，服务器对请求进行处理，然后给客户端浏览器响应数据，
- 在处理的过程当中，客户端还可以做其它的事情
- 响应回来的数据不会覆盖原来的界面

**怎么完成异步交互**

- 我们通过js 给我们提供的一个对象叫做 `XMLHttpRequest` 对象来完成异步交互的。
- 就是通过`XMLHttpRequest` 发送请求，通过这个对象 `XMLHttpRequest` 接受数据。

```
1:创建对象
  var xhr=new XMLHttpRequest();
2:打开连接
  xhr.open("GET/POST","URL");

★post提交要在这里加一个特殊的请求头  Content-Type:application/x-www-form-urlencoded

3:发送数据
  xhr.send(null); get 提交数据放在路径的后面.  post提交，直接放这里面
4:接收数据

在xhr 对象上面绑定一个函数

//服务端在响应的过程当中都会调用这个函数.
xhr.onreadystatechange=function(){

//我们通过这个属性可以获取到三个值  2,3,4
//这个2,3,4 其中这个4 代表 服务器端响应的数据已经完成.
//获取服务器端状态，如果服务器返回的 状态等于4，代表服务器的数据已经响应完毕.
//xhr.readyState

//服务器返回的状态码，如果200 代表的是成功，如果是404 代表的响应失败
//xhr.status

  if(xhr.readyState==4 && xhr.status==200){

//我在这里开始接收数据.怎么去接受服务器端返回的数据
//肯定也是通过xhr，使用这个属性来接受服务器返回的数据.
    xhr.responseText;
//向页面输出数据
  document.querySelector("div").innerHTML=data;
  }
}
```

## XML(可扩展标记语言——一种数据格式)

**与html相比**

- `html`
  - html 里面的标记都是固定  （按照w3c 固定的）
  - html 是用来做界面显示的
- `xml`
  - xml 它是自定义的，也就是这个里面的标签不固定，我们自己去定义
  - 只要按照xml 的语法去写就行。 xml 的语法跟html 的语法类似

**语法**

- 1：xml 的文档声明 声明这个是一个xml格式的文档
  - `<?xml version="1.0"  encoding="UTF-8" ?>`
- 2:有且仅有有个根元素
- 3:可以嵌套，不可交叉（可以自定义）

```xml
<?xml version="1.0" encoding="utf-8"?>
<users>
  <user>
    <username></username>
    <age></age>
  </user>
  <user>
    <username></username>
    <age></age>
  </user>
</users>
```

**js解析xml**

- js 怎么去解析xml 格式的数据 （把xml 格式的数据转换成【`dom 对象`】）
- 1：服务端(给客户端一个响应头)
  - `header("Content-Type:text/xml;charset=utf-8");`
- 2：客户端
  - `var obj=xhr.responseXML;` 得到的是一个`dom 对象`

## JSON(一种数据格式)

> 一种比较轻量级的数据格式
> 可以使用更少的字符串代表更多的数据
>
> 从性能的角度来说，交互的次数越少越好，交互的时候传递的数据越少越好

**格式**

- **以键值对的方式来表示**
- 键值对，我们都是根据key 去获取到value

```
一条记录:
{"username":"张三","age":11}

多条记录:
[
  {"username":"张三","age":11},
  {"username":"李四","age":11}
]
 json 格式
{"key":[{"username":"张三","age":11},{"username":"李四","age":11}]}
```

**js解析json**

- 服务端：
  - 返回json 格式的数据`{"username":"zhangsan","age":11}`
    - (通过json数据文件，经后台处理得到json格式文件)

- 客户端：
  - 接收数据  `xhr.responseText;`(接收到的是字符串格式)
    - （我们是把符合json 格式的数据转换成【javascript 的对象】，然后通过`对象.key`  获取值）

**转换的两种格式**

- 1：通过我们的js 提供的一个函数  `eval`
  - `var data='{"username":"zhangsan","age":11}';`
  - `var obj=eval("("+data+")")`
- 2：提供JSON.parse 解析
  - `var obj=JSON.parse(data);`

## ajax函数封装

**为什么封装**

- 代码冗余
- 多个页面进行交互
- 1：假设在一个页面里面可以共用，我就封装成一个函数。
- 2：假设封装的这个函数有多个参数，我就是用一个对象给它包装起来
- 3：因为我的一个页面到时候有多个方法，我就是用对象把方法包装起来
- 4：假设多个页面共用这个方法，我就提到一个文件里面去.

**创建ajax步骤**

- 1、创建对象
- 2、打开链接
- 3、发送数据
- 4、接收数据

**封装结果**

```js
var $ = {
    ajax: function (obj) {
        //执行前判断，返回true继续执行，false，结束执行

        var flag = obj.beforeSend();
        if (flag == false) {
            return;
        }

        var xhr = new XMLHttpRequest();
        if (obj.type.toLocaleLowerCase() == "get") {//get提交方式,不分大小写
            obj.url = obj.url + "?" + obj.data;
            obj.data = null;
        }

        xhr.open(obj.type, obj.url);

        if (obj.type.toLocaleLowerCase() == "post") {//post提交方式,不分大小写
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")；
        }

        xhr.send(obj.data);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    //代码执行成功执行函数
                    obj.success(data);
                } else {
                    //代码执行失败执行函数
                    obj.error();
                }
                //代码执行结束执行函数
                obj.complete();
            }
        }
    }
};



$.ajax({
    url: 'url',
    type: 'type',
    data: 'data',
    success: function (mes) {
        console.log("代码执行成功执行函数");
    },
    error: function () {
        console.log("代码执行失败执行函数");
    },
    beforeSend: function () {
        if (true) {
            return true;
        } else {
            return false;
        }
    },
    complete: function () {
        console.log("代码执行结束执行函数");
    }
});
```

### 兼容获取`xhr`对象

```js
// 兼容获取xhr对象
var xhr;
if ( window.XMLHttpRequest ) {
    xhr = new XMLHttpRequest();
}else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}
console.log(xhr);
// 请求数据
xhr.open( 'GET', './jquery-2.2.0.js' );
xhr.onreadystatechange = function() {
    // ajax生命周期结束了
    if ( xhr.readyState == 4 ) {
        // 如果请求成功( 200 ~ 299之间算成功，304走缓存，也应该算是成功 )
        if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 ) {
            // 把得到的数据打印出来
            console.log( xhr.responseText );
        }
    }
};
xhr.send( null );
```

## jQuery操作ajax

**`$.ajax({})`**

```js
$.ajax({
       url:"",
       type:"",
       dataType:"",
       data:{
       },
       timeout:,//超时时间
       beforeSend:function(){//请求发送之前调用，如果返回的是false，就不发送请求了，对数据进行一些校验
       },
       success: function(){//请求成功的时候调用，我们一般在这里获取数据，解析数据，把数据放到页面上面
       },
       error:function(){//请求失败的时候调用，我们一般是给一些用户友好的提示
       },
       complete：function(){//请求结束的时候调用，一般我们在这里重置一些.
       }
 });
```

**`$.get()`**

```js
$.get("url",{},function(data){

});
```

**`$.post()`**

```js
$.post("url",{},function(){

});
```

**`$('div').load()`**

- `$("div").load("url",{});`
  - 这个一个局部方法
  - 把得到的服务端的内容放在当前元素里面
  - 默认是get 方式提交，如果给服务器端发送参数，就是post 方式提交.

**`$.getScript()`**

- `$.getScript("js/script.js");`
  - 远程去载入一段脚本
  - 当我的一个页面非常庞大，我们不会一次性把所有的脚本文件都加载出来。
  - 为了提供浏览器的渲染速度，需要的时候我再去获取这段脚本文件.

**`$.getJSON()`**

- `$.getJSON("url",function(data){});`
  - 假设返回了json 格式的数据。
  - jQuery 底层会把这个json 格式的数据转换成对象。
  - 然后我们通过getJSON 就是一个对象.
  - **要求服务端返回的数据必须是json 格式的数据**

## 序列化

**serialize()**

- 将当前表单的输入项的内容序列化成一个可以发送到服务器端的数据格式的字符串

**serializeArrar()**

- 序列化表单输入项的内容称为 一个数组
- 这个数组的数据也可以直接通过jQuery 发送到服务器

## 模板

**1、我需要在页面引入这个库 `tempalte-native.js`（模板库）**
**2、创建模板**

```js
<script type="text/template"></script>

在模板里面解析绑定的这个数据

使用模板的语法

<%%> 用来写逻辑表达式
<%=%> 向模板里面输出字符串

<%for(var i=0;i<array.length;i++){%>
    <%=i%>
<%}%>
```

**3、将数据与模板进行绑定**

- **传递的数据必须是一个对象**
- `template("模板的id",数据对象);`
- 可用   JSON.parse(data)  解析后台数据

**返回数据，将数据写到页面**

```js
<script src="code/template/js/template-native.js"></script>
<script type="text/template" id="tempId">
    <% for (i = 0; i < rows.length; i++) {%>
        <tr>
            <td><%=rows[i].username%></td>
            <td><%=rows[i].age%></td>
            <td><%=rows[i].sex%></td>
            <td><%=rows[i].desc%></td>
        </tr>
    <% } %>
</script>

var mydata = JSON.parse(data);
var html = template("tempId",mydata);
$("table").append(html);
```

## 跨域

**什么情况下跨域**

- 1、a 站点的html 的js 是想去访问b 站点的里面的元素

```
a 站点的 html
iframe src="b 站点的资源";（iframe可以调用其他页面的地址，显示在当前页面）
```

- 2、跨站点
  - `http://www.baidu.com 下面的一个网页js 去访问  http://www.sohu.com 下面的一个资源`
- 3、二级域名
  - `http://www.baidu.com` 去访问  `http://music.baidu.com` 下面的 一个资源，也会跨域

**跨域是浏览器一种行为**

- 因为现在域名不相同，所有浏览器会有一种安全行为，它禁止去访问跨域了的页面的元素.
- 但是因为现在主域名相同，我们是可以解决这种跨域的

**解决主域名相同时的跨域问题**

- 在两个站点的js 里面加`document.domian="主域名.cn";`声明主域名

### Ajax跨域

- 通过`xmlHttpRequest`这个对象去发送请求，就会存在跨域问题
- 域名都不相同，浏览器会觉得会有安全问题
- **解决跨域**
  - 使用jQuery 提供的`dataType:"jsonp";`  属性

### jsonp工作原理

- 我通过script 标签去发送请求，发送请求跟这个地址没有任何关系跟服务器返回的 这个内容有关系
- script 调用`.php`的地址，php要给客户端一个响应头
  - `header("Content-Type:text/javascript;charset=utf-8");`
- 在js里使用script 标签去发送请求，因为这个标签没有跨域限制。
  - 使用script 标签去发送请求。然后通过`callback`这样的一个回调函数把服务器端的数据获取到
  - 通过script 标签把一个`callback`函数名传递到服务器，服务器得到这个函数名
  - 把服务器要传递的数据跟这个callback函数名进行组拼，组拼成方法调用的形式。
  - 发这个数据发送到客户端浏览器，客户端浏览器得到这个内容
  - 就以javascript 的方式去解析服务器端返回的数据

```js
var script = document.createElement("script");
//以后我们只要是通过这种标签都是get 方式提交
script.src = "05jsonp.php?callback=getInfo";
//假设我现在发送请求，服务器返回数据
//现在返回的数据直接被浏览器当做js 解析
//客户端现在接受到的是getInfo()
//现在客户端浏览器是以javascript 的方式去解析getInfo();
//刚好调用到了我客户端的这个函数.
//客户端接受的数据就是getInfo({"username":"zhangsan","age":11})
document.querySelector("body").appendChild(script);
//我可以给服务器发送一个参数.

function getInfo(obj) {
    //alert("服务器已经返回了");
    console.log(obj);
    //我就可以解析这个数据，然后把数据放到页面上面.
}


<?php
    //最终的目的我是要把这个json 格式数据写到客户端.
    //echo '{"username":"zhangsan","age":11}';
    //先获取客户端的数据.
    //一定是一个关联数组.
    $data=$_GET['callback'];
    //获取到的值getInfo
    //getInfo({"username":"zhangsan","age":11})
    echo $data.'({"username":"zhangsan","age":11})';
?>
```
