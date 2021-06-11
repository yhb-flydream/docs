# DOM

[TOC]

> DOM:文档对象模型(Document Object Model)，又称为文档树模型。 是一套操作 HTML 文档的 API（工具）。
>
> 文档对象模型：DOM 将 html 文档看成了一个对象，我们把这些称为节点（这个对象就是【document】），html 文档中的所有内容都封装成了一个一个的对象 （在 DOM 眼里页面中所有内容都是对象）
>
> DOM：用来操作页面元素的一套 API【接口】
> BOM：用来操作浏览器一些行为的一套 API【接口】

**ECMAScript 的基本语法：**

- 变量
- 数据类型
- 数据转换
- 操作符
- 判断
- 循环
- 数组
- 函数
- 对象

**节点:**

- 标签节点（通常被称为元素）
- 文本节点
- 属性节点
- 注释节点
  - 层级关系
  - 父节点：parent
  - 子节点：child
  - 兄弟节点：sibling

**根据`id`获取页面中元素**

```text
var box(随意命名) = document.getElementById("box[元素的id名];
```

**根据`标签`获取页面中的元素**

```text
var links = documrnt.getElementsByTagNmae("a[标签元素名]");
```

- `这个方法返回的是多个对象的集合（伪数组）`
- 需要对伪数组进行遍历
- ★★★★★【给谁注册事件就先遍历谁，for 在外面，注册事件函数 function()在里面】

```js
for (var i = 0; i < links.length; i++) {
  links[i].onclick = function () {}
}
```

**阻止 a 标签默认行为 `return false;`**

**标签常用到的`属性`有：src、title、href、className**

- 其中 className 对应的就是标签中的 class 属性，因为 class 在 JavaScript 中是关键字，因此变成了 className

**innerHTML:**

- 获取和设置标签中的内容，设置的内容会被当做节点对象解析到 DOM 树上。【不要写到 for 循环中】
- `innerHTML` 【获取内容时，包括标签 设置内容时，会对标签进行转义，并会把原来的内容覆盖】
- 优势：把对象当成字符串来处理，方便
- 缺点：如果要对对象进行处理，注册事件，修改某些样式的时候，会比较麻烦。

**innerText 以及 text Content:**

- 获取和设置标签中的内容，设置的内容会被当成普通的文本`（有兼容性问题）`封装兼容性
- 获取内容时，会丢弃标签 设置内容时，会对标签进行转义，并会把原来的内容覆盖

**disabled:**

- 在标签中，只要指定了 disabled 属性，无论有值没值，都代表这个 input 是被禁用的
- 在 DOM 对象中，disabled 的属性是一个布尔类型的属性，值只有 true 或者 false

**type:**

- 在标签中，type 属性指定了 input 框的类型，常用的有：text、checkbox、button
- 在 DOM 对象中，也同样有 type 属性，这个 type 属性的取值和标签是一样的，是一个字符串

**value:**

- 在标签中，value 属性指定了 input 框的默认值
- 在 DOM 对象中，也同样有 value 属性，我们可以通过 DOM 对象中的 value 属性来指定 input 框的值

**selected:**

- 在 option 标签中，只要指定了 selected 属性，说明这个 option 被选中
- 在 DOM 对象中，selected 的属性是一个布尔类型的属性，值只有 true 或者 false

**checked:**

- 在标签中，只要指定了 checked 属性，说明这个 checkbox 被选中
- 在 DOM 对象中，checked 的属性是一个布尔类型的属性，值只有 true 或者 false

**标签的自定义属性:**

- `getAttribute()`

  - `getAttribute(name)`
  - name 是属性名
  - 用来获取 DOM 对象对应的 HTML 标签的属性`（包括自定义属性和固有属性）`
  - 注意，getAttribute 获取的是标签中的属性，因此传递的参数就是标签中属性的名字，因此获取 class 属性传递的是 class 而不是 className

- `setAttribute()`

  - `setAttribute(name, value)`
    - name 属性名
    - value 属性值
  - 可以给标签设置属性（包括固有属性和自定义属性），并且能在 html 标签中显示出来

- `removeAttribute()`
  - `removeAttribute(name)`
  - 需要移除的属性名
  - 方法用于移除标签的属性`（包括自定义属性和固有属性）`

**获取 id 简易封装:**

```js
function $id(id) {
  return document.getElementById(id)
}

$id('id名')
```

**`javascript:void(0);`**

- 是伪协议，表示 url 的内容通过 javascript 执行。
- `void(0)`表示不作任何操作，这样会防止链接跳转到其他页面
- 想要页面不跳转，`href=” javaScript:void(0);”`,并且即使浏览器禁用了 js 功能，也不会任何的影响

**cloneNode():**

- 克隆元素，默认是浅复制，只会复制标签，不会复制内容
- cloneNode 只会在内存里面复制，并没有添加到 DOM 树上
- `cloneNode(true)`:深度复制，会复制标签和内容
  - `createElement("ul")` ：创建元素
  - `appendChild( node )`：将节点添加到子元素的最后面
  - `removeChild( node )`:移除节点
  - `insertBefore(新元素，目前的第一个元素)`：将新元素添加到目前的第一个元素前，使其成为第一个元素
- `document.createElement`： 在内存中创建了一个对象，注意：页面中并没有效果
- `appendChild(node)`： 将指定元素追加到调用者的子元素中的最后面

**shift + tab 使定格对齐:**

**类型判断:**

- 简单（基本）数据类型：
  - Number
  - String
  - Boolean
  - Undefined
  - Null
  - **用`typeof` 判断**
  - `console.log(typeof []);//object`
  - `console.log(typeof 1);// number`
- 复杂（引用）数据类型：
  - Object
  - Array
  - Date
  - Math
  - RegExp
  - **用`instanceof` 判断**
  - `console.log([] instanceof Array);//[]是不是Array的一个实例 //true`
  - `console.log("" instanceof Array);//[]是不是Array的一个实例 //false`

**onchange:下拉菜单事件:**

- `select.onchange = function () {}`

**基本包装类型：**

- 简单数据类型是没有方法的
- 【基本包装类型：把基本类型包装成复杂类型。】
- 为了方便操作基本数据类型，JavaScript 还提供了三个特殊的复杂（引用）类型：`String/Number/Boolean`。

```js
var str = "abc";
var result = str.indexOf("a");
发生了三件事：
1、把简单类型转换成复杂类型：var s = new String(str);
2、调用包装类型的indexOf方法： var result = s.indexOf("a");
3、销毁刚刚创建的复杂类型（过河拆桥）
```

**★★★ 如果要改变一个元素的 className，但这个元素拥有多个 class 属性时，不要直接用【元素.className = "";】,这样会清空元素所有的 class 属性，要用【元素.className.replace("1、将要被替换的属性","2、替换属性")】[目的是用 2，替换 1]。**
