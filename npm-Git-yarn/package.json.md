# package.json

[TOC]

参考
[《JavaScript 标准参考教程（alpha）》，by 阮一峰 package.json文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
[重新认识 package.json](https://juejin.im/post/5ebcd8b1e51d454dc20dd8a0)

[npm package.json](https://docs.npmjs.com/files/package.json)

[yarn package.json](https://yarnpkg.com/zh-Hans/docs/package-json)

## 介绍

- 每个项目的根目录下面，一般都有一个`package.json`文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。
- `npm install` 或 `yarn install`命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。
- 是一个`JSON`对象，该对象的每一个成员就是当前项目的一项设置

### 完整示例

```json
{
  "name": "Hello World",
  "version": "0.0.1",
  "author": "张三",
  "description": "第一个node.js程序",
  "keywords": ["node.js", "javascript"],
  "repository": {
    "type": "git",
    "url": "https://path/to/url"
  },
  "license": "MIT",
  "engines": { "node": "0.10.x" },
  "bugs": { "url": "http://path/to/bug", "email": "bug@example.com" },
  "contributors": [{ "name": "李四", "email": "lisi@example.com" }],
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "latest",
    "mongoose": "~3.8.3",
    "handlebars-runtime": "~1.0.12",
    "express3-handlebars": "~0.5.0",
    "MD5": "~1.2.0"
  },
  "devDependencies": {
    "bower": "~1.2.8",
    "grunt": "~0.4.1",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-jshint": "~0.7.2",
    "grunt-contrib-uglify": "~0.2.7",
    "grunt-contrib-clean": "~0.5.0",
    "browserify": "2.36.1",
    "grunt-browserify": "~1.3.0"
  }
}
```

## 初始化 `package.json`

```bash
npm init | npm init -y

或

yarn init | yarn init -y
```

不带 `-y` 初始化时需要手动填写确认一些基本字段的值，带参数表示使用默认配置

## 字段说明

### `name`

项目名称也是包的名字，它在 `URL` 中、作为命令行参数、作为 `node_modules` 里的目录名使用

- 规则

  - 必须少于或等于 `214` 个字符（对于限定域的包来说包括 `@scope/`）。
  - 不能以句点 (`.`) 或者下划线 (`_`) 开头。
  - 名字里不能有`大写字母`。
  - 必须只使用 `URL` 安全的字符。

- **Tips**
  - 不要使用和 `Node.js` 核心模块相同的名字。
  - 不要在名字里包含 `js` 或者 `node` 单词。
  - 短小精悍，让人看到名字就大概了解包的功能，记住它也会被用在 `require()` 调用里。
  - 保证名字在 `registry` 里是唯一的

可以执行以下命令查看模块名是否已经被使用或者查看该模块的一些基本信息：

```bash
npm view <packageName>
```

### `version`

项目版本号（**`大版本.次要版本.小版本`**）

npm 包中的模块版本都需要遵循 SemVer 规范，该规范的标准版本号采用 `X.Y.Z` 的格式，其中 `X`、`Y` 和 `Z` 均为**非负的整数，且禁止在数字前方补零**：

- `X` 是主版本号(major)：修改了不兼容的 API
- `Y` 是次版本号(minor)：新增了向下兼容的功能
- `Z` 为修订号(patch)：修正了向下兼容的问题

当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，我们可能要先发布一个*先行版本*。

先行版本号可以加到 `主版本号.次版本号.修订号` 的后面，通过 - 号连接一连串以句点分隔的标识符和版本编译信息：

- 内部版本(alpha)
- 公测版本(beta)
- 正式版本的候选版本rc（即 Release candiate）

可以执行以下命令查看模块的版本：

```bash
npm view <packageName> version # 查看某个模块的最新版本
npm view <packageName> versions # 查看某个模块的所有历史版本
```

### `description`

项目描述

```json
{
  "description": "项目或者包的简短描述"
}
```

### `keywords`

项目关键字

```json
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```

### `license`

指定许可证

```json
{
  "license": "MIT",
  "license": "(MIT or GPL-3.0)",
  "license": "SEE LICENSE IN LICENSE_FILENAME.txt",
  "license": "UNLICENSED"
}
```

所有包都应该指定许可证，以便让用户了解他们是在什么授权下使用此包，以及此包还有哪些附加限制

**license 字段必须是以下之一：**

- 如果你使用标准的许可证，需要一个有效地 [SPDX 许可证标识](https://spdx.org/licenses/)
- 如果你用多种标准许可证，需要有效的 [SPDX 许可证表达式 2.0 语法表达式](https://www.npmjs.com/package/spdx)
- 如果你使用非标准的许可证，一个 `SEE LICENSE IN <文件名>` 字符串指向你的包里顶级目录的一个 `<文件名>`
- 如果你不想在任何条款下授权其他人使用你的私有或未公开的包，一个 `UNLICENSED` 字符串

### `homepage`

包的项目主页或者文档首页

```json
{
  "homepage": "https://your-package.org"
}
```

### `bugs`

问题反馈系统的 `URL`，或者是 `email` 地址之类的链接。别人可以通过该途径反馈问题

```json
{
  "bugs": "https://github.com/user/repo/issues"
}
```

### `repository`

代码托管的位置

```json
{
  "repository": { "type": "git", "url": "https://github.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

### `author`

项目的维护者，一个人信息

```json
{
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "http://your-website.com"
  },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```

### `contributors`

贡献者信息，可能很多人

```json
{
  "contributors": [
    { "name": "Your Friend", "email": "friend@example.com", "url": "http://friends-website.com" }
    { "name": "Other Friend", "email": "other@example.com", "url": "http://other-website.com" }
  ],
  "contributors": [
    "Your Friend <friend@example.com> (http://friends-website.com)",
    "Other Friend <other@example.com> (http://other-website.com)"
  ]
}
```

### `files`

描述我们使用 `npm publish` 命令后推送到 npm 服务器的文件列表，如果指定文件夹，则文件夹内的所有内容都会包含进来，以及项目的入口文件

```json
{
  "files": ["filename.js", "directory/", "glob/*.{js,json}"]
}
```

### `directories`

当包安装时，你可以指定确切的位置来放二进制文件、man pages、文档、例子等

```json
{
  "directories": {
    "lib": "path/to/lib/",
    "bin": "path/to/bin/",
    "man": "path/to/man/",
    "doc": "path/to/doc/",
    "example": "path/to/example/"
  }
}
```

### `scripts`

指定了运行脚本命令的`npm 或 yarn`命令行缩写，比如`start`指定了运行`npm run start`时，所要执行的命令

如下的设置指定了`npm run preinstall`、`npm run postinstall`、`npm run start`、`npm run test`时，所要执行的命令

```json
"scripts": {
  "preinstall": "echo here it comes!",
  "postinstall": "echo there it goes!",
  "start": "node index.js",
  "test": "tap test/*.js"
}
```

### `dependencies` 和 `devDependencies`

- `dependencies`指定了**项目运行**所依赖的模块（生产环境使用）
- `devDependencies`指定了**项目开发**所需要的模块（开发环境使用）

它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围

```json
{
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  }
}
```

**对应的版本可以加上各种限定，主要有以下几种**

- **指定版本**：比如 1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
- **波浪号（tilde）+指定版本**：比如~1.2.2，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装- 1.3.x，也就是说安装时不改变大版本号和次要版本号。
- **插入号（caret）+指定版本**：比如 ˆ1.2.2，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为 0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
- **latest**：安装最新版本。

将依赖模块写入 `dependencies` 和 `devDependencies` 有不同的命令

- `npm install vue --save` 或 `npm i vue --S` 表示将该模块写入`dependencies`属性字段
- `npm install vue --save-dev` 或 `npm i vue --D` 表示将该模块写入`devDependencies`属性字段

### `peerDependencies`

有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖 A 模块和 B 模块的 1.0 版，而 A 模块本身又依赖 B 模块的 2.0 版。

大多数情况下，这不构成问题，B 模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。

最典型的场景就是插件，比如 A 模块是 B 模块的插件。用户安装的 B 模块是 1.0 版本，但是 A 插件只能和 2.0 版本的 B 模块一起使用。这时，用户要是将 1.0 版本的 B 的实例传给 A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果 A 和 B 一起安装，那么 B 必须是 2.0 模块。

`peerDependencies`字段，就是用来供插件指定其所需要的主工具的版本

```json
{
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}
```

上面代码指定，安装`chai-as-promised`模块时，主程序`chai`必须一起安装，而且 chai 的版本必须是 1.x。如果你的项目指定的依赖是 chai 的 2.0 版本，就会报错

**注意，从 npm 3.0 版开始，`peerDependencies` 不再会默认安装了**

### `optionalDependencies`

可选依赖可以用于你的包，但不是必需的。如果可选包没有找到，安装还可以继续

```json
{
  "optionalDependencies": {
    "package-5": "^1.6.1"
  }
}
```

### `bundledDependencies`

打包依赖是发布你的包时将会一起打包的一个包名数组

```json
{
  "bundledDependencies": ["package-4"]
}
```

### `bin`

用过 `vue-cli`，`create-react-app` 等脚手架的朋友们，不知道你们有没有好奇过，为什么安装这些脚手架后，就可以使用类似 `vue create/create-react-app` 之类的命令，其实这和 `package.json` 中的 `bin` 字段有关。

`bin` 字段用来指定各个内部命令对应的可执行文件的位置。当 `package.json` 提供了 `bin` 字段后，即相当于做了一个命令名和本地文件名的映射。

当用户安装带有 `bin` 字段的包时：

- 如果是全局安装，`npm` 将会使用符号链接把这些文件链接到 `/usr/local/node_modules/.bin/`
- 如果是本地安装，会链接到 `./node_modules/.bin/`

举例，如果要使用 `my-app-cli` 作为命令时，可以配置以下 `bin` 字段：

```json
"bin": {
  "my-app-cli": "./bin/cli.js"
}
```

上面代码指定，`my-app-cli` 命令对应的可执行文件为 `bin` 子目录下的 `cli.js`，因此在安装了 `my-app-cli` 包的项目中，就可以很方便地利用 `npm` 执行脚本：

```json
"scripts": {
  "start": "node node_modules/.bin/my-app-cli"
}
```

现在看起来和 `vue create/create-react-app` 之类的命令不太像？原因：

- 当需要 `node` 环境时就需要加上 `node` 前缀
- 如果加上 `node` 前缀，就需要指定 `my-app-cli` 的路径 -> `node_modules/.bin`，否则 `node my-app-cli` 会去查找当前路径下的 `my-app-cli.js`，这样肯定是不对

若要实现像 `vue create/create-react-app` 之类的命令一样简便的方式，则可以在上文提到的 `bin` 子目录下可执行文件 `cli.js` 中的第一行写入以下命令：

```bash
#!/usr/bin/env node
```

这行命令的作用是告诉系统用 node 解析，这样命令就可以简写成 my-app-cli 了

### main

指定了加载的入口文件，`require('moduleName')`就会加载这个文件。
这个字段的默认值是模块根目录下面的`index.js`

### config

用于添加命令行的环境变量

```json
{
  "name": "foo",
  "config": { "port": "8080" },
  "scripts": { "start": "node server.js" }
}
```

然后，在`server.js`脚本就可以引用`config`字段的值

```js
http
  .createServer(...)
  .listen(process.env,npm_package_config_port)
```

用户执行`npm run start`命令时，这个脚本就可以得到值
用户可以改变这个值

```bash
npm config set foo:port 80
```

### private

定义私有模块

一般公司的非开源项目，都会设置 private 属性的值为 true，这是因为 npm 拒绝发布私有模块，通过设置该字段可以防止私有模块被无意间发布出去。

### os

指定模块适用系统或者指定不能安装的系统黑名单（当在系统黑名单中的系统中安装模块则会报错）：

```json
"os": [ "darwin", "linux" ] # 适用系统
"os": [ "!win32" ] # 黑名单
```

> Tips：在 node 环境下可以使用 `process.platform` 来判断操作系统。

### cpu

限制用户安装环境：

```json
"cpu": [ "x64", "ia32" ] # 适用 cpu
"cpu": [ "!arm", "!mips" ] # 黑名单
```

> Tips：在 node 环境下可以使用 process.arch 来判断 cpu 架构。

## 其它字段

### `browser`

指定该模板供浏览器使用的版本。Browserify 这样的浏览器打包工具，通过它就知道该打包那个文件

```json
"browser": {
  "tipso": "./node_modules/tipso/src/tipso.js"
},
```

### `engines`

指明了该模块运行的平台，比如 Node 的某个版本或者浏览器

```json
{ "engines" : { "node" : ">=0.10.3 <0.12" } }

该字段也可以指定适用的npm版本。

{ "engines" : { "npm" : "~1.0.20" } }
```

> 需要注意的是，engines 属性仅起到一个说明的作用，当用户版本不符合指定值时也不影响依赖的安装。

### `man`

指定当前模块的 man 文档的位置

```json
"man": [ "./doc/calc.1" ]
```

### `preferGlobal`

值是布尔值，表示当用户不将该模块安装为全局模块时（即不用–global 参数），要不要显示警告，表示该模块的本意就是安装为全局模块

### `style`

指定供浏览器使用时，样式文件所在的位置。样式文件打包工具 parcelify，通过它知道样式文件的打包位置。

```json
"style": [
  "./node_modules/tipso/src/tipso.css"
]
```
