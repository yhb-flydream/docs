# wepy

> 微信小程序组件化开发框架

## 快速使用

### 项目创建与使用

#### 安装

> 适用于 wepy 1.7.0之后的版本

```bash
npm install wepy-cli -g
wepy init standard my-project
```

#### 拉取模板

- 使用官方默认模板创建一个新项目

```bash
wepy init standard my-project
```

- 直接从github模板创建一个新项目

```bash
wepy init wepyjs/wepy-weui-demo my-project
```

## 代码规范 <b style="color: red;">!</b>

- 变量与方法尽量使用**驼峰式命名**，并且注意避免使用`$`开头。 以`$`开头的标识符为WePY框架的内建属性和方法，可在`JavaScript`脚本中以`this.`的方式直接使用
- 小程序入口、页面、组件文件名的后缀为`.wpy`；外链的文件可以是其它后缀
- **使用ES6语法开发**。 框架在ES6(ECMAScript 6)下开发，因此也需要使用ES6开发小程序，ES6中有大量的语法糖可以让我们的代码更加简洁高效。
- **使用Promise**。框架默认对小程序提供的API全都进行了 Promise 处理，甚至可以直接使用`async/await`等新特性进行开发。
- 事件绑定语法使用优化语法代替
  - 原 `bindtap="click"` 替换为 `@tap="click"`，原`catchtap="click"`替换为`@tap.stop="click"`
  - 原 `capture-bind:tap="click"` 替换为 `@tap.capture="click"`，原`capture-catch:tap="click"`替换为`@tap.capture.stop="click"`。
- **事件传参使用优化后语法代替**。 原`bindtap="click" data-index={{index}}`替换为`@tap="click({{index}})"`
- **自定义组件命名应避开微信原生组件名称以及功能标签`<repeat>`**。 不可以使用`input、button、view、repeat`等微信小程序原生组件名称命名自定义组件；另外也不要使用WePY框架定义的辅助标签`repeat`命名。

## `wepy.config.js`配置文件说明

默认使用自动生成的文件配置

## `.wpy`文件说明 <b style="color: red;">!</b>

一个`.wpy`文件可分为三大部分，各自对应于一个标签：

- 脚本部分，即`<script></script>`标签中的内容，又可分为两个部分：
  - 逻辑部分，除了`config`对象之外的部分，对应于原生的.js文件；
  - 配置部分，即config对象，对应于原生的`.json`文件。
- 结构部分，即`<template></template>`模板部分，对应于原生的`.wxml`文件。
- 样式部分，即`<style></style>`样式部分，对应于原生的`.wxss`文件

其中，小程序入口文件`app.wpy`不需要`template`，所以编译时会被忽略。`.wpy`文件中的`script`、`template`、`style`这三个标签都支持`lang`和`src`属性，`lang`决定了其代码编译过程，`src`决定是否外联代码，存在`src`属性且有效时，会忽略内联代码

Eg:

```html
<style lang="less" src="page1.less"></style>
<template lang="wxml" src="page1.wxml"></template>
<script>
  // some code
</script>
```

各标签对应的`lang`值如下表所示
| 标签     | lang默认值 | lang支持值                       |
| :------: | :--------: | :------------------------------: |
| style    | css        | css、less、scss、stylus、postcss |
| template | wxml       | wxml、xml、pug（原jade）         |
| script   | babel      | babel、TypeScript                |

## 脚本部分介绍

### 小程序入口 `app.wpy`

```html
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
        "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    onLaunch() {
        console.log(this);
    }
}
</script>

<style lang="less">
/** less **/
</style>
```

入口文件`app.wpy`中所声明的小程序实例继承自`wepy.app`类，包含一个`config`属性和其它全局属性、方法、事件。其中`config`属性对应原生的`app.json`文件，`build`编译时会根据`config`属性自动生成`app.json`文件，如果需要修改`config`中的内容，请使用微信提供的相关API。

### 页面 `page.wpy`

