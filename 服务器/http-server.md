# http-server

- `http-server`是一个简单的、零配置的命令行http服务器。
- 它在生产环境是非常有用的，但是它只能简单的在本地环境进行开发、使用和学习
- [NPM http-server](https://www.npmjs.com/package/http-server)

## 全局安装

```
npm install -g http-server
```

## 使用

```
http-server [path] [options]

例如：

http-server

或

hs
```

- `path` 默认路径是 `./public` （如果这个路径存在），否则为当前文件目录
- 默认端口为 `8080` (`http://127.0.0.1:8080`)

## options 介绍

- `-p`
- `-a`
- `-d`
- `-i`
- `-g or --gzip`
- `-e or --ext`
- `-s or --silent`
- `--cors`
- `-o`
- `-c`
- `-U or --utc`
- `-P or --proxy`
- `-S or --ssl`
- `-C or --cert`
- `-K or --key`
- `-r or --robots`
- `-h or --help`