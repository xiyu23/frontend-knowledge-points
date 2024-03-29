- [Learning Saga](#learning-saga)
  - [1. Saga Effects](#1-saga-effects)
  - [2. `call`：调用一个函数](#2-call调用一个函数)
  - [3. `put`：给store派发一个action](#3-put给store派发一个action)
  - [4. `call` vs `put`](#4-call-vs-put)
  - [5. `all`](#5-all)
  - [6. 捕获saga发生的异常](#6-捕获saga发生的异常)
  - [7. Saga Helpers: `takeEvery`, `takeLatest`](#7-saga-helpers-takeevery-takelatest)
    - [7.1 `takeEvery`](#71-takeevery)
    - [7.2 `takeLatest`](#72-takelatest)
    - [7.3 `takeEvery` vs `takeLatest`](#73-takeevery-vs-takelatest)
    - [7.4 `ForkEffect`](#74-forkeffect)
  - [Q&A](#qa)
    - [1. action里面做了一件事情，结果想通知view，而不用经过store，如何做？](#1-action里面做了一件事情结果想通知view而不用经过store如何做)

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

## 2. `call`：调用一个函数

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

## 3. `put`：给store派发一个action

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

## 6. 捕获saga发生的异常

**方法一**：和平常一样`try...catch`

```js
function* foo(dispatch) {
  try {
    const userInfo = yield call(fetchUserInfo); // #1
    yield put({
      type: 'FETCH_USER_INFO_SUCCEED',
      userInfo,
    });
  } catch (e) {
    yield put({
      type: 'FETCH_USER_INFO_FAILED',
      error: e,
    });
  }
}
```

**注意**：这里`#1`这条语句，`yield expression`本身并没有返回值的，如果是普通方法使用generator，则*userInfo*的值是`undefined`的。

为什么这么写可以呢？

其实我认为是**Saga middleware**做了一些事情，它在调用函数时，会将返回结果带给下一次迭代，也就是当执行了`fetchUserInfo`后，中间件内部将结果通过`next(fetchUserInfoResult)`带给下一次迭代。

那么下一次迭代时，函数`foo`中的*userInfo*变量就会是`fetchUserInfoResult`。


**方法二**：使用中间件的`onError`hook

创建时saga中间件时传入：

```ts
import createSagaMiddleware from 'redux-saga'

createSagaMiddleware({
  onError: (error: Error, { sagaStack: string }) => {
    // 从saga冒出来的未捕获的异常，都会来到这里
  },
});
```

**方法三**：不想让异常从saga中冒出来

不想每个saga都写```try...catch```，用`safeEffect`包一下：

```ts
function* safe(effect: Effect) {
  try {
    return {
      response: yield effect,
    }
  } catch (error) {
    return {
      error,
    }
  }
}

function* fetchProducts() {
  const { response, error } = yield safe(call(Api.fetch, '/products'));

  if (response) {
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  } else {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```

ref: https://github.com/redux-saga/redux-saga/issues/1250

## 7. Saga Helpers: `takeEvery`, `takeLatest`

> href: https://redux-saga.js.org/docs/basics/UsingSagaHelpers

### 7.1 `takeEvery`

Saga task：

```ts
import { call, put } from 'redux-saga/effects'
import Api from './path/to/api'

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url)
    yield put({ type: 'FETCH_SUCCEEDED', data })
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error })
  }
}
```

若希望每一次派发事件`FETCH_REQUESTED`都能执行`fetchData`，则需：

```ts
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

这样一来，相当于会有多个任务在并发地执行。

但如果只希望用最后一个触发action的task，则可以用`takeLatest`。

### 7.2 `takeLatest`

```ts
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
```

### 7.3 `takeEvery` vs `takeLatest`

`takeEvery`返回值是一个`ForkEffect`，结构如下：

```ts
{
  FORK: {
    detached?: boolean;

    context: any;
    fn: Function;
    args: any[];
  }
}
```

其实是`FORK`的值是继承了`CallEffectDescriptor`：

```ts
export interface CallEffectDescriptor {
  context: any;
  fn: Function;
  args: any[];
}
```

哎等等，我怎么看得跟项目中的不一样，返回类型不一样？？

不过`takeEvery`的确是返回一个`ForkEffect`， 这个*Effect*的`type`字段被设置为`FORK`了。

### 7.4 `ForkEffect`



## Q&A

### 1. action里面做了一件事情，结果想通知view，而不用经过store，如何做？

背景：桌面端、移动端在选人之后，根据情况会有一个弹窗。saga里面执行选人操作，希望把需要弹窗的这个事情通知到view，view自己负责显示弹窗。

怎么写好呢？