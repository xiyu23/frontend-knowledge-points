#### 1.filter
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

##### 过滤器是一个函数，总接收表达式的值作为第一个参数。
#### 2. router
##### 2.1 `<router-link>` vs `<a>`

##### 2.2 动态路由匹配
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

##### 2.3 