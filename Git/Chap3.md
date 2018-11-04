# Git 分支

Git 中的分支，本质仅仅是一个指向commit对象的可变指针。

新建分支其实就是在当前commit对象上新建一个分支指针。

切换分支`git checkout`干了两件事：

1. 把HEAD指针移动到目标分支
2. 把工作目录中的文件换成了目标分支所指向的快照内容：也就是将在新分支中作的修改暂时取消。

然后，你就是朝着另一个方向进行开发。



### 合并时的`Fast forward`

如果顺着一个分支走下去可以到达另一个分支的话，那么Git在合并两者的时候，只会简单地把指针右移，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称之为快进(Fast forward)



### 复杂合并

举个简单的例子， 你在本机新建一个iss53分支， 干了半天干完了， 然后切换到主分支，其他小伙伴已经提前把他们的工作合并，你同步完之后， 想把你的分支合并到主分支上， 此时的分支结构简单来说如下图:

 ![](./images/unmerged.png)

也就是说， master分支中有两个新的commit, 所以此时你要把iss53合并到主分支的时候，就不是简单的Fast forward了。

这次的合并操作是底层实现的， Git会用两个分支的末端(C4和C5)以及他们的共同祖先(C2)进行一次简单的三方合并计算， 对三方合并后的结果重新做一个新的快照， 并自动创建一个指向它的提交对象，如下图:

![](./images/merged.png)

so，这就是前面提到的比较特殊的提交对象， 有两个祖先(C4和C5).

所以这也就是工作中之前遇到的`merge branch ..`的提交对象出现的原因。

> 有时间可以研究下可视化合并工具的实现原理



### 分支管理

```
$ git branch -v   #查看各个分支最后一个提交对象的信息
$ git branch --merged || --no-merged  #查看哪些分支已被并入|未并入当前分支
```



### 利用分支进行开发的工作流程

请务必牢记，频繁的操作分支都是本地分支，这一点很重要。当你在使用分支及合并的时候，一切都是在你自己的Git仓库中进行的 — 完全不涉及与服务器的交互。



### 推送本地分支到远程

```
$ git push origin localBranch
```

这个命令会把本地分支`localBranch`推送到远程仓库中。



#### 在远程分支的基础上分化出一个新的分支来：

```
$ git checout -b serverBra origin/serverBra
```

这样做会切换到新建的`serverBra`分支上，其内容同远程分支`origin/serverBra`一致。



#### 跟踪分支

从远程分支(checkout)出来的本地分支，称为跟踪分支(tracking branch)。也就是，跟踪分支是一种和某个远程分支有直接联系的本地分支。

也就是我们在这些分支里可以直接使用`git pull` & `git push`

```
$ git checkout --track origin/serverfix
$ git checkout -b sf origin/serverfix
```

在远程服务器上删除分支:

```
$ git push origin :serverFix
```



### 分支的rebase

> 书上翻译为衍合，我个人觉得有些牵强， 先用英文原名，如果真正有用的话再想个自己的名字。

`rebase`: 把在一个分支里提交的改变移到另一个分支里重放一遍。如下图:

![](./images/rebase.png)

更像是在相反的方向上做`merge`,  如两种操作为

```
# 在master分支上 merge
$ git merge experiment

# 在experiment上进行rebase
$ git rebase master

# 或者
$ git rebase master server # git rebase [主分支] [特性分支]
```

最后都实现了合并。

rebase的目的，是想要得到一个能在远程分支上干净应用的布丁 — 比如某些项目你不是维护者，但想帮点忙，最好用rebase；现在自己的一个分支里进行开发，当准备向主项目提交补丁的时候，根据最新的`origin/master`进行一次rebase操作然后再提交，这样维护者就不需要做任何整合工作(实际上是把解决分支补丁同最新主干代码之间冲突的责任，转化为由提交补丁的人来解决)



**切记，不要rebase已经提交过的commit 对象**

























