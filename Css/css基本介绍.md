# CSS

[TOC]
```
选择器 {
  属性: 值;
  属性: 值;
}
```

- **1、行内样式:**
  - 是通过在标签中设置style属性来达到控制标签样式效果。

```
例：
<h1 style="color: red; font-size:宋体;...">内容</h1>
可使内容为红色字体。【style属性可以设置多条CSS样式】
```

- **2、嵌入样式：**
  - 在head标签中嵌套一个style标签，在其中写CSS样式内容。style标签有一个默认type属性，可以省略。
```
<style type="text/css">
  p {
    属性: 值；
    属性: 值；
   }
  标签 {
      属性: 值；
      属性: 值；
   }
</style>
```

- **3、外部CSS样式：**【一个页面可调用多个CSS引用】
```
<link rel="stylesheet" type="text/css" href="放置‘.css’文件的目录">
```

## 属性
- `width:`设置宽度（width:20px;）
- `height:`高度(height:20px;)
- `color：`前景颜色(color:red;)
- `background-color:`背景色(background-color:red;)
- `text-indent：2em;`设置首行缩进2个字符
- `text-align:center、left、right;`文字和图片位置（设置块级元素）
- `text-decoration:`设置下划线（none无，underline有）
-` line-height：`行高
-` font-weight：`文字是否加粗    【bold（加粗显示）、normal(正常显示)、100-700（无单位）】
- `font-style：`文字是否斜体显示  【normal（正常显示）、italic（文字斜体显示，使用文字本身样式）、oblique（让文字进行倾斜显示）】
- `font-size:`文字大小（font-size:20px;）
- `font-family：`【1、直接写对应中文名 2、对应英文名3、设置unicode编码】设置字体（可以设置多个字体，中间用“，”隔开，推荐设置多个字体）
  - 1、serif有衬线字体（对字体有一定的修饰作用）
  - 2、sans-serif无衬线字体（无修饰，粗细一致)【放在字体设置最后。前面的字体都查找失败后，在系统中再找一种sans-serif字体作为默认字体】
  - ★sans-serif如果放在前面，则后面字体就会失效

- `letter-spacing:`字间距[10px]（字符与字符之间的空白间距，默认为normal）
- `word-spacing:`英文单词之间的间距，对中文无效[10px]（如果中文之间有空格的话，会把空格设置成10px）
- `cursor:`鼠标样式;【pointer（小手）、move（移动）、help（帮助）】


**font属性联写（WSSF）**
- 顺序格式【font: weight（加粗）,style(斜体),size(大小),family（字体）】
- 1、必须有font-size(大小)和font-family（字体）
- 2、font-size(大小)的值必须放在font-family（字体）前面
- 3、font-weight（加粗）和font-style(斜体)必须放在font-size和font-famil前
- 4、font-weight（加粗）和font-style(斜体)无顺序（也可不设置）

**颜色设置方式：**
- 1、直接命名
- 2、十六进制  #00--ff
- 3、rgb方式  R: red 取值为：0-255  G: green   取值为：0-255  B:blue   取值为： 0-255    【color:rgb(0, 0, 0);】
- 4、rgba方式  A:alpha  通道   a的取值为：0-1之间（可取小数。.5）  【color:rgba(0, 0, 0, 0.5);】
- 5、opacity    取值为：0-1之间（可取小数。.5）

**★当有公共类样式时，可提取出到一个类**

## 选择器
- **基础选择器；**（标签选择器、类选择器、ID选择器、通配符选择器）
- 一、所有标签选择器（通配符选择器）【将页面中所有标签选中并应用样式】
```
 *{
  属性：值；
  }
```
- 二、标签选择器(使用html中的标签)
```
p{
  属性：值；
}
span{
  属性：值；
}
```
- 三、ID选择器  #web1（自定义类名）{  }【一个标签最好只有一个ID，且ID名必须唯一，一个标签只能调用一个ID样式】
  - ID选择器命名规范：
  - 1、只允许出现字母、下划线、数字；
  - 2、只允许以字母开头；
  - 3、长度没有规范，不建议太长；
  - 4、不允许出现标签名
