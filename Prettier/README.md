
## 1、搭环境

### 1.1、安装`prettier`

    $ yarn add --dev --exact prettier

### 1.2、配置文件

  1. `.prettierrc.json`
  
    工程目录下创建此文件，内容为一个空对象：
    $ echo {} > .prettierrc.json

  2. `.prettierignore`

    在创建此文件，表示哪些文件不需要格式化：
    $ echo build > .prettierignore

### 1、3 格式化一个文件试试

    $ yarn prettier --write myfile.js # 格式化当前目录下的myfile.js文件
    $ yarn prettier --write "dir/src/*.js" # 格式化所有dir/src目录下的js文件
    $ yarn prettier --write dir/ # 格式化dir目录
    $ yarn prettier --write . # 格式化当前目录
    $ yarn prettier --check . # 类似于write，但是它仅仅是检查哪些文件已经被格式化过，并不会执行格式化

ps. 默认安装好后，发现它有这些行为：

  1. 文件末尾自动+一行
  2. 多行表达式对象，最后一个key-value后面会+逗号
  3. 

## 2、多行表达对象

prettier在格式化一个对象时，根据`{`和第一个key之间是否存在换行符来确定格式化方式。

`{`和第一个key之间没有换行，则对象会被放置在一行来表达：

```js
const obj = { name: 'yuhui', 
age: 29 };

// will be prettied into
const obj = { name: 'yuhui', age: 29 };
```

`{`和第一个key之间有换行，则对象会被放置在多行来表达：

```js
const obj = {
  name: 'yuhui', age: 29, mood: 'not good', reason: 'i dont know why my wife always get angry with me' };

// will be prettied into
const obj = {
  name: 'yuhui',
  age: 29,
  mood: 'not good',
  reason: 'i dont know why my wife always get angry with me',
};
```

## 3、多行对象尾部增加逗号

