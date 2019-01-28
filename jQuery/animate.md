# animate

> jQuery 效果

该方法通过CSS样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果。

## 语法一

```js
$(selector).animate(styles,speed,easing,callback)
```

- `styles`规定产生动画效果的 CSS 样式和值，为对象形式
  - 可用的css样式值
  - **CSS 样式使用 DOM 名称（比如 "`fontSize`"）来设置，而非 CSS 名称（比如 "`font-size`"）**
  - `backgroundPosition`
  - `borderWidth`
  - `borderBottomWidth`
  - `borderLeftWidth`
  - `borderRightWidth`
  - `borderTopWidth`
  - `borderSpacing`
  - `margin`
  - `marginBottom`
  - `marginLeft`
  - `marginRight`
  - `marginTop`
  - `outlineWidth`
  - `padding`
  - `paddingBottom`
  - `paddingLeft`
  - `paddingRight`
  - `paddingTop`
  - `height`
  - `width`
  - `maxHeight`
  - `maxWidth`
  - `minHeight`
  - `minWidth`
  - `font`
  - `fontSize`
  - `bottom`
  - `left`
  - `right`
  - `top`
  - `letterSpacing`
  - `wordSpacing`
  - `lineHeight`
  - `textIndent`
- `speed` 规定动画的速度。默认是 "normal"
  - `slow`
  - `normal`
  - `fast`
  - 毫秒数值（500）
- `easing` 规定在不同的动画点中设置动画速度的 `easing` 函数
  - `swing`
  - `linear`
- `callback` animate 函数执行完之后，要执行的函数

实例

```js
$("button").click(function(){
  $("div").animate({left:'250px'}, 500, 'linear', function () {

  });
});
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  }, 500, 'linear', function () {

  });
});
```

## 语法二

```js
$(selector).animate(styles,options)
```

- `styles`
  - 必须，参数同上
- `options`
  - 可选。规定动画的额外选项。
  - `speed` 设置动画的速度
  - `easing` 规定要使用的参数
  - `callback` 规定动画完成后要执行的函数
  - `step` 规定动画的每一步完成后要执行的函数
  - `queue` 布尔值。指示是否在效果队列中放置动画。如果为 false，则动画将立即开始
  - `specialEasing` 来自 styles 参数的一个或多个 CSS 属性的映射，以及它们的对应 easing 函数

## 使用相对值

以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 `+=` 或 `-=`：

```js
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
```

## 使用预定义的值

```js
$("button").click(function(){
  $("div").animate({
    height:'toggle'
  });
});
```

## 使用队列功能

默认地，jQuery 提供针对动画的队列功能。

这意味着如果您在彼此之后编写多个 `animate()` 调用，jQuery 会创建包含这些方法调用的“内部”队列。然后逐一运行这些 `animate` 调用。

```js
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
```