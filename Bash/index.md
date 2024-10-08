`.sh`: shell script, 脚本文件，所有command line命令组合成一个脚本文件。

man page doc: https://linuxcommand.org/lc3_man_pages/echoh.html
learn: https://linuxconfig.org/bash-scripting-tutorial#Reading%20User%20Input:~:text=LINUX%0Auname%20%2Do-,Reading%20User%20Input,-We%20can%20use

## 1. 脚本文件第一行
先找bash（.sh解释器）在哪里
```bash
$ which bash
/usr/bin/bash
```

脚本文件第一行得是`#!`开头，加上路径：
```sh
#!/usr/bin/bash
```

## 2. 变量: `$var_name`
```sh
#!/usr/bin/bash

# 定义变量
global_var="global variable"

function foo {
  # 定义局部变量
  local local_var="local variable" 
  echo $local_var
}

# 执行函数
foo

# 引用变量
echo $global_var

echo "this is $global_var"
```

## 3. 脚本接收参数: `$1 $2 ...`
```sh
#!/usr/bin/bash

# 参数通过 $1 $2 ... 引用
echo $1 $2 $3

# 把参数放到一个数组里，注意 $@ 这个表示所有参数
args=("$@")

# 通过数组引用
echo ${args[0]} ${args[1]} ${args[2]}

# 所有参数
echo $@

# 参数个数
echo $#
```

运行结果：
```bash
$ ./build.sh hello xiyu goodevening
hello xiyu goodevening
hello xiyu goodevening
hello xiyu goodevening
3
```

## 4. 脚本里面执行另一个脚本命令: `$()`
```sh
#!/usr/bin/bash

# $()会创建一个 subshell，里面放你的 cli
echo $(ls -l)

# 直接写会被当作text输出
echo ls -l
```

运行结果：
```sh
total 1 -rwxr-xr-x 1 Administrator 197121 72 9月 2 20:58 build.sh
ls -l
```

## 5. 导出一个变量
```sh
#!/usr/bin/bash

export count = 5
```
通过`export`导出的变量，这个shell的subshell里也能访问到。
并且导出的变量都被存在当前shell的`env`变量中，它包含当前上下文中所有的环境变量。


## 6. 读取输入 read user input
1. 用户按下Enter结束输入
2. 如果是一次性输入多个变量，是空格分隔这些变量的
3. 整个输入会被trim，即前后空白会被忽略

```sh
# 1个变量：把用户输入存到 word 变量
read word

# 2个变量：空格分隔输入的两个变量
read word1 word2

# 会读到默认变量，通过 $REPLY 引用
read
echo "your input is: $REPLY"

# 加 `-a` 读到数组里
read -a colours
echo "My favorite colours are also ${colours[0]}, ${colours[1]} and ${colours[2]}"
```

## 7. 监听系统信号：listen SYSTEM_SIGNAL and do sth
```sh
trap <Function_Name> <SIGNAL>
```

e.g
```sh
# 监听中断信号（比如CTRL+C），而后执行 `bashtrap` 函数
# 这一句不会阻塞执行，代码会继续向下
trap bashtrap INT

# 中断函数
bashtrap()
{
    echo "CTRL+C Detected !...executing bash trap !"
}

# for loop from 1/10 to 10/10
for a in `seq 1 10`; do
    echo "$a/10 to Exit." 
    sleep 1;
done
echo "Exit Bash Trap Example!!!" 
```

## 8. 

https://linuxconfig.org/bash-scripting-tutorial#Reading%20User%20Input:~:text=Read%20file%20into%20bash%20array