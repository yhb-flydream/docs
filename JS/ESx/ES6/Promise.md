# `Promise`

- 一种`异步`解决方案，比回调函数和事件更合理强大

## 特点

- 不受外界影响，有三种状态
  - `pending(进行中)`
  - `fulfilled(已成功)`
  - `rejected(已失败)`
- 状态一旦改变，就不会再变

## 缺点

- 无法取消 `Promise`一旦建立中途无法取消
- 如果不设置回调，`Promise`内部抛出错误，不会反映到外部
- 当处于`pending`时，无法得知目前进行到哪个阶段

## 基本使用

`Promise` 对象是一个构造函数，用来生成 `Promise` 实例

```js
const promise = new Promise(function(resolve, reject) {
 // some code

 if (/* 异步操作成功 */) {
   resolve(value);
 } else {
   reject(error);
 }
});
```

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。它们是两个函数，由 `JavaScript` 引擎提供，不用自己部署

- `resolve` 函数的作用是，将 `Promise` 对象的状态**从“未完成”变为“成功”（即从 pending 变为 resolved）**，`在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`
- `reject` 函数的作用是，将 `Promise` 对象的状态**从“未完成”变为“失败”（即从 pending 变为 rejected）**，`在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。`

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then` 方法可以接受两个回调函数作为参数。

**这两个函数都接受 `Promise` 对象传出的值作为参数。**

- 第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用
- 第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用
  - 其中，第二个函数是可选的，不一定要提供

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then(function () {
  console.log(value);
});
```

<b style="color: red;">Promise 新建后就会立即执行</b>

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

`Promise` 新建后立即执行，所以首先输出的是 `Promise`。

**然后，`then` 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以 `resolved` 最后输出。**

异步加载图片例子

```js
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject(new Error('Could not load iamge at ' + url));
    };

    image.src = url;
  });
}
```

`Promise` 实现 `Ajax` 例子

```js
const getJSON = function (url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return false;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText()));
      }
    };

    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });

  return promise;
};

getJSON('/posts.json').then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.log('出错了', error);
});
```

如果调用 `resolve` 函数和 `reject` 函数时带有参数，那么它们的参数会被传递给回调函数。

- `reject` 函数的参数通常是 `Error` 对象的实例，表示抛出的错误；
- `resolve` 函数的参数除了正常的值以外，还可能是另一个 `Promise` 实例

```js
const p1 = new Promise(function(resolve, reject) {
  // ...
});
const p2 = new Promise(function(resolve, reject) {
  // ...
  resolve(p1);
});
```

这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。

如果p1的状态是 `pending`，那么p2的回调函数就会等待p1的状态改变；
如果p1的状态已经是 `resolved` 或者 `rejected`，那么p2的回调函数将会立刻执行

```js
const p1 = new Promiese(function(resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000);
});

const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});
```

<b style="color: red;">注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。</b>

```js
new Promise(function(resolve, reject) {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});

// 2
// 1
```

一般来说，调用 `resolve` 或 `reject` 以后，`Promise` 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在 `resolve` 或 `reject` 的后面。
**所以，最好在它们前面加上return语句，这样就不会有意外。**

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## `Promise.prototype.then()`

`Promise` 实例具有 `then` 方法，也就是说，`then` 方法是定义在原型对象 `Promise.prototype` 上的

它的作用是为 `Promise` 实例添加状态改变时的回调函数。`then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数（可选）是 `rejected` 状态的回调函数。

**`then` 方法返回的是一个新的 `Promise` 实例（注意，不是原来那个 `Promise` 实例）。**

因此可以采用链式写法，即then方法后面再调用另一个then方法。

```js
const p1 = new Promise(function(resolve, reject) {
  resolve('111');
});
p1.then(function(str) {
  return str;
}).then(function(s) {
  console.log(s); // '111'
});
```

上面的代码使用 `then` 方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的 `then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 `Promise` 对象（即有异步操作），这时后一个回调函数，就会等待该 `Promise` 对象的状态发生变化，才会被调用。

```js
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```

