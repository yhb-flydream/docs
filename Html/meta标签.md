# meta

[TOC]

## 通用 `meta` 标签

### 声明文档使用的字符编码

```html
<meta charset='utf-8'>
```

### 页面描述（尽量不要超过150个字符）

```html
<meta name="description" content="">
```

### 页面关键词

```html
<meta name="keywords" content="">
```

### 网页作者

```html
<meta name="author" content="name, email@gmail.com">
```

### 版权

```html
<meta name="copyright" content="">
```

### 重访（通知搜索引擎多少天访问一次）

```html
<meta name="revisit-after" content="7 days">
```

### 搜索引擎抓取

- `Robots`用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。`Content`的参数有`all、none、index、noindex、follow、nofollow`。默认是`all`。

```html
<meta name="robots" content="All|None|Index|Noindex|Follow|Nofollow">
```

- `all`：文件将被检索，且页面上的链接可以被查询；
- `none`：文件将不被检索，且页面上的链接不可以被查询；(和 "noindex, no follow" 起相同作用)
- `index`：文件将被检索；（让robot/spider登录）
- `follow`：页面上的链接可以被查询；
- `noindex`：文件将不被检索，但页面上的链接可以被查询；(不让robot/spider登录)
- `nofollow`：文件将不被检索，页面上的链接可以被查询。(不让robot/spider顺着此页的连接往下探找)

###

```html
<meta name="force-rendering" content="webkit">
```

###

```html
<meta name="theme-color" content="black">
```

###

```html
<meta name="applicable-device" content="pc">
```

###

```html
<meta name="referrer" content="unsafe-url">
```

###

```html
<meta name="mobile-web-app-capable" content="yes">
```

### 为移动设备添加 `viewport`

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<meta name="viewport"
content="
  height=[pixel_value | device-height],
  width=[pixel_value | device-width ],
  initial-scale=float_value,
  minimum-scale=float_value,
  maximum-scale=float_value,
  user-scalable=[yes | no],
  target-densitydpi=[dpi_value | device-dpi | high-dpi | medium-dpi | low-dpi]"
>
```

- `width`
  - 控制`viewport`的大小，可以指定的一个值或者特殊的值，如`device-width`为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）
- `height`
  - 和 `width` 相对应，指定视窗的高度
- `target-densitydpi`
  - 一个屏幕像素密度是由屏幕分辨率决定的，通常定义为每英寸点的数量（dpi）。Android支持三种屏幕像素密度：低像素密度，中像素密度，高像素密度。一个低像素密度的屏幕每英寸上的像素点更少，而一个高像素密度的屏幕每英寸上的像素点更多。Android Browser和WebView默认屏幕为中像素密度
  - 下面是 target-densitydpi 属性的 取值范围
    - `device-dpi` –使用设备原本的 dpi 作为目标 dp。 不会发生默认缩放。
    - `high-dpi` – 使用hdpi 作为目标 dpi。 中等像素密度和低像素密度设备相应缩小。
    - `medium-dpi` – 使用mdpi作为目标 dpi。 高像素密度设备相应放大， 像素密度设备相应缩小。 这是默认的target density.
    - `low-dpi` -使用mdpi作为目标 dpi。中等像素密度和高像素密度设备相应放大。
    - `<value>` – 指定一个具体的dpi 值作为target dpi. 这个值的范围必须在70–400之间。
  - 为了防止Android Browser和WebView 根据不同屏幕的像素密度对你的页面进行缩放，你可以将viewport的target-densitydpi 设置为 device-dpi。当你这么做了，页面将不会缩放。相反，页面会根据当前屏幕的像素密度进行展示。在这种情形下，你还需要将viewport的width定义为与设备的width匹配，这样你的页面就可以和屏幕相适应。
- `initial-scale`
  - 初始缩放。即页面初始缩放程度。这是一个浮点值，是页面大小的一个乘数。例如，如果你设置初始缩放为“1.0”，那么，web页面在展现的时候就会以target density分辨率的1:1来展现。如果你设置为“2.0”，那么这个页面就会放大为2倍。
- `maximum-scale`
  - 最大缩放。即允许的最大缩放程度。这也是一个浮点值，用以指出页面大小与屏幕大小相比的最大乘数。例如，如果你将这个值设置为“2.0”，那么这个页面与target size相比，最多能放大2倍。
- `user-scalable`
  - 用户调整缩放。即用户是否能改变页面缩放程度。如果设置为yes则是允许用户对其进行改变，反之为no。默认值是yes。如果你将其设置为no，那么minimum-scale 和 maximum-scale都将被忽略，因为根本不可能缩放。
  - 所有的缩放值都必须在`0.01–10`的范围之内。

### 文档类型

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

### 重定向

```html
<meta http-equiv="refresh" content="30" >   //30s后刷新自己
<meta http-equiv="refresh" content="30;url='https://www.linkeddb.com/'"> //30s后跳转到百度
```

### 优先使用 IE 最新版本和 Chrome

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

### 指定网页的过期时间，过期后必须重新请求服务器

```html
<meta http-equiv="expires" content="Sat, 29 Apr 2017 04:25:02 GMT" >
```

### 避免百度打开网页时可能会对其进行转码

```html
<meta http-equiv="Cache-Control" content="no-siteapp" />   //先发送请求，与服务器确认该资源是否被更改，未被更改则使用缓存
```

###

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
```

