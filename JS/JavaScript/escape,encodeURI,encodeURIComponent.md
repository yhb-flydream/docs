# escape,encodeURI,encodeURIComponent

参考
[escape()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape)
[encodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
[encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
[escape,encodeURI,encodeURIComponent 有什么区别?](https://www.zhihu.com/question/21861899)

## escape

生成新的由十六进制转义序列替换的字符串。

`escape` 函数是全局对象的属性. 特色字符如: `@*_+-./` 被排除在外.

字符的 16 进制格式值,当该值小于等于 `0xFF` 时,用一个 2 位转移序列: `%xx` 表示. 大于的话则使用 4 位序列: `%uxxxx` 表示.

```js
escape('abc123') // "abc123"
escape('äöü') // "%E4%F6%FC"
escape('ć') // "%u0107"

// special characters
escape('@*_+-./') // "@*_+-./"
```

## encodeURI

通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

`encodeURI(URI)` 接受一个完整的 URI，返回 **一个新字符串, 表示提供的字符串编码为统一资源标识符 (URI)。**

假定一个 URI 是完整的 URI，那么无需对那些保留的并且在 URI 中有特殊意思的字符进行编码。encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的 UTF-8 转义序列：
|类型|包含|
|---|---|
|保留字符|`;` `,` `/` `?` `:` `@` `&` `=` `+` `$`|
|非转义的字符|字母 数字 `-` `_` `.` `!` `~` `*` `'` `(` `)`|
|数字符号|`#`|

## encodeURIComponent

对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义序列来表示字符串中的每个字符的 UTF-8 编码（只有由两个 Unicode 代理区字符组成的字符才用四个转义字符编码）。

`encodeURIComponent(URI)` 接受 String. URI 的组成部分，返回 **原字符串作为 URI 组成部分被编码后形成的字符串。**

encodeURIComponent 转义除了以下字符外的所有字符：

| 类型         | 包含                                          |
| ------------ | --------------------------------------------- |
| 非转义的字符 | 字母 数字 `-` `_` `.` `!` `~` `*` `'` `(` `)` |

`encodeURIComponent` 和 `encodeURI` 有以下几个不同点：

```js
var set1 = ';,/?:@&=+$' // 保留字符
var set2 = "-_.!~*'()" // 不转义字符
var set3 = '#' // 数字标志
var set4 = 'ABC abc 123' // 字母数字字符和空格

console.log(encodeURI(set1)) // ;,/?:@&=+$
console.log(encodeURI(set2)) // -_.!~*'()
console.log(encodeURI(set3)) // #
console.log(encodeURI(set4)) // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)) // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)) // -_.!~*'()
console.log(encodeURIComponent(set3)) // %23
console.log(encodeURIComponent(set4)) // ABC%20abc%20123 (the space gets encoded as %20)
```

## 适合什么场合使用

| 方法                 | 场景                                       |
| -------------------- | ------------------------------------------ |
| `escape`             | 编码普通字符串                             |
| `encodeURI`          | 编码整个 URL，然后需要使用这个 URL         |
| `encodeURIComponent` | 编码整个 URL，然后作为**URL 中的参数**使用 |