```
#web1(自定义类名){
  属性：值；
}
<p id="web1">内容</p>
```
- 四、★★类选择器（class）  .web（自定义类名）{  }  设置带有class="web"的标签的属性，可以有多个属性，用空格隔开
```
.web1(自定义类名)【一个样式可以被多个标签使用】
{
  属性：值；
  属性：值；
}
.web2(自定义类名)
{
  属性：值；
  属性：值；
}
<p class="web1 web2 web3">内容</p>【一个人标签可以调用多个类样式，用空格隔开】
<div class="web1 web2 web3">内容</div>
```
**类的命名规范：**
- 1、不能以纯数字开头命名
- 2、可以用汉字命名（不推荐使用）
- 3、特殊字符不可命名（“_”除外，但不推荐使用）
- 4、建议不要使用标签名（关键字）

**【ID选择器和类选择器的区别】**
- 1、相同属性的class值可出现多次，ID只能出现一次。
- 2、一个class属性可以有多个值，也就是一个标签可以有多个类
- 3、当确定页面标签只出现一次时用ID选择器；出现多个标签时用类选择器

---

头：header

内容：content/container

尾：footer

导航：nav

侧栏：sidebar

栏目：column

页面外围控制整体布局宽度：wrapper

左右中：left right center

登录条：loginbar

标志：logo

广告：banner

页面主体：main

热点：hot

新闻：news

下载：download

子导航：subnav

菜单：menu

子菜单：submenu

搜索：search

友情链接：friendlink

页脚：footer

版权：copyright

滚动：scroll

内容：content

---
- **复合选择器：**（标签指定式选择器、后代选择器、并集选择器、子代选择器、属性选择器）
- 一、标签指定式选择器【既满足拥有标签名，又满足拥有class属性名】
```
标签名.class属性名（标签名#web[id名]）{
  属性：值；
}
<标签名 class="属性名" id="web"></标签名>

div.box{
  属性：值；
}
div#header{
  属性：值；
}
<div class="box" id="header"></div>
```

- 二、后代选择器  【标签名1和 标签名2必须用**“空格”**隔开，必须用在嵌套关系的标签中】
```
.标签名1 标签名2 {
       属性：值；
}

.class属性名 .class属性名{
         属性：值；
}

.class属性名 标签名.class属性名{
        属性：值；
}
```

- 三、并集选择器  【标签之间可以是并列关系，也可以是包含关系，标签之间必须用逗号隔开】
```
标签名1，标签名2，标签名3 {
         属性：值
}
```

- 四、子元素选择器  【只能选择直接子元素】
```
母标签名（.class属性名）>下级标签名（.class属性名）{
              属性：值；
}
```

- 五、属性选择器【标签同时满足有class=""属性或同时满足有id=""】
```
标签名[class=""][id=""]{
       属性：值；
}
```

**CSS样式的层叠性和继承性：**
- 一、层叠：优先级相同的情况下，CSS前面的样式会被最后的样式覆盖（与样式定义顺序有关，与调用样式顺序无关）
- 二、继承：标签之间的关系属于嵌套关系
  - 【颜色（color）、大小（font-size）、字体（font-family）、粗细（font-style）、行高（line-height）有关文字的相关属性都可被继承】
- **★继承属性特殊标签：**（有默认样式的标签不能直接继承父元素中修改其默认样式的样式设置，如要修改则需    直接  设定）
  - 1、a标签不能直接继承父元素中的颜色样式
  - 2、标题标签不能直接继承父元素中的字体大小
- 三、优先级：【优先级不同则按优先级，相同则进行叠加】
  - **!important>行内样式>ID选择器>类选择器>标签选择器**
> ★!important>行内样式选择器>ID选择器>类选择器>标签选择器>所有标签选择器（通配符选择器）>继承样式>默认样式
> ★继承权重为0（当子元素有自己设置的样式时，父级元素的样式不会覆盖其自己设置的样式）
> ★权重叠加（优先级之间权重可以进行叠加，叠加后权重越高优先级越高）


##### **背景（background）：**
- 一、`background-color:`背景色;
- 二、`background-image:`背景图;（`none`默认无、url[图片文件路径]）【必须设置宽度和高度】
- 三、`background-repeat:`背景图像是否及如何铺排;(必须先指定背景图像)
  - `repeat`    背景图像在纵向和横向上平铺
  - `no-repeat`  背景图像不平铺
  - `repeat-x` 背景图像在横向上平铺
  - `repeat-y` 背景图像在纵向平铺