上面代码中，第一个 `then` 方法指定的回调函数，返回的是另一个 `Promise` 对象。这时，第二个 `then` 方法指定的回调函数，就会等待这个新的 `Promise` 对象状态发生变化。如果变为 `resolved`，就调用 `funcA`，如果状态变为 `rejected`，就调用 `funcB`。

上面代码使用箭头函数

```js
getJSON('/post/1.json').then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log('resolved: ', comments),
  err => console.log('rejected: ', err);
)
```

## `Promise.prototype.catch()`

`Promise.prototype.cacth` 是 `.then(null, rejection)` 的别名，用于指定发生错误时的回调函数

```js
getJSON('/url').then(function(posts) {
  // 成功执行函数
}).catch(function(error) {
  // 失败执行函数
  console.log('发生错误', error);
});
```

**另外，`then` 方法指定的回调函数，如果运行中抛出错误，也会被 `catch` 方法捕获。**

```js
p.then(val => console.log('fulfilled: ', val))
  .catch(err => console.log('rejected', err));

等同于

p.then(val => console.log('fulfilled: ', val))
  .then(null, err => console.log('rejected: ', err));
```

**`reject` 方法的作用，等同于抛出错误。**

<b style="color: red;">如果 `Promise` 状态已经变成 `resolved`，再抛出错误是无效的。因为 `Promise` 的状态一旦改变，就永久保持该状态，不会再变了。</b>

```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

**`Promise` 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获。**

```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

上面代码中，一共有三个 `Promise` 对象：一个由 `getJSON` 产生，两个由 `then` 产生。它们之中任何一个抛出的错误，都会被最后一个 `catch` 捕获。

**一般来说，不要在 `then` 方法里面定义 `Reject` 状态的回调函数（即 `then` 的第二个参数），总是使用 `catch` 方法。**

```js
// bad
promise.then(function(data) {
  // success
}, function(err) {
  // err
});

// good
promise.then(function(data) {
  // success
}).catch(function(err) {
  console.log(err);
})
```

跟传统的 `try/catch` 代码块不同的是，如果没有使用 `catch` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应。

一般总是建议，`Promise` 对象后面要跟 `catch` 方法，这样可以处理 Promise 内部发生的错误。`catch` 方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用 `then` 方法。

## `Promise.prototype.finally()`

`finally` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 `ES2018` 引入标准的。

```js
promise.then(result => { //... })
  .catch(error => { //... })
  .finally(() => { // ... });
```

不管 `promise` 最后的状态，在执行完 `then` 或 `catch` 指定的回调函数以后，都会执行 `finally` 方法指定的回调函数

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` 状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 `Promise` 的执行结果。

实现 `finally`

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

上面代码中，不管前面的 `Promise` 是 `fulfilled` 还是 `rejected`，都会执行回调函数 `callback`。

```js
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})
```

## `Promise.all()`

**`Promise.all` 方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。**

```js
const p = Promise.all([p1,p2,p3]);
```

`Promise.all` 方法接受一个数组作为参数，`p1、p2、p3`都是 `Promise` 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 `Promise` 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 `Iterator` 接口，且返回的每个成员都是 `Promise` 实例。）

p的状态由p1、p2、p3决定，分成两种情况。

- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

```js
const promise = [2,3,5,7,11,13].map(function(id) {
  return getJSON('/post/' + id + '.json');
});

Promise.all(promise).then(function(posts) {
  // ...
}).catch(function(reason) {
  // ...
});
```

上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

```js
const databasePromise = connectDatabase();

const booksPromise = databasePromise.then(findAllBooks);

const userPromise = databasePromise.then(getCurrentUser);

Promise.all([
  bookbasePromise,
  userPromise
]).then(([book, user]) => pickTopRecommentations(book, user));
```

上面代码中，`booksPromise` 和 `userPromise` 是两个异步操作，只有等到它们的结果都返回了，才会触发 `pickTopRecommentations` 这个回调函数。

**注意，如果作为参数的 `Promise` 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发`Promise.all()`的catch方法。**

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
}).then(result => result)
  .catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('fail');
}).then(result => result)
  .catch(e => e);

Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e);)
// ['hello', Error: fail]
```

上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
}).then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('fail');
}).then(result => result);

Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));
// Error: 报错了
```