```html
<style lang="less">
  .page {

  }
  .page__hd {

  }
  .page__bd {

  }
  .page__ft {

  }
</style>
<template>
  <view class="page">
    <view class="page__hd"></view>
    <view class="page__bd"></view>
    <view class="page__ft"></view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  // import wxApi from '../../../common/utils/wxApi'

  export default class Demo extends wepy.page {
    // 页面配置项列表
    config = {
      navigationBarTitleText: 'demo',
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: 'white'
    };

    // 页面使用组件列表
    components = {
    };

    // 页面的初始数据
    data = {
    };

    // 页面事件集合
    methods = {
    };

    // 生命周期回调—监听页面加载
    onLoad = function (options) {
      console.log(options)
    };

    // 生命周期回调—监听页面显示
    onShow = function () {
    };

    // 生命周期回调—监听页面初次渲染完成
    onReady = function () {
    };

    // 生命周期回调—监听页面隐藏
    onHide = function () {
    };

    // 生命周期回调—监听页面卸载
    onUnload = function () {
    };

    // 监听用户下拉动作
    onPullDownRefresh = function () {
    };

    // 页面上拉触底事件的处理函数
    onReachBottom = function () {
    };

    // 用户点击右上角转发
    onShareAppMessage = function () {
    };

    // 页面滚动触发事件的处理函数
    onPageScroll = function () {
    };

    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap = function () {
    }
  }
</script>
```

页面文件`page.wpy`中所声明的页面实例继承自`wepy.page`类，该类的主要属性介绍如下:

| 属性       | 说明                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------ |
| config     | 页面配置对象，对应于原生的`page.json`文件，类似于`app.wpy`中的`config`                     |
| components | 页面组件列表对象，声明页面所引入的组件列表                                                 |
| data       | 页面渲染数据对象，存放可用于页面模板绑定的渲染数据                                         |
| methods    | `wxml`事件处理函数对象，存放响应`wxml`中所捕获到的事件的函数，如`bindtap`、`bindchange`    |
| events     | WePY组件事件处理函数对象，存放响应组件之间通过$broadcast、$emit、$invoke所传递的事件的函数 |
| 其它       | 小程序页面生命周期函数，如`onLoad`、`onReady`等，以及其它自定义的方法与属性                |

### 组件`com.wpy`

```html
<style lang="less">
  .page {

  }
  .page__hd {

  }
  .page__bd {

  }
  .page__ft {

  }
</style>
<template>
  <view class="page">
    <view class="page__hd"></view>
    <view class="page__bd"></view>
    <view class="page__ft"></view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  // import wxApi from '../../../common/utils/wxApi'

  export default class Demo extends wepy.page {
    // 页面使用组件列表
    components = {
    };

    // 页面的初始数据
    data = {
    };

    // 页面事件集合
    methods = {
    };

    // 生命周期回调—监听页面加载
    onLoad = function (options) {
      console.log(options)
    };

    // 生命周期回调—监听页面显示
    onShow = function () {
    };

    // 生命周期回调—监听页面初次渲染完成
    onReady = function () {
    };

    // 生命周期回调—监听页面隐藏
    onHide = function () {
    };

    // 生命周期回调—监听页面卸载
    onUnload = function () {
    };

    // 监听用户下拉动作
    onPullDownRefresh = function () {
    };

    // 页面上拉触底事件的处理函数
    onReachBottom = function () {
    };

    // 用户点击右上角转发
    onShareAppMessage = function () {
    };

    // 页面滚动触发事件的处理函数
    onPageScroll = function () {
    };

    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap = function () {
    }
  }
</script>
```

组件文件`com.wpy`中所声明的组件实例继承自`wepy.component`类，除了不需要`config`配置以及页面特有的一些生命周期函数之外，其属性与页面属性大致相同。

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

### App小程序实例

```javascript
import wepy from 'wepy';

export default class MyAPP extends wepy.app {
    customData = {};

    customFunction ()　{ }

    onLaunch () {}

    onShow () {}

    config = {}  // 对应 app.json 文件

    globalData = {}
}
```

**在Page页面实例中，可以通过`this.$parent`来访问App实例。**

### Page页面实例和Component组件实例

