# append&appendTo&prepend&after&before&insertAfter&insertBefore

## append()

在被选元素**标签内的结尾**插入内容

```js
$("p").append("Some appended text.");
```

## appendTo()

在被选元素的结尾（仍然在内部）插入指定内容

**`append()` 和 `appendTo()` 方法执行的任务相同。不同之处在于：内容和选择器的位置，以及 `append()` 能够使用函数来附加内容**

```js
$("<b>Hello World!</b>").appendTo("p")
```

## prepend()

在被选元素**标签内的开头**插入内容

```js
$("p").prepend("Some prepended text.");
```

## prependTo()

在被选元素的开头（仍位于内部）插入指定内容

**`prepend()` 和 `prependTo()` 方法作用相同。差异在于语法：内容和选择器的位置，以及 `prepend()` 能够使用函数来插入内容。**

```js
$("<b>Hello World!</b>").prependTo("p");
```

## after()

在被选元素**标签外之后**插入内容

```js
$("img").after("Some text after");
```

## before()

在被选元素**标签外之前**插入内容

```js
$("img").before("Some text before");
```

## insertAfter()

在被选元素**之后**插入 HTML 标记或已有的元素

**如果该方法用于已有元素，这些元素会被从当前位置移走，然后被添加到被选元素之后**

```js
$("<span>Hello world!</span>").insertAfter("p");
```

## insertBefore()

在被选元素**之前**插入 HTML 标记或已有的元素

如果该方法用于已有元素，这些元素会被从当前位置移走，然后被添加到被选元素之前

```js
$("<span>Hello world!</span>").insertBefore("p");
```