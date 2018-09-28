# link



## iPhone 和 iTouch，默认 57x57 像素图标，必须有

```html
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">
```

## Retina iPhone 和 Retina iTouch，114x114 像素图标，可以没有，但推荐有

```html
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png">
```

## Retina iPad，144x144 像素图标，可以没有，但推荐有

```html
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png">
```

## iPad 竖屏 768 x 1004（标准分辨率）启动画面

```html
<link rel="apple-touch-startup-image" sizes="768x1004" href="/splash-screen-768x1004.png">
```

## iPad 竖屏 1536x2008（Retina）启动画面

```html
<link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash-screen-1536x2008.png">
```

## iPad 横屏 1024x748（标准分辨率）

```html
<link rel="apple-touch-startup-image" sizes="1024x748" href="/Default-Portrait-1024x748.png"/>
```

## iPad 横屏 2048x1496（Retina）

```html
<link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash-screen-2048x1496.png"/>
```

## iPhone/iPod Touch 竖屏 320x480 (标准分辨率)

```html
<link rel="apple-touch-startup-image" href="/splash-screen-320x480.png"/>
```

## iPhone/iPod Touch 竖屏 640x960 (Retina)

```html
<link rel="apple-touch-startup-image" sizes="640x960" href="/splash-screen-640x960.png"/>
```

## iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina)

```html
<link rel="apple-touch-startup-image" sizes="640x1136" href="/splash-screen-640x1136.png"/>
```

## `canonical` 指定当前页规范化地址的 `URL`
```html
<link rel="canonical" href="https://www.linkeddb.com/">
```
- `href` 地址可以是**绝对路径**也可以是**相对路径**。通常还是建议使用绝对地址比较保险。

## `miphtml` 指定当前页的mip版本页面的URL
```html
<link rel="miphtml" href="https://mip.linkeddb.com/">
```
- `href` 地址建议使用绝对地址比较保险。

## `amphtml` 指定当前页的amp版本页面的URL
```html
<link rel="amphtml" href="https://amp.linkeddb.com/">
```
- `href` 地址建议使用绝对地址比较保险。

## `alternate`
- 使用 `hreflang` 设置语言和地区

```html
<link rel="alternate" hreflang="zh-cn" href="https://www.linkeddb.com/">
<link rel="alternate" hreflang="zh-HK" href="https://hk.linkeddb.com/">
<link rel="alternate" hreflang="zh-TW" href="https://tw.linkeddb.com/">
```

- `hreflang` 标签分两部分
  - 前面是**语言**
  - 后面是**地区**
- 上面标签指明的是，这个页面针对中文（zh）、中国地区用户（cn）