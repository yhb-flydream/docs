# RegExp

[TOC]

[廖雪峰RegExp](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)

[正则表达式全集](http://tool.oschina.net/uploads/apidocs/jquery/regexp.html)

## 创建正则对象

- 构造函数定义
  - **`var reg = new RegExp(pattern, attributes);`**
  - **`pattern`是一个`字符串`**，指定了`正则表达式的模式`或`其他正则表达式`
  - **如果 pattern 是正则表达式，而不是字符串，则必须省略该参数**
  - `attributes`是一个可选的字符串，包含属性
    - `"g"`指定`全局匹配`
    - `"i"`指定`区分大小写的匹配`
    - `"m"`指定`多行匹配`
- 字面量定义
  - `var reg = /(\w+)\s(\w+)/;`
- 构造函数定义与字面量定义比较
  - **由于构造函数定义的参数是字符串，所以在某些情况下要对字符串进行双重转义**
  - **另外所有的元字符都必须进行双重转义，那些已经转义过的字符串也是如此**
  - 以下左边为**字面量模式**，右边为等价的**构造函数定义时使用的字符串参数**

|字面量模式|等价的字符串|
|:---:|:---:|
|`/\w/`|`"\\w"`|
|`/\[java\]script/`|`"\\[java\\]script"`|
|`/\.com/`|`"\\.com"`|
|`/China\/Eng/`|`"China\\/Eng"`|
|`/\d\.\d{1,2}/`|`"\\d\\.\\d{1,2}"`|
|`/\w\\hello`|`"\\w\\\\hello"`|

- **ECMAScript3和ECMAScript5中的区别**
  - 在ECMAScript3中，**正则表达式字面量会始终共享同一个RegExp实例**，而使用**构造函数创建的每一个新RegExp都是一个新的实例**
  - 在ECMAScript5中，**正则表达式字面量和构造函数一样，每次都会创建新的RegExp实例**

```js
var reg = null,i;

for (i = 0; i < 10; i++){
  reg = /java/g;
  reg.test("javascript");
}

for (i = 0; i < 10; i++){
  reg = new RegExp("java","g");
  reg.test("javascript");
}
```

- 第一个循环中第一次调用test()找到了”java”,但**第二次调用从索引为3(上一次匹配的末尾)的字符开始**,所以第二次就匹配不到，由于匹配会一直找到字符串末尾，所以下一次再调用test()又会重头开始
- 第二个循环使用构造函数在每次循环中创建正则表达式，因为每次迭代都会创建一个新的RegExp实例，所以每次调用test()都会返回true
- ECMAScript5往后上面两个循环结果都一样

### 正则表达式的属性和方法

#### 正则属性

|属性名|说明|
|:---|:---|
|`input`或`$_`|返回最近一次要匹配的字符串|
|`lastMatch`或`$&`|返回最近一次的匹配项|
|`lastParen`或`$+`|返回最近一次匹配的捕获组|
|`leftContext`或$`|input字符串中lastMatch之前的文本|
|`rightContext`或`$’`|input字符串中lastMatch之后的文本|
|`Multiline`或`$*`|返回布尔值，表示是否所有表达式都使用多行|模式

```js
var text = "this has been a short summer";
var pattern = /(.)hort/g;

if (pattern.test(text)){
  alert(RegExp.input);               //this has been a short summer
  alert(RegExp.leftContext);         //this has been a
  alert(RegExp.rightContext);        // summer
  alert(RegExp.lastMatch);           //short
  alert(RegExp.lastParen);           //s
  alert(RegExp.multiline);           //false
}
```

- **`某些属性在某些浏览器可能未实现`**
- 除了上面的几个属性外，还有9个用于存储捕获组的属性。访问语法是`RegExp.$1,RegExp.$2…RegExp.$9`，在调用`test()和exec()`方法时，这些属性会被自动填充

```js
var text = "this has been a short summer";
var pattern = /(..)or(.)/g;

if (pattern.test(text)){
  alert(RegExp["$1"]);       //sh
  alert(RegExp["$2"]);       //t
  alert(RegExp["$`"]);       //this has been a
  alert(RegExp["$'"]);       // summer
}
```

#### 正则方法

##### `exec(str)`

- `exec()`方法接受一个参数，即要应用模式的字符串，返回包含第一个匹配信息的数组，没有匹配信息的情况下返回null
- 返回的是Array的实例，另外还包含两个额外的属性，index和input
  - index标识匹配项在字符串的位置
  - input表示应用正则表达式的字符串

```js
var text = "mom and dad and baby";
var reg = /mom( and dad( and baby)?)?/gi;

var matches = reg.exec(text);
alert(matches.index);    //0
alert(matches.input);    //"mom and dad and baby"
alert(matches[0]);       //"mom and dad and baby"
alert(matches[1]);       //" and dad and baby"
alert(matches[2]);       //" and baby"
```

**对于exec()方法而言，在模式中设置了g，它每次也只返回一个匹配项，但每次调用exec()都会在字符串中继续查找新的匹配项，如不设置g，每次调用exec()都只返回第一个匹配的信息**

```js
var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern1.lastIndex);//0

