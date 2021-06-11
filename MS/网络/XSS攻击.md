# XSS 攻击

参考
[【前端黑客】XSS 入门](https://zhuanlan.zhihu.com/p/37455061)
[什么是 XSS 攻击？如何防范 XSS 攻击？](https://blog.csdn.net/weixin_43681537/article/details/84585554)
[XSS 攻击及防御](https://blog.csdn.net/ghsau/article/details/17027893)
[浅谈 XSS 攻击的那些事（附常用绕过姿势）](https://zhuanlan.zhihu.com/p/26177815)
[前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
[什么是 XSS 攻击，XSS 攻击可以分为哪几类？如何防范 XSS 攻击？](https://github.com/YvetteLau/Step-By-Step/issues/18)
[XSS 攻击原理分析与防御技术](https://segmentfault.com/a/1190000013315450)
[如何让前端更安全？——XSS 攻击和防御详解](https://juejin.im/entry/58a598dc570c35006b5cd6b4)

XSS 攻击又称 CSS，全称`Cross Site Script（跨站脚本攻击）`，为了不和层叠样式表`（Cascading Style Sheets,CSS）`缩写混淆，所以将跨站脚本攻击缩写为 XSS。

其原理是**攻击者向有 XSS 漏洞的网站中输入恶意的 HTML 代码，当用户浏览该网站时，这段 HTML 代码会自动执行**，从而达到攻击的目的。XSS 是 Web 程序中常见的漏洞，XSS 属于被动式且用于客户端的攻击方式。如，**盗取用户 Cookie**、**破坏页面结构**、**重定向到其它网站**等。

## XSS 类型

### 反射型

发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务器，服务器解释后相应，在响应内容中出现这段 XSS 代码，最后由浏览器解释执行！常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

```js
<?php
echo $_GET['x'];
?>
```

输入的 x 的值未经过任何过滤直接输出，一种触发 XSS 的一种方式如下：
`http://www.foo.com/xss/1.php?x=<script>alert(1)</script>`
服务器解析时，echo 就会完整的输出`<script>alert(1)</script>`到响应体中，然后浏览器解析执行触发！！

**反射型 XSS 的攻击步骤：**

1、攻击者构造出特殊的 URL，其中包含恶意代码。
2、用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
3、用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4、恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

### 存储型

存储型 XSS 和反射型 XSS 的区别：
提交的 XSS 代码会存储在服务器上，下次请求目标页面的时候不需要再次提交 XSS 代码！！
存储的位置可以是数据库、内存、文件系统等。

典型的例子就是**留言板 XSS**，用户提交一条包含 XSS 代码的留言存储到数据库，目标用户查看留言板时，那些留言的内容就会从数据库查询出来并显示，在浏览器上与正常的 HTML 和 JS 解析执行，触发 XSS 攻击！！

**存储型 XSS 的攻击步骤：**

1、攻击者将恶意代码提交到目标网站的数据库中。
2、用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
3、用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4、恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

### DOM 型

DOM 型 XSS 和存储型、反射型 XSS 的区别：
DOM 型 XSS 代码不需要服务器解释响应的直接参与，触发 XSS 只需要浏览器的 DOM 解析，完全是客户端的问题，属于前端 JavaScript 自身的安全漏洞！！

```js
<script>eval(location.hash.substr(1));</script>
```

触发 XSS 的一种方式如下:
`http://www.foo.com/xss.html#alert(1)`
这个 URL 显然不会发送到服务端，仅仅是在客户端被接收并解析执行！！

**DOM 型 XSS 的攻击步骤：**

1、攻击者构造出特殊的 URL，其中包含恶意代码。
2、用户打开带有恶意代码的 URL。
3、用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
4、恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

## XSS 危害

### 窃取网页浏览中的 cookie 值

在网页浏览中我们常常涉及到用户登录，登录完毕之后服务端会返回一个 cookie 值。这个 cookie 值相当于一个令牌，拿着这张令牌就等同于证明了你是某个用户。

如果你的 cookie 值被窃取，那么攻击者很可能能够直接利用你的这张令牌不用密码就登录你的账户。如果想要通过 script 脚本获得当前页面的 cookie 值，通常会用到`document.cookie`。

### 劫持流量实现恶意跳转

在网页中想办法插入一句像这样的语句：

```js
<script>window.location.href="http://www.xxx.com";</script>
```

那么所访问的网站就会被跳转到对应的网站。

## XSS 防御

### 完善的过滤体系

永远不相信用户的输入。需要对用户的输入进行处理，只允许输入合法的值，其它值一概过滤掉。

### html 标签符号转码

假如某些情况下，我们不能对用户数据进行严格的过滤，那我们也需要对标签进行转换。（例如：`(< 转换成 &lt;)`、`(> 转换成 &gt;)`、还有(`'|"|%|&`)等等）

**注意：**

- HTML 转义是非常复杂的，在不同的情况下要采用不同的转义规则。如果采用了错误的转义规则，很有可能会埋下 XSS 隐患。
- 应当尽量避免自己写转义库，而应当采用成熟的、业界通用的转义库。

### 防止大小写绕过

这个绕过方式的出现是因为网站仅仅只过滤了`<script>`标签，而没有考虑标签中的大小写并不影响浏览器的解释所致。具体的方式就像这样：

```js
http://xxx.xxx.xxx.xxx/xss/example2.php?name=<sCript>alert("hey!")</scRipt>
```

### 防止利用过滤后返回语句再次构成攻击语句来绕过

比如：有的网站也对`<script>`标签进行了过滤，但是对过滤后的内容并没有做处理

```js
//xxx.xxx.xxx.xxx/xss/example2.php?name=<sCript>alert("hey!")</scRipt>

// 过滤后剩下了
http: alert('hey!')
```

如果我们就可以人为的制造一种巧合，让过滤完`<script>`标签后的语句中还有`<script>`标签（毕竟 alert 函数还在），像这样：

```js
http://xxx.xxx.xxx.xxx/xss/example3.php?name=<sCri<script>pt>alert("hey!")</scRi</script>pt>
```

上面举例，输入的内容过滤完`<script>`标签，还是会在页面上执行

再有对于链接跳转，如 `<a href="xxx"` 或 `location.href="xxx"`，要检验其内容，禁止以 `javascript:` 开头的链接，和其他非法的 scheme。

### 并不是只有 script 标签才可以插入代码

在`<script>`标签已经被完全过滤的情况下，能植入脚本代码的不止 script 标签。`<img>` 其实也可以

```js
http://xxx.xxx.xxx.xxx/xss/example4.php?name=<img
src='w.123' onerror='alert("hey!")'>
```

原因很简单，我们指定的图片地址根本不存在也就是一定会发生错误，这时候`onerror`里面的代码自然就得到了执行。

以下列举几个常用的可插入代码的标签：

- `<a onmousemove='do something here'>`
- `<div onmouseover='do something here'>`

### 编码脚本代码绕过关键字过滤

有的时候，服务器往往会对代码中的关键字（如 alert）进行过滤，这个时候我们可以尝试将关键字进行编码后再插入，不过直接显示编码是不能被浏览器执行的，我们可以用另一个语句`eval()`来实现。`eval()`会将编码过的语句解码后再执行。

例如`alert(1)`编码过后就是`\u0061\u006c\u0065\u0072\u0074(1)`

所以构建出来的攻击语句如下：

```js
http://xxx.xxx.xxx.xxx/xss/example5.php?name=<script>eval(\u0061\u006c\u0065\u0072\u0074(1))</script>
```

### 主动闭合标签实现注入代码

```js
http://xxx.xxx.xxx.xxx/xss/example5.php?name=le6.php?name=";alert("I am
coming again~");"
```

### 组合各种方式

在实际运用中漏洞的利用可能不会这么直观，需要我们不断的尝试，甚至组合各种绕过方式来达到目的。
