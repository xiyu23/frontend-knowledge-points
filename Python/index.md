环境配置
1.https://www.python.org/downloads/windows/ 安装，记得勾选写入环境变量
2.打开cmd应该是可以运行 python 或者 pip，如果不行，要再手动设置下环境变量
3.系统左下角搜 environment variables （系统变量），编辑系统变量的 PATH
4.PATH新建一个，填入 `C:\Users\Administrator\AppData\Local\Programs\Python\Python312\Scripts` 注意Users后面的名字、python版本号都要替换成你自己的，Python312是指python3.12版本。如此可以用 pip 了
5.PATH再新建一个，填入 `C:\Users\Administrator\AppData\Local\Programs\Python\Python312`如此可用 python
6.保存关闭，重开一个terminal试试。如果不行，把vscode全都关了再打开就好了。
7.pip vs python?
python3.4起，pip都内置了。pip是python内置的package installer。用法：


