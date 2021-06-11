# mpvue 基本介绍

[TOC]

## 简介

- 使用 `Vue.js` 开发小程序的前端框架
- `mpvue` 修改了 `Vue.js` 的 `runtime` 和 `compiler` 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 `Vue.js`
- 彻底的组件化开发能力：提高代码复用性
- 完整的 Vue.js 开发体验
- 方便的 Vuex 数据管理方案：方便构建复杂应用
- 快捷的 webpack 构建机制：自定义构建策略、开发阶段 hotReload
- 支持使用 npm 外部依赖
- 使用 Vue.js 命令行工具 vue-cli 快速初始化项目
- H5 代码转换编译成小程序目标代码的能力
- **`vue-cli@2.9.x`**
- 支持分包机制

## 五分钟教程

通过 `Vue.js` 命令行工具 `vue-cli`，你只需在终端窗口输入几条简单命令，即可快速创建和启动一个带**热重载**、**保存时静态检查**、**内置代码构建功能**的小程序项目：

```bash
# 全局安装 vue-cli 安装为2.9.x版本
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

运行 `npm run dev` 会多一个 `dist` 文件，对应生成的微信小程序代码在 `wx` 文件夹下，用微信小程序开发者工具可以打开 `wx` 文件夹查看效果

## Vue 实例

### 实例生命周期

同 vue，不同的是我们会在**小程序 `onReady` 后**，再去**触发 `vue mounted` 生命周期**

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `activated`
- `deactivated`
- `beforeDestroy`
- `destroyed`

除了 Vue 本身的生命周期外，mpvue 还兼容了小程序生命周期，这部分生命周期钩子的来源于微信小程序的 Page，**除特殊情况外，不建议使用小程序的生命周期钩子**。

- app 部分：
  - onLaunch，初始化
  - onShow，当小程序启动，或从后台进入前台显示
  - onHide，当小程序从前台进入后台
- page 部分：
  - onLoad，监听页面加载
  - onShow，监听页面显示
  - onReady，监听页面初次渲染完成
  - onHide，监听页面隐藏
  - onUnload，监听页面卸载
  - onPullDownRefresh，监听用户下拉动作
  - onReachBottom，页面上拉触底事件的处理函数
  - onShareAppMessage，用户点击右上角分享
  - onPageScroll，页面滚动
  - onTabItemTap, 当前是 tab 页时，点击 tab 时触发 （mpvue 0.0.16 支持）

用法示例：

```js
new Vue({
  data: {
    a: 1,
  },
  created() {
    // this 指向 vm 实例
    console.log('a is' + this.a)
  },
  onShow() {
    console.log('a is' + this.a, '小程序触发的 onShow')
  },
})
```

- 注意：
  - 不要在**选项属性**或**回调**上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。
  - 因为箭头函数是和父级上下文绑定在一起的，`this` 不会是如你做预期的 Vue 实例，且 `this.a` 或 `this.myMethod` 也会是未定义的。
  - 微信小程序的页面的 `query` 参数是通过 `onLoad` 获取的，mpvue 对此进行了优化，直接通过 `this.$root.$mp.query` 获取相应的参数数据，其调用需要在 `onLoad` 生命周期触发之后使用，比如 `onShow` 等

## 模板语法

几乎全支持 官方文档：模板语法，下面几种不支持的情况

### 不支持 `纯-HTML`

小程序里所有的 `BOM／DOM` 都不能用，也就是说 `v-html` 指令不能用。

### 不支持部分复杂的 JavaScript 渲染表达式

我们会把 template 中的 `{{}}` 双花括号的部分，直接编码到 wxml 文件中，由于微信小程序的能力限制(数据绑定)，所以无法支持复杂的 JavaScript 表达式

目前可以使用的有 `+ - * % ?: ! == === > < [] .`，剩下的还待完善。

```js
<!-- 这种就不支持，建议写 computed -->
<p>{{ message.split('').reverse().join('') }}</p>

<!-- 但写在 @event 里面的表达式是都支持的，因为这部分的计算放在了 vdom 里面 -->
<ul>
  <li v-for="item in list">
    <div @click="clickHandle(item, index, $event)">{{ item.value }}</div>
  </li>
</ul>
```

### 不支持过滤器

渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持

## 支持计算属性

## 不支持函数

## Class 与 Style 绑定

支持语法和转换效果如下：

-class 支持的语法:

```html
<p :class="{ active: isActive }">111</p>
<p class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">222</p>
<p class="static" :class="[activeClass, errorClass]">333</p>
<p class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">444</p>
<p class="static" v-bind:class="[{ active: isActive }, errorClass]">555</p>
```

将分别被转换成:

```html
<view class="_p {{[isActive ? 'active' : '']}}">111</view>
<view class="_p static {{[isActive ? 'active' : '', hasError ? 'text-danger' : '']}}">222</view>
<view class="_p static {{[activeClass, errorClass]}}">333</view>
<view class="_p static {{[isActive ? activeClass : '', errorClass]}}">444</view>
<view class="_p static {{[[isActive ? 'active' : ''], errorClass]}}">555</view>
```

- style 支持的语法:

```html
<p v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">666</p>
<p v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">777</p>
```

将分别被转换成:

```html
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">666</view>
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">777</view>
```

**不支持 官方文档：Class 与 Style 绑定 中的 `classObject` 和 `styleObject` 语法**

此外还可以用 `computed` 方法生成 class 或者 style 字符串，插入到页面中，举例说明：

```html
<template>
  <!-- 支持 -->
  <div class="container" :class="computedClassStr"></div>
  <div class="container" :class="{active: isActive}"></div>

  <!-- 不支持 -->
  <div class="container" :class="computedClassObject"></div>
