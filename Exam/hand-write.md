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