matches = pattern1.exec(text);
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern1.lastIndex);//0

var pattern2 = /.at/g;

var matches = pattern2.exec(text);
alert(matches.index);     //0
alert(matches[0]);        //"cat"
alert(pattern2.lastIndex);//3

matches = pattern2.exec(text);
alert(matches.index);     //5
alert(matches[0]);        //"bat"
alert(pattern2.lastIndex);//8
```

##### `test(str)`

- 接受一个字符串参数，在模式与该参数匹配的情况下返回true，否则返回false

##### `replace(RegExp/str, str_replace)`

- 接受两个参数
  - 第一个为字符串或RegExp对象
  - 第二个参数为字符串或一个回调函数。
  - 第一个参数若为字符串，第二个参数江替换第一个参数匹配到的值，然后将替换后的原文本作为返回值返回，其中第二个参数和中可包含RegExp的特殊字符序列，例如`$1~$9`,表示从原文本中捕获到的对象，使用$1~$9属性时，第一个参数必须是RegExp对象,且需用`()`来捕获

**下面是一些ECMAScript提供的特殊字符串序列：**

|字符序列|替换文本|
|:---|:---|
|`$$`|`$`|
|`$&`|匹配整个模式的子字符串，与RegExp.lastMatch值相同|
|`$’`|匹配的子字符串之前的字符串，与RegExp.leftContext的值相同|
|**$`**|匹配的子字符串之后的字符串，与RegExp.rightContext的值相同|
|`$n`|匹配第n个捕获组的子字符串，n等于0-9，如果正则中没有定义捕获组，则为空字符串|
|`$nn`|匹配第nn个捕获组的子字符串，n等于01-99，如果正则中没有定义捕获组，则为空字符串|

- 注意调用函数`str.replace()`,并不改变str的值,而是返回一个副本

```js
var text = "first_second";
var text_replaced = text.replace(/first/,"1");
alert(text);    //first_second
alert(text_replaced);    //1_second

text_replaced = text.replace(/(first)/,"1$1");
alert(text_replaced);     //1first_second

text_replaced = text.replace(/(first)/,"1$`");
alert(text_replaced);     //1_second
```

- 若第二个参数是一个函数,那么这个函数的有三个参数，分别代表匹配到的字符串，匹配的字符串在位置，和原字符串，后两个参数是可选。常见用法如下：

```js
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}

alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```

### 方括号`[]`

- **方括号用于查找某个范围内的字符：**

|表达式|描述|
|---|---|
|`[abc]`|查找方括号之间的任何字符。|
|`[^abc]`|查找任何不在方括号之间的字符。|
|`[0-9]`|查找任何从 0 至 9 的数字。|
|`[a-z]`|查找任何从小写 a 到小写 z 的字符。|
|`[A-Z]`|查找任何从大写 A 到大写 Z 的字符。|
|`[A-z]`|查找任何从大写 A 到小写 z 的字符。|
|`[adgk]`|查找给定集合内的任何字符。|
|`[^adgk]`|查找给定集合外的任何字符。|
|`(red\|blue\|green)`|查找任何指定的选项。|

### 元字符

- **是拥有特殊含义的字符：**

|元字符|描述|
| --- | --- |
|`.`|查找单个字符，除了换行和行结束符。|
|`\w`|查找单词字符。|
|`\W`|查找非单词字符。|
|`\d`|查找数字。|
|`\D`|查找非数字字符。|
|`\s`|查找空白字符。|
|`\S`|查找非空白字符。|
|`\b`|匹配单词边界。|
|`\B`|匹配非单词边界。|
|`\0`|查找 NUL 字符。|
|`\n`|查找换行符。|
|`\f`|查找换页符。|
|`\r`|查找回车符。|
|`\t`|查找制表符。|
|`\v`|查找垂直制表符。|
|`\xxx`|查找以八进制数 xxx 规定的字符。|
|`\xdd`|查找以十六进制数 dd 规定的字符。|
|`\uxxxx`|查找以十六进制数 xxxx 规定的 Unicode 字符。|

### 量词

|量词|描述|
|---|---|
|`n+`|匹配任何包含**至少一个 n** 的字符串。|
|`n*`|匹配任何包含**零个或多个 n** 的字符串。|
|`n?`|匹配任何包含**零个或一个 n** 的字符串。|
|`n{X}`|匹配包含 **X 个 n** 的序列的字符串。|
|`n{X,Y}`|匹配包含 **X 至 Y 个 n** 的序列的字符串。|
|`n{X,}`|匹配包含**至少 X 个 n** 的序列的字符串。|
|`n$`|匹配任何**结尾为 n** 的字符串。|
|`^n`|匹配任何**开头为 n** 的字符串。|
|`?=n`|匹配任何**其后紧接指定字符串 n** 的字符串。|
|`?!n`|匹配任何**其后没有紧接指定字符串 n** 的字符串。|

### 运算符优先级

|运算符|描述|
|---|---|
|`\`|转义符|
|(), (?:), (?=), []|圆括号和方括号|
|*, +, ?, {n}, {n,}, {n,m}|限定符|
|^, $, \任何元字符、任何字符|定位点和序列（即：位置和顺序）|
|`\|`|替换，"或"操作字符具有高于替换运算符的优先级，使得`"m\|food"`匹配`"m"或"food"`。若要匹配`"mood"或"food"`，请使用括号创建子表达式，从而产生`"(m\|f)ood"`。|

### RegExp 对象属性

|属性|描述|
|---|---|
|global  RegExp|对象是否具有标志 g|
|ignoreCase  RegExp|对象是否具有标志 i|
|lastIndex|一个整数，标示开始下一次匹配的字符位置|
|multiline  RegExp|对象是否具有标志 m|
|source|正则表达式的源文本|

### RegExp 对象方法

|方法|描述|
|---|---|
|compile|编译正则表达式|
|exec|检索字符串中指定的值。返回找到的值，并确定其位置|
|test|检索字符串中指定的值。返回 true 或 false|

### 支持正则表达式的 String 对象的方法

|方法|描述|
|---|---|
|search|检索与正则表达式相匹配的值|
|match|找到一个或多个正则表达式的匹配|
|replace|替换与正则表达式匹配的子串|
|split|把字符串分割为字符串数组|

#### 正则表达式中的replace的用法

```javascript
var sStr = '讨论一下正则表达式中的replace的正则表达式用法';
sStr.replace(/(正则).+?(式)/g, function () {
    console.log(arguments);
});

// ["正则表达式", "正则", "式", 19, "讨论一下正则表达式中的replace的正则表达式用法"]
// ["正则表达式", "正则", "式", 19, "讨论一下正则表达式中的replace的正则表达式用法"]
```

### 理解应用举例

- `\d`一个元字符
  - 匹配一个字符
  - `'00\d'`可以匹配`'007'`，但无法匹配`'00A'`
  - `'\d\d\d'`可以匹配`'010'`
  - `'\w\w'`可以匹配`'js'`
- `\s+`一个元字符加一个量词
  - 匹配多个元字符
  - `\s+`表示至少有一个空格，例如匹配`' '`，`'\t\t'`等
  - `\d{3,8}`表示3-8个数字，例如`'1234567'`
- `[0-9a-zA-Z\_]`中括号包括元字符或表示范围的字符串
  - 可以匹配一个数字、字母或者下划线
- `[0-9a-zA-Z\_]+`中括号包括元字符或表示范围的字符串加量词
  - 匹配至少由一个数字、字母或者下划线组成的字符串
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`
  - 可以匹配由字母或下划线、`$`开头，后接任意个由一个数字、字母或者下划线、`$`组成的字符串，也就是JavaScript允许的变量名
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`
  - 更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）
