# class 类名操作

## className 获取或设置指定元素的 class 属性的值

```js
;<div id="btn" class="btn a b c d"></div>

var btn = document.getElementById('btn')
console.log(btn.className) // (string)  btn a b c d

btn.className = 'e'
console.log(btn.className) // (string)  e

// ------------------------
console.log($('#btn')[0].className) // (string)  btn a b c d
```

## classList

`Element.classList` 是一个只读属性，返回一个元素的类属性的实时`DOMTokenList`集合

```js
;<div id="btn" class="btn a b c d"></div>

var btn = document.getElementById('btn')
console.log(btn.classList) // ["btn", "a", "b", "c", "d", value: "btn a b c d"]
console.log($('#btn')[0].classList) // ["btn", "a", "b", "c", "d", value: "btn a b c d"]

btn.classList.add('e') // 添加指定类
// $('#btn')[0].classList.add('e'); // 添加指定类
console.log(btn.classList) // ["btn", "a", "b", "c", "d", "e", value: "btn a b c d e"]
// console.log($('#btn')[0].classList); // ["btn", "a", "b", "c", "d", "e", value: "btn a b c d e"]

btn.classList.remove('e') // 删除指定类
// $('#btn')[0].classList.remove('e'); // 删除指定类
console.log(btn.classList) // ["btn", "a", "b", "c", "d", value: "btn a b c d"]
// console.log($('#btn')[0].classList); // ["btn", "a", "b", "c", "d", value: "btn a b c d"]

btn.classList.item(0) // btn (item 中的数字为 classList 中类名的索引，超出classList索引值后返回 null)
// $('#btn')[0].classList.item(0); // btn (item 中的数字为 classList 中类名的索引，超出classList索引值后返回 null)

btn.classList.toggle('a')
切换指定类
// $('#btn')[0].classList.toggle('a'); 切换指定类
console.log(btn.classList) // ["btn", "b", "c", "d", "e", value: "btn b c d e"]
console.log($('#btn')[0].classList) // ["btn", "b", "c", "d", "e", value: "btn b c d e"]

btn.classList.contains('a') // true 检查元素的类属性中是否存在指定的类
// $('#btn')[0].classList.contains('a'); // true 检查元素的类属性中是否存在指定的类

btn.classList.replace('a', 'g') // 替换指定类
// $('#btn')[0].classList.replace('a', 'g'); // 替换指定类
console.log(btn.classList) // ["btn", "g", "b", "c", "d", value: "btn g b c d"]
// console.log($('#btn')[0].classList); // ["btn", "g", "b", "c", "d", value: "btn g b c d"]
```

- `toggle ( String [, force] )`
  - 当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回 false，如果不存在，则添加它并返回 true
  - 当存在第二个参数时：如果第二个参数的计算结果为 true，则添加指定的类值，如果计算结果为 false，则删除它

## jQuery css

- `css()` 设置或返回样式属性
  - `$("p").css("background-color");`
  - ``$("p").css("propertyname","value");`
- `addClass()` 向被选元素添加一个或多个类
  - `$("div").addClass("blue");`
- `removeClass()` 从被选元素删除一个或多个类
  - `$("div").removeClass("blue");`
- `toggleClass()` 对被选元素进行添加/删除类的切换操作
  - `$("div").toggleClass("blue");`
