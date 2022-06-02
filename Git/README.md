# Learning Git

- [Learning Git](#learning-git)
  - [1. 将一个目录初始化为git repo](#1-将一个目录初始化为git-repo)
  - [2. 将文件添加到版本控制（从[工作区]添加到stage[暂存区]）](#2-将文件添加到版本控制从工作区添加到stage暂存区)
  - [3. 将stage暂存区的内容提交](#3-将stage暂存区的内容提交)
  - [4. 查看仓库当前状态](#4-查看仓库当前状态)
  - [5. 查看上次修改](#5-查看上次修改)
  - [6. 查看提交日志（命令显示从最近到最远的提交日志）](#6-查看提交日志命令显示从最近到最远的提交日志)
  - [7. 查看提交日志-带hash的单行记录显示](#7-查看提交日志-带hash的单行记录显示)
  - [8. 想要回退到上一个版本](#8-想要回退到上一个版本)
  - [9. 想要回退到上上个版本](#9-想要回退到上上个版本)
  - [10. 想要回退到上N个版本](#10-想要回退到上n个版本)
  - [11. 想回到未来的某个版本](#11-想回到未来的某个版本)
  - [12. 想要恢复到未来版本，但不知道未来版本的hashID。查看每一次git命令历史](#12-想要恢复到未来版本但不知道未来版本的hashid查看每一次git命令历史)
  - [13. 想要丢弃对工作区文件所做的修改，还原到working tree clean状态](#13-想要丢弃对工作区文件所做的修改还原到working-tree-clean状态)
  - [14. 想要将已通过git add添加到暂存区的修改撤回(Unstage)，此命令可将暂存区的修改撤销，重新放回工作区（工作区的修改仍在，只不过将此文件从git暂存区中移出，这样可以提交剩余的位于暂存区的修改）](#14-想要将已通过git-add添加到暂存区的修改撤回unstage此命令可将暂存区的修改撤销重新放回工作区工作区的修改仍在只不过将此文件从git暂存区中移出这样可以提交剩余的位于暂存区的修改)
  - [15. 删除文件（记得commit！删除和add其实都是修改而已）](#15-删除文件记得commit删除和add其实都是修改而已)
  - [16. 先有本地库，如何与远程库关联：在remote机器上新建repo，并将本地现有的repo与之关联，完成remote repo的创建](#16-先有本地库如何与远程库关联在remote机器上新建repo并将本地现有的repo与之关联完成remote-repo的创建)
  - [17. 创建分支](#17-创建分支)
  - [18. 查看当前所处分支，分支前面标'*'的就是当前分支](#18-查看当前所处分支分支前面标的就是当前分支)
  - [19. 切换到某个分支](#19-切换到某个分支)
  - [20. 删除分支](#20-删除分支)
  - [21. 合并某分支到当前分支](#21-合并某分支到当前分支)
  - [22. 用带参数的git log来查看分支合并情况](#22-用带参数的git-log来查看分支合并情况)
  - [23. 剥离(暂存)工作区的修改，完成后工作区就是working clean tree](#23-剥离暂存工作区的修改完成后工作区就是working-clean-tree)
  - [24. 查看已剥离的内容](#24-查看已剥离的内容)
  - [25. 恢复已剥离(暂存)的修改，使工作区恢复之前的开发状态](#25-恢复已剥离暂存的修改使工作区恢复之前的开发状态)
  - [26. 强行删除一个分支，注意是大写'D'](#26-强行删除一个分支注意是大写d)
  - [27. 推送分支上的所有本地提交到远程仓库](#27-推送分支上的所有本地提交到远程仓库)
  - [28. 克隆远程分支](#28-克隆远程分支)
  - [29. 克隆后切换分支时'git checkout dev'，报错error: pathspec 'dev' did not match any file(s) known to git](#29-克隆后切换分支时git-checkout-dev报错error-pathspec-dev-did-not-match-any-files-known-to-git)
  - [30. HEAD是什么](#30-head是什么)
  - [31. 本地创建了一个分支dev_local，想推送到远程，和他人共享](#31-本地创建了一个分支dev_local想推送到远程和他人共享)
  - [32. 将本地分支与远程分支关联](#32-将本地分支与远程分支关联)
  - [33. 请求将推送后的本地分支dev，与远程master进行合并](#33-请求将推送后的本地分支dev与远程master进行合并)
  - [34. 创建标签：tag其实就是某一commit的别名](#34-创建标签tag其实就是某一commit的别名)
  - [35. 对指定的某一commit打标签](#35-对指定的某一commit打标签)
  - [36. 创建带有说明的标签](#36-创建带有说明的标签)
  - [37. 查看所有标签](#37-查看所有标签)
  - [38. 查看某一标签](#38-查看某一标签)
  - [39. 删除本地标签](#39-删除本地标签)
  - [40. 推送本地标签到远程，推送后tag就是相当于是一个release了](#40-推送本地标签到远程推送后tag就是相当于是一个release了)
  - [41. 删除已推送到远程的标签](#41-删除已推送到远程的标签)
  - [42. pull request](#42-pull-request)
  - [43. .gitignore](#43-gitignore)
  - [44. git finished](#44-git-finished)
  - [45. git实验记录](#45-git实验记录)
- [feature2 changes this line](#feature2-changes-this-line)
  - [46. rebase](#46-rebase)
  - [47. 合并多个commit为一个commit](#47-合并多个commit为一个commit)
- [This is a combination of 3 commits.](#this-is-a-combination-of-3-commits)
- [This is the 1st commit message:](#this-is-the-1st-commit-message)
  - [48. git submodule](#48-git-submodule)
    - [1. git-submodule-tools 文件夹](#1-git-submodule-tools-文件夹)
    - [2. .gitmodules 文件](#2-gitmodules-文件)
  - [49. 查看当前工程关联的远程仓库地址](#49-查看当前工程关联的远程仓库地址)
  - [50. 修改当前工程对应的远程仓库地址](#50-修改当前工程对应的远程仓库地址)
  - [51. 克隆别人的仓库，作为自己的](#51-克隆别人的仓库作为自己的)
  - [52. 把拉下来的代码，修改远程指向自己的remote](#52-把拉下来的代码修改远程指向自己的remote)
  - [53. git@github.com: permission denied (publickey). fatal: could not read from remote repository.](#53-gitgithubcom-permission-denied-publickey-fatal-could-not-read-from-remote-repository)
  - [54、github.com网站打不开](#54githubcom网站打不开)

## 1. 将一个目录初始化为git repo
    # 记得先在git创建一个仓库，而后在本地工程目录下，依次执行下面的命令：
    $ git init
    $ git add .
    $ git commit -m "init my repo"
    $ git remote add <name> <url>  
    $ git push -u origin master

## 2. 将文件添加到版本控制（从[工作区]添加到stage[暂存区]）
    $ git add <file1> <file2>
    $ git add keeplearning.txt
    $ git add mydir/ myfile.txt

## 3. 将stage暂存区的内容提交
    $ git commit -m <message>
    $ git commit -m "this is my first commit"

## 4. 查看仓库当前状态
    
    $ git status

## 5. 查看上次修改
    
    $ git diff keeplearning.txt

## 6. 查看提交日志（命令显示从最近到最远的提交日志）

    $ git log

## 7. 查看提交日志-带hash的单行记录显示

    $ git log --pretty=oneline
    $ git log --pretty=oneline --abbrev-commit //更精简的显示

## 8. 想要回退到上一个版本
    
    $ git reset --hard HEAD^

## 9. 想要回退到上上个版本

    $ git reset --hard HEAD^^

## 10. 想要回退到上N个版本

    $ git reset --hard HEAD~N

## 11. 想回到未来的某个版本

    $ git reset --hard <hashID>
    $ git reset --hard 658fbb613227161a957bcb2006a651114dc580e5
> 上述<hashID>不用输入那么长，开头几位就够了，git会自行寻找
$ git reset --hard `658fbb`

## 12. 想要恢复到未来版本，但不知道未来版本的hashID。查看每一次git命令历史

    $ git reflog

## 13. 想要丢弃对工作区文件所做的修改，还原到working tree clean状态

    $ git checkout -- <file>
    $ git checkout -- keeplearning.txt

> 如果修改1已经被git add到暂存区，而后又做了修改2但还未添加到暂存区，则此时git checkout只会将修改2丢弃，即恢复到上一次git add后的状态（有修改1，无修改2）

## 14. 想要将已通过git add添加到暂存区的修改撤回(Unstage)，此命令可将暂存区的修改撤销，重新放回工作区（工作区的修改仍在，只不过将此文件从git暂存区中移出，这样可以提交剩余的位于暂存区的修改）

    $ git reset HEAD <file>
    $ git reset HEAD keeplearning.txt

## 15. 删除文件（记得commit！删除和add其实都是修改而已）

    $ git rm <file>

unstage the file to be committed:  

    $ git rm --cached <file>

## 16. 先有本地库，如何与远程库关联：在remote机器上新建repo，并将本地现有的repo与之关联，完成remote repo的创建
1. 首先在github上创建一个新的repo
2. 而后本地输入命令以关联并推送
3. 为`url`所在的仓库添加一个名为`name`的remote  

    $ git remote add <name> <url>  
    $ git remote add origin git@github.com:xiyu23/frontend-knowledge-points.git

4. 首次推送关联

    $ git push -u origin master

## 17. 创建分支
-b表示创建并切换到新分支

    $ git checkout -b <branch>

## 18. 查看当前所处分支，分支前面标'*'的就是当前分支

    $ git branch
    $ git branch -a //查看所有分支
    * dev_2 //本地分支 *表示当前checkout的工作分支，即HEAD所指向的分支
      master //本地分支
      remotes/origin/dev //远程分支
      remotes/origin/dev2 //远程分支
      remotes/origin/master //远程分支

## 19. 切换到某个分支
$ git checkout <branch>

## 20. 删除分支
$ git branch -d <branch>

## 21. 合并某分支到当前分支
$ git merge <some-branch>

## 22. 用带参数的git log来查看分支合并情况
$ git log --graph --pretty=oneline --abbrev-commit
* 582d922 (HEAD -> master) add author //HEAD -> master表示本地分支的HEAD指向master分支
* 8875536 add comment
* d1be385 (origin/master) init hello //origin/master指明远程master位于dlbe385这个提交，即本地比远程快2个commit

//如果是以下，则（HEAD -> master, origin/master）表示本地HEAD和远程相同，都在同一个commit上
18079d6 (HEAD -> master, origin/master) add #22
4ad33e2 merge
53e31f5 change #17, add #19,#20
ebadce9 add #19

## 23. 剥离(暂存)工作区的修改，完成后工作区就是working clean tree
$ git stash

## 24. 查看已剥离的内容
$ git stash list

## 25. 恢复已剥离(暂存)的修改，使工作区恢复之前的开发状态
//恢复，并删除stash内容
$ git stash pop

//仅恢复，删除则需要$ git stash drop
$ git stash apply

//删除所有stash
$ git stash clear

//删除指定stash
$ git stash drop stash@{<stash_index>}
$ git stash drop stash@{0} // 删除第0个stash，通过stash list获取当前stash列表

//应用指定stash-并仍让它保存在stash list中
$ git stash apply stash@{<stash_index>}
$ git stash apply stash@{1}

//应用指定stash-并将它从stash list中移出
$ git stash pop stash@{<stash_index>}
$ git stash pop stash@{2}

## 26. 强行删除一个分支，注意是大写'D'
//删除本地分支
$ git branch -d <branch>

//强行删除本地分支（不管它是否merge回upstream branch）
$ git branch -D <branch>

//删除远程分支
$ git push -d <remote> <branch>
$ git push -d origin feature/1.2.0/big_join_button


## 27. 推送分支上的所有本地提交到远程仓库
$ git push <remote> <branch>
$ git push origin master
$ git push origin dev

## 28. 克隆远程分支
$ git clone git@github.com:xiyu23/DamnHouse.git

## 29. 克隆后切换分支时'git checkout dev'，报错error: pathspec 'dev' did not match any file(s) known to git
原因是本地没有名叫dev的分支，或者远程分支也没有同名的（如果有，git会自动创建一个本地分支来track origin/dev）
$ git fetch
$ git checkout dev

## 30. HEAD是什么
HEAD是一个标明当前所在分支的指针，它指向当前分支。
当使用$ git branch列举出当前的所有分支时，某个分支前的'*'表示当前所在(checkout)的分支，也就是当前HEAD所指向的分支。

## 31. 本地创建了一个分支dev_local，想推送到远程，和他人共享
$ git push origin <local_branch>:<remote_branch>
$ git push origin dev_local:dev
如果远程没有叫做dev的分支，则会创建一个。
Q:如果推送到远程另外一个已存在，名称却不相同的分支呢？

## 32. 将本地分支与远程分支关联
$ git branch --set-upstream-to=origin/<branch> <local_branch>
$ git branch --set-upstream-to=origin/dev local_dev

## 33. 请求将推送后的本地分支dev，与远程master进行合并
两种方式：a. 在远程仓库上执行合并操作(pull request) b. 如果有权限推到master的话，本地checkout master，然后把dev合并到本地master，再推送master到远程。

## 34. 创建标签：tag其实就是某一commit的别名
//默认在当前分支最新提交的commit(HEAD)上打tag
$ git tag <tag_name>
$ git tag v1.0

## 35. 对指定的某一commit打标签
$ git tag <tag_name> <commit>
$ git tag v0.9 d234dbf

## 36. 创建带有说明的标签
$ git tag -a <tag_name> -m <info> <commit>
$ git tag -a v0.8 -m "some tag info"

## 37. 查看所有标签
$ git tag

## 38. 查看某一标签
$ git show <tag>

## 39. 删除本地标签
$ git tag -d v0.1

## 40. 推送本地标签到远程，推送后tag就是相当于是一个release了
$ git push origin <tag_name>
$ git push origin v0.1

## 41. 删除已推送到远程的标签
$ git tag -d v0.1 //第一步：先删除本地标签
$ git push origin :refs/tags/v0.1 //第二步：再推送删除远程标签

## 42. pull request
github上fork别人的仓库到自己账号下，这样自己再从这个仓库clone到本地开发
自己本地当然是不能push到别人仓库的，若想要别人接受你对这个仓库的修改，就需要发起一个pull request，由别人决定是否接受你的修改。

## 43. .gitignore

## 44. git finished

## 45. git实验记录
dev拉了2个feature分支，现有A、B两个txt文件。
情况一：
feature1改了A->A'，feature2改了B->B'。
不管谁先提交合并到dev后，第二次合并feature分支到dev时，是不会报冲突的。因为一个改的是A，一个改的是B。（但注意，实际情况就复杂了，如果A的改了一个函数，但碰巧B会用到这个函数，而改动B的人不知道这个函数会被改动A的人修改。这时，只有当两个人的改动都合并到dev时才可以发现，这就是一种弊端了。集成测试时才会发现：卧槽！我用到的这个函数被别人修改了！bug从天而降）

情况二：
feature1改了A->A'，feature2改了A->A''。
同一个文件被不同的人修改，那就冲突了。第二个人没有pull（假设他不知道别人先提交了），直接push的时候就会报错类似于：
xiyu@DESKTOP-GHG6H3G MINGW64 ~/Desktop/buyhouse_dev/DamnHouse (dev)
$ git push
To github.com:xiyu23/DamnHouse.git
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'git@github.com:xiyu23/DamnHouse.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
这说明本地分支不够新了，远程上是最新的，应该先拉取下。
因为有冲突，所以当pull的时候也会报错：
xiyu@DESKTOP-GHG6H3G MINGW64 ~/Desktop/buyhouse_dev/DamnHouse (dev)
$ git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:xiyu23/DamnHouse
   3b6842a..3daab6f  dev        -> origin/dev
Auto-merging A.txt
CONFLICT (content): Merge conflict in A.txt
Automatic merge failed; fix conflicts and then commit the result.
这表示，远程dev的commit已经从3b6842a前进到了3daab6，而我们本地的commit历史可从这里看到：
xiyu@DESKTOP-GHG6H3G MINGW64 ~/Desktop/buyhouse_dev/DamnHouse (dev|MERGING)
$ git log --pretty=oneline
877cd843a85b7659aef54ebefa13579250dce852 (HEAD -> dev) feature2 changes A.txt
3b6842a314ab12ae617cb40e71916be705a794c4 Merge branch 'dev' of github.com:xiyu23/DamnHouse into dev this is auto merge
6ee040d565dce63eab33e915a0fd0a5be1d61833 feature2 change B.txt
即我们是从3b6842a前进到了刚刚提交的commit：877cd84
所以现在要解决这两个commit之间的冲突：3daab6f vs 877cd84
打开冲突的文件A.txt，可以看到类似于：
this is A.txt
dev added this line
<<<<<<< HEAD
feature2 changes this line
=======
feature1 changes this line
>>>>>>> 3daab6f3374417df4e04e9adb0fd8501560db845
"======="分隔了冲突内容，上面HEAD表示本地修改的，下面表示远程的。
只要编辑这个文件，修改后保存即可。（当然要删除git帮我们标记的<<<HEAD和>>>啦）

## 46. rebase
$ git rebase [feature_you_want_to_rebase_on]

// 假设当前是feature/1.0/hi分支，基于master的A，且当前分支已经提交了1个commit C，而远程master也已经有人推送了，导致前进了B个commit
$ git rebase master // 令feature/1.0/hi不再基于A，而是基于B（记得本地master已经pull过，保持和远程相同）
// 解决可能存在的冲突...
// 其实这里rebase时，会将N个commit一个个地apply到新的base B上，所以每次apply都可能会有冲突要去解决
// 当一次apply冲突解决完后，敲下 $ git rebase --continue 命令来继续应用下一commit
$ git add fileA.js  // 将新的changes add到stage，准备commit
$ git commit -m "改为基于master的B"
$ git push --force-with-lease origin feature/1.0/hi // 因为本地已经rebase了，而远程则还是基于A的，即已经分叉（diverge）。我们需要用本地的强行替换掉远程的，让远程也更新为rebase后的版本
// 这里用 --force-with-lease 的原因是它会提示。假设另一个人wwb也在这个分支上开发，他基于A push了一个commit W，那我覆盖远程版本的时候，如果用--force则会把他的W丢掉，变成了A->B->C。
A --- B
| \
|  W
C
rebase后直接push --force会导致变成：（wwb的提交W丢掉了）
A --- B --- C

## 47. 合并多个commit为一个commit
$ git rebase -i commitID // commitID之后的所有commit都会被合并
或
$ git rebase -i HEAD~N // 最近N个commit都会被合并


// 假设我基于master的一个commitM，拉了个分支，提交了一个feautre，包含commit1~commit3
// 目标：我想把这些commit合并下，这样分支的功能就可以在一个commit看到，整齐方便。
$ git rebase -i commitM // 基于commitM，它之后的提交commit1~commit3都会被合并
// 跳出文本编辑界面，列出了形如如下的内容（由上到下，按提交顺序，也就是时间来排的）
// 第一列表示操作，pick表示把这个commit应用到新的base上，squash表示把这个commit合并到上一个commit里
pick 27da64e mix media & set version to 1.1.5
pick 5eb24ad add switcher for easy debug
pick 0429237 add debug prompt

// 因为我们要合并上面这3个，所以写完后可以变成（修改后面的2个操作，改为s）：
pick 27da64e mix media & set version to 1.1.5
s 5eb24ad add switcher for easy debug
s 0429237 add debug prompt

// 改好后保存，接着会再弹出一个文本编辑窗口，这次就是说，要为合并好的commit写一个总的message吧（#开头的不用管，这里面列出的都是以前这3个commit各自的提交备注信息，删掉即可，随便找一行写这次总的commit的message即可）：
# This is a combination of 3 commits.
# This is the 1st commit message:
feature A implemented!
...

// 上面提交消息写好后，保存关闭编辑框，回到git cmd，正常可以看到successfully，本地已合并ok，push即可。

## 48. git submodule
48.1 为当前项目添加一个**submodule**：

    $ git submodule add <repository>

e.g 远程仓库下面有2个repo（bar.git和foo.git），这俩是兄弟关系。现为bar.git添加foo.git作为其submodule。
在bar工程下，运行如下命令：

    $ git submodule add ../foo.git

运行结果如下：
![运行结果](/Pics/gitcommands/01.PNG)

可见多了2个内容:  
### 1. git-submodule-tools 文件夹  
这个就是所引用的submodule的全部内容。

### 2. .gitmodules 文件
这个文件是git自动生成的，用以track当前工程所依赖的所有submodules。具体可参见[文档](https://git-scm.com/docs/gitsubmodules)。

![配置文件](/Pics/gitcommands/02.PNG)

此时修改require路径，即可引用到submodule中需要的文件：
![修改require路径](/Pics/gitcommands/03.PNG)

48.2 submodule更新了，如何为当前项目(superproject)应用此更新呢？

## 49. 查看当前工程关联的远程仓库地址

    $ git remote -v

  得到

    origin  https://github.com/margox/braft-convert.git (fetch)
    origin  https://github.com/margox/braft-convert.git (push)

## 50. 修改当前工程对应的远程仓库地址

    $ git remote set-url origin <new_url>

e.g

    $ git remote set-url origin http://git.code.oa.com/yuhui/wemeet-braft-convert.git

  确认是否已修改：

    $ git remote -v

  得到：

    origin  http://git.code.oa.com/yuhui/wemeet-braft-convert.git (fetch)
    origin  http://git.code.oa.com/yuhui/wemeet-braft-convert.git (push)

## 51. 克隆别人的仓库，作为自己的

1. 在git上创建一个新仓库

2. 本地拉取目标repo的mirror
   
    ```bash
    $ git clone --bare https://github.com/exampleuser/old-repository.git
    ```

此时目录下应该出现了一个文件夹：`old-repository.git`

3. 推送镜像到自己的仓库

    cd到刚拉下来的文件夹内，做一下mirror-push：

    ```bash
    $ cd old-repository
    $ git push --mirror https://github.com/exampleuser/new-repository.git
    ```

4. 删掉刚才临时的repo
   
   ```bash
   $ cd ..
   $ rm -rf old-repository
   ```

5. 如此，新仓库就已经复制成功

## 52. 把拉下来的代码，修改远程指向自己的remote

1. 在git上新建一个仓库

2. 在拉下来的别人代码仓库之中，查看remote

    ```bash
    $ git remote -v
    ```

    发现有这些remote    

    ```bash
    origin  https://github.com/ankeetmaini/react-infinite-scroll-component.git (fetch)
    origin  https://github.com/ankeetmaini/react-infinite-scroll-component.git (push)
    upstream        https://git.woa.com/yuhui/wemeet-react-infinite-scroll-component.git (fetch)
    upstream        https://git.woa.com/yuhui/wemeet-react-infinite-scroll-component.git (push)
    ```

3. 移除别人的remote，设置自己的remote
   
    ```bash
    $ git remote remove origin
    $ git remote remove upstream
    ```

    再用`$ git remote -v`查看发现已经空了，设置自己的remote：

    ```bash
    $ git remote add origin https://git.woa.com/yuhui/wemeet-react-infinite-scroll-component.git
    ```

4. 此时查看git graph发现不再显示之前的远程仓库信息了，现在就可以push到自己的仓库。

## 53. git@github.com: permission denied (publickey). fatal: could not read from remote repository.

问题：新搞了个仓库，本地关联push时提示上面失败信息。

原因：没授权。

解决方案：生成一对ssh key，把public key添加到git账户中。

1. 检查ssh是否生效

正常情况下会输出下面的，这里应该会输出没权限之类的（`> Permission denied (publickey).`），继续往下看。

```
$ ssh -T git@github.com
Hi xiyu23! You've successfully authenticated, but GitHub does not provide shell access.
```

2. 生成一对ssh key

如果有，当然就不用了，直接下一步。

生成新的ssh key（生成时会问*passphrase*，直接回车，不然以后每次push都要输）：

```
$ ssh-keygen -t ed25519 -C "your_email@example.com"
```

查找系统中的ssh key，`*.pub`是公钥，相同文件名没带后缀的是私钥。比如我的是`id_ed25519`、`id_ed25519.pub`。

```
$ ls -al ~/.ssh
```

3. 把公钥文件内的纯文本内容，添加到github账户

4. 测试连接

```
$ ssh -T git@github.com
```

## 54、github.com网站打不开

问题：github.com网站打不开，Connection refused

试了vpn换连接点、重启电脑都不行，之前还好好的。

解决方案：

`C:\Windows\System32\drivers\etc\hosts`文件增加如下两行：
```
140.82.112.4 github.com
199.232.69.194 github.global.ssl.fastly.net
```