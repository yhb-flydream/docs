# display

> 指定用于元素的呈现框的类型

## 值及应用详解

### `none`

- 关闭一个元素的显示（对布局没有影响）；其所有后代元素都也被会被关闭显示。文档渲染时，该元素不占位置。

### `inline`

- 多个内联元素占同一行，直到放不下才换行
- 可设置属性`padding-left`,`padding-right`,`margin-left`,`margin-right`
- 设置无效属性`width`,`height`,`margin-top`,`margin- bottom`,`padding-top`,`padding-bottom`

### `block`

- 块级元素，单独占一行
- 可以设置`width`,`height`,`maigin四个方向`，`padding四个方向`
- 元素宽度在不设置的情况下，是它本身父容器的 100%（和父元素的宽度一致）

### `inline-block`

- 行内块，可以在一行内排列，又可以对它进行块级盒子的操作

### `list-item`

- `<li>`元素默认使用此属性
- 行内元素设置此属性时可与`<li>`元素类似

### `inline-table`

- 类似`<table>`标签，但为行内元素*（`<table>原为块级元素`）*

### `table`

- 使元素像`<table>`元素一样。它定义了一个块级盒子

### `table-caption`

- 使元素像[`<caption>(通常作为<table>的第一个子元素展示表格标题)`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/caption)一样

### `table-column`

- 使这个元素的作用就像[`<col>【定义<colgroup>包含的每列的样式】`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/col)一样

### `table-column-group`

- 使这个元素的作用就像[`<colgroup>【定义列样式】`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/colgroup) 一样

### `table-header-group`

- 使这个元素的作用就像[`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/thead) 一样

### `table-row`

- 使这个元素的作用就像[`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tr)一样

### `table-row-group`

- 使这个元素的作用就像[`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tbody)一样

### `table-cell`

- 使这个元素的作用就像`<td>`一样

### `table-footer-group`

- 使这个元素的作用就像[`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tfoot)一样

### `flex`

- 该元素的行为类似于块元素，并根据 flexbox 模型展示其内容

### `inline-flex`

- 该元素的行为类似于**内联元素**，并根据 Flexbox 模型展示其内容

### `grid【实验】`

- 该元素的行为类似于块元素，并根据**网格模型**展示其内容
