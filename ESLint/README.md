## 1. vscode如何format on save?

1. `ctrl + ,`打开设置页面
2. 输入`code actions on save`
3. 在搜索结果中找到`Editor: Code Actions On Save`下方的`Edit in settings.json`，点击打开这个文件
4. 在配置文件增加如下内容:
    ```json
    {
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": [
        "javascript"
      ]
    }
    ```
5. 关闭设置窗口，可以试试在保存文件时，eslint有自动纠正格式的效果。

## 2. 为工程添加`eslint`

请先确保`package.json`已经有了。

```bash
$ yarn add eslint --dev

# or

$ yarn add eslint --dev
```

而后初始化配置文件：

```bash
$ npx eslint --init

# or

$ yarn run eslint --init
```

根据提示选择适合项目的选项。

如果是用React，则需安装如下：

```bash
$ yarn add eslint-plugin-react@latest --dev

$ yarn add @typescript-eslint/eslint-plugin@latest --dev

$ yarn add @typescript-eslint/parser@latest --dev
```

## 3. Rules

### 3.1 using configuration comments

一个文件中可以用这种配置注释的形式来设置规则。

```js
/* eslint eqeqeq: "off", curly: "error" */
```

等价于

```js
/* eslint eqeqeq: 0, curly: 2 */
```

- "off" or 0 表示关闭规则
- "warn" or 1 表示警告，但不影响你继续
- "error" or 2 表示错误，必须处理才能继续，比如提交代码

一个rule如果有其他选项时，可以用数组来写：

```js
/* eslint quotes: ["error", "double"], curly: 2 */
```

数组第一个元素固定表示为这个规则的严重级别。

### 3.1 Using configuration files

用配置文件来描述规则，规则都写到`rule`字段下，

```js
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "single"], // 字符串只允许单引号
        "semi": ["error", "always"], // 行尾必须加分号
    }
}
```

## 4. 自动修复：`eslint --fix`

```js
// my.js
console.log("hello")
console.log('hello')
```

可以用eslint fix这个文件：

```bash
$ yarn run eslint my.js --fix
```

`my.js`将会变成：
```js
// my.js
console.log('hello');
console.log('hello');
```