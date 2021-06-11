# 网页跳转打开 APP，如果没有则下载

```js
window.onload = function () {
  var nid = <?php print $nid; ?>;
  ///判断访问终端
  var ua = navigator.userAgent.toLowerCase();
  if (/micromessenger/i.test(navigator.userAgent)) {
    alert('请在浏览器中打开');
  } else if (ua.match(/\sQQ/i) !== null) {
    alert('请在浏览器中打开');
  } else if (/i(os|phone|pad)/i.test(navigator.userAgent)) {

    location.href = ''; // 打开 APP
    setTimeout(function () {
      location.href = ''; // App Store 下载链接
    }, 2000);

  } else {
    var ifr = document.createElement('iframe');
    ifr.src = ''; // Android 打开 app的协议，有app同事提供
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    var openTime = +new Date();
    window.setTimeout(function () {
      document.body.removeChild(ifr);
      if ((+new Date()) - openTime > 2500) {
        window.location.href = 'http://app.qq.com/#id=detail&appid='; // 应用宝打开app下载地址，有app同事提供
      }
    }, 2000)
  }
}
```
