# Learning NPM

- [Learning NPM](#learning-npm)
  - [1. 如何安装一个包](#1-如何安装一个包)
    - [1.1 `npm i`一下是什么意思？](#11-npm-i一下是什么意思)
    - [1.2 安装一个包](#12-安装一个包)
    - [1.3 安装指定`tag`/`version`的包：](#13-安装指定tagversion的包)
    - [1.4 如何查看当前安装的某个`package`的版本？](#14-如何查看当前安装的某个package的版本)
  - [2. 安装到哪儿了？](#2-安装到哪儿了)
    - [2.1 `dependencies`和`devDependencies`的区别](#21-dependencies和devdependencies的区别)
  - [3. npm run build](#3-npm-run-build)
  - [4. npm init](#4-npm-init)
    - [4.1 跳过所有问题](#41-跳过所有问题)
    - [4.2 创建基于React的项目](#42-创建基于react的项目)
  - [5. 如何发布一个包](#5-如何发布一个包)
  - [6. `npm link`](#6-npm-link)
  - [7. `exports` in package.json](#7-exports-in-packagejson)


## 1. 如何安装一个包

NPM就是一个包管理器，可下载别人的包，也可以上传自己的包供他人使用。

什么是包(*package*)：

> A package is a folder containing a program described by a `package.json` file

### 1.1 `npm i`一下是什么意思？

在工作目录下执行此命令，npm会读取当前目录下`package.json`文件，将*dependencies*字段所列出的依赖包安装到当前目录下的`node_modules`文件夹中。

### 1.2 安装一个包

    $ npm install <package>
    $ npm i <package>

如：
    
    $ npm install react-dom

### 1.3 安装指定`tag`/`version`的包：

    $ npm install [<@scope>/]<name>@<tag>
    $ npm install [<@scope>/]<name>@<version>
  
如：
    
    $ npm install @tencent/tea-component@latest
    $ npm install @tencent/tea-component@beta
    $ npm install @tencent/tea-component@1.5.0

注意！这里将会从**scope**所关联的*registry*下载指定包。

### 1.4 如何查看当前安装的某个`package`的版本？

```bash
$ npm list <package>
```

如：

```bash
$ npm list @tencent/wemeet-idea-editor
nextone@0.1.0 D:\code\nextMeeting
 -- @tencent/wemeet-idea-editor@1.0.2 
```
## 2. 安装到哪儿了？

默认添加到`package.json`中的*dependencies*字段。

具体安装到哪儿，可以通过CLI参数指定。

安装到*devDependencies*:

    $ npm install <package> --save-dev
    $ npm install <package> -D

 `-D`是`--save-dev`的缩写。


安装到*dependencies*:

    $ npm install <package> --save
    $ npm install <package> -S

 `-S`是`--save`的缩写。

### 2.1 `dependencies`和`devDependencies`的区别




## 3. npm run build
此命令用于构建生产环境的包。

语法定义:
```js
npm run-script <command> [--silent] [--<args>...]
```
也可简写为（`run-script`直接写为`run`）:
```js
npm run <command> [--silent] [--<args>...]
```

含义：
执行`*.package.json`中`scripts`对象所定义的某个脚本。

比如`env`是`built-in`脚本，用于列举出环境变量(脚本中也可以用到)。


## 4. npm init

创建一个`package.json`文件。
### 4.1 跳过所有问题

    npm init -y

You can also use `-y`/`--yes` to skip the questionnaire altogether.

### 4.2 创建基于React的项目

    npm init react-app ./my-react-app

这个会用npm包***create-***`react-app`来初始化项目，`npx`将会安装这个包，并在安装完成后运行它(have its main bin executed)。

实际上**init**命令将会转换成npx来执行的：

    npm init foo -> npx create-foo
    npm init @usr/foo -> npx @usr/create-foo
    npm init @usr -> npx @usr/create

## 5. 如何发布一个包

1. 创建一个文件夹(比如`apple`)
   
    ```bash
    $ mkdir apple
    ```

2. 初始化包

    ```bash
    $ npm init
    ```

3. 写代码

    ```js
    // 这是你的事情
    ```



## 6. `npm link`

在当前包目录下，创建一个全局符号链接(symbol link)，即全局*node_modules/*目录下的这个包，就会指向当前目录。

```bash
$ npm link
```

而后在你需要用到这个包的工作目录下，来引用全局的这个包。

```bash
$ npm link [my-packagename]
$ npm link funny-package
```

这样就构成了一个引用链条：

使用方目录使用这个包 -> 全局包 -> 局部包文件夹

每当修改局部包的时候，不用重新构建使用方。

**注意事项**：

1. **Node**不支持ES6的`import`/`export`语法，这个是ES6的，而不是**Node**的，你需要用`require`，或者`babel`来构建。
   
```js
module.exports = {
  foo,
  bar,
};
```

```js
const { foo, bar } = require('somepath');
```

安装`babel`：
```bash
$ npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

为了让node能够执行，首先我们要用babel将es6语法转换一下。

先配置babel：

```json
// .babelrc (babel的配置文件)
{
  "presets": ["@babel/preset-env"]
}
//
```

增加一个脚本`build`，用babel做转换：

```json
// package.json (项目工程包管理文件)
"scripts": {
  "build": "babel index.js -d dist", // 构建
  "start": "npm run build && node dist/index.js" // 构建并执行，一句命令搞定
},
```

## 7. `exports` in package.json
1. 使得在package包里面，自己可以通过引用包名来import定义了的exports。这种方式定义的exports叫做 *subpath exports*
2. 使用包名加路径的方式import，这种导入形式叫做 *Self-referencing*
3. 必须定义`exports`才可以*Self-referencing*
```json
// package.json
{
  "name": "mypackage",
  "exports": {
    ".": "./index.mjs", // 默认.为包的根目录
    "./foo.js": "./src/foo.js" // subpath export
  }
} 
```

```js
// load node_modules/mypackage/src/foo.js
import { someVar } from "mypackage/foo.js"
```