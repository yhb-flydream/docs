# 浮动(float)与清除(clear)

## 浮动(`float`)

- 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
- 设置了浮动的元素会脱离普通文档流，变的不占用空间。
- 浮动元素会生成一个**行内块**，而不论它本身是何种元素。
- 如果浮动非替换元素，则要指定一个明确的宽度；否则，它们会尽可能地窄。

### 值

- `none` 默认值。不浮动，不会脱离文档流。
- `left` 左浮动。
- `right` 右浮动。
- `inherit` 继承父元素的浮动属性。

## 清除浮动(`clear`)

- 规定元素的哪一侧不允许其他浮动元素。

### 值

- `none` 默认值。允许浮动出现在两侧。
- `left` 左侧不允许有浮动。
- `right` 右侧不允许有浮动。
- `both` 左右两侧都不允许有浮动。
- `inherit` 继承父元素的清除属性。

## 应用

### 清除当前元素受到其之前元素的浮动影响

- 给当前元素添加 `clear` 属性

```css
.box2 {
    clear: both;
}
```

<iframe height='265' scrolling='no' title='清除当前元素受到其之前元素的浮动影响' src='//codepen.io/yhb-flydream/embed/NBQqbw/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/NBQqbw/'>清除当前元素受到其之前元素的浮动影响</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 清除当前元素受到其内元素的浮动影响

- 给当前元素设置伪元素，并给伪元素设置 `clear` 属性

```css
.box:after,
.box:before {
    content: '';
    display: inline-block;
    height: 0;
    line-height: 0;
    clear: both;
}
```

<iframe height='265' scrolling='no' title='清除当前元素受到其内元素的浮动影响' src='//codepen.io/yhb-flydream/embed/pZMjxJ/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/pZMjxJ/'>清除当前元素受到其内元素的浮动影响</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>