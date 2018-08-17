# input

## 默认情况下：

- iOS 端
  - `border-radius` 为 **5px**
  - 有内边框阴影
  - 点击有遮罩阴影
  - 有 **5.5px** 左右侧内边距
  - `font-size` 为 **11px**
  - 边框 border `1px solid #000;`
- Android 端
  - `border-radius` 为 **0px**
  - 有无内边框阴影
  - 点击有遮罩阴影
  - 无左右侧内边距
  - `font-size` 为 **13.2px 左右**
  - 边框为 **3D inset 边框**

## 样式初始化

初始化后样式还是有些不太一致

- iOS placeholder 默认是居中的，但 Android 的不是，尝试调整了其行高，但没起作用
- iOS 和 Android 的 input 框的宽度显示不太一致，但宽度一般都会再次设置，这里就没限定宽度

```css
input {
    display: block;
    height: auto; /* 根据需求设置 */
    /*width: ;*/ /* 根据需求设置 */
    line-height: 1.42857143; /* 根据 bootstrap 输入框设定 */
    font-weight: 400;
    font-size: 14px; /* 根据需求设置 */
    padding: 1px; /* 去除不同的内边距，可根据需求设置 */
    background-color: transparent; /* 统一背景色为其父元素也颜色，防止出现色差 */
    border: 1px solid #000; /* 统一边框样式，可根据需求设置 */
    -webkit-border-radius: 4px; /* 去除圆角不一致，可根据需求设置是否需要圆角 */
    -moz-border-radius: 4px; /* 去除圆角不一致，可根据需求设置是否需要圆角 */
    border-radius: 4px; /* 去除圆角不一致，可根据需求设置是否需要圆角 */
    outline: none; /* 去除当为激活状态时的边框 */
    -webkit-appearance: none; /* 去除iOS 内阴影，添加以后 Android端会出现3D内阴影，但去除了输入框为焦点状态是的背景音影 */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 去除iOS端 点击时弹出的一下遮罩阴影*/
}

input::-webkit-input-placeholder {
    color: #333;
    font-size: 14px;
    /*line-height: 20px;*/
}
input:-moz-placeholder {
    color: #333;
    font-size: 14px;
    /*line-height: 20px;*/
}
input::-moz-placeholder {
    color: #333;
    font-size: 14px;
    /*line-height: 20px;*/
}
input:-ms-input-placeholder {
    color: #333;
    font-size: 14px;
    /*line-height: 20px;*/
}
```

[在 codepen 查看](https://codepen.io/yhb-flydream/pen/XBoqZd)