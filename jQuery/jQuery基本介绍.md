# jQuery

[TOC]

> jQuery 就是一个 js 库，使用 jQuery 的话，会比使用 JavaScript 更简单
> 学习 jQuery，主要学习 jQuery 的一大堆的 api(方法)
>
> jQuery 每一个版本又分为压缩版和未压缩版
> jquery.js
> jquery.min.js

- `JavaScript的入口函数`和`jQuery的入口函数`,执行时机

  - 1、JavaScript 的入口函数要等到页面中所有资源（包括图片、文件）加载完成才开始执行

  - 2、 jQuery 的入口函数只会等待文档树加载完成就开始执行，并不会等待图片、文件的加载

**使用 js 的缺点**

- 兼容性问题
- 代码多，麻烦
- `window.onload`会出现覆盖问题
- 代码容错性比较差（比较容易出错）
- js 实现简单的动画非常麻烦

#### 使用 jQuery 的书写步骤

- **1、引包（引入 jQuery 文件）**
  - `<script src="jquery-1.11.1.js"></script>`
  - `引包注意：`
    - `$ is not defined`忘记引包或者引包在入口函数的后面
    - `404：`引包路径错误
- **2、入口函数**

```
$(document).ready(function(){

});

$(function(){

});
```

- **3、功能实现**

```
$("#btnShowDiv").click(function(){
  $("div").show(1000);
});
```

#### jQuery 中的$符

- 其实$就是一个函数：`$();`参数不一样，功能不一样
- `$ === jQuery`,也就是说能用`$`的地方，完全可以用 jQuery，`$`仅仅是 jQuery 的简写形式

### DOM 对象和 jQuery 对象

- 使用 JavaScript 中的方法获取页面中的元素返回的对象就是 dom 对象。
  - 比如使用`document.getElement*`系列的方法返回的就是 dom 对象
- jquery 对象就是使用 jquery 的方法获取页面中的元素返回的对象就是 jQuery 对象。
  - 比如使用`$();`方法返回对象都是 jquery 对象
- jQuery 对象只能使用 jQuery 对象的方法
- jQuery 对象其实就是 DOM 对象的包装集（包装了 DOM 对象的集合）

### jQuery 对象和 DOM 对象相互转换

- 1、jQuery 对象转 DOM 对象

```
var $li = $(“li”);

//jquery对象也是个伪数组,
所以$li后面要加中括号，指明针对的是哪一个
如果目标元素只有一个，也要用[0]，表示

//第一种方法（推荐使用）$li[0]

//第二种方法$li.get(0)
```

- 2、DOM 对象转 jQuery 对象
  - `var $obj = $("DOMobj")`
  - 联想记忆：我有钱[美元]，所以我的功能就更强大

### jQuery 选择器（重点）

- jQuery 选择器是 jQuery 为我们提供的一组方法，让我们更加方便的获取到页面中的元素。
  - 注意：jQuery 选择器返回的是 jQuery 对象。
- 选择器分类：
  - **基本选择器**（跟 css 的选择器用法一模一样）
    - ID 选择器 `$(“#id”);`
    - 类选择器 `$(“.class”);`
    - 标签选择器 `$(“div”);`
    - 并集选择器 `$(“div,p,li”);`
    - 交集选择器（标签指定式选择器） `$(“div.redClass”);`
  - **层级选择器**跟 CSS 的选择器一模一样
    - 子代选择器 `$(“ul>li”);`
    - 后代选择器 `$(“ul li”);`
  - **过滤选择器**这类选择器都带冒号 `：`
    - `:eq（index）`
      - `$(“li:eq(2)”).css(“color”, ”red”);`
      - 获取到的 li 元素中，选择索引号为 2 的元素，索引号 index 从 0 开始
    - `:odd（奇）`
      - `$(“li:odd”).css(“color”, ”red”);`
      - 获取到的 li 元素中，选择索引号为奇数的元素
    - `:even（偶）`
      - `$(“li:even”).css(“color”, ”red”);`
      - 获取到的 li 元素中，选择索引号为偶数的元素
  - **筛选选择器(方法)**筛选选择器主要是方法
  - `children(selector)`
  - `$(“ul”).children(“li”)`
  - 相当于$(“ul>li”)，子类选择器
  - `find(selector)`
    - `$("ul").find("li")`
    - 相当于$(“ul li”),后代选择器
  - `sibilings(selector)`
    - `$("#first").sibilings("li")`
    - 查找兄弟节点，不包括自己本身
  - `parent()`
    - `$("#first").parent();`
    - 查找父亲
  - `eq(index)`
    - `$("li").eq(2);`
    - 相当于$(“li:eq(2)”),index 从 0 开始

