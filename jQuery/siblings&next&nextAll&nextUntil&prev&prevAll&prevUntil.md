# siblings&next&nextAll&nextUntil&prev&prevAll&prevUntil

jQuery 在 DOM 树中遍历元素的同胞元素

## siblings

返回被选元素的所有同胞元素

```js
$('h2').siblings()
```

也可以使用可选参数来过滤对同胞元素的搜索

```js
$('h2').siblings('p')
```

## next

返回被选元素的下一个同胞元素

```js
$('h2').next()
```

## nextAll

返回被选元素的所有跟随的同胞元素

```js
$('h2').nextAll()
```

## nextUntil

返回介于两个给定参数之间的所有跟随的同胞元素

```js
$('h2').nextUntil('h6')
```

## prev, prevAll & prevUntil

方法与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞元素向后遍历，而不是向前）
