# 获取用户基本信息(UnionID 机制)

- [官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839)

## 介绍

在关注者与公众号产生消息交互后，公众号可获得关注者的 `OpenID`（加密后的微信号，每个用户对每个公众号的`OpenID`是唯一的。对于不同公众号，同一用户的`openid`不同）。公众号可通过本接口来根据`OpenID`获取用户基本信息，包括昵称、头像、性别、所在城市、语言和关注时间。

请注意，如果开发者有在多个公众号，或在公众号、移动应用之间统一用户帐号的需求，需要前往微信开放平台（`open.weixin.qq.com`）绑定公众号后，才可利用`UnionID`机制来满足上述需求。

## UnionID 机制说明：

开发者可通过`OpenID`来获取用户基本信息。特别需要注意的是，如果开发者拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的`unionid`来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号，用户的`unionid`是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，`unionid`是相同的。

## 获取用户基本信息（包括`UnionID`机制）

开发者可通过`OpenID`来获取用户基本信息。**请使用`https`协议**。

```html
接口调用请求说明 http请求方式: GET https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
```

- 参数说明

| 参数         | 是否必须 | 说明                                                  |
| ------------ | -------- | ----------------------------------------------------- |
| access_token | 是       | 调用接口凭证[参见](./获取access_token.md)             |
| openid       | 是       | 普通用户的标识，对当前公众号唯一                      |
| lang         | 否       | 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语 |

- 返回说明

正常情况下，微信会返回下述 JSON 数据包给公众号：

```json
{
  "subscribe": 1,
  "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",
  "nickname": "Band",
  "sex": 1,
  "language": "zh_CN",
  "city": "广州",
  "province": "广东",
  "country": "中国",
  "headimgurl": "http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
  "subscribe_time": 1382694957,
  "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL",
  "remark": "",
  "groupid": 0,
  "tagid_list": [128, 2],
  "subscribe_scene": "ADD_SCENE_QR_CODE",
  "qr_scene": 98765,
  "qr_scene_str": ""
}
```

| 参数            | 说明                                                                                                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subscribe       | 用户是否订阅该公众号标识，值为 0 时，代表此用户没有关注该公众号，拉取不到其余信息。                                                                                                                                                                                                           |
| openid          | 用户的标识，对当前公众号唯一                                                                                                                                                                                                                                                                  |
| nickname        | 用户的昵称                                                                                                                                                                                                                                                                                    |
| sex             | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知                                                                                                                                                                                                                                 |
| city            | 用户所在城市                                                                                                                                                                                                                                                                                  |
| country         | 用户所在国家                                                                                                                                                                                                                                                                                  |
| province        | 用户所在省份                                                                                                                                                                                                                                                                                  |
| language        | 用户的语言，简体中文为 zh_CN                                                                                                                                                                                                                                                                  |
| headimgurl      | 用户头像，最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640\*640 正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。                                                                                                                         |
| subscribe_time  | 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间                                                                                                                                                                                                                                  |
| unionid         | 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。                                                                                                                                                                                                                                  |
| remark          | 公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注                                                                                                                                                                                                              |
| groupid         | 用户所在的分组 ID（兼容旧的用户分组接口）                                                                                                                                                                                                                                                     |
| tagid_list      | 用户被打上的标签 ID 列表                                                                                                                                                                                                                                                                      |
| subscribe_scene | 返回用户关注的渠道来源，ADD_SCENE_SEARCH 公众号搜索，ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移，ADD_SCENE_PROFILE_CARD 名片分享，ADD_SCENE_QR_CODE 扫描二维码，ADD_SCENEPROFILE LINK 图文页内名称点击，ADD_SCENE_PROFILE_ITEM 图文页右上角菜单，ADD_SCENE_PAID 支付后关注，ADD_SCENE_OTHERS 其他 |
| qr_scene        | 二维码扫码场景（开发者自定义）                                                                                                                                                                                                                                                                |
| qr_scene_str    | 二维码扫码场景描述（开发者自定义）                                                                                                                                                                                                                                                            |

**错误时微信会返回错误码等信息，JSON 数据包示例如下（该示例为`AppID`无效错误）:**

```json
{ "errcode": 40013, "errmsg": "invalid appid" }
```

## 批量获取用户基本信息

开发者可通过该接口来批量获取用户基本信息。**最多支持一次拉取`100`条**。

- 接口调用请求说明

```html
http请求方式: POST https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN
```

- POST 数据示例

```json
{
  "user_list": [
    {
      "openid": "otvxTs4dckWG7imySrJd6jSi0CWE",
      "lang": "zh_CN"
    },
    {
      "openid": "otvxTs_JZ6SEiP0imdhpi50fuSZg",
      "lang": "zh_CN"
    }
  ]
}
```

| 参数   | 是否必须 | 说明                                                            |
| ------ | -------- | --------------------------------------------------------------- |
| openid | 是       | 用户的标识，对当前公众号唯一                                    |
| lang   | 否       | 国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语，默认为 zh-CN |

- 返回说明

正常情况下，微信会返回下述 JSON 数据包给公众号（示例中为一次性拉取了 2 个 openid 的用户基本信息，第一个是已关注的，第二个是未关注的）：

```json
{
  "user_info_list": [
    {
      "subscribe": 1,
      "openid": "otvxTs4dckWG7imySrJd6jSi0CWE",
      "nickname": "iWithery",
      "sex": 1,
      "language": "zh_CN",
      "city": "揭阳",
      "province": "广东",
      "country": "中国",
      "headimgurl": "http://thirdwx.qlogo.cn/mmopen/xbIQx1GRqdvyqkMMhEaGOX802l1CyqMJNgUzKP8MeAeHFicRDSnZH7FY4XB7p8XHXIf6uJA2SCunTPicGKezDC4saKISzRj3nz/0",
      "subscribe_time": 1434093047,
      "unionid": "oR5GjjgEhCMJFyzaVZdrxZ2zRRF4",
      "remark": "",
      "groupid": 0,
      "tagid_list": [128, 2],
      "subscribe_scene": "ADD_SCENE_QR_CODE",
      "qr_scene": 98765,
      "qr_scene_str": ""
    },
    {
      "subscribe": 0,
      "openid": "otvxTs_JZ6SEiP0imdhpi50fuSZg"
    }
  ]
}
```

参数说明 [参见请求一个用户信息时返回的参数字段]
