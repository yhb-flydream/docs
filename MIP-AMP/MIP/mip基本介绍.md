# MIP
[TOC]
### 创建 HTML 文件
- 在`<html>`头部添加`mip`标志
- 编码`UTF-8`
- 添加`meta-viewport`，用于移动端展现
```
<!DOCTYPE html>
<html mip>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

### 添加 MIP 运行环境
- 添加`mip.js 和 mip.css`
```
<!DOCTYPE html>
<html mip>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
    </body>
</html>
```

### 添加mip关联标签
> `<link rel="miphtml">`和`<link rel="canonical">` 主要用于告知搜索引擎页面间的关系。添加关联标签后，MIP 页的会继承 原页面 (移动端) 的点击权重，同时 MIP 页 将作为搜索引擎的首选导流页面。
使用规则：

- `<link rel="canonical">`在 MIP 页 中使用，`<link rel="miphtml">`在**原页面**使用
- 若 **原页面** 中已经存在`<link rel="canonical">`标签指向 PC 页，则 **MIP 页** `<link rel="canonical">`的 `href` 也指向 PC 页
- 若 **MIP 页**没有对应的**原页面**，则指向 **MIP 页本身 url**
```
<!DOCTYPE html>
<html mip>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
        <!--canonical 中的链接填写对应的非 mip 页地址-->
        <link rel="canonical" href="https://www.mipengine.org/test_xxx.html">
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
    </body>
</html>
```

### 添加内联样式
- 出于速度考虑，建议內联使用 css 样式。所有样式写在`<style mip-custom></style>`中
- **`注意：style 标签仅允许出现一次`**
```
<!DOCTYPE html>
<html mip>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css">
        <!--canonical 中的链接填写对应的非 mip 页地址-->
        <link rel="canonical" href="https://www.mipengine.org/test_xxx.html">
        <title>Hello World</title>
        <style mip-custom>
            h1 { color: red;}
        </style>
    </head>
    <body>
        <h1>Hello World!</h1>
        <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
    </body>
</html>
```

### 替换禁用的HTML标签
- 讲普通标签换为`mip`专用标签，优化响应速度


### 使用mip组件
- 在一个合法的MIP页面中，所有的交互通过引入MIP组件实现。
- MIP可以理解为封装了js的自定义HTML标签
```
<body>
        <h1>Hello World!</h1>
        <mip-img layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/mip_logo_3b722d7.png"></mip-img>
        <mip-share title=" 分享：我的第一个 MIP 页面 "></mip-share>
        <script src="https://mipcache.bdstatic.com/static/v1/mip.js"></script>
        <script src="https://mipcache.bdstatic.com/static/v1/mip-share/mip-share.js"></script>
</body>
```
> **`使用组件时需要查看是否需要额外的脚本，在mip.js之后引入`**


### MIP 加速原理
- 精心设计的JavaScript
  - MIP不允许自定义JavaScript
  - 对一些依赖强的JavaScript功能，MIP提供了一些组件来实现
  - 可以自定义组件

- 所有静态资源需要标明尺寸

- 不允许任何机制阻止页面渲染

- 控制外部资源加载

- 封装交互功能

- 使用内联式CSS

- 只允许GPU加速动画

- MIP缓存

### MIP HTML规范
- **头部规范**
  - 起始标签使用`<!doctype html>`
  - html 标签必须加上 mip 标记 `<html mip>`
  - 必须包含`<head> 和 <body>`
  - 必须在head标签中声明字符集`<meta charset='utf-8'>`
  - 必须设置 `viewport` `<meta name="viewport" content="width=device-width,initial-scale=1">`
  - 必须在引入 `< link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/v1/mip.css" >` 和`<script src="https://mipcache.bdstatic.com/static/v1/mip.js" ></script >`
  - 必须设置**MIP关联标签**
- **页面元素使用规范**
  - mip 禁止使用对页面性能影响较大的html标签，将其替换为 MIP 特有的标签

|标签|使用范围|备注|
| :-------- | --------:| :------: |
|img|mip-img||
|video|mip-video||
|audio|mip-audio||
|iframe|mip-iframe||
|style|`<style mip-custom>`|只能使用一次|
|script|禁止使用|禁止使用script标签，除以下两种情况：1）外联mip组件使用js；2）type为"application/ld+json" 或 "application/json"|
|svg|可以||
|button|可以||
|link|可以||
|a|可以，建议使用 mip-link组件 代替|不可以 `href='javascript:;'`|
|frame|NO||
|framest|NO||
|object|NO||
|param|NO||
|applet|NO||
|ambed|NO||
|form|mip-form|可以使用 input、textarea|
|input element|NO|包括select、option|

- **HTML属性**
  - 所有 `on`开头的属性都不允许使用
  - 允许使用 `on` 属性
  - 不允许使用 `style` 属性（行内）

- **自定义样式使用规范**
  - 不允许使用 内联style样式，只能放在head标签的style里


### Canonical 使用规范
- 必须在MIP页面添加 `<link rel="canonical">`指向原页面，保证MIP更好继承原始页面权重
  - 在 MIP 页 中使用`<link rel="canonical”>`，指向 原页面 (m 站)，也可以指向原始网页中`<link rel="canonical">`所指向的 pc 页
  - 若 MIP 页 没有对应的 原页面 ，则指向 MIP 页本身 url
- 新建MIP页面文件path建议
  - **原网页出现的文档名或文档id，在MIP页面命名时也要出现**
    - 如：原网页为：`http://m.baidu.com/123.html`
    - 则：`https://mip.baidu.com/123.html`
    - `https://m.baidu.com/mip/123.html`
    - `https://m.baidu.com/mip_123.html`
    - `https://mip.baidu.com/mip_123.html`
    - `https://m.baidu.com/mip_001.html`【`不建议使用`】
    -


## 组件开发
- 1、初始化组件
    - 在mip-extensions 目录下执行`mip addelement [组件名]`，生成`[组件名].js、[组件名].less、README.md、package.json`文件
    -
    -
- 2、组件开发
- 3、组件预览
    - 在mip-extensions 目录下执行`mip server`
    - 在浏览器打开最后一个链接，选择所开发的组件文件
    - 预览的HTML来自README.md的事例，可实时修改js和less文件