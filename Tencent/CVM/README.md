## 1. 安装nginx

    $ yum -y install nginx

## 2. 启动nginx

    $ systemctl start nginx

## 3. 检查nginx状态

    $ systemctl status nginx

输出类似于（有绿色的"<span style='color:green'>active (running)</span>"即表示已经启动)：
<pre>
[root@VM-16-16-centos ~]# systemctl start nginx
[root@VM-16-16-centos ~]# systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since Tue 2021-03-02 13:26:46 CST; 6s ago
  Process: 6943 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 6942 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 6940 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 6945 (nginx)
    Tasks: 2 (limit: 11508)
   Memory: 8.9M
   CGroup: /system.slice/nginx.service
           ├─6945 nginx: master process /usr/sbin/nginx
           └─6946 nginx: worker process
</pre>

## 4. 停止nginx

    $ systemctl stop nginx

## 5. 重启nginx

    $ systemctl restart nginx

## 6. 重新加载nginx

    $ systemctl reload nginx

## 7. 测试nginx启动页面

nginx启动后，可以通过浏览器访问我们的服务试试。

需要在云服务器信息页面找到公网IP。

    http://106.52.63.156

## 8. 替换默认页面

nginx服务的默认页面，存放在`/usr/share/nginx/html/`目录下的`index.html`：

![路径](img/nginx-1.png)

## 9. 远程传输文件到CVM

1. 下载`filezilla`
2. ftp到远程主机  

        主机：远程主机的IP地址
        用户名：远程主机登录ID（和在腾讯云SSH登录时一样）
        密码：远程主机登录密码（和在腾讯云SSH登录时一样）
        端口：22

3. 现在可拖拽本地文件上传到远程主机了

## 10. 远程主机域名配置https

找到nginx配置文件：
```
  [root@VM-0-17-centos ~]# find / -name nginx.conf
  /etc/nginx/nginx.conf
```

打开修改`server`字段，
```
  listen       443 ssl;

  # 服务器域名
  server_name  xiyu.fun;

  # 服务器公钥位置
  ssl_certificate /etc/nginx/cert/1_www.xiyu.fun_bundle.crt;

  # 服务器私钥位置
  ssl_certificate_key /etc/nginx/cert/2_www.xiyu.fun.key;

  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;
```

~~不靠谱：
查找nginx在linux中的安装目录：

    $ which nginx

我这里返回的是：

    /usr/sbin/nginx

## 11. `/usr/share/nginx/html/`

默认目录。如果对于一个请求，nginx没有找到匹配的URI，最终就会用这里兜底。

## 12. `/etc/nginx/nginx.conf`

这是nginx的配置文件。

`/etc/nginx`目录下存放nginx的一些配置文件，最主要的配置文件是`/etc/nginx/nginx.conf`。

`nginx.conf`可以*include*`conf.d`目录下的配置文件、`sites-enabled`目录下的虚拟主机文件（*virtual host files*）。



