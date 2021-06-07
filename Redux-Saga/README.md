- [Learning Saga](#learning-saga)
  - [1. Saga Effects](#1-saga-effects)
  - [2. `call`](#2-call)
  - [3. `put`](#3-put)
  - [4. `call` vs `put`](#4-call-vs-put)
  - [5. `all`](#5-all)

# Learning Saga

## 1. Saga Effects
在`redux-saga`中，saga是用*Generator Functions*实现的。

创建一个*Generator Function*，每个`yield`语句都返回一个*plain javascript object*，这些对象就叫做***Effects***。

`fetchProducts`就是一个***Saga***，`yield Api.fetch('/products')`这条语句将返回一个普通js对象，也就是一个*Effect*。

```js
function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```

***Effect***就是包含了指令的普通js对象，告诉中间件需要做某件事情。

它可以看作是对命令的一个描述。

> Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware

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

## 4. `call` vs `put`

它俩都是返回一个***Effect***（就是一个纯简单的JS对象而已）给saga中间件。

这样我们在测试代码中，因为返回的是简单的JS对象，那么就完全可以很轻松地去写测试代码。

**sagas.js**
```js
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// worker saga
export function* incrementAsync() {
  yield delay(1000); // 返回一个promise给middleware，middleware等promise resolved之后继续执行saga

  // put这里就是搞了一个action
  yield put({ type: 'INCREMENT' }); // 返回一个effect给middleware，middleware执行完这个effect之后继续执行saga
}
```

我们希望用下面的代码来进行saga的测试，

**sagas.spec.js** (测试代码)
```js
import test from 'tape'

import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next(),
    { value: ???, done: false }, // #1
    'incrementAsync should return a Promise that will resolve after 1 second',
  )
})
```

你会发现，在`#1`这个地方，返回的`value`其实是一个1s后会resolve的一个Promise对象，但是我们却很难写Promise的相等判断。

注意到我们是直接在saga中执行了`delay`后，才将这个Promise对象yield出去。

与其这样，不如我们`yield`一个*Effect*(用一个普通的JS对象表示的指令)，而saga中间件接到后由它去执行具体的任务。

这样我们在测试代码中就非常好写测试用例了，判断纯JS对象不比Promise来的香嘛！

**改进后**：

|-|需要延时一段时间|备注|
|-|-|-|
|改进前|`delay(1000)`| <sup style='color:red'>Bad</sup>就地执行并返回一个Promise，**难以写测试代码** |
|改进后|`call(delay, 1000)`| <sup style='color:green'>Good</sup>返回一个*Effect*，告诉调用者要调用`delay(1000)` |

```js
call(delay, 1000)
// 相当于触发一个CALL Effect：调用一个函数
{ CALL: { fn: delay, args: [1000] } }

put({type: 'INCREMENT'})
// 相当于触发一个PUT Effect：派发action给store
{ PUT: {type: 'INCREMENT'} }
```

> `call` just like `put`, returns an *Effect* which instructs the middleware to call a given function with the given arguments.
> 
> In fact, neither `put` nor `call` performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects.


ref: https://redux-saga.js.org/docs/introduction/BeginnerTutorial#making-our-code-testable

## 5. `all`

创建一个*effect*，告诉中间件去**并行地**运行多个Effect，直到全部完成。

```js
all([...effects]) // 数组形式: [ effect1, effect2, ... ]
all(effects) // object形式: { label: effect, ... }``
```

```js
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const [customers, products] = yield all([
    call(fetchCustomers),
    call(fetchProducts)
  ])
}
```
