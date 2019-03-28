# 微信OCR识别

## 一、接口介绍

### 1.1 接口功能

本接口提供基于小程序或 H5 的身份证、银行卡、行驶证 OCR 识别

### 1.2 接口限制

此接口需要提供对应小程序/公众号 `appid`，开通权限后方可调用。

如需申请使用权限，请邮件发送至腾讯工作邮箱 `wx_city@tencent.com`，并附上小程序或公众号的 `appid`，以及使用场景/原因说明。腾讯工作人员开通接口权限后邮件回复。

- 以下为申请邮件模版：

```html
邮件标题：

【微信 OCR】身份证识别接口权限申请

邮件正文：

1、申请微信 OCR 身份证识别接口的公众号或小程序 appid：

2、使用场景/原因说明：
```

### 1.3 使用 TIPS

此接口为后台接口，可基于自有业务承载情况，搭配小程序或 H5 的拍照、相册选照等
一起使用，即可完成身份证照片的采集、上传、识别、信息返回等流程，用于需要基于身份
证、银行卡等实体卡或证，采集照片或文字信息等的业务场景。

## 二、身份证OCR识别接口

### 2.1请求示例

```html
http://api.weixin.qq.com/cv/ocr/idcard?type=MODE&img_url=ENCODE_URL&access_token=ACCESS_TOCKEN
```

- 示例

```html
示例1：
curl http://api.weixin.qq.com/cv/ocr/idcard?type=photo&img_url=ENCODE_URL&access_token=ACCESS_TOCKEN

示例2：
curl -F ‘img=@test.jpg’“http://api.weixin.qq.com/cv/ocr/idcard?type=photo&img_url=ENCODE_URL&access_token=ACCESS_TOCKEN”
```

- 说明：
  - img_url
    - 图片支持使用img参数实时上传，也支持使用img_url参数传送图片地址，由微信后台下载图片进行识别。
  - type 有两种类型：
    - photo：拍照模型，带背景的图片
    - scan：扫描模式，不带背景的图片
  - ACCESS_TOCKEN
    - [参见](./公众号/获取access_token.md)
  - **文件大小限制：小于2M**

### 2.2返回参数样例

```json
{
  "errcode": 0,
  "errmsg": "ok",
  "type": "Back", // 背面
  "valid_date": "20070105-20270105", // 有效期
}

{
  "errcode": 0,
  "errmsg": "ok",
  "type": "Frond", // 正面
  "name": "xxx", // 姓名
  "id": "xxxxxxxxxx", // ID
}
```

## 三、银行卡OCR识别接口

### 3.1请求示例

```html
http://api.weixin.qq.com/cv/ocr/ bankcard? img_url=ENCODE_URL&access_token=ACCESS_TOCKEN
```

- 示例

```html
示例1：
curl http://api.weixin.qq.com/cv/ocr/ bankcard?img_url=ENCODE_URL&access_token=ACCESS_TOCKEN
示例2：
curl -F ‘img=@test.jpg’“http://api.weixin.qq.com/cv/ocr/ bankcard? img_url=ENCODE_URL&access_token=ACCESS_TOCKEN”
```

- 说明：
  - **文件大小限制：小于2M**

### 3.2返回参数样例

```json
{
  "errcode": 0,
  "errmsg": "ok",
  "number": "000000000000000", // 银行卡号
}
```

## 四、行驶证OCR识别接口

### 4.1请求示例

```html
http://api.weixin.qq.com/cv/ocr/ driving? img_url=ENCODE_URL&access_token=ACCESS_TOCKEN
```

```html
示例1：
curl http://api.weixin.qq.com/cv/ocr/ driving?img_url= ENCODE_URL&access_token=ACCESS_TOCKEN
示例2：
curl -F ‘img=@test.jpg’“http://api.weixin.qq.com/cv/ocr/ driving? img_url= ENCODE_URL&access_token=ACCESS_TOCKEN”
```

- 说明：
  - **⽂件大⼩限制：小于2M**
  
### 4.2返回参数样例

```json
{
  "errcode": 0,
  "errmsg": "ok",
  "plate_num": "粤xxxxx",
  "vehicle_type": "小型普通客⻋",
  "owner": "东莞市xxxxx机械厂",
  "addr": "广东省东莞市xxxxx号",
  "use_character": "非营运",
  "model": "江淮牌HFCxxxxxxx",
  "vin": "LJ166xxxxxxxx51",
  "engine_num": "J3xxxxx3",
  "register_date": "2018-07-06",
  "issue_date": "2018-07-01",
  "plate_num_b": "粤xxxxx",
  "record": "441xxxxxx3",
  "passengers_num": "7人",
  "total_quality": "2700kg",
  "prepare_quality": "1995kg"
}
```