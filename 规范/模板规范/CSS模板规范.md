# css 基本模板规范

[TOC]

如下是 less 模板规则的介绍，一些基本通用模板代码在同目录的 [`common.less`](./common.less) 中

- 目前项目开发一般使用 `less` 来快速开发（也可以使用 `sass` 开发，根据个人喜好选择）
  - `less`
    - [less 官网](http://lesscss.org/)
    - [less github](https://github.com/less)
    - [less 中文网](http://www.css88.com/doc/less/)
    - [我自己整理的一些比较简单的 less 用法(供参考)](https://github.com/yhb-flydream/Use-Less)
  - `sass`
    - [sass 官网](http://sass-lang.com/)
    - [SASS 中文文档](http://sass.bootcss.com/)
    - [SASS 中文网](https://www.sasscss.com/)
    - []()
    - []()

- 一般会引入 `normalize` 来做一下样式初始化
  - [normalize](http://necolas.github.io/normalize.css/)
  - [normalize github](https://github.com/necolas/normalize.css)
  - [了解更多 normalize](http://nicolasgallagher.com/about-normalize-css/)

- 一个 `less` 文件如果有用到其他 `less` 文件*(比如：`index.less` 文件引用 `common.less(公共样式文件)`)*，则在文件开始部分
  - 用 `@import "common(common 的路径)"` 引入

- 如果有出现比较多频率的属性*(比如：项目主题色，引用的图片路径)*，可以在文件开始部分
  - 用 `@color-default: #xxx;` 表示主题色
  - 用 `@img-url: 'xxx(图片公用路径)'`
  - 此为 `less` 定义变量方式，项目中命名连接符用 `-`，比如：
    - `@color-000: #000;`
    - `@radius: 4px;`

- 涉及到有属性为小数位，且整数位为 0 时，省略前面的 0
  - 比如：`font-size: .6rem;`

- 如果一个元素只有一个属性，也不要写到一行，要保持格式统一

```
/* 不要这样写 */
img {display: inline-block;}

/* 建议这样写 */
img {
  display: inline-block;
}
```

- 嵌套层之间最好能空一行，即使外层没有设置样式，这样是为了查看更清晰

```
.aa {
  color: #000;

  .bb {
    font-size: 16px;
  }
}
```

- 不到万不得已不要使用 `!important` 来进行样式的强制覆盖

- 使用 `WebStorm` 时也有提示，尽量按照提示来写

## 嵌套使用规范

- 嵌套规则尽量按照以下书写
- `xxx` 为项目标记
- `yyy` 为模块名
- 层级结构要清晰，注意空行分割每一块，使结构清晰

```
.xxx-yyy-main {

  .yyy__hd {

  }

  .yyy__bd {

  }

  .yyy__ft {

  }
}

// ------------------------------------------
.xxx-yyy-main {

  .yyy__lt {

  }

  .yyy__ct {

  }

  .yyy__rt {

  }
}
```

- **同目录的 `common.less` 里面是项目可能使用到的一些基础样式和公共样式，可以直接拿到项目的 `common.less` 文件中 `注意：单位的转换(PC 版一般使用 px 单位)(mobile 版一般用 rem 单位)`** *[以后如果有单位的变换（如：使用vw）再做修改]*