</template>

<style>
  export default {
    data() {
      return {
        isActive: true
      }
    },
    computed: {
      computedClassStr() {
        return this.isActive? 'active' : ''
      },
      computedClassObject() {
        return { active: this.isActive }
      }
    }
  }
</style>
```

**暂不支持在组件上使用 `Class` 与 `Style` 绑定**

## 支持条件渲染

## 支持列表渲染

**注意一点，嵌套列表渲染，必须指定不同的索引！**

```html
<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
<template>
  <ul v-for="(card, index) in list">
    <li v-for="(item, itemIndex) in card">{{item.value}}</li>
  </ul>
</template>
```

## 几乎全部支持事件处理器

- 引入了 Vue.js 的虚拟 DOM ，在前文模版中绑定的事件会被挂在到 vnode 上
- 同时我们的 compiler 在 wxml 上绑定了小程序的事件，并做了相应的映射，所以你在真实点击的时候通过 runtime 中 handleProxy 通过事件类型分发到 vnode 的事件上，同 Vue 在 WEB 的机制一样，所以可以做到无损支持
- 同时还顺便支持了自定义事件和 `$emit` 机制。

```js
// 事件映射表，左侧为 WEB 事件，右侧为 小程序 对应事件
{
  click: 'tap',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchcancel: 'touchcancel',
  touchend: 'touchend',
  tap: 'tap',
  longtap: 'longtap',
  input: 'input',
  change: 'change',
  submit: 'submit',
  blur: 'blur',
  focus: 'focus',
  reset: 'reset',
  confirm: 'confirm',
  columnchange: 'columnchange',
  linechange: 'linechange',
  error: 'error',
  scrolltoupper: 'scrolltoupper',
  scrolltolower: 'scrolltolower',
  scroll: 'scroll'
}
```

**在 `input` 和 `textarea` 中 `change` 事件会被转为 `blur` 事件**

- **踩坑注意：**
  - 列表中没有的原生事件也可以使用例如 `bindregionchange` 事件直接在 dom 上将`bind改为@` `@regionchange`,同时这个事件也非常特殊，它的 event type 有 begin 和 end 两个，导致我们无法在 handleProxy 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既 `<map @regionchange="functionName" @end="functionName" @begin="functionName"><map>`
  - 小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发
  - 事件修饰符
    - `.stop` 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
    - `.prevent` 可以直接干掉，因为小程序里没有什么默认事件，比如 submit 并不会跳转页面
    - `.capture` 支持 1.0.9
    - `.self` 没有可以判断的标识
    - `.once` 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意，暂不考虑
  - 其他 **键值修饰符** 等在小程序中没键盘，所以不支持

## 几乎全支持表单控件绑定

- [select 组件用 picker 组件进行代替](https://github.com/Meituan-Dianping/mpvue/issues/58)
- [表单元素 radio 用 radio-group 组件进行代替](https://github.com/Meituan-Dianping/mpvue/issues/66)

## 组件

### Vue 组件

**有且只能使用单文件组件（`.vue` 组件）的形式进行支持**

- 详细的不支持列表：
  - 暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：`<card class="class-name"> </card>` 样式是不会生效的)，因为编译到 wxml，小程序不会生成节点，建议写在内部顶级元素上。
  - Slot（scoped 暂时还没做支持）
  - 动态组件
  - 异步组件
  - inline-template
  - X-Templates
  - keep-alive
  - transition
  - class
  - style

### 小程序组件

mpvue 可以支持小程序的原生组件，比如： `picker,map` 等，需要注意的是原生组件上的事件绑定，需要以 vue 的事件绑定语法来绑定，如 `bindchange="eventName"` 事件，需要写成 `@change="eventName"`

```html
<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
  <view class="picker"> 当前选择: {{date}} </view>
</picker>
```

## TypeScript 支持

## 最佳实践

### 精简 data 数据

冗余数据不要挂在 data 里，所有在 `data/props/computed` 中的数据，每次变更都会从微信小程序的 JSCore 进程，通过 setData 序列化成字符串后发送到 JSRender 进程。所以，如果你的数据量巨大的时候，会导致页面非常卡顿

### 优化长列表性能

一般情况下这种页面会有大量的数据，除了遵从上面的建议外还有额外的建议

- 避免在 v-for 中嵌套子组件，这样可以优化大部分部分 setData 时的冗余数据。
- 通过实践发现 wx:if 和 hidden 的优化肉眼不可见，所以或许可以试试直接通过样式 display 来展示和隐藏。
- 如果列表过长，强烈建议产品思考更好的展示形态。比如只展示热门，多余的折叠等形式。

### 合理使用双向绑定 mpvue 建议使用 v-model.lazy 绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题

### 谨慎选择直接使用小程序的 API 如果你有小程序和 H5 复用代码的需要，业务代码需要保持对 WEB Vue.js 的兼容性。此时我们不建议在代码中直接调用小程序 API，更好的选择是通过桥接适配层屏蔽两端差异
