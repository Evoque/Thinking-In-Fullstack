

> 前三章都是特基本的知识点， 合在一起过一遍

## 第一章
- 什么是版本控制？到底有啥用？为什么我要关心它？
> 官方定义： 版本控制(`Version Control System`)是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。 
> OK，举个今天实际遇到的例子。 前段时间对一个项目`service`层的重构，自然会影响影响到所有的模块，虽然特别注意的做了测试， 但是一些隐藏比较深的功能点还是没有进行操作，如`弹出Modal -> 操作 -> 再弹出Moda -> 操作+1`, Bingo, 你中奖了。 出现`bug`的时候一脸懵逼，一个`services`层的接口变量为空， 代码已经是n个月之前了，而且`services`层也已经面目全非。 这时候咋整？ 要么你去翻当时的接口文档，重新梳理这部分业务；要么你能还原到当时的代码，如果当时的代码有注意，那还原起来就省事太多了。 这个时候，我打开`gitlab`，定位到目标文件，然后打开这个文件的修改历史， 猜测下大概时间，对相关的`commit`进行检查， 一个文件顶多也就涉及到十几次的`commit`一个一个的看也快。 就这样， 没花十分钟，`bug fixed`。 想象一下， 如果这时候没有`git`的版本回溯查看功能，咋整？

- `VSS + SVN` VS. `Git`
关于**集中化版本控制系统**和**分布式版本控制系统**的优缺点对比，没啥好讲的。 我并不认同`分布式就是好的`,这种观点，哪种用好了都可以。 但是当然要选择优点更多，更潮流的东西不是， 而且现在，啥都往分布式上靠。 

- `Git` 的出生
简单来说就是`Linus`因为一些事不爽，索性Linux社区开发一个满足需求的版本管理工具自己用， 所以定了下面这些目标:
1. 速度
2. 简单的设计
3. 对非线性开发模式的强力支持(允许上千个并行开发的分支). > ps: 所以，别嫌分支多。
4. 有能力高效管理类似Linux内核一样的超大规模项目(速度和数据量)

现在的Git可以中已经很叼了，而且上面的目标也全部都实现，用的越多，你就越感觉牛逼。



- `Git`原理
Git并不保存前后变化的差异数据。 实际上，Git更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹(`hash`)信息并对文件作一快照，然后保存一个指向这次快照的索引。 为提高行呢给你，若文件没有变化，Git不会再次保存，而只对上次保存的快照作一链接。
咋理解？
其实就是，你每次修改的部分Git会保存起来，而没修改的部分，Git直接引用前一个版本的相关部分，有点类似于`Immutable`的概念， 只更新变化了的地方。


- 本地OK
因为Git是分布式的， 所以不联网，本地执行完全ok。也就是说，你本地存着以前所有的版本历史。 
而且也不会影响你`commit`, 因为`commit`操作的都是本地分支。


- 保持数据完整性
Git的设计哲学是：在保存到Git之前，所有的数据都要进行内容的校验和(checksum)计算(`ps, hash?`)， 病将此结果作为数据的唯一标识和索引。这种机制建立在Git整体架构的最底层。 所以如果文件在传输过程中变得不完整，或者磁盘损坏导致文件数据缺失，Git都能立即察觉。
Git使用`SHA-1`苏啊放哪计算数据的校验和，40个十六进制(`0-9 & a-f`)组成。 一般只看前八位就能唯一确定一个文件了。

这个哈希值贯穿了整个Git的工作流程。 所以在Git中，啥也不信， 就信这个哈希串，错不了。

- 大部分仅添加
为了回退或重现版本方便，Git操作的大多是`添加`操作。 第九章会介绍如何保存和恢复数据的。

- 文件的四种状态

`working directory` ->add-> `staging area` ->commit-> `git directory(repository)` ->pull-> `remote repository`

当然这集中状态也是可逆的。
对应流程如下:
1. 在工作目录中修改某些文件
2. 对修改后的文件进行快照，然后保存到暂存区域
3. 提交更新，将保存在暂存区域的文件快照永久转储到Git目录中。 
也就是说， 如果你不`commit`，你的东西还是有丢的可能性。 只要`commit`了，都能找回来。


- 安装
Mac上的安装命令;
`$ sudo port install git-core +svn +doc +bash_completion +gitweb`

