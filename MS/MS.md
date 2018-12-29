# MS

[TOC]

## 1、JavaScript支持两种定义函数的方式，请说出主要区别

- **函数声明式**`function myFunction () {}`
  - 以`function关键字开头`定义的函数
  - 并且定义在全局，或直接嵌套在另一个函数内
  - 会被预解析
  - 必须有函数名
- **函数表达式**`var myFunction = function () {}`
  - `不是以function关键字开头`定义的函数
  - 要么在表达式中，要么在语句中
  - 不会被预解析
  - 函数名字可有可无
  - 函数名字只能在函数内部使用
  - **特殊情况：**
    - 写在非函数代码块
    - 名字是必须的
    - 名字可被预解析
    - 函数名可在外面使用

## 2、描述一下变量的区别：`null，undefined，undeclared`，该如何检测它们？

- `null` 表示 **没有对象**，即此处不应该以有值，转换为数值为 0
  - 作为函数的参数，表示该函数的参数不是对象。
  - 作为对象原型链的终点。

- `undefined` 表示 **缺少值**，就是此处应该有一个值，但是还没有定义，转为数值时为NaN。
  - 变量被声明了，但没有赋值时，就等于 `undefined`。
  - 调用函数时，应该提供的参数没有提供，该参数等于 `undefined`。
  - 对象没有赋值的属性，该属性的值为 `undefined`。
  - 函数没有返回值时，默认返回 `undefined`。
- `undeclared` js语法错误，没有申明直接使用，js无法找到对应的上下文。

## 3、请说出`constructor`，`__proto__`，`prototype`的区别

- `__proto__`
  - 每个对象都有`__proto__`这个属性，
  - 通过这个属性可以找到这个对象所继承的对象
  - 这个属性的值与构造函数的 `prototype` 的属性值一致，都存储着同一个对象的**地址**

- `prototype`
  - 只有**函数**才拥有`prototype`属性
  - 指向了构造函数的原型对象
  - 函数也是对象，所以它既有`prototype`属性，又有`__proto__`属性

- `constructor`
  - 构造函数**原型对象**里的属性
  - 指向了构造函数

## 4、如何扩展JavaScript内置对象，这样做有什么问题

- 利用`Object.prototype`进行扩展
- 问题是，兼容性，安全性，实用性

## 5、addEventListener的第三个参数你了解吗？请说出这个参数的作用

- true，表示在捕获阶段调用事件处理程序
- false，表示在冒泡阶段调用事件处理程序。 （默认，可以省略不写）

## 6、如何copy一个Array

```
var arr = [1,2,3,4,5,6];
var newArr = [];

for(var i = 0; i < arr.length; i++) {
  newArr.push(arr[i]);
}

([]).push.apply(newArr, arr);
console.log(newArr);

newArr.push(...arr);
```

## 7、你做的页面在哪些流览器测试过？这些浏览器的内核分别是什么?

- `IE: trident`内核
- `Firefox：gecko`内核
- `Safari:webkit`内核 (苹果浏览器)
- `Opera:以前是presto`内核，Opera现已改用Google Chrome的`Blink`内核
- `Chrome:Blink`(基于webkit，Google与Opera Software共同开发)

> 浏览器内核又可以分成两部分：渲染引擎和 JS 引擎。
> **渲染引擎：**它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。
> **JS 引擎：**则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果

## 8、每个HTML文件里开头都有个很重要的东西，`Doctype`，知道这是干什么的吗

- `<!DOCTYPE>` 声明位于文档中的最前面的位置，处于 `<html>`标签之前。此标签可告知浏览器文档使用哪种*( HTML 或 XHTML )*规范
- **重点：告诉浏览器按照何种规范解析页面**


#### 9、div+css的布局较table布局有什么优点
- 页面加载速度更快
- 结构化清晰
- 页面显示简洁
- 表现与结构相分离
- 易于优化（seo）搜索引擎更友好，排名更容易靠前

> **Tables的缺点：**
>
> 1、Table要比其它html标记占更多的字节。(延迟下载时间，占用服务器更多的流量资源。)
> 2、Table会阻挡浏览器渲染引擎的渲染顺序。(会延迟页面的生成速度，让用户等待更久的时间。)
> 3、Table里显示图片时需要你把单个、有逻辑性的图片切成多个图。(增加设计的复杂度，增加页面加载时间，增加HTTP会话数。)
> 4、在某些浏览器中Table里的文字的拷贝会出现问题。(这会让用户不悦。)
> 5、Table会影响其内部的某些布局属性的生效(比如`<td>`里的元素的height:100%)(这会限制你页面设计的自由性。)
> 6、一旦学了CSS知识，你会发现使用table做页面布局会变得更麻烦。(先花时间学一些CSS知识，会省去你以后大量的时间。)
> 7、table对对于页面布局来说，从语义上看是不正确的。(它描述的是表现，而不是内容。)
> 8、table代码会让阅读者抓狂。(不但无法利用CSS，而且会你不知所云)
> 9、table一旦设计完成就变成死的，很难通过CSS让它展现新的面貌。
>
> **Tables的优点：**
>
> 在某些场合，使用Table是100%的适合、恰当和正确。比如，用table做表格是完全正确的。
> 如果你无法判断是否应该使用table，参考一下上面的几条，相信你能找到答案
>
> **DIV+CSS优点：**
>
> 代码简洁
> 页面浏览速度较快
> 页面布局灵活
>
> **DIV+CSS缺点：**
>
> 可观性差
> 操作繁琐
> 兼容性较差


#### 10、SEO
- `Search Engine Optimization`搜索引擎优化
- 通过一定的方法在网站内外发布文章、交换连接等，最终达到某个关键词在搜索引擎上获得好的排名


#### 11、`img`的`alt`与`title`有何异同？ `strong`与`em`的异同
- `alt` 是图片加载失败时，显示在网页上的替代文字
- `title` 是鼠标放上面时显示的文字
- `strong` **粗体**强调标签，强调，表示内容的重要性
- `em` *斜体*强调标签，更强烈强调，表示内容的强调点


#### 12、你能描述一下`渐进增强`和`优雅降级`之间的不同吗
- **渐进增强**
  - 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验
- **优雅降级**
  - 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

- **区别**
  - 优雅降级是从复杂的现状开始，并试图减少用户体验的供给
  - 降级（功能衰减）意味着往回看
  - 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要
  - 渐进增强则意味着朝前看，同时保证其根基处于安全地带


