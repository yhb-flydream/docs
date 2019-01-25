# noConflict

jQuery 使用 `$` 符号作为 `jQuery` 的简写

如果其他 JavaScript 框架也使用 `$` 符号作为简写，那么jQuery 的 `noConflict()` 方法会释放会 `$` 标识符的控制，这样其他脚本就可以使用它了

- `$` 被释放之后，仍然可以通过全名替代简写的方式来使用 `jQuery`

```js
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery 仍在运行！");
  });
});
```

- 也可以创建自己的简写。`noConflict()` 可返回对 `jQuery` 的引用，可以把它存入变量，以供稍后使用

```js
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery 仍在运行！");
  });
});
```

- 你的 `jQuery` 代码块使用 `$` 简写，并且您不愿意改变这个快捷方式，那么您可以把 `$` 符号作为变量传递给 `ready` 方法。这样就可以在函数内使用 `$` 符号，而在函数外，依旧不得不使用 `"jQuery"`

```js
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery 仍在运行！");
  });
});
```