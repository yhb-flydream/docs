# async&await

## 基本用法

`async` 函数返回一个 `Promise` 对象，可以使用then方法添加回调函数。

**当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句**

`async` 函数有多种使用形式。

```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function() {}

// 对象方法
let obj = { async foo() {} }
obj.foo().then(...);

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars')
  }
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`)
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(...);

// 箭头函数
const foo = async () => {};
```

## 语法

### 返回 Promise 对象

async 函数返回一个 Promise 对象

async 函数内部 return 语句返回的值，会成为 then 方法的回调函数的参数

```js
async fucntion f() {
  return 'hello world'
}

f().then(val => console.log(val)); // 'hello world'
```

async 函数内部抛出错误，会导致返回的 Promise 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到。

```js
async function f() {
  throw new Error('___error');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// ___error
```

### Promise 对象的状态变化

`async` 函数返回的 `Promise` 对象，必须等到内部所有 `await` 命令后面的 `Promise` 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。

也就是说，只有 `async` 函数内部的异步操作执行完，才会执行then方法指定的回调函数。

```js
async function() getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}

getTitle('xxx').then(console.log);
// "ECMAScript 2017 Language Specification"
```

### await 命令

正常情况下，`await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值。

```js
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

另一种情况是，await命令后面是一个 `thenable` 对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。

```js
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const actualTime = await new Sleep(1000);
  console.log(actualTime);
})();
```

上面代码中，`await` 命令后面是一个 `Sleep` 对象的实例。这个实例不是 `Promise` 对象，但是因为定义了 `then` 方法，await会将其视为Promise处理。

`await` 命令后面的 `Promise` 对象如果变为 `reject` 状态，则reject的参数会被 `catch` 方法的回调函数接收到。

```js
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.then(e => console.log(e))
// 出错了
```

**任何一个 `await` 语句后面的 `Promise` 对象变为 `reject` 状态，那么整个 `async` 函数都会中断执行。**

```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个 `await` 放在 `try...catch` 结构里面，这样不管这个异步操作是否成功，第二个await都会执行。

```js
async function f() {
  try {
    await Promise.reject('出错了')
  } cetch(e) {}
  return await Promise.resolve('hello world');
}
f().then(v => console.log(v));
// hello world
```

另一种方法是 `await` 后面的 `Promise` 对象再跟一个 `catch` 方法，处理前面可能出现的错误。

```js
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

### 错误处理

如果 `await` 后面的异步操作出错，那么等同于 `async` 函数返回的 `Promise` 对象被 `reject`。

```js
async function f() {
  await new Promise((resolve, reject) => {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e));
// Error: 出错了
```

防止出错的方法，也是将其放在`try...catch`代码块之中。

```js
async function f() {
  try {
    await new Promise((resolve, reject) => {
      throw new Error('出错了');
    })
  } catch(e) {
  }
  return await('hello world');
}
```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

下面的例子使用`try...catch`结构，实现多次重复尝试。

```js
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(e) {
    }
  }
  console.log(i);
}

test();
```

上面代码中，如果`await`操作成功，就会使用`break`语句退出循环；如果失败，会被`catch`语句捕捉，然后进入下一轮循环

### 使用注意点

- `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在`try...catch`代码块中，或者在 `await` 后面的`Promise` 对象再跟一个`catch`方法，处理之前出现的错误

```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise() {
    } catch(e) {
      console.log(e);
    }
  }
}

// 另一种方法

async function myFunction() {
  await somethingThatReturnsAPromise()
    .catch(function(e) {console.log(e)});
}
```

- 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有上一个完成以后，才会执行下一个，完全可以让它们同时触发。

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

- <b style="color: red;">`await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错。</b>

```js
async function dbFuc(db) {
  let docs = [{},{},{}];

  docs.forEach(function(doc) {
    await db.post(doc);
  })
}
```

上面代码会报错，因为 `await` 用在普通函数之中了。但是，如果将forEach方法的参数改成 `async` 函数，也有问题

```js
function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```

原因是这时三个`db.post`操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用`for`循环

```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

如果确实希望多个请求并发执行，可以使用 `Promise.all` 方法。当三个请求都会`resolved`时，下面两种写法效果相同。

```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者下面写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map(doc => db.post(doc));

  let results = [];

  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```