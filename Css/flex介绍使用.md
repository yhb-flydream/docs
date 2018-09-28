# Flex

[Flex 布局教程 - 语法篇 - 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex 布局教程 - 实例篇 - 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

- `display: flex;` 任何容器
- `display: inline-flex;` 行内元素
- `display: -webkit-flex;` webkit内核
- 设置flex布局后，子元素的 `float、clear、vertical-align` 属性将失效

## 基本概念

- 采用flex布局的元素称为 **Flex容器**。
- 容器的所有子元素称为容器的成员 **Flex项目**。
- 容器默认存在两根轴：
  - 水平的主轴（由 `flex-direction` 决定）
  - 垂直的交叉轴

## `Flex` 容器属性

### `flex-direction` 决定主轴方向（项目排列方向）

- `row | row-reverse | column | column-reverse`
  - `row`（默认）主轴水平，起点在左端（从左至右）
  - `row-reverse` 主轴水平，起点在右端（从右至左）
  - `column` 主轴垂直，起点在上沿（从上到下）
  - `column-reverse` 主轴垂直，起点在下沿（从下到上）

### `justify-content`（定义项目在主轴上的对齐方式）

- `flex-start | flex-end | center | space-between | space-around`
  - `flex-start`（默认值）左对齐
  - `flex-end` 右对齐
  - `center` 居中
  - `space-between` 两端对齐，项目之间距离相等
  - `space-around` 每个项目两侧间距相等，即两个项目之间间距是一侧的二倍

### `align-item`（项目在交叉轴方向上如何对齐）

- `flex-start | flex-end | center | baseline | stretch`
  - `stretch`（默认值）如果项目未设置高度或为auto，将占满整个容器
  - `flex-start` 顶端对齐
  - `flex-end` 底端对齐
  - `center` 垂直居中
  - `baseline` 第一行文字基线对齐

### `flex-wrap`（如果一条轴线排布不下如何换行）

- `nowrap | wrap | wrap-reverse`
  - `nowrap`（默认值）不换行
  - `wrap` 换行，第一行在上方
  - `wrap-reverse` 换行，第一行在下方

### `flex-flow`（是`flex-direction`和`flex-wrap`简写）默认`row nowrap`

- `<flex-direction> || <flex-wrap>`

### `align-content`（定义了**`多根轴线的对齐方式`**，*如果项目只有一条轴线，该属性不起作用*）

- `flex-start | flex-end | center | space-between | space-around | stretch`
  - `stretch`（默认值）轴线占满整个交叉轴
  - `flex-start` 与交叉轴的起点对齐
  - `flex-end` 与交叉轴的终点对齐
  - `center` 与交叉轴的中点对齐
  - `space-between` 与交叉轴两端对齐，轴线之间的间隔平均分布
  - `space-around` 每根轴线两侧间距相等，轴线之间的间隔比轴线与边框之间的间隔大一倍

## 项目属性（设置`display: flex;`属性元素的子元素的属性）

### `order`定义项目排列顺序，数值越小，排列越靠前，默认值0（可以为负数）

- `order: 0;`

### `flex-grow`定义项目放大比例，`默认0`，即如果存在剩余空间，也不放大

- `flex-grow: <number>; /* default 0 */`
- 如果所有项目的`flex-grow属性都为1`，则它们将等分剩余空间（如果有的话）。
- 如果一个项目的`flex-grow属性为2`，其他项目都为1，则前者占据的剩余空间将比其他项多一倍

### `flex-shrink`定义项目缩小比例，`默认1`，即如果空间不足，该项目将缩小

- `flex-shrink: <number>; /* default 1 */`
- 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
- 如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小
- **负值对该属性无效**

### `felx-basis`定义了分配多余空间之间，项目占主轴的空间，浏览器根据这个属性，计算主轴是否多余空间，默认auto，即项目本来空间

- `flex-basis: <length> | auto; /* default auto */`
- 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间

### `flex`是`flex-grow、flex-shrink、flex-basis`的简写，默认值`0 1 auto`，后两个属性可选

- `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
- 该属性有两个快捷值：`auto（1 1 auto）`和`none（0 0 auto）`
- 建议优先使用该属性，而不是单独写三个分离的属性

### `align-self`允许单个项目有其他项目不一样的对齐方式，可覆盖`align-items`属性，默认值`auto`表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`

- `auto | flex-start | flex-end | center | baseline | stretch`
