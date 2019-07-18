# 获取access_token

- [官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183)

- `access_token` 是公众号的全局唯一接口调用凭据
- 公众号调用各接口时都需使用 `access_token`
- 开发者需要进行妥善保存
- `access_token` 的存储至少要保留512个字符空间
- `access_token` 的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的 `access_token` 失效

## `access_token` 使用及生成方式说明

- 建议公众号开发者使用中控服务器统一获取和刷新 `access_token`，其他业务逻辑服务器所使用的 `access_token` 均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致 `access_token` 覆盖而影响业务
- 目前 `access_token` 的有效期通过返回的 `expire_in` 来传达，目前是 **7200** 秒之内的值。中控服务器需要根据这个有效时间提前去刷新新 `access_token`。在刷新过程中，中控服务器可对外继续输出的老 `access_token`，此时公众平台后台会保证在**5分钟**内，新老 `access_token` 都可用，这保证了第三方业务的平滑过渡
- `access_token` 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 `access_token` 的接口，这样便于业务服务器在API调用获知`access_token` 已超时的情况下，可以触发 `access_token` 的刷新流程

**公众号和小程序均可以使用 `AppID` 和 `AppSecret` 调用本接口来获取 `access_token`。**

`AppID` 和 `AppSecret` 可在**微信公众平台-开发-基本配置**页中获得（需要已经成为开发者，且帐号没有异常状态）。

调用接口时，请登录**微信公众平台-开发-基本配置**提前将服务器IP地址添加到IP白名单中，点击查看设置方法，否则将无法调用成功。小程序无需配置IP白名单

### 接口调用请求说明

```html
https请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
```

- 参数说明

|参数|是否必须|说明|
|:---:|:---:|---|
|grant_type|是|获取access_token填写client_credential|
|appid|是|第三方用户唯一凭证|
|secret|是|第三方用户唯一凭证密钥，即appsecret|

- 返回说明

正常情况下，微信会返回下述JSON数据包给公众号：

```json
{"access_token":"ACCESS_TOKEN","expires_in":7200}
```

|参数|说明|
|---|---|
|access_token|获取到的凭证|
|expires_in|凭证有效时间，单位：秒|

错误时微信会返回错误码等信息，JSON数据包示例如下（该示例为AppID无效错误）:

```json
{"errcode":40013,"errmsg":"invalid appid"}
```

- 返回码说明

|返回码|说明|
|:---:|---|
|-1|系统繁忙，此时请开发者稍候再试|
|0|请求成功|
|40001|AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性|
|40002|请确保grant_type字段值为client_credential|
|40164|调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置。（小程序及小游戏调用不要求IP地址在白名单内。）|