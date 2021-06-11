# BOM

[TOC]

> BOM（Browser Object Model）
> 浏览器对象模型，提供了一套操作浏览器功能的工具（接口）。

**Window 对象：**

- window 对象是一个全局对象，也可以说是 JavaScript 中的顶级对象，
- 所有定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法
- window 对象下的属性和方法调用的时候可以省略 window

**入口函数：**

```js
window.onload() {
  代码块；
}
```

- 写在 script 标签里面，会在页面和所有的图片和文件加载完之后执行
- 如果有图片加载，那么代码一定要写到 window.onload 里面，否则会出现图片没有加载完成，获取到的宽度和高度不对的情况。
- `注意：`如果同一个页面中有多个 window.onload，会出现覆盖现象，后面的会把前面的覆盖。

**定时器：**

- **延时定时器：**
  - `setTimeOut(callback, time);`
    - 参数 1：重复执行的函数
    - 参数 2：每次延迟的毫秒数
    - 返回值：定时器的 id，用于清除
    - 清除延时定时器：`clearTimeOut(timerId)`
- **间歇定时器：**
  - `setInterval(function, delay);`
    - 参数 1：重复执行的函数
    - 参数 2：每次延迟的毫秒数
    - 返回值：定时器的 id，用于清除
    - 清除延时定时器：`clearInterval(intervalID)`

## offset 系列

> 盒子有多高、多宽，就有多大

- 一、`offsetHeight与offsetWidth`
  - 1.获取的是元素真实的高度和宽度
    - `【offsetHeight = height + paddnig + border】`
    - `【offsetWidth = width + padding + border】`
  - 2.获取到的是数值类型，方便计算
  - 3.offsetHeight 与 offsetWidth 是只读属性，不能设置
  - `style.height与style.width`
    - 1.只能获取行内样式
    - 2.获取到的是字符串类型，需要转换
    - 2.获取到的是字符串类型，需要转换
- 二、`offsetParent`
  - 是离当前元素最近的定位元素(absolute、relative)的距离，如果没有，那就找 body
  - parentNode 始终是父元素
- 三、`offsetLeft与offsetTop`
  - `offsetLeft:`自身左侧到 offsetParent 左侧的距离：`left + margin-left`
  - `offsetTop:`自身顶部到 offsetParent 顶部的距离 : `top + margin-top`
    - 1.元素自身与 offsetParent 真实的距离
    - 2.获取到的是数值类型，方便计算
    - 3.只读属性，只能获取，不能设置
  - `style.left与style.top`
    - 1.只能获取行内样式
    - 2.获取到的是字符串，需要转换
    - 3.可以获取，也可以设置

### 匀速动画封装

```js
/**
 *
 * @param obj
 * @param target
 */
function animate(obj, target) {
  if (obj.timer) {
    //解决越点越快问题
    clearInterval(obj.timer)
  }
  obj.timer = setInterval(function () {
    //设置定时
    var leader = obj.offsetLeft //获取元素距离左侧的距离
    var step = 10 //设置一部走多远
    if (leader > target) {
      //如果实际距离大于设置的目标点时，设置步数为负
      step = -step
    }
    if (Math.abs(leader - target) > Math.abs(step)) {
      //当实际距离与目标点之差大于一步时，
      leader = leader + step //向目标距离移动一步
      obj.style.left = leader + 'px'
    } else {
      //当实际距离与目标距离之差小于一步时，
      clearInterval(obj.timer)
      obj.style.left = target + 'px' //直接移动到目标点
    }
  }, 15)
}
```

**匀速动画公式:**
| leader =|leader +|step|
|---|---|---|
|[要移动元素下一个要到达的位置]|[要移动元素的当前位置]|[一步要移动的距离]|

- `leader = 移动元素.offsetLeft;`（要移动元素离开始移动前的距离）
- `step = 一步要移动的距离`

**缓动动画公式:**

