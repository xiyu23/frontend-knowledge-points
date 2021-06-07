npm i @reduxjs/toolkit
npx create-react-app my-app --template redux
npm i redux

- [2. Redux基本概念](#2-redux基本概念)
  - [2.1 `Store`](#21-store)
  - [2.2 `Action`](#22-action)
  - [2.3 `Reducer`](#23-reducer)
  - [2.4 `Action Creator`](#24-action-creator)
  - [2.5 `Dispatch`](#25-dispatch)
  - [2.6 `Selector`](#26-selector)
  - [2.7 `Slices`](#27-slices)
  - [2.8 `combineReducers`](#28-combinereducers)
  - [2.9 `thunk`(+1)](#29-thunk1)
  - [2.10 `useSelector`](#210-useselector)
  - [2.11 `useDispatch`](#211-usedispatch)
  - [2.12 `Provider`](#212-provider)
  - [2.13 `connect`](#213-connect)
- [3. @reduxjs/toolkit基本概念](#3-reduxjstoolkit基本概念)
  - [3.1 `configureStore`](#31-configurestore)
  - [3.2 `createSlice`](#32-createslice)
  - [3.3 该这个了](#33-该这个了)


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
- **不能做异步操作**和其它副作用(`side effects`如何理解？)

tips:
- 手写Reducer中state的***immutable***更新逻辑非常容易出错而且很痛苦，[Redux Toolkit](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux)可以拯救！

**问题**：

1、为什么不能做异步操作？

A. 是因为reducer并没有被异步调用（不是`async`声明的），所以在

2、为什么不可以直接修改`state`?

A. 应用的每个状态其实都对应一个`state`，视图就是根据state来表现的。每当有state变迁，都用一个独立的state来描述，这样就形成了很多快照，也非常利于回滚。

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

### 2.7 `Slices`

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

### 2.8 `combineReducers`

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

### 2.9 `thunk`(+1)

通用概念：一个子程序，用于向另一个子程序中注入某些计算。

redux中的概念：一种特殊的redux函数，可以包含异步逻辑。它需要用2个函数来定义，

**内部thunk funciton**接收`dispatch`、`getState`参数；

**外部creator funciton**将内部的这个函数返回。

语法：

```js
export function outsideThunkCreatorFunction(customeParam1, customeParam2) {
  return async function insideThunkFunction(dispatch, getState) {
    // do something asynchronous in thunk
    // dispatch an action when we get the response back
    dispatch(action);
  };
}
```

例子：

调用`incrementAsync`这个*thunk funciton creator*，将会dispatch一个*thunk function*，这个函数就是

```js
dispatch => {
  // 1. do sth asynchronous
  // 2. dispatch an action
}
```

```js
// thunk
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

// dispatch
store.dispatch(incrementAsync(5))
```

问题：

1、`store.dispatch`为啥可以接收一个函数？

### 2.10 `useSelector`

> 可以用redux自定义的hook `useSelector` 来在React组件中获取store中的数据。

```js
import { useSelector } from 'react-redux'

function myReactComponent() {
  const counter = useSelector(state => state.counter);
  console.log(`counter value is: ${counter}`);
}
```

**每当redux store更新后，`useSelector`都会再运行一次我们提供的*selector*函数，如果值发生了变化，就会触发react组件重新渲染以达到视图的更新。**

> Any time an action has been dispatched and the Redux store has been updated, useSelector will re-run our selector function.

**问题**：

1、store更新后，`useSelector`是怎么触发react组件更新的呢？

### 2.11 `useDispatch`

目的：在无法拿到`store`的引用时，用它来发送action来触发store的更新。

```js
import { useDispatch } from 'react-redux'

function myReactComponent() {
  const counter = useSelector(state => state.counter);
  console.log(`counter value is: ${counter}`);

  const dispatch = useDispatch();
  dispatch(incrementBy(2));
}
```

### 2.12 `Provider`

作用：包裹`<App>`，将`Redux store`传入，以使得React组件树中的组件都能通过hooks引用到`store`。

```tsx
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### 2.13 `connect`

**React-Redux**中的API，用于将**React UI**和**Redux Store**连接起来。

其实避免在UI中手写从store取数据和listen等。

> Its here for you to read values from the Redux store (and re-read the values when the store updates).

connect原型：
```ts
function connect(mapStateToProps, mapDispatchToProps): function
```

- mapStateToProps  
  它是一个函数，每当`store`变化时就会被调用，返回你所需要的数据对象，它会被传入给你的组件。
  
  下面例子中表示，每当`store`变化时，`{ counter: xxx }`就会被传入组件。
  ```ts
  connect(state => ({ counter: state.counter }));
  ```
- mapDispatchToProps  
  函数或者对象，要返回**Action Creators**。  
  ```ts
  // 对象（推荐，因为写起来简单）
  connect(null, {
    increment: num => ({ type: 'ADD', payload: num }),
    decrement: num => ({ type: 'SUB', payload: num }),
  });
  ```

`connect`返回一个函数，你需要给这个函数传参，参数就是**要被包裹的组件**。

```ts
// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(mapStateToProps, mapDispatchToProps)

// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)
```

而后React组件树中，**Component**就会被包裹起来：

```tsx
<Connect(AddTodo)>
  <AddTodo>
  </AddTodo>
<Connect(AddTodo) />
```

此时被包裹的组件`AddTodo`就能接收到props：`increment` 和 `decrement`。

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

### 3.2 `createSlice`

此函数就是替代痛苦地手写reducer更新逻辑的语法糖。

比如要更新内嵌比较深的属性`a.b.c[1] = 3`，纯手写更新逻辑时非常复杂且容易出错：

```js
function reducerWithHand(state, action) {
  return {
    ...state,
    a: {
      ...a,
      b: {
        ...b,
        c: [...state.a.b.c.slice(0), 3, ...state.a.b.c.slice(2)],
      },
    },
  };
}
```

在`createSlice`中可以用以下语法来写更新逻辑：

```js
function reducerWithImmer(state, action) {
  state.a.b.c[1] = 3;
}
```

完整的`createSlice`例子：

```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  // reducers中的这些函数，可以书写更加易读的更新store语法
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
} = counterSlice.actions;
```

:waring: 注意！上面这些`reducer`函数接收的参数`state`表示的是当前`slice`所负责数据，即`state`是名为`counter`属性对应的数据(`{ value: xx }`)，而不是redux store这个整体的state。

`createSlice`函数的返回值是一个对象，可以获取`actions`和`reducer`：

- `actions`  
  **作用**： UI可经由此拿到actions，而后去派发事件。
  ```js
  const {
    increment,
    decrement,
    incrementByAmount,
  } = counterSlice.actions;
  ```
  拿到这些**Action Creator**，这样就可以在UI处派发事件了：
  ```tsx
  // view.tsx
  // store.dispatch
  import { useDispatch } from 'react-redux'

  // action creator
  import { increment, incrementByAmount } from './counterSlice'

  const dispatch = useDispatch()

  // 派发事件给store，让counter+1
  dispatch(increment());
  
  // 派发事件给store，让counter+5
  // incrementByAmount是一个action creator，返回形如:
  // { type: 'counter/incrementByAmount', payload: 5 }
  dispatch(incrementByAmount(5));
  ```

- `reducer`  
  **作用**：创建store的时候需要传入reducer，这里表示当前*feature state*所对应的reducer，传入以供`configureStore`使用。  
  ```js
  import { configureStore } from '@reduxjs/toolkit'
  import { counterSlice } from './counterSlice'

  // 拿到counter数据对应的reducer
  const counterReducer = counterSlice.reducer;

  // 配置到store
  export default configureStore({
    reducer: {
      counter: counterReducer,
      // more...
    },
  })
  ```

  ### 3.3 该这个了

  href: https://redux.js.org/tutorials/essentials/part-4-using-data
  