### 样式操作

#### **css 操作（重点）**

- **设置单个样式**`css(name, value);`
  - name：需要设置的样式名
  - value：样式对应的值
  - `$("#one").css("background", "red");`
- **设置多个样式**`css(obj)`
  - 参数 obj 是一个对象，包含了需要设置的样式名和对应的值

```
$("#one").css({
    "background":"gray",
    "width":"400px",
    "height":"200px"
});
```

- **获取样式**`css(name);`
  - name：需要获取的样式的名称
  - `$("div").css("background");`
  - `注意：`获取样式操作只会返回第一个元素对应的样式值。

#### class 操作

- **添加样式类**`addClass(name);`
  - name：需要添加的类名，注意参数不要带点
  - 例：给所有的 div 添加 one 的样式
  - `$(“div”).addClass(“one”);`
- **移除样式类**`removeClass([name]);`
  - 1、不带参数移除所有样式类
    - 例：移除 div 所有的样式类
    - `$(“div”).removeClass();`
  - 2、带参数移除指定样式类
    - 例：移除 div 中 one 的样式类名
    - `$(“div”).removeClass(“one”);`
- **判断是否有样式类**`hasClass(name);`
  - name：用于判断是否存在的样式类名
  - 返回值：true、false
  - 例：判断第一个 div 是否有 one 的样式类
  - `$("div").hasClass("one");`
- **切换样式类**`toggleClass(name)`
  - name：需要切换的样式类名
  - 如果有，移除该样式
  - 如果没有，添加该样式
  - `$("div").toggleClass("one");`

#### 样式操作总结

- 1、如果操作到的样式非常少，可以考虑 css 方法
- 2、如果操作到的样式非常多，那么可以通过 class 方法来操作，将样式写到一个 class 类里面。
- 3、如果考虑到后期维护方便，将 css 从 js 中分离出来，那么推荐使用 class 的方式来操作。

### jQuery 动画

- `show和hide`**显示隐藏**（用法一致）

  - `show([speed],[callback]);`
  - `hide([speed],[callback]);`
  - speed(可选)：动画执行时间
    - 1、如果不传，就没有动画效果
    - 2、毫秒值(比如 1000),动画在 1000 毫秒执行完成(推荐)
    - 3、固定字符串，slow(200)、normal(400)、fast(600)，如果传其他字符串，则默认为 normal。
  - callback（可选）：执行完动画后执行的回调函数
  - show/hide：修改的是元素的 width、height、opacity

- `slideUp和slideDown`**划入划出**

  - `slideUp(speed, callback);`(滑入：隐藏)
  - `slideDown(speed, callback);`(滑出：显示)
  - `slideToggle(speed,callback);`(滑入滑出切换)
    - speed(可选)：动画的执行时间
    - 1.如果不传，默认为 normal，注意区分 show/hide。
    - 2.毫秒值(比如 1000),动画在 1000 毫秒执行完成(推荐)
    - 3.固定字符串，slow(200)、normal(400)、fast(600)
    - callback(可选):执行完动画后执行的回调函数
    - slideUp/slideDown：修改的是元素的`height`

- `fadeIn与fadeOut`**淡入淡出**
  - `fadeIn(speed, callback);`（淡入：隐藏）
  - `fadeOut(speed, callback);`(淡出：显示)
  - `fadeToggle(speed, callback);`(淡入淡出切换)
  - `fadeTo(speed, value, callback)`（淡入淡出到某个值）
    - speed(可选)：动画的执行时间
    - 1.如果不传，默认为 normal，注意区分 show/hide。
    - 2.毫秒值(比如 1000),动画在 1000 毫秒执行完成(推荐)
    - 3.固定字符串，slow(200)、normal(400)、fast(600)
    - callback(可选):执行完动画后执行的回调函数
    - fade 系列方法：修改的是元素的`opacity`
  - `fadeTo(speed, value, callback)`
    - 可以设置具体的透明度
    - speed**（必须）**
    - value 0-1 之间的数值(比如 0.4)，表示淡到某一个值
    - callback(可选) 回调函数

#### 动画总结

- `show/slideDown/fadeIn`三个是显示效果
- `hide/slideUp/fadeOut`三个是隐藏效果
- 这三种方法修改的这些值，都是带数字的，因为带了数字才能做渐变
- 出现和隐藏是位置与定位有关（子绝父相）

### 自定义动画（`animate`）

```
$(selector).animate(
  {params},
  [speed],
  easing,
  [callback]
);
```

