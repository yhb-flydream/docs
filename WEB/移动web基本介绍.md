# 移动 WEB

[TOC]

## 屏幕

**尺寸**

- 屏幕对角线的长度（一般用英寸来度量）

**分辨率**

- 用像素来度量，表示屏幕水平和垂直方向的像素数

## 长度单位

**`px in em cm pt`**

- 相对长度
  - `px em pt`
- 绝对长度
  - `in cm`

**常用`px`**

## 像素密度 PPI/DPI

> 由勾股定理得出
> Retina 即视网膜屏幕，苹果注册的命名方式，意指具有较高 PPI（大于 320）的屏幕
>
> 屏幕尺寸固定时：
> 当 PPI 越大，像素的实际大小就会越小，
> 当 PPI 越小，像素实际大小就越大

## 设备独立像素

- IOS
  - `pt`
- Android
  - `DP/DIP`

## 像素

**物理像素**

- 获取屏幕的物理像素尺寸：
  - `window.screen.width;`宽度
  - `window.screen.height;`高度

**CSS 像素**

- 其默认值(PC 端)是和物理像素保持一致的
  - 1 个单位的 CSS 像素等于 1 个单位的物理像素
  - 但是我们可通缩放来改变其大小

## iPhone 常见手机尺寸

| 型号  |   尺寸 |  物理像素   | ideal viewport |
| :---- | -----: | :---------: | -------------- |
| 3G    | 3.5 寸 |  480`*`320  | 480`*`320      |
| 4     | 3.5 寸 |  960`*`640  | 480`*`320      |
| 5     | 4.0 寸 | 1136`*`640  | 568`*`320      |
| 6     | 4.7 寸 | 1334`*`750  | 667`*`375      |
| 6pius | 5.0 寸 | 1920`*`1080 | 736`*`414      |

## 视口（viewport）

- 用来约束你网站中最顶级块元素`<html>`的，即它决定了`<html>`的大小

- viewport 的大小取决于浏览器窗口的大小，以 CSS 像素做为度量单位

  - 获取 viewport 的大小：
    - `document.documentElement.clientWidth;`宽
    - `document.documentElement.clientHeight;`高

- 在 PC 端，我们通过调整浏览器窗口可以改变 viewport 的大小，为了保证网页布局不发生错乱，需要给元素设定较大固定宽度

- 在移动设备上 viewport 不再受限于浏览器的窗口，而是允许开发人员自由设置 viewport 的大小，通常浏览器会设置一个默认大小的 viewport，为了能够正常显示那些专为 PC 设计的网页，一般这个值的大小会大于屏幕的尺寸`（一般为980px）`

- **移动设备的 viewport**

  - `layout viewport`布局视口
    - 指的是我们`可以进行网页布局区域的大小`，同样是以 CSS 像素做为计量单位
    - **获取 layout viewport**
      - `document.documentElement.clientWidth;`宽
      - `document.documentElement.clientHeight;`高
  - `ideal viewport`理想视口
    - `设备屏幕区域`（以设备独立像素 PT、DP 做为单位）以 CSS 像素做为计量单位，其大小是 不可能被改变
    - **获取 ideal viewport 有两种情形**
      - `window.screen.width;`
      - `window.screen.height;`
      -
      - `window.screen.width / window.devicePixelRatio;`
      - `window.screen.height / window.devicePixelRatio;`

- 移动端浏览器
  - 系统浏览器
  - 应用内置浏览器(WebView)
  - 第三方浏览器（FireFox、Chrome、360）

## 屏幕适配

**viewport**

- `<meta name="viewport" content="">`通过设置属性 content=""实现，中间以逗号分隔
  - `width/height`
    - 设置 layout viewport 宽度，其取值可为数值或者 device-width/device-height
    - device-width 和 device-height 就是 ideal viewport 的宽高
  - `initital-scale`
    - 设置页面的初始缩放值，为一个数字，可以带小数
  - `maximum-scale/minimum-scale`
    - 允许用户的最大/最小缩放值，为一个数字，可以带小数
  - `user-scalable`
    - 是否允许用户进行缩放，值为"no"或"yes"

**`<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable ">`**

- 当我们设置`width=device-width`，也达到了`initial-scale=1`的效果，得知其实 `initial-scale = ideal viewport / layout viewport`
  - 两种方式都可以控制缩放，开发中一般同时设置 `width=device-width和initial-scale=1.0`（为了解决一些兼容问题）

**避免滚动**

- 滚动条是 `layout viewport` 相对于 `ideal viewport` 的，所以只要设置 `layout viewport` 小于或等于 `ideal viewport`，即`<meta name="viewport" content="width=device-width">`
- 经测试发现我们并没有完全的解决滚动条的问题，原因在于我们示例里的`.box {width: 490px;}`设置了一个绝对的宽度造成的，要解决这个问题我们可以`设置一个百分比（100%）`的宽度

