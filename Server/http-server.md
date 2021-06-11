# http-server

- `http-server`是一个简单的、零配置的命令行 http 服务器。
- 它在生产环境是非常有用的，但是它只能简单的在本地环境进行开发、使用和学习
- [NPM http-server](https://www.npmjs.com/package/http-server)

## 全局安装

```bash
npm install -g http-server
```

## 使用

```bash
http-server [path] [options]

例如：

http-server

或

hs
```

- `path` 默认路径是 `./public` （如果这个路径存在），否则为当前文件目录
- 默认端口为 `8080` (`http://127.0.0.1:8080`)

## options 介绍

- `-p` 端口设置（默认 8080）
- `-a` 设置地址（默认 0.0.0.0）
- `-d` 是否显示目录列表（默认显示）
- `-i` 是否显示自动索引（默认显示）
- `-g or --gzip` 启用时（默认为'False'）当文件的 gzip 压缩版本存在并且请求接受 gzip 编码时，它将代替`./public/some-file.js`提供`./public/some-file.js.gz`
- `-e or --ext` 如果没有提供默认文件扩展名（默认为'html'）
- `-s or --silent` 不输出日志消息
- `--cors` 可以启动 `Access-Control-Allow-Origin` 请求头
- `-o` 启动服务器后自动打开浏览器窗口
- `-c` 设置缓存控制`max-age`标头的缓存时间（以秒为单位），例如`-c10`持续`10`秒（默认为'3600'）。要禁用缓存，请使用`-c-1`。
- `-U or --utc` 在日志消息中使用 UTC 时间格式。
- `-P or --proxy` 将所有无法在本地解析的请求代理到给定的 URL。例如：`-P http://someurl.com`
- `-S or --ssl` 启用 https。
- `-C or --cert` ssl cert 文件的路径（默认值：`cert.pem`）。
- `-K or --key` ssl 密钥文件的路径（默认值：`key.pem`）。
- `-r or --robots` 提供`/robots.txt`（其内容默认为`'User-agent：* \ nDisisis：/'`）
- `-h or --help` 打印帮助列表并退出。
