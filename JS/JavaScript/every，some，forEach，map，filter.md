# every，some，forEach，map，filter

- [javaScript 中的 every，some，forEach，map，filter 五者的用途](https://blog.csdn.net/qq_23143555/article/details/82458273)

## every

- 考察数组地整体特性，也就是考察数组中所有元素的共性
  - 比如所有元素是否都是奇数，或者所有元素是否都是偶数。
  - 它关注的是数组整体元素的共性。
- 只要有一个不满足，循环就会结束，接下来的数据就不会继续判断。

```js
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let bool = numbers.every(function (item, index, list) {
  console.log(item)
  return item % 2 == 0
})
console.log(bool) // true or false
```

- 注意：
  - every 方法有返回值，返回值是一个布尔值。
  - 只有所有元素都具备某项特性后，才会返回 true。
  - 只要有一项不满足就返回 false。

## some

- 考察数组的个性
  - 比如考察数组中是否存在一个等于 0 的数。
  - 它关注的是数组的个性。
- 只要有一个满足，循环就会结束，接下来的数据就不会继续判断。

```js
let bool = numbers.some(function (item, index, list) {
  console.log(item)
  return item == 4
})
console.log(bool) // true or false
```

## filter

- 从已有的数组中筛选出符合一定条件的数据项
- 最后的返回值是所有符合条件的数据项构成的新数组
- 它不会修改原来的数组。它的立足点就是筛选。
- 每一次遍历都会有一个返回值，它的类型是布尔类型。
- 返回值只有是 true，当前遍历项才会被筛选中。
- **不要试图在 filter 中去修改原始数组。**

```js
function City(province, school, level) {
  this.province = province
  this.school = school
  this.level = level
}

let beijing = new City('北京都', ['北京大学', '清华大学'], 1)
let xian = new City('西安都', ['西安交通大学', '西北工业大学'], 2)
let hubei = new City('湖北省', ['武汉大学', '华中科技大学'], 2)
let hunan = new City('湖南省', ['湖南大学', '中南大学'], 3)
let sichuan = new City('四川省', ['四川大学', '电子科技大学'], 3)

let cities = [beijing, xian, hubei, hunan, sichuan]
let tops = cities.filter(function (item, index, list) {
  return item.level != 1
})
console.log(tops) // 返回符合过滤条件的数组
```

## map

- 本意就是映射，也就是将一个值从一种形式映射到另一种形式，比如将 key 映射到 value。
- 它的每一次遍历都会有一个返回值。
- 这些返回值组合成最终的结果数组。

```js
var numbers = [1, 2, 3, 4, 5, 6]
var capitals = ['北京都', '南京都', '广州都', '重庆都', '西安都', '拉萨都']
let targets = numbers.map(function (item, index, list) {
  return capitals[item - 1]
})
console.log(targets) // 返回处理过的数组
```

## forEach

- 可以在获取当前数据项的前提下，对数据进行修改
- 没有返回值。

```js
let capitals = ['北京都', '南京都', '广州都', '重庆都', '西安都', '拉萨都']
capitals.forEach(function (capital) {
  console.log(capital)
})
```

## 结论

- filter 需要**从原数组中过滤出符合条件的新数组**时使用
- map 需要**对原数组的内容进行修改**时使用
- forEach 需要**获取数组的每一项，然后对每一项进行操作**时使用
