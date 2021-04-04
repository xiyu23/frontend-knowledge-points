npm i @reduxjs/toolkit
npx create-react-app my-app --template redux
npm i redux

## 2. 基本概念

### 2.1 `Store`

### 2.2 `Actions`

一个`Action`就是一个*plain javascript object*，必须有一个`type`属性，也可以增加其它额外属性名，一般会加一个`payload`形如以下：

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

`type`是一个*string*类型，一般以`domain/eventName`的风格命名。

### 2.3 `Reducers`

原则：
- 不可直接修改`state`，必须基于`原state`和`action`来计算`新state`
- 不能做异步操作和其它副作用(`side effects`如何理解？)

tips:
- 手写Reducer中state的***immutable***更新逻辑非常容易出错而且很痛苦，[Redux Toolkit](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)可以拯救！




### 2.4 `Action Creators`

## 3. `configureStore` from `@reduxjs/toolkit`

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

