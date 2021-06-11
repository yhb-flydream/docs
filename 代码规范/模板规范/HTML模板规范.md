# html 基本模板规范

[TOC]

如下是 html 模板规则的介绍，可以直接拿来用模板代码在同目录的 `index.html` 中

`class` 类名设置中符号一般只有 `__`(标识下层元素) 和 `-`(标识分隔符)

## `head` 部分(模板中也有标注如何取舍)

### `viewport`

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
```

- 在 `mobile 和 自适应` 模式下设置 `PC` 版不需要设置

### `applicable-device`

```html
<!-- 手机版 content 替换成 mobile -->
<!--<meta name="applicable-device" content="mobile">-->
<!-- 自适应 content 替换成 pc,mobile -->
<!--<meta name="applicable-device" content="pc,mobile">-->
```

### `icon`

```html
<!-- 替换 浏览器标签图标 以 .ico 结尾的文件 -->
<link rel="shortcut icon" type="image/x-icon" href="xxx/favicon.ico" />
```

### `stylesheet` (不推荐 添加 `type` 属性)

```html
<link rel="stylesheet" href="" />
```

## `body`

- **在主要模块部分的 `class` 属性的开头位置有 `xxx`，此为项目标记*(例如：明星 CP，则 xxx 为 CP)*，尽量用简化标记，只有最外层主要部分可以用`xxx`标注**

- `body` 标签 添加一个全局的 `class` 属性 `xxx-body-wrap`
- 内层再添加一层 `div` `class` 属性设置为 `xxx-body-main`
- 在此结构内部写开始主体结构

```html
<body class="xxx-body-wrap">
  <!-- body 主体 -->
  <div class="xxx-body-main"></div>
</body>
```

### 主体内容模块结构

- `xxx` 为项目标记
- `yyy` 为模块名
- `-wrap` 为最外层
- `-main` 包括模块主体内容

#### 模块主体部分可以分为两种组合

- 第一种：**上中下**结构
  - `__hd`
  - `__bd`
  - `__ft`
- 第二种：**左中右**结构
  - `__lt`
  - `__ct`
  - `__rt`

```html
<!-- 第一种：**上中下**结构 -->
<div class="xxx-yyy-wrap">
  <div class="xxx-yyy-main">
    <div class="yyy__hd"></div>
    <div class="yyy__bd"></div>
    <div class="yyy__ft"></div>
  </div>
</div>

<!-- 第二种：**左中右**结构 -->
<div class="xxx-yyy-wrap">
  <div class="xxx-yyy-main">
    <div class="yyy__lt"></div>
    <div class="yyy__ct"></div>
    <div class="yyy__rt"></div>
  </div>
</div>
```

#### 当为列表数据时

- 外层为 `-list`
- 内部列表为 `-item`

```html
<div class="yyy-list">
  <div class="yyy-item">
    <div class="yyy-item__hd"></div>
    <div class="yyy-item__bd"></div>
    <div class="yyy-item__ft"></div>
  </div>
</div>
```

- 若果 `item` 整块为链接，则结构如下

```html
<div class="yyy-list">
  <div class="yyy-item">
    <a href="javascript:;" class="yyy-item-link">
      <div class="yyy-item__hd"></div>
      <div class="yyy-item__bd"></div>
      <div class="yyy-item__ft"></div>
    </a>
  </div>
</div>
```

#### 模块的 `title`

- 模块有可能会有一个标题
- 那么结构一般用 **第一种：`上中下`结构** 标题就写在 `yyy__hd`里面，或者 `yyy-item__hd`
- 结构如下：

```html
<div class="yyy__hd">
  <h4 class="yyy__hd-title h4-title"></h4>
</div>
<div class="yyy-item__hd">
  <h4 class="yyy-item__hd-title h4-title"></h4>