- `{params}：` 要执行动画的 CSS 属性，带数字（必选）
- `speed：` 执行动画时长（可选）
- `easing:`控制动画在不同元素的速度，
  - 默认为“swing”
  - [“swing”：在开头和结尾移动慢，在中间移动速度快（秋千式） “linear”：匀速移动]
- `callback：` 动画执行完后立即执行的回调函数（可选）

---

**动画队列问题**

> 在同一个元素上执行多个动画，那么对于这个动画来说，后面的动画会被放到动画队列中，等前面的动画执行完成了才会执行

**停止动画【`stop();`】**

- `stop(clearQueue, jumpToEnd);`
  - 第一个参数：是否清除队列（true,false）
  - 第二个参数：是否跳转到当前动画的最终效果（true,false）
- **最常用的停止动画：stop();**
  - `stop(false,false);（默认）`
    - 不清除队列，不跳到当前动画的最终效果，立即执行下一个动画
  - `stop(fasle,true);`
    - 不清除队列，跳到当前动画的最终效果，再执行下一个动画
  - `stop(true,false);`
    - 清除队列，不跳到当前动画的最终效果，停在当前位置
  - `stop(true,true);`
    - 清除队列，跳到当前动画的最终效果

### jQuery 操作 DOM 节点

- **创建元素**
  - `$(htmlStr)`
    - htmlStr：html 格式的字符串
    - `$(“<span>这是一个span元素</span>”);`
- **添加元素**

  - **方法一：将 jQuery 对象添加到调用者内部的最后面**
    - `var $span = $(“<span>这是一个span元素</span>”);`
    - `$(“div”).append($span);`
  - **方法二：参数传字符串，会自动创建成 jquery 对象**
    - `$(“div”).append(“<span>这是一个span元素</span>”);`
  - **方法三：添加已经存在的元素**
    - `var $p = $(“p”);`
    - `$(“div”).append($p);`
    - **注意：**如果添加的是已经存在的元素，`那么会把之前的元素给干掉`。（类似于剪切的功能）
  - **类似用法**
    - `append(子元素后面)`
    - `prepend(子元素前面)`
    - `after(盒子后面)`
    - `before(盒子前面)`
  - **使用 html 方法创建元素**
    - 设置内容
      - `$(“div”).html(“<span>这是一段内容</span>”);`
    - 获取内容
      - `$(“div”).html()`

- **清空元素**
- `enpty();`
  - 清空指定节点的所有元素，`自身保留(清理门户)`

```
$("div").empty();
清空div的所有内容（推荐使用，会清除子元素上绑定的内容，源码）
```

- `$(“div”).html(“”);`

  - 使用 html 方法来清空元素，绑定的事件不会被清除，不推荐使用，`会造成内存泄漏`

- **删除元素**

  - `remove();`
    - 相比于 empty，remove 是`自身也删除（自杀）`
    - `$("div").remove();`

- **克隆元素**
  - `$(selector).clone();`无参数是深度复制，但不会复制事件
  - `$(selector).clone(true);`有参数是深度复制，会复制事件
    - 复制`$(selector)`所匹配到的元素（深度复制）
    - 返回值为复制的新元素，和原来的元素没有任何关系了。即修改新元素，不会影响到原来的元素

#### **jQuery 操作属性（重点）**

**attr() prop() removeAttr()**

- **设置单个属性**

  - `attr(name, value);`
  - name：需要设置的属性名
  - value：对应的属性值
  - 例：`$(“img”).attr(“title”,”哎哟，不错哦”);`

- **设置多个属性**
  - `attr(obj);`
  - obj：一个对象，包含了需要设置的属性名和值

```
$("img").attr({
    title:  "哎哟，不错哦",
    alt:  "哎哟，不错哦",
    style:"opacity:.5"
});
```

- **获取属性**

  - `attr(name);`
  - name：需要获取的属性名
  - 例：`var oTitle = $("img").attr("title");`
  - `注意：`
    - 1、获取属性时，只会获取到第一个元素对应的属性，与 css 方法一样
    - 2、获取属性时，如果该属性不存在，那么会返回 undefined

- **prop**

  - 用法和 attr 一样
  - 1、设置属性
    - `$(“:checked”).prop(“checked”,true);`
  - 2、获取属性
    - `$(“:checked”).prop(“checked”);`返回 true 或者 false
  - `注意：`
    - 对于`checked、selected、disable`这类`boolean类型`的属性来说，
    - 如果使用 attr 方法获取属性值，得到的不是 true 和 false，而是 checked 及 undefined。
    - `使用prop方法来获取或者设置checked、selected、disable这类的值。`

- **移除属性**
  - `removeAttr(name);`
  - name：需要移除的属性名，`如果无参数，不会有任何操作`，区分`removeClass`
  - 例：`$("img").removeAttr("title");`

