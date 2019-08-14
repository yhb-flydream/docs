# wepy-template

wepy 快速开发模板（为了快速开发小程序）

- [wepy 官网](https://tencent.github.io/wepy/document.html)
- [wepy github](https://github.com/Tencent/wepy)

## 写在前面

此模板为在 `wepy` 提供的基础模板之上修改的，结构为我做过的项目的结构的拷贝，可根据自己习惯修改。

各文件作用如下（不太完整，可根据需要进行修改）


## 目录

```text
├ src
|  ├ common 公共文件
|  |   ├ baidu 百度统计
|  |   ├ filter 过滤器工具类
|  |   ├ lib css(weui.less), font, images 静态资源
|  |   ├ template
|  |   ├ utils 工具类（api）
|  |   |   ├ API.js 项目接口集合（方便接口的查找修改）
|  |   |   ├ HTTP.js 微信 request 请求封装
|  |   |   ├ logger.js 日志（暂未使用）
|  |   |   ├ mock.js mock 数据
|  |   |   ├ util.js 小工具集合
|  |   |   └ WX-API.js 微信 api 集合（把微信 api 集中到一起，方便统一管理）
|  |   └ config.js 开发环境配置
|  ├ components 组件文件
|  ├ mixins 混合类文件
|  ├ pages 页面文件
|  |   ├ subPages 分包文件
|  |   |   ├ demo 模板页面
|  |   |   └ verification 验证登录
|  |   |       ├ faceRecognition 人脸验证
|  |   |       ├ IdCardLogin 身份证验证
|  |   |       └ wxAuthorize 微信授权登录页
|  |   └ tabBar 主文件
|  |       └ home 首页
|  ├ store
|  ├ style 各页面less样式文件，结构同 pages
|  ├ app.wpy 全局设置文件
|  └ index.template.html
├ wepy.config.js 配置文件
└ 其他配置文件
```

## 使用

### 修改 appid

把 `project.config.json` 中的 `appid` 字段修改为你自己的小程序 `appid`

### 切换至项目目录

```bash
cd wepy-template
```

### 安装 wepy-cli

```bash
npm install wepy-cli -g
```

### 安装依赖

```bash
npm install
```

### 开发环境运行，实时编译

```bash
npm run dev
```

- 修改完自动编译，在微信开发者工具可以实时预览

### 生产环境打包

```bash
npm run build
```
