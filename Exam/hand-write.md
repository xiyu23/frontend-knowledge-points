# 前端手写题目汇总

- [前端手写题目汇总](#前端手写题目汇总)
  - [1、`deepCopy` 深拷贝](#1deepcopy-深拷贝)
  - [2、比较版本号](#2比较版本号)
  - [3、解析URL参数](#3解析url参数)
  - [4*、判断给定的两个值是否相等](#4判断给定的两个值是否相等)
  - [5、节流函数(`throttle`)](#5节流函数throttle)
  - [6、防抖函数(`debounce`)](#6防抖函数debounce)
  - [7、实现`Promise`的简单版本](#7实现promise的简单版本)

## 1、`deepCopy` 深拷贝
## 2、比较版本号

给定两个版本号*a*、*b*，写一个函数接收2个版本号作为参数，若

a < b 则返回-1；

a == b 则返回0；

a > b 则返回1。

如
```js
compareVersion('1.2', '1.3') // -1
compareVersion('1.2.1', '1.0') // 1
compareVersion('1.2.19', '1.2.19.0') // 0
```

## 3、解析URL参数

给定一个URL，请写一个函数，它的返回值是包含了这些参数的对象。

e.g

```js
getQueryObject('http://www.foo.com?a=1&b=2'); // { a: 1, b: 2 }
getQueryObject('https://bar.com?name=kabhan&favor=banana,grape, cherry'); // { name: kabhan, favor: [banana, grape, cherry] }
getQueryObject('http://www.foo.com?invitee=Mike&invitee=Alice'); // { invitee: [ 'Mike', 'Alice' ] }
```

:warning

- 可以顺便看看URL参数的编码和解码，比如`encodeURIComponent`；
- 再看看`Base64`了解下，了解下URL中哪些字符是保留的，哪些是不用编码的
- etc.

## 4*、判断给定的两个值是否相等

现有两个javascript变量*a*和*b*，写一个函数来判断他们俩是否相等。

```js
isEqual(1, 1); // true
isEqual(1, '1'); // true
isEqual(1, true); // true
isEqual(
  {
    a: 1,
    b: 2,
  },
  {
    a: 1,
    b: 2,
  },
); // true
isEqual(
  {
    a: 1,
    b: 2,
  },
  {
    a: 1,
    b: 3,
  },
); // false
isEqual(
  {
    a: 1,
    b: [1, 2],
  },
  {
    a: 1,
    b: [1, 2],
  },
); // true
isEqual(
  {
    a: 1,
    b: [1, 2],
  },
  {
    a: 1,
    b: [1, 2, 3],
  },
); // false
```

## 5、节流函数(`throttle`)

> ref: https://www.cnblogs.com/cc-freiheit/p/10827372.html

在一定时间内只允许函数执行一次，提供这样能力的函数叫做**节流函数**。

假设现有一个函数`onPageScroll`执行非常频繁，我们希望**每200ms只执行一次**。

```js
const throttled = throttleFunc(onPageScroll, 200);
// throttled函数将仅在200ms内执行一次
```

## 6、防抖函数(`debounce`)

> ref: https://www.cnblogs.com/cc-freiheit/p/10827372.html
- [前端手写题目汇总](#前端手写题目汇总)
  - [1、`deepCopy` 深拷贝](#1deepcopy-深拷贝)
  - [2、比较版本号](#2比较版本号)
  - [3、解析URL参数](#3解析url参数)
  - [4*、判断给定的两个值是否相等](#4判断给定的两个值是否相等)
  - [5、节流函数(`throttle`)](#5节流函数throttle)
  - [6、防抖函数(`debounce`)](#6防抖函数debounce)
  - [7、实现`Promise`的简单版本](#7实现promise的简单版本)
在一定时间内触发了很多事件，当我们只想执行第一个或最后一个、中间的事件不处理时，提供这样能力的函数叫做**防抖函数**。

```js
// immediate表示是否立即执行，为false则表示在触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
debounceFunc(yourFunc, n, immediate)


const debounced1 = debounceFunc(onMouseMove, 100, true); // 立即执行
const debounced2 = debounceFunc(onMouseMove, 100, false); // 执行最后一个，一旦触发事件，则重置倒计时，倒计时完成后才执行。

```

## 7、实现`Promise`的简单版本