### 适配方案

**rem 单位**

- 1、设置`<meta name="viewport" content="width=device-width, initial-scale=1">`
- 2、设置页面元素宽度单位为 rem 或 em
- `em`
  - 是相对长度单位，其`参照当前元素字号大小`，如果当前元素未设置字号则会继承其祖先元素字号大小
  - 例：`.box {font-size: 16px;}则 1em = 16px`
  - `.box {font-size: 32px;} 则 1em = 32px，0.5em = 16px`
- `rem`
  - 相对长度单位，其`参照根元素(html)字号大小`
  - 例：`html {font-size: 16px;} 则 1rem = 16px `
  - `html {font-size: 32px;} 则 1rem = 32px，0.5rem = 16px`

**百分比**

- 1、设置`<meta name="viewport" content="width=device-width, initial-scale=1">`
- 2、设置页面宽度为百分比
  |width|参照父元素的宽度|
  |:---|:---|
  |height|参照父元素高度|
  |padding|参照父元素宽度|
  |border|不支持百分比设置|
  |margin|参照父元素的宽度|

**固定宽度(很少用)**

- 1、设置`<meta name="viewport" content="width=device-width, initial-scale=1">`
- 2、设置内容区域大小为 320px
- 3、设置内容区域水平居中显示

**100%像素**

## 扩展

- `line-height`

  - 父盒子设置的值为`百分比`时，子盒子的行高继承的是以`父盒子字号`为标准的
  - 父盒子设置的值为`具体数字`时，子盒子的行高继承的是以`自身的字号`为标准的

- **避免全局变量污染**

  - 设置一个命名空间

- **设置全屏：`width:100%; height:100%;`**

- **设置遮罩**

  - 用`position：fixed;`

- **有浮动的元素，谁受到影响，给谁清 clear:both;**

- `overflow-scrolling:touch;`设置平滑滚动

  - 不设置时移动端在滑屏时会迟钝

- `-webkit-tap-highlight-color: transparent;`

  - 设置清除点击有背景反应 (a、...)

- **★ 设置多余的字以 `...` 显示**

```
display: -webkit-box;
overflow: hidden;
text-overflow: ellipsis;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
word-break: break-all;

/*--------------------------------------------------------*/
1.单行文本溢出需要满足三个条件：

　　overflow:hidden;     white-space:nowrap;  text-overflow:ellipsis;

2.多行文本溢出需要满足下面几个条件：

　　display:-webkit-box; overflow:hidden;

　　text-overflow:ellipsis; word-break:break-all;

　　-webkit-box-orient:vertical; //子元素应该被水平或垂直排列

　　-webkit-line-clamp:3;  //3行后显示省略号


word-wrap是控制换行的。
使用break-word时，是将强制换行。中文没有任何问题，英文语句也没问题。但是对于长串的英文，就不起作用。break-word是控制是否断词的。
normal是默认情况，英文单词不被拆开。
break-all，是断开单词。在单词到边界时，下个字母自动到下一行。主要解决了长串英文的问题。
keep-all，是指Chinese, Japanese, and Korean不断词。即只用此时，不用word-wrap，中文就不会换行了。（英文语句正常。）

语法： word-wrap : normal | break-word 参数： normal : 允许内容顶开指定的容器边界 break-word : 内容将在边界内换行。如果需要，词内换行（word-break）


-webkit-line-clamp 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。 常见结合属性：

1，display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。

2，-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

3，text-overflow: ellipsis; ，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本
```

## CSS 预处理器 `Less`

**常见的 CSS 预处理器有：`LESS`、`SASS`、`Stylus`**

**安装**

- 1、安装 Nodejs 环境 Node Package Manager `(验证 node -v npm -v)`
- 2、打开控制台（cmd），执行 npm install -g less (验证 lessc -v)
- 3、命令行编译 lessc path/xxx.less path/xxx.css

**语法**

- 变量
  - `@变量名：值；`（可以重复使用）
- 混合

```
定义一个函数，
.box-sizing (默认参数[@box-sizing: border-box;]) {
  box-sizing: border-box;
}

调用函数，
.box { .box-sizing(参数);}
```

- 嵌套
  - 可以非常方便的管理我们的 CSS 层级关系

**使用**

- 1、下载然后引入 less.js
- 2、引入 xx.less 文件，如：
  - `<link rel="stylesheet/less" type="text/css" href="xx.less" />`
