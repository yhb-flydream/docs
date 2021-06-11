# `get`和`set`(`getter`和`setter`)

> ES5 新增语法，被称为**读写器**

```javascript
var a = 1
var obj = {
  set val(par) {
    a = par
  },
  get val() {
    return a
  },
}
// 对于使用者来说，操作的是obj的val属性，实际上val是两个方法，最终操作的是a变量。
obj.val = 10
obj.val
```
