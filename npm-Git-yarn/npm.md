# npm

[TOC]

> npm（node package manager）nodejs 的包管理器，用于 node 插件管理（包括安装、卸载、管理依赖等）

## 安装`npm`

- 由于 `npm` 安装包集成在 `node` 内，所以安装 `node` 自动会带有 `npm`
- 去 [`node官网`](https://nodejs.org/zh-cn/) 安装

## 检查 `node` 及 `npm` 安装成功

- `node -v`
  - 查看 node 的版本
- `npm -v`
  - 查看 npm 的版本
- 使用 `node -v` 或 `npm -v` 可以在命令行看到版本号就证明已经安装了 `node` 或 `npm`

## 用`npm`安装插件

### `npm init -y` 初始化项目

- 一般在项目中使用 `npm` 安装依赖包时，需要先初始化项目自动生成`package.json`文件，记录已经被安装的安装包

### `npm install <name>` 安装`指定包`

- `npm install jquery` 或简写 `npm i jquery`

### `npm install <name> <name>` 安装`多个包`

- `npm install jquery bootstrap` 或简写 `npm i jquery bootstrap`
- **包之间用空格隔开**

### `npm install <name>@(指定版本号)` 安装指定版本包

- `npm install jquery@1.11.2` 或简写 `npm i jquery@1.11.2`
- **包名与@符号之间无空格**
- **保证版本号正确，否则出错**

### `npm install <name> -g` 全局安装

- `npm istall jquery -g` 或简写 `npm i jquery -g` (`-g` 在包名前后都可 `npm i -g jquery`)
- `-g`：全局安装
- **安装后可以全局访问**

### `npm install <name> --save-dev 或 npm install -D <name>` 在当前开发环境下安装

- `npm install jquery --save-dev` / `npm install -D jquery` 或简写 `npm i jquery --save-dev` / `npm i -D jquery`
- `--save`：将保存配置信息至 `package.json`
- `-dev`：保存至 `package.json` 的 `devDependencies` 节点

### `npm install <name> --save` 在当前生产环境下安装

- `npm install jquery --save` 或简写 `npm i jquery --save`
- `--save`：将保存配置信息至 `package.json` 的 `dependencies` 节点

### `npm uninstall <name> --save-dev` 删除指定包

- `npm uninstall jquery --save-dev`

### `npm uninstall <name> -g --save-dev` 删除全局指定包

- `npm uninstall jquery -g --save-dev`

### 删除全部插件

- 借助`rimraf`
- `npm install rimraf -g`
- 用法：`rimraf node_modules`

### `npm update <name>` 更新插件

- 更新指定：`npm update <name> [-g] [--save-dev]`
  - `npm update jquery -g --save-dev`
- 更新全部：`npm update [--save-dev]`
  - `npm update --save-dev`

### `npm install --production` 或简写 `npm i --production` 下载安装`package.json` 中 `dependencies` 属性对的文件

### `npm install --save-dev` 和 `npm install --save` 区别

- 使用 `--save-dev` 安装的插件，被写入到 `package.json` 中的 `devDependencies` 域里面去 **里面的插件只用于开发环境，不用于生产环境**
- 使用 `--save` 安装的插件，被写入到 `package.json` 中的 `dependencies` 域里面去 **需要发布到生产环境**
  > 比如我们写一个项目要依赖于 jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写入 `dependencies` ；
  >
  > 而我们使用的一些构建工具比如 glup、webpack 这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入 `devDependencies`
