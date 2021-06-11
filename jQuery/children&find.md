# children&find

## children

返回被选元素的**所有直接子元素**

```js
$('div').children()
```

也可以使用可选参数来过滤对子元素的搜索

```js
$('div').children('p.text')
```

## find

返回被选元素的后代元素，一路向下直到最后一个后代

```js
$('div').find('span')
```

返回 `<div>` 的所有后代

```js
$('div').find('*')
```
