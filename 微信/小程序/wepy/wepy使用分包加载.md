# wepy使用分包加载

wepy 在 `1.7.0` 版本开始支持小程序的分包加载（[wepy跟新日志](https://tencent.github.io/wepy/document.html#/changelog?id=_170-2018-02-06)）

所以 [`wepy`](https://tencent.github.io/wepy/document.html) 版本应为 `1.7.0` 以上

如果小于此版本，则可用`npm install wepy --save`升级版本

但是 [`wepy github`](https://github.com/Tencent/wepy) 提出了一个 [`Issues(关于小程序新增加的分包加载功能)`](https://github.com/Tencent/wepy/issues/707) 的问题，提出默认不支持**分包加载**

其中提出的解决方案是安装 `alpha` 包类来实现分包功能（测试有效）

```bash
npm install wepy-cli@1.7.2-alpha7 -g
```

然后 `app.wpy` 文件中配置里面就可以使用分包加载写法

```javascript
export default class extends wepy.app {
  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    subPackages: [
      {
        'root': 'pages/subPages',
        'pages': [
          'demo/demo'
        ]
      }
    ]
  };
}
```

目录结构

```text
├ common 公共目录
├ mixins
└ pages 页面目录
    ├ index
    └ subPages
        └ demo
```