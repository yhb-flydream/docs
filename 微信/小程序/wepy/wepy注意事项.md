# wepy 注意事项

## wepy 在 `1.7.0` 版本开始支持小程序的分包加载（[wepy更新日志](https://tencent.github.io/wepy/document.html#/changelog?id=_170-2018-02-06)）

- 如果小于此版本，则可用`npm install wepy --save`升级版本
- 但是 [`wepy github`](https://github.com/Tencent/wepy) 提出了一个 [`Issues(关于小程序新增加的分包加载功能)`](https://github.com/Tencent/wepy/issues/707) 的问题，提出默认不支持**分包加载**

- 其中提出的解决方案是安装 `alpha` 包类来实现分包功能（测试有效）

```bash
npm install wepy-cli@1.7.2-alpha7 -g
或
npm install wepy-cli@1.7.2-alpha4 -g
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

```
├ common 公共目录
├ mixins
└ pages 页面目录
    ├ index
    └ subPages
        └ demo
```

## 代码规范 <b style="color: red;">!</b>

- 变量与方法尽量使用**驼峰式命名**，并且注意避免使用`$`开头。 以`$`开头的标识符为WePY框架的内建属性和方法，可在`JavaScript`脚本中以`this.`的方式直接使用
- **小程序入口、页面、组件文件名的后缀为`.wpy`**；外链的文件可以是其它后缀
- **使用ES6语法开发**。 框架在ES6(ECMAScript 6)下开发，因此也需要使用ES6开发小程序，ES6中有大量的语法糖可以让我们的代码更加简洁高效。
- **使用Promise**。框架默认对小程序提供的API全都进行了 Promise 处理，甚至可以直接使用`async/await`等新特性进行开发。
- **事件绑定语法使用优化语法代替**
  - 原 `bindtap="click"` 替换为 `@tap="click"`，原`catchtap="click"`替换为`@tap.stop="click"`
  - 原 `capture-bind:tap="click"` 替换为 `@tap.capture="click"`，原`capture-catch:tap="click"`替换为`@tap.capture.stop="click"`。
- **事件传参使用优化后语法代替**。 原`bindtap="click" data-index={{index}}`替换为`@tap="click({{index}})"`
- **自定义组件命名应避开微信原生组件名称以及功能标签`<repeat>`**。 不可以使用`input、button、view、repeat`等微信小程序原生组件名称命名自定义组件；另外也不要使用WePY框架定义的辅助标签`repeat`命名。

## 实例

通过前文的介绍可知，在 `WePY` 中，小程序被分为三个实例：

- 小程序实例`App`
- 页面实例`Page`
- 组件实例`Component`
- 其中Page实例继承自Component。各自的声明方式如下：

```javascript
import wepy from 'wepy';

// 声明一个App小程序实例
export default class MyAPP extends wepy.app {
}

// 声明一个Page页面实例
export default class IndexPage extends wepy.page {
}

// 声明一个Component组件实例
export default class MyComponent extends wepy.component {
}
```

## 在`Page`页面实例中，可以通过`this.$parent`来访问App实例。

## `WePY`中的`methods`属性只能声明页面wxml标签的`bind、catch`事件，不能声明自定义方法，这与Vue中的用法是不一致的

示例：

```javascript
// 错误示例

import wepy from 'wepy';

export default class MyComponent extends wepy.component {
    methods = {
        bindtap () {
            let rst = this.commonFunc();
            // doSomething
        },

        bindinput () {
            let rst = this.commonFunc();
            // doSomething
        },

        //错误：普通自定义方法不能放在methods对象中
        customFunction () {
            return 'sth.';
        }
    };

}

// 正确示例

import wepy from 'wepy';

export default class MyComponent extends wepy.component {
    methods = {
        bindtap () {
            let rst = this.commonFunc();
            // doSomething
        },

        bindinput () {
            let rst = this.commonFunc();
            // doSomething
        },
    }

    //正确：普通自定义方法在methods对象外声明，与methods平级
    customFunction () {
        return 'sth.';
    }
}
```

## WePY中的组件都是静态组件，是`以组件ID作为唯一标识的`，`每一个ID都对应一个组件实例`，当页面引入两个相同ID的组件时，这两个组件共用同一个实例与数据，当其中一个组件数据变化时，另外一个也会一起变化。

**如果需要避免这个问题，则需要分配多个组件ID和实例**。代码如下：

```html
<template>
    <view class="child1">
        <child></child>
    </view>

    <view class="child2">
        <anotherchild></anotherchild>
    </view>
</template>


<script>
    import wepy from 'wepy';
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            //为两个相同组件的不同实例分配不同的组件ID，从而避免数据同步变化的问题
            child: Child,
            anotherchild: Child
        };
    }
</script>
```

## WePY中，在父组件`template`模板部分插入驼峰式命名的子组件标签时，不能将驼峰式命名转换成短横杆式命名(`比如将childCom转换成child-com`)，这与Vue中的习惯是不一致

## 组件的循环渲染 <b style="color: red;">!</b>

当需要循环渲染WePY组件时(类似于通过`wx:for`循环渲染原生的`wxml`标签)，必须使用WePY定义的辅助标签`<repeat>`，代码如下：

```html
/**
project
└── src
    ├── components
    |   └── child.wpy
    ├── pages
    |   ├── index.wpy    index 页面配置、结构、样式、逻辑
    |   └── log.wpy      log 页面配置、结构、样式、逻辑
    └──app.wpy           小程序配置项（全局样式配置、声明钩子等）
**/

// index.wpy

<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>

<script>
    import wepy from 'wepy';
    // 引入child组件文件
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            // 声明页面中要使用到的Child组件的ID为child
            child: Child
        }

        data = {
            list: [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}]
        }
    }
</script>
```