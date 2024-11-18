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
