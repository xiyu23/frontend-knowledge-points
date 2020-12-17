# 前端知识点
## 1. 正则

### 1.1 断言
背景：怎么找出后面不跟`:`的`https`呢？

答案：正则表达式-lookahead assertion。

#### 1.1.1 Lookahead assertion(先行断言) 
语法：

      x(?=y)

> Matches "x" only if "x" is followed by "y".

例子：

 `/Jack(?=Sprat)/` matches "Jack" only if it is followed by "Sprat".

但是注意，断言并不会将"验证部分"作为匹配，即"Sprat"不会被作为匹配结果的一部分。

#### 1.1.2 Negative lookahead assertion(先行否定断言)
语法：

    x(?!=y)

> Matches "x" only if "x" is **not** followed by "y".

例子：

`/\d+(?!\.)/`匹配后面不跟小数点的数字，如匹配"3.14"中的3。

#### 1.1.3 Lookbehind assertion(后行断言)
语法：

    (?<=y)x

> Matches "x" only if "x" is preceded by "y".

例子：

`/(?<=Jack)Sprat/`匹配"JackSpart"中的Spart；

`/(?<=Jack|Tom)Sprat/`匹配"JackSpart"中的Spart，也匹配"TomSpart"中的Spart。

#### 1.1.4 Negative lookbehind assertion(后行否定断言)
语法：

    (?<!y)x

> Matches "x" only if "x" is **not** preceded by "y".

例子：

`/(?<!-)\d+/`匹配前面不带`-`的数字，如匹配"123"，但不匹配"-123"。

