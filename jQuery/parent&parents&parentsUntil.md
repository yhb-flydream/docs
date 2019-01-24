# parent&parents&parentsUntil

```html
<div style="width:500px;">div (曾祖父)
  <ul>ul (祖父)
    <li>li (直接父)
      <span>span</span>
    </li>
  </ul>
</div>
```

## parent()

返回被选元素的直接父元素，该方法只会向上一级对 DOM 树进行遍历

```js
$("span").parent(); // li
```

- 可以使用可选参数来过滤对祖先元素的搜索

```js
$(document).ready(function(){
  $("span").parents("ul");
});

// 返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素
```

## parents

返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (`<html>`)

```js
$("span").parents(); // li ul div body
```

## parentsUntil()

返回介于两个给定元素之间的所有祖先元素

```js
$(document).ready(function(){
  $("span").parentsUntil("div");
});

// 返回介于 <span> 与 <div> 元素之间的所有祖先元素
```