### 1.filter
过滤器，可以用于文本格式化，写在两个地方：双花括号插值和 v-bind 表达式。 

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号(|)指示：  

>在双花括号中  
>`{{ message | capitalize }}`
>
>在 `v-bind` 中  
>`<div v-bind:id="rawId | formatId"></div>`

局部过滤器：定义在vue组件上
<pre>
filters: {  
  capitalize: function (value) {  
    if (!value) return ''  
    value = value.toString()  
    return value.charAt(0).toUpperCase() + value.slice(1)  
    }  
  }
</pre>

全局过滤器：在创建Vue实例之前
<pre>
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
</pre>

**过滤器是一个函数，总接收表达式的值作为第一个参数。**
### 2. router
#### 2.1 `<router-link>` vs `<a>`

#### 2.2 动态路由匹配
<pre>
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})

</pre>
将会匹配/user/evan, /user/yuhui。
且可在组件内通过引用this.$route.params.id来获取到动态参数值。

#### 2.3 


### 3. 动态参数
通过中括号的形式，其内可以写一个表达式，但是不要包含空格或者引号，如果需要的话可改成计算属性来变通。

<code><a v-bind:[someAttr]="value"></a></code>

### 4. 缩写
v-bind  
<code>:href === v-bind:href</code>

v-on  
<code>@click === v-on:click</code>  
动态参数  
<code>@[event] === v-on:[event]</code>  

### 5. 计算属性
为Vue实例的选项增加一个`computed`属性，它的值是一个对象，其中可以定义多个计算属性，每个属性的值是一个函数，用来计算*计算属性*的值。

<pre>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  <span style='color:skyblue'>computed</span>: {
    // 计算属性的 getter
    <span style='color:orange'>reversedMessage</span>: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    },

    // 计算属性也可以设置setter
    <span style='color:orange'>fullName</span>: {
      <span style='color:skyblue'>getter</span>: function () {
        // `this` 指向 vm 实例
        return this.firstName + ' ' + this.lastName
      },
      <span style='color:skyblue'>setter</span>: function(val) {
        const names = val.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      },
    },
  }
})
</pre>

#### 5.1 计算属性缓存 vs 方法
同样可以将上述函数定义在Vue实例选项的`methods`上，以达到同样的效果。  

但是二者的区别在于，**计算属性是会缓存的**。  

因为计算属性是响应式的依赖，只有当所依赖的属性值发生了变化，计算属性才会重新求值。

而**函数**则不同，函数每次被访问都会调用一次来计算求值。

#### 5.2 计算属性 vs 侦听属性
**什么是侦听属性?**

侦听属性是指在Vue实例选项中的`watch`对象。

`watch`对象中的每个`key`都是**被侦听**的属性，而其`value`则是一个函数，当`key`发生变化时该函数就会被执行。这个函数就执行修改某个依赖属性的值的操作。

<pre>
// 例子：vue实例选项，fullName依赖于两个值firstName/lastName

// 方法一：用watch(deprecated)
...,
watch: {
  firstName: function(val) {
    this.fullName = val + ' ' + this.lastName;
  },
  lastName: function(val) {
    this.lastName = this.firstName + ' ' + val;
  },
}

// 方法二：用computed(better)
...,
computed: {
  fullName: function() {
    this.fullName = this.firstName + ' ' + this.lastName;
  },
}
</pre>

### 6. Class与Style绑定
这俩属性比较特殊，绑定的表达式结果值可以是*字符串*、*对象*、*数组*。

#### 6.1 Class对象语法

`v-bind:class="{ active: isActive, 'text-danger': hasError }"`

`active`这个样式类是否应用，取决于property`isActive`的值是否为`true`。

同样地，`text-danger`也是一样，依赖于`hasError`的布尔值。

不必内联将对象写到模板里，可以如此（注意`key`是*className*, `value`的值应该是布尔类型）：

// 模板  

`v-bind:class="classObject"`

// 实例数据
<pre>
data: {
  classObject: {
    active: true,
    <span style='color:#42b983'>'text-danger'</span>: true,
  },
}
</pre>

如此一来，最后应用的样式等价于

`class='active text-danger'`

**一种强大的模式：为`class`绑定一个是计算属性的对象：**

（也就是当样式修改比较复杂时，可以考虑用计算属性来做）

`v-bind:class='classObject'`

<pre>
data: {
  isActive: true,
  error: null,
},
computed: {
  classObject: function() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    };
  },
}
</pre>

#### 6.2 Class数组语法

`v-bind:class="[activeClass, errorClass]"`

<pre>
data: {
  activeClass: 'active',
  errorClass: 'error',
},
</pre>

以上等价于

`class='active error'`

