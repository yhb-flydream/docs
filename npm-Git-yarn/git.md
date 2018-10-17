# 管理工具

[TOC]

[git book](https://git-scm.com/book/zh/v2)

## shell

> 在计算机科学中，Shell俗称壳，用来区别于Kernel（核），是指“提供使用者使用界面”的软件（命令解析器）。
>
> 它类似于DOS下的command和后来的cmd.exe。它接收用户命令，然后调用相应的应用程序。

- shell分类：
  - 1、图形界面shell：
    - 通过提供友好的可视化界面，调用相应应用程序，
      - 如windows系列操作系统，Linux系统上的图形化应用程序Unity、KDE等。

  - 2、命令行shell：
    - 通过键盘输入特定命令的方式，调用相应的应用程序，
    - 如windows系统的cmd.exe、Windows PowerShell，
    - Linux系统的Bourne shell ( sh)、Bourne Again shell ( bash)、zsh等

## bash

- 一个shell
- 在window系统下使用bash，需要一个软件，这个软件模拟集成了bash大部分命令。
- 各个 shell 的功能都差不多， Linux 默认使用 bash ，所以我们主要学习bash的使用

### bash命令格式

- 命令 [-options] [参数]，
  - 如：mkdir blog   如果有`<>`表示必须要有这个参数,`[]`可选参数
- 查看帮助：--help是命令的一个参数,命令后面加上 --help 或者 -h , -h是--help的缩写形式 可以打开命令的一个说明，说明中有这个命令的参数的具体的解释

### bash常见命令

- mkdir 文件夹名
  - 创建一个文件或文件夹
- pwd
  - 查看当前目录完整路径
- cd 文件名称
  - 切换到指定目录
- cd `..`
  - 返回上级目录
- cd `d:`
  - 切换到d盘
- ls
  - 查看当前目录下所有文件(Linux)
- dir
  - 查看当前目录下所有文件(cmd)
- touch index.html
  - 创建一个index.html文件
- cat index.html
  - 查看文件里的内容
- rm index.html
  - 删除一个文件
- rm -rf 文件夹名
  - 删除一个文件夹
- rmdir 文件夹名
  - 删除一个**空**文件夹
- mv 文件名 另一个文件路径
  - 移动一个文件到另一个文件或重命名
- cp 文件名 另一个文件路径
  - 复制一个文件到另一个文件
- head -10 index.html
  - 查看文件前几行
- tail
  - 查看文件后几行
- history
  - 查看操作历史
- curl 网络地址
  - 发送网络请求

### vi编辑器

> 如同Windows下的记事本，vi编辑器是Linux下的标配，通过它我们可以创建、编辑文件。
> 它是一个随系统一起安装的文本编辑软件

- 三种模式
  - 命令模式、
  - 插入模式、
  - 底行模式

- vi 文件名
  - 打开/创建文件

**底行模式**下的操作

- w
  - 保存
- w filenme
  - 另存为
- wq
  - 编辑模式下保存并退出
- q
  - 退出
- q!
  - 不保存强制退出
- e!
  - 撤销更改，返回到上一次保存的状态
- set num
  - 设置行号

**命令模式**下的操作

- a
  - 进入编辑状态
- A
  - 进入编辑模式，光标移动到行尾
- shift+`：`
  - 返回到底行模式
- u
  - 辙销操作，可多次使用
- dd
  - 删除当前行
- yy
  - 复制当前行
- p
  - 粘贴内容
- ctrl+f
  - 向前翻页
- ctrl+b
  - 向后翻页
- i
  - 进入编辑模式，当前光标处插入
- o
  - 进入编辑模式，当前行下面插入新行
- O
  - 进入编辑模式，当前行上面插入新行

> 当我们处在编辑模式下，编辑内容时，和我们在Windows编辑器的使用相似。

## 版本管理工具

- git 分布式管理
- svn 集中式管理

### Git

- Git是分布式版本控制系统
- 集中式VS分布式，`SVN vs Git`
  - SVN和Git主要的区别在于历史版本维护的位置
  - 这两个工具主要的区别在于历史版本维护的位置Git本地仓库包含代码库还有历史库，在本地的环境开发就可以记录历史而SVN的历史库存在于中央仓库，每次对比与提交代码都必须连接到中央仓库才能进行。
  - 这样的好处在于：
    - 自己可以在脱机环境查看开发的版本历史。
    - 多人开发时如果充当中央仓库的Git仓库挂了，可以随时创建一个新的中央仓库然后同步就立刻恢复了中央库。

#### Git安装

##### Linux安装Git

- 输入`git`验证是否安装了Git，如果没有安装会出现提示

```bash
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```

- 如果是用Debian或Ubuntu Linux 输入`sudo apt-get install git` 安装
- 老一点的Debian或Ubuntu Linux，要把命令改为`sudo apt-get install git-core`

##### Mac OS X 上安装Git

- 一，可以安装`homebrew`，通过homebrew安装Git，方法参考[http://brew.sh/](http://brew.sh/)
- 二，可以在App Store安装Xcode，它集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单`Xcode->Preferences`，在弹出窗口中找到`Downloads`，选择`Command Line Tools`，点`Install`就可以完成安装了

##### Window 上安装Git

- 去官网[下载](https://git-scm.com/downloads)，或者使用[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)
- 安装好以后，右键弹出菜单中有`git bash here`
- 之后还需要最后一步设置，右键弹出菜单中点击`git bash here`，在命令行输入

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

- `git config`命令的`--global`参数，表明这台机器上的所有Git仓库都会使用这个配置，也可以对某个仓库指定不同的用户名和邮箱地址。

#### Git命令使用

##### 创建版本库

```
mkdir demo
cd demo
pwb
```

- `pwb`用于显示当前目录
- **如果使用Windows系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文**

##### 初始化Git仓库

```bash
git init
```

- 初始化后会有一个隐藏的`.git`文件，这是Git用来跟踪版本的，一般情况下不要动里面的东西

```
branches/
config
description
HEAD
hooks/
info/
objects/
refs/
```

##### 查看工作区状态

```bash
git status
```

##### 查看修改内容

```bash
git diff <file>
```

> `git diff` 可以查看工作区(work dict)和暂存区(stage)的区别
> `git diff --cached` 可以查看暂存区(stage)和分支(master)的区别
> `git diff HEAD -- <file>` 可以查看工作区和版本库里面最新版本的区别

##### 添加文件到Git仓库

- 包括两步：

```bash
git add <file>
git commit -m "本次提交的描述"
```

> `git add`可以反复多次使用，添加多个文件，
> `git commit`可以一次提交很多文件，`-m`后面输入的是本次提交的说明，可以输入任意内容。

##### 查看提交日志

```bash
git log
```

- 简化日志输出信息

```bash
git log --pretty=oneline
```

##### 查看命令历史

```bash
git reflog
```

##### 版本回退

- 一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作

```bash
git reset --hard HEAD^
```

- 以上命令是返回上一个版本，
- 在Git中，用`HEAD`表示当前版本，
- 上一个版本就是`HEAD^`，
- 上上一个版本是`HEAD^^`，
- 往上100个版本写成`HEAD~100`。

###### 回退(或者前进)指定版本号

```bash
git reset --hard commit_id
```

- `commit_id`是版本号，是一个用SHA1计算出的序列
- 可以通过`git reflog`查看每次提交的历史，前面的一串数字就是每次提交的版本号

##### 工作区、暂存区和版本库

- 工作区
  - 在电脑里能看到的目录；
- 版本库
  - 在工作区有一个隐藏目录`.git`，是Git的版本库。
  - Git的版本库中存了很多东西，其中最重要的就是称为stage（或者称为index）的暂存区，
  - 还有Git自动创建的`master`，以及指向`master`的指针`HEAD`。

![理解](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384907720458e56751df1c474485b697575073c40ae9000/0)

- 进一步解释一些命令：
  - `git add`实际上是把文件添加到暂存区
  - `git commit`实际上是把暂存区的所有内容提交到当前分支

##### 撤销修改

- 丢弃工作区的修改

```bash
git checkout -- <file>
```

- 该命令是指将文件在工作区的修改全部撤销，这里有两种情况：
  - 一种是file自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
  - 一种是file已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

- 总之，就是让这个文件回到最近一次git commit或git add时的状态。

- 丢弃暂存区的修改
- 分两步：
- 第一步，把暂存区的修改撤销掉(unstage)，重新放回工作区：

```bash
git reset HEAD <file>
```

- 第二步，撤销工作区的修改

```bash
git checkout -- <file>
```

**小结：**

- 1、当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- <file>`。
- 2、当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了第一步，第二步按第一步操作。
- 3、已经提交了不合适的修改到版本库时，想要撤销本次提交，进行版本回退`git reset --hard HEAD^`，**前提是没有推送到远程库**。

##### 删除文件

- 删除工作区文件

```bash
rm <file>
```

- 删除版本库文件

```bash
git rm <file>
```

- `git rm <file>`相当于执行

```bash
rm <file>
git add <file>
```

###### 进一步的解释

Q：比如执行了`rm text.txt` 误删了怎么恢复？
A：执行`git checkout -- text.txt` 把版本库的东西重新写回工作区就行了
Q：如果执行了`git rm text.txt`我们会发现工作区的text.txt也删除了，怎么恢复？
A：先撤销暂存区修改，重新放回工作区，然后再从版本库写回到工作区

```bash
git reset head text.txt
git checkout -- text.txt
```

Q：如果真的想从版本库里面删除文件怎么做？
A：执行`git commit -m "delete text.txt"`，提交后最新的版本库将不包含这个文件

##### 远程仓库

###### 创建SSH Key

- 本地设置创建`SSH Key`

```bash
ssh-keygen -t rsa -C "youremail@example.com"
```

- [登陆GitHub，点击头像，打开“settings”，在“SSH and GPG Keys”页面，设置"SSH Key"](https://github.com/settings/keys)

###### 关联远程仓库

```bash
git remote add origin https://github.com/username/repositoryname.git
```

###### 推送到远程仓库

```bash
git push -u origin master
```

`-u` 表示第一次推送master分支的所有内容，并把本地和远程`master`分支关联起来，此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改。

###### 从远程克隆

```bash
git clone https://github.com/usern/repositoryname.git
```

##### 分支

###### 创建分支

```bash
git branch <branchname>
```

###### 查看分支

```bash
git branch
```

`git branch`命令会列出所有分支，当前分支前面会标一个*号。

###### 切换分支

```bash
git checkout <branchname>
```

###### 创建+切换分支

```bash
git checkout -b <branchname>
```

###### 合并某分支到当前分支

```bash
git merge <branchname>
```

> `git merge`命令用于合并指定分支到当前分支

###### 删除分支

```bash
git branch -d <branchname>
```

- 如果分支没有合并会出现`error: The branch '分支名' is not fully merged.`那么用下面命令删除无用分支

```bash
git branch -D <分支名>
```

###### 查看分支合并图

```bash
git log --graph
```

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。用`git log --graph`命令可以看到分支合并图。

###### 普通模式合并分支

```bash
git merge --no-ff -m "description" <branchname>
```

因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。合并分支时，加上`--no-ff`参数就可以用普通模式合并，能看出来曾经做过合并，包含作者和时间戳等信息，而fast forward合并就看不出来曾经做过合并。

###### 丢弃一个没有合并过的分支(强制删除)

```bash
git branch -D <branchname>
```

---

##### 保存工作现场

```bash
git stash
```

##### 查看工作现场

```bash
git stash list
```

##### 恢复工作现场

```bash
git stash pop
```

---

##### 查看远程库信息

```bash
git remote -v
```

##### 在本地创建和远程分支对应的分支

```bash
git checkout -b branch-name origin/branch-name，
```

本地和远程分支的名称最好一致；

##### 建立本地分支和远程分支的关联

```bash
git branch --set-upstream branch-name origin/branch-name；
```

##### 从本地推送分支

```bash
git push origin branch-name
```

如果推送失败，先用git pull抓取远程的新提交；

##### 从远程抓取分支

```bash
git pull
```

如果有冲突，要先处理冲突。

##### 标签

> tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。
> 注意，标签不是按时间顺序列出，而是按字母排序的

###### 新建一个标签

```bash
git tag <tagname>或commit_id(版本号，可省略)
```

命令`git tag <tagname>`用于新建一个标签，默认为HEAD，也可以指定一个commit id。

###### 指定标签信息

```bash
git tag -a <tagname> -m <description> <branchname> or commit_id
```

`git tag -a <tagname> -m "blablabla..."`可以指定标签信息。

###### PGP签名标签

```bash
git tag -s <tagname> -m <description> <branchname> or commit_id
```

`git tag -s <tagname> -m "blablabla..."`可以用PGP签名标签。

###### 查看所有标签

```bash
git tag
```

###### 查看标签信息

```bash
git show <tagname>
```

---

###### 推送一个本地标签

```bash
git push origin <tagname>
```

###### 推送全部未推送过的本地标签

```bash
git push origin --tags
```

###### 删除一个本地标签

```bash
git tag -d <tagname>
```

###### 删除一个远程标签

- 要先删除本地标签

```bash
git tag -d <tagname>
git push origin :refs/tags/<tagname>
```

##### Git 配置别名

```bash
git config --global alias.s[缩略名] status[原名字]
```

- [码云使用](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00150154460073692d151e784de4d718c67ce836f72c7c4000)