- **注意：**
  - **rel 属性必须指定成 stylesheet/less，并且 styles.less 要`先于less.js引入`。**
  - **必须以服务器方式访问**
  - 因为 js 不能访问本地文件，只有在服务器环境下 js 才能，访问本地文件

## 媒体查询

**关键字**

- 1、and 可以将多个媒体特性连接到一起，相当于“且”的意思。
- 2、not 排除某个媒体类型，相当于“非”的意思，可以省略。
- 3、only 指定某个特定的媒体类型，可以省略

**引入方式**

- link 方式
  - `<link href="./xxx.css" media="only screen and (max-width: 320px)">`
- @media 方法（写在 CSS 里）

```
@media only screen and (max-width: 980px) {
  body {
    font-size: 16px;
  }
}
```

**常用特性**

- 1、width / height 完全等于 layout viewport，
- 2、max-width / max-height 小于等于 layout viewport，
- 3、min-width / min-height 大于等于 layout viewport，
- 4、device-width / device-height 完全等于 ideal viewport，
- 5、orientation: portrait | landscape 肖像/全景模式

## rem 适配

## 触屏事件

**类型**

- `touchstart:` 手指触摸屏幕时触发
- `touchmove:` 手指在屏幕上移动时触发
- `touchend:` 手指离开屏幕时触发

**TouchEvent 对象**

- `touches:`位于屏幕上的所有手指的列表
- `targetTouches:`位于该元素上的所有手指列表`（建议使用）`
- ` changedTouches:``touchstart `时包含刚与触摸屏接触的触点，`touchend`时包含离开触摸屏的触点
  - 用此事件获取触发`touchend`时的信息

**Touch 对象**

- `clientX/Y`
  - 手指相对于 layout viewport 的水平/垂直像素距离`【推荐使用】`
- `pageX/Y`
  - 手指相对于 layout viewport 的水平/垂直像素距离（含滚动）
- `screenX/Y`
  - 手指相对于 layout viewport 的水平/垂直像素距离（含滚动）

**click 延时：`【面试】`**

- 早期移动设备浏览器网页时内容非常小，
- 为了增强用户体验，苹果公司专门为移动设备设计了双击放大的功能，
- 确保用户可以非常方便的放大网页内容，
- 但是当用户单击一个按钮时，移动设备会`延时（约300ms）`执行，判断用户是否要双击
- `用触屏事件可以解决这个问题`

## zepto.js

**压缩版的 js 库，可定制功能，更轻更小**

**使用步骤**

- 1、安装 Nodejs 环境
- 2、下载 zepto.js
- 3、解压缩
- 4、cmd 命令进行解压缩后的目录
- 5、执行`npm install`命令
- 6、编辑 make 文件，添加自定义模块，并保存
  - `41/42行修改自定义模块`
- 7、然后执行`npm run-script dist` 生成的目标文件在一个 dist 文件夹中
- 8、查看目录 dist 中构建好的 zepto.js

## 移动端类库

**`iScroll.js`**（可实现客户端原生滚动效果）

- 1、下载 iScroll
- 2、build 目录下提供了不同版本的 iScroll，可根据情况使用
- 3、html 要求有 3 层结构
- 4、获取 wrapper 这个最外层结构，然后实例化

```
<script src="js/iscroll"> </script>
<script>
  var wrapper = document.querySelector(".wrapper");
  IScroll (wrapper,{
    //配置参数
  });
</script>
```

**`swipe.js、swiper.js、fastclick`**

## 页面布局

**布局方式**

- 固定宽度
  - 为网页设置一个固定的宽度，通常以 px 做为长度单位，常见于 PC 端网页
- 流式布局
  - 网页设置一个相对的宽度，通常以百分比做为长度单位
- 栅格化布局
  - 将网页宽度人为的划分成均等的长度，然后排版布局时则以这些均等的长度做为度量单位，通常利用百分比做为长度单位来划分成均等的长度
- **`响应式布局`**
  - 通过检测设备信息，决定网页布局方式，即用户如果采用不同的设备访问同一个网页，有可能会看到不一样的内容，一般情况下是检测设备屏幕的宽度来实现

**响应式布局**
**主要用到媒体查询**

- 我们利用媒体查询可以检测到屏幕的尺寸（主要检测宽度），并设置不同的 CSS 样式，就可以实现响应式的布局
- 布局方式
  - 类型——布局宽度
  - 大屏—— (>=1200px) `min-width:1200px`
  - 默认——（>=980px）`min-width:980px`
  - 平板——（>=768px）`min-width:768px`
  - 手机到平板——（<=767px）`min-width:480px max-width:767px`
  - 手机——（<480px）`max-width:480px`

## CSS 框架

- Amaze UI
- Framework7
- Bootstrap

## Bootstrap
