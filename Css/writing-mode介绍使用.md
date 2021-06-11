# writing-mode 介绍使用

设置或检索对象的内容块固有的书写方向

## 取值

### horizontal-tb

- 水平方向自上而下的书写方式
- 即 `left-right-top-bottom`（类似 IE 私有值 lr-tb）

### vertical-rl

- 垂直方向自右而左的书写方式
- 即 `top-bottom-right-left`（类似 IE 私有值 tb-rl）

### vertical-lr

- 垂直方向自左而右的书写方式
- 即 `top-bottom-left-right`

### lr-tb

- `left-right-top-bottom`。对象中的内容在水平方向上从左向右流入，后一行在前一行的下面。 所有的字形都是竖直向上的。这种布局是罗马语系使用的（IE）

### tb-rl

- `top-bottom-right-left`。对象中的内容在垂直方向上从上向下流入，自右向左。后一竖行在前一竖行的左面。全角字符是竖直向上的，半角字符如拉丁字母或片假名顺时针旋转 90 度。这种布局是东亚语系通常使用的（IE）

**此属性效果不能被累加使用。例如，父对象的此属性值设为 `tb-rl` ，子对象再设置该属性将不起作用，仍应用父对象的设置。**