由于Page页面实际上继承自Component组件，即Page也是组件。除扩展了页面所特有的config配置以及特有的页面生命周期函数之外，其它属性和方法与Component一致，因此这里以Page页面为例进行介绍。

```javascript
import wepy from 'wepy';

export default class MyPage extends wepy.page {
// export default class MyComponent extends wepy.component {
    customData = {}  // 自定义数据

    customFunction ()　{}  //自定义方法

    onLoad () {}  // 在Page和Component共用的生命周期函数

    onShow () {}  // 只在Page中存在的页面生命周期函数

    config = {};  // 只在Page实例中存在的配置数据，对应于原生的page.json文件

    data = {};  // 页面所需数据均需在这里声明，可用于模板数据绑定

    components = {};  // 声明页面中所引用的组件，或声明组件中所引用的子组件

    mixins = [];  // 声明页面所引用的Mixin实例

    computed = {};  // 声明计算属性（详见后文介绍）

    watch = {};  // 声明数据watcher（详见后文介绍）

    methods = {};  // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明

    events = {};  // 声明组件之间的事件处理函数
}
```

<b style="color: red;">!</b> 注意，对于WePY中的`methods`属性，因为与Vue中的使用习惯不一致，非常容易造成误解，这里需要特别强调一下：

- **WePY中的methods属性只能声明页面wxml标签的bind、catch事件，不能声明自定义方法，这与Vue中的用法是不一致的。** 示例如下：

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

## 组件

原生小程序支持js模块化，但彼此独立，业务代码与交互事件仍需在页面处理。无法实现组件化的松耦合与复用的效果。

### 普通组件引用

当页面需要引入组件或组件需要引入子组件时，必须在`.wpy`文件的`<script>`脚本部分先`import`组件文件，然后在`components`对象中给组件声明唯一的组件ID，接着在`<template>`模板部分中添加以`components`对象中所声明的组件ID进行命名的自定义标签以插入组件。

```html
/**
project
└── src
    ├── components
    |   └── child.wpy
    ├── pages
    |   ├── index.wpy    index 页面配置、结构、样式、逻辑
    |   └── log.wpy      log 页面配置、结构、样式、逻辑
    └──app.wpy           小程序配置项（全局公共配置、公共样式、声明钩子等）
**/

// index.wpy

<template>
    <!-- 以`<script>`脚本部分中所声明的组件ID为名命名自定义标签，从而在`<template>`模板部分中插入组件 -->
    <child></child>
</template>

<script>
    import wepy from 'wepy';
    //引入组件文件
    import Child from '../components/child';

    export default class Index extends wepy.page {
        //声明组件，分配组件id为child
        components = {
            child: Child
        };
    }
</script>
```

<b style="color: red;">!</b> 需要注意的是，WePY中的组件都是静态组件，是以组件ID作为唯一标识的，每一个ID都对应一个组件实例，当页面引入两个相同ID的组件时，这两个组件共用同一个实例与数据，当其中一个组件数据变化时，另外一个也会一起变化。

如果需要避免这个问题，则需要分配多个组件ID和实例。代码如下：

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

<b style="color: red;">!</b> **注意：** WePY中，在父组件template模板部分插入驼峰式命名的子组件标签时，不能将驼峰式命名转换成短横杆式命名(比如将childCom转换成child-com)，这与Vue中的习惯是不一致。

### 组件的循环渲染 <b style="color: red;">!</b>

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

### computed 计算属性

- 类型：`{[key: string]: Function}`
- 详细：`computed`计算属性，**是一个有返回值的函数，可直接被当作绑定数据来使用**。因此类似于data属性，代码中可通过`this.计算属性名`来引用，模板中也可通过`{{ 计算属性名 }}`来绑定数据。

需要注意的是，只要是组件中有任何数据发生了改变，那么所有计算属性就都会被重新计算。

```javascript
data = {
    a: 1
}

// 计算属性aPlus，在脚本中可通过this.aPlus来引用，在模板中可通过{{ aPlus }}来插值
computed = {
    aPlus () {
        return this.a + 1
    }
}
```

### watcher 监听器

