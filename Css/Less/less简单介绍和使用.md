# Less

> CSS 预处理器

[TOC]

## 基本使用

**全局安装：**

```bash
npm install -g less
```

**命令行执行**

- 通过`lessc index.less > index.css`，在命令行把`index.less`文件编译转换为`index.css`文件

- **客户端使用**[客户端下载](https://raw.githubusercontent.com/less/less.js/v2.5.3/dist/less.min.js)

  - 1、将`rel`属性设置为`stylesheet/less`
    - `<link rel="stylesheet/less" type="text/css" href="styles.less" />`
  - 2、之后引入`less.js`文件对`style.less`进行解析
    - `<script src="less.js" type="text/javascript"></script>`

- **Less CDN 下加速**

  - `<script src="http://cdn.bootcss.com/less.js/1.7.0/less.min.js"></script>`

- **less 文件中导入准则**
  - 在标准的`CSS`中，`@import`必须在所有其他类型的规则之前
  - 但是`Less.js`不在乎`@import`语句放在什么位置

```less
#box {
  color: red;
}

@import 'others.less';
```

## 组成介绍

### 一、变量

- 对于出现频率比较高的**属性值**，可以设置一个变量来对其进行替代，**以便于书写与维护(只需修改一出变量就能对全局属性进行修改)**
- `变量可以是颜色、尺寸、选择器、字体名、URL等`

#### `属性值`

```less
// before 一般书写方式

.box1 {
  width: 100px;
  height: 100px;
  color: red;
  background-color: blue;
}
.box2 {
  color: red;
  background-color: blue;
}
// -----------------------------------------
// after less书写方式

@color: red;
@color-back: blue;
.box1 {
  width: 100px;
  height: 100px;
  color: @color;
  background-color: @color-back;
}
.box2 {
  color: @color;
  background-color: @color-back;
}
```

#### `选择器`

```less
@mySelector: banner;

.@{mySelector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}

// 编译后------------------------------------
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

#### `URL`

```less
@images: '../img';

// 用法
body {
  color: #444;
  background: url('@{images}/white-sand.png');
}

// 编译后------------------------------------
body {
  color: #444;
  background: url('../img/white-sand.png');
}
```

#### `属性`

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}

// 编译后----------------------------------------
.widget {
  color: #0ee;
  background-color: #999;
}
```

#### `变量名`

```less
@fnord: 'I am fnord.';
@var: 'fnord';
content: @@var;
// -------------------------------------------
content: 'I am fnord.';
// @@var  = @(@var) = @(fnord) = @fnord = "I am fnord."
```

#### `默认变量`

### 二、`Extend`

### 三、Mixins（混合）

#### 1、可以使已存在的样式应用于其他选择器

```less
#box1 {
  color: red;
  width: 100px;
  height: 100px;
}
#box2 {
  #box1;
  background-color: blue;
}
#box3 {
  #box1;
  display: inline-block;
}

// 转换为CSS文件效果为
#box1 {
  color: red;
  width: 100px;
  height: 100px;
}
#box2 {
  color: red;
  width: 100px;
  height: 100px;
  background-color: blue;
}
#box3 {
  color: red;
  width: 100px;
  height: 100px;
  display: inline-block;
}
```

- **如果不想让`#box1`出现在最终的 CSS 文件中，则需要在#box1 后加`()`**

```less
#box1() {
  // 加括号以后在编译好的CSS文件中不会显示此项
  color: red;
  width: 100px;
  height: 100px;
}
#box2 {
  #bxo1;
  background-color: blue;
}
#box3 {
  #box1(); // 加括号和不加效果一样
  display: inline-block;
}
```

#### 2、可以接收参数

```less
#box1(@size: 100px) {
  color: red;
  width: @size;
  height: @size;
}
#box2 {
  #box1
  background-color: blue;
}
#box3 {
  #box1(50px)
  display: inline-block;
}

// 转换为CSS后效果为
#box2 {
  color: red;
  width: 100px;
  height: 100px;
  background-color: blue;
}
#box3 {
  color: red;
  width: 50px;
  height: 50px;
  display: inline-block;
}
```

#### 3、父级选择器

- “父选择器”有各种各样的用法。
- 基本上，任何时候你都需要以不同的方式来组合选择器嵌套的规则，而不是默认规则。
- 比如，一个`使用&的典型的场景就是生成重复的类名`

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}

// 输出
button:hover {
  border: 1px solid red;
}

// ---------------------------------------------
.button {
  &-ok {
    background-image: url('ok.png');
  }
  &-cancel {
    background-image: url('cancel.png');
  }

  &-custom {
    background-image: url('custom.png');
  }
}

// 输出
.button-ok {
  background-image: url('ok.png');
}
.button-cancel {
  background-image: url('cancel.png');
}
.button-custom {
  background-image: url('custom.png');
}
```

#### 4、命名空间

```less
#outer {
  .inner {
    // 带括号（）后此项不输出
    color: red;
  }
}

