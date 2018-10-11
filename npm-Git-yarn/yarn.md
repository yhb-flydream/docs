# yarn

> 快速、可靠、安全的依赖管理。

[yarn github](https://github.com/yarnpkg/yarn)
[yarn 中文官网](https://yarnpkg.com/zh-Hans/)

## 特点

- 极其快速
  - Yarn 会缓存它下载的每个包，所以无需重复下载。它还能并行化操作以最大化资源利用率，安装速度之快前所未有。
- 特别安全
  - Yarn会在每个安装包被执行前校验其完整性。
- 超级可靠
  - Yarn 使用格式详尽而又简洁的 lockfile文件 和确定性算法来安装依赖，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。

## 安装

[三种安装方式](https://yarnpkg.com/zh-Hans/docs/install)

## 使用

### 初始化

```bash
yanr init
```

### 添加依赖包

```bash
yanr add [package]
yanr add [package]@[varsion]
yanr add [package]@[tag]
```

- `varsion` 包的版本号
- `tag` 可以指定添加包的 `beta` 版本

### 将依赖项添加到不同依赖项类别

```bash
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

- `dev` 将依赖项添加到 `devDependencies`
- `peer` 将依赖项添加到 `peerDependencies`
- `optional` 将依赖项添加到 `optionalDependencies`

### 升级依赖包

```bash
yarn upgrade [package]
yarn upgrade [package]@[varsion]
yarn upgrade [package]@[tag]
```

### 移除依赖包

```bash
yarn remove [package]
```

### 安装全部依赖项

```bash
yarn

或

yarn install
```

## 简单使用（Yarn 工作流）

### 创建一个新项目

在一个项目的根目录中执行

```bash
yarn init
```

将打开一个用于创建Yarn项目的交互式表单，将会包含一些关于此项目的基本信息问题，可以回答来完善项目，也可以直接敲回车(enter/return)使用默认或留空，以后再完善

或者执行以下命令自动初始化

```bash
yarn init -y
```

现在应该创建了一个和下面文件内容类似的 `package.json`

```json
{
  "name": "demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

### 管理项目依赖

#### 添加项目依赖包

```bash
yarn add [package]

例如：
yarn add jquery
```

`[package]`会被加入到`package.json`文件中的`dependencies`依赖列表，同时`yarn.lock`也会被更新

```json
{
  ...
  "dependencies": {
    "jquery": "^1.0.0"
  }
}
```

使用不同参数可以将包添加到不同依赖列表中

```bash
yarn add jquery --dev  添加 jquery 到 devDependencies
yarn add jquery --peer  添加 jquery 到 peerDependencies
yarn add jquery --optional  添加 jquery 到 optionalDependencies
```

还可以指定添加包的某个版本

```bash
yarn add [package]@[version]
yarn add [package]@[tag]

例如：
yarn add jquery@1.11.1
yarn add jquery@beta
```

`[version]` 或 `[tag]` 会被添加到 `package.json`，并在安装依赖时被解析

#### 更新依赖包

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

### 删除依赖包

```bash
yarn remove [package]
```

### 安装依赖项

如果刚从版本控制系统里 `checkout` 一个包，则需要为其安装依赖

- 安装所有依赖
  - `yarn` 或 `yarn install`
- 安装一个包的单个版本
  - `yarn install -flat`
- 强制重新下载所有包
  - `yarn install -force`
- 只会安装生产环境依赖
  - `yarn install --production`

### 配合版本控制

为了使其他人能够使用你的包，或者能够对其进行后续开发，你需要确保将所有必须的文件提交到你所使用的版本控制系统

- `package.json`：包含包的所有依赖信息；
- `yarn.lock`：记录每一个依赖项的确切版本信息；
- 包实现功能的实际项目代码。

https://yarnpkg.com/zh-Hans/docs