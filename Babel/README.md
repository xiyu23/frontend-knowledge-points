## 1、到底用哪个配置文件？

两种类型文件：

- `babel.config.json`  
  单独一个仓库(monorepo)，或希望编译`node_modules`
- `.babelrc.json`(可简写为`.babelrc`)  
  只对工程的某一部分应用

注意，上述两种类型的文件，可以有不同类型的后缀：

- `.json`  
  **推荐**，静态文件有利于编译缓存，加速
- `.cjs`  
  当需要写js时用，CommonJS语法，并以`module.exports`导出配置
- `.mjs`  
  当需要写js时用，原生ECMA语法，以`export`导出配置
- `.js`  
  当`package.json`包含`type: module`选项时，等价于`.mjs`；否则等价于`cjs`



### Tips:

配置文件都有个后缀`rc`，这是什么？

在unix系统中，代表`run commands`，是一种命名约定。

- `.babelrc`
- `.eslintrc`
- `.vimrc`



## 2、

preset-env will transform all ES2015-ES2020 code to be ES5 compatible.

## 3、

