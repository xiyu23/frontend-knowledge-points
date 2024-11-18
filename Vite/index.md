## 1. vite.config.js
导出一个对象，给defineConfig可以直接传对象，也可以给个函数，以根据条件确定不同的配置

对象
```js
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: 'window.__backend_api_url',
  },
})
```

函数
```js
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // vite === vite dev === vite serve, command为dev
  // vite build，command为build 
  if (command === 'serve') {
    return {
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      // build specific config
    }
  }
})
```

vite借助esbuild的define来替换变量，dev时注入变量，build时直接替换为常量。
如果需要替换为shim（可以理解为一段代码，esbuild的解释是：an import from another file），可以用esbuild的inject。
使用场景比如说js要在node或者browser运行，那么node端的api就无法在浏览器跑。比如这段代码
```js
// entry.js
console.log(process.cwd())
```
显然，浏览器中是没有process对象的，那么为了能不改代码的前提下，能够给Node和Browser分别build，岂不美哉。
这时inject就派上用场，对Browser构建时，对entry注入process.cwd，给它定义一个空函数或者其它的，只要不crash就行了：

```js
// process-cwd-shim.js
let processCwdShim = () => ''
export { processCwdShim as 'process.cwd' }
```

```bash
$ esbuild entry.js --inject:./process-cwd-shim.js --outfile=out.js
```

```js
// out.js
var processCwdShim = () => "";
console.log(processCwdShim());
```


## 2. import.meta.env.XXX
vite内置的变量，可以在代码中引用。vite构建时会把它们替换为静态常量字符串。

- import.meta.env.MODE 表示构建的是development or production，或者是自定义其它的字符串
- import.meta.env.BASE_URL 由 vite config 中的 base 确定
- import.meta.env.PROD 是否为production构建，即当 NODE_ENV='production' 时为true
- import.meta.env.DEV 与PROD相反
- import.meta.env.SSR

在vite启动时，会加载根目录下的 `.env` files，带`VITE_`前缀的变量都会被塞到 `import.meta.env` 中，其它不会被塞进去。
```
// .env file
VITE_VERSION=123
```

## 3. `process.env.NODE_ENV` vs `mode`
这是两个不同的概念。

- `NODE_ENV` 是标准的环境变量，development 或 production，**可以在代码中当宏用 `process.env.NODE_ENV`。**
- `mode` 是vite自己定义的，更具体的mode。也可以为 development 或 production，也可以是自定义的字符串。vite会根据mode设置`NODE_ENV`，比如mode==development则设置NODE_ENV也为development。**mode主要用于动态应用vite config**。


vite dev, NODE_ENV 就是 development；vite build， NODE_ENV 就是 production。
但也可以修改，

这样build了一个development的版本
```
NODE_ENV=development vite build
```

再次注意，NODE_ENV 和 mode 是两个概念。

vite dev, mode 就是 development；vite build， mode 就是 production。

也可以修改，

这样是production build，但是mode是development
```
vite build --mode development
```

## 4. virtual modules convention
用途：源码可以引用到构建时的信息。

```js
// vite.config.js
import { defineConfig } from 'vite'
import myPlugin from './vite-plugins/virtual-module-my-plugin'

export default defineConfig({
  // ...
  plugins: [myPlugin()],
  build: {
    lib: {
      entry: './src/index.js', // act as the entry, since it's a lib, we don't have `index.html`
      formats: ['es'],
      fileName: 'mylib', // default is same as `name` in package.json
    }
  }
})
```

```js
// virtual module
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module' // virtual module的名字，可以import它
  const resolvedVirtualModuleId = '\0' + virtualModuleId // rollup的约定

  return {
    name: 'my-plugin', // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        // 碰到import这个module，就resolve
        return resolvedVirtualModuleId
      }
      // 否则沿用原逻辑处理
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        // 要加载这个module，就load下面这段作为module的content，即当作module的源码
        // 所以我们可以在import之处，用`msg`
        return `export const msg = "from virtual module"`
      }
      // 否则沿用原逻辑处理
    },
  }
}
```

```js
// src/index.js
import { msg } from 'virtual:my-module';

console.log(msg)
```

build后：

```js
const n = "from virtual module";
console.log(n);
```


## 5. 对vite project，`index.html`是必须的吗？
不是。

如果是app，那是需要的，index.html作为vite resolve整个app的入口，包括inject js/css/VITE_XX等；

如果是lib，那不需要它，但我们需要改一下vite的配置。
```js
export default defineConfig({
  // ...
  build: {
    lib: {
      entry: './src/index.js', // act as the entry, since it's a lib, we don't have `index.html`
      formats: ['es'],
      fileName: 'mylib', // default is same as `name` in package.json
    }
  }
})
```

