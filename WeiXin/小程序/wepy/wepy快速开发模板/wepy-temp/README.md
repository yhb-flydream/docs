# wepy

wepy 快速开发模板（为了快速开发小程序）

- [wepy 官网](https://tencent.github.io/wepy/document.html)
- [wepy github](https://github.com/Tencent/wepy)

## 写在前面

此模板为在 `wepy` 提供的基础模板之上修改的，结构为我做过的项目的结构的拷贝，可根据自己习惯修改。

各文件作用如下（不太完整，可根据需要进行修改）

## 目录

```text
├ src
|  ├ api 页面接口
|  |   ├ home home页面的api
|  |   └ ... 其他页面的api
|  ├ assets 静态文件
|  |   ├ css
|  |   ├ font
|  |   ├ images images下可以再分不同页面放置图片
|  |   └ js
|  ├ components 组件文件
|  |   ├ button_list less样式可以写出来也可以写在wpy文件中
|  |   └ ... 其他页面组件
|  ├ config 开发环境配置文件
|  ├ lib 工具集文件（暂定名字）
|  |   ├ http.js 微信 request 请求封装
|  |   ├ util.js 小工具集合
|  |   └ wx-api.js 微信 api 集合（把微信 api 集中到一起，方便统一管理，书写规范有更好的的方案可以修改）
|  ├ mixins 混合类文件（以前用的不熟练，所以没用过，会用的可以用）
|  ├ pages 页面文件
|  |   ├ subPages 分包文件
|  |   |   ├ demo 模板页面（页面和less样式分开了，在style文件里面对应的文件里，有三种方案【1、直接写在wpy页面里；2、放在此页面里命名demo.less或者index.less；3、放在style文件里面对应的文件里】）
|  |   |   └ ... 其他页面
|  |   └ tabBar 主文件
|  |       ├ home 首页
|  |       └ ... 其他页面
|  ├ store wepy-redux（以前用的不熟练，所以没用过，会用的可以用）
|  ├ style 各页面less样式文件，结构同 pages
|  ├ wxs wxs文件
|  ├ app.wpy 全局设置文件
|  └ index.template.html
├ project.config.json 项目配置文件
├ wepy.config.js wepy配置文件
├ .eslintrc.js eslint配置文件（为了使代码书写规范，但是可能会影响开发效率，如果想要去掉eslint检测，可以把wepy.config.js文件下的eslint设置为false）
└ 其他配置文件
```

## 使用

### 修改 appid

把 `project.config.json` 中的 `appid` 字段修改为你自己的小程序 `appid`

### 全局安装 wepy-cli

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
