# echarts-for-weixin

- [echarts-for-weixin github](https://github.com/ecomfe/echarts-for-weixin)
- by [百度前端团队](https://github.com/ecomfe)
- ECharts 的微信小程序版本
- 可以通过熟悉的 [ECharts](http://echarts.baidu.com/option.html) 配置方式，快速开发图表

## 目录

```md
├ ec-canvas (组件)
|   ├ ec-canvas.js
|   ├ ec-canvas.json
|   ├ ec-canvas.wxml
|   ├ ec-canvas.wxss
|   ├ wx-canvas.js
|   └ echarts.js (可以自行从 ECharts 项目中[下载最新发布版](https://github.com/ecomfe/echarts/releases)，或者从[官网自定义构建](http://echarts.baidu.com/builder.html))
├ img
├ pages
|   ├ bar
|   ├ pie
|   ├ line
|   └ ... 使用实例
├ app.js
├ app.json
├ app.wxss
└ project.config.json
```

下载到本地可用微信开发者工具打开预览查看

## 使用

`ec-canvas` 为 `echarts-for-weixin` 的组件，可以直接拿来用
`ec-canvas` 中的 `echarts.js` 可以自行从 ECharts 项目中[下载最新发布版](https://github.com/ecomfe/echarts/releases)，或者从[官网自定义构建](http://echarts.baidu.com/builder.html)

- 下面改造使用的目录如下

```md
├ components
|   ├ ec-canvas (组件)
|   └ echarts-bar
├ pages
|   ├ index
|   |   ├ index.js
|   |   ├ index.json
|   |   ├ index.wxml
|   |   └ index.wxss
|   ├ demo
|   |   ├ index.js
|   |   ├ index.json
|   |   ├ index.wxml
|   |   └ index.wxss
|   └ ... 你的页面
├ app.js
├ app.json
├ app.wxss
└ project.config.json
```

### `ec-canvas` 直接拿过来作为一个组件

把 `ec-canvas` 当做一个组件，然后再按照 `echarts-for-weixin` 目录的 `pages` 里面页面（例如：`bar`）的写法在页面中使用

示例：改造使用（以 `pages` 里面的 `bar` 为例，在 `demo` 页面中使用）

- 1、修改 `demo` 页面的 `index.js` 头部的引入方式路径，为 `import * as echarts from '../../components/ec-canvas/echarts'`，把 `bar` 页面的js部分整合到 `index.js` 里面
- 2、修改 `demo` 页面的 `index.json` 的 `usingComponents` 字段，为 `"usingComponents": { "echarts-bar":  "../../components/ec-canvas/ec-canvas" }`，此时一个基本组件就可以在页面中使用了
- 3、在 `demo` 文件夹下的 `index.wxml` 中使用 `<echarts-bar></echarts-bar>`

### `ec-canvas` 作为一个组件的组件

把 `ec-canvas` 当做一个组件，然后再按照 `echarts-for-weixin` 目录的 `pages` 里面页面（例如：`bar`）的写法写一个组件在页面中使用

示例：改造使用（以 `pages` 里面的 `bar` 为例，改造成组件 `echarts-bar`）

- 1、把`pages`里面对应的`bar`的文件（`index.js`、`index.json`、`index.wxml`、`index.wxss`）全部拿到`echarts-bar`里
- 2、修改 `index.js` 头部的引入方式路径，为 `import * as echarts from '../ec-canvas/echarts'`
- 3、修改 `index.json` 的 `usingComponents` 字段，为 `"usingComponents": { "ec-canvas":  "../ec-canvas/ec-canvas" }`，此时一个基本组件就可以在页面中使用了
- 4、在 `pages ---> index` 页面中使用。修改 `index` 文件夹下的 `index.json` 的 `usingComponents` 字段，为 `"usingComponents": { "echarts-bar": "/components/echarts-bar/index" }`
- 5、在 `index` 文件夹下的 `index.wxml` 中使用 `<echarts-bar></echarts-bar>`

**注意：因为图表显示需要设置宽高，没设置 `wxss` 可能导致图表不能正常显示，只显示空白，可以去修改 `echarts-bar` 的 `index.wxss` 和 `index` 的 `index.wxss` 或 `demo` 的 `index.wxss`（这里设置 `echarts-bar` 的样式）**

### 两种方式的区别

- 1、直接作为一个组件来用的话，使用比较方便，但是数据配置都写在了一个页面中，使页面比较庞大
- 2、作为一个组件的组件来用可以使页面简洁一些，但是数据需要通过组件父子传值方式传递