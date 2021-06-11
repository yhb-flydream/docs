# header&animated&contains&empty&hidden&visible

## :header

选取所有标题元素（h1 - h6）

```js
$(':header')
```

## :animated

选取当前的所有动画元素

```js
$(':animated')
```

## :contains

选取**包含**指定字符串的元素

**该字符串可以是直接包含在元素中的文本，或者被包含于子元素中**

```js
$('p:contains(is)')
```

## :empty

选取空的元素

```js
$(':empty')
```

## :hidden

选取所有隐藏的元素

```js
$('p:hidden')
```

## :visible

选取每个当前是可见的元素

除以下几种情况之外的元素即是可见元素：

- 设置为 `display:none`
- `type="hidden"` 的表单元素
- `Width` 和 `height` 设置为 0
- 隐藏的父元素（同时隐藏所有子元素）