了解一下Mac上的两个包管理工具[Macports](https://www.macports.org/)和[homebrew](https://brew.sh/).

Windows上
`http://msysgit.github.com/`

- 初次配置
所有的配置操作都是基于`git config`来进行，其实后面对应的是一个工具。 专门用来配置或读取相应的工作环境变量。
    - `/etc/gitconfig`: 对所有用户适用，`git config --system`配置
    - `~/.gitconfig`: 当前用户, `git config --global`
    - `.git/config`: 当前项目的git目录中的配置文件，仅对当前项目有效

在Windows系统上，Git会着用户主目录下的`.gitconfig`文件。 主目录及`$HOME`变量指定的目录，一般都是`C:\Documents and Settings\$USER`。 此外，Git还会尝试查找`/etc/gitconfig`文件，只不过看当初Git装在什么目录下，就以此作为根目录来定位。

- 用户信息: 
```
$  git config --global user.name "吴彦祖"
$  git config --global user.email "吴彦祖@gmail.com"

```
在像`github`提交`commit`的时候， 如果此`email`与你github账户中的`email`不匹配，`github`不会记录你的commit次数，也就是你的热力图不亮。 刷`commit`的同学注意了。

- 文本编辑器 & 差异分析工具
```
$ git config --global core.editor emacs
$ git config --global merge.tool vimdiff
```
这两个命令还没用过，VSCode的辅助功能都已经解决了这些问题。 

- 查看配置信息
```
$ git config --list
```
此命令会显示所有的配置项， 其中重复的配置项，起作用的是最后一个。
查看特定配置项：
```
git config user.name
```



## Git 基础
第一章其实是最简单的， 自己啰里八嗦写了那么多字， 下面这些章节重在理解， 记录关键点就行了。

- 初始化新仓库: `git init`, 出现`.git`文件。 没出现？ 人品问题。
- `git add | git add -A | git add *.c`: 各种添加操作；**纳入新文件**，**纳入新修改**的部分,**标记有冲突的文件为已解决**

    > add file into staged area.
- `git clone git:... <name>`:  **clone**的意思是down下来项目历史的所有数据, `<name>`是用来自定义文件名称的、

   - git支持多种协议， `git://`, `http(s)://`, `user@server:/path.git`SSH传输的协议。
- 文件状态变化周期，看图:  

 ![](./imgs/git_status_lifecycle.png)

途中的蓝色块`staged` 是`git add`之后的结果，称为暂存区域， 而`commit`相当于把文件状态从`staged` 改为`unmodified`，如上图中最长的红色箭头。



检查当前文件状态

```
$ git status
```



- 忽略文件`.gitignore`格式规范
  - 空行或者`#`注释开头的航都会被Git忽略
  - 可以使用标准的[glob](https://baike.baidu.com/item/glob%E6%A8%A1%E5%BC%8F/8290305)模式匹配
  - 匹配模式最后跟反斜杠(`/`)说明要忽略的是目录
  - `!`表示取反，添加例外



#### 对比修改

```
git diff
git diff --cached  # 已经暂存和上次提交的快照之间的差异 or =>
git diff --staged
```

有了VSCode图形化的差异对比工具， 这个`diff`命令几乎用不到。 



#### 提交 commit

```
git commit
```

此命令会启动文本编辑器以便输入本次提交的说明，也就是配置文件中的`git config --global core.editor`.

当然我经常用的是直接用简短的一行说明信息， 因为大段的修改说明信息完全可以放在代码的注释中，没必要写在提交记录中。

```
git commit -m "bug135: fix it and ..."
```



#### 跳过使用暂存区域

```
$ git commit -a -m 'comment: git add + git commit'
```

这个命令会直接跳过暂存区域，自动把所有已经跟踪过的文件暂存起来一并提交，也就是跳过了`git add`步骤。



#### 移除文件

>  这个得好好练一下，工作中直接用这个命令的时候不多，用不好容易出错。

Git删除文件，就是从`已跟踪文件清单中清除`(确切的说，是从暂存区域移除)，然后提交。

```
rm a.md

# Changes not staged for commit:
# deleted: a.md
```

然后

```
git rm a.md
```

最后提交的时候，该文件就不再纳入版本管理。 如果删除之前修改过并且放到了暂存区域(`added`)的话，就必须使用`-f`

如果我们仅仅想从Git仓库中删除，但本地文件要保留，如前期`.gitignore`文件不健全时造成的错误提交。

```
$ git rm --cached readme.txt
```

当然也可以使用`glob`模式:

```
$ git rm log/\*.log
# or 
$ git rm \*~
```

不过这些命令用处很少，用的时候再去研究也不迟。



#### 移动文件 (文件重命名)

```
$ git mv file_from file_to
```

其实，`git mv`命令相当于运行了三条命令

```
$ mv a b
$ git rm a
$ git add b
```



#### 查看提交历史

```
$ git log 
$ git log -p # 展开显示每次提交的内容差异
$ git log -2 # 仅显示最近的两次更新
$ git log --stat # 浏览其他协作者的提交
$ git log --pretty=oneline  # 每个提交放一行显示, 另外还有 `short`,`full`,`fuller`使用
$ git log --pretty=format:'%h - %an, %ar : %s' # 定制要显示的记录格式，具体占位符查相关文档吧
$ git log --pretty=oneline|format # 命令行中的分支情况，interesting
```

`git log`支持的命令还有好几种，具体可以去浏览官方手册，例如，限制输出长度、匹配搜索符合条件的`commit`等。具体使用时再查看使用手册吧， 工作中如果不是超大型项目应该很少用到。 



#### 撤销操作

> 这个是一定会遇见的操作，但有些撤销操作完全是不可逆的，所以，使用的时候一定要谨慎！

```
$ git commit --amend
```

重新编辑提交说明， or 补上暂存操作，如：

```
$ git commit -m 'initial commit'
$ git add ---
$ git commit --amend  # 最后一条命令修正了第一个的提交内容
```

> 试了一下上面的命令， 然后配合`vim`确实实现了修改。 对于`vim`小白来说还是摸索了一下简单的使用: 先`ESC`进入命令模式， 然后`:WQ`保存退出， 或者`:x`保存退出。



#### 取消已经暂存的文件

```
$ git reset
```

具体使用看git的提示信息就好

#### 取消对文件的修改

```
$ git checkout -- <filename>
```

这里的`--` 有些怪异，这里要注意， 取消了那就永远没有了，使用这个命令的时候一定要非常注意啊。











