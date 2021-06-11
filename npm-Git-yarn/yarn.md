# yarn

[TOC]

> 快速、可靠、安全的依赖管理。

[yarn github](https://github.com/yarnpkg/yarn)
[yarn 中文官网](https://yarnpkg.com/zh-Hans/)

## 特点

- 极其快速
  - Yarn 会缓存它下载的每个包，所以无需重复下载。它还能并行化操作以最大化资源利用率，安装速度之快前所未有。
- 特别安全
  - Yarn 会在每个安装包被执行前校验其完整性。
- 超级可靠
  - Yarn 使用格式详尽而又简洁的 lockfile 文件 和确定性算法来安装依赖，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。

## 安装

[三种安装方式](https://yarnpkg.com/zh-Hans/docs/install)

测试 Yarn 是否安装：

```bash
yarn --version
```

## 使用

### 初始化

```bash
yarn init

OR

yarn init -y
```

### 添加依赖包

```bash
// 添加依赖包
yanr add [package]

// 添加依赖包 @ 指定版本
yanr add [package]@[varsion]

// 添加依赖包 @ 指定 tag
yanr add [package]@[tag]
```

### 将依赖项添加到不同依赖项类别

```bash
// 将依赖项添加到 `devDependencies`
yarn add [package] --dev/-D

// 将依赖项添加到 `peerDependencies`
yarn add [package] --peer/-P

// 将依赖项添加到 `optionalDependencies`
yarn add [package] --optional/-O
```

### 安装选项

- 安装所有依赖
  - `yarn` 或 `yarn install`
- 安装一个包的单一版本
  - `yarn install -flat`
- 强制重新下载所有包
  - `yarn install -force`
- 只会安装生产环境依赖
  - `yarn install --production`

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

## CLI 命令

以下为常用命令及用法，[查看更多命令及用法](https://classic.yarnpkg.com/zh-Hans/docs/cli/)

### yarn add

安装一个包（以及任何它依赖的包）到 `dependencies`

大多数的包会从 [npm registry](https://www.npmjs.com/) 目录里以包名来安装。 例如，`yarn add react` 会从 `npm registry` 里安装 `react` 包。

- `yarn add package-name` 会安装 latest 最新版本。
- `yarn add package-name@1.2.3` 会从 registry 里安装这个包的指定版本。
- `yarn add package-name@tag` 会安装某个 “tag” 标识的版本（比如 beta、next 或者 latest）。
- `yarn add package-name [--exact/-E]` 用 `--exact` 或者 `-E` 会安装包的精确版本。
  - 默认是安装包的主要版本里的最新版本。
  - 比如说， `yarn add foo@1.2.3` 会接受 `1.9.1` 版，但是 `yarn add foo@1.2.3 --exact` 只会接受 `1.2.3` 版
- `yarn add package-name [--tilde/-T]` 用 `--tilde` 或者 `-T` 来安装包的次要版本里的最新版。
  - 默认是安装包的主要版本里的最新版本。
  - 比如说，`yarn add foo@1.2.3 --tilde` 会接受 `1.2.9`，但不接受 `1.3.0`。

可以指定不同路径的包：

- `yarn add package-name` 从 `npm registry` 里安装包，除非你在 `package.json` 指定了其它 `registry`。
- `yarn add file:/path/to/local/folder` 从本地文件系统里安装一个包，可以用这种方式来测试还未发布的包。
- `yarn add file:/path/to/local/tarball.tgz` 安装一个 `gzipped` 压缩包，此格式可以用于在发布之前分享你的包。
- `yarn add <git remote url>` 从远程 `git repo` 里安装一个包。
- `yarn add <git remote url>#<branch/commit/tag>` 从一个远程 `git` 仓库指定的 `git` 分支、`git` 提交记录或 `git` 标签安装一个包。
- `yarn add https://my-project.org/package.tgz` 用一个远程 `gzipped` 压缩包来安装。

### yarn global

在你的操作系统上全局安装包。

`yarn global <add/bin/list/remove/upgrade> [--prefix]`

是一个命令前缀，可用于 `add、bin、list` 和 `remove` 等命令。
它们的行为和他们的普通版本相同，只是它们用一个全局目录来存储包。 该 `global` 命令显示为您准备的可执行文件的位置。

**注意：**

- 不像 `npm` 里的 `--global` 标志，`global` 是一个必须跟在 `yarn` 后面的命令。
- 输入 `yarn add global package-name` 会把名为 `global` 和 `package-name` 的包添加到本地，而非全局添加 `package-name`。

### yarn bin

将打印 `yarn` 将把你的包里可执行文件安装到的目录。 一个可执行文件的例子也许是一个你定义在你的包里的，可以通过 `yarn run` 可执行脚本。

### yarn init [-y]

这个命令通过交互式会话带你创建一个 `package.json` 文件。 一些默认值比如 `license` 和初始版本可以在 `yarn` 的 `init-*` 配置里找到。

### yarn install

[yarn install](https://classic.yarnpkg.com/zh-Hans/docs/cli/install)

用于安装一个项目的所有依赖。 这个命令最常见的使用场景是在你刚 Check out 一份项目代码之后，或者在你需要使用其他开发者新增加的项目依赖的时候。

执行不带任何命令的 `yarn`，等同于执行 `yarn install`，并透传所有参数。

### yarn list

列出已安装的包。

### yarn login

存储 `registry` 用户名和 `email`。

运行此命令会提示你输入你 `npm registry` 的用户名和 `email`。
它不会要求你提供密码。 之后当你运行像 `yarn publish` 这样的命令请求验证时，你必须输入密码才能做。

### yarn logout

清除 `registry` 用户名和 `email`。

这将移除你用 `yarn login` 保存给 `npm registry` 的用户名和 `email`。 你需要运行这个来解除认证，`registry actions` 单独认证。

### yarn remove

从你的直接依赖里移除依赖包。

运行 `yarn remove foo` 会从你的直接依赖里移除名为 `foo` 的包，在此期间会更新你的 `package.json` 和 `yarn.lock` 文件。
当你移除一个包时，它被从所有类型的依赖里移除：`dependencies`、`devDependencies` 等等。

### yarn run

运行一个定义好的包脚本。

`yarn run dev`

你可以在你的 `package.json` 文件中定义 `dev`。

如果你不指定一个脚本给 `yarn run` 命令，`run` 命令会列出包里所有可运行的脚本。

### yarn upgrade

升级包到它们基于规范范围的最新版本。

```bash
// 升级全部依赖包
yarn upgrade

// 升级指定依赖包
yarn upgrade left-pad

// 升级指定依赖包到指定版本
yarn upgrade left-pad@^1.0.0

// 升级多个指定依赖包
yarn upgrade left-pad grunt

//
yarn upgrade @angular
```

### yarn upgrade-interactive

[yarn upgrade-interactive](https://classic.yarnpkg.com/zh-Hans/docs/cli/upgrade-interactive)

## 从 npm 迁移

CLI 命令比较：

| npm                                   | yarn                          |
| ------------------------------------- | ----------------------------- |
| npm install                           | yarn install                  |
| ---                                   | yarn install --flat           |
| ---                                   | yarn install --har            |
| npm install --no-package-lock         | yarn install --no-lockfile    |
| ---                                   | yarn install --pure-lockfile  |
| npm install [package]                 | yarn add [package]            |
| npm install [package] --save-dev/-D   | yarn add [package] --dev/-D   |
| ---                                   | yarn add [package] --peer     |
| npm install [package] --save-optional | yarn add [package] --optional |
| npm install [package] --save-exact    | yarn add [package] --exact    |
| ---                                   | yarn add [package] --tilde    |
| npm install [package] --global        | yarn global add [package]     |
| npm update --global                   | yarn global upgrade           |
| npm rebuild                           | yarn install --force          |
| npm uninstall [package]               | yarn remove [package]         |
| npm cache clean                       | yarn cache clean [package]    |
| rm -rf node_modules && npm install    | yarn upgrade                  |

## 创建一个包

[参考](https://classic.yarnpkg.com/zh-Hans/docs/creating-a-package)

## 依赖与版本

[参考](https://classic.yarnpkg.com/zh-Hans/docs/dependencies)

### 依赖的类型

- `dependencies` 这是所谓的常规依赖，确切地说，是代码运行时所需要的（比如 React 和 immutableJS）。
- `devDependencies` 这是开发依赖，就是那些只在开发过程中需要，而运行时不需要的依赖（比如 Babel 和 Flow）。
- `peerDependencies` 这是“同伴依赖”，一种特殊的依赖，在发布包的时候需要。
  - 有这种依赖意味着安装包的用户也需要和包同样的依赖。 这对于像 react 这样也被人安装的、需要单一 react-dom 副本的包很有用。
- `optionalDependencies` 这是可选依赖，意味着依赖是……可选的。这种依赖即便安装失败，Yarn 也会认为整个依赖安装过程是成功的。
  - 这种类型适用于那些即便没有成功安装可选依赖，也有后备方案的情况（比如 Watchman）。
- `bundledDependencies` 这是“打包依赖”，在发布包时，这个数组里的包都会被打包（Bundle）。
  - 这种类型的依赖应该在项目内部使用，基本上和普通依赖相同。执行 yarn pack 同样会进行打包。
  - 普通依赖通常从 npm registry 安装，这些情况下，打包依赖比普通依赖更好用：
    - 当你想使用一个不在 npm registry 里的，或者被修改过的第三方库时；
    - 当你想把自己的项目作为模块来重用时；
    - 当你想和你的模块一起发布一些文件时。
