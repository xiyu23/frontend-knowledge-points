// gulp my tedious workflow!
// lesson4: using uglify.js to compact output js
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

// 把paths.pages文件copy到dist目录下
gulp.task('copy-html', function () {
  return gulp.src(paths.pages)
      .pipe(gulp.dest('dist'));
});

// copy-html task完成后，执行browserify这个动作
gulp.task('default', gulp.series(gulp.parallel('copy-html'), function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle() // bundle all shits into a single javascript file
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'));
}));


// lesson3: using browserify to bundle modules
/*
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var fancy_log = require('fancy-log');
var tsify = require('tsify');
var paths = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', function(){
  return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

function bundle() {
  return watchedBrowserify
      .bundle() // bundle all shits into a single javascript file
      .on('error', fancy_log)
      .pipe(source('bundle.js')) // name our output as 'bundle.js'
      .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);
*/

/*gulp.task('default', gulp.series(gulp.parallel('copy-html'), function() {
  return browserify({
    basedir: '.',
    debug: true, // tsify会在打包后的js文件中产生source map
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle() // bundle all shits into a single javascript file
  .pipe(source('bundle.js')) // name our output as 'bundle.js'
  .pipe(gulp.dest('dist'));
}));
*/

/*var gulp = require('gulp');
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
})*/