#### jQuery 操作值与内容

**val()、html()、text()**

- `val();`

  - 用于`设置`和`获取`表单元素的值，例如`input、select、textarea`的值
  - **设置值**
    - `$("#btn").val("按钮");`
  - **获取值**
    - `$("#btn").val();`

- `html();`

  - **设置内容**
    - `$("div").html("<span>内容</span>");`
  - **获取值**
    - `$("div").html();`

- `text();`
  - **设置内容**
    - `$("div").text("<span>内容</span>");`
  - **获取值**
    - `$("div").text();`

**html 方法与 text 方法的区别：**

- html 方法会识别 html 标签
- text 方法会把内容直接当成字符串，并不会识别 html 标签

#### jQuery 操作尺寸

**height()、width()**

- `height(num);和width(num);`
  - **带参数为设置宽高**
    - `$("img").height(200);`
    - `$("img").width(200);`
  - **不带参数为获取宽高**
    - `$("img").height();`
    - `$("img").width();`
  - 返回值是 number 类型（比如 200）
  - 而使用`$(“img”).css(“width”);`返回的是字符串（比如 200px）

#### jQuery 操作坐标值

**offset();[left、top]、position();**

- **offset**

  - **设置或者获取元素相对于文档 document 的位置**
  - **设置位置**
    - `$("#box").offset({left:100,top:100});`
  - **获取位置**
    - `$("#box").offset();`
  - `注意：`
    - 使用 offset 操作，如果元素没有设置定位(默认 position:static)，则会把 position 修改为 relative.会修改 left、top

- **position**
  - **`获取`相对于其最近的有定位的父元素的位置**
  - `$("#box").position();`
    - 返回值为对象`{left:num,top:num}`
  - **注意：position 方法只能获取，不能设置**

#### 事件触发

- **简单事件触发**

  - `$(selector).click();`
  - 触发 click 事件

- **trigger 方法触发事件**

  - `$(selector).trigger("click");`

- **triggerHandler 触发事件**
  - `$(selector).triggerHandler("focus");`
  - 触发事件响应方法，不触发浏览器行为。比如：文本框获得焦点的默认行为

### jQuery 事件机制

**简单事件绑定>>bind 事件绑定>>delegate 事件绑定>>on 事件绑定【`推荐使用on`】**

### jQuery 事件对象（event）

| 对象属性                | 解释                                               |
| ----------------------- | -------------------------------------------------- |
| event.type              | 事件类型                                           |
| event.data              | 存储绑定事件时传递的附加数据                       |
| event.target            | 点了谁就是谁                                       |
| event.currentTarget     | 当前 DOM 元素，等同于 this                         |
| screenX 和 screenY      | 对应屏幕`最左上角`的值                             |
| offsetX 和 offsetY      | 点击的位置距离元素的左上角的位置                   |
| clientX 和 clientY      | 距离页面左上角的位置（忽视滚动条）                 |
| pageX 和 pageY          | 距离页面最顶部的左上角的位置（会计算滚动条的距离） |
| event.witch             | 鼠标按键类型，1=鼠标左键 2=鼠标中键 3=鼠标右键     |
| event.keyCode           | 按下的键盘代码                                     |
| event.stopPropagation() | 阻止事件冒泡                                       |
| event.preventDefault()  | 阻止浏览器默认行为                                 |
| return false            | 既能防止事件冒泡，又能阻止浏览器默认行为           |

### 链式编程

- **链式编程原理：`return this;`**

  - 通常情况下，只有设置操作才能把链式编程延续下去。
  - 因为获取操作的时候，会返回获取到的相应的值，无法返回 this

- **`end();`**
  - 筛选选择器会改变 jQuery 对象的 DOM 对象
  - 想要回复到上一次的状态，并且返回匹配元素之前的状态

### 隐式迭代

- 在方法的内部会为匹配到的所有元素进行循环遍历，执行相应的方法；而不用我们再进行循环，简化我们的操作，方便我们调用
- 如果获取的是多元素的值，大部分情况下返回的是第一个元素的值
  - 设置性操作的时候：设置的是所有的元素
  - 获取性操作：获取的是第一个元素

### each 方法

- 大部分情况下是不需要使用 each 方法的，因为 jQuery 的隐式迭代特性。
- 如果要对每个元素做不同的处理，这时候就用到了 each 方法
- `作用：`遍历 jQuery 对象集合，为每个匹配的元素执行一个函数

```
$(selector).each(function(index,element){

});

index:表示当前元素在所有匹配元素中的索引号
element:表示当前元素（DOM对象）
```