- 四、`background-position:`背景图像位置; `【top | center | bottom | left | center | right 】`
  - 1、可以设置两个方位名词，位置可调换
  - 2、如果设置一个方位词，另一个默认为center
  - 3、可以设置具体数字（px），第一个为水平方向，第二个为垂直方向
  - 4、如果设置一个具体数字（px），另一个默认为center
  - 5、如果只指定了一个值，该值将用于横坐标，第二个值将用于纵坐标。
- 五、`background-attachment :`背景图像是随对象内容滚动还是固定的
  - 【`scroll`背景图像是随对象内容滚动（默认值）、`fixed`背景图像固定】
  - 设置固定位置的时候，图片以浏览器可视区域左上角为基准

> 背景属性联写：【必须先设置宽度和高度，才能设置背景图片】  无个数限制，无顺序限制

##### display改变标签显示模式：
- `none`（此元素不被显示，在文档中被移除，不影响页面布局）
  - 【设置`visibility:hidden;`可把元素不显示，但占用页面空间】
- `inline`（此元素被设置成行内元素）
- `block(此元素被设置成块级元素)
- `inline-block`(按行内标签排版[行内块]，但可设置宽高)

> **行内元素：**不能设置宽高，只能通过他的内容来撑开宽度高度，如果设置了不会影响显示。不独占行，只有左右边距
>
> **块级元素：**可以设置宽高，有上下左右边距，独占行
>
> **行内块元素：**可设置宽高，有左右边距，不独占行

#### CSS伪类：
>【如果所有都写，则要严格按顺序  **LoVe HAte**    可单独设置一项】
```
标签名：伪类名{
    属性：值；
}
```
- `标签名:link`  {属性：值；}  设置  **未被访问过的**  链接的属性(默认样式   【link省略写】)
- `标签名:visited`  {属性：值；}  设置  **被访问过的**  链接的属性（被访问过的样式   设置与颜色样式有关的属性【很少用】）
- `标签名:hover`  {属性：值；}  设置  **鼠标悬停**    链接时显示的属性
- `标签名:active  `{属性：值；}  应用于  **将要被激活的**  链接的属性
- `标签名:focus`  {属性：值；}  当文本框、按钮等**被选中时**显示的属性


#### CSS伪元素：【用于控制内容】
- `:first-line`  设置第一行内容的属性
- `:firet-letter  `  设置第一个字的属性
- `:first-child`    设置属于第一个子元素的元素属性
- `:before`    设置所选择内容前的内容(属性)
- `:after`    设置所选择内容后的内容(属性)

**行高：（line-height）【默认文字大小16px、默认文字行高18px】**
- 影响行高的值有文字大小、字体
- 页面中文本行高=文字大小+上间距+下间距（文字大小+2倍间距）  【行高=两条基线之间的距离】
- 顶线（文字顶端）、中线（文字中间）、基线（底线和中线之间，偏靠底线）、底线（文字低端）
- 行高不影响文字大小，影响上下间距
- 一、作用：使文字垂直居中（设置行高和盒子高度一样时就可实现文字垂直居中  [因为上间距和下间距]）
- 二、单位：（px、em、%、无单位）【如果一个文字没有设置具体的行高值，默认的行高与文字大小有关；如果设置了行高单位为px，那么行高于文字大小无关】
  - 1、给单独一个标签设置行高
  - px  【行高=设置的行高】（与文字大小无关）
  - em  【行高=设置的行高*文字大小】
  - %  【行高=设置的行高*文字大小】
  - 不带单位  【行高=设置的行高*文字大小】
  -
  - 2、给父元素设置行高，（子元素没有设置行高时）子元素行高变化
  - 有单位    子元素行高=父元素文字大小*父元素行高值（继承性）
  - 不带单位    子元素行高=子元素文字大小*父元素行高值
> 如果标签没有设置高度，行高可以也可以将盒子撑开

#### ★★★★★盒子模型
>【网页中的作用：进行网页布局（画盒子）】
> `border、padding、margin`

- `border`边框
  - `border-width`    (设置边框宽度)【有默认值】
  - `border-style`    （设置边框样式）【必须写】
    - `dotted`    点线
    - `dashed`    虚线
    - `solid`    实线
  - `border-color`    （设置边框颜色）【有默认值】
  - 单独边框设置（`border-top-color`）
  -
  - 边框属性联写
    - 单边框  `border-top:width style color;`(无顺序)
    - 全边框  `border：width style color;`
  - 隐藏边框 【`border：0 none;`】
  - 去边框轮廓线  `outline-style：none;`

- `padding`内边距  （内容与边框之间的距离[]）
  - `padding-left`(左内边框)
  - `padding-top`(上内边框)
  - `padding-right`(右内边框)
  - `padding-bottom`(下内边框)
  -
  - 属性联写
    - `padding: top right bottom left;`（顺序为顺时针[上、右、下、左]）
    - 1、设置一个值：代表上下左右
    - 2、设置两个值：第一个代表上下，第二个代表左右
    - 3、设置三个值：第一个代表上，第二个代表左右，第三个代表下
    - 4、设置四个值：第一个代表上，第二个代表右，第三个代表下，第四个代表左
  - 盒子大小计算：
    - 页面中盒子最终大小（宽度）=设置的内容宽度+左右边框+左右边距
  - 嵌套的盒子：
    - 如果一个子盒子没有设置宽度，如果给子盒子设置padding值时，子盒子宽度在父盒子宽度范围内不会发生变化
  - 继承的盒子padding不会影响宽度大小

- margin外边距  （盒子与盒子之间的距离）
  - 外边距属性联写：margin：；（顺序为顺时针[上、右、下、左]）【参考padding属性联写】
  - 外边距特点：
  - 2、外边距塌陷（问题bug）
    - 给父盒子添加边框（border）
    - 给父盒子添加`overflow:hidden;`【触发bfc（格式化上下文）】

#### 文档流（标准流）【normal  flow】
> 【在标准流的情况下，块级元素独占一行显示，行内元素在一行上显示。】

- 浮动（float）
  - `float: left | right;`
  - 一、浮动的特点：
    - 1、设置了浮动的元素，不占原来的位置（脱离标准流、不受标准流影响）
    - 2、可以让块级元素在一行上显示。
    - 3、给一个元素设置了浮动，那么会影响该元素的后面元素
    - 4、浮动（脱标）会实现模式的转换
  - 二、浮动的应用（作用）：
    - 1、最初是用来实现文字图片环绕效果
    - 2、制作网页导航
    - 3、网页布局（div+css）
  - 三、清除浮动：
    - 什么时候清除浮动？【同时满足】
    - 1、父元素没有高度（高度为0）
    - 2、父元素中子元素都设置了浮动
  - 四、清除浮动方式：
    - 1、使用clear属性
      - `clear：left  |  right  |both;`
      - 在浮动元素后加一个空标签（div）,设置class属性，在style中
    - 2、给父元素添加`(overflow:hidden;)`
      - 注意：如果父元素中有定位元素，会对定位元素造成影响
    - 3、使用伪元素清除浮动（ ）
```
.clearfix:after{
  content:"";
  height: 0;
  line-height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.clearfix{
  zoom: 1;(IE浏览器写法)
}
```

**CSS初始化作用：保持页面中的样式在不同浏览器中保持样式一致**

**overflow用法：**
- 1、`overflow：visible；`(超出内容默认显示)
- 2、`overflow: hidden;`(超出部分隐藏)
- 3、`overflow： scroll；`（设置滚动条）
- 4、`overflow: anto;`（内容不超出没有滚动条，内容超出有滚动条）

**定位（position）**
> 定位的元素常与方位名词组合使用`（left、top、right、bottom）`
> `position: left | right | bottom | left;`

- 1、静态定位（static）【与标准流显示效果一样】
- 2、绝对定位(absolute)
  - 如果一个元素设置了绝对定位，而它的父元素没有设置绝对定位，那么这个元素是以body标签左上角为基准设置定位的
  - 如果一个元素设置了绝对定位，它的父元素也设置绝对定位，那么这个元素是以父元素左上角为基准设置定位的
  - 特点：
    - 元素不占位置
    - 元素是脱标的元素
    - 元素也可以实现模式转换
  - 绝对定位盒子居中显示：
    - `margin: 0 auto;`只对标准流起作用
    - 1、子盒子用left移动父元素宽度一半（50%），然后子元素向相反的方向用margin-left移动自己宽度的一半
    - 2、子盒子用left移动父元素宽度一半减去子盒子宽度的一半
- 3、相对定位（relative）
  - 一个元素设置了相对定位，该元素是以`自己原来的位置`为基准设定位置的
  - 特点：
    - 元素占位置
    - 不能实现模式转换
    - 没有脱标
- 4、固定定位（fixed）
  - 一个元素设置了固定定位后，该元素是以body标签左上角为基准设置定位的
  - 特点：
    - 元素不占位置
    - 元素脱离了标准流
    - 元素实现了模式转换

**模式转换方式**
- `display`
- `float`
- `position：absolute；`
- `position：fixed；`

**z-index(层级)**
- 在页面中`只有定位的元素`才有z-index值
- 定位的元素z-index默认为auto相当于0
- 特点：
  - 当z-index相同的情况下后面 的元素会压着前面的元素（后来居上原则）
  - 当元素的父元素设置了z-index值，则以父元素设置的z-index为准

**规避脱标流**
- 网页布局中，优先考虑标准流，然后考虑使用浮动，最后是考虑定位
- 元素进行模式转换时使用display
- 绝对定位或者浮动，都可以配合display使用

**图片垂直显示方式**
- 图片（行内块元素）`vertical-align: baseline;`图片默认与基线对齐
- 图片与中线对齐`vertical-align:middle;`
  - 设置行高值
  - 给图片设置`vertical-align:middle;`

**vertacil-align**只能和行内块元素配合使用
- `baseline`  基线对齐
- `top`  顶端对齐
- `middle`  中间对齐
- `bottom`  底部对齐

**CSS可见性**
- `overflow：hidden；`（将超出部分隐藏）
- `display：block；`（元素显示）
- `display：none；`（元素隐藏）【不占位置】
- `visibility：hidden；`（元素隐藏）【占位置】

**logo内容移除**
- 设置`text-indent：-999em;`

**精灵图使用：（使用精灵图是为了减少服务器的压力）**
- 精灵图是一张背景图片
- 浏览器中的坐标系
- 精灵图只能使用打开的方式
- 制作精灵图：
  - 新建文档，颜色为透明
  - 画布的宽度以图片宽度最大为准
  - 图片与图片之间最好有些距离
  - 图片另存为拼合的格式

**★CSS样式初始化**
```
body,div,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,a,input,img{
  margin: 0;
  padding: 0;
  list-style: none;    去掉列表前样式
  font-size: 12px;
  font-family: "宋体";
  outline-style: none;
  border: 0 none;      去掉输入框边框
  text-decoration: none;    a标签样式
  color: ;      主题颜色
  vertical-align: bottom;    图片与文字底部对齐

}


a:hover{
    color: #B1191A;
}

★清除浮动
.clearfix:after{
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.clearfix{
  zoom: 1;  针对IE
}
```

**列表中，使a标签居中背景铺满**
```
li{
  float:left;
}
li a{
  padding: 0 16px;（左右边距）
  line-height: 25px;（导航栏高度，使居中）
  height: 25px;
  display:inline-block;（设置为行内块必须有）
  color:red;
}
li:hover{
  background-color: li标签背景色;}
li:hover a{
  color: a文字颜色;
}
```

**导航栏下三角标签**
```
<style type="text/css">
  .head .head_l li{
        position: relative;
        padding: 0 20px 0 10px;
    }

      .head .head_l i{
          display: inline-block;
          height: 15px;
          width: 15px;
          font-style: normal;
          overflow: hidden;
          position: absolute;
          top: 13px;
          right: 0px;
        }

      .head .head_l s{
          text-decoration: none;
          position: absolute;
          top: -15px;
        }
</style>

<div class="head_l">
  <ul>
    <li>
      <a href="">送至：北京</a>
      <i><s>◇</s></i>
    </li>
  </ul>
</div>
```