</div>
```

- 一般用 `h4` 做模块标题
- 这里结构就不用带 `xxx`了，直接写模块名 `yyy`，需要带上 `__hd` 模块区域标记
- 添加一个 `h4-title` 是为了多个模块都有标题，且样式一致时，统一设置样式

#### `icon` 小图标

- 一般用 `span` 承载
- 需设置 公共 `class` 类 `icon`，供设置统一样式
- `<span class="icon icon-arrow"></span>`
- 小的图标(如：箭头等)，如果使用的 UI 模板，可以使用对应的 `class` 来设置图标
- 如果没有则通过 **伪元素(`before, after`)** 来设置

#### `a` 链接

- 如果有链接需要设置 `class` 属性，需要在末尾加上 `-link` 标注它是链接

#### `img` 图片部分

- 图片有时候需要居中处理，所以单独嵌套一层

```html
<div class="img-wrap">
  <img class="img" src="" alt="" />
</div>
```

- 嵌套层 `class` 用 `img-wrap`
- `img` 图片用 `img` 标注

#### 其他内容部分

- 其他内容，如：时间(`time`)，性别(`sex`) ...
- 比较简单的元素一般用 `span`来标注，`class` 属性可以直接写对应的英文

### 主体内容结构

- 顶部导航 `xxx-nav-header`

```html
<div class="xxx-nav-header-wrap">
  <div class="xxx-nav-header-main">
    <div class="nav-header__hd">
      <div class="nav-header__hd-title">
        <h4 class="title h4-title">
          <span class="icon icon-arrow"></span>
        </h4>
      </div>
    </div>
    <div class="nav-header__bd"></div>
    <div class="nav-header__ft"></div>
  </div>
</div>
```

- 头部 `xxx-header`

```html
<div class="xxx-header-wrap">
  <div class="xxx-header-main">
    <div class="header__hd"></div>
    <div class="header__bd"></div>
    <div class="header__ft"></div>
  </div>
</div>
```

- banner 图 `xxx-banner`

```html
<div class="xxx-banner-wrap">
  <div class="xxx-banner-main">
    <div class="banner__hd"></div>
    <div class="banner__bd"></div>
    <div class="banner__ft"></div>
  </div>
</div>
```

- 内容部分 `xxx-content`
  - 左侧内容 `article`
    - 不一定用下面 `__item` 形式的结构，这种结构是为了在结构统一是使用的
    - 可以根据每一部分不同的功能来定义不同的名字 `abc，def ...`
  - 右侧内容 `aside`
    - 同 `article`

```html
<div class="xxx-content-wrap">
  <div class="xxx-content-main">
    <div class="article-wrap">
      <div class="article-main">
        <div class="abc-wrap article-section">
          <div class="abc-main">
            <div class="abc__hd"></div>
            <div class="abc__bd"></div>
            <div class="abc__ft"></div>
          </div>
        </div>
        <div class="def-wrap article-section">
          <div class="def-main">
            <div class="def__hd"></div>
            <div class="def__bd"></div>
            <div class="def__ft"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-wrap">
      <div class="aside-main">
        <div class="abc-wrap aside-section">
          <div class="abc-main">
            <div class="abc__hd"></div>
            <div class="abc__bd"></div>
            <div class="abc__ft"></div>
          </div>
        </div>
        <div class="def-wrap aside-section">
          <div class="def-main">
            <div class="def__hd"></div>
            <div class="def__bd"></div>
            <div class="def__ft"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

- 尾部 `xxx-footer`

```html
<div class="xxx-footer-wrap">
  <div class="xxx-footer-main">
    <div class="footer__hd"></div>
    <div class="footer__bd"></div>
    <div class="footer__ft"></div>
  </div>
</div>
```

- 底部导航(一般为底部固定部分, 目前用的场景不是太多) `xxx-nav-footer`

```html
<div class="xxx-nav-footer-wrap">
  <div class="xxx-nav-footer-main">
    <div class="nav-footer__hd"></div>
    <div class="nav-footer__bd"></div>
    <div class="nav-footer__ft"></div>
  </div>
</div>
```

**结构也可不用完全按照 `__hd,__bd,__ft` 来写，如果有引用其他插件(如：swiper)，可不用写 `__hd,__bd,__ft`**

```html
<div class="xxx-banner-wrap">
  <div class="xxx-banner-main">
    <!-- swiper 部分-->
    <div class="swiper"></div>
  </div>
</div>
```
