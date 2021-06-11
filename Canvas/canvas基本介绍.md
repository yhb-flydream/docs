# canvas

[TOC]

- canvas 是 HTML5 提供的一个用于展示绘图效果的标签.

- canvas 原意画布, 帆布. 在 HTML 页面中用于展示绘图效果
- `<canvas></canvas>`使用 canvas 标签, 即可在页面中开辟一格区域

- 默认 canvas 的宽高为 300 和 150 **(设置不带单位)**
- 用 CSS 设置 canvas 的宽高属性会拉伸内容，和设置图片类似，只是放大缩小了画布的缩放比，画布本身没改变，所以要**用属性来设置**

- 如果浏览器不支持 canvas 标签, 那么就会将其解释为 div 标签.
- 因此常常在 canvas 中嵌入文本, 以提示用户浏览器的能力

- canvas 本身不能绘图，只是一个展示图像的标签. 是使用 JavaScript 来完成绘图的. canvas 对象提供了各种绘图用的 api

- `Canvas.getContext("")`用于绘制上下文工具
  - 如果是绘制平面图形使用 `'2d'`作为参数,返回 `CanvasRenderingContext2D` 类型的对象
  - 如果绘制立体图形使用`'webgl'` 返回 `WebGLRenderingContext`类型的对象

```html
<canvas id="cvs" width="500" height="500"></canvas>

<script>
  // 获取元素
  var cvs = document.getElementById('cvs')

  //调用 getContext 方法，得到CanvasRenderingContext2D 类型的对象
  //使用 CanvasRenderingContext2D 对象提供的方法进行绘图
  var context = cvs.getContext('2d')

  //设置开始绘图的位置(起点)
  context.moveTo(10, 10)

  //设置从开始画直线到的位置
  context.lineTo(110, 10)
  context.lineTo(110, 110)
  context.lineTo(10, 110)
  context.lineTo(10, 10)

  //闭合路径
  context.closePath()

  //描边绘制
  context.stroke()

  //填充绘制(颜色填充)
  context.fill()
</script>
```

- **设置起点：**

  - 语法：
    - `context.moveTo(x坐标，y坐标);`

- **画线：**

  - 语法：
    - `context.lineTo(x坐标，y坐标)`
    - `lineTo`也可以设置路径的起点
    - 在一个没有路径起点的路径中，第一个 lineTo 就相当于 moveTo

- **描边色：**

  - 语法：
    - `context.strokeStyle = "颜色样式"`
    - 写在`context.stroke()`之前；

- **描边：**
  - 语法：
    - `context.stroke();`

**解决`context.stroke()`会重绘之前的路径问题**

- 在之前画好的图形`context.stroke()`后添加`context.beginPath()`清除之前的路径
- 或在开始画图之前添加`context.beginPath()`清除之前的路径，避免和之后的路径重合

- **闭合路径**

  - 语法：
    - `context.closePath()`
    - 写在画线之后，设置闭合路径可以不画最后一条线
    - 也可以解决因设置了线宽而带来的**锯齿问题**

- **填充色：**

  - 语法：
    - `context.fillStyle = "颜色样式"`
    - 写在`context.fill()`之前
    - **写在`context.stroke()`之前，和之后效果不一样**

- **颜色填充：**

  - 语法：
    - `context.fill()`
    - 默认为黑色
    - 调用方法时，会先自动`closePath()`，再填充颜色

- **非零环绕原则：**
  - 判断画布中的哪些地方需要填充
    > 原理：
    >
    > 任意一个区域内，找一个点向外发射一条射线，然后会进行计数判断(初始值为 0)，如果射线遇到的边是相对于这个点，如果是逆时针环绕的，就计数为-1，顺时针记+1，最终结果如果为 0，则判断该区域被填充（射线经过奇数边肯定被填充）

## 线

- **线宽：**

  - 语法：
    - `context.lineWidth = 宽度`
    - 写在`context.stroke()`之前；
    - **设置线宽时，路径在线宽中间**

- **线帽样式：**

  - 语法：
    - `context.lineCap = "butt"、"round"、"square";`
      - `butt`(默认样式)
      - `round`(两端使用圆角结束)
      - `square`(两端使用线宽的一半结束)

- **交点样式：**
  - 语法：
    - `context.lineJion = 'round', 'bevel', 'miter'`
      - `miter`(默认)
      - `round`(使用圆角连接)
      - `bevel`(使用平切连接)

> **如果线帽与交点样式不一致，优先按照`交点`样式处理**

- **虚线**

  - 1、设置虚线

    - 语法：
      - `context.setLineDash ([实线部分长度，虚线部分长度])`
      - 可以传入一个参数，或多个

  - 2、获取虚线

    - 语法：
      - `context.getLineDash()`
      - 直接调用

  - 3、设置绘制虚线时的偏移量
    - 语法：
      - `context.lineDashOffset()`

## 矩形

- **矩形路径**

  - 语法：
    - `context.rect(x,y,w,h);`
    - 需要自己描边`context.stroke()`

- **绘制描边矩形**

  - 语法：
    - `context.strokeRect(x,y,w,h)`
  - 不会产生任何路径

- **绘制填充矩形**

  - 语法：
    - `context.fillRect(x,y,w,h)`
  - 不会产生任何路径

- **清除画布(清除矩形区域)**
  - 语法：
    - `context.clearRect(x，y，w，h);`
      - `x` 擦除图形左上角 x 轴坐标
      - `y` 擦除图形左上角 y 轴坐标
      - `w` 擦除宽度
      - `h` 擦除高度

## 圆弧

