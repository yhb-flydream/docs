# css hack 整理

## 媒体查询 hack

### /* 只支持IE6、7 */

`@media screen\9 {...}`

### /* 只支持IE8 */

`@media \0screen {...}`

### /* 只支持IE6、7、8 */

`@media \0screen\,screen\9 {...}`

### /* 只支持IE8、9、10 */

`@media screen\0 {...}`

### /* 只支持IE9、10 */

`@media screen and (min-width:0\0) {...}`

### /* 只支持IE10 */

`@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {...}`

### /* 支持IE9、Chrome、Safari、Firefox、 Opera */

`@media all and (min-width:0){...}`

### /* 只支持wekit内核浏览器Chrome、Safari */

`@media screen and (-webkit-min-device-pixel-ratio: 0) {...}`

### /* 只支持Opera */

`@media all and (-webkit-min-device-pixel-ratio: 10000), not all and (-webkit-min-device-pixel-ratio: 0) {...}`

### /* 只支持Firefox */

`@-moz-document url-prefix() {...}`

```html
<p class="class">@hack@hack@hack@hack@hack@hack</p>

<style type="text/css">

@media all and (min-width:0){ /* 在IE9文本颜色为红色*/

 .class{color:#F00;}

}

@media screen and (-webkit-min-device-pixel-ratio: 0) { /* 在Chrome、Safari中文本颜色为绿色 */

 .class{color:#0F0;}

}

@media all and (-webkit-min-device-pixel-ratio: 10000), not all and (-webkit-min-device-pixel-ratio: 0) { /* 在Opera中文本颜色为蓝色 */

 .class{color:#00F;}

}

@-moz-document url-prefix() { /* 在Firefox中文本颜色为品红色 */

 .class{color:#F0F;}

}
</style>
```

## 选择器hack

### /* 只支持IE7 */

`html* 选择器{}`

### /* 仅支持IE7  使用该选择器需要HTML顶部有声明：<!DOCTYPE HTML ......>*/

`*+html  选择器{}`

### /* 只支持IE6 */

`*html  选择器{}`

```html
<p class="class">选择器hack选择器hack选择器hack选择器hack选择器hack选择器hack</p>

html* .class{color:#F00;} /* 在IE7中文本颜色为红色 */

*+html .class{color:#0F0;} /* 在IE7中文本颜色为绿色 */

*html .class{color:#00F;} /* 在IE6中文本颜色为蓝色 */
```

## 属性hack

### /* 只支持IE6、7、8、9、10 */

`选择器{属性：属性值\9;}`

### /* 只支持IE8、9、10 */

`选择器{属性：属性值\0;}`

### /* 支持IE8的部分属性值、完全支持IE9、10 */

`选择器{属性：属性值\9\0;}`

### /* 仅支持IE7和IE6 */

`选择器{*属性：属性值;}`

### /* 只支持IE6 */

`选择器{_属性：属性值;}`

### /* 只不支持IE6 */

`选择器{属性：属性值!important;}`

### /* 仅支持Safari和Chrome ，且只能放在选择器的最后一个属性，因为当浏览器解析[;;]后，不会再读取后面属性 */

`选择器{[;属性:属性值;]}`

```html
<p class="class">属性hack属性hack属性hack属性hack属性hack属性hack</p>

<style type="text/css">

.class{

color:#F00\0;/* 在IE8和IE9中文本颜色为红色 */

*color:#0F0; /* 在IE7中文本颜色为绿色 */

_color:#00F; /* IE6中颜色为蓝色 */

[;color:#F0F;]/* 在Safari和Chrome中颜色为品红色 */

}
</style>
```