###

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

## `UC` 浏览器私有 `meta` 属性

### 强制竖屏

```html
<meta name="screen-orientation" content="portrait">
```

### 强制横屏

```html
<meta name="screen-orientation" content="landscape">
```

### 强制全屏

```html
<meta name="full-screen" content="yes">
```

### 缩放不出滚动条

```html
<meta name="viewport" content="uc-fitscreen=no|yes">
```

- 设置`no`后用户缩放与标准浏览器缩放一直，设置为`yes`后，用户缩放金放到图片和文字，不出现横向滚动条

### 排版

```html
<meta name="layoutmode" content="fitscreen|standard">
```

- `fitscreen`模式简化页面处理，适合页面阅读节省流量
- `standard`模式和标准浏览器一致
- 一旦设置`layoutmode meta`后，用户使用浏览器提供的的排版模式选项将会无效

### 夜间模式

```html
<meta name="nightmode" content="enable|disable">
```

- 当值设置为`disable`后，即使用户使用浏览器的夜间模式，页面的表现也仍然是非夜间模式

### 强制图片显示

```html
<meta name="imagemode" content="force">
```

- `UC`浏览器为了节省流量，为用户提供了无图模式，但是如果页面的图片是必不可少的，如验证码的，需要强制浏览器显示图片，可以设置`imagemode`， 不影响子页面。
- 通过`meta`设置图片加载方式会作用于整个页面
- 如果希望对单个图片进行设置，那么可以使用这个

```html
<img src="..." show="force">
```

### 应用模式

```html
<meta name="browsermode" content="application">
```

- 使用了`application`这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示

## `QQ` `x5`内核浏览器私有 `meta` 属性

### 竖屏

```html
<meta name="x5-orientation" content="portrait">
```

### 横屏

```html
<meta name="x5-orientation" content="landscape">
```

### QQ强制全屏

```html
<meta name="x5-fullscreen" content="true">
```

### 设置屏幕模式

```html
<meta name="x5-page-mode" content="app">
```

## `iOS` 浏览器私有 `meta`

### 添加到主屏后的标题（iOS 6 新增）

```html
<meta name="apple-mobile-web-app-title" content="">
```

### 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

### 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）

```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
```

### 设置苹果工具栏颜色

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

### 忽略页面中的数字识别为电话，忽略email识别

```html
<meta name="format-detection" content="telephone=no, email=no">
```

### 启用360浏览器的极速模式(webkit)

```html
<meta name="renderer" content="webkit">
```

### 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓

```html
<meta name="HandheldFriendly" content="true">
```

### 微软的老式浏览器

```html
<meta name="MobileOptimized" content="320">
```

### windows phone 点击无高光

```html
<meta name="msapplication-tap-highlight" content="no">
```

## `IE`

### `application-name`

- `application-name`元数据定义固定网站应用程序实例的名称。当光标悬停在 Windows 7 任务栏的固定网站按钮上时，此名称将出现在工具提示中。该应用程序名称还将附加到固定网站应用程序实例的窗口标题中

```html
<meta name="application-name" content="">
```

#### 拓展与参考

- [Windows 8 and Microsoft Surface: IE10 meets modern mobile HTML5](http://www.mobilexweb.com/blog/windows-8-surface-ie10-html5)
- [Windows 8中的固定网站功能](http://www.iefans.net/windows8-gudingwangzhan/)
- [声明固定站点元数据](http://msdn.microsoft.com/zh-cn/library/ie/gg491732%28v=vs.85%29.aspx)
- [Page 3: Implementing Site Pinning with Internet Explorer 9 and Windows 7](http://www.htmlgoodies.com/html5/tutorials/page-3-implementing-site-pinning-with-internet-explorer-9-and-windows-7.html#fbid=e2FLjB06Ef_)
- [Windows Store Applications `<meta />` Elements | HTML `<meta>` Elements Standards Based Development](http://dev.bowdenweb.com/html/e/meta/windows-store-app-meta-elements.html)
- [最齐全的网站元数据meta标签的含义和用法](https://blog.csdn.net/freshlover/article/details/25322839)

## 元标记

### `google, facebook`

```html
<meta property="fb:app_id" content="xxxx">
<meta property="og:url" content="">
<meta property="og:type" content="website">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:image" content="">
<meta property="og:site_name" content="">
```

- `fb:app_id` `Facebook`的 `app_id`
- `og:url` 页面主域网址
- `og:type` 页面类型
- `og:title` 页面标题
- `og:description` 页面描述
- `og:image` 页面展示主图
- `og:site_name` 页面主域名

### `twitter`

```html
<meta name="twitter:card" content="">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="">
```

- `twitter:card`
- `twitter:title` 页面标题
- `twitter:description` 页面描述
- `twitter:image` 页面展示主图