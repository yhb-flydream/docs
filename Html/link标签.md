# link

[TOC]

[HEAD(link)](https://github.com/Amery2010/HEAD#%E9%93%BE%E6%8E%A5)

## 通用

### 引入 css 样式表

```html
<link rel="stylesheet" href="https://example.com/styles.css">
```

### `canonical` 指定当前页规范化地址的 `URL`

```html
<link rel="canonical" href="https://www.linkeddb.com/">
```

- `href` 地址可以是**绝对路径**也可以是**相对路径**。通常还是建议使用绝对地址比较保险。

### `miphtml` 指定当前页的mip版本页面的URL

```html
<link rel="miphtml" href="https://mip.linkeddb.com/">
```

- `href` 地址建议使用绝对地址比较保险。

### `amphtml` 指定当前页的amp版本页面的URL

```html
<link rel="amphtml" href="https://amp.linkeddb.com/">
```

- `href` 地址建议使用绝对地址比较保险。

### `alternate` 使用 `hreflang` 设置语言和地区

```html
<link rel="alternate" hreflang="zh-cn" href="https://www.linkeddb.com/">
<link rel="alternate" hreflang="zh-HK" href="https://hk.linkeddb.com/">
<link rel="alternate" hreflang="zh-TW" href="https://tw.linkeddb.com/">
```

- `hreflang` 标签分两部分
  - 前面是**语言**
  - 后面是**地区**
- 上面标签指明的是，这个页面针对中文（zh）、中国地区用户（cn）

### `manifest`指向JSON文件的链接，该文件指定Web应用程序的“安装”凭据

```html
<link rel="manifest" href="manifest.json">
```

### `author` 链接到有关文档作者的信息

```html
<link rel="author" href="humans.txt">
```

### `license`指适用于链接上下文的版权声明

```html
<link rel="license" href="copyright.html">
```

### `me` 提供有关作者或其他人的信息

```html
<link rel="me" href="https://yhb-flydream.github.io/" type="text/html">
<link rel="me" href="mailto:yhbflydream@gmail.com">
<link rel="me" href="sms:+180xxxxxxxx">
```

### `archives`指向描述历史感兴趣的记录，文档或其他材料集合的文档的链接

```html
<link rel="archives" href="https://example.com/archives/">
```

### `index` 链接到层次结构中的顶级资源

```html
<link rel="index" href="https://example.com/article/">
```

### `self` 提供自引用 - 当文档具有多个可能的引用时非常有用

```html
<link rel="self" type="application/atom+xml" href="https://example.com/atom.xml">
```

### 分别是一系列文档中的第一个，最后一个，上一个和下一个文档

```html
<link rel="first" href="https://example.com/article/">
<link rel="last" href="https://example.com/article/?page=42">
<link rel="prev" href="https://example.com/article/?page=1">
<link rel="next" href="https://example.com/article/?page=3">
```

### `EditURI` 在使用第三方服务维护博客时使用

```html
<link rel="EditURI" href="https://example.com/xmlrpc.php?rsd" type="application/rsd+xml" title="RSD">
```

### `pingback` 当另一个WordPress博客链接到您的WordPress博客或帖子时，形成自动评论

```html
<link rel="pingback" href="https://example.com/xmlrpc.php">
```

### `webmention` 在文档上链接到URL时通知URL

```html
<link rel="webmention" href="https://example.com/webmention">
```

### `micropub` 允许使用Micropub客户端发布到您自己的域

```html
<link rel="micropub" href="https://example.com/micropub">
```

### `search` Open Search

```html
<link rel="search" href="/open-search.xml" type="application/opensearchdescription+xml" title="Search Title">
```

### `Feeds`

```html
<link rel="alternate" href="https://feeds.feedburner.com/example" type="application/rss+xml" title="RSS">
<link rel="alternate" href="https://example.com/feed.atom" type="application/atom+xml" title="Atom 0.3">
```

### 预取，预加载，预浏览  [More info](https://css-tricks.com/prefetching-preloading-prebrowsing/)

```html
<link rel="dns-prefetch" href="//example.com/">
<link rel="preconnect" href="https://www.example.com/">
<link rel="prefetch" href="https://www.example.com/">
<link rel="prerender" href="https://example.com/">
<link rel="preload" href="image.png" as="image">
```

## iPhone iTouch iPad

### iPhone 和 iTouch，默认 57x57 像素图标，必须有

```html
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">
```

### Retina iPhone 和 Retina iTouch，114x114 像素图标，可以没有，但推荐有

```html
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png">
```

### Retina iPad，144x144 像素图标，可以没有，但推荐有

```html
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png">
```

### iPad 竖屏 768 x 1004（标准分辨率）启动画面

```html
<link rel="apple-touch-startup-image" sizes="768x1004" href="/splash-screen-768x1004.png">
```

### iPad 竖屏 1536x2008（Retina）启动画面

```html
<link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash-screen-1536x2008.png">
```

### iPad 横屏 1024x748（标准分辨率）

```html
<link rel="apple-touch-startup-image" sizes="1024x748" href="/Default-Portrait-1024x748.png"/>
```

### iPad 横屏 2048x1496（Retina）

```html
<link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash-screen-2048x1496.png"/>
```

### iPhone/iPod Touch 竖屏 320x480 (标准分辨率)

```html
<link rel="apple-touch-startup-image" href="/splash-screen-320x480.png"/>
```

### iPhone/iPod Touch 竖屏 640x960 (Retina)

```html
<link rel="apple-touch-startup-image" sizes="640x960" href="/splash-screen-640x960.png"/>
```

### iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina)

```html
<link rel="apple-touch-startup-image" sizes="640x1136" href="/splash-screen-640x1136.png"/>
```

## Icons (一般设置尺寸 32 x 32)

```html
<!-- 对于 IE 10 以下版本 -->
<!-- 将favicon.ico放在根目录中 - 无需标记 -->

<!-- 我们需要它的最高分辨率的图标 -->
<link rel="icon" sizes="192x192" href="/path/to/icon.png">

<!-- Apple Touch图标（重用192px icon.png） -->
<link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png">

<!-- Safari固定标签图标 -->
<link rel="mask-icon" href="/path/to/icon.svg" color="blue">
```