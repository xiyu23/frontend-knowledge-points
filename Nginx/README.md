# Learn Nginx 
- [Learn Nginx](#learn-nginx)
  - [1. CMD](#1-cmd)
  - [2. location](#2-location)
  - [3. server](#3-server)
  - [4. nginx是如何处理一个请求的](#4-nginx是如何处理一个请求的)
  - [4. `proxy_pass`是什么？](#4-proxy_pass是什么)


## 1. CMD
运行nginx可执行文件即可。

如果已经运行，则可使用如下命令：

>nginx -s *signal*  

- stop - fast shutdown
- quit - graceful shutdown
- reload - reloading the configuration file
- reopen - reopeningthe log files

如果80已被占用？

1.查找被哪些进程占用
>netstat -ano|findstr "80"

2.找到进程PID，通过任务管理器，或命令行杀死
>taskkill /PID *pid*  
>e.g.
>taskkill /PID 2620

3.进程被清理完后，再尝试启动nginx
>./nginx.exe


## 2. location

语法：
<pre>
location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
</pre>

e.g.
<pre>
location /images {
  root /data;
}
</pre>

Once nginx decides which server processes a request, it tests the **URI specified in the request’s header** against the parameters of the location directives defined inside the server block.

URI是更广泛的概念，URL(locator)、URN(name)则是表示URI的一种方式。URL是定位资源的位置，URN是标识资源的名字，都是URI。

location定义了URI前缀匹配规则为：`/images`，即如果请求头(Request Header)中的URI的前缀是`/images`，则此条location匹配成功。

root定义了为请求服务的根目录。

例如请求`http://example.com/images/water.png`，URI`/images/water.png`匹配`/images`前缀，nginx将*请求URI*直接拼接到location指定的`root`后面，即返回的资源路径为：`/data/images/water.png`。

**当有多个location都匹配时，nginx会使用prefix最长的那个匹配**

**location还可以写正则：以~\*开头的正则表示case-insensitive，~表示case-sensitive**

补充：上下文结构
<pre>
http {
  server {
    location ~*\.(png|jpg|bmp)$ {
      [configuration A]
    }
  }
}
</pre>

## 3. server
定义了nginx需要将请求转发给对应的server来处理。

定义2个virtual server
<pre>
http {
  server {
    listen 80;
    server_name www.foo.example.com;
  }

  server {
    listen 80;
    server_name www.bar.example.com;
  }
}
</pre>

## 4. nginx是如何处理一个请求的
nginx拿着请求头中的`Host`在配置中匹配，找到应该由哪个server来处理，将请求转发给它。

nginx tests only the request’s header field “Host” to determine which server the request should be routed to

## 4. `proxy_pass`是什么？

把请求转发给另一个服务器。

例如：
```
location /some/path/ {
    proxy_pass http://www.example.com/link/;
}
```

当请求匹配到`/some/path`时，nginx会用`proxy_pass`指定代理服务器的`URI`(这里是`/link/`)替换匹配的`location`。

如有个请求带有`URI`是`/some/path/page.html`，它会被代理给`http://www.example.com/link/page.html`。

当然如果`proxy_pass`没有`URI`，那么请求中的整个`URI`都会被传递过去(the full request URI is passed)。

## 5. `upstream`

定义一组server，可以在其他指令定义时引用。

```
upstream backend {
    server backend1.example.com       weight=5;
    server backend2.example.com:8080;
    server unix:/tmp/backend3;

    server backup1.example.com:8080   backup;
    server backup2.example.com:8080   backup;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```
## 6. 