## 2. `prototype`, prototype chain
See [13.prototype chain](#13)
## 3. `is`, `typeof`, `==`, `===`
- `==`：如果类型不同，则会先做类型转换，然后再比较
  ```js
  -0 == +0
  NaN != NaN
  undefined == null
  "" == 0 //相当于ToNumber("") === 0, 即Number("") === 0
  
  //不同类型的比较转换规则
  NumberA == StringB  => NumberA === ToNumber(B)
  NumberA == BooleanB => NumberA === ToNumber(B)
  NumberA == ObjectB  => NumberA == ToPrimitive(B)
  
  StringA == BooleanB => ToNumber(A) === ToNumber(B)
  StringA == ObjectB  => StringA == ToPrimitive(B)
  
  Boolean == ObjectB  => ToNumber(A) == ToPrimitive(B)
  
  //ToNumber(B)：将参数转换为number，等价于"+B"（the unary + operator，一元+操作符)
  //ToPrimitive(B)：试图调用object的方法A.toString和A.valueOf（可能有不同的调用顺序），将object转换为primitive
  ```
- `===`：同`==`，区别在于不做类型转换，直接比较
  ```js
  -0 === +0
  NaN !== NaN 
  ```

- `is`：可以认为它大致相当于`===`，只不过略有区别。
  ```js
  +0.is(-0) => false
  -0.is(0)  => false
  NaN.is(NaN) => true
  ```

- `typeof`: 返回一个*string*，代表操作数的类型。操作数是一个*object*或者*primitive*.
  ```js
  typeof Undefined => "undefined"
  typeof Null 	 => "object"
  typeof Boolean   => "boolean"
  typeof Number    => "number"
  typeof String    => "string"
  typeof Function Object => "function"
  typeof Any other object => "object"
  typeof NaN 		 => "number"

  var a = Number("5"); //这只是"5"转换为Number类型，并不创建一个Number对象
  var b = new Number("5"); //创建一个Number对象
  ```
> A *primitive* is data that is not an *object* and has no methods.

在JavaScript中有**6**种*primitive*数据类型：
- string
- number
- boolean
- null
- undefined
- symbol(ES2015)

## 4. [html]常见的浏览器端的存储技术有哪些？
### 4.1 cookie:（8KB）
server通过http headers `Set-Cookie`来设置cookie，浏览器随后的请求都会将已保存的cookie携带在request的http header中，发送给server。

浏览器关闭则cookie清空，否则可以通过在`Set-Cookie`中指明过期时间（相对于client，而非server），即使浏览器关闭，cookie也还在。

这种方式的cookie叫"*permanent cookie*"。

> Many login forms also offer a "remember me" checkbox to change this to a *persistent cookie* at the user's request，而之前称为*session cookie*。

cookie相关：`Secure` and `HttpOnly`  
- `Secure`: 表明cookie必须通过https发送。(Cookie to only be transmitted over secure protocol as https)

- `HttpOnly`: 表明cookie不能被js访问（可抵抗XSS的反射攻击：阻止js访问cookie）。（cookies are inaccessible to JavaScript's `Document.cookie` API）

安全相关：
- `CSRF`(Cross-Site Request Forgery, `C-surf`): 跨站请求注入  
  是指建立在用户已登录漏洞网站的前提下，hacker通过诱导或窃取用户session，伪装成用户发起并非他自己本意的恶意请求，服务器根本无法识别，因为在服务器看来这就好像是用户自己发起的。 
 
  - 简单的例子：  
  bank.com通过GET来服务用户转账：`bank.com/transfer?to=Alice&amount=100`。  
  对于GET请求所有数据都在URL中，客户端的cookie会在每次请求时都会放在HTTP Header中发送给服务器。  
  hacker发给受害者一个链接`bank.com/transfer?to=hacker&amount=100000`，这样当受害者在浏览器中点击时，就会被服务器执行。因为服务器无法知道这是不是用户本身的意图，就当做合法的请求执行了。  

  - 抵抗方法：  
    - a. 服务器端在执行敏感用户操作时，再次要求核验用户身份，如再输入一次密码；
    - b. 检查注入请求发起的源头是否合法，即检查HTTP Header中的`Referer`，它表明当前请求的来源（但这依赖于浏览器，若浏览器本身有漏洞则不安全）；
    > The `Document.referrer` property returns the URI of the page that "linked" to this page.

- `XSS`(Cross-site Scripting): 跨站脚本攻击  
  分为三种：Stored XSS Attacks, Reflected XSS Attacks, DOM Based XSS Attacks(less well-known)  
  前两种都是服务端的flaw，攻击代码被注入在http response中。后一种称是Client Side XSS（也成为local XSS，应该是本地遭遇的，如开一个wifi然后利用网关监听所有HTTP请求，等真正server返回Response后，网关向Response中注入再返回给客户端。典型的例子比如http被运营商劫持，打开网页发现有运营商的广告）

    - Stored XSS Attacks  
    注入的恶意脚本在服务器上，这样当用户请求到这部分内容时，脚本会在benign用户这边执行。  
      - 例子：
      我在foo.com上留言，留言的内容是一段脚本(`<script>alert(1)</script>`)，保存到了服务器。  
      当其他用户访问foo.com加载留言时，我这段脚本就被服务器发送给用户，继而在用户浏览器中被执行。

      - 如何避免：  
        - 过滤/转义危险输入
        - ？

    - Reflected XSS Attacks  
    用户点击url触发攻击，将恶意代码放在请求中，服务端将部分输入作为响应返回给用户，在用户浏览器中被执行。  
    这种最容易通过创建一个**恶意url**，邮件等方式发送给用户引诱点击。

      - 例子：
      比如一个网站从请求的url中取`name`，回显在页面上给用户看。  
      如果hacker修改url发给用户，用户点击后这段恶意代码可能就被服务器放在了页面中返回给用户，进而用户被hijacked。  
      如
        ```js
        weakless-site.com/q?name=<script>alert('heihei!');</script>
        weakless-site.com/q?name=<script>var cookie = document.cookie; // send cookie to hacker's own server </script> // 把这个cookie发送给黑客的服务器
        ```
      - 如何避免：  
        - 过滤/转义危险输入
        - ？

    - DOM Based XSS Attacks  
    通过修改DOM形成XSS。  
    假设页面中脚本执行时（比如创建DOM），从url中取参数。这样的话，我（作为攻击者）修改url中参数的值为一段脚本。  
    将这个链接发给小白用户，用户点击后，客户端脚本从url中取值，并试图创建DOM。  
    那这段脚本就被注入到了小白用户的DOM中，继而被执行。
  
      - 例子：  
      比如wikipedia上举的例子，网站语言`default=xx`，`xx`是一个`<select>`控件的选项。  
      如果修改url中的`default=Chinese<script>alert(123);</script>`，那么这个带有script值的选项就注入到了页面中，这个构造DOM的过程是在前端执行的。（其实也是服务端的bug啊）

      - 如何避免：  
        - 过滤/转义危险输入
        - ？

- `Replay Attack`：重放攻击
中间人攻击的一种方式，截获发送的报文，不需要解密，直接将它完整地再发送给目的主机。这样会造成相同的操作进行了两次，便称之为*重放攻击*。  

  - 案例：  
  如登录网站，密码经过md5后，经HTTP传输，服务端从数据库取密码进行对比，若一样则认为用户登录成功。  
  重放攻击加入，中间人监听到发送给服务端的报文，将报文原封不动（他不需要解密）再次发送给服务端，那么服务端当然会授权登录成功。

  - 抵御重放攻击的方案：
    - a. 创建和时间相关的`session_key`  
      服务端在接收到HTTP请求后，生成一个时间戳（或用sessionID），用户登录时，将md5后的密码和sessionID混合后再md5，然后将这个结果传输。   
    由于sessionID不同，则中间人重放该报文也无效。  

    - b. `OTP`(One-Time Password)一次性密码，每次交易用过就作废
    - <span style='color:red'>疑问</span>：  
      重放报文哪里来的sessionID？按OSI模型，HTTP在应用层，TCP/IP在下层，只要截获应用层的数据包，修改TCP/IP报文头源主机为中间人主机地址，那不就重放了？关sessionID什么事？HTTPS只不过是在TCP/IP之上有个TLS/SSL，截获加密后的HTTP报文，照样重放。

了解HTTP authentication  
HTTP协议中定义了认证的模式，基于`Basic` schema。  
服务端返回401（未授权），要求客户端提供证明信息，客户端在HTTP Header中：
```
Authorization: Basic <credentials>
where <credentials> = base64(<username>:<password>)
```

e.g. 
```
Authorization: Basic eGl5dToxMjM0NTY=  (xiyu:123456)
```

其他认证schemas：
- `Bearer`(/be/ n. 持票人，送信人，搬运工人)  
  bearer tokens to access OAuth 2.0-protected resources.
- Digest
- HOBA
- Mutual
- ...


常用的认证机制：basic auth, session auth, token auth, OAuth, OAuth2  
- basic auth  
  `username`+`password`，就像HTTP Basic Authentication一样

- token auth
  token-based, 第一次向服务器证实自己使用`usrname`+`password`,服务器验证通过后发送给client一个`token`，这个`token`就表示了已验证的用户。  
  可在随后访问服务器的请求中将此`token`带上，以执行经过授权的操作。

- OAuth2
  第三方应用(Client)向管理资源授权的服务器(Authorization Server)请求授权用户的资源访问，授权服务器询问用户(Resource Owner)是否同意授权(Authorization)，以授权第三方应用能访问位于资源服务器(Resource Server)上的用户资源。[Access token, Refresh token, Authorization code授权码]  
  - 例子：  
    某第三方应用A提供了"使用微信授权"的登录方式。  
    1. 用户打开第三方应用A，点击"使用微信授权登录"；
    2. 第三方应用将用户重定向到微信服务器；
    3. 微信服务器知道是应用A在向用户请求授权，展示微信的网页询问用户是否同意授权获取他**位于微信服务器上**的用户资源；
    4. 用户同意，则微信的网页将重定向回第三方应用A，并且微信服务器将授权码发送给第三方应用的服务器，以使得第三方应用可以访问微信服务器上用户所授权的的资源；
    5. 至此，用户就通过第三方（微信）登录的方式，登录了应用A。**这个过程就叫做OAuth2**。

### 4.2 web storage
- window.sessionStorage  
  对每个域名分别存储，浏览器关闭后session清空。

- window.localStorage
  同上，只是数据没有过期时间，浏览器关闭也不会清空。（FF：10MB/domain）
  > String in javascript are UTF-16，占2个字节

  以上两种总结：
  1. 只能存储string，对于一些数据类型，我们必须序列化再存；
  2. 无安全性，current domain页面中的js可以访问
  3. 读写是同步的，不能和web worker一起使用
  4. 大小仍然限制为10MB

  基于OS或Browser的不同，一般都存储在文件中。它们适用于存储非敏感信息、不超过10MB的字符串。  

- indexedDB
  web storage只能存储少量的数据，而本尊可以存储大量结构化的数据(structured data)，包括file/blob  
  这是一种可以将数据永久存储在用户浏览器中的方法。
  > IndexedDB is a way for you to persistently store data inside a user's browser。  
  > note-powerful but complicated, you'd better use library instead.  
  > If you'd prefer a simple API, try libraries such as `localForage`, `dexie.js`, `ZangoDB`, `PouchDB`, and `JsStore` that make IndexedDB more programmer-friendly.

  关键点：
  1. indexedDB存储key-value，value可以使复杂的结构、对象；
  2. indexedDB建立在事务模型上（transactional database model）；
  3. indexedDB API大多数是异步的（即读写数据时都需要给个回调）；
  4. etc... 大致了解下，***80%的知识实际中都没用到，用到再细学，精力总是有限的，应该关注那些在实际中80%都会用到的20%知识！***

### 4.3 [JSON Web Tokens (JWTs)]
用户首次认证后，服务端签发token给客户端，服务端不保存任何状态。因此这种验证方式属于<u>服务器无状态的验证机制</u>。
由于签名时混合了服务器自身的秘钥，因此当有请求带着这个签发的token来访问资源时，服务器可以根据签名的计算公式对比，以检查token是否有被篡改。

这种方式看起来天衣无缝啊，要保证token在传输中是安全的、不被偷窃就行。但缺点是，Payload中不能放敏感信息，因为它本身是明文传输的（当然，用HTTPS的话随你）。token一旦签发，服务器没办法去主动地废弃某个token，只有等它自然过期了。

服务器签发给前端的token:

    Header.Payload.Signature

`Header`表明签名所使用的hash算法;

`Payload`包含一些令牌的信息;

`Signature`是结合服务器端的秘钥`secret`，对前两个数据进行签名的结果。

    Signature=HMAC-SHA256(base64urlEncoding(header)+'.'+base64urlEncoding(Payload)+secret)


当客户端与服务器通信时，将此token添加到HTTP Header中的`Authorization`中，用的schema是Bearer！

In HTTP Header:

    Authorization: Bearer <token>

参考：http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

## 5. 构造函数
## 6. iief

javascript中的`()`不可以包含*statement*，因此将function括起来，当parser分析时就会认为`()`内的function是一个*expression*，而不是*function declaration*，这就是**Immediately-invoked**执行了。

在一些必须是*expression*的地方，function写那里是不会有歧义的，因此function外围加不加parens都可以。在function后添加parentheses可以调用该函数。如

```js
var f = function(){return 5;}();//f == 5
(function() { /* code */ } ());//way1
(function() { /* code */ } )();//way2
```

建议还是约定俗成，统一带上parens以明确地表示出这是一个iife：

```js
var f = (function(){return 5;})();
```

或

```js
var f = (function(){return 5;}());
```

And because any function defined inside another function can access the outer function’s passed-in arguments and variables (this relationship is known as a **closure**, an **Immediately-Invoked Function Expression** can be used to “lock in” values and effectively save state.

## 7. `var` vs `let`

- 两者都会被*hoisting*，但`let`声明的变量如果没有初始化就引用，则会显式地抛出*Reference error*，不像`var`不会抛出异常（认为`var`变量被初始化为`undefined`，不像`let`、`const`这俩都不会被默认初始化），`var`只有*global/function scope*，而`let`还可以限制在*block scope*，如`{}`、`for()`内。

- `var`声明后会被初始化为`undefined`, `let`声明后则不会被初始化，直到执行到它的初始化语句。

- `var`在global声明的变量会作为window object的一个property, window.myVar = 5。而`let`不会。

- `const`和`let`类似，`const`声明时必须初始化，作用域为块级，也存在临时性死区Temporal dead zone

### 7.1 [Temporal dead zone](https://scotch.io/tutorials/understanding-hoisting-in-javascript#toc-es5)

> 临时性死区：由于`let`被*hoisting*但它不像`var`会被默认初始化为`undefined`，let在<u>作用域顶部到为它赋值的语句</u>这一段区域都是未初始化的，此时若引用`let`变量则会抛出*Reference error*。


[ref]https://scotch.io/tutorials/understanding-hoisting-in-javascript#toc-es5

### 7.2 hoisting(提升)

```js
var foo = function(x, y){
    return x - y;
}
function foo(x, y){
    return x + y;
}
var num = foo(1, 2);
```

会被javascript编译器处理为：

```js
// variable hoisting变量提升
var foo; // foo#1
var num;

// function declaration hoisting函数声明提升
function foo(x, y) { // foo#2
    return x + y;
}

// function expression NOT hoisted函数表达式不会被提升
foo = function(x, y) { // foo#3
    return x - y;
}

num = foo(1, 2); // 这里使用foo#3
```

> 规则
> 1. 变量声明、函数声明都会被提升到作用域顶处；
> 2. 当出现相同名称时，优先级为：
>
>    变量声明(*foo#1*) < 函数声明(*foo#2*) < 变量赋值(*foo#3*)

因此，`num`计算时是用的*foo#3*，结果为-1。

refs:
1. https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
4. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function
5. https://stackoverflow.com/questions/40675821/what-happens-when-javascript-variable-name-and-function-name-is-the-same

## 8. event loop

所有同步任务在主线程上执行，形成一个**执行栈**(*execution context stack*)。

还有一个**任务队列**(*stack queue*)存放事件。

当**执行栈**上的同步任务执行完后，主线程有空闲了，这时才会读取**任务队列**中的第一个事件并执行。

理想状态下，浏览器每秒进行**60**次*repaint*，实际上`Render`也是一个回调函数，它也会在*stack queue*排队，只不过`render`的优先级要更高。

所以当*call stack*不空时，`render`即便优先级再高，还是被阻塞，等空了才能优先执行*render queue*中的函数。

> So, basically the browser is kind of constrained by what you're doing javaScript, the browser would like to repaint the screen every 16.6 milliseconds, 60 frame a second is ideal, that's the fastest it will do repaints if it can. 
>
> But it's constrained by what you're doing in JavaScript for various reasons, so it can't actually do a render if there is code on the stack, right. Like the render kind of call is almost like a callback in itself. It has to wait till the stack is clear.
>
> The difference is that the render is given a higher priority than your callback, every 16 milliseconds it's going to queue a rend, wait till the stack is clear before it can actually do that render.

refs:
1. https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
2. http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/

## 9. closure

> A closure is the combination of a function and the lexical environment within which that function was declared.

就是说在函数声明所在的**scope**，结合函数本身，形成一个**闭包**的概念。

实际上利用函数访问作用域的概念，经典容易犯错的如for loop中为不同的按钮事件赋event handler.

因为for中声明的如果是`var`，而`var`只有*function scope*和*global scope*两个概念[<sup>[1]</sup>](##-7.-`var`-vs-`let`)，所以for中的这个`var`相当于是一个*enclosing variable*（即好比在for表达式块外面的作用域声明的），那当for循环内的代码执行完后，其实都引用的是同一个变量。

怎么让他各自引用单次迭代时的变量呢？把`var`换成`let`即可（因为`let`声明的变量是*block scope*，即每次迭代引用的就是当前迭代内变量的值）；或者使用**闭包**（每次迭代将`var`变量传入闭包）。

对于性能问题，MDN建议没必要用闭包的地方，就不要再在function中声明function，这样在每次创建object都会reassign，应在prototype上添加function。

闭包可用来实现[Module Pattern](##-11.-Module-Pattern)，其实就是把一些方法、属性模块化到一个object(这个object一般是单例)，由*iife*返回。这样可以减少global scope pollution，而且还创建了privacy。

> Having all this, how should we tell the *parser* that what we really want, is to **call a function immediately after its creation**?
> 
> The answer is obvious.
>
> It’s should be a *function expression*, and not a *function declaration*. 
>
> And the simplest way to create an expression is to use mentioned above grouping operator. Inside it always there is an expression.
>
> Thus, the *parser* distinguishes a code as a *function expression* (**FE**) and there is no ambiguity.
>
> Such a function will be created during the *execution stage*, then executed, and then removed (if there are no references to it).

refs:
1. http://benalman.com/news/2010/11/immediately-invoked-function-expression/
2. http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses


## 10. enclosing function
*nested function*的上一级function，即向外一层的那个function scope。

"我外面一层的作用域"。
## 11. Module Pattern
是一种js的设计模式，通常会通过*iife*创建一个单例object，而后供client代码调用。

refs:
1. https://coryrylan.com/blog/javascript-module-pattern-basics

## 12. strict mode
限制了一些语法的使用，如

对于在function中的`this`，如果非严格模式下，`this`指向global object(即`window`)，严格模式下，`this`在进入运行作用域内时被设定，且不会再被改变(the value of `this` remains at whatever it was set to when entering the *execution context*)。
## 13. prototypal inheritance(原型继承)
Each object has a private property which holds a link to another object called its ***prototype***.

每个对象都有一个私有属性，它维持了一个引用，指向另一个对象。

这"另一个对象"就被称之为前面那个对象的***prototype***。

*`__proto__`* contains the object's constructor's prototype object.

*`__proto__`* 是每个object都有的属性，指向其构造函数的原型对象prototype object.

Let's say that *`xiyu`* is an instance of constructor `Person`. So *`xiyu.__proto__`* is the `Person`'s *prototype*.

In the same way, *`xiyu.__proto__.__proto__`* is the *prototype* of `Object`, which is `Object` itself.

And *`xiyu.__proto__.__proto__.__proto__`* is `null`.

*prototype*是构造函数(constructor)上的一个属性，**它的值就是一个对象**，存储了可以被子类（链）继承的*properties*和*methods*。

定义在*prototype*上的*properties*和*methods*才会被子类继承。

如`Object.prototype.valueOf()`会被继承，但`Object.assign()`就不会被继承。

> They are *methods*/*properties* available just on the `Object()` constructor itself.
> 
> The *prototype* property's value **is an object**, which is basically a ***bucket*** for storing properties and methods that we want to be inherited by objects further down the prototype chain.

在constructor function的*prototype*属性上定义methods  
在constructor中定义properties

**这样代码更加易读。**

> In fact, a fairly common pattern for more object definitions is to define the properties inside the *constructor*, and the methods on the *prototype*. 
> 
> This makes the code easier to read, as the *constructor* only contains the **property definitions**, and the **methods** are split off into separate blocks. 

### 13.1 `prototype` vs `this`
每个object都有一个指向它*prototype*的指针，这个指针是js内部的一个对象（不过在多数主流浏览器下，可以通过 *`__proto__`* 来访问），***prototype*对象定义了一些你想要继承的成员变量/函数**。

```js
// 这是在具体对象上定义了一个自有属性，而不是原型上的，不会被继承
this.name = 'xiyu';

// 这是定义在Person的prototype对象上，它可以被继承
Person.prototype.sayHi = function() {
  console.log(`say hi from ${this.name}`);
}
```

> Setting a property to an object creates an own property.

### 13.2 `Object.create` vs `{}`
```js
// ECMA5(2009), 用object作为新创建对象的prototype object，返回新建对象
Object.create(object) 
```

ECMA6(2015)实现classes的关键字包括: `class`, `constructor`, `static`, `extends`, `super`

> that suit keywords is just a *syntactical sugar*(语法糖)...

refs:
1. https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

## 14. how does `this` work?
In most cases, the value of this is determined by how a function is called.
如果想要传this，则可以通过Function原型对象上的call/apply方法。Function.prototype.call(arguments one by one)/Function.prototype.apply(arguments as an array-like)。
15.[js]event bubbling
16.[network]描述客户端和服务端之间进行通信的一些方式，网络协议等（IP, TCP, HTTP/S/2, UDP, RTC, DNS, etc.）
[DNS]
DNS将域名映射为IP，供浏览器向主机发起请求。
(1). 浏览器输入www.example.com后，需要将此主机地址转换为实际的IP地址，先从浏览器缓存中查找；
(2). 如果没有，则尝试从本机hosts文件中查找映射；
(3). 如果没有，则尝试向本机配置的首选DNS发起请求，DNS在它本地存储的记录中查找；
(4). 如果没有，则首选DNS服务器会向ISP发请求（如英特网服务提供商：电信）；
(5). 如果没有，则ISP服务器应该会开始直接请求根域名（即root domain：.），全球有13台根域名服务器；
(6). 此时进入迭代查询，根DNS将顶级域名（.com）服务器的IP地址返回给ISP；
(6.1). ISP再向（.com）DNS发请求，（.com）DNS将（.example.com）的IP地址告诉返回；
(6.2). 此时ISP已经拿到了www.example.com对应的主机地址，就可以进行下一步：发起TCP连接请求了。

[域名发散]
Domain Sharding(shard: (玻璃等的)尖片），由于浏览器限制了对同一域名的最大连接数（一般为6-10左右），在HTTP/1.1中每个连接对应一次请求，因此对于网页需要加载较多资源时很难满足快速的响应。为了利用并发性突破浏览器的连接数限制，人们想出了将资源分散到不同的域名下，这样就能大大提高并行连接的数量，因而提高网页的加载速度。这个思路便就是域名发散了。
但遗憾的是，经过实际数据测试，在PC端表现尚可，移动端却非常缓慢（2G、3G、4G、WiFi）。数据显示在4G时加载www.taobao.com总耗时1733ms，当使用域名发散机制时，平均DNS解析时间需要2.32s（Safari，2-shard）、2.55s（Safari，4-shard）。
所以移动端不适合域名发散，那只能乖乖地尽量将资源放在同一域名下。这就叫做域名收敛（其实就是最普通的做法而已，只不过并不一定严格地全部都放在同一域名下，可能数量较域名发散少些吧，寻找一个性能最优的域名发散数量~）。
那还是不快啊，有什么更好的办法吗？
有，大屌Google告诉你：SPeeDY！

[域名收敛]
见域名发散。

[SPeeDY]
SPDY，是HTTP/2.0的前身。
SPDY(音SPeeDY)，是Google开发的一个协议，旨在通过解决HTTP1.1中的一些问题来提高网页的加载性能。主要通过引入binary frame layer来达到在一个TCP连接上，请求、响应复用的效果。
  [HTTP/1.x的一些缺点]
  客户端为实现并发、减少时延，需要发起多个TCP连接；未压缩的请求、响应头部，会导致不必要的网络开销；也不支持资源优先级，导致TCP连接效率低下。
  Unfortunately, implementation simplicity also came at a cost of application performance: HTTP/1.x clients need to use multiple connections to achieve concurrency and reduce latency; HTTP/1.x does not compress request and response headers, causing unnecessary network traffic; HTTP/1.x does not allow effective resource prioritization, resulting in poor use of the underlying TCP connection; and so on.
  [HTTP/2要解决的问题]
  为提高网络资源使用效率、减少时延，HTTP/2引入header压缩、在同一个连接上交替进行请求、响应的发送，还支持请求优先级机制，让更重要的请求先完成。
HTTP/2 enables a more efficient use of network resources and a reduced perception of latency by introducing header field compression and allowing multiple concurrent exchanges on the same connection… Specifically, it allows interleaving of request and response messages on the same connection and uses an efficient coding for HTTP header fields. It also allows prioritization of requests, letting more important requests complete more quickly, further improving performance.
  [HTTP/2解决问题的方式]
  引入binary framing layer。即不像HTTP1.1那样，request和response用回车换行来分隔，而且内容是纯文本(plaintext)。HTTP/2将其分隔到更小的消息中，每个消息都以二进制格式编码。

google developer、mdn developer都已经用的是HTTP/2，老大就是屌的一笔
[note]不细看了。。很多干货，也很细致。按黄正蔚的perception：深入钻研可能只会从80%到90%，不如用这些10%的精力去学习另一种新知识，从0到50%要比这10%可能更合适些吧。
[ref]https://developers.google.com/web/fundamentals/performance/http2/

[HTTP Caching]
只有GET请求会缓存，用URI进行对比。
Cache-Control是个通用的指令，Request和Response的Header都可以用。
private cache: 只能由单独的用户自己使用；shared cache：可以由多用户使用，如代理服务器可以作为缓存，服务于多用户。
Pragma：是HTTP/1.0的Header，相当于Cache-Control: no-cache
Vary: 该指令用于指示缓存应服务于那些匹配的请求。有点绕，举例子：
请求1：GET Accept-Encoding: *； 响应1：Content-Encoded: gzip; Vary: Content-Encoding
请求2：GET Accept-Encoding: br;  响应2：Content-Encoded: br; Vary: Content-Encoding
注意，这里响应2仍然是将客户端发来的请求2 foward到origin server，因为Vary指明Encoding必须相同才可利用缓存（这里Accept-Encoding不同，缓存的是gzip，而请求的是br）
请求3：GET Accept-Encoding: br; 响应3*：这次匹配，命中Cache直接返回。

## 17.[js]for...in vs for...of(for...of是es6)
- `for...in`：对object的所有enumerable的属性进行任意顺序的遍历，包含继承的属性。但注意对Array/String用for...in，遍历得到的每个value是index，而不是数组元素/每个字符。因为在javascript中，everything is an object！
- `for...of`：对iterable objects进行遍历（如内置的Array、Map均已实现，但Object是没有的），因此为了让Object也支持遍历，则应首先这个object得有@@iterator方法，即Object得有一个叫做"@@iterator"的属性，且这个属性可以通过常量"[Symbol.iterator]"来访问。
[Symbol.iterator]：它是一个无参函数，返回一个实现了next接口的object。而next是一个无参函数，返回形如{value: somVal, done: boolean}的object（参见iterator protocol）。p.s.和C#的枚举类类比即可：类含有一个iterator用来遍历，这个iterator又实现了iterable接口。
要让一个object支持iteration，需要加一个[Symbol.iterator]属性、且其值为一个可以返回迭代器（就是一个实现了next的object）的函数。
```js
var myIterator = {
    next: function() {
        // ...
    }
    [Symbol.iterator]: function() { return this }
};
```

### 17.2 spread syntax
[...myIterableObject]: spread syntax[ES6], allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

18.[js][+3]call vs apply vs bind(ES5)
语法都很像：myFunction.call/bind(thisArg[, arg1[, ...]]); myFunction.apply(thisArg[, argsArray]);
相同点：都是想改变function中执行时的this。
注意：primitive value passed as thisArg is converted to object
Function.prototype.call/Function.prototype.apply
使用给定的object作为this，执行一个函数。call的参数列表是one by one，apply的参数列表是以数组形式提供（也可以是array-like object）。
什么是array-like object?
就是一个含有'length'属性、同时且含有[0, length)整型属性作为关键字的object。如{ 'length': 2, '0': 'eat', '1': 'bananas' }。

Function.prototype.bind
为myFunction创建一个wrapper function(bound function),当它被调用时，内部this指向'thisArg'；这里的arg1...等参数，在调用时会插在实参的最前面。
Function.prototype.bind = function(scope){
  var fn = this;
  return function(){
    return fn.apply(scope);
    //return this.apply(scope);//特别注意！这个写法是错误的！仔细想想this的定义：this是function内的变量，它的值由函数如何被调用决定的。这里this并//不是作用域外上面那个this，而是当前function内的this！讲道理这个this未能决定是被谁调用的，所以是window object（strict模式下是null/undefined）
  };
};
[ref]https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/

confused me a lot:
//MDN: slice虽然是Array.prototype上的方法，但是它也同样可以在Array-like object上调用。
//slice是call的bound function，而这个bound function中，this指向的是Array.prototype.slice这个函数。
//Array.prototype.slice虽然定义在Array的prototype上，Array及其子类可以直接使用。但slice执行时，this实际上指向对象Instance。且只要这个对象是个array-like object就可以。故，为了能对array-like object使用slice方法，则就要想办法把slice执行时的this，指向那个object。slice内部执行时，就是调用了的myArrayLikeObject.slice。
//这就有了call/apply，可以this绑定为通过thisArg传入的array-like object。
//slice(param) == Array.prototype.slice.call(param);
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);
//boundCall:
//this == unboundSlice
//2018年11月11日08:03:53 myFunction.bind(scope); means 在scope上调用myFunction，即call(unboundSlice)==unboundSlice.call
//所以在boundCall调用时，内部相当于 unboundSlice.call() == Array.prototype.slice.call
//TMD好绕...我想我理解了。关键在于调用一个方法时，我们用object.method()，这里thisArg就是要手动改变object的。
function ToArray() {
  return slice(arguments);
}
arguments is an Array-like object accessible inside functions that contains the values of the arguments passed to that function.

var list1 = ToArray(1, 2, 3); // [1, 2, 3]
[ref]https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
19.[js][es6]promise、promise chaining
主要是用来使异步代码的编写变得更加优雅。
A promise represents the result of an asynchronous operation. 3个状态：pending, fulfilled, rejected.
[tips]
1. 语法
var cleanRoomPromise = new Promise(function (resolve, reject){
    //do something, possibly async...
   	
    //when this shit finished
    var isFinished = true;
    if (isFinished){
        resolve('room cleaned');
    }
    else{
        reject('not cleaned');
    }
});

2. 机制
Promise的构造函数接受一个function参数，称之为executor。new Promise时，executor会被立即执行，执行完毕后，构造函数才返回。
executor中关键在于，当任务完成时（正常/出错），分别调用resolve/reject。resolve/reject都接受一个参数，可以是任意类型。这俩函数是由javascript引擎定义好的，在构造Promise时，在ctor内部调用executor时，会将内置的这俩函数传给executor。当promise设置的任务完成时调用这俩，其实就是做了一件事：修改Promise内部的状态。对于resolve，设置status为"fulfilled"（即promise成功）、result为"room cleaned"（即调用resolve时的参数）；同理对于reject，设置status为"rejected"（即promise出错）、result为"not cleaned"（即调用reject时的参数）。
当调用了resolve/reject后，此时会执行传给then的回调函数。

对于then，then的执行是异步的，即使promise中的任务不是异步，立即就执行完的，但.then的任务是会被挂起，当promise确定要执行回调时，该任务会被放在event loop中的队列中，直到当current execution完毕，js引擎才有空去检查、并执行队列中的任务。So the code after .then ends up always running before the Promise’s subscribers, even in the case of an immediately-resolved Promise.
cleanRoomPromise.then(alert);
console.log('always run before alert');
//[deleted]我的理解是这可能开了一个定时器线程，轮询检查promise的状态，然后根据status调用resolve/reject callback。
//感觉不需要定时器的，Promise内部可能有个队列，像多米诺骨牌，第一次new Promise时开始执行异步任务，执行完成后，调用resolve或reject，Promise对象内部对应地取队列中下一个需要执行的任务（即按顺序.then的），对应地执行onResolveCallback或onRejectCallback。
then的callback需要return值，而后链式调用。
但如果想用Promise then个一连串的ajax异步请求，那then的callback中，就得return一个新的Promise了，这个Promise开始构造时就执行异步请求，虽然return了，但此时return的是一个pending状态的Promise，当然不会继续第二个then的执行。
[ref]https://javascript.info/promise-basics (感觉比MDN、Google Developer写得更简单易懂。。)

3. 链式调用chaining
.then(resolveCallback, rejectCallback).then...
.then返回的还是一个promise，且then传入的回调函数所return的值，将作为下一个then调用函数时传入的参数。
如果then中的回调没有return一个值，那传给下一个then的value=undefined
.all/.race/.resolve/.reject
.all : when the promise returned by 'All' resolved, the returned values will be in order of the Promises passed, regardless of completion order.
Rejection:
If any of the passed-in promises reject, Promise.all asynchronously rejects with the value of the promise that rejected, whether or not the other promises have resolved.

20.[js][ecma2015]arrow functions
注意：它的execution context中没有this、arguments、super这些变量，所以不能作为构造函数。也没有prototype属性、也不能作为generator。
() => expr1;//等价于 return expr1;
a => { expr1; expr2; }
(a, b) => { expr1; expr2; }
(a, b) => ({ name: a, age: b });//返回一个object literal时，这种concise写法，函数体必须用()括起来
非常关键：因为箭头函数作用域没有自己的this，所以试图通过call/apply来设置this是无用的，这个变量会被忽略。
Since arrow functions do not have their own this, the methods call() or apply() can only pass in parameters. thisArg is ignored.
//tricky：这货有个牛逼的地方在于：因为内部没this，它实际上按照普通的变量作用域法则去找this，完美枪毙setTimeout中this指向window object的问题。
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the Person object
  }, 1000);
}

21.[js][es6]Rest parameters
语法：function foo(a, b, ...restParamArgs)
解释：允许定义无限参数，在调用时，除了a、b，其他参数都会被放到一个名叫"restParamArgs"的Array中。
区别：arguments是object，restParamArgs是Array；arguments是传给函数的所有参数，而restParamArgs是除去实参剩余的部分，构成的一个数组。

22.[js][es6]generator, yield, iterable protocol, iterator protocol, function*
见52.

23.[network]GET vs POST
get: 数据通过url querystring发送给服务端，大小有限制（2k左右吧），一般服务器还会log下来，所以不适合存放敏感信息
post: 数据放在http body，无大小限制

24.[network]http vs https
不同点：
1. http协议本身没有加密传输，https则是位于TLS/SSL之上的加密协议；
2. 因为https建立连接时首先需要验证证书、确定加密秘钥(TCP三次握手+SSL握手，RSA算法据说占到75%的时间，而之后传输所用的对称加密算法是很快的)，因此https较http慢一些；
3. http采用80端口，https采用443端口；
4. 证书要钱！

https是http over TLS(Transport Layer Security)/SSL(Secure Sockets Layer)，是一种建立在安全传输层之上的http协议。
实际上TLS/SSL并不属于传输层，而是位于传输层之上，为其上的应用层提供安全传输的服务。
--OSI(Open System Interconnection)模型--
应用层(Application Layer)[HTTP, FTP, SMTP, SOAP, POP3]
表示层(Presentation Layer)[TLS, SSL]
会话层(Session Layer)[used where application makes use of RPCs.]
传输层(Transport Layer)[TCP, UDP]
网络层(Network Layer)[IP, ARP]
链路层(Data link Layer)[ARP, IEEE 02.11]
物理层(Physical Layer)[USB, DSL]

ps. HTTPS其实分为两种认证方式：单向认证(即客户端要验证服务器，一般都是单向认证)和双向认证(服务器也要验证客户端)。

[HTTPS建立连接的过程]
TCP三次握手阶段[TCP协议]:
1. client发请求建立TCP连接(SYN i);
2. server返回对客户端序号(SYN i)的确认(ACK i+1)，以及服务端序号(SYN j);
3. client返回对服务端序号(SYN j)的确认(ACK j+1);
SSL/TLS握手阶段[e.g. TLSv1.1协议]：
4. client向server发送一个随机数R，并附带消息: Client Hello；
5. server向client发送一个随机数S、server.crt(服务器证书)，并附带消息：Server Hello；
6. client验证server.crt无误后，再生成一个随机数Pre-Master，用server.pub(服务器公钥)对其加密，并告知server后续的传输都使用约定的对称秘钥和加密算法进行加密通信(对称秘钥=SomeFunc(R, S, Pre-Master))。同时再附上用约定好的对称秘钥对前面SSL握手的所有信息及其hash进行加密后的结果，[如果是双向认证，则附带client.crt(客户端证书)]，传给server；
7. [如果是双向认证，则验证client.crt]，server用server.key(服务器私钥)解密得到Pre-Master，用约定的对称秘钥解密握手信息以验证完整性。server也告知client后续传输使用约定的秘钥和加密算法进行加密通信。同时，server也对握手信息再加密传给client。client收到后解密验证握手信息无误后，接下来就可以进行HTTPS安全传输了。
8*. [Application Data]

可以看到，TCP用了3个包，SSL/TLS用了4个包。从第8个包开始（当然没有重传的情况下），就是传输的应用层数据了。

[可以用wireshark抓包]
4. client->server: Client Hello
5. server->client: Server Hello, Certificate(服务器的证书), Certificate Request(如果是双向认证，则有，表示服务器要求客户端出示证书), Server Hello Done
6. client->server: Certificate(如果是双向认证，则有，表示客户端将client.crt发给服务器), Client Key Exchange, Certificate Verify, Change Cipher Spec, Encrypted Handshake Message
7. server->client: Change Cipher Spec(告知后续通信采用协商的秘钥与算法进行加密通信), Encrypted Handshake Message

ref: https://blog.csdn.net/ustccw/article/details/76691248

--RPC--
Remote Procedure Call(远程程序调用)，客户端程序执行子程序，而子程序是由远程计算机来计算的，客户端不需要关心实现细节，最终结果返回给调用者-客户端。这样的模型即是RPC。

--TLS/SSL--
SSL 1994 netscape(v1.0)
1995 SSL 2.0
1996 SSL 3.0
1999 TLS 1.0(upgrade to SSL 3.0)
2006 TLS 1.1(minior update to TLS 1.0)
2008 TLS 1.2
2018 TLS 1.3

### websocket vs http


25.[js]逻辑运算符：&&、||、!
expr1 && expr2: 若expr1能转为false，则返回expr1；否则返回expr2
expr1 || expr2: 若expr1能转为true，则返回expr1，否则返回expr2
!expr: 若expr1能转为false，则返回true；否则返回false
'dog' && 'cat' => 'cat'
null, undefined, “”, ‘’, NaN, 0 => are considered falsy
26.[js]比较运算符：==、===(strict mode)、<=、etc
终极奥义看这个spec：http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3 
The equality operator converts the operands if they are not of the same type, then applies strict comparison.
0 == false // true
0 == null // false,

如果一个操作数是Boolean，则转为+0(false)或1(true)
如果an object和string/number作比较，则将object做强制类型转换valueOf/toString
（强制转换发生的必要条件：object是在和primitive类型做比较！否则是采用比较两个object的规则）

ref:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Using_the_Equality_Operators 
ref: http://www.ecma-international.org/ecma-262/5.1/#sec-9.1
字符串比较按照unicode顺序
NaN is not equal to anything, include NaN.

Positive and negative zeros are equal to one another.
+0 === -0

Null and Undefined Types are strictly equal to themselves and abstractly equal to each other.
undefined == null
undefined !== null
undefined === undefined
null === null
isNaN(1 + null)      // false
isNaN(1 + undefined) // true

27.[structure]web服务器集群
集中式：一个任务交给1台服务器处理
分布式：一个任务分解成若干子任务，发送给不同服务器处理
负载均衡：1台apache作为门面，在前端用负载均衡把请求发送给跟在后面的若干个tomcat应用服务器
负载均衡带来的问题：会话问题
会话处理：
1. session粘性：固定发给第一次访问的服务器(如负载均衡，上次访问服务器A的，这次还导向访问A）
2. session同步：任意一台服务器session发生变化，同步到所有服务器
3. session共享：多台服务器共享同一个session服务器（采用redis或memcached）（访问disk慢）
    应用程序连session服务器用分布式缓存系统，后面再跟数据库。
    3.1 memcached 分布式存储服务器集群相互之间不通讯，应用程序在set/get时，通过对key做hash算法决定这个数据应该映射到哪个memcached。比如有2台memcahed，"foo=bar"映射到memcached1，"hi=xiyu"映射到memcached2。(ref: https://www.cnblogs.com/phpstudy2015-6/p/6713164.html)
4. cookie：保存在客户端，不安全&&数据量有限&&每次请求都要带

28.[http server]Nginx vs Apache vs Nodejs
Apache HTTP Server（latest: 2.4.37, 2018-10-23），is free and open-source cross-platform web server software。大多运行在Linux，但现在也有一部分可运行在Windows。最早开发于1995，2009年成为第一个为超过100millions网站做服务的软件。截止2018年8月，估计有39%的网站使用Apache。
a.Nginx和Apache都是用C写的，因此解释型的Nodejs相比于前者，执行效率天然就会慢一些；
b.Nginx和Nodejs类似，都是异步非阻塞、事件驱动型，只用到较少的进程，因此高并发支持的较好，多个连接对应一个进程。epoll网络I/O模型是Nginx能处理高并发的核心原因；Apache则是阻塞型的，一个连接对应一个进程。
c.Node适合并发场合，如chart room、multiplayer game，不适合static websites like CMS, blog, ecommerce。
Apache使用PHP脚本语言。
Nginx和Apache类似，适合serving static files。
三者并不互斥，通常有的服务器会安装Apache and/or Nginx，并一同安装Node，以更好地服务不同类型的请求。
In fact, It is rare to find a website that relies solely on node to serve content in the wild.

Apache vs Tomcat
Apache HTTP Server是一个HTTP服务器（也可直接叫Apache，或httpd，用C写的）；
Tomcat（latest: 9.0.13, 2018-11-07）是一个Java Servlet Container（用Java写的），用于部署java servlet和jsp（打包成WAR=Web ARchive，直接丢进Tomcat的部署目录下）。
Servlet是用于响应HTTP请求的，在它之上有一些框架如struts可以将此过程更抽象，以实现web applications.（oracle定义：A servlet is a small Java program that runs within a Web server. Servlets receive and respond to requests from Web clients, usually across HTTP, the HyperText Transfer Protocol.）
Java Servlet必须放在Servlet container（web container）中运行。容器将请求分派给对应的servlet、管理servlet的声明周期。servlet就是一个真正用于处理请求、返回响应的object。它与JSP的不同之处在于，JSP是在HTML代码中可以嵌入Java代码；而Servlet是在把HTML代码嵌到Java代码中。
容器：处理网络相关的事情，如建立连接、解析请求，它是一个壳子。而真正处理请求的逻辑，是在容器中运行着的程序。

[static content vs dynamic content]
static content: 静态内容，如html, js, images, css等（is the content which fetched from disk）
dynamic content: 运行时生成的内容，每次请求可能是不同的。（is generated at request time, and may change from one request to another）
动态内容可以用CGI等方式生成。
[CGI]
Common Gateway Interface

[Servlet的生命周期]
Servlet 4.0 released on 2017.09（需要平台Java EE 8，引入了HTTP/2）
***servlet需要实现HttpServlet接口：核心的3个，init、service、destroy***
1. 初始化阶段，容器调用init来初始化一个servlet instance；
2. 初始化后，这个servlet实例就可以响应客户端的各种请求了，每个请求都在servlet实例自己的线程中处理（ Each request is serviced in its own separate thread）（容器调用service来处理每个请求，分派至不同类型如doPost, doGet, doPut, doDelete等）
3. 容器调用destroy来销毁servlet instance（生命周期中，初始化、销毁只会执行一次，当初始化后，servlet就可以一直为client服务。具体什么时候销毁，依赖于各自容器的实现）。


1. client -> HTTP Server（比如请求一个jsp）
2. HTTPServer -> JSP Engine（JSP Engine从磁盘读jsp文件，并编译成.class，此称作为Servlet）
3. Servlet Engine处理
4. Servlet Engine -> HTTP Server（输出结果）
5. HTTP Server -> client（返回Response给client）


[Apache]
MPM: multi-processing module (MPM)
MPM是Apache HTTP Server用于配合httpd，属于处理请求的核心模块，服务器开发人员可以自行决定装载哪个模块以满足各自的特性要求（甚至是在Runtime装载，当然同一时刻只能装一个）。三种主流的请求处理机制：prefork、worker、event(Unix-like)。另外还有个专为windowsNT优化的winnt。
mpm_prefork_module: 实现的是非线程web server（这意味如果有用到那些非线程安全的lib，用这个就比较合适）。httpd进程作为root启动，维持一个服务器进程池，创建一些空闲的子进程用于listening（一般是5~10个）。每个进程用于处理到来的请求。server config中配置的MaxRequestWorkers，决定了prefork方式的服务器在同一时刻能处理的请求数（默认256，多思考设定多了会怎样？答案是内存资源不足，导致频繁换页）。其中有个问题，因为是有一些空闲进程在等待请求到来，当请求到来时，这些进程从阻塞（睡眠）中唤醒进入就绪状态，但这些只能有一个进程来为这个请求服务，此时操作系统就要做决定谁来投入运行。那么其它进程又要重新回到阻塞状态。这个现象就叫做thundering herd problem。如果每次只有一个进程，那就应该会高效许多。总结：可以看到进程模型式的服务器相当耗费RAM，而且负载很高时会导致请求被拒绝的现象发生。

mpm_worker_module: 实现的是进程、线程混合型web server。仍然是httpd以root权限启动作为父进程，初始创建2个子进程，与process model用子进程来处理请求不同的是，worker model的子进程会创建1个listening thread，多个server threads，listening线程负责监听请求到来，将请求递交给server thread进行处理。一般默认16个子进程，每个子进程可以创建25个线程。所以总共能够响应的请求数=16*25=400（这也不高啊。。）。同process-based一样，同样受制于thundering herd problem。（不是很理解，看今晚的CSAPP内容就理解了，关键在于对同一port只能有一个listening fd！）


[CSAPP][network]
socket: 就是一个file descriptor，即对应一个文件（可以看作是an endpoint of a connection）。一个连接可以表示为(clientIP:port, serverIP:port)。客户端port是由内核确定的一个临时port，应该并没有什么意义。
连接的建立：
client调用socket创建一个file descriptor，而后调用connect向服务器+端口发起连接请求（connect blocks until got response from server）；
server端首先启动服务来listening：调用socket创建一个file descriptor（默认是active，即client fd），调用bind将server fd绑定到服务器IP、端口上，然后调用listen将该fd转换为listening fild descriptor，此时表明这是一个passive fd，即位于服务端的server fd，可以监听incoming requests。accept用于接受到来的请求，blocks until a request coming，请求到来后返回一个connection file descriptor(connfd)，此时连接就在client端的socket和server端的connfd之间建立好了。
原来上讲，对服务端的同一个IP+Port，同一时刻只能有一个进程在listening（即只有一个listening fd）。如果进程在调用listen时已经有进程在listening这个IP+Port，那么会报类似"Address is already in use"的错。但有意思的是，多个进程是可以同时监听同一个IP+Port的。就看你基础扎不扎实了:D（想想fork子进程后会发生什么）。原因：对于处理并发请求，在每个请求来临后(accept返回后），可以通过fork来创建子进程来处理这个连接，主进程只负责listening。关键之处就在这里了，fork后子进程共享父进程已经打开的file descriptor！（CSAPP原话！）即fork出的子进程会与父进程共享listening fd，那么此时就是2个process在同时listening on serverIP:Port。有意思~再继续思考，假设子进程处理完了请求，它和父进程都在运行中，此时又新来了一个请求，既然两个进程都在监听同一个端口，那么问题来了，到底哪个进程负责处理到来的这个请求呢？这不就是昨晚看到的那个问题：thundering herd problem。
那回到Apache prefork module，是不是可以这么理解，既然是子进程负责处理请求，那么每到来一个请求后，父进程fork一个子进程来处理，然后就又多了一个进程一起listening...
//pesudo code for perfork
int confd = accept();
//a request arrived, fork a child process to handle it
pid_t pid = fork();
if (pid == 0) {//child process
  HanldeRequest();
}
else if (pid > 0){//parent process
  //do nothing
}
else{//error
  //error
}

[My Questions]
1. 既然多个process去监听同一port会有thundering herd problem，即便是两个也有，那为什么不只用一个process去监听呢？感觉它监听到后立马分配给线程去handle，然后继续listening就好了啊，这个理论上讲，应该也够极大的并发吧？没有什么潜在的耗时操作吧。。
2. 



29.[many damn terminologies]
proxy server: A proxy server is essentially a middle computer that sits between the client and the primary server. A发请求出去，不直接连到服务端C，而是连到代理B，当B有结果返回时，C代替B返回给A，A不知道到底是谁在服务。
用途: 
1. content control：URL、DNS等控制
2. filtering of encrypted data：代理能知道客户端私钥，相当于https中的the man in the middle attack
-【网关】A proxy server that passes unmodified requests and responses is usually called a gateway or sometimes a tunneling proxy.
-【正向代理】A forward proxy is an Internet-facing proxy used to retrieve from a wide range of sources (in most cases anywhere on the Internet).
-【反向代理】A reverse proxy is usually an internal-facing proxy used as a front-end to control and protect access to a server on a private network. A reverse proxy commonly also performs tasks such as load-balancing, authentication, decryption or caching.
正向和反向的区别：
1. 正向代替客户端，反向代替服务器；
2. 正向面向internet，反向面向内网；
3. 正向代理如ISP运营商、能访问Google的代理，反向如服务器集群的前置服务器(如Nginx)用来做负载均衡、分发请求到内部的真正处理请求的服务器。


30.[html]iframe, browsing context
browsing context：一个tab、window，或者是嵌在页面中的iframe。
每个browsing context都有origin（scheme://host:port），同源（same origin）就是指origin一样。每个browsing context都有自己的session history(window.history，表示当前加载的page，可通过history接口达到浏览器的前进、后退效果)、document（DOM入口）。
在两个browsing context之间通信受严格限制。
30-1.Referrer
2014.06增加的规范，用于规定Request Header中是否携带Referer信息。Referer是一个URL，表示到达当前页面的上一个页面URL。


31.[HTML5?]Web Workers
目的：能够在后台运行另一个工作线程，来执行相对费时的操作，以不至于阻塞负责UI的主线程。
a. worker运行的脚本必须与主线程同源?
b. worker中没有window，也即无法使用window默认的方法和属性等（如document）
c. worker和主线程不在同一个context，通信必须使用postMessage来发消息、定义onmessage(message_event)事件来接收消息(消息内容为message_event.data)
d. 

---Redis（REmote Dictionary Server）--------------------------------------------------------------------------------------------------------------
2018.10.24当前稳定版本：5.0.0 /redis/
历史：2010年左右，意大利人（应该是）采用传统DB在分析日志时遇到性能瓶颈，自己开发了一种带数据格式的数据库，读/写数据都只在内存中完成，在disk上存储数据，disk上的数据主要用来在系统启动时，由Redis方便在内存中重建数据结构。Redis没有传统RDBM的那种查询、聚合等特性，数据按结构存储，操作也是针对ADT（Abstract Data Type）进行。Redis大量使用fork（系统调用），parent fork为后续client服务，子fork将数据的copy写到磁盘。
The Redis implementation makes heavy use of the Fork (system_call), in order to duplicate the process holding the data, so that the parent process continues to serve clients, while the child process creates a copy of the data on disk.
Redis特点
1.相比传统关系型数据库用tabular来存储，Redis用key-value存储，同时还支持list、set、sorted set、hash table、hyperloglogs等数据结构。
2.数据读写都在内存完成，保存在磁盘，每次系统启动时从disk重构数据放到内存（Durability持久化，就是说写了之后丢不了）；
3.支持备份replica，master-slave模式
通常Redis至少每2秒会写一次磁盘。
经典用例：session caching, full page cache, message queue applications, leaderboards, counting among others.

32. 依赖注入 Dependency Inversion
p.s. 其实感觉就是设计模式中的“策略模式”，A类引用B具体类的公共接口，B具体类负责实现。

33. Gateway
网关用于连接两个不同通信协议的网络（即做协议转换用）。与路由（routers）或交换机（switches: network switch, also called switching hub）不同点在于，网关连接的网络可以是不同的协议，而且网关可以在OSI的任意一层来实现。
网关也可以泛指（loosely refer to）实现网关任务的计算机程序，如默认网关（default gateway）或路由（router）。
在公司网络中，网关也可以扮演代理服务器、防火墙的角色。

34. Math.round, Math.floor, Math.ceil, parseFloat, parseInt
Math.round: 返回整型，<0.5则取绝对值小的方向，>0.5取大的，==0.5则向正无穷方向round。-20.5=>20
Math.floor: 向下取整，5.05=>5, -5.05=>-6
Math.ceil: 向上取整

35. HTTP状态码
2** - 成功
3** - 重定向
4** - 客户端错误，请求包含语法错误或无法完成请求
5** - 服务器错误，服务器在处理请求过程中发生了错误

200-请求成功
301-资源被永久转移到其他URL
302-临时移动，与301类似
304-Not Modified，通常是访问的资源未修改过，服务端返回304时通常不会返回任何资源，因客户端已缓存
305-Use Proxy，所请求的资源应该使用代理访问
307-Temporary Redirect，临时重定向，与302类似
400-Bad Request
401-Unauthorized，请求要求用户身份认证
403-Forbidden，服务器理解客户端请求，但拒绝执行
500-Internal Server Error，服务器内部错误，无法完成请求
502-Bad Gateway，作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
503-Service Unavailable，由于超载或系统维护，服务器暂时无法处理请求

36. HTTP/1.1 keep-alive
[HTTP/1.0 vs HTTP/1.1]
HTTP 1.0 (1994)
(1). 不支持长连接(keep-alive)，即当一个请求结束后，这个连接就关掉了，必须再另建立一个连接发起请求。也即不能在一个TCP连接上完成多个请求；
正因为此，HTTP 1.0存在严重效率问题，这都是源于TCP的慢启动（瞧瞧多么专业的术语，好好复习下吧！）。以及当服务端主动关闭TCP后会处于TIME_WAIT状态，还需要经过2MSL才能真正地关闭socket（因为TCP是可靠的传输协议，一个TCP包在网络中的最大生存时间就是MSL即从源到目的地。如果这个包没有到达，则会触发重传。如果没有等2MSL的时间而是直接关闭，此时若又新开一个相同的socket，很可能在网络中游离的“上一个socket报文包”正好被新的连接收到，TCP不允许这样的紊乱情况出现。）。
可以看到，HTTP 1.0时代，一次HTTP请求所占用的时间=TCP三次握手+请求/响应+TCP四次挥手+2MSL。

HTTP 1.1 (1996-2015)
(1). 支持长连接（客户端在请求时设置Request Header：Connection: Keep-Alive）；
(2). 要求在Request Header中加入Host Header（当不同host指向同一IP时，服务器可以根据host来分辨客户端的意图，即想访问哪个host的资源，同一台机器上充当多域名）；
(3). 缓存方面，增加了'entity tag'(E-Tag)，标记资源相当于hash；（扩展下：Caching知识点）
(4). 100 Continue status状态码，当客户端不清楚服务器能否响应请求时、或者客户端是否有权限发起某个请求时，与其发送大量的数据不如仅发送一个Request Header，来试探下。如果服务器返回HTTP/1.1 100，则意味着一切OK，可以正式地发送请求。
(5). much much more...
[ref]https://stackoverflow.com/questions/246859/http-1-0-vs-1-1
[ref]https://www.cnblogs.com/freefish12/p/5394876.html

[HTTP/1.0 keep-alive]
其实keep-alive分为两种：HTTP keep-alive和TCP keep-alive。
HTTP keep-alive: 服务器在HTTP Header中设置Connection: Keep-Alive来表示此TCP连接将可能将为HTTP请求复用多次。
keepalive_timeout：意为在最近的一次HTTP请求响应发送后，此TCP连接保持多久。如设置keepalive_timeout=60s，则在最近的一个HTTP响应发出后的1min内，还可以复用这个socket来进行HTTP请求。如果1min过去了都没有请求到来，则服务端就发起主动关闭TCP连接。

TCP keep-alive: 假设HTTP keep-alive设置的3600s即1个小时，如果客户端已经宕机了呢？或者因网络故障已经不可达，那服务端完全没必要再keep-alive了，而是应该关闭连接，释放socket资源。因此，TCP keep-alive应运而生。

它定义了三个参数：
tcp_keepalive_time: TCP连接"保活"时间，超过则开始发送"探针"即心跳包
tcp_keepalive_intvl: 心跳包的发送间隔时间
tcp_keepalive_probes: 总共发送多少次心跳包，如果连续这么多次都未响应，则认为对方已经挂了

在TCP连接闲置了[tcp_keepalive_time]时间后（当然了，这个值应该要小于HTTP keep-alive定义的值才有意义），服务端开始每隔[tcp_keepalive_intvl]时间向客户端发送"探针"即心跳包，以测试目标主机的连接状态。如果尝试了[tcp_keepalive_probes]次都认为是失效的状态，则服务端就决定关闭此连接。

[TCP四次挥手]
TCP连接的客户端或服务端均可以发起终止连接的请求。主动发起FIN的一方最后将进入TIME_WAIT状态。以client发起FIN为例。
1. client发送FIN，以表明关闭client到server的单向连接，随后client进入FIN_WAIT1状态；server收到FIN后返回对FIN的ACK，并随后进入CLOSE_WAIT状态（这个状态是否意味着，服务端知道客户端要关了，服务端也准备关闭，但需要一定时间来把最后的数据发送完，所以这个时间段就称之为CLOSE_WAIT？）；
2. client收到server的ACK，进入FIN_WAIT2状态，等待server关闭FIN的到来（因为server端要在CLOSE_WAIT状态把剩余的数据发送完）；
3. server传送完最后的数据后，发送FIN给client，为了等待client对server这个FIN的确认，server进入LAST_ACK状态；
4. client收到server的FIN后，表明服务器也打算关闭了，发送ACK给server，此时server收到ACK后就真正进入CLOSED状态，即TCP连接关闭。***但client发送ACK后不是立即关闭，而是等待2MSL的时间，如果没有收到server对FIN的重传，才进入CLOSED状态。***
[为什么要等2MSL]
MSL是在网络中一个报文到达另一端的最大生存时间，一个往返时间就是2MSL。（即如果server的FIN有重传的话（即服务端没收到来自client对FIN的确认，服务端认为是丢了，会重发FIN）client一定发送ACK后的<2MSL的时间内就收到，这样client就可以重新对FIN进行ACK，再次进入TIME_WAIT状态）
如果client发送ACK后径直关闭，又起了一个新的socket连接（1个socket连接由唯一的一对socket pair指明，clientIP:port <=> serverIP:port）到server，server端socket肯定是一样的，client端如果clientport不同还好，但万一port和刚才关闭的socket port相同，在网络中游荡的还尚未到达server端的报文，就可能恰好被新的socket连接收到，服务端还以为是这些报文是新socket连接客户端发来的，从而可能造成紊乱。TCP是可靠的传输协议！
[查看本机网络连接状态]
netstat -ano|findstr 1991
server PID对应一个进程，每个连接应该是使用一个线程新建connect_fd来和client socket进行连接。
e.g. unoserver进程4356，127.0.0.1:1991处于LISTENING，而已连接的其他2个socket连接同属于4356PID，对应的client socket为：
127.0.0.1:60186
127.0.0.1:60861
这两个连接的状态为ESTABLISHED。
相应地可以看到本机chrome浏览器对这两个连接放在了一个进程里PID15268：
127.0.0.1:60186 127.0.0.1:1991 ESTABLISHED 15268
127.0.0.1:60861 127.0.0.1:1991 ESTABLISHED 15268

[为什么是三次握手，而不是两次、四次？]
如果是两次：1. 首先A给B发信息 2. B返回对A的应答。 这样只有A能确认给B发信息是能收到的，但是B在发送了ACK后，无法确定A是否收到。

三次：在两次基础上，在A收到B的ACK后，A再发送对这个ACK的ACK，让B知道A收到了他的消息。如此一来，B就知道第二步发送的消息A可以收到，B->A的单向连接就建立成功。

37. HTTP/2

38. websocket vs socket
不是一回事儿，websocket是服务器主动向客户端发送消息，html标准
socket unix网络接口通信的概念。

39. 排序算法
shell sort：

40.[terminology]微服务
服务能被独立更新。通过HTTP、RESTful API。
单体应用只能水平扩展，当体量增大时变得复杂。[ref:http://www.sohu.com/a/227348782_355137]
Monolithic(单体应用)，API Gateway。

41.[terminology]SOAP（Simple Object Access Protocol，简单对象访问协议）
一种使用XML作为消息格式，应用层采用HTTP或SMTP（Simple Mail Transfer Protocol）的specification。
42.[terminology]RESTful

43. web worker

44. [HTML5]WebGL
Web Graphics Library，是可以在浏览器中进行2D、3D图形绘制的javascript API。只要浏览器支持，就不用再像以前一样依赖于图形插件了。
-----------一些小东西-------
1. <!DOCTYPE html>
必须出现在所有document的顶部，告知浏览器尽可能按照w3c标准渲染文档。如果没有，则可能切换至怪异模式（quirks mode），即按照各自浏览器自身的标准解析。
2. 各浏览器内核
IE: Trident
Chrome: Blink（Webkit核心的一个fork版，2013.04由Google宣布）
Safari: Webkit（注意，是Apple的！与Blink一样，都是来自于KDE（back then called the K(ool) Desktop Environment）中的KHTML和KJS）
FireFox: Gecko

45. new
代码'new Foo()'执行时，将会做以下几件事：
a. 创建一个从Foo.prototype继承的对象
b. 调用function Foo，并将this绑定为a中创建的对象
c. function Foo所return的值便是整个new表达式的值，如果没有显式return，则默认return this。

46. with(deprecated)
语法：with(expression) { statements }
修改作用域，将给定的expression添加到head of scope chain，{ }中的代码执行时，所有变量都会首先从expression指定的作用域中查找，如果没有则继续在scope chain中查找。如
var obj = {a : 1, b: 2};
with(obj) { alert(a); alert(b); alert(c); }
在{ }中的作用域就是obj，所以不用写alert(obj.a)，直接alert(a)。但注意alert(c)执行时，先会在with限定的作用域obj中找看是否有c属性，对于with { }内的所有变量，都会先在obj中找。这样如果不属于obj的，就继续在scope chain中查找，有了这个with就浪费一次lookup。（因为不管啥变量，都要先在obj中找）
Pros优点:
修改obj属性方便，不用每次显式引用obj：obj.a = 3; obj.b = 4;
而是可以：with(obj) { a = 3; b = 4}
Cons缺点：。

47. [ES2015]Computed property names
可以在[]中书写表达式，表达式的值将作为object的property name。
如ES2015之前，
var prop = 'name';
var tempObj = {};
tempObj[prop] = 'xiyu';
alert(tempObj); //{name:xiyu}
/* -----Starting with ES2015----- */
var tempObj = {[prop]: 'xiyu'};

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Method_definitions

## 48.[ES6]Destructuring assignment解构
> The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from `arrays`, or properties from `objects`, into distinct variables。

数组解构: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

### 48.1 数组解构
1. 声明的时候解构赋值
    ```js
    var foo = ['one', 'two', 'three'];

    var [one, two, three] = foo;
    console.log(one); // "one"
    console.log(two); // "two"
    console.log(three); // "three"
    ```

2. 先声明变量，随后再使用此语法
    ```js
    var a, b;

    [a, b] = [1, 2];
    console.log(a); // 1
    console.log(b); // 2
    ```

3. 忽略某些值
    ```js
    var [a, , b] = [1, 2, 3];
    console.log(a); // 1
    console.log(b); // 3
    ```

4. 结合`...rest`语法，将剩余的值赋值给`rest`
    ```js
    var [a, ...b] = [1, 2, 3];
    console.log(a); // 1
    console.log(b); // [2, 3]
    ```

5. 交换两个变量
    ```js
    var a = 1, b = 2;
    [a, b] = [b, a];
    ```

### 48.2 对象解构
1. 基本用法
    ```js
    var o = { p: 42, q: true };
    var { p, q } = o;

    console.log(p); // 42
    console.log(q); // true
    ```

2. 声明后再使用，**注意需要为整个表达式加()**
    ```js
    var a, b;

    ({a, b} = {a: 1, b: 2}); // valid
    {a, b} = {a: 1, b: 2}; // syntax error
    ```

3. 赋值给新的变量名
    ```js
    var o = { p: 42, q: true };
    var { p: foo, q: bar } = o; // 给p重新命名为foo，给q重新命名为bar
    
    console.log(foo); // 42 
    console.log(bar); // true
    ```

4. 默认值，以防从object解构时，变量为undefined
    ```js
    var { a = 10, b = 5 } = { a: 3 };

    console.log(a); // 3
    console.log(b); // 5
    ```

5. *可以为function的参数设置默认值，注意ES2015的形参写法（也可以不写右侧的"={}"，这样就无法处理不传实参的情况）
    ```js
    //ES5 version
    function drawES5Chart(options){
      options = options === undefined ? {} : options;
      var size = options.size === undefined ? 'big' : options.size;
      var coords = options.coords === undefined ? {x: 0, y: 0} : options.coords;
      var radius = options.radius === undefined ? 25 : options.radius;
      // do sth...
    }

    //ES2015 version
    function drawES2015Chart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
      // do sth...
    }
    ```

6. `for...of`形式的解构
    ```js
    var people = [
      {
        name: 'Mike Smith',
        family: {
          mother: 'Jane Smith',
          father: 'Harry Smith',
          sister: 'Samantha Smith'
        },
        age: 35
      },
      {
        name: 'Tom Jones',
        family: {
          mother: 'Norah Jones',
          father: 'Richard Jones',
          brother: 'Howard Jones'
        },
        age: 25
      }
    ];
    for (var { name: n, family: { father: f } } of people}){
      console.log('Name: ' + n + ', Father: ' + f);
    }

    // react经常见到这种写法：
    // 假设obj定义为：
    const obj = { a: 1, b:2 };
    const { a, b } = obj; // 这条解构语句的含义是：将"与=左侧变量相同的属性名的值"赋值给对应名称的变量

    console.log(a); // 1
    console.log(b); // 2
    ```

49. [设计模式]前端中的设计模式
单例、观察者、工厂、命令、代理（比如每张图片加载完成之前设置个loading）、职责链（比如根据薪资计算税率、订单购买）
职责链模式定义：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。（大函数分割成一个个小函数，清晰，各司其职）
[ref]https://www.cnblogs.com/smlp/p/9776789.html

50*. 【Demo】实现一个使用了Nodejs、React、Express、数据库存储等知识所构建的小应用：TodoList。

50.5 promise原理

51. [ES8, ECMA2017]async...await
用来将一连串Promise异步的写法，改为同步的编码风格，让可读性更好的一种语法。
a. async用来声明一个function是async function，只有在async function内才能写'await expression'语法；
b. await语句将会阻塞async function的执行，即此函数是在event loop的不断循环周期内异步执行的；
c. await后面跟的expression要求是一个Promise，若非则隐式转为a resolved promise；
d. 'await expression'的返回值：当promise resolved，则返回resolved值；当promise rejected或抛出异常(对于promise异常，内部其实是等同于rejected），则这条语句将“以异常的形式，把rejected值抛出”（需要用try-catch来捕获这个rejected"值"，此时catch(e)中的e，是"值"，而不是异常）。
function resolveAfter2Seconds(){
  return new Promise(resolve=>{setTimeout(()=>{resolve('resolved')}, 2000)});
}
e. async function的返回值是一个Promise：如果函数有return值，则作为resolved promise值；如果函数内部抛出异常，则是一个rejected promise。
async function asyncCall(){
  //start
  var res = await resolveAfter2Seconds();//block here until the Promise done
  console.log('只有在上面异步任务执行完后，才会继续执行这条语句')
  console.log(res);//'resolved'
}

52. [+3][ES6, ECMA2015]generator yield
定义：
     Generator，是用function*声明的一个Generator function，这个函数返回一个Generator对象。
     yield expression，在每次调用Generator.prototype.next()时，返回值是一个形如{value: xxx, done: xxx}的对象。'value'是yield后面expression经过计算后的值，'done'表示迭代是否结束(值为true或false)。

语法：
function* generatorName(i){
  yield i
  yield i+1
}
var gen = generatorName(0)
gen.next()  //{value: 0, done: false}
gen.next()  //{value: 1, done: false}
gen.next()  //{value: undefined, done: true}

tips：
a. function*函数被调用时，函数体并不立即执行，而是返回一个遵循(conforms to)iterable protocol和iterator protocol的一个Generator对象;
b. 当调用next()时，函数体开始执行到下一个yield语句，而后停在这里，直到下一次调用next()时才会继续向下执行；
c. 如果在function*函数中有return，则在next()执行时遇到return后，Generator函数就此结束，返回对象的value值是return语句的值，done就设定为true；
d. 如果在function*函数执行过程中发生异常，则Generator函数终止，CPU回到caller继续执行，caller调用的next()抛出异常。此后再调用next，由于Generator已经结束，因此返回值都是{value:undefined, done:true}
e*[后面的Q就都可以解释了:D]. 如果在调用next时有传参数next(param)，则function*的执行过程为：首先将用传入的参数param替换"当前暂停的yield表达式"，然后再继续向下执行。注意：首次调用next(param)当然不会替换了，因为还没有上次暂停的yield，相当于next()。

Q:疑惑，到底这几句什么意思？
 When the iterator's next() method is called, the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator
    'until the first yield expression'，这个怎么定义，包括yield表达式？【包括】那如果表达式嵌套呢？如console.log(1, yield i++)【思考下编译器的处理，编译器处理时先计算log的第一个参数，而后第二个...，最后执行console.log输出。那么这条语句可以相当于是：
  evaluate 1
  evaluate yield i++  //paused immediately after evaluation of this line
  evaluate console.log()
即，碰到yield i++执行后就暂停了，console.log()还没等到执行。当下次next调用时，console.log方才输出。
】

Calling the next() method with an argument will resume the generator function execution, replacing the yield expression where execution was paused with the argument from next(). 
    yield expression，是指整句还是只是"yield expression"？【用参数替换这个形式：yield expression】还是仅仅"expression"？【否】比如console.log(yield i++); 或 var j = yield i*2;
  'replacing the yield expression'，next传入的参数替换'yield expression'？【是的，替换当前yield暂停的地方】

If an optional value is passed to the generator's next() method, that value becomes the value returned by the generator's current yield operation.【current yield expression是指当前暂停的yield，也就是上次next执行后暂停的地方】
function* logGenerator(){
    var i = 1;
    console.log(i)
    yield i++;//#1
    console.log(yield i++)//当第二次next调用时，为什么不输出'replacing the yield expression'?【第二次调用时，传入参数替换的是***当前yield expression***，即当前暂停处，因此替换的是#1】
    return 'end of function body'
}

var gen = logGenerator()
gen.next()
gen.next('replacing the yield expression')

53. try-catch中的throw new Exception vs throw new Error
都是Throwable从派生而来。

54. IaaS/PaaS/SaaS
IaaS: 基础设施即服务。所有的东西自己准备。没地方、有设备、有软件，比如想要一台可以用的电脑，自己装。
PaaS: 平台即服务。有人给你准备了基础平台。没地方、没设备、有软件，买回品牌机到家，开机就可以用。
SaaS: 软件即服务。有人给你准备了全套，直接用就可以。没地方、没设备、没软件，使用云主机。

55. TLS/

## 56. js类中定义静态变量/方法：`static`
### 1. 如何定义？
用`static`来修饰变量名或方法即可：
```js
class Fruit {
  static staticProperty = 0;
  static staticMethod() {
    console.log('This is fruit');
  }
}
```

### 2. 如何在类外引用？
在类外引用，当然是用类名：
```js
Fruit.staticProperty; // 0
Fruit.staticMethod(); // This is fruit
```

### 3. 如何在类内的**静态函数**中引用？
在类内的静态函数中引用，可以用`this`：
```js
class Fruit {
  static staticProperty = 0;
  defaultAsPublicProperty = 1;
  static staticMethod() {
    console.log('This is fruit');
  }

  static anotherStaticMethod() {
    console.log(this.staticProperty); // 0
    this.staticMethod(); // This is fruit
  }
}
```
### 4. 如何在类内的**非静态函数**中引用？
在类内的非静态函数中引用，仍然可以通过**类名**引用，或者作为构造函数`constructor`的属性来引用。

不能用`this`，因为`this`被初始化为对象实例的引用，而静态方法并不定义在实例上。

```js
class Fruit {
  static staticProperty = 0;
  static staticMethod() {
    console.log('This is fruit');
  }

  constructor() {
    console.log(Fruit.staticProperty); // 0
    console.log(this.constructor.staticProperty); // 0

    Fruit.staticMethod(); // This is fruit
    this.constructor.staticMethod(); // This is fruit
  }

  anotherMethod() {
    console.log(Fruit.staticProperty); // 0
    console.log(this.constructor.staticProperty); // 0

    Fruit.staticMethod(); // This is fruit
    this.constructor.staticMethod(); // This is fruit
  }
}
```

## 57. 关于`constructor`所应该知道的
- `constructor`在`class`中只能定义一个，否则会抛出`SyntaxError`
- 派生类的`.ctor`(构造函数的简写，看过`C++ primer`自然懂)中，需要先调用`super();`以初始化基类
- 派生类中若不定义构造函数，则默认的构造函数会将派生类构造函数所传入的参数带给基类：
  ```js
  constructor(...args) {
    super(...args);
  }
  ```

## 58. 如何在js的类中定义私有变量/方法？
:warning: 似乎是实验性的提案。[Private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

定义：想要定义一个私有变量/方法，则在其前方直接加`#`。  
引用：当然只能在类方法中引用，注意引用时`#`也是变量名/方法名的一部分哦。

```js
class ClassWithPrivateField {
  #privateField = 5;
  publicField = 6;

  log() {
    console.log(this.#privateField); // 5
  }

  log2() {
    console.log(this.publicField); // 6
  }

  #privateMethod() {
    console.log('hello world');
  }

  publicMethod() {
    this.#privateMethod();
  }
}

const a = new ClassWithPrivateField();
a.log(); // 5
a.log2(); // 6
a.publicField; // 6
a.#privateField; // Uncaught SyntaxError: Private field '#privateField' must be declared in an enclosing class
a.someFieldNotDeclared; // undefined
a.publicMethod(); // hello world
a.#privateMethod(); // Uncaught SyntaxError: Private field '#privateMethod' must be declared in an enclosing class
a.someMethodNotDeclared(); // a.someMethodNotDeclared is not a function
```

## 59.在js中如何定义**私有构造函数**（类似于C++那样）？
2020年11月5日13:52:56 还没找到方法。。

## 60.领域对象、领域类（于《重构》-P189发现）

## 61. JS的一些小技巧

1. 字符串转成数字

    一般我们会用`parseInt()`来做，但更简单地可以直接在字符串前面加个`+`来实现：

    ```js
    // longhand
    let total = parseInt('100', 10);
    let sum = parseFloat('11.30');

    // shorthand
    let total = +'100';
    let sum = +'11.30';
    ```

2. 重复一个字符串多次

    不用循环了，用[repeat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)：
    ```js
    // longhand
    let str = '';
    for (let i = 0; i < 10; i++) {
      str += 'hello';
    }

    // shorthand
    let str = 'hello'.repeat(10);

    // cases
    'abc'.repeat(-1); // RangeError
    'abc'.repeat(0); // ''
    'abc'.repeat(2.5); // 'abcabc', 2.5 will be converted to integer
    ```

3. 指数幂

    用`**`代替`Math.pow(a, n)`
    ```js
    // longhand
    Math.pow(2, 10); // 2^10 = 1024

    // shorthand
    2**10; // 2^10 = 2014
    ```

4. 提取唯一值

    剔除数组中重复值，返回一个去重后的数组。
    ```js
    const arrHasRepeat = [1, 2, 2, 3, 3, 3, 4];
    const arrWithoutRepeat = [...new Set(arrHasRepeat)];
    // [1, 2, 3, 4]
    ```

    知识点：
    1. `Set`
    2. `...`(spread syntax，ES6中的展开语法)，见[spread syntax](#17.2-spread-syntax)

5. 动态属性(ES6)

    对象的属性名称可以指定为某个变量。
    ```js
    // before ES6
    const key = 'name';
    const person = {
      age: 26,
    };
    person[key] = 'yuhui';
    // { age: 26, name: 'yuhui' }

    // with ES6
    const prop = 'weather';
    const obj = {
      date: '2020/12/14',
      [prop]: 'cold',
    };
    // { date: '2020/12/14', weather: 'cold' }
    ```

6. 

## 62.`require`的原理是什么？
require并不是javascript中的概念，而是Nodejs的。

Nodejs中有模块的概念，require用于加载模块。

语法：
require(id)，id是string，表示module name或路径。

导入module、JSON或本地文件。
若要从node_modules导入，可直接写module的名称，如require('crypto')
若要导入本地模块，需指定文件的相对路径，如require('./path/to/my-module.js')。相对路径会结合环境变量'__dirname'拼接成最终绝对路径。

比如，假设当前是在/user/work下的test.js中编写如下语句：

const myLocalModule = require('./foo.js'); // module: /user/work/foo.js
const myLocalModule2 = require('../work2/bar.js'); // module: /user/work2/bar.js

__dirname: 等价于`path.dirname(path)`，表示**directory name** of a path。

      path.dirname('/foo/bar/baz/asdf/quux');
      // Returns: '/foo/bar/baz/asdf'

即表示当前所在目录路径。

require解析步骤：
1. Resolving: to find out the absolute path of the file
2. Loading: the determine the type of the file content
3. Wrapping: to give the file its private scope. This is what makes both the require and module objects local to every file we require.
4. Evaluating: This is what the VM eventually does with the loaded code.
5. Caching: So that when we require this file again, we don’t go over all the steps another time.

详细步骤：
1. 解析文件的绝对路径，如果给定的是文件夹名称，则默认取文件夹下的`index.js`（这个行为也可以在`package.json`中配置默认入口）
2. 加载文件，如果给定的不是路径，则默认先从working文件夹下的`node_modules`文件夹中查找，而后继续向外侧`node_modules`查找（都是找的`node_modules`文件夹），没找到则报错
3. 在一个独立的scope中执行这个module，将`module.exports`的内容作为本module对外的输出结果，并缓存起来。当第二次`require`时，直接返回对应的`module.exports`

如果出现循环引用(Circular dependency)，`Nodejs`允许这样做，且`require`的是**partial exports object with whatever was defined so far**。（即导出的是目前为止已经export的那些）

> In order to prevent an infinite loop, an unfinished copy of the a.js exports object is returned to the b.js module

This is an important feature. With it, "**partially done**" objects can be returned, thus allowing transitive dependencies to be loaded even when they would cause cycles.

ref: 
[modules_cycles](https://nodejs.org/api/modules.html#modules_cycles)
[an article of require keyword](https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/)

## 63. reduce

    arr.reduce(callback( accumulator, currentValue, [, index[, array]] )[, initialValue])

> 对数组中的每个元素执行`reducer`函数，`reduce`最终返回一个值，这个值就是最后一次`reducer`返回的结果。
> `initialValue`如果不提供时，初始`accumulator`就是`arr[0]`。

```js
var a = [0,1,2,3];
var res = a.reduce((acc, v, i, arr) => {
    console.log(`\n
        acc: ${acc}
        val: ${v}
        idx: ${i}
        arr: ${JSON.stringify(arr)}
    `);

    return (acc + v) << 1; // 每次累加后*2，而后继续累加
}, 5);

// (5 + 0) * 2 = 10
// (10 + 1) * 2 = 22
// (22 + 2) * 2 = 48
// (48 + 3) * 2 = 102
console.log(res);

// 不提供initial value
res = a.reduce((acc, v, i, arr) => {
    console.log(`\n
        acc: ${acc}
        val: ${v}
        idx: ${i}
        arr: ${JSON.stringify(arr)}
    `);

    return (acc + v) << 1; // 每次累加后，*2，而后继续累加
});

// (0 + 0) * 2 = 0
// (0 + 1) * 2 = 2
// (2 + 2) * 2 = 8
// (8 + 3) * 2 = 22
console.log(res);
```

---CSS---[ref=https://developer.mozilla.org/en-US/docs/Web/CSS/Reference]---
1. CSS选择器
A + B //选择B，当B是A的兄弟节点、且必须跟在A后面
A ~ B //选择B，当B是A的兄弟节点、且跟在A后面就行，但不一定是第一个
A > B //选择B，当B是A的直接孩子节点时
A   B //选择B，当B是A的孩子节点，不管有多深的层级

//pseudo-classes伪类
:link //应用于一个没有被访问过元素：<a>, <area>, <link href=xxx>
:visited //应用于访问过的链接
:hover //在鼠标移动到元素之上时应用此样式。CSS4允许此样式应用于伪元素上。
:active //正在处于激活状态，如鼠标左键在元素上（如<button>或<a>）按下时
//以上这四个定义的顺序遵从LVHA原则(爱恨原则，LoVe and HAte)

:checked //当radio/checkbox/option元素为checked，或转变为'on'状态时应用此样式

//pseudo-elements伪元素
::after(:after) 
::after是CSS3的语法，引入两个冒号来区分伪元素和伪类。，:after是CSS2的。
为所选择的元素创建一个伪元素，作为这个元素的最后一个孩子。创建的伪元素默认为inline。通过content来描述内容。经典案例可以结合content:attr(data-descr);来创建tooltip！注意，可以将css函数'attr()'应用于css中。也可以用于伪元素上，则attr()将取伪元素所在的元素的attribute。
The attr() CSS function is used to retrieve the value of an attribute of the selected element and use it in the stylesheet.
语法：attr(<attr-name> <type-or-unit>? [,<attr-fallback>])

::before(:before)
::cue (:cue) //WebVTT(Web Video Text Tracks Format)，貌似是用来修饰视频的字幕轨道的。。
::first-letter (:first-letter) //应用于块级元素内第一行的第一个字符，但第一个字符的界定也比较特殊。
::first-line (:first-line) //应用于块级元素内的第一行。注意：仅有一小部分的css可以写在此伪元素中。
::selection //CC3草稿，CSS4正式。用于选择文档中被用户选中的文本

2. CSS优先级（css specificity）
!important-10000
style-1000
ID-100
class/attribute/psuedo class-10
type/pseudo element-1

3. CSS样式的各类值概念
specified value: 是指在考虑到书写的CSS规则、继承、以及可能的默认值后得到的值；
computed value: 将CSS指定的规则值转换为最终绝对值，或受其他CSS属性影响后得到的值。如position:absolute会将元素的display属性计算为block；如果font-size当前为16px，那么padding-top:2em将会得到computed value为padding-top:32px。
used value/actual value: 最终使用的值，如有的浏览器只能渲染整数像素的border，那么就可能将很细（如0.6px）的border进行round，或0或1吧。

---Layout---
1. 块格式上下文：Block formatting context
它是块级元素和float元素呆的地方。(It is the region in which the layout of block boxes occurs and in which floats interact with other elements.)
A block formatting context is created by at least one of the following:
<html>
floats(元素的float属性不为none)
绝对定位元素(position为absolute或fixed)
inline-blocks(元素display:inline-block)
block elements(overflow属性不为visible)
display:flow-root(CSS2, but NOT supported by Safari)
flex items（即带有display:flex或display:inline-flex元素的直接孩子节点元素）

非常重要：A block formatting context contains everything inside of the element creating it.
即BFC将所有定义在它内部的元素包裹起来。

确定float和clear float，都是针对BFC的，不会影响在其他BFC内的内容。（所以当float元素超出了一个普通的div时，为了不让float“溢出”，可让div创建一个BFC来阻止float元素“溢出”。旧的办法是设置overflow:auto，但这种比较tricky，而且当内容较多时容易产生scroll bar。）
margin合并也是针对的是在相同BFC内的块级元素之间进行。

2. 盒模型：Box model
box-sizing: content-box(default), border-box
line-height：指定元素中line-box的最小高度。
  normal默认值一般是1.2；
  不带单位的数字(1.2)则需乘以元素font-size（建议此种方式）；
  带长度单位的数字(20px, 1.2em)直接应用（em不建议用，因为has poor inheritance behavior）；
  百分比(120%)也是相当于font-size的（不建议用，因为has poor inheritance behavior)；

3. Containing block


4. flex布局
flex: flex-grow(<number>) | flex-shrink(<number>) | flex-basis(<width>)
flex: 2 2 10%;
flex: 1 2 30px;

flex-grow: 指明item是否伸展，以占据flex容器空闲的空间（如当容器扩大时），默认0；
flex-shrink：指明item是否收缩，以容纳在flex容器中（如当容器缩小时），默认1；
flex-basis：指明item初始的size，即content-box的宽度（当flex-direction:column时，就是高度），默认auto。

5. css函数：linear-gradient() //gradient:坡度，斜率，倾斜度，梯度变化曲线
它创建一个image，由2个或以上的颜色约束，并沿着一条梯度线渐变色的图片。它是一个特殊的<image>，因此可以用在任何<image>的地方。
linear-gradient([ to <side-or-corner> | <angle> ]? <color-stop-list>)
                \Definition of the gradient line/  \List of color stops/
<side-or-corner>如：to bottom, to top, to left, to right。分别等价于指定<angle>：180deg，0deg, 270deg, 90deg。
<angle>：0deg相当于to top。
//to xxx，应该是starting point的指向，如to bottom就是starting point在正上方，linear-gradient垂直向下指。
//角度按顺时针旋转，即垂直向上为0deg，向右旋转90deg就是to right。

background: linear-gradient(#e66465, #9198e5); //正确
background-color: linear-gradient(#e66465, #9198e5); //错误，因为它是一个image，而不是一个color

gradient line由包含此背景图片的box的中心点，以及角度来确定。
color stops，即在这条线上有多个颜色的stop point。starting point是box corner到gradient line的垂线的交点；ending point正好和starting point对称。

perpendicular line垂直线，正交线
intersection 十字路口，交叉路口，交点
quadrant 四分之一圆，象限
gradient line 梯度线

6.





---Node.js--------------------------------------------------------------------------------------------------------------
2018.10.26当前稳定版本：8.12.0
2019.01.31LTS10.15.1
简要介绍：Node.js是运行时异步事件驱动（event loop，和js一样）的javascript，用于构建可扩展的network applications。它不像其他经典的系统使用线程来做并发，认为并发在网络中并不高效，而且不方便使用。（os：目前我也不知道它是咋做的）Node.js几乎没有直接和IO打交道的函数，不存在lock。所有的异步操作底层都调用的libuv（focus on asynchronous I/O）。
Nodejs作为web server，只有当发生事件时才执行一些操作，否则就只是空闲，静等事件发生。that’s what event-driven means: the server only reacts when an event occurs. That could be a request, a file being loaded, or a query being executed — it really doesn’t matter.
1.V8
一个用C++写的效率高得疯狂的js引擎，用在Chrome浏览器、Nodejs等之中。它可以单独运行，或者嵌入到C++应用程序之中。
V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Google Chrome, the open source browser from Google, and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. V8 can run standalone, or can be embedded into any C++ application.
2.Docker
Docker Container用在应用部署方面，Nodejs Application及其依赖被部署在Docker容器中，不同的Applications可以共享底层的bin、libs等，容器之间是相互独立的。
3.REPL
the 'repl' module provides Read-Eval-Print-Loop, 交互式解释器，类似cmd/shell，可即时运行代码。
4.express
一个framework，封装对请求的处理，不用自己手工写很多判断GET、POST、路径等等，可能写法更优雅
5.router
同上，一个意思
6.nodejs+express+ejs
ejs: Embedded JavaScript templating，一种js语法，用于生成HTML
<%flow-control；<%=输出HTML转义后的值；<%-输出未HTML转义的值；<%#注释；%>endtag

7.中间件middleware

关键知识点
1. Understanding HTTP Transaction in Nodejs
2. EventEmitter
All objects that emit events are instances of the EventEmitter class.
当object触发事件时，所有绑定的event handler会同步执行。

---Nginx--------------------------------------------------------------------------------------------------------------
历史：2002年俄罗斯的一个家伙为解决C10k问题而开发，2011年11月获得$3million成立Nginx公司提供商用。2018年6月C轮融资$43million。
[engine x], 可以用做反向代理、负载均衡的web server。据调查前100k个网站中有一半都用的Nginx。
核心：采用异步事件驱动的方式来响应请求（而不是用threads）。
特性：
1.在一个HTTP连接上可以同时处理10k个请求，并消耗很低的内存资源（2.5MB/10k）
2.处理静态文件、index文件
3.反向代理、负载均衡等


--2018.11.13周二，刘龙电信高交会在coco park附近布展几天，巴蜀风吃饭聊天--
0.名词儿：spring cloud，jetty，Nginx，docker，angular，vue，k8s, Tengine(2017.08淘宝基于Nginx的开源web服务器)，NWSs(Next Generation Webserver，主要用于腾讯自建的CDN，基于Nginx)

---面试题---------------------------------------------------------------------------------------------------------------------------------------------
==面试题==
1.android vs iOS移动端
2*.viewpoint/knockout/hadoop/spark
3.[比较全面了]https://blog.csdn.net/xiangzhihong8/article/details/78441626
4.[也不错]https://blog.csdn.net/qq_20264891/article/details/79158495

1.prototype vs __proto__
2.viewport meta tag
3.域名收敛
网页资源加载时，pc端采用域名发散，利用并发下载资源；
移动端网速关键，域名解析费时（2-4个还能接受，再多就慢了），故将静态资源放在统一域名下，节约DNS解析时间。
Google引出了SPDY，HTTP2的前身。通过复用一个TCP连接，发送多个请求。
4.float
float元素display属性的computed value会被隐式修改为block。
float元素脱离文档的normal flow（但仍保留为文档一部分。啥意思？），向左或右浮动直到碰到containing block的边缘，或是碰到其他float元素。
Non-positioned、Non-floated的块级元素在布局时无视float元素（就好像float元素不存在一样）。
when an element is floated, it is taken out of the normal flow of the document (though still remaining part of it). It is shifted to the left, or right, until it touches the edge of its containing box, or another floated element.
Non-positioned, non-floated, block-level elements act as if the floated element is not there, since the floated element is out of flow in relation to other block elements

5.前端优化策略
  1.减少请求数：因为每个请求都要建立TCP连接（三次握手），以及TCP的慢启动。
    实施途径：利用缓存、js/css压缩合并、css sprite(零散的图片整合成一张)
6.jsonp vs jsonpCallback（跨域访问的解决方法之一）
JSONP: 实际上是利用<script>可以通过src引入跨域资源的方式，发请求到跨域服务器，响应后生成动态脚本，会调用传过去的回调函数。
如当前页面为domain-a.com，此时动态向DOM中添加<script type="text/javascript" src="http://domain-b.com/username?q=xiyu"></script>，由于<script>是不受Same Origin Policy限制的，这就向domain-b.com发送了一个请求。在domain-b.com响应时返回结果一般是JSON如"{name:xiyu, age:27, alone:yes}"。如何让domain-a.com脚本来使用这个响应呢？那就需要在domain-a.com中定义一个回调函数如foo(res){ alert(res) }，然后将foo追加到url中（即http://domain-b.com/username?q=xiyu&callback=foo），跨域请求后domain-b.com服务器从callback取到回调函数的名称foo，再将响应wrap一下：foo("{name:xiyu, age:27, alone:yes}")，最后将这个结果返回。那么当在domain-a.com中拿到响应后，实际就是一句foo函数表达式被执行。JSON with Padding，这就是JSONP的由来。。
注意：JSONP仅支持GET方法。

$.getScript

实现CORS的jQuery方式。
jsonp：指明在URL中QueryString中的key："callback"，默认为"callback=?"
jsonpCallback: 指明JSONP的回调函数名。
JSONP方式，服务器返回javascript，并在ajax的success回调之前，会将Response中的JSON传给jsonpCallback指明的回调函数，并调用该函数。
If jsonp is specified, $.ajax() will automatically append a query string parameter of (by default) callback=? to the URL. The jsonp and jsonpCallback properties of the settings passed to $.ajax() can be used to specify, respectively, the name of the query string parameter and the name of the JSONP callback function. The server should return valid JavaScript that passes the JSON response into the callback function. $.ajax() will execute the returned JavaScript, calling the JSONP callback function, before passing the JSON object contained in the response to the $.ajax() success handler.
7.CORS(Cross-Origin Resource Sharing)跨域
<iframe>、<img>、<a>、<script>等是允许通过src来指定url访问跨域资源的。
但浏览器不允许javascript发起跨域请求，不过也可能是请求的确发出了，但被浏览器拦截。（对！）
CORS是一个允许服务器通过设置HTTP Response的Header，来告知浏览器可跨域访问的机制。即如果foo.example向bar.example发送跨域请求，此时bar.example可以通过设置Access-Control-Allow-Origin来告诉foo.example，表明是否可以访问我的资源。这个响应实际上是已经发出了，而且如果服务端没有拒绝，则通过抓包工具是可以看到Response有返回的，只不过是被***浏览器***拒绝了！这就是禁止了跨域。这其实是浏览器的机制！
8.get vs post
get: 数据通过url querystring发送给服务端，大小有限制（2k左右吧），一般服务器还会log下来，所以不适合存放敏感信息
post: 数据放在http body，无大小限制
9.Entity header
An entity header is an HTTP header，用于描述消息body的。这个header可以用在HTTP request和HTTP response中。
如Content-Length、Content-Language、Content-Encoding都是属于entity headers.


==2018.10.12 21:21 腾讯电话面试==
1.打开浏览器加载url的整个过程
[step1]DNS解析输入的域名
[step2]拿到主机地址后，客户端发起TCP连接
[step3]三次握手成功后，向服务器发送HTTP请求
[step4]客户端拿到HTTP响应，开始在浏览器中解析
解析HTML文档，构造DOM树。遇到外部css时，浏览器发送另一个异步请求，并继续向下执行；如果遇到外部js，加载了js并执行后才会继续向下（如果script设置有效的defer属性）。

OM的创建：
1. http响应字节流(Bytes)->字符(Characters)->标记(Tokens)->节点(Nodes)->DOM
2. http响应字节流(Bytes)->字符(Characters)->标记(Tokens)->节点(Nodes)->CSSOM

Render-Tree construction渲染树的构建、布局、绘制
处理 HTML 标记并构建 DOM 树。
处理 CSS 标记并构建 CSSOM 树。
将 DOM 与 CSSOM 合并成一个渲染树。
根据渲染树来布局，以计算每个节点的几何信息。
将各个节点绘制到屏幕上。
[ref]https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model
要提升页面性能，在于优化"关键渲染路径"（即页面从创建DOM到渲染到屏幕上的5个步骤）。一旦修改DOM或CSSOM，就要重新执行这5个步骤。

Render-Blocking CSS
Both HTML and CSS are render blocking resources.就是说，因为要渲染树才能让浏览器绘制页面，而渲染树又来自于DOM和CSSOM的合并。没有CSSOM顶多是没有了样式，但不能没有DOM。所以浏览器绘制时，就要等这两个OM都加载好才行，DOM无论如何都要加载，跑不了。剩下就要等CSSOM了。如果CSSOM加载很慢，就会阻塞页面的整个渲染过程。（media types and media queries可将CSS标记为non-blocking，例如Media=print，则只有当打印时才会将这部分CSS构造到CSSOM中，但注意，不论blocking or non-blocking，浏览器都要下载CSS资源。\
Finally, note that "render blocking" only refers to whether the browser has to hold the initial rendering of the page on that resource. In either case, the browser still downloads the CSS asset, albeit with a lower priority for non-blocking resources.

Critical Rendering Path（CRP）-Adding Interactivity with JavaScript
HTML解析程序在对DOM进行解析时，如果碰到js脚本(遇到<script>)，则会就地立即执行。HTML解析器将CPU控制权交给JavaScript引擎，当js执行完毕后再将控制权交回到HTML解析器，继而继续向下解析。
This demonstrates an important property: our script is executed at the exact point where it is inserted in the document. When the HTML parser encounters a script tag, it pauses its process of constructing the DOM and yields control to the JavaScript engine; after the JavaScript engine finishes running, the browser then picks up where it left off and resumes DOM construction.

所以javascript对于DOM解析的过程来说，它是一个parser blocking。对于用<script>引入的外部脚本而言，浏览器必须暂停解析，从disk或remote server获取脚本资源，这就导致额外的延迟时间(tens to thousands of milliseconds)被加到整个关键渲染路径上，继而影响到页面的渲染速度。
可以为这种外部脚本在script tag上添加属性asnyc，则表示异步加载js资源。

[myQ]疑问：google developer说，js要等CSSOM，js又会阻塞DOM，那如果js、link css在<head>，js又在link之前，那是怎么处理的呢？究竟link css是同步还是异步加载吗？

2.页面在浏览器中的详细的生成过程
  计算布局、大小、位置
3.回流(reflow)和重绘(repaint)
 repaint: 当修改了DOM表象的一些特性，比如background-color, visibility等时触发。
 reflow: 当页面DOM布局发生变化，比如display:none，width，font-size等时触发，布局调整好后，最后再触发repaint。reflow is very expensive。
4.怎么知道要缓存哪个文件的
  我答到cookie去了。。服务器设置set-cookie类似的
  [面试官]：服务器发来的响应报文头中那些控制字段来控制的，cache-control什么的
  HTTP header中的Cache-Control，取值有private, public, max-age, no-cache等。max-age表示有效秒数，当失效后，需向服务器重新获取资源。
  ETag，是为了解决资源虽然在**时间上**失效了，但服务器上其内容并没有发生变化，此时再向服务器请求就有点过分哈。所以在第一次服务器响应时，将ETag（通常是文件的hash）放在header中一并发给客户端。当缓存时间失效后，浏览器发送的HTTP header中将If-None-Match设置为那个hash值，服务器拿到后比较发现一样的话，就只返回header，body是空的，节省了带宽和时间。
  
5.HTTP2.0
  我答SPDY有HTTP2.0的影子，扯到了提升前端性能，域名收敛。。额。。强答啊
  

6.闭包
  它有什么用，主要用在哪里；利用了js的什么特性才有的这个闭包概念呢
  我用for循环中设置事件的例子来举证。。[面试官]：你说的是可以用闭包来解决这个问题吧。[我]：嗯嗯！！
  我一直脑海里徘徊的是lexical这个词儿，就是没想到作用域。。就说是利用内嵌函数可以访问到外层函数的变量，这样创建了私有性。
  用处有单例模式，比如可以返回一个对象包含属性、方法等，将私有变量隐藏起来。
7.有哪些攻击的，如XSS有了解吗，简单介绍下。
  我答我发给人一串url，里面含有script，点击alert，不就hack了。。就记得这个弱智的例子了。。
8.异步优化，ES7提出的新方法，promise、generator、还有个啥async好像(async...await)等，知道呗？
  目前主流浏览器都已经支持ES7。[ref]http://kangax.github.io/compat-table/es2016plus/[/ref]
  ES6-2015.06 (ECMA2015)
  This update adds significant new syntax for writing complex applications, including classes and modules, but defines them semantically in the same terms as ECMAScript 5 strict mode. Other new features include iterators and for/of loops, Python-style generators, arrow functions, binary data, typed arrays, collections (maps, sets and weak maps), promises, number and math enhancements, reflection, and proxies (metaprogramming for virtual objects and wrappers).[29][30] The complete list is extensive.[31]
  ES7-2016.06 (ECMA2016)
    includes two new features: the exponentiation operator (**) and Array.prototype.includes.
  ES8-2017.06 (ECMA2017)
    includes async/await, which works using generators and promises. 
  ES9-2018.06 (ECMA2018)
    include rest/spread properties, asynchronous iteration, Promise.prototype.finally() and additions to RegExp.
  [我]：ES7着实不知道。。异步用的ajax多一些，描述了下ajax的callback。(我说只了解了一点ES6，面试官说那你来讲讲呗。说了var/let, const，再憋不出来了。。）
  [面试官]：其实呢callback这样写不是不可以，这样写多了的话会给代码易读性造成困难，所以有promise，以同步的语法方式来写异步调用代码，更优雅~
  [我]：哦哦~~~跟你学习到了，谢谢！
9.打包工具有用过吗
  我就隐约感觉她会说webpack。我就说了用不到。。只是合并js压缩就上了。。我看前端的一些发展，人都有从头到尾的一套方法和工具，我们没机会用。。
  [面试官]：（果然不出我所料）那webpack打包的有用过吗？
10.我看看你的简历哈，看你这么多个项目，举一个你认为比较...的来说说吧
  聊了下代发，就说业务流程多，我自己分模块class，在封装的每个页面对象上调用方法，自己的想法是可能会更独立些吧。
  [面试官]那工作中用过什么框架呢？
  [我]：老实说银行不让用什么开源的，我们就是js+jquery了。。像有些更好的React、Angular等管理DOM，我们只能纯js写了。工作中用不到，只是平时学习了解了一下。
11.你有写过后端嘛？
  [我]：（挺懵逼的）..
  [面试官]：噢。。Node.js有用过吗？
  [我]：（我真都是只听说/了解过，没真正写过）了解，从来没写过。。
  (少顷...）
  [我]：不过我可以学呀~
  [面试官]：哈哈哈~ 嗯，没事，我们继续往下吧（感觉她好开心啊，经常这一句。。）
11.[面试官]前端发展很快，有很多东西都可以去学习了解下的，自己平常也可以用用嘛
  [我]：是的，我也觉得有些新东西想学习下，工作中难以用到。就想着换个环境，进步一下。
  [面试官]：那好吧，今天面试就到这儿了，后面如果可以的话，会有另一个面试官联系你。
  
  
//注重基础
1. css 清除浮动
2. this 指向
3. css 实现垂直居中
4. 实现 BFC
5. web 安全：跨域，xss，各种攻击
6. 性能优化：前端优化、后端优化
7. this指向
8. 打包工具
9. nodejs
10. http状态码
11. prototype chain
12. 闭包、作用域
13. 缓存: cookie, sessionStorage
14. url加载网页全过程
15. http/1.0 vs http/2.0
16. es6: class, proxy, promise及原理; es7, es8 etc.
17. websocket
18. canvas
19. https vs http
20. 将一个对象里的原型链上的属性过滤掉
21. flex
22. async/await
23. 1000瓶酒中只有一瓶有毒，如何用最少的小白鼠找出毒酒？小白鼠喝酒后24小时死亡则说明有毒，否则无毒。

==腾讯面试，2019.05.21 18:45-19:18 这个男面试官思维很清晰，问题是分类问的，稳得一批==
1.http的method有哪些，区别。主要get vs post
2.http vs https（非对称vs对称，如何保证数据的真实性（hash，用非对称思想对hash值加密））
3.js中的this
4.promise vs setTimeout(xx, 0)
5*.浏览器中的微任务vs宏任务
微任务：Promise.then, MutationObserver
宏任务：setTimeout, setImmediate, MessageChannel
浏览器有两个时间队列，分别是微任务队列和宏任务队列。
微任务队列就是将任何属于微任务的异步代码(Promise.then、MutationObserver)放入微任务事件队列中；宏任务队列类似。
浏览器首先将执行栈上的同步代码执行完，然后**将所有微任务队列中的事件按顺序执行完毕**，然后再查看宏任务队列。如果有，则取第一个宏任务执行，***执行完这个任务后，再查看微任务队列中是否有微任务需要执行，如有则再执行所有的微任务，否则继续取第一个宏任务来执行。
实际上这里就是一个浏览器执行代码的周期，在一个周期中，执行所有待执行的微任务，然后再取第一个宏任务执行，然后继续向下走，直到进入下一个处理周期。

6.js中的垃圾回收机制
实际和操作系统中的原理类似，答这方面应该就行了。
引用计数，标记清除。

7.React中的Virtual DOM
8.repaint（重绘） vs reflow（回流）
9.css问了一些比较简单的问题
 9.1 类选择器、id选择器怎么写
 9.2 选直接孩子呢，A + B啥意思呢
 9.3 display:inline vs display:block
 9.4 position:absolute vs position:fixed
 9.5 如何隐藏一个元素
10.平时有没有学习什么新技术，前沿的一些东西
==总体感觉，比较顺畅，平常心嘛。而且其实他问这些东西的时候，自己大部分都是能答上来的，相信自己==
==两种结果都能接受，那就坦然了。Anyway，都要自己学习进步==

对简历，腾讯李刘鹏给的建议：
1. 代发数据无法体现出和前端相关的东西；
2. iOS、小程序，自己不擅长的不用写；
3. 

---刚入职腾讯碰到的需要学习的内容---
1. promise
2. await
3. module.exports
4. require
5. js打包
6. class