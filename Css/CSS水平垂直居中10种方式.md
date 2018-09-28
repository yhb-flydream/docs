# CSS水平垂直居中10种方式

> 参考引用自 [颜海镜 掘金](https://juejin.im/post/5b9a4477f265da0ad82bf921)
> [颜海镜 Blog](https://yanhaijing.com/)
> [Github](https://github.com/yanhaijing)

## 基本的结构样式(没有特别说明一般使用此结构)

```html
<style>
    .outer {
        width: 400px;
        height: 400px;
        border: 1px solid #000;
    }
    .inner {
        background-color: red;
    }
    .size {
        width: 100px;
        height: 100px;
    }
</style>

<div class="outer">
    <div class="inner size">inner Text</div>
</div>
```

## 子元素固定宽高

### absolute + 负 margin

```css
.outer {
    position: relative;
}
.inner {
    position: absolute;;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中01（absolute + 负 margin）' src='//codepen.io/yhb-flydream/embed/XPYwjp/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/XPYwjp/'>CSS水平垂直居中01（absolute + 负 margin）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### absolute + margin auto

```css
.outer {
    position: relative;
}
.inner {
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中02（absolute + margin auto）' src='//codepen.io/yhb-flydream/embed/jvKoyE/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/jvKoyE/'>CSS水平垂直居中02（absolute + margin auto）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### absolute + calc

```css
.outer {
    position: relative;
}
.inner {
    position: absolute;;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中03（absolute + calc）' src='//codepen.io/yhb-flydream/embed/qMKGRV/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/qMKGRV/'>CSS水平垂直居中03（absolute + calc）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 子元素不用固定宽高

### absolute + transform

```css
.outer {
    position: relative;
}
.inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中04（absolute + transform）' src='//codepen.io/yhb-flydream/embed/pOKmej/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/pOKmej/'>CSS水平垂直居中04（absolute + transform）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### line-height

```css
.outer {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.inner {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left; /* 修正文字 */
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中04 （line-height）' src='//codepen.io/yhb-flydream/embed/gdKJmq/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/gdKJmq/'>CSS水平垂直居中04 （line-height）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### writing-mode

简单来说`writing-mode`可以改变文字的显示方向，比如可以通过`writing-mode`让文字的显示变为垂直方向

使用`writing-mode`后所有水平方向上的css属性，都会变为垂直方向上的属性，比如`text-align`，通过`writing-mode`和`text-align`就可以做到水平和垂直方向的居中了

使用此属性需要修改一下结构

```html
<div class="outer">
    <div class="outer-main">
        <div class="inner">123123</div>
    </div>
</div>
```

```css
.outer {
    writing-mode: vertical-lr;
    text-align: center;
}
.outer-main {
    writing-mode: horizontal-tb;
    display: inline-block;
    text-align: center;
    width: 100%;
}
.inner {
    display: inline-block;
    margin: auto;
    text-align: left;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中06（writing-mode）' src='//codepen.io/yhb-flydream/embed/PdavjL/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/PdavjL/'>CSS水平垂直居中06（writing-mode）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### table

使用此属性需要修改一下结构

```html
<table>
    <tbody>
        <tr>
            <td class="outer">
                <div class="inner">123123</div>
            </td>
        </tr>
    </tbody>
</table>
```

```css
.outer {
    text-align: center;
}
.inner {
    display: inline-block;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中07（table）' src='//codepen.io/yhb-flydream/embed/mGKYMa/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/mGKYMa/'>CSS水平垂直居中07（table）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### css-table

```css
.outer {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.inner {
    display: inline-block;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中08（css-table）' src='//codepen.io/yhb-flydream/embed/oPyRGd/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/oPyRGd/'>CSS水平垂直居中08（css-table）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### flex

```css
.outer {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中09（flex）' src='//codepen.io/yhb-flydream/embed/bxKyYb/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/bxKyYb/'>CSS水平垂直居中09（flex）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### grid(有兼容问题)

```css
.outer {
    display: grid;
}
.inner {
    align-self: center;
    justify-self: center;
}
```

<iframe height='265' scrolling='no' title='CSS水平垂直居中10（grid 有兼容问题）' src='//codepen.io/yhb-flydream/embed/JaZqMp/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/JaZqMp/'>CSS水平垂直居中10（grid 有兼容问题）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 总结

- PC端有兼容性要求，宽高固定，推荐 `absolute + 负margin`
- PC端有兼容要求，宽高不固定，推荐 `css-table`
- PC端无兼容性要求，推荐 `flex`
- 移动端推荐使用 `flex`