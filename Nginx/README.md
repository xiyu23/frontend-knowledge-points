# Learn Nginx 
- [Learn Nginx](#learn-nginx)
  - [1. CMD](#1-cmd)
  - [2. location](#2-location)
    - [2.1 基本路径匹配](#21-基本路径匹配)
    - [2.2 完全匹配(`=`)](#22-完全匹配)
    - [2.3 正则匹配(`~` or `~*`)](#23-正则匹配-or-)
      - [2.3.1 大小写敏感(`~`)](#231-大小写敏感)
      - [2.3.2 大小写不敏感(`~*`)](#232-大小写不敏感)
  - [3. server](#3-server)
  - [4. nginx是如何处理一个请求的](#4-nginx是如何处理一个请求的)
  - [5. `proxy_pass`是什么？](#5-proxy_pass是什么)
  - [6. `upstream`](#6-upstream)
  - [7. `nginx.conf`配置文件的开头](#7-nginxconf配置文件的开头)
  - [8. `root`](#8-root)
  - [9. 以`/`结尾的请求代表什么意思？](#9-以结尾的请求代表什么意思)
  - [10. `nginx -V`](#10-nginx--v)


## 1. CMD
运行nginx可执行文件即可。

如果已经运行，则可使用如下命令：

> nginx -s *signal*  

- stop - fast shutdown
- quit - graceful shutdown
- reload - reloading the configuration file
- reopen - reopeningthe log files

如果80已被占用？

1.查找被哪些进程占用

> netstat -ano|findstr "80"

2.找到进程PID，通过任务管理器，或命令行杀死
> taskkill /PID *pid*  
> e.g.
> taskkill /PID 2620

3.进程被清理完后，再尝试启动nginx
> ./nginx.exe


## 2. location

语法：
```
location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
```

作用：确定请求匹配到哪个规则，而后nginx将请求转发给指定服务器处理。

> Once nginx decides which server processes a request, it tests the **URI specified in the request’s header** against the parameters of the location directives defined inside the server block.

关于URI：
> **URI**是更广泛的概念，URL(locator)、URN(name)则是表示URI的一种方式。URL是定位资源的位置，URN是标识资源的名字，都是URI。


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

### 2.1 基本路径匹配

```
location /images {
  root /data;
}
```

location定义了URI前缀匹配规则为：`/images`，即如果请求头(Request Header)中的URI的前缀是`/images`，则此条location匹配成功。

比如上面的例子将会匹配以`/images`开头的URI，如`/images/books.html`，但不会匹配`/docs/images/flowers.html`：

*root*定义了为请求服务的根目录，详见第6点。

例如请求`http://example.com/images/water.png`，URI`/images/water.png`匹配`/images`前缀，nginx将*请求URI*直接拼接到location指定的`root`后面，即返回的资源路径为：`/data/images/water.png`。

### 2.2 完全匹配(`=`)

```
location = / {
  # ...
}
```

### 2.3 正则匹配(`~` or `~*`)

#### 2.3.1 大小写敏感(`~`)

将会匹配包含有`.html`或`.htm`的URI：
```
location ~ \.html? {
  #...
}
```

#### 2.3.2 大小写不敏感(`~*`)

```
location ~* \.html? {
  #...
}
```

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

## 5. `proxy_pass`是什么？

把请求转发给另一个服务器。

两种情况，

- 指定了`URI`
  ```
  location /some/path/ {
      proxy_pass http://www.example.com/link/;
  }
  ```
  当请求匹配到`/some/path`时，nginx会用`proxy_pass`指定代理服务器的`URI`(这里是`/link/`)替换匹配的`location`。

  如有个请求带有`URI`是`/some/path/page.html`，它会被代理给`http://www.example.com/link/page.html`。

- 没指定`URI`
  ```
  location /some/path/ {
      proxy_pass http://www.example.com;
  }
  ```
  如果`proxy_pass`没有指定`URI`，那么请求中的整个`URI`都会被传递过去(the full request URI is passed)。
  
  如请求的是`http://www.hello.com/some/path/page.html`，则完整地转发给`http://www.example.com/some/path/page.html`。

> The proxy_pass directive passes the request to the proxied server accessed with the configured URL

**proxied server**，翻译过来就是*被代理的服务器*，它就是最终处理请求的业务服务器。*被代理*，其实就是被nginx代理了嘛，很多服务器都可以由nginx来代理，那这些服务器都称之为*proxied server*。

## 6. `upstream`

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
## 7. `nginx.conf`配置文件的开头

```
user nginx;
worker_processes auto;
```

`user`表示当前nginx进程运行在哪个用户权限下，user需要具有一定的访问权限才可以。

## 8. `root`

`root`描述了在哪个根目录下寻找请求的文件。

nginx在寻找文件时，会将**Requested URI**拼接在`root`指定的根目录路径后，作为一个完整的文件路径去寻找。

`root`可以定义在`http {}`, `server {}`, or `location {}`的上下文内。

例如：
```
server {
  root /www/data;

  location / {
  }

  location /images/ {
  }

  location ~ \.(mp3|mp4) {
    root /www/media;
  }
}
```

第一个location中，请求将会落在`/www/data/`目录下；
第二个location中，将会落在`/www/data/images/`目录下；
第三个location中，由于又定义了`root`，会覆盖外层作用域的定义，即会落在`/www/media/`目录下。

## 9. 以`/`结尾的请求代表什么意思？

如果一个请求URI以`/`结尾，代表它**请求的是一个目录**，并试图返回目录下面的**index文件**。

`index`指令指定**index文件**的文件名称，默认为`index.html`。

比如在7的例子中，如果请求的URI是`/images/some/path/`，则会返回`/www/data/images/some/path/index.html`，如果文件不存在，则nginx返回HTTP 404。

自行指定`index`文件时，nginx返回第一个匹配的：

```
location / {
    index index.$geo.html index.htm index.html;
}
```

## 10. `nginx -V`

运行命令得到以下输出：

```bash
$ ./nginx.exe -V

--with-cc=cl
--builddir=objs.msvc8
--with-debug
--prefix=
--conf-path=conf/nginx.conf
--pid-path=logs/nginx.pid
--http-log-path=logs/access.log
--error-log-path=logs/error.log
--sbin-path=nginx.exe
--http-client-body-temp-path=temp/client_body_temp
--http-proxy-temp-path=temp/proxy_temp
--http-fastcgi-temp-path=temp/fastcgi_temp
--http-scgi-temp-path=temp/scgi_temp
--http-uwsgi-temp-path=temp/uwsgi_temp
--with-cc-opt=-DFD_SETSIZE=1024
--with-pcre=objs.msvc8/lib/pcre-8.44
--with-zlib=objs.msvc8/lib/zlib-1.2.11
--with-http_v2_module
--with-http_realip_module
--with-http_addition_module
--with-http_sub_module
--with-http_dav_module
--with-http_stub_status_module
--with-http_flv_module
--with-http_mp4_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_auth_request_module
--with-http_random_index_module
--with-http_secure_link_module
--with-http_slice_module
--with-mail
--with-stream
--with-openssl=objs.msvc8/lib/openssl-1.1.1l
--with-openssl-opt='no-asm no-tests -D_WIN32_WINNT=0x0501'
--with-http_ssl_module
--with-mail_ssl_module
--with-stream_ssl_module
```