.c {
  #outer > .inner;
}

// 输出
#outer .inner {
  color: red;
}
.c {
  color: red;
}
//----------------------------------------
// 下面四种写法效果是一样的
#outer > .inner;
#outer > .inner();
#outer.inner;
#outer.inner();
```

#### 5、传递规则集给混合

- 调用时`规则集合后面的圆括号是必须的@detached-ruleset();`
  - `@detached-ruleset;` 调用无效。

```less
// 声明 detached 规则集合
@detached-ruleset: {
  background: red;
};

// 使用 detached 规则集合
.top {
  @detached-ruleset(); // 括号是必须的
}

// 使用结果
.top {
  background-color: red;
}
```

#### 6、`!important`继承使用

- 在调用之后使用`!important`最终得到的属性之后会带上`!important`

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo(1);
}
.important {
  .foo(2) !important;
}

// --------------------------------
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

#### 7、`darken、lighten`

- `darken(@link-color, 30%)`
  - 在原有的基础上使颜色加深
- `lighten(@link-color, 30%);`
  - 在原有的基础上使颜色变浅

### 四、带参数的混合（Mixin）

#### 1、多个参数

```less

```

#### 2、命名参数（多个命名参数可以不按顺序使用）

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
//--------------------------------------
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### 3、`@arguments`使用

- 接受的参数如果不想做处理，可以用`@arguments`来接收使用

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}

//-------------------------------------
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  box-shadow: 2px 5px 1px #000;
}
```

#### 4、`@rest`

- 可以使用`...`接收不定参数

```less

```

#### 5、`Pattern-matching`

```less

```

### 五、嵌套和作用域

- 嵌套可以使你的 html 页面结构和 css 样式结构，保持一致，更容易理解观察，减少冲突

```less
ul {
  padding: 10px;
  list-style: none;
  background-color: red;

  li {
    color: blue;
    width: 10px;
    height: 10px;
  }
}

// 编译后
ul {
  padding: 10px;
  list-style: none;
  background-color: red;
}
ul li {
  color: blue;
  width: 10px;
  height: 10px;
}
```

- less 中也有作用域，当前作用域中没有时，回去上一级中找，并使用最靠近的声明变量

```less
@color: green;

ul {
  @color: blue;
  padding: 10px;
  list-style: none;
  background-color: red;

  li {
    color: @color;
    width: 10px;
    height: 10px;
  }
}

// 编译后
ul {
  padding: 10px;
  list-style: none;
  background-color: red;
}
ul li {
  color: blue;
  width: 10px;
  height: 10px;
}
```

### 六、运算操作

- 可以对一些量化的变量进行操作变化

```less
@div-width: 100px;
@color: #03a9f4;

div {
  height: 50px;
  display: inline-block;
}
#left {
  width: @div-width;
  background-color: @color;
}
#right {
  width: @div-width * 2;
  background-color: @color - 100;
}

// 编译后
div {
  height: 50px;
  display: inline-block;
}
#left {
  width: 100px;
  background-color: red;
}
#right {
  width: 200px;
  background-color: #9b0000;
}
```

### 七、函数

```less
@color: red;

div {
  height: 100px;
  width: 100px;
  background-color: @color;

  &:hover {
    background-color: fadeout(@color, 50%);
  }
}

// 编译后
div {
  height: 100px;
  width: 100px;
  background-color: red;
}
div:hover {
  background-color: rgba(255, 0, 0, 0.5);
}
```

### 八、`@import`导入外部文件

> `@import`可以在任可地方引入

#### 设置文件扩展名引入

- 根据文件扩展名的不同，引入规则也不同
- 最好能带上文件名

#### 导入选项

- `@import (reference)`
  - 导入外部文件，但不会将导入的样式添加到编译后的输出中，除非被引用。
- `@import (inline)`
  - 使用外部文件，但不处理编译它们。
- `@import（less）`
  - 将导入的文件视为 Less，而不管文件扩展名
- `@import（css）`
  - 将导入的文件视为常规 CSS，而不管文件扩展名如何。这意味着进口声明将保持原样。
- `@import（once）`
  - 默认行为。这意味着该文件只导入一次，该文件的后续导入语句将被忽略。
- `@import（multiple）`
  - 允许导入具有相同名称的多个文件。和`@import（once）`相反。

### 九、`Mixin Guards`

### 十、`CSS Guards`

### 十一、循环

```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1)); // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}
//----------------------------------
div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```

```less
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
.generate-columns(4);
//----------------------------------
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

### 十二、合并

> merge 特性能够聚合多个属性从而形成一个用逗号分隔的单一属性。
> merge 对于像 background 和 transform 这类属性非常有用
> 为了避免意外的合并，merge 需要在每个需要合并的属性名后面添加一个 + 以作标示

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
//------------------------------------
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```
