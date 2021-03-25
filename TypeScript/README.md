

- [2. 基本类型的声明](#2-基本类型的声明)
  - [2.1 Boolean](#21-boolean)
  - [2.2 Number](#22-number)
  - [2.3 String](#23-string)
  - [2.4 Array](#24-array)
  - [2.5 Tuple](#25-tuple)
  - [2.6 Enum](#26-enum)
  - [2.7 Unknown vs Any](#27-unknown-vs-any)
  - [2.8 Void](#28-void)
  - [2.9 Never](#29-never)
  - [2.10 Object](#210-object)
  - [2.11 Type Assertions](#211-type-assertions)
  - [2.12 为啥不用大写的，怎么都是小写呢？](#212-为啥不用大写的怎么都是小写呢)
- [3. Interfaces(接口)](#3-interfaces接口)
  - [3.1 声明](#31-声明)
  - [3.2 或有字段](#32-或有字段)
  - [3.3 只读](#33-只读)
- [4、函数](#4函数)
  - [4.1、可选参数](#41可选参数)
- [10.声明抽象类、抽象方法](#10声明抽象类抽象方法)
- [11.类方法、成员默认为`public`](#11类方法成员默认为public)
- [12.如何声明一个不允许被子类覆盖的父类方法？](#12如何声明一个不允许被子类覆盖的父类方法)
- [13. tsconfig.json](#13-tsconfigjson)
- [14. 定义函数类型](#14-定义函数类型)
  - [14.1 方式一：箭头函数赋给变量](#141-方式一箭头函数赋给变量)
  - [14.2 方式二：*function*函数赋给变量](#142-方式二function函数赋给变量)
  - [14.3 方式三：定义function](#143-方式三定义function)
- [15. `type` Aliases](#15-type-aliases)
- [16. `Intersection Types`](#16-intersection-types)
- [17. `.d.ts`文件是什么？](#17-dts文件是什么)
  - [1. npm](#1-npm)
  - [2. npm的选项](#2-npm的选项)

1. TypeScript(微软推出)是javascript的超集，相当于是js的语法糖，好处就是js类型松散，而ts可以是强类型利于编译时静态检查避免出错，另外面向对象方面ts具备面向对象语言的几乎全部特性写起来规范。但.ts需要编译成.js才能运行。

2. 安装TypeScript
$ npm install -g typescript

- 更新typescript

    $ npm update -g typescript

tsc的版本过低(1.0.3)，但是安装的ts却高很多？
检查一下是不是vs安装了ts1.0版本导致，可以去看下PATH，把vs的删掉，以让npm安装的优先级更高。（或许需要重启电脑生效）

## 2. 基本类型的声明

### 2.1 Boolean

```ts
let isDone: boolean = false;
```

### 2.2 Number

ts中`number`要么是*floating point*浮点数，要么是*BigInt*，也支持十六进制、八进制、二进制的写法。

```ts
let decimal: number = 6;
let hex: number = 0xf00d; // 十六进制:0x
let binary: number = 0b1010; // 二进制：0b
let octal: number = 0o744; // 八进制：0o
let big: bigint = 100n; // BigInt：后缀n
```

### 2.3 String

```ts
let greeting: string = 'hello world';
let name: string = 'yuhui';
let hi: string = `hi ${name}`;
```

### 2.4 Array

```ts
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### 2.5 Tuple

元组，多个值放在一起（注意声明后，必须对应的类型相同、个数也要相同）：

```ts
let tuple: [string, number, number];
tuple = ['yuhui', 177, 66]; // correct
tuple2 = ['yuhui', 177, 66]; // incorrect
```

### 2.6 Enum

和C一样，默认从`0`开始，也可以给第一个设置自定义的起始值，也可以为每个都设置好值。

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
```

```ts
enum Color {
  Red = 2,
  Green, // 3
  Blue, // 4
}
```

```ts
// 声明枚举
let c: Color = Color.Red;

// 可以由一个整型去获取对应枚举项的字符串形式，得到"Red"
let d: string = Color[2]; // 注意这里返回的是一个string
console.log(d); // "Red"
```

### 2.7 Unknown vs Any

```ts
let maybe: unknown;
maybe = 4;
maybe = 'hello';
maybe = { a: 1, b: 2 };

let vAny: any;
vAny = 4;
vAny = 'hello';
vAny = { a: 1, b: 2 };
```

啥类型都可能，那和`Any`有啥区别？

相同点：
- 都可以把任何东西赋值给`unknown`或`any`声明的变量

不同点：
- 不能在`unknown`声明的变量上调用方法或属性，因为根本不知道到底有没有
- 可以在`any`声明的变量上调用

当把js迁移到ts时，可用`any`来做第一步的修饰，而后再慢慢修改成具体类型。

### 2.8 Void

一般用于函数返回值，若是给变量声明`void`没啥意义，只能给它赋值`null`或者`undefined`：

```ts
function sayHi(name: string): void {
  console.log(`hi ${name}`);
}

let unused: void;
unused = null;
unused = undefined;
```

### 2.9 Never

一个抛异常、或者是不会return的函数/箭头函数，`never`就可以表达为这个函数的返回值类型。

```ts
function bar(): never {
  throw 'always throw exception!';
}

// Function returning never must not have a reachable end point
function foo(): never {
  while(1) {
    console.log('hard working...');
  }
}
```

### 2.10 Object

声明那些*non-primitive*。

```ts
function create(o: object | null): void;

create({ a: 1 });
create(null);
create(undefined); // error
```

疑问：`undefined`是`null`的子类型，为啥不能用捏？

### 2.11 Type Assertions

类型断言，说白了类似于强制类型转换：

```ts
let someVal: unknown = 'string';
let len: number;

// 写法一
len = (someVal as string).length;

// 写法二
len = (<string>someVal).length;
```


### 2.12 为啥不用大写的，怎么都是小写呢？

`Number`、`String`等是*boxed objects*（C#有个装箱的概念），它们都是对象；
而`number`、`string`等是*primitive types*（基本值类型），他们都是值。

## 3. Interfaces(接口)

### 3.1 声明

```ts
// 声明一个接口，被这个接口所声明的变量，必须包含这些字段
interface Person {
  name: string;
  age: number;
}

let p: Person = { name: 'yuhui', age: 29 }; // ok
let p2: Person = { name: 'yuhui', age: '30' }; // bad
let p3: Person = { name: 'yuhui', age: 29, favors: ['milk'] }; // ok，只要包含"name"、"age"就可
```

### 3.2 或有字段

```ts
interface Person {
  name: string;
  age: number;
  favor?: string[]; // 或有
}

let p: Person = { name: 'yuhui', age: 29 }; // ok
let p2: Person = { name: 'yuhui', age: 29, favors: ['milk'] }; // ok
```

### 3.3 只读

```ts
interface Person {
  readonly name: string; // 只读字段
  age: number;
  favor:  ReadonlyArray<string>[]; // favor是一个只读的数组字段
}
```

## 4、函数

### 4.1、可选参数


1. 编译.ts为.js
$ tsc hello.ts

3. 2种类型如果其内部结构兼容，则这两种类型就可称之为兼容的
In TypeScript, two types are compatible if their internal structure is compatible. This allows us to implement an interface just by having the shape the interface requires, without an explicit implements clause.

interface Person {
  firstName: string;
  lastName: string;
}

// 1 - 兼容
let user = {
  firstName: "Yu",
  lastName: "Hui",
  another: "Xi"
};

// 2 - 不兼容，编译时报错，因为缺少Person定义lastName丢失
let user = {
  firstName: "Yu",
  another: "Xi"
};

4. class的构造函数参数列表中，参数前增加public表示使该参数也成为类成员变量
As of note, the use of public on arguments to the constructor is a shorthand that allows us to automatically create properties with that name.

5. what is 'gulp'
gulp(/ɡʌlp/, 大口吞咽饮料或食物，often audibly(/ˈɔːdəbli/))
整天手工、重复且耗时的工作，让这个workflow变得自动又高效的小工具。
gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.

  1. 安装gulp
  $ npm install gulp-cli -g (-g表示全局安装)

  2. 写入dependencies
  把gulp写入devDependencies(开发环境)，因为只是开发过程中依赖它，用于打包整理等，生产环境并不需要它
  $ npm install gulp -D 
  或 
  $ npm i gulp -D (i是install的简写)
  或
  $ npm install gulp --save-dev (-D是--save-dev的缩写)

  把gulp写入dependencies(生产环境)，只是个例子对比，不要这么做。
  $ npm install gulp -S
  或
  $ npm install gulp --save (-S是--save的缩写)

  3. 安装npx并新建一个gulpfile.js文件
  $ npx -p touch nodetouch gulpfile.js

  4. gulp-typescript
  是一个管理ts编译工作流的gulp插件，插件通过ts的API，把ts编译选项暴露给gulp使用。
  A gulp plugin for handling TypeScript compilation workflow. The plugin exposes TypeScript's compiler options to gulp using TypeScript API.
  如ts.createProject('your-tsconfig.json-file')

  5. src()
  创建一个用于从文件系统读取Vinyl objects的stream
  Vinyl: 描述文件信息的对象，最主要包含path、content属性。
  src(['hello.js', 'hi.js', ...]); // 读这些源文件

  6. dest()
  创建一个用于将Vinyl objects写入文件系统的stream
  dest('dist') // 将输出写到dist目录下


6. tsconfig.json
  6.1 noImplicitAny: true
  如果表达式/声明中有隐式的Any类型，则警告。Raise error on expressions and declarations with an implied any type
  6.2 onEmitOnError: true
  如果tsc编译有错，则不要生成output。Do not emit outputs if any errors were reported.
  6.3 compileOnSave: true
  保存时自动编译ts。makes it easy to update your code in a running web app.

7. Browserify
把我们所有模块打包成一个js文件，放到浏览器中运行。This is exactly what Browserify does.
  7.1 安装
  $ npm i -D browserify tsify vinyl-source-stream
  tsify和gulp-typescript类似，都是提供访问ts compiler选项的插件
  vinyl-source-stream是一个能将browserify输出的结果逆向回gulp能理解的格式（有点像reverse-source-map?）

  7.2 debug
  browserify有个属性debug开关，打开的话，生成的bundle.js中包含了source map信息，这样可以在浏览器里调试到源代码的具体位置（即在打包之前的源代码中放置一个断点，刷新页面后会跳到源代码的位置便于调试）。
  bundle.js中含有类似于:
  sourceMappingURL=xxxx

  7.3 browserify构造函数
  basedir - 描述browserify开始打包的目录。is the directory that browserify starts bundling from for filenames that start with .
  entries - 指明入口文件，和形参第一个参数files一致，可以是string/file object/array of thoes types

8. Watchify, Babel, Uglify
  8.1 Watchify
  运行过gulp后，它并不结束，而是继续保持运行状态，这样一旦保存文件，就会刷新。省的手动运行gulp了。

  8.2 Babel
  把ES6+的转换为ES5和ES3。

  8.3 Uglify
  压缩打包后的代码：get minified into an unreadable mess!

9. npm
  see README.md    


## 10.声明抽象类、抽象方法
方式、意义和C++一样，在`class`前增加`abstract`修饰。
```js
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}
```

## 11.类方法、成员默认为`public`

## 12.如何声明一个不允许被子类覆盖的父类方法？
C++中用`final`修饰，js中

## 13. tsconfig.json
遇到的坑：
1. `tsc`不加任何参数时，ts编译器将会根据当前工程目录下的`tsconfig.json`来确定编译文件、选项等，即直接运行`tsc`会按`tsconfig.json`中指定的编译选项、源文件来进行编译。
2. `Set`遍历时用`for...of`，在`tsconfig.json`中需要指定`ES6`<sup>[1]</sup>。因为如果经过`tsc my-set-test.ts`命令编译后，输出默认是`ES5`的形式，但是**有问题！！**看编译后的代码not working。
```json
{
  "include": ["./*.ts"],
  "compilerOptions": {
      "noImplicitAny": true,
      "target": "es6", // 1
      "lib": ["es6", "dom"],
  }
}
```
3. 编译时，如果碰到你写的es6语法却报错时，可以增加选项`--lib es6`

```
$ tsc learn.ts --lib es6
```

4. 


## 14. 定义函数类型

### 14.1 方式一：箭头函数赋给变量

声明形参类型，并通过`=>`声明返回值类型。

```ts
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

因为已经为`myAdd`声明了形参、返回类型，函数体就不必了，可以简写为：
```ts
let myAdd: (x: number, y: number) => number = function (x, y) {
  return x + y;
};
```

### 14.2 方式二：*function*函数赋给变量

```ts
let myAdd = function (x: number, y: number): number {
  return x + y;
};
```

### 14.3 方式三：定义function

```ts
function myAdd(x: number, y: number): number {
  return x + y;
};
```

## 15. `type` Aliases

> `Type` aliases create a new name for a type.
> 
> Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.

```ts
type Second = number;

let timeInSecond: number = 10;
let time: Second = 10;
```

## 16. `Intersection Types`

把多个类型整合成一个，被此类型声明的变量，将拥有所有这些类型的成员。

> An intersection type combines multiple types into one.
>
> That means an object of this type will have all members of all combined types.

e.g
```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

## 17. `.d.ts`文件是什么？

ref: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

## 18. 如果一个函数返回值类型可能为`null`，那该如何表达呢？





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