- **绘制圆弧**
  - **语法：**
    - `context.arc(x, y, r, start, end, 是否逆时针画[true/false 可选])`
      - `x` 圆心 x 坐标
      - `y` 圆心 y 坐标
      - `r` 半径[`radius`]
      - `start` 起始弧度[`startAngle`]
      - `end` 结束弧度[`endAngle`]
- **绘制相切弧**
  - **语法：**
    - `context.arc(x1, y1, x2, y2, r)`
      - `x1` 线段 1 的起点 x1 坐标
      - `y1` 线段 1 的终点 y1 坐标
      - `x2` 线段 2 的起点 x2 坐标
      - `y2` 线段 2 的终点 y2
      - `r` 半径[`radius`]

## 文本

- **描边文本：**

  - 语法
    - `context.strokeText("文本", x, y, 限制文本最大长度[可选])`

- **填充文本：**

  - 语法
    - `context.FillText("文本", x, y, 限制文本最大长度[可选])`

- **字体：**

  - 语法
    - `context.font = 粗细[100--900], 大小[px、em], 字体样式`
    - `style | variant | weight | size/line-height | family`

- **水平排列方式：**

  - 语法
    - `context.textAlign = start(left)|center|end(right)`
    - 默认为值为`start(left)`

- **垂直排列文本：**

  - 语法
    - `context.textBaseline= top|middle|bottom|alphabetic|hanging|ideographic`
      - 默认为值为`alphabetic(字母基线)`
      - `top`在四线三格的上面；
      - `middle`在四线三格的中间；
      - `bottom`在四线三格的下间；
      - `alphabetic`在四线三格中第三条线；
      - `hanging`相当于四线三格中第一条线；
      - `ideographic`表示和`bottom`基本一致。

- **文本宽度预测：**
  - 语法：
    - `context.measureText("文本").width`
    - 检测文本的宽度

## 绘制图片

> 可以绘制图片，也可以绘制 canvas
> 第一个参数可以是 img，canvas，video

- **图片监听事件：**

  - `img.onload = function () {}`
  - 图片加载后，再执行 function 里面的代码

- **3 参数语法：**

  - `context.drawImage(图像资源, x坐标, y坐标)`
  - 把图像绘制到指定位置

- **5 参数语法：**

  - `context.drawImage(图像资源, x坐标, y坐标, 图像显示的宽, 图片显示的高)`
  - 把图片按照指定大小，绘制到指定位置

- **9 参数语法：**
  - `context.drawImage(图像资源, 开始剪切x坐标, 开始剪切y坐标, 剪切宽度, 剪切高度, x坐标, y坐标, 图像显示的宽, 图片显示的高)`
  - 把剪裁的图片按照指定大小，绘制到指定位置

## 状态

- **状态保存：**

  - `context.save()`
  - 保存当前状态
  - 会把绘图环境自身的所有属性保存一份(可见和不可见)

- **状态回滚：**
  - `context.restore()`
  - 回滚到上次保存的状态

**没有和路径相关的状态，`save和restore`不能保存路径**

## 平移

- 语法：
  - `context.translate(在当前的基础上x轴平移多少, 在当前的基础上y轴平移多少)`
  - **平移的是画布的坐标系，不会影响已经绘制好的图**
  - **会累加**

## 旋转

- 语法：
  - `context.rotate(在当前的基础上旋转多少弧度)`
  - **旋转的是画布的坐标系，不会影响已经绘制好的图**
  - **会累加**

## 缩放

- 语法：
  - `context.scale(在当前的基础x轴缩放多少倍, 在当前的基础y轴缩放多少倍)`
  - **缩放的是画布的坐标系，不会影响已经绘制好的图**
  - **会累加**
    - 参数 x 控制水平缩放倍率. 传参 1 表示不缩放, 传入大于 1 的数字表示扩大
    - 参数 y 控制垂直缩放倍率. 传参 1 表示不缩放, 传入大于 1 的数字表示扩大

## requestAnimationFrame

- 请求动画帧，用法和 setTimeout 一致，只是不需要传时间
- 浏览器刷新页面时，才会调用该方法的回掉函数，执行频率比较稳定，是专门制作动画用的

## 路径点判断

- 语法：
  - `context.isPointInPath(x坐标, y坐标)`
  - 判断指定坐标的点在不在**当前路径**内
- 返回值
  - Boolean(在为 true)

## 画布保存

- 语法:
  - `Canvas.ToDataURL( type, encoderOptions )`
    - `type` 表示输出类型. 例如: `image/png` 或 `image/jpeg` 等
    - `encoderOptions` 表示图片输出质量, 其取值在 0 到 1 之间.
      - 如果是 1, 表示无损压缩, 必须使用 `image/jpeg` 或 `image/webp` 才起作用
      - `png`类型不会压缩
  - 该方法可以将画布转换成 `base64` 格式的数据

## 线性渐变

- 语法:
  - `context.createLinearGradient(x0, y0, x1, y1)`

## 放射渐变

- 语法：
  - `context.createRadialGradient(x0, y0, r0, x1, y1, r1)`

## 重复填充

- 语法;
  - `context.createPattern(img, repetition)`
  - **默认就是 `repeat`**
  - 表示使用图片来填充的设置方法，需要两个参数，一个是图片，一个是重复的方式
    - 图片允许是 img 标签，图片，canvas 等对象
  - 可选择的重复方式与 CSS 一致. 有:
    - `repeat, repeat-x, repeat-y, no-repeat`
  - 如果是 空或`""`, 但不是 undefined, 默认就是 `repeat`

## 阴影

- `context.shadowBlur`
  - 表示模糊程度
- `context.shadowColor`
  - 表示模糊颜色
- `context.shadowOffsetX`
  - 表示模糊位置 x 坐标偏移
- `context.shadowOffsetX`
  - 表示模糊位置 y 坐标偏移