- 类型：`{[key: string]: Function}`
- 详细：通过监听器`watcher`能够监听到任何属性的更新。监听器在watch对象中声明，类型为函数，函数名与需要被监听的data对象中的属性同名，每当被监听的属性改变一次，监听器函数就会被自动调用执行一次。

监听器适用于当属性改变时需要进行某些额外处理的情形。 <b style="color: red;">!</b>

```javascript
data = {
    num: 1
}

// 监听器函数名必须跟需要被监听的data对象中的属性num同名，
// 其参数中的newValue为属性改变后的新值，oldValue为改变前的旧值
watch = {
    num (newValue, oldValue) {
        console.log(`num value: ${oldValue} -> ${newValue}`)
    }
}

// 每当被监听的属性num改变一次，对应的同名监听器函数num()就被自动调用执行一次
onLoad () {
    setInterval(() => {
        this.num++;
        this.$apply();
    }, 1000)
}
```

### props 传值

props传值在WePY中属于父子组件之间传值的一种机制，包括**静态传值**与**动态传值**。

在props对象中声明需要传递的值，静态传值与动态传值的声明略有不同，具体可参看下面的示例代码。

#### 静态传值

静态传值为父组件向子组件传递常量数据，因此只能传递String字符串类型。

在父组件template模板部分的组件标签中，使用子组件props对象中所声明的属性名作为其属性名来接收父组件传递的值。

```javascript
<child title="mytitle"></child>

// child.wpy
props = {
  title: {
    type: String, // 值的类型
    default: 'mytitle' // 默认值
  }
};

onLoad () {
  console.log(this.title); // mytitle
}
```

#### 动态传值

动态传值是指父组件向子组件传递动态数据内容，父子组件数据完全独立互不干扰。但可以通过使用`.sync`修饰符来达到父组件数据绑定至子组件的效果，也可以通过设置子组件props的`twoWay: true`来达到子组件数据绑定至父组件的效果。那如果既使用`.sync`修饰符，同时子组件props中添加的`twoWay: true`时，就可以实现数据的双向绑定了。

<b style="color: red;">!</b> **注意：** 下文示例中的`twoWay`为`true`时，表示子组件向父组件单向动态传值，而`twoWay`为`false`(默认值，可不写)时，则表示子组件不向父组件传值。这是与Vue不一致的地方，而这里之所以仍然使用twoWay，只是为了尽可能保持与Vue在标识符命名上的一致性。

在父组件`template`模板部分所插入的子组件标签中，使用`:prop`属性（等价于Vue中的v-bind:prop属性）来进行动态传值。

```javascript
// parent.wpy

<child :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></child>

data = {
    parentTitle: 'p-title'
};


// child.wpy

props = {
    // 静态传值
    title: String,

    // 父向子单向动态传值
    syncTitle: {
        type: String,
        default: 'null'
    },

    twoWayTitle: {
        type: String,
        default: 'nothing',
        twoWay: true
    }
};

onLoad () {
    console.log(this.title); // p-title
    console.log(this.syncTitle); // p-title
    console.log(this.twoWayTitle); // p-title

    this.title = 'c-title';
    console.log(this.$parent.parentTitle); // p-title.
    this.twoWayTitle = 'two-way-title';
    this.$apply();
    console.log(this.$parent.parentTitle); // two-way-title.  --- twoWay为true时，子组件props中的属性值改变时，会同时改变父组件对应的值
    this.$parent.parentTitle = 'p-title-changed';
    this.$parent.$apply();
    console.log(this.title); // 'c-title';
    console.log(this.syncTitle); // 'p-title-changed' --- 有.sync修饰符的props属性值，当在父组件中改变时，会同时改变子组件对应的值。
}
```

### 组件通信交互

`wepy.component`基类提供`$broadcast`、`$emit`、`$invoke`三个方法用于组件之间的通信和交互，如：

```javascript
this.$emit('some-event', 1, 2, 3, 4);
```

用于监听组件之间的通信与交互事件的事件处理函数需要写在组件和页面的`events`对象中，如：

