# Learning NPM

- [Learning NPM](#learning-npm)
  - [1. 如何安装一个包](#1-如何安装一个包)
    - [1.1 `npm i`一下是什么意思？](#11-npm-i一下是什么意思)
    - [1.2 安装一个包](#12-安装一个包)
    - [1.3 安装指定`tag`/`version`的包：](#13-安装指定tagversion的包)
    - [1.4 如何查看当前安装的某个`package`的版本？](#14-如何查看当前安装的某个package的版本)
  - [2. 安装到哪儿了？](#2-安装到哪儿了)
  - [3. npm run build](#3-npm-run-build)
  - [4. npm init](#4-npm-init)
    - [4.1 跳过所有问题](#41-跳过所有问题)
    - [4.2 创建基于React的项目](#42-创建基于react的项目)


## 1. 如何安装一个包

用于安装一个*package*。

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

安装到*devDependencies*:

    $ npm install <package> --save-dev
    $ npm install <package> -D

 `-D`是`--save-dev`的缩写。


安装到*dependencies*:

    $ npm install <package> --save
    $ npm install <package> -S

 `-S`是`--save`的缩写。

## 3. npm run build
此命令用于构建生产环境的包。

语法定义:
```js
npm run-script <command> [--silent] [--<args>...]
```
alias（`run-script`直接写为`run`）:
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