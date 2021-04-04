## 1. Saga Effects
在`redux-saga`中，saga是用*Generator Functions*实现的。

创建一个*Generator Function*，每个`yield`语句都返回一个*plain javascript object*，这种对象就叫做***Effects***。

## 2. `call`

与其yield一个异步请求，不如我们直接利用Saga提供的`call`方法，仅yield函数调用的描述：

调用函数`Api.fetch`，并将`args`参数都传过去。

```js
yield call(someMethod, arg1, arg2, ...) // as if we did someMethod(arg1, arg2 ...)
yield call([obj, obj.method], arg1, arg2, ...) // as if we did obj.method(arg1, arg2 ...)
```

```js
// Effect -> call the function Api.fetch with `./products` as argument
{
  CALL: {
    fn: Api.fetch,
    args: ['./products']
  }
}
```

## 3. `put`

不用`put`的话，得这么写：

```js
function* fetchProducts(dispatch) {
  const products = yield call(Api.fetch, '/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}
```

换做`put`的话，可以改为：

```js
import { call, put } from 'redux-saga/effects'
// ...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
```

有啥好处？好测试&mock。（我咋还没看太出来。。）