因为`v-bind:class`是一个表达式，因此里面可以写简单的逻辑，如

`v-bind:class="[isActive ? activeClass : '', errorClass]"`

即当`errorClass`固定会添加，而`activeClass`是否添加，是由`isActive`这个property决定的。

也可以这么写（在数组语法中使用对象语法），

`v-bind:class="[{ active: isActive }, errorClass]"`

**自定义组件上写的`className`，最终会添加到自定义组件的*根元素*上，并且*不会被覆盖***

#### 6.3 style对象语法

`v-bind:style="{ color: someColor, 'font-size': fontSize + 'px' }"`

*注意：css property可以用camelCase(`fontSize`)或者kebab-case，但注意kebab-case需要加上引号(`'font-size'`)*

<pre>
data: {
  someColor: 'blue',
  fontSize: 20, // 或者'font-size'
}
</pre>

等价于，

`style="color: blue; font-size: 20px"`

#### 6.4 style数组语法

`v-bind:style="[baseStyles, overriddingStyles]"`

### 7. v-if vs v-show

`v-if`: 不需要频繁切换时使用(需要时Add,不需要时Remove)

`v-show`: 需要频繁切换时使用(保持在DOM中,通过修改`display`实现，`display:none`)

**对于隐藏而言，`v-if`比`v-show:false`代价要高！**

因为`v-if`是条件渲染，不需要渲染时，**根本就不插入DOM**。

而`v-show`因为是用`display:none`来控制的，`style`只是影响到样式的表现(CSSOM, 即CSS-Object-Model)，并不会影响DOM树。

因此，`v-if`根本就不插入DOM，从而不会渲染；`v-show`则存在于DOM中，当需要隐藏时，渲染树得到`display:none`，最终渲染出来的`render tree`是不含这个元素节点的。

`v-if/v-else/v-else-if`

#### 7.1 key

以下HTML，如果没有`key`，则Vue的元素复用机制将会导致`v-if`切换时，input的值仍然残留。

原因是Vue会尽可能复用相同元素，<i style='color:#006fff'>猜测</i>这里因为结构相同（都是`<label>`和`<input>`），所以切换时DOM元素仍保持在DOM树中，而仅仅更改节点元素的属性。

*感觉像是DOM没变，只是用Object.assign修改了属性？*

**TODO: 看下源码吧!**

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

如果希望不要复用`<input>`，则应给它指定一个`key` attribute

?? 这里的`key`为啥不是`v-bind:key`？和`v-for`中的`v-bind:key`有何区别？

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

### 8. 列表渲染：v-for

遍历数组
```html
<li v-for='item in items' :key='item.uniqueKey'>{{ item.message }}</li>

<li v-for='(item, index) in items' :key='item.uniqueKey'>{{ item.index - item.message }}</li>
```

遍历对象
```html
<li v-for='(value, prop, index) in someObject'>{{ index }}. {{ prop }} : {{ value }}</li>
```

#### 8.1 for...in vs for...of

**```for...in```**

遍历一个对象的所有**可枚举**属性，这些属性是用`String`来作为key区分的，且继承而来的属性也会被遍历到。

<pre>
const object = { a: 1, b:2, c:3 };
for (const prop in object) {
  // prop: 'a'/'b'/'c'
  // value can get from object[prop]: 1/2/3
}
</pre>

**最佳实践：**
> 不要在遍历过程中Add/Modify/Delete属性。  
> 不要为数组使用`for...in`(因为此语法是遍历可枚举的属性，并不保证顺序。而且遍历时的*variable*是**数组下标**！)  

**```for...of```**

遍历一个**可迭代**的对象，如内置的`Array`、`String`、`Array-Like Object`(e.g., arguments)、`Map`、`Set`等。

可通过`break`、`return`跳出。

<pre>
for (let value of ['a', 'b', 'c']) {
  // value: 'a'/'b'/'c'
}

for (let value of 'abc') {
  // value: 'a'/'b'/'c'
}
</pre>

#### 8.2 数组更新检测

Vue覆盖(通过`Object.defineProperty`实现Array.prototype上方法的Modify)了几个数组方法，以达到为数组调用方法时能够更新视图的目的。

如pop、push、shift、unshift、splice、sort、reverse等。

翻源码看到array.js中修改以上方法时，value函数内部`this`上有个 **\_\_ob\_\_**，这是啥？

Under the hood, Vue.js attaches a hidden property **\_\_ob\_\_** and recursively converts the object’s enumerable properties into getters and setters to enable dependency collection. Properties with keys that starts with $ or _ are skipped.

**For the object that you want to be observed, Vue creates a `Observer` for it so that updates will be fired as soon as the object changes.**