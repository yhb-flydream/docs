# animation 属性 animation-fill-mode 为 forwards 或 both 时导致 z-index 失效问题

## 问题描述

`animation` 属性 `animation-fill-mode` 为 `both` 或 `forwards` 时导致 `z-index` 失效问题

代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>animation属性animation-fill-mode为forwards或both时导致z-index失效问题</title>
    <style lang="">
      * {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      .box {
        height: 100%;
        width: 100%;
        position: absolute;
        animation: opacity 0.1s both ease;
        /* animation: opacity .1s forwards ease; */
      }

      @keyframes opacity {
        0% {
          opacity: 0;
          transform: scale(1.2);
        }

        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .dialog {
        width: 100%;
        height: 100px;
        background-color: red;
        position: fixed;
        top: 0;
        z-index: 3;
      }

      .modal {
        width: 100%;
        height: 100px;
        background-color: yellow;
        position: fixed;
        top: 20px;
        opacity: 0.8;
        z-index: 2;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <div class="dialog"></div>
    </div>
  </body>
  <div class="modal"></div>
</html>
```

效果

<iframe height="265" style="width: 100%;" scrolling="no" title="animation属性animation-fill-mode为forwards或both时导致z-index失效问题" src="https://codepen.io/yhb-flydream/embed/BaoQBjd?height=265&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/yhb-flydream/pen/BaoQBjd'>animation属性animation-fill-mode为forwards或both时导致z-index失效问题</a> by Elan Bin
  (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 解决方案

修改 `box` 的 css 样式为

```css
.box {
  height: 100%;
  width: 100%;
  position: absolute;
  animation: opacity 0.1s none ease;
  /* animation: opacity .1s ease; */
}
```

## 经历过程

在做 [vue](https://cn.vuejs.org/) [element-UI](https://element.eleme.cn/#/zh-CN) 的项目中，使用了一个登陆动画，登录页逐渐隐藏而后跳转内容页面逐渐显示。

查看控制台，页面基本结构如下：

```html
<body>
  <div id="app">
    <div class="main-wrap">...</div>
  </div>
</body>
```

渐显 `animation` 动画写在 `main-wrap` 上，以下代码已可以完成需求

```css
.main-wrap {
  height: 100%;
  width: 100%;
  position: absolute;
  animation: scale 0.5s both ease;
}
@keyframes scale {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

但是在某一个页面内使用了一个 `el-dialog` 弹窗，弹窗显示时，查看浏览器控制台其页面结构如下：

```html
<body>
  <div id="app">
    <div class="main-wrap">
      ...
      <div id="content" class="content-wrap">
        ...
        <!-- dialog 弹窗部分 -->
        <div class="el-dialog__wrapper"></div>
      </div>
    </div>
  </div>
</body>
<!-- 弹窗遮罩层部分 -->
<div class="v-modal"></div>
```

正常情况下 `element-UI` 会自动设置 `el-dialog__wrapper` 和 `v-modal` 都为 `position: fixed;`，且 `el-dialog__wrapper` 比 `v-modal` 的 `z-index` 层级多**1**。此时，弹窗（上例中的红色背景部分）会覆盖在遮罩层（上例中的黄色背景部分）之上。

但是，此时出现的情况却是遮罩层覆盖了弹窗（如上例出现的情况）
