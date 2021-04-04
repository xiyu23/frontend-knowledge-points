npm i @reduxjs/toolkit
npx create-react-app my-app --template redux
npm i redux

## 2. Redux基本概念

### 2.1 `Store`

Redux中存储数据的对象，**只能创建一个**。

### 2.2 `Action`

一个`Action`就是一个*plain javascript object*，必须有一个`type`属性，也可以增加其它额外属性名，一般会加一个`payload`形如以下：

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

`type`是一个*string*类型，一般以`domain/eventName`的风格命名。

### 2.3 `Reducer`

概念：它是一个函数，接收`state`和`action`作为参数，基于这两个值来计算一个新的`state`并返回。

```js
function reducer(state, action) {
  // 一顿计算操作之后，生成新的state
  return newState;
}
```

原则：
- 不可直接修改`state`，必须基于`原state`和`action`来计算`新state`
- 不能做异步操作和其它副作用(`side effects`如何理解？)

tips:
- 手写Reducer中state的***immutable***更新逻辑非常容易出错而且很痛苦，[Redux Toolkit](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)可以拯救！




### 2.4 `Action Creator`

是一个函数，返回一个`Action`。如，

```ts
const addTodoActionCreator = text => {
  type: 'todo/add',
  payload: text,
};
```

每次派发`todo/add`这种类型的`action`时，可：

```ts
store.dispatch(addTodoActionCreator('clean room'));
store.dispatch(addTodoActionCreator('make cake'));
```

### 2.5 `Dispatch`

`store`上的一个方法，用于派发一个事件给`store`，来达到更新的目的。

:warning: **这是更新`store`的唯一方式**

```js
// store.counter is 0

// dispatch to update
store.dispatch({ type: 'counter/increment' })

// store.counter is 1
```

### 2.6 `Selector`

概念：它是一个函数，从`store`中提取某个具体的数据，免去了每次都要书写解引用的代码。

不用时：

```js
console.log(store.getState().counter);
```

使用`selector`：

```js
// 先定义selector
const selectCounterValue = state => state.counter;

// 使用
console.log(selectCounterValue(store.getState()));
```

### 2.7 `combineReducers`

作用：主要是省事儿。将多个reducer合并，在创建store时传入。

它接收一个对象（都是slice reducer），返回一个函数，每当有事件派发过来时，这个函数就会调用所有的slice reducer，并将每个slice reducer返回的state合并成完整的state返回。

不用的话，

```js
import { configureStore } from '@reduxjs/toolkit'

function rootReducer(state = {}, action) {
  return {
    users: usersReducer(state.users, action),
    posts: postsReducer(state.posts, action),
    comments: commentsReducer(state.comments, action)
  }
}

const store = configureStore({
  reducer: rootReducer,
})
```

有了`combineReducers`之后：

```js
const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
});

const store = configureStore({
  reducer: rootReducer,
});
```

## 3. @reduxjs/toolkit基本概念

### 3.1 `configureStore`

此函数用于创建一个Redux store，我们需要将`reducer`传入。

`reducer`对象中的每个`key`属性名，日后都会是`state`中的属性；而`value`则表示这个具体的`reducer`来负责对数据的更新。

> When we pass in an object like `{counter: counterReducer}`, that says that we want to have a `state.counter` section of our Redux state object, and that we want the `counterReducer` function to be in charge of deciding if and how to update the `state.counter` section whenever an action is dispatched.

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todo/todoSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  }
})
```

### 3.2 `slices`

概念：`slices`就是多个`reducer`的集合而已；而一个`slice`则表示一种`reducer`，负责对一种范畴内的属性进行更新。

因为Redux只能有1个**root reducer**，因此多个`reducer`可以合并起来：

```js
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
```