### 多库共存

- jQuery 占用了`$`这个标识符，如果引用的其他库也用到`$`这个标识符，这时候为了保证每个库都能正常使用，这时候就存在了多库共存的问题
- 后引入的`$`的会覆盖掉先引入的库中的`$`
- jQuery 中的`$`和`jQuery`是两个相同的变量，因此遇到多库共存的时候，可以让 jquery 交出`$`符的控制权，这个时候还就可以使用`$`

```
console.log($);//function(selector, context){}

//$.noConflict();//释放$的控制权

console.log($);{name:”zhangsan”,age:12}

jQuery(function () {
  jQuery("div").html("我不是div的内容");
});
```

## jQuery 基本结构

> jQuery 代码全写在一个自调函数中
>
> 平常使用的\$和 jQuery 是 jQuery 对外暴露的一个工厂函数(入口函数)
> 构造函数在 jQuery 内部为 init，且被添加到了 jQuery 原型中，是可以通过$.init 访问到
>
> 为了能让第三方扩展功能，把工厂函数的原型和构造函数的原型保持了一致

[TOC]

```javascript
;(function (window) {
  //工厂函数
  var jQuery = function (selector, context) {
    return new jQuery.prototype.init(selector, context)
  }
  //工厂函数原型重命名
  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
  }
  //便于jQuery的扩展
  jQuery.extend = jQuery.prototype.extend = function (obj) {
    for (var key in obj) {
      this[key] = obj[key]
    }
  }
  //构造函数
  var init = (jQuery.prototype.init = function (selector, context) {})
  //构造函数原型指向工厂函数原型，可以通过向工厂函数添加方法，使构造函数能够使用
  init.prototype = jQuery.prototype
  window.jQuery = window.$ = jQuery
})(window)
```

#### extend

- 方便给`jQuery`和`jQuery.prototype`添加方法和属性

#### jQuery 返回的实例是一个伪数组

- 如果给$传入 html 结构

> 添加`DOMContentLoaded`事件是为了能让页面加载完成之后，再执行相应的代码，来防止对页面元素操作失败
> `load`也可以监听事件，但比较慢，所以一般用`DOMContentLoaded` > `DOMContentLoaded`在页面只执行一次，所以会有一些问题
> 通过给先触发的`DOMContentLoaded`事件添加

**为什么要监听 DOMContentLoaded 事件**

> jQuery 就是来操作 DOM 的，只有当 DOM 树加载完成后在可以进行操作，所以要监听这个事件
> DOMContentLoaded 事件是浏览器默认的触发事件，在此事件触发之前绑定的事件，会在该事件结束后执行，此 DOMContentLoaded 事件结束后如果再再绑定事件，则后面的事件会继续等待 DOMContentLoaded 事件的触发，但在 DOMContentLoaded 事件只执行一次，以后就不再触发，所以，后绑定的事件就不会再触发

### `Object.keys`

- 语法：
  - `Object.keys（object）`
- ES5 新增的方法，用来获取对象自己的，并且可枚举的所有属性，不会去继承的对象中找，返回**一个属性的数组**

- 声明函数内的变量时，最好再函数开始提前声明

### 获取和设置属性值有两种方式：

- 方式：
  - 通过`getAttribute`(获取)和`setAttribute`(设置)方法
  - 通过`DOM.属性名`(获取) 和 `DOM.属性名=属性值`(设置)方式
- 区别：
  - 1、通过`setAttribute`设置的自定义属性，必须要通过`getAttribute`获取， `. `的方式获取不到
  - 2、通过`.`方式设置的自定义属性，必须通过`.`来获取， `getAttribute`获取不到
  - 3、对于 DOM 原生的哪些属性，有些两种方式都可以获取值，有些只能通过` .` 方式来获取**最新的值**，而`getAttribute`只能获取默认值
- 补充：
  - 对于 IE6、7、8 来说，两种方式可以混用，没有区别

### 解决正序删除数组中数据时，因数组长度实时变化，而出现数据遗漏，无法正确删除的问题

- 正序删除时，数组长度会随删除数据而动态变化，而使删除数据有遗漏
- 可以考虑倒叙删除，这样删除数据时，已遍历的数据不会影响没有遍历过的数据，这样变化的数组的长度，就不会影响程序正常执行

```
var arr = [11,11,11,11,11,11,11,22,11,33,44,55,44];

for ( var i = arr.length - 1; i >= 0; i-- ) {
    if ( arr[i] == 11 ) {
        arr.splice( i, 1 );
    }
}
```

**encodeURI 编码**
encodeURIComponent

**decodeURI 解码**
