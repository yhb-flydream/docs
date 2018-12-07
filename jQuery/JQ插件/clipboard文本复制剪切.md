# clipboard.js

> 将文本复制到剪贴板

## 安装

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
```

## 实例化

```js
new ClipboardJS('.btn');
```

**`.btn` 替换为点击元素，可以为**

- DOM selector

```html
<button class="btn" data-clipboard-text="1">Copy</button>

var clipboard = new ClipboardJS('.btn');
```

- DOM selector

```html
<button id="btn" data-clipboard-text="1">Copy</button>

var btn = document.getElementById('btn');
var clipboard = new ClipboardJS(btn);
```

- HTML elements list

```html
<button data-clipboard-text="1">Copy</button>
<button data-clipboard-text="2">Copy</button>
<button data-clipboard-text="3">Copy</button>

var btns = document.querySelectorAll('button');
    var clipboard = new ClipboardJS(btns);
```

## 使用

### 从另一个元素复制文本

- 通过`data-clipboard-target`在触发器元素中添加属性来实现

<iframe height='265' scrolling='no' title='文本复制粘贴（从另一个元素复制文本）' src='//codepen.io/yhb-flydream/embed/bmgYgy/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/bmgYgy/'>文本复制粘贴（从另一个元素复制文本）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 从另一个元素剪切文本

- 可以定义`data-clipboard-action`属性以指定是要`copy`还是`cut`内容。
- 如果省略此属性，则默认使用`copy`
- **`cut`操作仅适用于`<input>`或`<textarea>`元素**

<iframe height='265' scrolling='no' title='文本复制粘贴（从另一个元素剪切文本）' src='//codepen.io/yhb-flydream/embed/Bqpmwe/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/Bqpmwe/'>文本复制粘贴（从另一个元素剪切文本）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 从属性复制文本

- 可以使用`data-clipboard-text`获得触发器元素中包含一个属性的内容

<iframe height='265' scrolling='no' title='文本复制粘贴（从属性复制文本）' src='//codepen.io/yhb-flydream/embed/XxpVdE/?height=265&theme-id=0&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/XxpVdE/'>文本复制粘贴（从属性复制文本）</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>