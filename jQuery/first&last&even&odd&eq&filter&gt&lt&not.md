# first&last&even&odd&eq&filter&gt&lt&not

## first

返回被选元素的首个元素

```js
$('div p').first()
// 选取首个 <div> 元素内部的第一个 <p> 元素
```

## last

返回被选元素的最后一个元素

```js
$('div p').last()
// 选择最后一个 <div> 元素中的最后一个 <p> 元素
```

## even

选取每个带有偶数 index 值的元素

```js
$('tr:even')
```

## odd

选取每个带有奇数 index 值的元素

```js
$('tr:odd')
```

## eq

返回被选元素中带有指定索引号的元素

**索引号从 0 开始，因此首个元素的索引号是 0 而不是 1**

```js
$('p').eq(1)
// 选取第二个 <p> 元素（索引号 1）
```

## filter

允许规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回

```js
$('p').filter('.intro')
// 返回带有类名 "intro" 的所有 <p> 元素
```

## gt

选取 index 值高于指定数的元素

```js
$(':gt(index)')
```

## lt

选取带有小于指定 index 值的元素

```js
$(':lt(index)')
```

## not

返回不匹配标准的所有元素

```js
$('p').not('.intro')
// 返回不带有类名 "intro" 的所有 <p> 元素
```