#### 13、为什么利用多个域名来存储网站资源会更有效
- CDN缓存更方便
  - [CDN详细介绍](http://www.arpun.com/article/19360.html)
- 突破浏览器并发限制,不同域可以提高请求资源并发
  - 像地图之类的需要大量并发下载图片的站点，这个非常重要
- 节约cookie带宽
  -  适合大流量的网站，如facebook 、twitter
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题
> **注意：**
> 关于多域名，也不是越多越好，虽然服务器端可以做泛解释，浏览器做dns解释也是耗时间的，而且太多域名，如果要走 https的话，还有要多买证书和部署的问题


#### 14、Cookie
- 你浏览网页的时候，网站服务器放在客户端（Client End，就是你的电脑）里面的一个小小的TXT文件。
- 这个文件里面存储了一些与你访问的这个网站有关的一些东西，当你下一次访问这个网站的时候，Cookie就会记住你上次访问时候的一些状态或者设置，让服务器针对性的发送页面的相关内容。
- Cookie里面包含的信息并没有一个标准的格式，各个网站服务器的规范都可能不同，但一般会包括：
  - 所访问网站的域名（domain name）
  - 访问开始的时间
  - 访问者的IP地址等客户端信息
  - 访问者关于这个网站的一些设置等等


#### 15、请谈一下你对网页标准和标准制定机构重要性的理解
- 为了能让web发展的更‘健康’
- 开发者遵循统一的标准
- 降低开发难度，开发成本
- SEO也会更好做
- 也不会因为滥用代码导致各种BUG、安全问题，最终提高网站易用性


#### 16、请描述一下`cookies`，`sessionStorage`和`localStorage`的区别
- `sessionStorage`本地存储一个会话（session）中的数据
  - 这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储
- `localStorage`持久化的本地存储
  - 除非主动删除数据，否则数据是永远不会过期的

- **区别**



#### 17、简述一下src与href的区别
- `src`
  - 用于替换当前元素
  - 指向外部资源的位置
  - 指向的内容将会嵌入到文档中当前标签所在位置
  - 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内
- `href`
  - 建立和当前元素（锚点）或当前文档（链接）之间的链接
  - 指向网络资源所在位置
  - 并行下载资源并且不会停止对当前文档的处理


#### 18、知道的网页制作会用到的图片格式有哪些
- png-8
- png-24
- jpeg
- gif
- svg
- Webp


#### 19、知道什么是微格式吗？谈谈理解。在前端构建中应该考虑微格式吗？
- `Microformat`
- 是一种对Web网页进行**语义注解**的方法
- 依托于标准的Web页面写作技术
> 例如，XHTML，这样引入语义信息对浏览器等所有现存的Web技术冲击最小。
> 采用Microformat的Web页面，在XHTML文档中给一些标签（Tag）增加一些属性（attribute），这些属性对信息的语义结构进行注解，处理XHTML文档的软件，
> 例如，浏览器等，如果不认识这些属性可以跳过，并不造成任何不良影响


#### 20、在css/js代码上线之后开发人员经常会优化性能，从用户刷新网页开始，一次js请求一般情况下有哪些地方会有缓存处理
- dns缓存
- cdn缓存
- 浏览器缓存
- 服务器缓存


#### 21、一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验
- 图片懒加载
  - 在页面上的未可视区域可以添加一个滚动条事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载
- 图片预加载
  - 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载
- 图片压缩显示


#### 22、谈谈以前端角度出发做好SEO需要考虑什么
- Meta标签优化
  - 主题`(Title)`
  - 网站描述`(Description)`
  - 关键词`（Keywords）`
  - 还有一些其它的隐藏文字比如：
    - Author（作者），
    - Category（目录），
    - Language（编码语种）等


#### 23、有哪项方式可以对一个DOM设置它的CSS样式
- 1、行内样式:
  - 是通过在标签中设置style属性来达到控制标签样式效果
- 2、嵌入样式
  - 在head标签中嵌套一个style标签，在其中写CSS样式内容。style标签有一个默认type属性，可以省略。
- 3、外部CSS样式：
  - 从外部引入一个外部css文件


#### 24、CSS中可以通过哪些属性定义，使得一个DOM元素不显示在浏览器可视范围内
- 设置`display`属性为`none`
- 或者设置`visibility`属性为`hidden`
- 设置宽高为0，设置透明度为0，设置`z-index位置在-1000`


#### 25、超链接访问过后hover样式就不出现的问题是什么？如何解决
- 被点击访问过的超链接样式不在具有hover和active了
-
- 解决方法是改变CSS属性的排列顺序:
  -  `L-V-H-A（link,visited,hover,active）`


#### 26、什么是Css Hack？ie6,7,8的hack分别是什么
- 针对不同的浏览器写不同的CSS code的过程，就是CSS hack
```
//示例如下：
#test{
  width:300px;
  height:300px;
  background-color:blue;      /*firefox*/
  background-color:red\9;      /*all ie*/
  background-color:yellow;    /*ie8*/
  +background-color:pink;        /*ie7*/
  _background-color:orange;       /*ie6*/
  }

:root #test {
  background-color:purple\9;
  }  /*ie9*/
```


#### 27、行内元素和块级元素的具体区别是什么？行内元素的padding和margin可设置吗？
- 块级元素(block)特性
  - 总是独占一行，
  - 表现为另起一行开始，而且其后的元素也必须另起一行显示;
  - 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制

- 内联元素(inline)特性
  - 和相邻的内联元素在同一行;
  - 宽度(width)、高度(height)、内边距的`top/bottom(padding-top/padding-bottom)`和外边距的`top/bottom(margin-top/margin-bottom)`都不可改变
  - **只有padding和margin的left和right是可以设置**

- inline-block元素
  - `<input>`
  - `<img> `
  - `<button> `
  - `<texterea> `
  - `<label>`


#### 28、rgba()和opacity的透明效果有什么不同
- `rgba()`和`opacity`都能实现透明效果
- 但最大的不同是`opacity`作用于元素，以及元素内的所有内容的透明度，会继承，而且不易解决继承问题
- 而`rgba()`只作用于元素的颜色或其背景色。（设置rgba透明的元素的子元素不会继承透明效果！）


#### 29、css中可以让文字在垂直和水平方向上重叠的两个属性是什么
- 垂直方向：`line-height`
- 水平方向：`letter-spacing`
  - `letter-spacing`可以用于消除`inline-block`元素间的换行符空格间隙问题


#### 30、px和em的区别
- px和em都是长度单位
- px的值是固定的，指定是多少就是多少，计算比较容易
- em得值不是固定的，并且em会继承父级元素的字体大小


#### 31、Sass、Less是什么？大家为什么要使用他们？
- CSS预处理器
  - 是CSS上的一种抽象层。他们是一种特殊的语法/语言编译成CSS
- 为什么要使用它们？
  - 结构清晰，便于扩展。
  - 可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对浏览器语法差异的重复处理
  - 减少无意义的机械劳动。
  - 可以轻松实现多重继承
  - 完全兼容 CSS 代码，可以方便地应用到老项目中
- 区别：
  - 变量符不一样，less是@，而Sass是$;
  - Sass支持条件语句，可以使用`if{}else{},for{}`循环等等。而Less不支持;
  - Sass是基于Ruby的，是在服务端处理的，
  - 而Less是需要引入less.js来处理Less代码输出Css到浏览器


#### 32、display:none与visibility:hidden的区别是什么
- display :
  - 隐藏对应的元素
  - 但**不挤占**该元素原来的空间
- visibility:
  - 隐藏对应的元素
  - 并且**挤占**该元素原来的空间


#### 33、CSS中link和@import的区别是
- Link属于html标签，而@import是CSS中提供的
- 在页面加载的时候，link会同时被加载
- link是html标签，不存在浏览器兼容性问题
- 而@import引用的CSS会在页面加载完成后才会加载引用的CSS
- @import只有在ie5以上才可以被识别
> Link引入样式的权重大于@import的引用（@import是将引用的样式导入到当前的页面中）


#### 34、简介盒模型
- CSS的盒子模型有两种：
  - **IE盒子模型**
    - IE中width为border的宽度
  - **标准的W3C盒子模型模型**
    - W3C中width为content的宽度


#### 35、为什么要初始化样式
- 由于浏览器兼容的问题，不同的浏览器对标签的默认样式值不同
- 初始化样式可以消除不同浏览器之间的显示差异
- 但是初始化CSS会对搜索引擎优化造成小影响,代码过多会影响速度


#### 36、html语义化是什么
- 当页面样式加载失败的时候能够让页面呈现出清晰的结构
- 有利于seo优化，利于被搜索引擎收录
- 便于项目的开发及维护，
- 使html代码更具有可读性，便于其他设备解析


#### 37、严格模式与混杂模式的区别？
- 严格模式:  `'use strict'`
  - 页面排版及JS解析是以该浏览器支持的最高标准来执行
  - [Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

> 全局变量显式声明
> 静态绑定
> 禁止使用with语句
> eval中定义的变量都是局部变量
> 禁止this关键字指向全局对象
> 禁止在函数内部遍历调用栈
>

- 混杂模式:
  - 不严格按照标准执行，主要用来兼容旧的浏览器，向后兼容

- 设立"严格模式"的目的：
  - 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
  - 消除代码运行的一些不安全之处，保证代码运行的安全；
  - 提高编译器效率，增加运行速度；
  - 为未来新版本的Javascript做好铺垫。


#### 38、XHTML 相对 HTML 的几大区别
- XHTML 要求正确嵌套
- XHTML 所有元素必须关闭,包括空标签
- XHTML 区分大小写
- XHTML 属性值要用双引号
- XHTML 用 id 属性代替 name 属性
- XHTML 特殊字符的处理
- 所有XHTML文档必须进行文件类型声明
> 1. 所有的标记都必须要有一个相应的结束标记
> 2. 所有标签的元素和属性的名字都必须使用小写
> 3. 所有的 XML 标记都必须合理嵌套
> 4. 所有的属性必须用引号 "" 括起来
> 5. 把所有 < 和 & 特殊符号用编码表示
> 6. 给所有属性赋一个值
> 7. 不要在注释内容中使用 "--"
> 8. 图片必须有说明文字


#### 39、IE的双边距BUG：块级元素float后设置横向margin，ie6显示的margin比设置的较大
- 加入`_display：inline;`


#### 40、html常见兼容性问题
- 双边距BUG
  - float引起的  使用`display：inline;`
- 3像素问题
  - 使用float引起的 使用`dislpay:inline -3px`
- 超链接hover 点击后失效
  - 使用正确的书写顺序 `link visited hover active`
- Ie z-index问题
  - 给父级添加`position:relative`
- Png 透明 使用js代码 改
- Min-height 最小高度
  - ！Important 解决
- select 在ie6下遮盖
  - 使用iframe嵌套
- 为什么没有办法定义1px左右的宽度容器
  - （IE6默认的行高造成的，使用`over:hidden,zoom:0.08 line-height:1px`）
- IE5-8不支持`opacity`
```
//解决办法
.opacity {
    opacity: 0.4
    filter: alpha(opacity=60); /* for IE5-7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
}
```
- IE6不支持PNG透明背景
  - IE6下使用gif图片


#### 41、对WEB标准以及W3C的理解与认识
- 标签闭合、
- 标签小写、
- 不乱嵌套、
- 提高搜索机器人搜索几率、
- 使用外链css和js脚本、
- 结构行为表现的分离、
- 文件下载与页面速度更快、
- 内容能被更多的用户所访问、
- 内容能被更广泛的设备所访问、
- 更少的代码和组件，容易维护、
- 改版方便，不需要变动页面内容、
- 提供打印版本而不需要复制内容、
- 提高网站易用性


#### 42、常用行内元素有哪些?块级元素有哪些?CSS的盒模型？
- 块级元素：
  - `div p h1-h6 form ul li ol dl dt dd`
- 行内元素:
  - `a b i span input select img`
- inline-block元素
  - `input img button texterea label`
- Css盒模型:
  - `content，border ,margin，padding`
- 空(void)元素:
  - `<br> <hr> <img> <input> <link> <meta>`


#### 43、CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？
- id选择器（ # myid）
- 类选择器（.myclassname）
- 标签选择器（div, h1, p）
- 相邻选择器（h1 + p）选中h1之后的P，且有相同的父元素
- 子代选择器（ul > li）
- 后代选择器（li a）
- 通配符选择器（ * ）
- 属性选择器（a[rel = "external"]）
- 伪类选择器（a: hover, li: nth - child）

- 不可继承：
> `display、margin、border、padding、background、height、min-height、max- height、width、min-width、max-width、overflow、position、left、right、top、 bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、 page-bread-before、unicode-bidi`

- 所有元素可继承：
> `visibility、cursor`

- 内联元素可继承：
> `letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction`

- 块级元素可继承：
> `text-indent、text-align`

- 列表元素可继承：
> `list-style、list-style-type、list-style-position、list-style-image`

- 表格元素可继承：
> `border-collapse`

- [继承性](http://blog.163.com/yhwwen@126/blog/static/170468853201326421822/)

- 优先级


- CSS3新增伪类举例：
  - `p:first-of-type` 选择属于其父元素的首个 `<p>` 元素的每个 `<p>` 元素
  - `p:last-of-type` 选择属于其父元素的最后 `<p>`元素的每个`<p>`元素
  - `p:only-of-type` 选择属于其父元素唯一的 `<p>` 元素的每个 `<p>` 元素
  - `p:only-child` 选择属于其父元素的唯一子元素的每个 `<p>` 元素
  - `p:nth-child(2)`  选择属于其父元素的第二个子元素的每个 `<p>` 元素
  - `:enabled、:disabled` 控制表单控件的禁用状态
  - `:checked`，单选框或复选框被选中

- 伪元素选择器：
  - `E::before`
  - `E::after`
  - 是一个行内元素，需要转换成块元素
> E:after、E:before 在旧版本里是伪类，在新版本里是伪元素
> 新版本下E:after、E:before会被自动识别为E::after、E::before，按伪元素来对待，这样做的目的是用来做兼容处理


#### 44、经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用hack的技巧 ？
- **IE下**
  - even对象有x,y属性,但是没有pageX,pageY属性;
- **Firefox下**
  - event对象有pageX,pageY属性,但是没有x,y属性
- **IE下**
  - 可以使用获取常规属性的方法来获取自定义属性, 也可以使用·getAttribute()·获取自定义属性;
- **Firefox下**
  - 只能使用·getAttribute()·获取自定义属性.
- **解决方法:**
  - 统一通过getAttribute()获取自定义属性
- **（条件注释）**
  - 缺点是在IE浏览器下可能会增加额外的HTTP请求数
- **Chrome**
  - 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 `-webkit-text-size-adjust: none;` 解决


#### 45、CSS样式的层叠性和继承性：
- 一、层叠：优先级相同的情况下，CSS前面的样式会被最后的样式覆盖（与样式定义顺序有关，与调用样式顺序无关）

- 二、继承：标签之间的关系属于嵌套关系
【颜色（color）、大小（font-size）、字体（font-family）、粗细（font-style）、行高（line-height）有关文字的相关属性都可被继承】

- ★继承属性特殊标签：（有默认样式的标签不能直接继承父元素中修改其默认样式的样式设置，如要修改则需    直接  设定）
  - 1、a标签不能直接继承父元素中的颜色样式

  - 2、标题标签不能直接继承父元素中的字体大小

- 三、优先级：【优先级不同则按优先级，相同则进行叠加】    !important>行内样式>ID选择器>类选择器>标签选择器
```
★!important>行内样式选择器>ID选择器>类选择器>标签选择器>所有标签选择器（通配符选择器）>继承样式>默认样式

★继承权重为0（当子元素有自己设置的样式时，父级元素的样式不会覆盖其自己设置的样式）

★权重叠加（优先级之间权重可以进行叠加，叠加后权重越高优先级越高）
```


#### 46、javascript的typeof返回哪些数据类型

|简单数据类型|
| :------: |
|number|
|string|
|boolean|
|object|
|function|
|undefined|

```
Undefined+100= NaN
Null+100=100
```

> **注意:类型返回值都是字符串、而且都是小写打头**

```
1.alert(typeof [1, 2]); //object
2.alert(typeof 'abc'); //string
3.var i = true;
  alert(typeof i); //boolean
1. alert(typeof 1); //number
2. var a;
  alert(typeof a); //undefined
6、function a(){};
alert(typeof a) //function
```


#### 47、例举3种强制类型转换和2种隐式类型转换
- 强制类型转换（显示类型转换）：
  - 利用强制类型转换运算符进行转换，这种强制转换的过程叫做强制类型转换。
    - parseInt()把字符串转换成整数
    - parseFloat()把字符串转换成浮点数
    - Number()可以把任意值转换成数值，如果要转换的字符串中有一个不是数值的字符，返回NaN

- 自动类型转换（隐式类型转换）：
  - 是指不需要书写代码，由系统自动完成的类型转换
    - `+、-、*、/`可进行隐式转换


#### 48、split() 、join()、slice()、splice() 的区别
- `join()`
  - 将数组的值拼接成字符串
```
var arr = [1,2,3,4,5];
console.log(arr.join());//1,2,3,4,5 空的默认逗号
console.log(arr.join("."));//1.2.3.4.5
console.log(arr.join(""));//12345
```

- `toString()`方法
  - 将数组转换成字符串,调用了join方法
  - 和join的默认方法是等价的

- `split(delimiter, limit)`
  - 里面传什么参数，就将字符串里面的那个字符替换成**`，`**
  -
```
var str1 = "1,2,3";
var str2 = "1|2|3";
var arr1 = str1.split(",");
console.log(arr1);//[1,2,3]
var arr2 = str2.split("|");
console.log(arr2);//[1，2，3]
var arr3 = str2.split("");
console.log(arr3);//[1，|，2，|，3]
var arr4=str2.split();
console.log(arr4);//返回一个数组，数组长度为1，arr4[0]=1|2|3
```

- `slice(start, end)`
  - 方法可从已有的数组中返回选定的元素，一个新数组，包含从start到end(不包括该元素)指定的array元素。
  -
  - 该方法并不会修改数组，而是返回一个子数组。
  - 如果想删除数组中的一段元素，应该使用方法 Array.splice()

- `splice(start, deleteCount, value1, value2, ...)`
- 从start开始，删除deleteCount个元素（如果没有deleteCount，则删除全部元素），并用value替换（如果有的话）
- 虽然spllce()方法与slice()方法名字相似，但作用不同，方法splice()直接修改数组


#### 49、数组方法pop()、push()、unshift()、shift()
- unshift()
  - 从前面添加元素，返回新数组的length
- push()
  - 从后面推入元素，返回新数组的length
- shift()
  - 从前面删除元素，返回被删除的元素
- pop()
  - 从后面删除元素，返回被删除的元素


#### 50、事件绑定和普通事件有什么区别
- 普通添加事件的方法：
```
var btn = document.getElementById("hello");

btn.onclick = function(){
  alert(1);
}

btn.onclick = function(){
  alert(2);
}

//执行上面的代码只会alert 2
```

- 事件绑定方式添加事件：
```
var btn = document.getElementById("hello");

btn.addEventListener("click",function(){
  alert(1);
},false);

btn.addEventListener("click",function(){
  alert(2);
},false);

//执行上面的代码会先alert 1 再 alert 2
```

> 普通添加事件的方法不支持添加多个事件，最下面的事件会覆盖上面的，
> 而事（addEventListener）方式添加事件可以添加多个

- **问题**
  - addEventListener不兼容低版本IE
  - (IE678使用attachEvent方式添加事件)
```
// 在IE678里面不支持addEventListener和removeEventListener，而是支持attchEvent和detachEvent两个方法
// 给任意对象注册任意事件
function addEvent(element, type, fn) {
    //能力检测
    if(element.addEventListener) {
        //支持addEventListener
        element.addEventListener(type, fn, false);
    }else if(element.attachEvent) {
        //IE678支持attachEvent
        element.attachEvent("on"+type, fn);
    }else {
        element["on"+type] = fn;
    }
}
```


#### 51、IE和DOM事件流的区别
- **（1）事件传播过程不同**
  - DOM标准下的事件流：
    - **事件捕获阶段---->处于目标阶段---->事件冒泡阶段**
    - *目前`IE9、Opera、Firefox、Chrome、Safari`都支持DOM事件流。*
  - IE事件流：
    - 事件冒泡流，（ie8及更早版本）事件传播过程为事件冒泡流

- **（2）注册事件监听方式**
  - 注册事件方法不同；
  - 参数个数不同；
  - 参数里事件名不同；
  - 函数内部this指向不同

- **DOM标准浏览器：**
  - 1．绑定事件：`addEventListener()`；删除事件：`removeEventListener()`
  - 2．三个参数：（事件名，事件处理函数， 一个布尔值）
    - true，表示在捕获阶段调用事件处理程序
    - false，表示在冒泡阶段调用事件处理程序
  - 3．事件名指的是`click`，`mouseover`这样的事件名，`不带on`
  - 4 . 事件处理程序在其依附的元素的作用域中运行,**this指向当前元素**
    - IE浏览器（ie8及其更早版本）：
      - 1．绑定事件：attachEvent()；删除事件：detachEvent()。
      - 2．两个参数：（事件处理程序名，事件处理函数）
      - 3．事件处理程序名指的`onclick`这样带`on`的名字


#### 52、call和apply的区别

> `call` 和 `apply` 是来自于`Function.prototype`里面的两个方法
> **共同点：**
> 是可以指定**这个函数**执行时内部this的指向
>
> **不同点：**
> 传参形式不同

- **call**
  - 语法：
    - `函数名.call ( 自定义的this指向，实参1，实参2，实参3，... ) ;`
  - **注意：**
    - 第一个参数只是为了指定函数执行时this的指向，并不会作为参数传进去，后面的才是要传入执行的参数

```javascript
function add(a, b)  {
    console.log(a + b);
}
add.call(300, 10, 20);  // 300 不参加传入函数，结果为30
```

- **apply**
  - 语法：
    - `函数名.apply ( 自定义的this指向，[实参1，实参2，实参3...] ) ;`
  - 注意：
    - 第一个参数只是为了指定函数执行时this的指向，并不会作为参数传进去
    - 第二个参数要求是**数组或伪数组**，apply会自动把数组中的内容平铺后传入到函数中

```javascript
function add(a, b)  {
    console.log(a + b);
}
add.apply(300, [50, 50]);  // 数组  结果100
add.apply(300, { 0:20, 1:20, length:2 });  // 伪数组  结果40
```


#### 53、如何阻止事件冒泡和默认事件
- 1、**阻止事件冒泡：**
```
//DOM标准事件流浏览器：
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
  alert("Clicked");
  event.stopPropagation();//Function类型，取消事件的进一步捕获或冒泡
};

/*-------------------------------------------------*/
Ie8及其更早：
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
  alert("Clicked");
  window.event.cancelBubble = true;// 布尔类型，表明是否可以取消事件的默认行为
};

/*-------------------------------------------------*/

function stopPropagation(event)｛
  event= event || window.event;
if(event. stopPropagation()){
  event. stopPropagation();
}else{
  event. cancelBubble = true;
  }
｝
```
- 2、**默认行为：**
  - html标签所具有的默认行为
  - 例如：
    - 点击a标签，就会默认跳转到指定的页面
    - 点击`submit`按钮，就会自动提交表单
  - 适用场景：
    - 1、异步操作
    - 2、提交表单之前对表单进行一些基本的验证，比如邮箱是否合法，用户名是不是满足指定的格式
    - 3、为了不让a点击之后跳转，我们就要给他的点击事件进行阻止
    - 4、文本框获得焦点
> 阻止默认行为：
>
> IE9之前：`window.event.returnValue=false;`
> IE9+ FF Chrome： `e.preventDefault();`

#### 54、添加、插入、替换、移除、创建和查找某个节点
- 创建新节点
```
createDocumentFragment()    //创建一个DOM文档片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```

- 添加、移除、替换、插入
```
obj.appendChild(要添加的节点)
obj.insertBefore(要插入的节点，作为参照的节点)
obj.replaceChild(要插入的节点，被替换的节点)
obj.removeChild(要移除的节点)
```

- 查找
```
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementsByClassName() // 通过Class类名查找
getElementById()        //通过元素Id，唯一性
```



#### 55、javascript的本地对象，内置对象和宿主对象
- 本地对象
> ECMA-262把本地对象定义为独立于宿主环境的ECMAScript实现的对象

Object、
Function、
Array、
String、
Number、
Date、
RegExp、
Boolean、
Error、
EvalError、
RangeError、
ReferenceError、
SyntaxError、
TypeError、
URIError

- 内置对象
> ECMA-262 对内置对象的定义是：
> “由ECMAScript 实现提供的、不依赖于宿主环境的对象，
> 这些对象在ECMAScript 程序执行之前就已经存在了。
> 是已经实例化的对象
>
> ECMA-262定义的内置对象只有两个：Global和Math

- 宿主对象
> 由ECMAScript实现的宿主环境提供的对象。
> 所有非本地对象都是宿主对象
>
> ECMAScript中的“宿主”就是我们网页的运行环境，即“操作系统”和“浏览器”
>
> 浏览器提供的对象（BOM）和DOM对象都是宿主对象。
> 以及ECMAScript官方未定义的对象（通过ECMAScript程序创建的对象）都属于宿主对象


#### 56、`window.onload` 和`$(document).ready(function)`的区别
- ①  执行时间
  - window.onload必须等到页面内包括图片的所有元素(包括元素的关联文件:背景图,插入图片等)加载完毕后才能执行
  - $(document).ready()是DOM(Document object mode)结构绘制()完毕后就执行，不必等到加载完毕

- ②  编写个数不同
  - window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个
  - $(document).ready()可以同时编写多个，并且都可以得到执行

- ③  简化写法
  - `window.onload没有简化写法`
  - `$(document).ready(function(){})可以简写成$(function(){});`


#### 57、`”==”和“===”的不同`
- “==”(不会自动转换类型)
> 约定：非空数据类型为null和undefined两种数据类型

  - 任何数据和NaN相比结果都为false
  -  null等于undefined
  -  null和非空类型相比结果为false
  -  undefined和非空类型相比结果为false
  -  数字和非空类型比较，先转换为数字再比较
  -  布尔和非空类型比较，先转换为数字再比较
  -  对象与对象比较内存地址
  -  对象与字符串，对象先转换为字符串再比较

- “===”
  - 会转换类型


#### 58、javascript的同源策略
> 概念:
> 一段脚本只能读取来自于同一来源的窗口和文档的属性，
> 这里的同一来源指的如果两个页面拥有相同的：
> **协议（protocol），**
> **端口（如果指定），**
> **和主机，**
> 那么这两个页面就属于同一个源（origin）


#### 59、JavaScript是一门什么样的语言，它有哪些特点？
- 1 .  javaScript一种直译式**脚本语言**
- 2 .  是一种动态类型、**弱类型**、**基于原型**的语言，内置支持类型
- 3 .  它的解释器被称为**JavaScript引擎**，为浏览器的一部分，广泛**用于客户端的脚本语言.**
-
- 基本特点:
  - 1．**是一种解释性脚本语言**（代码不进行预编译）
  - 2．主要用来向HTML（标准通用标记语言下的一个应用）页面添加交互行为
  - 3．可以直接嵌入HTML页面，但写成单独的js文件有利于结构和行为的分离
  - 4．**跨平台特性**，在绝大多数浏览器的支持下，可以在多种平台下运行（如Windows、Linux、Mac、Android、iOS等）


#### 60、变量声明提升
- 什么是变量提升:
  - 解析代码时，变量的声明和函数的声明，会被提升到变量和函数所在作用域的最上面，变量的赋值和函数的调用不会提升

- 在函数体内部声明变量，会把声明提升到函数体内部的顶端。只提升变量声明，变量的赋值不提升

```
//1、
var a = 18;
f1();
function  f1() {
    var b = 9;
    console.log(a);
    console.log(b);
    var a = ‘123’;
}
结果为:underfined    9
/*------------------------------------*/
2、
fn3();
    console.log(c);//9
    console.log(b);//9
    console.log(a);//9  undefined  报错
    function fn3() {
        var a = b = c = 9;
        console.log(a);//9
        console.log(b);//9
        console.log(c);//9
    }
```


#### 61、斐波那契数列
```
/*1，1，2，3，5，8，13，21,  34,  55,  89,  144…*/

var n1 = 1;
var n2 = 1;
var sum = 0;
for (var i = 3; i <= 11; i++) {
  //第3个数是前两个数的和   n1:第1个数   n2:第2个数
  sum = n1 + n2;
  //让n1和n2往后推一个数
  n1 = n2;
  n2 = sum;
  //为了下次循环计算下一个数
}
console.log(sum);
```


#### 62、不用第三方变量交换两个变量的值
```
var a = 4;
var b = 10;
a = b - a; //得到的 a 是 b 比 a 多的  a = 10 - 4 = 6
b = b - a;// b 减去 比原来 a 多的，剩下的就是 原来的a ， 现在 b 为 原来的a   b = 10 - 6 = 4
a = b + a;// 这时的 b 为 原来的 a  加上 原来b 比 a 多的 就得到了 原来的b 现在a为原来的b  a = 4 + 6 = 10
```


#### 63、Javascript中callee和caller的作用
- caller
  - 返回调用该函数的函数

- callee
  - 返回正在被执行的函数,也就是所指定的function对象的正文


#### 64、列举浏览器对象模型BOM里常用的至少4个对象，并列举window对象的常用方法至少5个
- BOM(浏览器对象模型)里常用的对象
  - window, 是JS的最顶层对象，其他的BOM对象都是window对象的属性
  - document, 文档对象
  - location, 浏览器当前URL信息
  - screen, 客户端屏幕信息
  - history, 浏览器访问历史信息
  - navigator,浏览器本身信息

- window对象的常用方法
  - alert(),
  - confirm(),
  - prompt(),
  - open(),
  - close()


#### 65、Javascript创建对象的几种方式
- 简单对象的创建 使用对象字面量的方式{}
- 创建一个对象，相当于new一个类的实例(无参构造函数)
- 可以使用有参构造函数来实现，这样定义更方便，扩展性更强（推荐使用）
- 使用工厂方式来创建（Object关键字）
- 使用原型对象的方式  prototype关键字
- 混合模式(原型和构造函数)
- 动态原型的方式(可以看作是混合模式的一种特例)



#### 67、iframe的优缺点
- 优点：
  - 解决加载缓慢的第三方内容如图标和广告等的加载问题
  - 解决Security sandbox（沙坑）
> 仅发生在google排名中的一种现象。 Google会给新网站额外加一定的分值，使新网站排名迅速上升（某几种关键字），随后一到三、四个月网站排名会下降，有的主要关键字会逐渐消失（尽管按页面没有变化），类似于沙漠中的沙流被吞

  - 并行加载脚本

- 缺点：
  - iframe会阻塞主页面的Onload事件
  - 即使内容为空，加载也需要时间
  - 没有语意


#### 68、请你谈谈Cookie的弊端
- 缺点：
  - Cookie数量和长度的限制
    - 每个domain（特定域名）最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉
  - 安全性问题
    - 如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了
  - 有些状态不可能保存在客户端



#### 69、js延迟加载的方式有哪些
- `defer`和`async`（异步加载）
```javascript
/*1.  <script src="script.js"></script>
没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
2.  <script async src="script.js"></script>
有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。
3.  <script defer src="myscript.js"></script>
有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。
*/
```
**从实用角度来说，首先把所有脚本都丢到 </body> 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析**

- 动态创建DOM方式（用得最多）
- 按需异步载入js


#### 70、document . write和 innerHTML 的区别
- 一：
  - document.write是javascript中的代码。 document.write = "hello";可以直接这样写
  - object.innerHTML= "hello";需要有对象才能执行这个属性

- 二：
  - Document . write 只能重绘整个页面
  - innerHTML 可以重绘页面的一部分


#### 71、哪些操作会造成内存泄漏
- 内存泄漏是
- 指你向系统申请分配内存进行使用(new)，可是使用完了以后却不归还(delete)，结果你申请到的那块内存你自己也不能再访问（也许你把它的地址给弄丢了），而系统也不能再次将它分配给需要的程序
> [内存泄漏的问题](http://www.ibm.com/developerworks/cn/web/wa-jsmemory/)

- 1、setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
  - setTimeout() 接受一个字符串参数时,它执行于全局作用域,也就是说,它位于任何函数之外.最简单的修复手段就是使用一个局部函数(匿名函数)来解决这个问题

- 2、闭包

- 3、控制台日志

- 4、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）


#### 72、事件委托是什么
- 通俗的讲，事件就是onclick，onmouseover，onmouseout，等
- 而委托，就是让别人来做这个事件，本来是加在某些元素上的，然而你却加到别人身上来完成这个事件。
- 也就是：利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发


#### 73、解释jsonp的原理，以及为什么不是真正的ajax（总结一下）
- jsonp的原理：
  - jsonp是用来解决跨域获取数据的一种解决方案，具体是通过动态创建script标签，然后通过标签的src属性获取js文件中的js脚本，该脚本的内容是一个函数调用，参数就是服务器返回的数据，为了处理这些返回的数据，需要事先在页面定义好回调函数，本质上使用的并不是ajax技术

> JSONP(JSON with Padding)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。
> 利用` <script> `元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。
> 用 JSONP 抓到的资料并不是 JSON，而是任意的JavaScript，用 JavaScript 直译器执行而不是用 JSON 解析器解析

- jsonp为什么不是ajax：
  - 1、ajax和jsonp这两种技术在调用方式上“看起来”很像，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装
  - 2、但ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XmlHttpRequest获取非本页内容，而jsonp的核心则是动态添加`<script>`标签来调用服务器提供的js脚本
  - 3、所以说，其实ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理一样可以实现跨域，jsonp本身也不排斥同域的数据的获取
  - 4、还有就是，jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。
  - 总而言之，jsonp不是ajax的一个特例，哪怕jquery等巨头把jsonp封装进了ajax，也不能改变这一点！


#### 74、字符串反转，如将 '12345678' 变成 '87654321'
```javascript
//思路：先将字符串转换为数组 split()，再利用数组的反序函数 reverse()颠倒数组，再利用 jion() 转换为字符串
var str = '12345678';
str = str.split('').reverse().join('');
```


#### 75、`window.location`
> location是javascript里边管理地址栏的内置对象

- `window.location.search()`
  - 截取当前url中“?”后面的字符串
  - 例如：index.php?act=doctor,截取后的字符串就是act=doctor

- `window.location.hash()`
  - 返回锚点
>  比如打开某个地址 `http://www.example.com#archor`那么`window.location.hash`就是`http://www.example.com#archor`
`window.location.hash`是`#archor`

- `window.location.reload()`
  - 刷新当前页面


#### 76、javascript 中的垃圾回收机制
> 目的就是为了防止内存泄露

- 在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。
- 如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。
- 因为函数a被b引用，b又被a外的c引用，这就是为什么  函数a执行后不会被回收的原因


#### 77、精度问题: JS 精度不能精确到 0.1 所以
- JavaScript 是一门弱类型的语言，只有一种数字类型 Number，而且在Javascript中所有的数字都是以IEEE-754标准格式表示的。
- 浮点数的精度问题不是JavaScript特有的，从设计思想上就没有对浮点数有个严格的数据类型，因为有些小数以二进制表示位数是无穷的


#### 78、Hack(主要针对IE浏览器)
> 不同的浏览器对CSS的解析结果是不同的，因此会导致相同的CSS输出的页面效果不同，
> 这就需要CSS Hack来解决浏览器局部的兼容性问题。
> 而这个针对不同的浏览器写不同的CSS 代码的过程，就叫CSS Hack。
> 条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。
> 可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等

- CSS Hack常见的有三种形式
  - CSS属性Hack
  - CSS选择符Hack
  - IE条件注释Hack

- 属性级Hack：
  - 比如IE6能识别下划线`'_'`和星号`'*''`，
  - IE7能识别星号`'*''`，但不能识别下划线`'_'`，
  - 而firefox两个都不能认识

- 选择符级Hack：
  - 比如IE6能识别`*html .class{}`，
  - IE7能识别`*+html .class{}`或者`*:first-child+html .class{}`
- IE条件注释Hack：
  - IE条件注释是微软从IE5开始就提供的一种非标准逻辑语句
  - 对所有IE：
    - `<!–[if IE]><!–代码–><![endif]–>`
  - 针对IE6及以下版本:
```
<!–[if lt IE 7]>
  <!–代码–>
<![endif]–>
```


#### 79、为什么不能定义1px左右的div容器？
- 因为在IE6浏览器中，容器的高度不是1px 而是18px，IE6下这个问题是因为**默认的行高**造成的
- 解决的方法例如：
```css
overflow:hidden
zoom:0.08/1
line-height:1px
```


#### 80、如何在HTML中添加事件，几种方法？
- 1、标签内直接添加 `onclick="fun(){}";`
- 2、利用JS添加`E.onclick="fun(){}";`
- 3、现代事件
  - IE： `E.attachEvent('onclick', method);`
  -  FF: `E.addEventListener('click', method, false);`
    -  true，表示在捕获阶段调用事件处理程序；
    -  false，表示在冒泡阶段调用事件处理程序。 （默认，可以省略不写）


#### 81、bind(), live(), delegate()的区别
> [参考](http://kb.cnblogs.com/page/94469/)

- bind：
  -  绑定事件，能注册多个事件，对新添加的事件不起作用
  -  用于将一个处理程序附加到每个匹配元素的事件上并返回jQuery对象
  -  **不支持动态创建出来的元素绑定事件**

- live：
  - 将一个事件处理程序附加到与当前选择器匹配的所有元素**（包含现有的或将来添加的）**的指定事件上并返回jQuery对象

- delegate：(委托代理)
  - 基于一组特定的根元素，将处理程序附加到匹配选择器的所有元素**（现有的或将来的）**的一个或多个事件上。**（一定要注册到相同的父元素上）**
  - 为什么delegate支持动态绑定事件？
    - 原因是事件**冒泡机制**。因为事件时绑定到父元素上的，由子元素触发

> 用.bind()的代价是非常大的，它会把相同的一个事件处理程序hook到所有匹配的DOM元素上
> 不要再用`.live()`了，它已经不再被推荐了，而且还有许多问题
> `.delegate()`会提供很好的方法来提高效率，同时我们可以添加一事件处理方法到动态添加的元素上。
> 我们可以用`.on()`来代替上述的3种方法


#### 82、你如何优化自己的代码？
- 代码重用
- 避免全局变量（命名空间，封闭空间，模块化mvc..）
- 拆分函数避免函数过于臃肿
- 添加注释

- 字符串的拼接
> 字符串的拼接在我们开发中会经常遇到，所以我把其放在首位，
> 我们往往习惯的直接用`+=`的方式来拼接字符串，
> 其实这种拼接的方式效率非常的低，我们可以用一种巧妙的方法来实现字符串的拼接，那就是利用数组的join方法

- for循环

- 减少页面的重绘
  - 减少页面重绘虽然本质不是JS本身的优化，但是其往往是由JS引起的，而重绘的情况往往是严重影响页面性能的

- 减少作用域链上的查找次数

- 避免双重解释
  - 双重解释的情况也是我们经常会碰到的，有的时候我们没怎么考虑到这种情况会影响到效率，
  - 双重解释一般在我们使用eval、new Function和setTimeout等情况下会遇到


#### 83、为什么扩展javascript内置对象不是好的做法？
> 因为你不知道哪一天浏览器或javascript本身就会实现这个方法，而且和你扩展的实现有不一致的表现。
> 到时候你的javascript代码可能已经在无数个页面中执行了数年，而浏览器的实现导致所有使用扩展原型的代码都崩溃了


#### 84、什么是三元表达式？“三元”表示什么意思？
- 又叫三元运算符
  - `条件 ? 结果1 : 结果2;`
  - 满足条件时结果1否则结果2
```
var max = (num1 > num2) ? num1 : num2;
```


#### 85、HTTP状态码有哪些，分别表示什么？
- **100-199**
  - 用于指定客户端应回应的某些动作

- **200-299**
  - 表示**请求已成功**，请求所希望的响应头或数据体将随此响应返回

- **300-399**
  - 用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息

- **302**
  - 请求的**资源临时从不同的URl响应 请求**，但请求者应继续使用原有位置来进行以后的请求

- **400-499**
  - 用于指出客户端的错误

- **400**
  - 语义有误，当前请求无法被服务器理解

- **401**
  - 当前请求需要用户验证

- **403**
  - **服务器已经理解请求，但是拒绝执行它**。
  - 与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。（**禁止访问**）

- **404**
  - **请求失败**，
  - 请求所希望得到的资源未被在服务器上发现。
  - 没有信息能够告诉用户这个状况到底是暂时的还是永久的。
  - 假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。
  - 404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下

- **500**
  - 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。（**服务器内部错误**）

- **500-599**
  - 用于支持服务器错误

- **503**
  - 服务器当前不能处理客户端的请求，一段时间后可能恢复正常


#### 86、列举常用的web页面开发，调试以及优化工具
- `Firebug`
  - 一个非常成熟和完善的工具
> irefox下的一个插件,能够调试所有网站语言,如Html,Css等
> FireBug具有javascript调试功能，使用起来非常方便，而且在各种浏览器下都能使用（IE,Firefox,Opera, Safari）。
> 除此之外，其他功能还很强大。比如html,css,dom的察看与调试，网站整体分析等等。
> 总之就是一整套完整而强大的 WEB开发工具
>
> [Firebug官网](http://getfirebug.com/)

- Google Chrome和Safari开发工具
  - 基于`webkit`开源项目

- `Developer Toolbar`
  - IE浏览器开发工具


#### 87、jQuery框架中`$.ajax()`的常用参数有哪些？写一个post请求并带有发送数据和返回数据的样例
- async
  - 是否异步
  - async默认的设置值为true，这种情况为异步方式，
  - 就是说当ajax发送请求后，在等待server端返回的这个过程中，前台会继续执行ajax块后 面的脚本，直到server端返回正确的结果才会去执行success，也就是说这时候执行的是两个线程，ajax块发出请求后一个线程和ajax块后面的脚本（另一个线程）
```javascript
$.ajax({
           type:"POST",
           url:"Venue.aspx?act=init",
           dataType:"html",
           success:function(result){   //function1()
              f1();
              f2();
           }
            failure:function (result) {
               alert('Failed');
           },
   }
  function2();

/*
  在上例中，当ajax块发出请求后，他将停留function1()，等待server端的返回，
  但同时（在这个等待过程中），前台会去执行function2(),
  也就是说，在这个时候出现两个线程，我们这里暂且说为function1() 和function2()。
  当把async设为false时，这时ajax的请求时同步的，
  也就是说，这个时候ajax块发出请求后，他会等待在function1（）这个地方，不会去执行function2()，直到function1()部分执行完毕。

注：success中的方法f1(),f2()一般（即f1(),f2()不包括ajax块时）不会异步执行，就是说f2的执行是以f1()为前提的
*/
```

- url
  - 请求地址

- contentType
  - 发送信息至服务器时内容编码类型
  - 默认值: `"application/x-www-form-urlencoded"`

- data
  - 发送到服务器的数据
  - 这里的参数一定要是**json格式的字符串**，记住是字符串格式，如：" {aa:11,bb:22,cc:33 , ...}"。如果你写的不是字符串，那jquery会把它实序列化成字符串，那么在服务器端接受到的就不是json格式了，且不能为空，即使没有参数也要 写成"{}"

- dataType
  - 预期服务器返回的数据类型
  - 必须是string类型

- type
  - 请求类型

- success
  - 请求成功回调函数

- error
  - 请求失败回调函数

```
$.ajax({
url: "/jquery/test1.txt",
type: 'post',
data: {
  id: 1
},
success: function(data) {
  alert(data);
  }
}
```


#### 88、CSS3有哪些新特性？
- 圆角（border-radius）
- 阴影（box-shadow）
- 文字加特效（text-shadow）
- 线性渐变（gradient）
- 旋转（transform）
  - `transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);`// 旋转,缩放,定位,倾斜
- w3c的CSS3规范中规定：:单冒号，用于伪类，::双冒号，用于伪元素
- 媒体查询@media
- 多栏布局flex


#### 89、html5有哪些新特性、移除了那些元素
- 新特性
  - 拖拽释放(Drag and drop) API
  - 语义化更好的内容标签`（header,nav,footer,aside,article,section）`
  -  音频、视频API
    -  `(audio,video)`
  -  画布(Canvas) API
  -  地理(Geolocation) API
  -  localStorage
    -  本地离线存储，长期存储数据，浏览器关闭后数据不丢失
  -  sessionStorage
    -  数据在浏览器关闭后自动删除
  -  表单控件
    -  `calendar、date、time、email、url、search`
  - 新的技术
    - `webworker, websocket, Geolocation`

- 移除的元素
  - 纯表现的元素：
    - `basefont，big，center，font, s，strike，tt，u`
  - 对可用性产生负面影响的元素：
    - `frame，frameset，noframes`

- 支持HTML5新标签
  - 基本原理是在使用新标签之前通过dom操作创建这些标签，那么这些标签就可以在低版本浏览器上显示了

> IE8/IE7/IE6支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式（当然最好的方式是直接使用成熟的框架、使用最多的是html5shim框架）：
```
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
```
> 如何区分：
> DOCTYPE声明新增的结构元素、功能元素


#### 90、本地存储（Local Storage ）和cookies（储存在用户本地终端上的数据）之间的区别是什么？
- Cookies:
  - 服务器和客户端都可以访问；
  - 大小只有4KB左右；
  - 有有效期，过期后将会删除

- 本地存储：
  - 只有本地浏览器端可访问数据，服务器不能访问本地存储直到故意通过POST或者GET的通道发送到服务器；
  - 每个域5MB；
  - 没有过期数据，它将保留直到用户从浏览器清除或者使用Javascript代码移除


#### 91、如何实现浏览器内多个标签页之间的通信
- 调用 localstorge、cookies 等本地存储方式
- 使用本地存储方法

- storage
  - 只是在客户端使用，不会请求服务器处理,
  - 存储量比较大,只能存储字符串，非字符串的数据在存储之前会被转换为字符串
  - seessionStorage
    - 临时性的，页面打开有，页面关闭没有
    - 数据不共享
  - localStorage
    - 永久性的存储
    - 数据共享
   - api
     - clear（）删除所有值，ff中没有实现
     - getItem（）根据指定的名字name获取对应的值
     -  key（index）获得index处的值
     -   removeItem（name）删除由name指定的明值对
     -  setItem(name，value)


#### 92、你如何对网站的文件和资源进行优化
- 文件合并
  - 目的是减少http请求
  - Web性能优化最佳实践中最重要的一条是减少HTTP 请求，它也是YSlow中比重最大的一条规则
> 减少HTTP请求的方案主要有合并JavaScript和CSS文件、CSS Sprites、图像映射 （Image Map）和使用Data URI来编码图片。
> CSS Sprites和图像映射现在已经随处可见了，但由于IE6和IE7不支持Data URI以及性能问题，这项技术尚未大量使用。
> 目前大部分网页中的JavaScript和CSS文件数量和开发时一致，少量的网页会根据实际情况采取本地合 并，这些合并中相当多的是有选择地手动完成，每次新的合并都需要重新在本地完成并上传到服务器，比较的随意和繁琐，同样文件的压缩也有类似的情况。而利用 服务端的合并和压缩，我们就可以按照开发的逻辑尽可能让文件的颗粒度变小，利用网页中URL的规则来自动实现文件的合并和压缩，这会相当的灵活和高效
> [**参照**](http://www.iamued.com/qianduan/1462.html)

- 文件最小化/文件压缩
  - 目的是直接减少文件下载的体积；常用的工具是YUI Compressor
  - [**参考**](http://www.cnblogs.com/Darren_code/archive/2011/12/31/property.html)

- 使用CDN托管
> 其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。
> 通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上

- 缓存的使用


> 1、尽量减少 HTTP 请求
> 2、使用浏览器缓存
> 3、使用压缩组件
> 4、图片、JS的预载入
> 5、将脚本放在底部
> 6、将样式文件放在页面顶部
> 7、使用外部的JS和CSS
> 8、精简代码



#### 93、什么是响应式设计
> 它是关于网页制作的过程中让不同的设备有不同的尺寸和不同的功能。
> 响应式设计是让所有的人能在这些设备上让网站运行正常

- 响应式布局：
  - **利用媒体查询**可以检测到屏幕的尺寸（主要检测宽度），并设置不同的CSS样式，就可以实现响应式的布局。
  - 我们利用响应式布局可以满足不同尺寸的终端设备非常完美的展现网页内容，使得用户体验得到了很大的提升
  - 但是为了实现这一目的我们不得不利用媒体查询写很多冗余的代码，使整体网页的体积变大，应用在移动设备上就会带来严重的性能问题。
  - 响应式布局常用于企业的官网、博客、新闻资讯类型网站，这些网站以浏览内容为主，没有复杂的交互


#### 94、新的 HTML5 文档类型和字符集是
- HTML5文档类型：
  - `<!doctype html>`

- HTML5使用的编码：
  - `<meta charset=”UTF-8”>`


#### 95、HTML5 Canvas 元素有什么用
- Canvas 元素用于在网页上绘制图形，该元素标签强大之处在于可以直接在 HTML 上进行图形操作
- 可用于：
  - 游戏、可视化数据(重点)、banner 广告、多媒体、模拟仿真、远程操作、图形编辑


#### 96、如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
- IE8/IE7/IE6支持通过 `document.createElement`方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式
```
//例如：
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i= e.length;
while (i--){
    document.createElement(e[i])
}
//添加标签默认的样式：
article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}
```

- 当然最好的方式是直接使用成熟的框架、使用最多的是html5shim框架
```
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

- 如何区分 HTML 和 HTML5
  - DOCTYPE声明、新增的结构元素、功能元素
  - HTML5 关于图像，位置，存储，地理定位等功能的增加
    - 新增的元素:
      - 绘画： canvas 元素
      - 用于媒介回放的 video 和 audio 元素
      - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
      - sessionStorage 的数据在浏览器关闭后自动删除
      - 语意化更好的内容元素，比如 article、footer、header、nav、section
      - 表单控件，calendar、date、time、email、url、search
      - CSS3实现圆角，阴影，对文字加特效，增加了更多的CSS选择器  多背景 rgba
      - 新的技术webworker, websockt, Geolocation

    - 移除的元素
      - 纯表现的元素：basefont，big，center，font, s，strike，tt，u；
      - 对可用性产生负面影响的元素：frame，frameset，noframes


#### 97、你怎么来实现页面设计图，你认为前端应该如何高质量完成工作? 一个满屏 品 字布局 如何设计？
- 首先划分成头部、body、脚部
- 实现效果图是最基本的工作，精确到2px
  - 参照图尺寸衡量误差不能超过2px
- 与设计师，产品经理的沟通和项目的参与
- 做好的页面结构，页面重构和用户体验
  - 搭建过程中可能会出现需求更改 等等问题 ，交流沟通就格外重要
- 处理hack，兼容、写出优美的代码格式
- 针对服务器的优化、拥抱 HTML5


#### 98、知道css有个content属性吗？有什么作用？有什么应用？
- css的content属性专门应用在 before/after 伪元素上，用来插入生成内容
- 用法：
- 1、可以添加任意的字符串
```
p:before{
      content:“网站名:”;
}

p:after{
      content:“网站名:”;
}
```

- 2、可以使用UTF-8特殊字符
```
p:after{
  content:“\21E0″
}
```

- 3、使用url()可以载入外部资源，主要是一些图标和图片，如果资源不可以显示有的浏览器会忽略它，有的会显示替代文本
```
p:before{
  content:url(http://yeebing.u.qiniudn.com/wp-content/themes/expound/images/favicon.ico);
}
```

- 4、HTML元素属性
```
p:before{
  content:attr(title)“:”;
}
```

- 5、最常见的应用是利用伪类清除浮动
```
//一种常见利用伪类清除浮动的代码
.clearfix:after {
    content:"."; //这里利用到了content属性
    display:block;
    height:0;
    visibility:hidden;
    clear:both; }
.clearfix {
    *zoom:1;
}

//after伪元素通过 content 在元素的后面生成了内容为一个点的块级素，再利用clear:both清除浮动
```

#### 99、css计数器（序列数字字符自动递增）是什么，如何通过css content属性实现css计数器？
> css计数器就是采用css给一些html元素自动生成编号
> 是通过设置counter-reset（重置计数器默认值） 、counter-increment（增加计数器） 两个属性 、及 counter()/counters()获取计数一个方法配合after / before 伪类实现

- 第一步：初始化计数器



#### 100、如何在 HTML5 页面中嵌入音频
```
<video src="" controls="controls" autoplay loop></video>

<!--兼容写法-->
<video controls="controls" autoplay>
      <source src=""/>
      <source src=""/>
      <source src=""/>
      <!--对不起你的浏览器不支持此功能！-->
</video>
```


#### 101、如何在 HTML5 页面中嵌入视频
```
<audio src="" autoplay controls loop></audio>

<!--兼容写法-->
<audio autoplay controls>
      <source src=""/>
      <source src=""/>
      <source src=""/>
      <!--对不起你的浏览器不支持此功能！-->
</audio>
```


#### 102、Zepto库和JQ区别
- Zepto相对jQuery更加轻量
- 主要用在移动设备上，只支持较新的浏览器，好处是代码量比较小，性能也较好。
- jquery主要是兼容性好，也有对应的jQuerymobile移动端框架，可以跑在各种pc，移动上，
  - 好处是兼容各种浏览器，
  - 缺点是代码量大，同时考虑兼容，性能也不够好。
  - 所以jquery的2.x版本是不支持ie6 7 8的
- [详细介绍](http://www.cnblogs.com/colima/p/5289386.html)


#### 103、HTML5 引入什么新的表单属性
- **输入类型**  (表单类型，表单元素，表单属性,表单事件.)
  - `email` 输入email格式,当提交表单时会自动验证email域的值
  -` tel `手机号码
  - `url` 只能输入url格式
  - `number `只能输入数字, 类型会根据你的设置提供选择数字的功能，min属性设置最小值、max属性设置最大值，value属性设置当前值，step属性设定每次增长的值，某些浏览器还不支持
  - `search` 搜索框
  - `range` 范围 滑动条 , 用于应该包含一定范围内数字值的输入域，其会以一个滑块的形式展现，min属性设置最小值、max属性设置最大值，value属性设置当前值，如果没有设置，则其默认值的范围是1-100
  - `color` 拾色器,类型会提供一个颜色拾取器，供用户选择颜色，并将用户选择的颜色填充到此元素中
  - `time`  时间
  - `date` 日期 不是绝对的
  - `--datetime` 时间日期
  - `month` 月份
  - `week` 星期
  - `file`  文件
> 部分类型是针对移动设备生效的，且具有一定的兼容性，在实际应用当中可选择性的使用

- **表单元素**（标签）
  - `list`：
    - 这个属性要和`datalist`元素一起使用，指定此文本框的可选择项，另外其相较于select的优点在于还可以输入
    - list属性规定输入域的datalist，datalist是输入域的选项列表。list属性适用于text、search、url、telephone、email、date pickers、number、range和color类型的`<input> `标签
```
//<datalist> 数据列表 下拉框  与input 配合使用
<input type=”text” list=”data”>

<datalist  id=”data”>
  <option>男</option>
  <option>女</option>
  <option>不详</option>
</datalist>
```

- `formaction`:
  - 可以更改点击此按钮式提交到服务器的处理程序
- `formmethod`:
  - 可以更改向服务器提交数据的方式
- `<keygen>`生成加密字符串
  - `keygen`作用是提供一种验证用户的可靠方法
  - 是密钥对生成器（key-pair generator）
  - 提交表单时，会生成两个键，一个是私钥，一个公钥
    - 私钥（private key）存储于客户端
    - 公钥（public key）则被发送到服务器
      - 公钥可用于之后验证用户的客户端证书
- `<progress></progress> ` 进度条
- `Max-width`
- `Min-width`
- `<meter>`表示度量器，不建议用作进度条
>  `<meter  value="81"    min="0" max="100"  low="60"  high="80" />`
> min、max和step属性用于为包含数字或日期的input 类型规定限定（约束）。
> max属性规定输入域所允许的最大值，
> min属性规定输入域所允许的最小值，
> step属性为输入域规定合法的数字间隔。
> min、max和step属性适用于date pickers、number和range类型的`<input>`标签

- **表单属性**
  - `placeholder` 占位符（用于在文本框未输入时提示作用）
  - `autofocus`用于控件自动获取焦点
  - `multiple`
    - 文件上传多选或多个邮箱地址,
    - 在选择文件时，默认只能单选，加上这个属性后，则可以使用鼠标选中多个文件进行上传
    - multiple属性规定输入域中可选择多个值，multiple 属性适用于`emial`和`file`类型的`<input>` 标签。
    - Select images: `<input type="file" name="img" multiple="multiple" />`
  - `autocomplete`
    - 自动完成，用于表单元素，也可用于表单自身
  - `form`
    - 指定表单项属于哪个form，处理复杂表单时会需要
    - 属性规定输入域所属的一个或多个表单，适用于所有`<input>` 标签的类型，必须引用所属表单的`id`，如需引用一个以上的表单，使用空格分隔的列表
  - `novalidate`
    - 关闭验证，可用于`<form>`标签
    - 在控件中加入了`required、emial、url`等验证后，如果想让这些验证失效，可以在表单中将novalidate设置为`true`
    - `<form action="upload.php" method="post" accept-charset="utf-8" id="form1" novalidate="true">`
  - `required`
    - 设置后此项为必填项
  - `pattern`
    - 正则表达式 验证表单
    - 手机号:
      - `<input type="tel" name="tel" required="required"       pattern="^(\+86)?1[3,5,6,8,9 ](\d{9})$">`

> 在HTML5中我们可以自定义属性，其格式如下`data-*=""`，
> 例如：
> `data-info="我是自定义属性"`，通过`Node.dataset['info']` 我们便可以获取到自定义的属性值。
> Node.dataset是以类对象形式存在的
> 当我们如下格式设置时，则需要以驼峰格式才能正确获取`data-my-name="itcast"，获取Node.dataset['myName']`




- **表单事件**
  - `oninput` 用户输入内容时触发，可用于移动端输入字数统计
  - `oninvalid` 验证不通过时触发
```
obj.oninvalid = function( ) {
  this.setCustomValidity(‘请输入正确的地址’);
  }
```
- `setCustomValidity` :设置验证不通过时的提示文本，一般用来编写正则输入内容验证不通过时


#### 104、对标签语义化的理解
- 在合适的地方用合适的标签
- 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
- 有利于SEO和搜索引擎建立良好沟通，
- 有助于爬虫抓取更多的有效信息：
  - 爬虫依赖于标签来确定上下文和各个关键字的权重
- 方便其他设备解析*（如屏幕阅读器、盲人阅读器、移动设备）*以意义的方式来渲染网页
- 便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化


#### 105、同步和异步的区别
- 同步请求流程：
  - 提交请求（POST/GET表单相似的提交操作）--->服务器对请求进行处理**（期间客户端浏览器不能进行其他任何操作）**---->处理完毕返回数据
  - 同步是阻塞模式，两个线程的运行是相关的，其中一个线程要阻塞等待另外一个线程的运行

- 异步请求流程：
  - 通过事件触发请求（移除/点击事件）---服务器对请求进行处理**（期间客户端浏览器可以做发送其他请求，不需要管其他请求是否有处理）**---处理完毕返回数据
  - 异步是非阻塞模式，两个线程毫无相关，自己运行自己的


#### 106、继承方式


#### 107、JavaScript this、闭包、作用域
- **this：**
  - 指向调用上下文
- **作用域：**
  - 定义一个函数就开辟了一个局部作用域
  - 整个js执行环境有一个全局作用域
- **闭包：**
  - 一个函数可以访问其他函数中的变量（闭包是一个受保护的变量空间）



#### 108、性能优化
- **文件方面**
  - CSS文件链接在head头部，CSS文件压缩合并
  - Js文件放在body最下面
- **结构方面**
  - 不要使用全局变量
  - 不要使用with语句
  - 尽量不要使用闭包
  - 数组中不要嵌套太多
  - 少用 for -in 循环
  - 最好用js包含文件，尽量放在最下面
  - 设置dom节点样式时尽量用class
  - 减少http请求


#### 109、闭包是什么，有什么特性，对页面有什么影响
- 闭包就是能够读取其他函数内部变量的函数，
- 在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成`"定义在一个函数内部的函数"`
  - **闭包最大用处有两个**
    - 一个是可以读取函数内部的变量
    - 另一个就是让这些变量的值始终保持在内存中
  - **闭包什么情况会导致内存溢出**
    - 循环引用导致了内存泄漏
    - 由外部函数调用引起的内存泄漏
  - **避免内存泄漏：**
    - 1、打破循环引用
    - 2、添加另一个闭包
    - 3、避免闭包自身


#### 110、编写一个数组去重的方法
> **思路：**
> 1、  先创建一个空数组，用来保存最终的结果
> 2、  循环数组元素，判断元素在新数组中是否有相同元素，如果没有就插入到新数组中
> 3、  返回新数组
```
var arr = [1,1,3,4,2,4,7];
var arrN = [];
for(var i = 0;i < arr.length;i++){
  if(arrN.indexOf(arr[i]) != -1){
    continue;
  }
  arrN.push(arr[i]);
}
console.log(arrN);

/*------------------------------------*/
var arrN = [];
//arrN[0] = arr[0];
for(var i = 0;i < arr.length;i++){
  if(arr.indexOf(arr[i]) == -1){
    arrN.push(arr[i]);
  }
}
console.log(arrN);
```


#### 111、已知有字符串foo=”get-element-by-id”,写一个function将其转化成驼峰表示法”getElementById”
```
function combo(msg){
var arr=msg.split("-");//[get,element,by,id]
    for(var i=1;i<arr.length;i++){
        arr[i]=arr[i][0].toUpperCase()+arr[i].substring(1); //Element
  }
    msg=arr.join(""); //msg=” getElementById”
    return msg;
}
```


#### 112、为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写一个函数`escapeHtml`，将`<, >, &, “”`进行转义
```
function escapeHtml(str) {
//[<>”&]:中括号中字符只要其中的一个出现就代表满足条件
//给replace第二个参数传递一个回调函数，回调函数中参数就是匹配结果，如果匹配不到就是null
return str.replace(/[<>”&]/g, function(match) {
    switch (match) {
      case “<”:
         return “&lt;”;
      case “>”:
          return “&gt;”;
      case “&”:
          return “&amp;”;
      case “\””://双引号包裹一个单引号：“’” 单引号包裹一个双引号 ‘””’
         return “&quot;”;
     }
  });
}
```


#### 113、用js实现随机选取10–100之间的10个数字，存入一个数组，并排序
```javascript
var iArray = [];
function getRandom(istart, iend){
  var iChoice = iend - istart +1;
  return Math.floor(Math.random() * iChoice+ istart);
}
//Math.random()就是获取0-1之间的随机数（永远获取不到1）
for(var i=0; i<10; i++){
var result= getRandom(10,100);
        iArray.push(result);
}
iArray.sort();

/*-------------------------------------------------------*/
var arr = [], result;
for (var i = 0; i < 10; i++) {
    result = Math.ceil(Math.random() * 91 + 10);
    arr.push(result);
}
arr.sort(function (a, b) {
    return a > b;
    // > 为从小到大排序
    // < 为从大到小排序
});
console.log(arr);
```


#### 114、.结合下面这段结构，谈谈`innerHTML outerHTML innerText`之间的区别
```
<span id="outer">
  <span id="inner">
    text
  </span>
</span>
```
- `innerHTML:`
    - 指**对象里面的HTML内容**，
    - 这里是`<span id="inner">text</span>`

- `outerHTML:`
  - 指**对象里面包括对象本身的HTML内容**，
  - 这里是
```
<span id="outer">
  <span id="inner">
    text
  </span>
</span>
```

- `innerText:`
  - 指对象里面的文本内容，
  - 这里是`text`


#### 115、把两个数组合并，并删除第二个元素
- 数组的`concat、splice`用法
- `splice()`
  - 删除数组的元素，或者向数组中添加元素
  - 然后返回被删除的项目
  - 参数1：从何处开始删除数组的元素（使用负数则从数组的末尾开始）
  - 参数2：要删除的元素个数（如果是0，就代表不删除）
  - 参数3，4，5。。。：要添加的元素
```
var array1 = ['a','b','c'];
var bArray = ['d','e','f'];
var cArray = array1.concat(bArray);
cArray.splice(1,1);
```

#### 116、有这样一个`URL：http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e`，请写一段JS程序提取URL中的各个GET参数(参数名和参数个数不确定)，将其按key-value形式返回到一个json结构中，如{a:’1′, b:’2′, c:”, d:’xxx’, e:undefined}
```javascript
function serlize(url){
    var result={};
    //1、寻找？后面的字符串
    url=url.substr(url.indexOf("?")+1);
    //2、将字符串用&分隔
    var args=url.split("&");//[“a=1”,”b=2”]
    for (var i = 0, len = args.length; i < len; i++) {
        var arg = args[i];
    var item = arg.split('=');
        //3、对象的键=值
        result[item[0]]= item[1];
    }
    return result;
}
serlize('http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e');
```


#### 117、正则表达式构造函数`var reg=new RegExp(“xxx”)`与正则表达字面量`var reg=//`有什么不同？匹配邮箱、年龄、url、手机的正则表达式？
- [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  - 当使用`RegExp()`构造函数的时候，不仅需要转义引号（即\”表示”）
  - 并且还需要双反斜杠（即\\表示一个\）。
  - 使用正则表达字面量的效率更高
- **邮箱的正则匹配:**
  - `var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;`
- **年龄**
  - `/^(1[89]|[2-9]\d|100)$/`
- **url**
  - `/^((http:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,5}(\.[a-z]{2,5})?\/?)$/`
- **手机**
  - `/^((\+86[\-\s]?)?1(3\d|47|[58][0-35-9])[\-\s]?\d{4}[\-\s]?\d{4})$/`



#### 118、看下面代码，给出输出结果
```javascript
for(var i=1;i<=3;i++){
  setTimeout(function(){
      console.log(i);
  },0);
}
//答案：4 4 4
```
**考点：**
> `setTimeout`的执行原理——Javascript事件处理器在线程空闲之前不会运行

- 如何让上述代码输出1 2 3？
```javascript
//代码1：用立即执行函数
for(var i=1;i<=3;i++){
    setTimeout((function(i){
        return function(){
            console.log(i);
        }
    })(i),0);
}
/*--------------------------------------------*/
//代码2：使用闭包
for(var i = 1; i < 4; i++) {
    (function (i){
        setTimeout(function () {
            console.log(i);
        }, 0)
    })(i);
}
```


#### 119、写一个function，清除字符串前后的空格。（兼容所有浏览器）
- 使用自带接口`trim()`，考虑兼容性(IE9以下浏览器不支持)：
- **考点：**
  - 1、原型扩展
  - 2、正则表达式
  - 3、字符串的replace方法
```
if(typeof String.prototype.trim !="function"){
    String.prototype.trim=function(){
        return this.replace(/^\s+|\s+$/g," ");
    }
}
var str="  hello  ";
```


#### 120、Javascript中, 以下哪条语句一定会产生运行错误？
```
A、var _变量=NaN;
B、var 0bj = []; // 不能以数字开头
C、var obj = / /;   // 不能有除$和_以外的符号
D、var obj = {};
//正确答案：B
```


#### 121、下面代码输出是什么？
```
function Foo() {
    getName = function () {
        alert(1);
    };
    return this;
}
Foo.getName = function () {
    alert(2);
};
Foo.prototype.getName = function () {
    alert(3);
};
var getName = function () {
    alert(4);
};
function getName() {
    alert(5);
}

//写出下面结果
Foo.getName();//2
getName();//4
Foo().getName();//1
getName();//1
new Foo.getName();//        2
new Foo().getName();//      3
new new Foo().getName();//3
```


#### 122、前端开发的优化问题
- （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

- （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

-  （3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

- （4） 当需要设置的样式很多时设置className而不是直接操作style。

-  （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

-  （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

- （7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

- （8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢


#### 123、jquery 中如何将数组转化为json字符串，然后再转化回来
```
//jQuery中没有提供这个功能，所以你需要先编写两个jQuery的扩展：
$.fn.stringifyArray = function(array) {
  return JSON.stringify(array)
}
$.fn.parseArray = function(array) {
  return JSON.parse(array)
}
然后调用：
$("").stringifyArray(array);
```


#### 124、给出下面为问题答案
```
(function(x){
  delete x;

  alert(x);
})(1+5);
```
[参考delete说明](http://www.jb51.net/article/35434.htm)
>  **Javascript 中 delete 如何工作**
>
> 1、变量和函数声明都是活化(Activation)全局(Global)对象的属性。
> 2、属性拥有内部属性，其中一个—— DontDelete 负责确定一个属性是否能够被删除。
> 3、全局代码或函数代码中的变量、函数声明都生成拥有 DontDelete 的属性。
> 4、函数参数同样是活化对象的属性，也拥有 DontDelete。
> 5、Eval代码中的变量和函数声明都生成没有 DontDelete 的属性。
> 6、新的未声明的属性在生成时带空的内部属性，因此也没有 DontDelete。
> 7、宿主对象允许以任何它们期望的方式来响应删除过程




#### 125、new操作符具体干了什么?完整四步【JS自动完成】
- 1、new关键字会创建出一个新对象(本质就是在内存中开辟了一块空间)
- 2、给新对象（this）添加`__proto__`等属性和方法，即新对象.`__proto__` = **当前**构造函数.`prototype`
- 3、执行构造函数，执行时构造函数内的`this`指向新对象
- 4、返回新对象的地址


#### 126、定时器setInterval有一个有名函数fn1，setInterval（fn1,500）与setInterval（fn1(),500）有什么区别？
- 第一个是重复执行每500毫秒执行一次，
- 后面一个只执行一次，且是立即执行


#### 127、ECMAScript6 怎么写class么，为什么会出现class这种东西?



#### 128、requireJS的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）
- 核心是js的加载模块，
- 通过正则匹配模块以及模块的依赖关系，
- 保证文件加载的先后顺序，
- 根据文件的路径对加载过的文件做了缓存


#### 129、AMD（Modules/Asynchronous-Definition）、CMD（Common Module Definition）规范区别？
- RequireJS 遵循的是 AMD（异步模块定义）规范
- SeaJS 遵循的是 CMD （通用模块定义）规范”
[AMD 和 CMD 的区别有哪些？(知乎)](https://www.zhihu.com/question/20351507/answer/14859415)
[SeaJS与 RequireJS 的异同(github)](https://github.com/seajs/seajs/issues/277)
- 1、对于依赖的模块，
> AMD 是提前执行，
> CMD 是延迟执行。
> 不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。
> CMD 推崇 as lazy as possible.

- 2、CMD 推崇依赖就近，
  - AMD 推崇依赖前置
```javascript
// CMD
define(function(require, exports, module) {
var a = require('./a')
a.doSomething()
// 此处略去 100 行
var b = require('./b') // 依赖可以就近书写
b.doSomething()
// ...
})


// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
a.doSomething()
// 此处略去 100 行
b.doSomething()
...
})

/*作者：玉伯
[链接](https://www.zhihu.com/question/20351507/answer/14859415)
*/
```
> 3. AMD 的 API 默认是一个当多个用，
> CMD 的 API 严格区分，推崇职责单一。
> 比如 AMD 里，require 分全局 require 和局部 require，都叫 require。
> CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。
> CMD 里，每个 API 都简单纯粹


#### 130、模块化开发怎么做？
- 理解模块化开发模式：
  - 浏览器端requirejs，seajs；
  - 服务器端nodejs；
  - ES6模块化；
  - fis、webpack等前端整体模块化解决方案；
  - grunt、gulp等前端工作流的使用


#### 131、Javascript中，有一个函数，执行对象查找时，永远不会去查找原型，这个函数是？
- **HasOwnProperty**【是否有自己的特性】
  - 作用：
      - 判断一个对象是否含有自己的某个属性
      - `对象. hasOwnproperty (要判断的属性名)`
      - 返回值：boolean


#### 132、如何判断一个对象是否属于某个类(严格来说在ES6之前，js没有类的概念)？
- `instanceof`
- `constructor`


#### 133、说出以下函数的作用是？空白区域应该填写什么？
```
//define
(function(window){
    function fn(str){
        this.str=str;
    }

    fn.prototype.format = function(){
        var arg = ______;
        return this.str.replace(_____,function(a,b){
             return arg[b]||"";
      });
    }
    window.fn = fn;
})(window);

//use
(function(){
    var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
    console.log(t.format('http://www.alibaba.com','Alibaba','Welcome'));
})();

答案：访函数的作用是使用format函数将函数的参数替换掉{0}这样的内容，
返回一个格式化后的结果：

第一个空是：arguments
第二个空是：/\{(\d+)\}/ig
```


#### 134、（设计题）想实现一个对页面某个节点的拖曳？如何做？（使用原生JS）
- 要点:
  - 1、给需要拖拽的节点绑定mousedown, mousemove, mouseup事件
  - 2、mousedown事件触发后，开始拖拽
  - 3、mousemove时，需要通过event.clientX和clientY获取拖拽位置，并实时更新位置
  - 4、mouseup时，拖拽结束
  - 5、需要注意浏览器边界的情况


#### 135、定义一个log方法，让它可以代理console.log的方法
```
function log(msg)　{
    console.log(msg);
}
log("hello world!")
//如果要传多参数
function log(){
    console.log.apply(console, arguments);
};
```


#### 136、给String对象添加一个方法，传入一个string类型的参数，然后将string的每个字符间加个空格返回
```
String.prototype.addSpace = function() {
  return this.split("").join(" ");
}
```


#### 137、检测浏览器版本版本有哪些方式？
- `navigator.userAgent`
```

if (navigator.userAgent.indexOf("Opera") != -1) {
    alert('Opera');
}
else if (navigator.userAgent.indexOf("MSIE") != -1) {
    alert('Internet Explorer');
}
else if (navigator.userAgent.indexOf("Firefox") != -1) {
    alert('Firefox');
}
else if (navigator.userAgent.indexOf("Netscape") != -1) {
    alert('Netscape');
}
else if (navigator.userAgent.indexOf("Safari") != -1) {
    alert('Safari');
}
else {
    alert('无法识别的浏览器。');
}
```


#### 138、HTML 5中 Canvas 和 SVG比较
- SVG
  - 一种使用XML描述的2D图形语言
  - 基于矢量
  - SVG基于XML这意味着SVG DOM中的每个元素都是可用的，
  - 可以为某个元素附加JavaScript事件处理程序
  - SVG中每个绘制的图像均可视为对象
  - 如果SVG对象属性发生变化，那么浏览器能够自动重现图形

- Canvas
  - 通过JavaScript来绘制2D或3D图形
  - 基于像素
  - 是逐像素进行渲染的
  - Canvas中图形一旦被绘制完成，就不会再继续得到浏览器的关注了
  - 如果其位置发生了变化，那么整个场景也需要重新绘制，包括或许已被覆盖的对象


- **区别：**
  - Canvas
    - 依赖分辨率
    - 不支持事件处理器
    - 文本渲染能力太弱
    -  能以PNG JPG格式保存
    -  适合图像密集型游戏，其中的许多对象会被反复重绘
    -  Canvas提供的功能更原始，适合像素处理，动态渲染和大数据量绘制

  - SVG
    - 不依赖分辨率
    - 支持事件处理器
    - 适合带有大型渲染区域的应用程序
    - 复杂度高会减慢渲染速度
    - 不适合游戏应用
    - SVG功能更完善，适合静态图片展示，高保真文档查看和打印的应用场景


#### 139、ajax加载的页面，跳转到另外一个页面再跳转回来，内容相同，如何节约读取请求?
- 后台做缓存，读取缓存里面的数据。CDN


#### 140、什么情况下用字节流 什么情况下用字符流？
- 字符流处理的单元为2个字节的Unicode字符，分别操作字符、字符数组或字符串，
- 而字节流处理单元为1个字节， 操作字节和字节数组。
- 所以字符流是由Java虚拟机将字节转化为2个字节的Unicode字符为单位的字符而成的，所以它对多国语言支持性比较好！
- 如果是 音频文件、图片、歌曲，就用字节流好点，如果是关系到中文（文本）的，用字符流好点
- 所有文件的储存是都是字节（byte）的储存，在磁盘上保留的并不是文件的字符而是先把字符编码成字节，再储存这些字节到磁盘。
- 在读取文件（特别是文本文件）时，也是一个字节一个字节地读取以形成字节序列
- 字节流可用于任何类型的对象，包括二进制对象，而字符流只能处理字符或者字符串
- 字节流提供了处理任何类型的IO操作的功能，但它不能直接处理Unicode字符，而字符流就可以


#### 141、什么是CDN
- **Content Delivery Network内容分发网络**
- 是一个缓存代存结构，服务器资源缓存到本地
- CDN节点解决了跨运营商和跨地域访问的问题，降低访问延时
- 大部分请求在CDN边缘节点完成，CDN起到了分流作用，减轻了源站的负载


#### 142、`<img>图片`居中显示
```
1、父级元素设置属性
div {
  display: table-cell;
  width:200px;
  height:200px;
  border: 1px solid red;
  text-align: center;
  vertical-align:middle;
}
2、img标签设置属性
div img{
  vertical-align:middle;
}
```


#### 143、BFC（块级格式化上下文）
- 指浏览器中创建了一个独立的渲染区域，
- 该区域内所有元素的布局不会影响到区域外元素的布局，
- 这个渲染区域只对块级元素起作用


#### 144、如何垂直居中一个浮动元素
```
// 方法一：已知元素的高宽
div {
  width:200px;
  heigth:200px;
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-100px;
  magin-left:-100px;
}

// 方法二：元素宽高未知
div{
  width:;
  height:;
  position:absolute;
  margin:auto;
  left:0;
  right:0;
  bottom:0;
  top:0;
}
```


#### 145、将数字 12345678 转化成 RMB形式 如： 12,345,678
- 思路：先将数字转为字符， `str= str + '' ;`
- 利用反转函数，每三位字符加一个 ','最后一位不加； re()是自定义的反转函数，最后再反转回去！
```
var str = '12345678';
var tmp = '';
str = str.split('').reverse().join('');
for(var i = 1; i <= str.length; i++) {
  tmp += str[i - 1];
  if(i % 3 == 0 && i != re(str).length){
    tmp += ',';
  }
}
tmp = tmp.split('').reverse().join('');
```


#### 146、生成5个不同的随机数
- 思路：5个不同的数，每生成一次就和前面的所有数字相比较，如果有相同的，则放弃当前生成的数字
```
var arr = [];
for(var i = 0; i < 5; i++) {
  arr[i] = Math.floor(Math.random() * 10 + 1);
  for(var j = 0; j < i; j++) {
    if(arr[i] == arr[j]) {
      i--;
    }
  }
}
```


#### 147、"abcoefoxyozzopp"查找字符串中所有o出现的位置
```
var str = "abcoefoxyozzopp";
var idx = -1;
do{
  idx = str.indexOf('o', idx + 1);
  if(idx != -1) {
    console.log(idx);
  }
}while(idx != -1)
```


#### 148、specify(‘hello,world’)//=>’h,e,l,l,o,w,o,r,l,d’实现specify函数
```
function specify(str) {
  return str.replace(/\,/, '').split(''),join();
}
```


#### 149、有下面这样一段HTML结构，使用css实现这样的效果：`左边容器无论宽度如何变动，右边容器都能自适应填满父容器剩余的宽度`
- **利用CSS3中的`flex`设置**
```
<div id="box">
    <div class="left"></div>
    <div class="right"></div>
</div>


<style>
    #box {
        display: flex;
    }
    .left {
        width: 400px;
        height: 200px;
        background-color: red;
    }
    .right {
        flex: auto;
        height: 200px;
        background-color: yellow;
    }
</style>
```


#### 150、怎样实现两栏等高
- 父盒子设置`overflow:hidden;`
- 子盒子设置`padding-bottom:2000px; margin-bottom:-2000px;`



#### 151、三种弹窗的单词以及三种弹窗的功能
- `alert()`弹出框
- `confirm()`确认提示框
- `prompt()`接收用户输入的信息


#### 152、`console.log( 8 | 1 );`输出多少
- **9**


#### 153、冒泡排序
```
var arr = [23,45,18,37,92,13,24];
for(var i = 0; i < arr.length - 1; i++) {
    var flag = true;
    for(var j = 0; j < arr.length - 1 - i; j++) {
        if(arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            flag = false;
        }
    }
    if(flag) {
        break;
    }
}
console.log(arr);
```

#### 154、输出结果
```
var a;
var b = a * 0; // NaN
if (b == b) {
     console.log(b * 2 + "2" - 0 + 4);
} else { // 进入这里
     console.log(!b * 2 + "2" - 0 + 4); // 1 * 2 + '2' - 0 + 4
}
输出：26
```
```
var t = 10;
function test(test) {
    t = t + test;
    console.log(t);
    var t = 3;
}
test(t); // NaN
console.log(t);  // 10
输出：NaN 10
```
```
var a;
var b = a / 0; // NaN
if (b == b) {
        console.log(b * 2 + "2" - 0 + 4);
} else { // 进这里
        console.log(!b * 2 + "2" - 0 + 4);
}
输出：26
```
```
function setName(){
  name="张三";
}
setName(); // 无输出
console.log(name); //张三
输出：张三
```


#### 155、实现浏览器内多个标签页之间的通信
- 调用 `localstorge`、`cookies` 等本地存储方式


#### 156、用H5+CSS3解决下导航栏最后一项掉下来的问题
- 用`box-sizing:border-box`


#### 157、简述ajax 的过程
- 1、创建XMLHttpRequest对象,也就是创建一个异步调用对象
- 2、创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
- 3、设置响应HTTP请求状态变化的函数
- 4、发送HTTP请求
- 5、获取异步调用返回的数据
- 6、使用JavaScript和DOM实现局部刷新


#### 158、GET和POST的区别，何时使用POST
- `GET`：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符，有的浏览器是8000个字符
- `POST`：一般用于修改服务器上的资源，对所发送的信息没有限制
- **在以下情况中，请使用 POST 请求：**
- 1、无法使用缓存文件（更新服务器上的文件或数据库）
- 2、向服务器发送大量数据（POST 没有数据量限制）
- 3、发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠


#### 159、什么是Ajax和JSON，它们的优缺点
- Ajax是全称是asynchronous JavaScript andXML，即异步JavaScript和xml，
  - **`用于在Web页面中实现异步数据交互，实现页面局部刷新`**
  - 优点：
    - 可以使得页面不重载全部内容的情况下加载局部内容
    - 降低数据传输量
    - 避免用户不断刷新或者跳转页面，提高用户体验
  - 缺点：
    - 1、ajax不支持浏览器back按钮。
    - 2、安全问题 AJAX暴露了与服务器交互的细节。
    - 3、对搜索引擎的支持比较弱。
    - 4、破坏了程序的异常机制
- JSON是一种轻量级的数据交换格式
  - 轻量级
  - 易于人的阅读和编写
  - 便于机器（JavaScript）解析
  - 支持复合数据类型（数组、对象、字符串、数字）


#### 160、ajax请求时，如何解析json数据
- 使用`eval()` 或者`JSON.parse()`
- 鉴于安全性考虑，`推荐使用JSON.parse()`更靠谱，对数据的安全性更好


#### 161、请说出三种减低页面加载时间的方法
- 1、压缩css、js文件
- 2、合并js、css文件，减少http请求
- 3、外部js、css文件放在最底下
- 4、减少dom操作，尽可能用变量替代不必要的dom操作


#### 162、Handlebars
- JavaScript 一个语义模板库，通过对view和data的分离来快速构建Web模板。
- 它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译， 这样可以保证模板加载和运行的速度


#### 163、定义一个log方法，让它可以代理console.log的方法
```
单个参数
function log(msg)　{
    console.log(msg);
}
// 多个参数
function log(){
    console.log.apply(console, arguments);
};
```


#### 164、一个table栏提示消息：1、用户第一次访问页面时显示，之后同天访问不再显示；2、用户点击“我知道了”，此后同天访问该页面不再显示
```
function setcookie(name,value,days){  //给cookie增加一个时间变量
　　var exp = new Date();
　　exp.setTime(exp.getTime() + days*24*60*60*1000); //设置过期时间为days天
　　document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
　　var result = "";
　　var myCookie = ""+document.cookie+";";
　　var searchName = "+name+"=";
　　var startOfCookie = myCookie.indexOf(searchName);
　　var endOfCookie;
　　if(satrtOfCookie != -1){
　　　　startOfcookie += searchName.length;
　　　　endOfCookie = myCookie.indexOf(";",startOfCookie);
　　　　result = (myCookie.substring(startOfCookie,endOfCookie));
　　}
　　return result;
}
(function(){
　　var oTips = document.getElementById('tips');//假设tips的id为tips
　　var page = {
　　check: function(){//检查tips的cookie是否存在并且允许显示
　　　　var tips = getCookie('tips');
　　　　if(!tips || tips == 'show') return true;//tips的cookie不存在
　　　　if(tips == "never_show_again") return false;
　　},
　　hideTip: function(bNever){
　　　　if(bNever) setcookie('tips', 'never_show_again', 365);
　　　　oTips.style.display = "none";//隐藏
　　},
　　showTip: function(){
　　oTips.style.display = "inline";//显示，假设tips为行级元素
　　},
　　init: function(){
　　　　var _this = this;
　　　　if(this.check()){
　　　　_this.showTip();
　　　　setcookie('tips', 'show', 1);
　　}
　　oTips.onclick = function(){
　　　　_this.hideTip(true);
　　};
　　}
　　};
  page.init();
})();
```


#### 165、简述一下Sass、Less，且说明区别
- 他们是动态的样式语言，是CSS预处理器,CSS上的一种抽象层。他们是一种特殊的语法/语言而编译成CSS
- 变量符不一样，less是@，而Sass是$
- Sass支持条件语句，可以使用`if{}else{},for{}`循环等等。而Less不支持
- Sass是基于Ruby的，是在服务端处理的，而Less是需要引入less.js来处理Less代码输出Css到浏览器



#### 166、js延迟加载的方式有哪些
- `async`
- `defer`
- 动态创建script按需加载


#### 167、jquery 中如何将数组转化为json字符串，然后再转化回来
```
$.fn.stringifyArray = function(array) {
    return JSON.stringify(array)
}
$.fn.parseArray = function(array) {
    return JSON.parse(array)
}
// 然后调用：
$("").stringifyArray(array)
```


#### 168、Zepto的点透问题如何解决
- zepto的tap``通过兼听绑定在document上的touch事件来完成tap事件的模拟的，即tap事件是冒泡到document上触发的
- **`解决：`**
- 1、利用github上的`fastclick.js`

```
//1、引入`fastclick.js`，因为fastclick源码不依赖其他库所以你可以在原生的js前直接加上
window.addEventListener( "load", function() {
  FastClick.attach( document.body );
}, false )

//2、或者有zepto或者jqm的js里面加上
$(function() {
  FastClick.attach(document.body);
});
```
2、用`touchend`代替`tap`事件并阻止掉`touchend`的默认行为`preventDefault()`【不建议用】
```
$("#cbFinish").on("touchend", function (event) {
  //很多处理比如隐藏什么的
  event.preventDefault();
});
```
3、延迟一定的时间(300ms+)来处理事件
```
$("#cbFinish").on("tap", function (event) {
  setTimeout(function(){
  //很多处理比如隐藏什么的
  },320);
});
//可以和fadeInIn/fadeOut等动画结合使用，可以做出过度效果
```


#### 169、请书写一个三列式布局，左右各200px，中间自适应宽度
```
<style>
        * {
            margin: 0;
            padding: 0;
        }
        .left {
            position: absolute;
            left: 0;
            top: 0;
            width: 400px;
            height: 200px;
            background-color: red;
        }

        .right {
            position: absolute;
            right: 0;
            top: 0;
            width: 500px;
            height: 200px;
            background-color: yellow;
        }

        .center {
            margin: 0 200px;
            height: 200px;
            background-color: green;
        }
</style>
```


#### 170、请解释 JQuery 中 .end() 的用途
- **返回当前jq对象的上级jq对象**
-  jq对象下有一系列的方法，有的方法会返回一个新的对象
-  这个时候在`$jq2`下面有一个属性` prevObject`，该属性保存的就是 `$jq1`，通过比较 `$jq2.prevObject == $jq1`，会发现返回`true`
-  通过 `prevObject` 属性会产生一个类似原型链的引用，而 `.end()` 方法就是返回就是当前 JQ 对象的 prevObject 对象，也就是当我们 `$jq2.end()` 的时候，返回的就是上层的 `$jq1`


#### 171、
```
var str = "123abc";
alert(typeof str++);  // number
alert(str);  // NaN
```


### 172、实现一个函数 clone()，可以对 JavaScript 中的5种主要的数据类型（包括 Number、String、Object、Array、Boolean）进行值复制
```
function clone(obj) {
    //判断是对象，就进行循环复制
    if (typeof obj === 'object' && typeof obj !== 'null') {
        // 区分是数组还是对象，创建空的数组或对象
        var o = Object.prototype.toString.call(obj).slice(8, -1) === "Array" ? [] : {};
        for (var k in obj) {
            // 如果属性对应的值为对象，则递归复制
            if(typeof obj[k] === 'object' && typeof obj[k] !== 'null'){
                o[k] = clone(obj[k])
            }else{
                o[k] = obj[k];
            }
        }
    }else{ //不为对象，直接把值返回
        return obj;
    }
    return o;
}
```


#### 173、实现对数组进行乱序
```
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
a.sort(function(a, b) {
    return Math.random() - 0.5
});
```


#### 174、`ajax和websocket`什么关系
- ajax是javascript，全称：Asynchronous JavaScript and XML（异步的 JavaScript 和 XML），他不是一个新语言，只是实现了通过javascript异步发送http请求，只能由客户端单向发送
- WebSocket API是下一代客户端-服务器的异步通信方法，使用ws或wss协议，可用于任意的客户端和服务器程序，服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息
- WebSocket并不限于以Ajax(或XHR)方式通信，因为Ajax技术需要客户端发起请求，而WebSocket服务器和客户端可以彼此相互推送信息
- XHR受到域的限制，而WebSocket允许跨域通信
