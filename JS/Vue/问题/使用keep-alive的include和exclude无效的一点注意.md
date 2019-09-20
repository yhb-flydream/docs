# 使用 keep-alive 的 include 和 exclude 无效的一点注意

最近在使用`vue + element-UI`开发的后台管理项目中，优化 keep-alive 的使用方式时遇到了一些问题

优化前使用的 if 判断来控制页面是否可以缓存，这样做页面切换的动画效果不是太理想

```html
<transition>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</transition>
<transition>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</transition>
```

优化想使用 include 来控制页面是否可以缓存，也可以让页面切换起来更流畅些

```html
<transition>
  <keep-alive :include="keepLive">
    <router-view></router-view>
  </keep-alive>
</transition>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      keepLive() {
        // 此处使用 store getters 计算过的 keepLive 数组
        //（在 store 拿到 routes，循环出 meta 里面带有 keepLive: true 的 route 的 name 放到 keepLive）
        return this.$store.getters.keepLive
      }
    }
  }
</script>
```

路由里面

```js
export default new Router({
  routes: [
    {
      path: '/a',
      name: 'a',
      component: () => import('src/views/a'),
      meta: { keepAlive: true }
    },
    {
      path: '/b',
      name: 'a',
      component: () => import('src/views/b'),
      meta: { keepAlive: true }
    }
  ]
})
```

此时，我感觉准备工作已经做完了，可以运行项目看一下效果了。果然，切换动画是有了，但是查看控制台，页面竟然没有了请求！

使用 keep-alive 页面的请求我是放在 activated 里面的，此时页面完全没有执行这里面的代码

我仔细检查了代码，确保没有遗漏什么东西，但问题始终没有解决

我去看了[vue 官方文档 api keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)，检测了 vue 版本大于文档说的 `2.1.0`，然后发现了这句话：

> 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

当时以为是路由里面那个 name，然后又检查了所有路由的 name 属性，发现也没遗漏

最后搜到了思否的一个问答[vue.js的keep-alive include无效](https://segmentfault.com/q/1010000009117672)，发现原来是要在**组件页面中声明 name 属性**

```html
<transition>
  <div class="a">
    ...
  </div>
</transition>

<script>
  export default {
    name: 'a',
    ...
  }
</script>
```

最终页面终于可以正常运行了

也在此做一下笔记，记录一下遇到的问题
