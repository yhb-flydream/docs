# jQuery 尺寸 方法

## width() 和 height()

- width() 方法设置或返回元素的宽度（**不包括内边距、边框或外边距**）

- height() 方法设置或返回元素的高度（**不包括内边距、边框或外边距**）

```js
$("#div1").width();
$("#div1").height();
```

- 文档（HTML 文档）和窗口（浏览器视口）的宽度和高度：

```js
$(document).width();
$(document).height();
$(window).width();
$(window).height();
```

- 设置指定的 `<div>` 元素的宽度和高度：

```js
$("#div1").width(500).height(500);
```

## innerWidth() 和 innerHeight()

- innerWidth() 方法返回元素的宽度（**包括内边距**）

- innerHeight() 方法返回元素的高度（**包括内边距**）

```js
$("#div1").innerWidth();
$("#div1").innerHeight();
```

## outerWidth() 和 outerHeight()

- outerWidth() 方法返回元素的宽度（**包括内边距和边框**）

- outerHeight() 方法返回元素的高度（**包括内边距和边框**）

```js
$("#div1").outerWidth();
$("#div1").outerHeight();
```

- outerWidth(true) 方法返回元素的宽度（**包括内边距、边框和外边距**）。

- outerHeight(true) 方法返回元素的高度（**包括内边距、边框和外边距**）。
