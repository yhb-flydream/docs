# Grid

[CSS Grid 布局完全指南](http://www.css88.com/archives/8510)

**CSS Grid(网格) **布局（又称为 “Grid(网格)” ），是一个`二维的基于网格的布局系统`它的目标是完全改变我们基于网格的用户界面的布局方式。
CSS 一直用来布局我们的网页，但一直以来都存在这样或那样的问题。一开始我们用表格（table），然后是浮动（float），再是定位（postion）和内嵌块（inline-block），但是所有这些方法本质上都是只是 hack 而已，并且遗漏了很多重要的功能（例如垂直居中）。
Flexbox 的出现很大程度上改善了我们的布局方式，但它的目的是为了解决更简单的一维布局，而不是复杂的二维布局（实际上 Flexbox 和 Grid 能结合在一起工作，而且配合得非常好）。
Grid(网格) 布局是第一个专门为解决布局问题而创建的 CSS 模块，我们终于不需要想尽办法hack 页面布局样式了。

## 基础

Grid 布局由网格容器（父元素）和网格项（子元素）组成

### 网格容器(Grid Container)

应用 `display: grid` 的元素。这是所有网格项（Grid Items）的直接父级元素。在这个例子中，`container` 就是 **网格容器(Grid Container)**。

### 网格项(Grid Item)

网格容器（Grid Container）的子元素（例如直接子元素）。这里 `item` 元素就是**网格项(Grid Item)**，但是 `sub-item` 不是。

### 网格线(Grid Line)

构成网格结构的分界线。

### 网格轨道(Grid Track)

两条相邻网格线之间的空间。可以把它们想象成网格的列或者行。

### 网格单元格(Grid Cell)

两个相邻的行和两个相邻的列网格线之间的空间。这是 Grid(网格) 系统的一个“单元”。一个 `item` 就是一个网格单元格

### 网格区域

4条网格线包围的总空间。一个 网格区域(Grid Area) 可以由任意数量的 网格单元格(Grid Cell) 组成。

## 网格容器（父元素）属性

### `display`

- `grid` 生成一个块级网格
- `inline-grid` 生成一个内联网格
- `subgrid` 如果此网格容器是另一个网格容器的网格项，可以用此属性设置其行/列的大小继承自其父元素的网格容器大小，而省略了自己指定

```css
.container {
    display: grid | inline-grid | subgrid;
}
```

**注意：在 网格容器上使用 `column，float，clear， vertical-align` 不会产生任何效果。**

### `grid-template-row`行高 / `grid-template-column`列宽

其值为空格分割的列表，用来定义网格的行和列。表示两个网格线之间的距离大小

- `<track-size>`： 可以是长度值，百分比，或者等份网格容器中可用空间（使用 fr 单位）
- `<line-name>`：你可以选择的任意名称

```css
.container {
    grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
    grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

当在值之间留空格时，网格线会自动分配数字名称

```css
.container{
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}
```

<iframe height='265' scrolling='no' title='grid-template-columns / grid-template-rows(01)' src='//codepen.io/yhb-flydream/embed/PdYmQb/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/PdYmQb/'>grid-template-columns / grid-template-rows(01)</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

但是你可以明确的指定网格线(Grid Line)名称，即 `<line-name>` 值。请注意网格线名称的括号语法：

```css
.container {
    grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
    grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

请注意，一条网格线(Grid Line)可以有多个名称。例如，这里的第二条 行网格线(row grid lines) 将有两个名字：row1-end 和row2-start ：

```css
.container{
    grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

如果你的定义包含多个重复值，则可以使用 `repeat()` 表示法来简化定义：

```css
.container {
    grid-template-columns: repeat(3, 20px [col-start]) 5%;
}

/* 等价于 */

.container {
    grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}
```

`fr` 单元允许你用等分网格容器剩余可用空间来设置 网格轨道(Grid Track) 的大小 。例如，下面的代码会将每个网格项设置为网格容器宽度的三分之一：

```css
.container {
    grid-template-columns: 1fr 1fr 1fr;
}
```

剩余可用空间是除去所有非灵活网格项之后计算得到的。在这个例子中，可用空间总量减去 50px 后，再给 fr 单元的值3等分：

```css
.container {
    grid-template-columns: 1fr 50px 1fr 1fr;
}
```

### `grid-template-areas`

通过引用 `grid-area` 属性指定的 网格区域(Grid Area) 名称来定义网格模板。重复网格区域的名称导致内容跨越这些单元格。一个点号（`.`）代表一个空的网格单元。这个语法本身可视作网格的可视化结构。

- `<grid-area-name>`：由网格项的 grid-area 指定的网格区域名称
- `.`（点号） ：代表一个空的网格单元
- `none`：不定义网格区域

```css
.container {
  grid-template-areas: " | . | none | ..." "...";
}
```

```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```