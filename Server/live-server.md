# live-server

[手摸手玩转 live-server -- 热加载利器](https://www.jianshu.com/p/6519807b79f2)

> 这是一个具有实时重载功能的小型开发服务器。
> 用它来热加载你的 HTML / JavaScript / CSS 文件。
> 但不能用于部署最终的网站。
> 一键安装，实现自动刷新，架设本地服务器环境。

## 全局安装

```bash
npm install -g live-server
```

## 使用

```bash
live-server [--options=val]

例如：

live-server --port=9090
```

## options 介绍

- `--port=NUMBER` - 选择要使用的端口，默认值：PORT env var 或 8080
- `--host=ADDRESS` - 选择要绑定的主机地址，默认值：IP env var 或 0.0.0.0（“任意地址”）
- `--no-browser` - 禁止自动 Web 浏览器启动
- `--browser=BROWSER` - 指定浏览器使用，而不是系统默认
- `--quiet | -q` - 禁止记录
- `--verbose | -V` - 更多日志记录（记录所有请求，显示所有侦听的 IPv4 接口等）
- `--open=PATH` - 启动浏览器到 PATH 而不是服务器根目录
- `--watch=PATH` - 用逗号分隔的路径来专门监视更改（默认值：观看所有内容）
- `--ignore=PATH`- 要忽略的逗号分隔的路径字符串（[anymatch](https://github.com/es128/anymatch) -compatible definition）
- `--ignorePattern=RGXP`-文件的正则表达式忽略（即`.*\.jade`）（**不推荐使用**赞成`--ignore`）
- `--middleware=PATH` - 导出.js 文件的路径导出中间件功能添加; 可以是一个没有路径的名字，也不是引用`middleware`文件夹中捆绑的中间件的扩展名
- `--entry-file=PATH` - 提供这个文件（服务器的根相对），以取代丢失的文件（对单页面应用程序有用）
- `--mount=ROUTE:PATH` - 在定义的路线下提供路径内容（可能有多个定义）
- `--spa` - 将请求从/ abc 转换为/＃/ abc（适用于单页面应用程序）
- `--wait=MILLISECONDS` - （默认 100ms）等待所有更改，然后重新加载
- `--htpasswd=PATH` - 启用期待位于 PATH 的 htpasswd 文件的 http-auth
- `--cors` - 为任何来源启用 CORS（反映请求源，支持凭证的请求）
- `--https=PATH` - 到 HTTPS 配置模块的路径
- `--proxy=ROUTE:URL` - 代理 ROUTE 到 URL 的所有请求
- `--help | -h` - 显示简短的使用提示和退出
- `--version | -v` - 显示版本和退出