```javascript
import wepy from 'wepy'

export default class Com extends wepy.component {
    components = {};

    data = {};

    methods = {};

    // events对象中所声明的函数为用于监听组件之间的通信与交互事件的事件处理函数
    events = {
        'some-event': (p1, p2, p3, $event) => {
            console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`);
        }
    };
    // Other properties
}
```

#### `$broadcast`

`$broadcast`事件是由父组件发起，所有子组件都会收到此广播事件，除非事件被手动取消。事件广播的顺序为广度优先搜索顺序，如上图，如果页面`Page_Index`发起一个`$broadcast`事件，那么按先后顺序依次接收到该事件的组件为：ComA、ComB、ComC、ComD、ComE、ComF、ComG、ComH。如下图：

![$broadcast 事件传递顺序](https://cloud.githubusercontent.com/assets/2182004/20554688/800089e6-b198-11e6-84c5-352d2d0e2f7e.png)

#### `$emit`

`$emit`与`$broadcast`正好相反，事件发起组件的所有祖先组件会依次接收到`$emit`事件。如果组件ComE发起一个`$emit`事件，那么接收到事件的先后顺序为：组件ComA、页面Page_Index。如下图：

![$emit 事件传递顺序](https://cloud.githubusercontent.com/assets/2182004/20554704/9997932c-b198-11e6-9840-3edae2194f47.png)

#### $invoke

`$invoke`是一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件，然后再调用其方法。

比如，想在页面Page_Index中调用组件ComA的某个方法：

`this.$invoke('ComA', 'someMethod', 'someArgs');`

如果想在组件ComA中调用组件ComG的某个方法：

`this.$invoke('./../ComB/ComG', 'someMethod', 'someArgs');`

### 组件自定义事件处理函数 <b style="color: red;">!</b>

可以通过使用`.user`修饰符为自定义组件绑定事件，如：`@customEvent.user="myFn"`

其中，@表示事件修饰符，customEvent 表示事件名称，.user表示事件后缀。

目前总共有三种事件后缀：

- `.default`: 绑定小程序冒泡型事件，如`bindtap`，`.default`后缀可省略不写；
- `.stop`: 绑定小程序捕获型事件，如`catchtap`；

- `.user`: 绑定用户自定义组件事件，通过`$emit`触发。**注意，如果用了自定义事件，则events中对应的监听函数不会再执行。**

```html
// index.wpy

<template>
    <child @childFn.user="parentFn"></child>
</template>

<script>
    import wepy from 'wepy'
    import Child from '../components/child'

    export default class Index extends wepy.page {
        components = {
            child: Child
        }

        methods = {
            parentFn (num, evt) {
                console.log('parent received emit event, number is: ' + num)
            }
        }
    }
</script>


// child.wpy

<template>
    <view @tap="tap">Click me</view>
</template>

<script>
    import wepy from 'wepy'

    export default class Child extends wepy.component {
        methods = {
            tap () {
                console.log('child is clicked')
                this.$emit('childFn', 100)
            }
        }
    }
</script>
```

### slot 组件内容分发插槽

WePY中的`slot`插槽作为内容分发标签的空间占位标签，便于在父组件中通过对相当于扩展板卡的内容分发标签的“插拔”，更为灵活、方便地对子组件进行内容分发。

具体使用方法是，首先在子组件`template`模板部分中声明`slot`标签作为内容插槽，同时必须在其`name`属性中指定插槽名称，还可设置默认的标签内容；然后在引入了该带有插槽的子组件的父组件`template`模板部分中声明用于“插拔”的内容分发标签。

注意，这些父组件中的内容分发标签必须具有`slot`属性，并且其值为子组件中对应的插槽名称，这样父组件内容分发标签中的内容会覆盖掉子组件对应插槽中的默认内容。

另外，要特别注意的是，父组件中一旦声明了对应于子组件插槽的内容分发标签，即便没有内容，子组件插槽中的默认内容也不会显示出来，只有删除了父组件中对应的内容分发标签，才能显示出来。

在`Panel`组件中有以下模板：

```html
<view class="panel">
    <slot name="title">默认标题</slot>
    <slot name="content">默认内容</slot>
