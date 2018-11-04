## 服务器上的Git

### 协议

支持四种协议：本地传输，SSH协议，Git协议和HTTP协议

除了HTTP协议之外，其他所有协议都要求在服务器端安装并运行Git。



#### 本地协议

Local protocol， 如同硬盘上的另一个目录

```
$ git clone /opt/git/project.git
$ git clone file:///opt/git/project.git
```

绝大多数不使用`file`, 因为直接使用会更快。

但是，通过`NFS`访问仓库通常会比SSH慢。



### SSH协议

SSH是唯一一个同时支持读写操作的网络协议。 HTTP和Git通常长都是只读的。SSH同时也是一个验证授权的网络协议。

```
$ git clone ssh://...

$ git clone user@server:project.git # 如果不指明某个协议，这时Git会默认使用SSH
```

通过SSH进行访问是安全的，所有数据传输都是加密和授权的。

SSH无法实现仓库的匿名访问，如果你仅仅在公司网络里使用，SSH可能是你唯一需要使用的协议。



### Git协议

Git协议是现存最快的传输协议，它使用与SSH协议相同的数据传输机制，但省去了加密和授权的开销。



#### HTTP协议

HTTP协议通常被称为傻瓜协议，因为它没有按需供应的能力 - 传输过程中没有服务端的动态计算。





























