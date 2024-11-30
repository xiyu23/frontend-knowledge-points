## 1. PNPM只会安装某个package一次，而NPM会重复
PNPM将package安装到global，凡是再次引用它的，不必重新下载，在引用的地方创建hardlink到global，节约磁盘空间和安装速度。
而且对于相同pkg的不同版本，比如bar@1.0已经保存了，bar@1.1只改了1个文件，则pnpm只维护变化的部分，而不是再把bar@1.1完整download下来一次。

> pnpm creates hard links from the global store to the project's node_modules folders.
>
> pnpm 创建hardlink，把global的pkg映射到工程目录下的node_modules

## 2. hardlink vs symbolic link
真正的文件用inode结构体表示。

hardlink: 就是文件的别名，lstat系统调用返回的size就是original file的size，因此“看起来”像是hardlink也占了和文件一样的大小，但实际上它只是 points to 真实的文件。因此，不论hardlink有多少个，磁盘空间都只用了1个文件的大小。删除hardlink就会删除original file。

symlink: 是一个新的inode，它保存真实文件的地址。删除symlink并不影响原文件。


## 3. PNPM是怎么处理循环引用的
A -> B -> C -> A


## 4. 项目build后，为什么dist下的js代码仍有`process.env.NODE_ENV`这种环境变量


## 5. how does pnpm organize node modules


## 6. pnpm global store在哪？
windows:
```
$ pnpm store path
D:\.pnpm-store\v3
```
一般默认在 `C:\Users\Administrator\AppData\Local\pnpm\store\v3`

一些`pnpm store`的命令：
```bash
# 查看路径
$ pnpm store path

# 删掉没有引用到的packages（不建议频繁做，因为后续可能又需要它，又得重新下载。比如切分支）
$ pnpm store prune

# 直接给store添加package，与 pnpm add [package_name] 功能一样（只不过是直接给global store加，不影响项目）
$ pnpm store add [package_name]
```

## 7. 项目中`node_modules`下的`.pnpm`文件夹是干什么用的？
存放symbolic links. pnpm全局维护一个store，所有pkg都会存到global store。
项目中用到的pkg都会hard link到全局的store，这样项目下node_modules存放的只是symbolic links。
目录结构是flatten的，展平的。当项目依赖A、B，目录结构是：
```bash
node_modules
  .pnpm
    A@1.0.0
      node_modules
        A -> <store>/A   # this is the symbolic hard link, the files inside this directory is the "real" files in the entire node_modules directory of this project
          index.js
          package.json
    B@1.0.0
      node_modules
        B -> <store>/B
          index.js
          package.json
```

pnpm根据symoblic links创建dependency graph。A依赖B，所以
如果A依赖了B，则
```

```