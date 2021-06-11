# replaceAll&replaceWith

## replaceAll

用指定的 HTML 内容或元素替换被选元素

```js
$(content).replaceAll(selector)

$('p').replaceAll('<b>Hello world!</b>')
```

- content

  - 必需。规定替换被选元素的内容。
  - 可能的值:
    - HTML 代码 - 比如 ("`<div></div>`")
    - 新元素 - 比如 (`document.createElement("div")`)
    - 已存在的元素 - 比如 (`$(".div1")`)
    - **已存在的元素不会被移动，只会被复制，并包裹被选元素**

- selector
  - 必需。规定要替换的元素。

## replaceWith

用指定的 HTML 内容或元素替换被选元素

```js
$(selector).replaceWith(content)

$('p').replaceWith('<b>Hello world!</b>')
```

- content

  - 必需。规定替换被选元素的内容。
  - 可能的值:
    - HTML 代码 - 比如 (`"<div></div>"`)
    - 新元素 - 比如 (`document.createElement("div")`)
    - 已存在的元素 - 比如 (`$(".div1")`)
    - 已存在的元素不会被移动，只会被复制，并包裹被选元素。

- selector
  - 必需。规定要替换的元素

**`replaceAll()` 与 `replaceWith()` 作用相同。差异在于语法：内容和选择器的位置，以及 `replaceWith()` 能够使用函数进行替换。**
