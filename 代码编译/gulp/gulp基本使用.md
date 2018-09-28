# Gulp--项目构建
> 是指项目上线之前对项目源代码进行一系列处理，使其以最佳的形式运行于线上服务器
> Gulp是基于NodeJS开发的一个构建工具，借助gulp插件可以实现不同的构建任务，其以简洁的配置和卓越的性能成为目前主流的构建工具
> 通过require可以引入一个NodeJS的包（模块），其作用类似于浏览器中的script标签引入资源，被引入的包存放在node_modules目录下

[TOC]

**常见处理包括以下几方面：**
- 1、模块化开发可以实现功能的复用并解决模块间的依赖关系，但带来好处的同时也使得功能代码的碎片化（若干文件）程度增加。
- 2、使用less、sass等预处理器，可以降低CSS的维护成本，最终需要将这些预处理器编译成css文件；
- 3、对静态资源（css、js、html、images）压缩合并可以提升网页打开速度，提高性能；

**构建工具：**
- 构建工具是指通过一系简单配置就可以帮我们实现合并、压缩、校验、预处理等一系列任务的软件工具
- Grunt、Gulp、F.I.S（百度出品）、webpack


### Gulp执行步骤
- **首先要有全局的Gulp，便于执行任务**
- 1、本地安装gulp
  - 进入`项目根目录`执行`npm install gulp --save-dev`**（添加--save-dev会在package.json记录依赖关系）**。
- 2、任务清单
  - 在项目根目录中创建`gulpfile.js`，gulp会参考这个配置文件执行构建任务
  - `gulpfile`文件是gulp工具规定，不能更改名字
```
// 引入gulp
var gulp = require("gulp");
gulp.task("default", function(){ //default为任务名
  // 定义任务
});
```

- 3、定义任务：
  - 在`gulpfile.js`定义构建任务，如压缩、合并等
  - **gulp是通过调用插件来完成具体构建任务的**，并且这些插件也都基于Nodejs
  - **以编译LESS为例，安装`npm install gulp-less`**
```
var gulp = require('gulp'),
  less = require("gulp-less");
gulp.task('less', function() {
  return gulp.src('./public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});
如上定义了一个名称为less的任务，用来完成less编译成css的任务
```

- 4、执行任务：
  - 项目根目录下打开命令行窗口，执行命令 `gulp less`
  - LESS文件便会编译成CSS文件，并保存在了`./public/css`目录下


### Gulp API
> 引入gulp包（模块）后返回一个对象（习惯赋值给变量gulp），通过该对象提供的方法（API）完成任务的配置

#### `gulp.task()` 定义各种不同的任务
- 三个参数
  - 第一个参数 是**任务名**
  - 第二个参数 是**数组**用于`处理依赖`（可省略）
  - 第三个参数 是一个**回调函数**，用于定义具体任务
```
gulp.task('任务名', ['依赖1', '依赖2', ...], function(){
  //定义任务
  //gulp.src('./public/less/**/*.js')
});
```

#### `gulp.src()` 需要构建资源的路径
- 字符串或数组（可以正则方式书写）
  - 通配符路径匹配示例：
    - `“src/a.js”`：指定具体文件；
    - `“*”`：匹配所有文件    例：`src/*.js`(包含src下的所有js文件)；
    - `“**”`：匹配0个或多个子文件夹    例：`src/**/*.js`(包含src的0个或多个子文件夹下的js文件)；
    - `“{}”`：匹配多个属性    例：`src/{a,b}.js`(包含a.js和b.js文件)  `src/*.{jpg,png,gif}`(src下的所有jpg/png/gif文件)；
    - `“!”`：排除文件    例：`!src/a.js`(不包含src下的a.js文件)；
```
gulp.task('任务名', ['依赖1', '依赖2', ...], function(){
  //需要编译的js
  gulp.src('./public/less/**/*.js')
});
```

#### `gulp.pipe()` 管道，将需要构建的资源“输送”给插件
```
gulp.task('任务名', ['依赖1', '依赖2', ...], function(){
  //需要编译的js
  gulp.src('./public/less/**/*.js')
      // 将src获取到的资源传输给less插件
    .pipe(less())
});
```

#### `gulp.dest()` 构建任务完成后资源存放的路径（会自动创建）
```
gulp.task('任务名', ['依赖1', '依赖2', ...], function(){
  //需要编译的js
  gulp.src('./public/less/**/*.js')
      // 将src获取到的资源传输给less插件
    .pipe(less())
    // 存储被插件编译好的文件
    .pipe(gulp.dest('./public/js'))
});
```

#### `gulp.watch()`通过监视某静态资源的修改，然后可以调用相应任务



### 常用Gulp插件
|插件|作用|
|---|---|
|gulp-less|编译LESS文件|
|gulp-autoprefixer|添加CSS私有前缀|
|gulp-cssmin|压缩CSS|
|gulp-rname|重命名|
|gulp-imagemin|图片压缩|
|gulp-uglify|压缩Javascript|
|gulp-concat|合并|
|gulp-htmlmin|压缩HTML|
|gulp-rev|添加版本号|
|gulp-rev-collector|内容替换|
|gulp-useref||
|gulp-if||

### gulp 应用实例
```
// 定义
// 使用本地安装的 gulp 进行定义
// 先引入
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

// gulp 就是一个对象，并且有若干方法

// gulp.task() 定义一个任务
gulp.task('css', function () {
  // 具体任务
  gulp.src('./public/less/main.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(rev())
    .pipe(gulp.dest('./release/public/css'))
    // 用来收集改名前和改名后的对应关系
    .pipe(rev.manifest())
    // 将收集来的改名前和改名后的对应关系存起来
    .pipe(rename('css-mainfest.json'))
    .pipe(gulp.dest('./release/rev'));
});

// gulp.task 定义任务
// gulp.src 查找资源
// gulp.pipe 管道传输（调用插件）
// gulp.dest 存储资源
// gulp.watch 监视

// 比如需要实时将less转成css
gulp.task('abc', function () {
  gulp.watch('./public/less/*.less', ['css']);
});

// 处理图片
// global
gulp.task('image', function () {
  gulp.src(['./public/images/**/*', './uploads/*'], {base: './'})
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./release/'))
    .pipe(rev.manifest())
    .pipe(rename('image-manifest.json'))
    .pipe(gulp.dest('./release/rev'));
});

// 处理js
gulp.task('js', function () {
  gulp.src(['./scripts/*.js', './bower_components/**/*.js'], {base: './'})
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./release'));
});

// 处理html
gulp.task('html', function () {
  gulp.src(['./index.html', './views/*.html'], {base: './'})
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('./release'));
});

// 替换路径
gulp.task('rev', function () {
  gulp.src(['./release/rev/*.json', './index.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./release'));
});

// useref
gulp.task('useref', function () {
  // 文件合并并替路径
  gulp.src('./index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', rev()))
    .pipe(gulp.dest('./release/demo/abc'))
    .pipe(rev.manifest())
    .pipe(rename('js-manifest.json'))
    .pipe(gulp.dest('./release/rev'));
});
```