</view>
```

在父组件中使用`Panel`子组件时，可以这样使用：

```html
<panel>
    <view slot="title">新的标题</view>
    <view slot="content">
        <text>新的内容</text>
    </view>
</panel>
```

## Mixin 混合

混合可以将组件之间的可复用部分抽离，从而在组件中使用混合时，可以将混合的数据，事件以及方法注入到组件之中。混合分为两种：

- 默认式混合
- 兼容式混合

### 默认式混合

对于组件`data`数据，`components`组件，`events`事件以及其它自定义方法采用默认式混合，即如果组件未声明该数据，组件，事件，自定义方法等，那么将混合对象中的选项将注入组件之中。对于组件已声明的选项将不受影响。

```javascript
// mixins/test.js
import wepy from 'wepy';

export default class TestMixin extends wepy.mixin {
    data = {
        foo: 'foo defined by page',
        bar: 'bar defined by testMix'
    };
    methods = {
    tap () {
      console.log('mix tap');
    }
  }
}

// pages/index.wpy
import wepy from 'wepy';
import TestMixin from './mixins/test';

export default class Index extends wepy.page {
    data = {
        foo: 'foo defined by index'
    };
    mixins = [TestMixin ];
    onShow() {
        console.log(this.foo); // foo defined by index
        console.log(this.bar); // bar defined by testMix
    }
}
```

### 兼容式混合

对于组件`methods`响应事件，以及小程序页面事件将采用兼容式混合，即先响应组件本身响应事件，然后再响应混合对象中响应事件。**注意，这里事件的执行顺序跟Vue中相反，Vue中是先执行mixin中的函数， 再执行组件本身的函数。**

```javascript
// mixins/test.js
import wepy from 'wepy'

export default class TestMixin extends wepy.mixin {
    methods = {
        tap () {
            console.log('mixin tap');
        }
    };
    onShow() {
        console.log('mixin onshow');
    }
}

// pages/index.wpy
import wepy from 'wepy';
import TestMixin from './mixins/test';

export default class Index extends wepy.page {

    mixins = [TestMixin];
    methods = {
        tap () {
            console.log('index tap');
        }
    };
    onShow() {
        console.log('index onshow');
    }
}


// index onshow
// mixin onshow
// ----- when tap
// index tap
// mixin tap
```

## WXS (WeiXin Script)

WePY 从`1.7.x` 版本开始支持 `wxs` 语法，但语法与原生 `wxs` 稍有出入。

```html
/**
project
└── src
    ├── wxs
    |   └── mywxs.wxs      wxs 文件
    ├── pages
    |   └── index.wpy      页面
    └──app.wpy
**/

// mywxs.wxs

module.exports = {
  text: 'This is from wxs',
  filter: function (num) {
    return num.toFixed(2);
  }
};

// index.wpy

<template>
  <text>{{m1.text}}</text>
  <text>{{m1.filter(num)}}</text>
</template>

<script>
  import wepy from 'wepy';
  import mywxs from '../wxs/mywxs.wxs';

  export default class Index extends wepy.page {
    data = {
      num: 10
    };

    wxs = {
      m1: mywxs
    }
  };
</script>
```

**注意** <b style="color: red;">!</b>

- `wxs`是基于原生的`wxs`去实现的，只是通过编译把现在的语法编译为原生语法。
- `wxs`必须是外链文件。并且后缀为`.wxs`。
- `wxs`引入后只能在`template`中使用，不能在`script`中使用。

## interceptor 拦截器 <b style="color: red;">!</b>

可以使用WePY提供的全局拦截器对原生API的请求进行拦截。

具体方法是配置API的config、fail、success、complete回调函数。参考示例：

```javascript
import wepy from 'wepy';

