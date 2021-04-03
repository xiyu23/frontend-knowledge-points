# webpack

## 一、认识`webpack`

### 1. 概念

**webpack**是一个打包工具，它将`import`、`export`转换后再进行打包，并**不会**修改除此之外的代码。

而那些语法糖式的文件类型，将使用`loaders`来预处理，因为webpack本身只认识`.js`、`.json`。

> With that said, let's run `npx webpack`, which will take our script at `src/index.js` as the entry point, and will generate `dist/main.js` as the output.
> 
> Note that ***webpack will not alter any code other than `import` and `export` statements***. If you are using other ES2015 features, make sure to use a transpiler such as Babel or Bublé via webpack's loader system.

--2019.08.15--
1. webpack.config.js配置文件
entry: webpack从哪里开始构建依赖图
loaders: webpack本身只能识别.js/.json文件，loaders可以用来处理其他类型的文件。定义在module.rules数组中。loaders的执行顺序是从最后一个开始，依次执行到数组开头。像一个pipe chain，一个处理完的结果输出给下一个loader处理。
plugins: bundle优化等用处
mode: webpack内置优化级别，默认为production。可选development, none, production。


2. webpack module之间的引用可以通过以下方式来表现
import [ES6]
require() [CommonJS]
define&require [AMD]
@import [css/sass/less]
url(...), <img src=...> [image url]

3. 

### 2. 开始上手

## 二、基础概念

### 1. `version`

ref: https://github.com/npm/node-semver#versions

`package.json`中关于依赖的版本号例如：

```js
"dependencies": {
    "@tencent/wemeet-js-bridge": "2.0.7",
    "@zeit/next-less": "^1.0.1",
    "classnames": "^2.2.6",
}
```

- `v2.0.0`、`=2.0.1`，版本号开头的`=`或`v`会被过滤，不写也可以
- 
