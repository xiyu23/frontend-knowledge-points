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