# 处理 url 参数

## 获取转换 url 参数为对象

```js
var parseQueryString = function (url) {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}
console.log(parseQueryString(window.location.href))
```

```js
let search = window.location.search
let searchArr
if (search) {
  searchArr = search.indexOf('&') != -1 ? search.slice(1).split('&') : [search.slice(1)]
} else {
  console.log('无链接参数')
  return
}
let searchResult
for (let i = 0; i < searchArr.length; i++) {
  let item = searchArr[i].split('=')
  searchResult[item[0]] = item[1]
}
console.log(searchResult)
```

## 获取 url 参数某一个值

```js
function GetUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i') //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) //匹配目标参数
  if (r != null) return unescape(r[2])
  return null //返回参数值
}
```

## 传参数之前对中文的 url 参数进行

```js
// 传参数之前对中文的url参数进行
window.location = encodeURI(encodeURI('xxx.html?title=' + '中文'))
// 接收参数的地方
decodeURI(GetUrlParam('title'))
```
