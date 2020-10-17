### 1. 什么是commonjs
CommonJs是一种 JavaScript 语言的模块化规范。项目是由多个模块组成的，每一个文件就是一个模块，拥有自己独立的作用域、变量、以及方法等，对其他的模块都不可见。

CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的 `exports` 属性（`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的 `module.exports` 属性。`require` 方法用于加载模块。

```js
// moduleA.js
function hi(name) {
  console.log(`hi ${name}!`);
}

module.exports = hi; // #1
module.exports = { 
  sayHi: hi,
}; // #2

// moduleB.js
const moduleA = require('moduleA.js');
moduleA('yuhui'); // #1, output: hi yuhui!
moduleA.sayHi('yuhui'); // #2 output: hi yuhui!

```

#### 1.1 
> require源码: https://github.com/nodejs/node-v0.x-archive/blob/master/lib/module.js


### 2. nginx相关

#### 2.1 安装nginx服务器
    sudo apt-get install nginx

确认服务已经运行起来：  

    service nginx status

#### 2.2 启动nginx
    $ ./nginx

#### 2.3 杀死所有nginx进程
    $ taskkill /fi "imagename eq nginx.EXE" /f
可以杀死名字为nginx.EXE的所有进程

#### 2.4 一些命令
启动nginx，直接运行nginx可执行文件即可。

如果已经运行，则可使用如下命令：

    nginx -s signal

- stop - fast shutdown
- quit - graceful shutdown
- reload - reloading the configuration file
- reopen - reopeningthe log files

#### 2.5 80端口已被占用？
查找被哪些进程占用

    netstat -ano|findstr "80"

找到进程PID，通过任务管理器，或命令行杀死

    taskkill /PID pid

e.g.

    taskkill /PID 2620

进程被清理完后，再尝试启动nginx

    $ ./nginx.exe

#### 2.6 nginx配置

##### 2.6.1 location

Once nginx decides which server processes a request, it tests the **URI specified in the request’s header** against the parameters of the location directives defined inside the server block.

ps.
>URI是更广泛的概念，URL(locator)、URN(name)则是表示URI的一种方式。URL是定位资源的位置，URN是标识资源的名字，都是URI。

语法：

    location [ = | ~ | ~* | ^~ ] uri { ... }
    location @name { ... }

e.g.

    location /images {
      root /data;
    }

location定义了URI前缀匹配规则为：`/images`，即如果请求头(Request Header)中的URI的前缀是`/images`，则此条location匹配成功。

root定义了为请求服务的根目录。

例如请求`http://example.com/images/water.png`，URI`/images/water.png`匹配`/images`前缀，nginx将*请求URI*直接拼接到location指定的`root`后面，即返回的资源路径为：`/data/images/water.png`。

**当有多个location都匹配时，nginx会使用prefix最长的那个匹配**

**location还可以写正则：以~\*开头的正则表示case-insensitive，~表示case-sensitive**

补充：上下文结构

    http {
      server {
        location ~*\.(png|jpg|bmp)$ {
          [configuration A]
        }
      }
    }

##### 2.6.2 server
定义了nginx需要将请求转发给对应的server来处理。

下面定义2个`virtual server`：

    http {
      server {
        listen 80;
        server_name www.foo.example.com;
      }

      server {
        listen 80;
        server_name www.bar.example.com;
      }
    }


### 2.6.3 nginx是如何处理一个请求的
nginx拿着请求头中的`Host`在配置中匹配，找到应该由哪个server来处理，将请求转发给它。

nginx tests only the request’s header field "`Host`" to determine which server the request should be routed to.

### 3. Vue脚手架的使用

#### 3.1 安装vue项目脚手架
    $ npm install -g @vue/cli

#### 3.2 创建一个vue项目
    $ vue create hello-world

问题: `vue create`都做了些什么？

#### 3.3 构建项目
    $ npm run serve

