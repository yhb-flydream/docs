# wrap&unwrap&wrapAll&wrapinner

## wrap

把每个被选元素放置在指定的 HTML 内容或元素中(一个 wrapper 包括一个 selector)

```js
$(selector).wrap(wrapper)

$('p').wrap('<div></div>')

$(selector).wrap(function () {})
```

- wrapper
  - 规定包裹被选元素的内容
  - 可能的值:
  - HTML 代码 - 比如 ("`<div></div>`")
  - 新元素 - 比如 (`document.createElement("div")`)
  - 已存在的元素 - 比如 (`$(".div1")`) **已存在的元素不会被移动，只会被复制，并包裹被选元素**

## unwrap

删除被选元素的父元素

```js
$(selector).unwrap()

$('p').unwrap()
```

## wrapAll

使用指定的 HTML 内容或元素中放置所有被选的元素(一个 wrapper 包括所有 selector)

```js
$(selector).wrapAll(wrapper)

$("p").wrapAll("<div></div>");

$(selector).wrapAll(function()())
```

- wrapper
  - 规定包裹被选元素的内容。
  - 可能的值:
  - HTML 代码 - 比如 ("`<div></div>`")
  - 新的 DOM 元素 - 比如 (`document.createElement("div")`)
  - 已存在的元素 - 比如 (`$(".div1")`) **已存在的元素不会被移动，只会被复制，并包裹被选元素**

## wrapInner

使用指定的 HTML 内容或元素，来包裹每个被选元素中的所有内容 (inner HTML)(一个 wrapper 包括一个 selector 里面的内容，wrapper 在 selector 内)

```js
$(selector).wrapInner(wrapper)

$("p").wrapInner("<b></b>");

$(selector).wrapInner(function()())
```

- wrapper
  - 规定包围在被选元素的内容周围的内容
  - 可能的值:
  - HTML 代码 - 比如 ("`<div></div>`")
  - 新的 DOM 元素 - 比如 (`document.createElement("div")`)
  - 已存在的元素 - 比如 (`$(".div1")`) **已存在的元素不会被移动，只会被复制，并包裹被选元素**
