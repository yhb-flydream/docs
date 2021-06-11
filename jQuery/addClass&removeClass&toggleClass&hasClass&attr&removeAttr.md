# `addClass&removeClass&toggleClass&hasClass&attr&removeAttr`

## addClass

向被选元素添加一个或多个类

```js
$('p:first').addClass('intro')
$('p:first').addClass('intro text')
```

- 使用函数向被选元素添加类

```js
$(selector).addClass(function (index, oldclass) {})
```

- `index` - 可选。接受选择器的 index 位置。
- `html` - 可选。接受选择器的旧的类值

## removeClass

被选元素移除一个或多个类

```js
$('p:first').removeClass('intro')
$('p:first').removeClass('intro text')
```

- 使用函数来删除被选元素中的类

```js
$(selector).removeClass(function (index, oldclass) {})
```

- `index` - 可选。接受选择器的 index 位置。
- `html` - 可选。接受选择器的旧的类值

## toggleClass

设置或移除被选元素的一个或多个类进行切换

**该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。**

**不过，通过使用 `"switch"` 参数，您能够规定只删除或只添加类**

```js
$(selector).toggleClass(class,switch)
```

- class

  - 必需。规定添加或移除 class 的指定元素。
  - 如需规定若干 class，请使用空格来分隔类名。

- switch
  - 可选。布尔值。规定是否添加或移除 class。

使用函数来切换类

```js
$(selector).toggleClass(function(index,class){},switch)
```

## hasClass

检查被选元素是否包含指定的 class，返回 Boolean

```js
$(selector).hasClass(class)

$("p:first").hasClass("intro")
```

## attr

设置或返回被选元素的属性值

```js
// 返回属性值
$("img").attr("width");

// 设置属性/值
$("img").attr("width", "180");

// 使用函数来设置属性/值
$(selector).attr(attribute,function(index,oldvalue){})

// 设置多个属性/值对
$(selector).attr({attribute:value, attribute:value ...})
```

## removeAttr

从被选元素中移除属性

```js
$('p').removeAttr('id')
```