export default class extends wepy.app {
    constructor () {
        // this is not allowed before super()
        super();
        // 拦截request请求
        this.intercept('request', {
            // 发出请求时的回调函数
            config (p) {
                // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
                p.timestamp = +new Date();
                console.log('config request: ', p);
                // 必须返回OBJECT参数对象，否则无法发送请求到服务端
                return p;
            },

            // 请求成功后的回调函数
            success (p) {
                // 可以在这里对收到的响应数据对象进行加工处理
                console.log('request success: ', p);
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return p;
            },

            //请求失败后的回调函数
            fail (p) {
                console.log('request fail: ', p);
                // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                return p;
            },

            // 请求完成时的回调函数(请求成功或失败都会被执行)
            complete (p) {
                console.log('request complete: ', p);
            }
        });
    }
}
```

## 数据绑定 <b style="color: red;">!</b>

### 原生小程序的数据绑定方式

原生小程序通过`Page`提供的`setData`方法来绑定数据，如：

```javascript
this.setData({
  title: 'this is title'
});
```

因为小程序架构本身原因，页面渲染层和JS逻辑层分开的，`setData`操作实际就是JS逻辑层与页面渲染层之间的通信，那么如果在同一次运行周期内多次执行`setData`操作时，那么通信的次数是一次还是多次呢？这个取决于API本身的设计。

### WePY数据绑定方式

WePY使用脏数据检查对`setData`进行封装，在函数运行周期结束时执行脏数据检查，一来可以不用关心页面多次`setData`是否会有性能上的问题，二来可以更加简洁去修改数据实现绑定，不用重复去写`setData`方法。代码如下：
`this.title = 'this is title';`

**需注意的是，在异步函数中更新数据的时候，必须手动调用`$apply`方法，才会触发脏数据检查流程的运行**。如：

```javascript
setTimeout(() => {
    this.title = 'this is title';
    this.$apply();
}, 3000);
```

### WePY脏数据检查流程

在执行脏数据检查时，会通过`this.$$phase`标识当前检查状态，并且会保证在并发的流程当中，只会有一个脏数据检查流程在运行，以下是执行脏数据检查的流程图：

![](https://cloud.githubusercontent.com/assets/2182004/20554709/a0d8b1e8-b198-11e6-9034-0997b33bdf95.png)

## 其它优化细节 <b style="color: red;">!</b>

### `wx.request` 接收参数修改

```javascript
// 原生代码:

wx.request({
    url: 'xxx',
    success: function (data) {
        console.log(data);
    }
});

// WePY 使用方式, 需要开启 Promise 支持，参考开发规范章节
wepy.request('xxxx').then((d) => console.log(d));

// async/await 的使用方式, 需要开启 Promise 和 async/await 支持，参考 WIKI
async function request () {
   let d = await wepy.request('xxxxx');
   console.log(d);
}
```

### 优化事件参数传递

// 原生的事件传参方式:

```javascript
<view data-id="{{index}}" data-title="wepy" data-other="otherparams" bindtap="tapName"> Click me! </view>

Page({
    tapName: function (event) {
        console.log(event.currentTarget.dataset.id)// output: 1
        console.log(event.currentTarget.dataset.title)// output: wepy
        console.log(event.currentTarget.dataset.other)// output: otherparams
    }
});

// WePY 1.1.8以后的版本，只允许传string。

<view @tap="tapName({{index}}, 'wepy', 'otherparams')"> Click me! </view>

methods: {
    tapName (id, title, other, event) {
        console.log(id, title, other)// output: 1, wepy, otherparams
    }
}
```

### 改变数据绑定方式

保留`setData`方法，但不建议使用`setData`执行绑定，修复传入`undefined`的bug，并且修改入参支持： `this.setData(target, value) this.setData(object)`

```html
// 原生代码:

<view> {{ message }} </view>

onLoad: function () {
    this.setData({message: 'hello world'});
}


// WePY
<view> {{ message }} </view>

onLoad () {
    this.message = 'hello world';
}
```

### 组件代替模板和模块

```html
// 原生代码:

<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>

<!-- index.wxml -->
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>

<!-- index.js -->
var item = require('item.js')


// WePY
<!-- /components/item.wpy -->
<text>{{text}}</text>

<!-- index.wpy -->
<template>
    <com></com>
</template>
<script>
    import wepy from 'wepy';
    import Item from '../components/item';
    export default class Index extends wepy.page {
        components = { com: Item }
    }
</script>
```
