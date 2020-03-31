// gulp my tedious workflow!
var gulp = require('gulp');
var ts = require('gulp-typescript');

// 返回一个project，本意是用于如下方式，在task之外创建project
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    // src(): 返回一个包含了.ts源文件的流，这些源文件定义在tsconfig.json（如果有定义这个文件）。等价于 gulp.src(...)
  return tsProject.src() 
    // tsProject(): 等价于ts(options?)，返回一个使用options来编译.ts文件的gulp stream(可以理解为流水线上的一个模块，它处理输入的.ts文件)。tsProject()可以用在task内部，外部的话可以用ts(opitions?)
    // pipe: attaches a Writable stream to the readable, push all of its data to the attached Writable. Return the Writable.
    .pipe(tsProject()) 

    // js是ICompileStream的一个readable stream property，而ICompileStream是一个继承了NodeJS.ReadWriteStream的接口
    .js.pipe(gulp.dest('dist'));
})