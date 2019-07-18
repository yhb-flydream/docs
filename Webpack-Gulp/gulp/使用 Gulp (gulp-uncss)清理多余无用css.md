# 使用 Gulp (gulp-uncss)清理多余无用css

- 新建文件(demo)
  - demo ---> 根目录
  - src ---> 存放原文件（html，css）
  - dist ---> 存放过滤后文件

- 在 demo 下 `npm init -y` 初始化`package.json`文件
- 在 demo 下`npm install gulp-uncss --save-dev`下载依赖文件
- 在 demo 下新建 `gulpfile.js` 并写入下面代码

```javascript
var gulp = require('gulp');
var uncss = require('gulp-uncss');
gulp.task('uncss', function() {
    gulp.src('src/css/origin.css')   //冗余css文件
        .pipe(uncss({
            html: ['src/origin.html']  //使用css的html页面，可多个
        }))
        .pipe(gulp.dest('build/css/uncss')); //输出目录
});
```