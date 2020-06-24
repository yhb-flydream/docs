# Event Loop

- 参考
[MDN 并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
[什么是 Event Loop？](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
[从一道面试题来理解JS事件循环](https://xieyufei.com/2019/12/30/Quiz-Eventloop.html)
[js事件循环机制(Event Loop)](https://www.cnblogs.com/yalong/p/10369477.html)
[浅析 JS 中的 EventLoop 事件循环（新手向）](https://segmentfault.com/a/1190000019313028)
[译文：JS事件循环机制（event loop）之宏任务、微任务](https://segmentfault.com/a/1190000014940904)
[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)
[前端内参 壹.2.8 Event Loop](https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.2.8)
[你真的理解$nextTick么](https://juejin.im/post/5cd9854b5188252035420a13)
[总是一知半解的Event Loop](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226694&idx=1&sn=01908e1c5089010733e723c99947b311&chksm=bd495bc28a3ed2d4d92c024910eb2b0367d0b22ee8e2587fee9253a359ebf99dba63338f3ccb&scene=21#wechat_redirect)

JavaScript 就是一门`单线程`的`非阻塞`的`脚本语言`。

单线程意味着，JavaScript 代码在执行的任何时候，都`只有一个主线程`来处理所有的任务。那么 JavaScript 为什么是单线程，难道不能实现为多线程吗？

因为这是由于 JavaScript 所运行的浏览器环境决定，他只能是单线程的。原因大概是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。后来就约定俗成，JavaScript 为一种单线程语言。

JavaScript 是可以通过 Web Worker 开启多线程，但是这个新开线程的功能被限制了，只能做一些消耗CPU的逻辑运算等，数据传输也是通过回调的方式来进行，不会阻塞主线程的执行；而且最最重要的是，Web Worker不能来操作dom，在新开的线程中甚至都不能获取到 document 和 window 对象。

非阻塞靠的就是 event loop（事件循环）。

`event loop` 它最主要是分三部分：**主线程**、**宏任务（macrotask）**、**微任务（microtask）**。
在 JavaScript 中怎么区分它们呢？

- 主线程
  - 就是访问到的 script 标签里面包含的内容
  - 或者是直接访问某一个js文件的时候，里面的可以在当前作用域直接执行的所有内容（执行的方法，new出来的对象等）
- 宏任务（macrotask）
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI rendering
- 微任务（microtask）
  - promise.then
  - process.nextTick
  - Object.observe(已废弃)
  - MutationObserver(html5新特性)

- **执行顺序：**
1、先执行主线程
2、遇到宏任务，放到宏任务队列
3、遇到微任务，放到微任务队列
4、主线程执行完毕，接下来检查任务队列中是否有宏（微）任务，如果有就放到主线程执行
5、先执行微任务队列里面的微任务（如果微任务里面还会有宏任务，放到宏任务队列；如果微任务里面还会有微任务，放到微任务队列）
6、再执行宏任务队列里面的宏任务（如果宏任务里面还会有微任务，放到微任务队列；如果宏任务里面还会有宏任务，放到宏任务队列）
然后再依次执行`4 ~ 6`的过程

- **代码分析：**

```js
console.log(1)
this.$nextTick(() => {
  console.log(8)
  setTimeout(() => {
    console.log(9)
  })
})
setTimeout(() => {
  console.log(2)
  new Promise(() => {
    console.log(11)
  }).then(() => {
    console.log(13)
  })
})
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
// requestIdleCallback 此处只用来做实验室用
requestIdleCallback(() => {
  console.log(7)
})
// 特殊说明： new Promise（）属于主线程任务
let promise = new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log(10)
  })
  resolve()
  // 这个console也属于主线程任务
  console.log(4)
})
fn()
console.log(3)
promise.then(() => {
  console.log(12)
})
function fn(){
  console.log(6)
}
```

执行结果：1、4、6、3、8、12、2、11、10、9、7。

- **代码执行步骤分析：**

1、js从上到下执行，先**打印 1**；
2、`this.$nextTick` 属于微任务，并且当前主线程的代码还没有执行完毕，所以它被暂时扔到了微任务队列里；
3、setTimeout 是属于宏任务，跟 `this.$nextTick` 处理逻辑类似，当前主线程的代码还没有执行完毕，所以它被暂时扔到了宏任务队列里；
4、requestIdleCallback 这时也不会立即执行，这里参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback);
5、promise 在实例化的时候，这里的 setTimeout 继续被丢到了宏任务队列中，并立即执行了 resolve，和接下来的 console **打印 4**；
6、fn 函数直接调用，直接**打印 6**；
7、console 直接**打印 3**；
8、promise.then 因为它属于微任务，所以被放到微任务队列里；
9、到这里主线程里面就没有任何可以执行到东西了，下面开始走微任务队列；
10、第一个被放入微任务队列的是第2步的 `this.$nextTick`，执行后 console **打印 8**，`this.$nextTick` 里还有 setTimeout 是属于宏任务，所以它被暂时扔到了宏任务队列里；
11、第二个被放入微任务队列的是第8步的 promise.then，执行后 console **打印 12**；
12、到这里微任务队列就走完了，下面开始走宏任务队列；
13、第一个被放入宏任务队列的是第3步的 setTimeout，执行后 console **打印 2**；此时 new Promise 会立即执行 console **打印 11**；
14、第二个被放入宏任务队列的是第5步的 promise 里面的 setTimeout，执行后 console **打印 10**；
15、第三个被放入宏任务队列的是第10步的 `this.$nextTick` 里面的 setTimeout，执行后 console **打印 9**；
16、到这里主线程、宏任务队列、微任务队列就全都跑完了，在全部跑完的时候，requestIdleCallback 才会执行，**打印 7**；
17、requesIdleCallback 会在当前浏览器空闲时期去依次执行，在整个过程当中你可能添加了多个 requestIdleCallback，但是都不会执行，只会在空闲时期，去依次根据调用的顺序就执行。
