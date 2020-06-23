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
  fontSize: 20,
}
</pre>

等价于，

`style="color: blue; font-size: 20px"`

#### 6.4 style数组语法

`v-bind:style="[baseStyles, overriddingStyles]"`

### 7. v-if vs v-show

`v-if`: 不需要频繁切换时使用(需要时Add,不需要时Remove)

`v-show`: 需要频繁切换时使用(保持在DOM中,通过修改`display`实现)