运行后，可以看到本地已经起了一个服务，这样就可以在浏览器中访问。

问题: `npm run serve`都做了什么？

### 4. Vue项目中遇到的问题

#### 4.1 图片加载不出来？怎么搞路径都不对？
`vue-loader`了解一下。  
原写法：
```js
export default {
  name: 'App',
  data: function () {
    return {
      msg: 'Hi Vue Component',
      name: '土豆丝',
      pic: './assets/potato.png', // #1
      complex: 5,
    }
  },
  components: {
    HelloWorld,
    DishThumb,
  }
}
```

#1由  
```
pic: './assets/potato.png',
```
修改为：
```
pic: require('./assets/potato.png'),
```
原因：？？

#### 4.2 vue/no-dupe-keys
`*.vue`文件在`export`组件对象时，是不是`props`中的某个属性和`data`中的重复了：
原写法：
```js
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function(){
	return {
		msg: 'Hi planet' // #1
	};
  },
}
```

#1重复定义了`msg`，因为在`props`中已经定义过`msg`。改为：
```js
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}
```
问题：`props` vs `data` ?

#### 4.3 子组件如何上抛事件给父组件
> 例1：button在子组件内，button click后需要父组件来响应
通过在子组件元素的事件中，`emit`一个事件，来向上抛出。

父组件在使用子组件时要传入`v-on:click='clickHandler'`捕获子组件抛出的事件。例如，

子组件`<my-custome>`中：
```html
<button v-on:click='$emit("eat-me")' />
```

也可以抛出一个值"someValue"，
```html
<button v-on:click='$emit("eat-me", "someValue")' />
```
这个值（第二个参数）可以被事件处理函数来捕获，`$event`就是它的值

父组件中：
```html
<my-custome v-on:eat-me='console.log("eat-me")' />
```

捕获子组件抛出的值，
```html
<my-custome v-on:eat-me='console.log("eat-me," + $event)' />
```
如果事件是一个方法，则方法的第一个参数就是抛出的值
```html
<my-custome v-on:eat-me='eatMeHandler' />
```

```js
function eatMeHandler(value) {
  console.log("eat-me," + value)
}
```

> 例2：text改变后想要fire父组件的input事件来响应


#### 4.4 xxx.vue中的export default导出是什么意思
语法：

    export default expression

对外输出`expression`。

因为有了`default`关键字，所以外部在`import`时不需要知道引入的名称是什么，只管导入就行。

```js
// export.js
export default function () {
  console.log('foo');
}

// import.js
import bar from './export.js'
bar(); // will log 'foo'
```

放在Vue环境下，此`xxx.vue`文件本身是一个模块，定义了一个组件。

导出的是**用于创建其vue实例的选项对象**而已，以供外部复用该组件。

参考Vue官方说明：
> https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9C%A8%E6%A8%A1%E5%9D%97%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C

#### 4.5 局部注册组件返回的vue选项data为啥必须是function

**必须返回一个函数**，这个函数返回`data`的初始化数据
参考Vue官方说明：
> https://cn.vuejs.org/v2/api/index.html?#data

#### 4.6 <%= BASE_URL %> 是什么意思？

`BASE_URL`是Vue搞的一个环境变量，默认代表**当前项目的根目录**。

环境变量可以用在`*.html`中，比如，

    <link rel="icon" href="<%= BASE_URL %>favicon.ico">

等价于

    <link rel="icon" href="/favicon.ico">

你可以通过下面的命令查看vue-cli对webpack的配置信息，将会输出到`output.js`中。

    $ vue inspect > output.js

在`output.js`中可以找到以下定义，看到`BASE_URL`定义为根目录。

    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(),
        /* config.plugin('define') */
        new DefinePlugin(
          {
            'process.env': {
              NODE_ENV: '"development"',
              BASE_URL: '"/"'
            }
          }
        ),
    ],

### 5. NPM

#### 5.1 npm run build
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


#### 5.2 npm more?