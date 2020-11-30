# How to create a vue project?

## 0. install prerequisites
see xxx.(TODO)

## 1. 创建一个vue项目
    $ vue create hello-world

## 2. 构建项目
    $ npm run serve

## Q&A

### 1. vue create 都做了什么？

### 2. npm run serve 都做了什么？

### 3. <%= BASE_URL %> 是什么意思？

`BASE_URL`是Vue搞的一个环境变量，默认代表当前项目的根目录。

环境变量可以用在`*.html`中，比如，

    <link rel="icon" href="<%= BASE_URL %>favicon.ico">

等价于

    <link rel="icon" href="/favicon.ico">

你可以通过下面的命令查看vue-cli对webpack的配置信息，将会输出为到`output.js`中。

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