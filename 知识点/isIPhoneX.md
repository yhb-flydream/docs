# isIPhoneX

```js
function isIPhoneX() {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
            //是iphoneX
            $('.menu i').css({
                'top':.15+'rem'
            });
            $('.menu a').css({
                'padding-top':1.25+'rem'
            })
        } else {
            //不是iphoneX
        }
    }
}
```