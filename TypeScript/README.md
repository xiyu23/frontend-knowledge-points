2020.03.19 奋进计划：ts学习
其中可能会衍生出其它的知识点，比如gulp、webpack等。

知识笔记: notes.txt

ts: https://www.typescriptlang.org/docs/home.html

### 1. npm
Install the dependencies in the local node_modules folder.

    npm install

In global mode, it installs the current package context (ie, the current working directory) as a global package.

    npm install -g

By default, npm install will install all modules listed as dependencies in `package.json`.

With the **--production** flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in **devDependencies**.

### 2. npm的选项

npm install saves any specified packages into dependencies by default. Additionally, you can control where and how they get saved with some additional flags:

安装的package将出现在dependencies，这是默认选项。

    npm i -P
    npm i --save-prod

安装的package将出现在devDependencies。

    npm i -D
    npm i --save-dev

安装的package不保存到dependencies.

    npm i --no-save