- 缓动动画公式：(首先要获得 leader 的值)
- `leader = 移动元素.offsetLeft;`（要移动元素离开始移动前的距离）
- `var step = (target – leader) /10;`
- `leader = leader + step;`

```js
/**
 * 缓动动画多个属性
 * @param obj
 * @param json
 * @param fn
 */
function animate(obj, json, fn) {
  if (obj.timer) {
    clearInterval(obj.timer)
  }
  obj.timer = setInterval(function () {
    //假设所有的动画都执行完了
    var flag = true

    for (var k in json) {
      var leader = getStyle(obj, k)
      leader = parseInt(leader) || 0
      var step = (json[k] - leader) / 10
      step = step > 0 ? Math.ceil(step) : Math.floor(step)

      leader = leader + step
      obj.style[k] = leader + 'px'

      if (leader != json[k]) {
        //还没有到达终点
        flag = false
      }
    }
    //如果这个时候，flag还是true，说明真的是都执行完动画
    if (flag) {
      clearInterval(obj.timer)

      if (fn) {
        fn()
      }
    }
  }, 15)
}

//获取任意对象的任意样式
function getStyle(obj, attr) {
  //能力检测
  //如果支持getComputedStyle，就可以直接
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[attr]
  } else {
    return obj.currentStyle[attr]
  }
}
```

## scroll 系列

> 内容有多高，就有多大

- 一、`scrollWidth与scrollHegiht`
  - `【scrollHeight = height + padding】`
  - `【scrollWidth = width + padding】`
  - `内容的宽度和高度`
  - 如果内部内容没有超出父盒子，那么`scrollHeigth(scrollWidth)`与`offsetHeight(offsetWidth)`相同
- 二、`scrollTop与scrollLeft`
  - 内部内容被卷去的（头部/左侧）的高度
- 三、`onscroll事件:`
  - 每滚动一像素都会触发该事件
  - `window.onscroll`
  - 页面滚动都是给 window 注册 onscroll 事件的

```js
/**
 * scroll函数
 * @returns {{}}
 */
function scroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
  }
}
```

## client 系列

> 盒子内显示内容的区域有多大就有多大

- 一、`clientWidth与clientHeight`
  - `【clientHeight = height + padding】`
  - `【clientWidth = width + padding】`
  - 盒子可视区域（窗口）高度和宽度【不包括超出的部分】
- 二、如果内容没有超出盒子范围：clientWidth 与 scrollWidth 相同
- onresize:会在窗口被调整大小的时候发生 【`window.onresize`】

**获取可视区域的宽高:**

```js
/**
 * 获取可视区域宽高
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
// onresize 当浏览器窗口改变时的事件
window.onresize = function () {
  console.log(client().width + '-------' + client().height)
}
function client() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
  }
}
```

## 事件对象

> 在执行事件的时候，需要一些和事件相关的数据
> [每一个事件都有一个对象]
> 在触发事件的时候，会产生一个事件对象 event，这个对象中 包含了与事件相关的信息

- 常用属性：
  - `screenX与screenY`
    - 光标相对于屏幕左上角的水平位置与垂直位置
  - `clientX与clientY`
    - 光标相对于页面可视区左上角的水平位置和垂直位置
  - `pageX与pageY`
    - 光标相对于网页（文档）左上角的水平位置与垂直位置（`推荐使用`）

**获取事件对象:**

```js
function getEvent(event) {
  return event || window.event
}
```

**获取 pageX 与 pageY:**

- 在 IE678 中，没有 pageX 与 pageY 属性，但是我们可以通过 scrollTop + clientY 的方式进行计算来获得

```js
//获取事件对象的pageX
function getPageX(event) {
  return event.pageX || event.clientX + document.documentElement.scrollLeft
}

//获取事件对象pageY
function getPageY(event) {
  return event.pageY || event.clientY + document.documentElement.scrollTop
}
```

**引用类型比较的是地址（console.log([] == []) 返回 false）。**
