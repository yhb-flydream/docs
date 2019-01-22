# FormData

- [`FormData MDN`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
- [`FormData() MDN`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

`FormData`对象用以将数据编译成键值对，以便用`XMLHttpRequest`来发送数据。

其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。

如果表单`enctype`属性设为`multipart/form-data` ，则会使用表单的`submit()`方法来发送数据，从而，发送数据具有同样形式。

## 简单介绍

### 创建一个空的`FormData`对象

```js
var formData = new FormData();
```

### 创建一个带预置数据的`FormData`对象

```js
<form id="myForm" name="myForm">
  <div>
    <label for="username">Enter name:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="useracc">Enter account number:</label>
    <input type="text" id="useracc" name="useracc">
  </div>
  <div>
    <label for="userfile">Upload file:</label>
    <input type="file" id="userfile" name="userfile">
  </div>
  <input type="submit" value="Submit!">
</form>

var myForm = document.getElementById('myForm');
formData = new FormData(myForm);
```

### 添加键/值对到表单里面

```js
formData.append(name, value, filename);

例如：
formData.append('name', 'xxx');
```

- `name` 字段名称
- `value` 字段值.可以是,或者一个字符串,如果全都不是,**则该值会被自动转换成字符串**.
- `filename` (可选) 指定文件的文件名,当value参数被指定为一个Blob对象或者一个File对象时,该文件名会被发送到服务器上,对于Blob对象来说,这个值默认为"blob".

## 例子

```html
<input class="input-file" type="file" name="file" required/>
```

```js
// 建立一個可存取到该file的url
function getObjectURL(file) {
  let url = null;
  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
  if (window.createObjectURL !== undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

// change 事件监测文件上传
$('.input-file').on('change', function () {
  let thisFile = this.files[0];
  if (thisFile) {
    // 获取到文件对象的实例
    URL = getObjectURL(thisFile);
    // 判断上传的文件是否符合格式要求
    if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(thisFile.type) >= 0) {
      // 在页面展示
      $(document.body).append('<img src="${URL}" alt="">');
      // makeFormData({'image': thisFile});
      sendAjax({
        url: '',
        formData: makeFormData({'image': thisFile}),
      })
    } else {
      // 文件格式不符合要求
    }
  }
});

// 创建 formData 对象，保存需要提交的数据
function makeFormData(obj) {
  let formData = new FormData();
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData
}

function sendAjax(option) {
  $.ajax({
    type: option.type || 'GET',
    url: option.url,
    headers: option.headers || {},
    dataType: 'json',
    data: option.formData,
    cache: false, // 不缓存
    processData: false, // jQuery不要去处理发送的数据
    contentType: false, // jQuery不要去设置Content-Type请求头
    beforeSend: function() {
      // 发送请求前 do something
      if (option.beforeSend) option.beforeSend();
    },
    success: function(res) {
      // 发送成功 do something
      if (option.success) option.success(res);
    },
    error: function() {
      // 发送失败 do something
      if (option.error) option.error();
    }
  })
}
```
