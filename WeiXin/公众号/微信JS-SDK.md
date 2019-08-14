# 微信JS-SDK

- [微信JS-SDK说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
- [DEMO页面](http://demo.open.weixin.qq.com/jssdk)
- ![二维码](../../images/WX/weixin-js-sdk.png)

## 使用步骤

### 一：绑定域名

先登录微信公众平台进入“**设置--->公众号设置--->功能设置--->JS接口安全域名**”里填写“**JS接口安全域名**”。

备注：登录后可在“**开发者中心**”查看对应的接口权限。

### 二：引入JS文件

在需要调用JS接口的页面引入如下JS文件，（支持https）：`http://res.wx.qq.com/open/js/jweixin-1.4.0.js`

如需进一步提升服务稳定性，当上述资源不可访问时，可改访问：`http://res2.wx.qq.com/open/js/jweixin-1.4.0.js` （支持https）。

*备注：支持使用 `AMD/CMD` 标准模块加载方法加载*

### 三：通过config接口注入权限验证配置

所有需要使用`JS-SDK`的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。

```js
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

### 四：通过ready接口处理成功验证

```js
wx.ready(function(){
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
```

### 五：通过error接口处理失败验证

```js
wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```

#### 接口调用说明

所有接口通过`wx`对象(也可使用`jWeixin`对象)来调用，**参数是一个对象**，除了每个接口本身需要传的参数之外，还有以下**通用参数**：

- `success`：接口调用成功时执行的回调函数
- `fail`：接口调用失败时执行的回调函数
- `complete`：接口调用完成时执行的回调函数，无论成功或失败都会执行
- `cancel`：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到
- `trigger`: 监听`Menu`中的按钮点击时触发的方法，该方法仅支持`Menu`中的相关接口

**备注：不要尝试在`trigger`中使用`ajax`异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用`ajax`的回包会还没有返回**

以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性`errMsg`，其值格式如下：

- 调用成功时："xxx:ok" ，其中xxx为调用的接口名
- 用户取消时："xxx:cancel"，其中xxx为调用的接口名
- 调用失败时：其值为具体错误信息

### 基础接口（判断当前客户端版本是否支持指定JS接口）

```js
wx.checkJsApi({
  jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  success: function(res) {
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  }
});
```

## JS-SDK使用权限签名算法

### jsapi_ticket

生成签名之前必须先了解一下`jsapi_ticket`

> `jsapi_ticket`是公众号用于调用微信JS接口的临时票据。
> 正常情况下，`jsapi_ticket`的有效期为**7200**秒，通过`access_token`来获取。
> 由于获取`jsapi_ticket`的api调用次数非常有限，频繁刷新`jsapi_ticket`会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存`jsapi_ticket`

- 获取[`access_token`](./获取access_token.md)
- 用第一步拿到的`access_token` 采用http **GET**方式请求获得`jsapi_ticket`（有效期7200秒，开发者必须在自己的服务全局缓存`jsapi_ticket`）
  - `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi`

成功返回如下JSON：

```json
{
  "errcode": 0,
  "errmsg": "ok",
  "ticket": "bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
  "expires_in": 7200
}
```

**获得`jsapi_ticket`之后，就可以生成JS-SDK权限验证的签名了**

### 签名算法

签名生成规则如下：

- 参与签名的字段包括
  - `noncestr（随机字符串）`,
  - `有效的jsapi_ticket`,
  - `timestamp（时间戳）`,
  - `url（当前网页的URL，不包含#及其后面部分）`
- 对所有待签名参数按照字段名的ASCII 码**从小到大排序**（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
- 这里需要注意的是**所有参数名均为小写字符**
- 对string1作sha1加密，字段名和字段值都采用原始值，不进行 URL 转义
- 即`signature=sha1(string1)`

示例：

```html
noncestr=Wm3WZYTPz0wzccnW
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
timestamp=1414587457
url=http://mp.weixin.qq.com?params=value
```

- 1、对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1：

```html
jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value
```

- 2、对string1进行sha1签名，得到signature：

```html
0f9de62fce790f9a083d5c99e95740ceb90c27ed
```

**注意事项：**

- 签名用的`noncestr`和`timestamp`必须与`wx.config`中的`nonceStr`和`timestamp`相同
- 签名用的`url`必须是调用JS接口页面的完整`URL`
- 出于安全考虑，开发者必须在服务器端实现签名的逻辑

## 页面js代码demo

```js
/*
  * 注意：
  * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
  * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
  * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
  *
  * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
  * 邮箱地址：weixin-open@qq.com
  * 邮件主题：【微信JS-SDK反馈】具体问题
  * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
  */
wx.config({
    debug: false,
    appId: 'appId',
    timestamp: 1553826643,
    nonceStr: 'nonceStr',
    signature: 'signature',
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
});

wx.ready(function () {
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
  document.querySelector('#checkJsApi').onclick = function () {
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareAppMessage').onclick = function () {
    wx.onMenuShareAppMessage({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        alert('用户点击发送给朋友');
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“发送给朋友”状态事件');
  };

  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareTimeline').onclick = function () {
    wx.onMenuShareTimeline({
      title: '互联网之子',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        alert('用户点击分享到朋友圈');
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到朋友圈”状态事件');
  };

  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareQQ').onclick = function () {
    wx.onMenuShareQQ({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
      trigger: function (res) {
        alert('用户点击分享到QQ');
      },
      complete: function (res) {
        alert(JSON.stringify(res));
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到 QQ”状态事件');
  };
  
  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
  document.querySelector('#onMenuShareWeibo').onclick = function () {
    wx.onMenuShareWeibo({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
      trigger: function (res) {
        alert('用户点击分享到微博');
      },
      complete: function (res) {
        alert(JSON.stringify(res));
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到微博”状态事件');
  };

  // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
  document.querySelector('#onMenuShareQZone').onclick = function () {
    wx.onMenuShareQZone({
      title: '互联网之子',
      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
      link: 'http://movie.douban.com/subject/25785114/',
      imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
      trigger: function (res) {
        alert('用户点击分享到QZone');
      },
      complete: function (res) {
        alert(JSON.stringify(res));
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
    alert('已注册获取“分享到QZone”状态事件');
  };


  // 3 智能接口
  var voice = {
    localId: '',
    serverId: ''
  };
  // 3.1 识别音频并返回识别结果
  document.querySelector('#translateVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.translateVoice({
      localId: voice.localId,
      complete: function (res) {
        if (res.hasOwnProperty('translateResult')) {
          alert('识别结果：' + res.translateResult);
        } else {
          alert('无法识别');
        }
      }
    });
  };

  // 4 音频接口
  // 4.2 开始录音
  document.querySelector('#startRecord').onclick = function () {
    wx.startRecord({
      cancel: function () {
        alert('用户拒绝授权录音');
      }
    });
  };

  // 4.3 停止录音
  document.querySelector('#stopRecord').onclick = function () {
    wx.stopRecord({
      success: function (res) {
        voice.localId = res.localId;
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 4.4 监听录音自动停止
  wx.onVoiceRecordEnd({
    complete: function (res) {
      voice.localId = res.localId;
      alert('录音时间已超过一分钟');
    }
  });

  // 4.5 播放音频
  document.querySelector('#playVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.playVoice({
      localId: voice.localId
    });
  };

  // 4.6 暂停播放音频
  document.querySelector('#pauseVoice').onclick = function () {
    wx.pauseVoice({
      localId: voice.localId
    });
  };

  // 4.7 停止播放音频
  document.querySelector('#stopVoice').onclick = function () {
    wx.stopVoice({
      localId: voice.localId
    });
  };

  // 4.8 监听录音播放停止
  wx.onVoicePlayEnd({
    complete: function (res) {
      alert('录音（' + res.localId + '）播放结束');
    }
  });

  // 4.8 上传语音
  document.querySelector('#uploadVoice').onclick = function () {
    if (voice.localId == '') {
      alert('请先使用 startRecord 接口录制一段声音');
      return;
    }
    wx.uploadVoice({
      localId: voice.localId,
      success: function (res) {
        alert('上传语音成功，serverId 为' + res.serverId);
        voice.serverId = res.serverId;
      }
    });
  };

  // 4.9 下载语音
  document.querySelector('#downloadVoice').onclick = function () {
    if (voice.serverId == '') {
      alert('请先使用 uploadVoice 上传声音');
      return;
    }
    wx.downloadVoice({
      serverId: voice.serverId,
      success: function (res) {
        alert('下载语音成功，localId 为' + res.localId);
        voice.localId = res.localId;
      }
    });
  };

  // 5 图片接口
  // 5.1 拍照、本地选图
  var images = {
    localId: [],
    serverId: []
  };
  document.querySelector('#chooseImage').onclick = function () {
    wx.chooseImage({
      success: function (res) {
        images.localId = res.localIds;
        alert('已选择 ' + res.localIds.length + ' 张图片');
      }
    });
  };

  // 5.2 图片预览
  document.querySelector('#previewImage').onclick = function () {
    wx.previewImage({
      current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
      urls: [
        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
      ]
    });
  };

  // 5.3 上传图片
  document.querySelector('#uploadImage').onclick = function () {
    if (images.localId.length == 0) {
      alert('请先使用 chooseImage 接口选择图片');
      return;
    }
    var i = 0, length = images.localId.length;
    images.serverId = [];
    function upload() {
      wx.uploadImage({
        localId: images.localId[i],
        isShowProgressTips: 1,
        success: function (res) {
          i++;
          //alert('已上传：' + i + '/' + length);
          images.serverId.push(res.serverId);
          if (i < length) {
            upload();
          }
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
    }
    upload();
  };

  // 5.4 下载图片
  document.querySelector('#downloadImage').onclick = function () {
    if (images.serverId.length === 0) {
      alert('请先使用 uploadImage 上传图片');
      return;
    }
    var i = 0, length = images.serverId.length;
    images.localId = [];
    function download() {
      wx.downloadImage({
        serverId: images.serverId[i],
        success: function (res) {
          i++;
          alert('已下载：' + i + '/' + length);
          images.localId.push(res.localId);
          if (i < length) {
            download();
          }
        }
      });
    }
    download();
  };

  // 6 设备信息接口
  // 6.1 获取当前网络状态
  document.querySelector('#getNetworkType').onclick = function () {
    wx.getNetworkType({
      success: function (res) {
        alert(res.networkType);
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 7 地理位置接口
  // 7.1 查看地理位置
  document.querySelector('#openLocation').onclick = function () {
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'TIT 创意园',
      address: '广州市海珠区新港中路 397 号',
      scale: 14,
      infoUrl: 'http://weixin.qq.com'
    });
  };

  // 7.2 获取当前地理位置
  document.querySelector('#getLocation').onclick = function () {
    wx.getLocation({
      success: function (res) {
        alert(JSON.stringify(res));
      },
      cancel: function (res) {
        alert('用户拒绝授权获取地理位置');
      }
    });
  };

  // 8 界面操作接口
  // 8.1 隐藏右上角菜单
  document.querySelector('#hideOptionMenu').onclick = function () {
    wx.hideOptionMenu();
  };

  // 8.2 显示右上角菜单
  document.querySelector('#showOptionMenu').onclick = function () {
    wx.showOptionMenu();
  };

  // 8.3 批量隐藏菜单项
  document.querySelector('#hideMenuItems').onclick = function () {
    wx.hideMenuItems({
      menuList: [
        'menuItem:readMode', // 阅读模式
        'menuItem:share:timeline', // 分享到朋友圈
        'menuItem:copyUrl' // 复制链接
      ],
      success: function (res) {
        alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 8.4 批量显示菜单项
  document.querySelector('#showMenuItems').onclick = function () {
    wx.showMenuItems({
      menuList: [
        'menuItem:readMode', // 阅读模式
        'menuItem:share:timeline', // 分享到朋友圈
        'menuItem:copyUrl' // 复制链接
      ],
      success: function (res) {
        alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 8.5 隐藏所有非基本菜单项
  document.querySelector('#hideAllNonBaseMenuItem').onclick = function () {
    wx.hideAllNonBaseMenuItem({
      success: function () {
        alert('已隐藏所有非基本菜单项');
      }
    });
  };

  // 8.6 显示所有被隐藏的非基本菜单项
  document.querySelector('#showAllNonBaseMenuItem').onclick = function () {
    wx.showAllNonBaseMenuItem({
      success: function () {
        alert('已显示所有非基本菜单项');
      }
    });
  };

  // 8.7 关闭当前窗口
  document.querySelector('#closeWindow').onclick = function () {
    wx.closeWindow();
  };

  // 9 微信原生接口
  // 9.1.1 扫描二维码并返回结果
  document.querySelector('#scanQRCode0').onclick = function () {
    wx.scanQRCode();
  };
  // 9.1.2 扫描二维码并返回结果
  document.querySelector('#scanQRCode1').onclick = function () {
    wx.scanQRCode({
      needResult: 1,
      desc: 'scanQRCode desc',
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };

  // 10 微信支付接口
  // 10.1 发起一个支付请求
  document.querySelector('#chooseWXPay').onclick = function () {
    // 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
    wx.chooseWXPay({
      timestamp: 1414723227,
      nonceStr: 'noncestr',
      package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
      signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
      paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
    });
  };

  // 11.3  跳转微信商品页
  document.querySelector('#openProductSpecificView').onclick = function () {
    wx.openProductSpecificView({
      productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw',
      extInfo: '123'
    });
  };

  // 12 微信卡券接口
  // 12.1 添加卡券
  document.querySelector('#addCard').onclick = function () {
    wx.addCard({
      cardList: [
        {
          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
        },
        {
          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
        }
      ],
      success: function (res) {
        alert('已添加卡券：' + JSON.stringify(res.cardList));
      },
      cancel: function (res) {
        alert(JSON.stringify(res))
      }
    });
  };

  var codes = [];
  // 12.2 选择卡券
  document.querySelector('#chooseCard').onclick = function () {
    wx.chooseCard({
      cardSign: '1fdb2640c60e41f8823e9f762e70c531d161ae76',
      timestamp: 1437997723,
      nonceStr: 'k0hGdSXKZEj3Min5',
      success: function (res) {
        res.cardList = JSON.parse(res.cardList);
        encrypt_code = res.cardList[0]['encrypt_code'];
        alert('已选择卡券：' + JSON.stringify(res.cardList));
        decryptCode(encrypt_code, function (code) {
          codes.push(code);
        });
      },
      cancel: function (res) {
        alert(JSON.stringify(res))
      }
    });
  };

  // 12.3 查看卡券
  document.querySelector('#openCard').onclick = function () {
    if (codes.length < 1) {
      alert('请先使用 chooseCard 接口选择卡券。');
      return false;
    }
    var cardList = [];
    for (var i = 0; i < codes.length; i++) {
      cardList.push({
        cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
        code: codes[i]
      });
    }
    wx.openCard({
      cardList: cardList,
      cancel: function (res) {
        alert(JSON.stringify(res))
      }
    });
  };

  var shareData = {
    title: '微信JS-SDK Demo',
    desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
    link: 'http://demo.open.weixin.qq.com/jssdk/',
    imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
  };
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);

  function decryptCode(code, callback) {
    $.getJSON('/jssdk/decrypt_code.php?code=' + encodeURI(code), function (res) {
      if (res.errcode == 0) {
        codes.push(res.code);
      }
    });
  }
});

wx.error(function (res) {
  alert(res.errMsg);
});
```