npm i @reduxjs/toolkit
npx create-react-app my-app --template redux
npm i redux

- [1. 介绍](#1-介绍)
  - [1.1、单向数据流](#11单向数据流)
  - [1.2、数据流向例子](#12数据流向例子)
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
- [4、深入理解](#4深入理解)
  - [4.1、*`dispatch`*](#41dispatch)
  - [4.2、`redux-thunk`](#42redux-thunk)


## 1. 介绍

redux的源码非常简单，就几个能力：
- createStore
  
  创建一个名为store的plain object，对象上挂了getState, dispatch方法。
  dispatch接收一个名为action的参数，内部就调用了reducer函数来计算出新的state，最后通知到listeners。
  
- combineReducers

  传入一个对象，每个 key-value 都是 reducerKey-reducerFunc。返回一个combined后的recuder，相当于rootReducer吧，每当dispatch action后需要调reducer计算新state时，都会走这个combined reducer逻辑。
  combined reducer执行时，实质上是一个for循环，遍历之前传入的reducers，对每个reducer取`state[reducerKey]`作为传入对应reducer函数的第一个参数，并执行这个reducer函数获取新state。任何一个reducer产生的state改变的话，就认为这次action更改了state。最终，这个combined reducer函数返回整个state对象。注意这里是创建了一个新的object，但是若某些字段没变，则仍旧引用的是之前的state。只是root state的引用变了的。

- applyMiddleware
  
  这是精髓。中间件目的就是扩展了dispatch的能力，比如redux-thunk可以让你dispatch一个函数，而redux本身是不允许的，它只能dispatch一个plain object。
  就像一条流水线，每个中间件接收action，中间件自行处理这个action，不处理就传给下一个中间件。
  redux-thunk判断action是一个函数，就执行这个action并return了，不会传递给下一个中间件。

总结：
redux本身并没有和react关联，它更像是提供了一种全局状态管理的机制，而没有与具体的框架耦合。
若要与react结合，那就得用react-redux
  

### 1.1、单向数据流

![例1](./imgs/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

### 1.2、数据流向例子

![例2](./imgs/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)


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

**当装了`thunk`中间件之后**，就可以让`store.dispatch`派发一个函数了，这个函数被称之为*thunk function*。它能获取到`dispatch`和`getState`这两个引用。

```ts
import { configureStore } from '@reduxjs/toolkit'
// somewhere there's a 'counterReducer'

const store = configureStore({ reducer: counterReducer })

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

store.dispatch(exampleThunkFunction)
```

那么很自然地，*thunk action creator*就是这样的，它返回一个*thunk function*用于派发：

```ts
const logAndAdd = amount => {
  return (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter}`)
    dispatch(incrementByAmount(amount))
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter}`)
  }
}

store.dispatch(logAndAdd(5))
```

2、怎么把*redux-thunk*作为中间件加入到redux中？

安装：
```sh
npm install redux-thunk

yarn add redux-thunk
```

插入中间件：
```ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const myThunkFunction = (dispatch, getState) => {
  // do sth asynchronously
  console.log('do sth...');

  // then dispatch action with the very basic way
  dispatch({
    type: 'ADD',
    payload: 1,
  })
};

store.dispatch(myThunkFunction); // 有了redux-thunk中间件，这里可以派发一个函数了
```

### 2.10 `useSelector`

> 可以用redux自定义的hook `useSelector` 来在React组件中获取store中的数据。

```js
import { useSelector } from 'react-redux'

function myReactComponent() {
  const counter = useSelector(state => state.counter);
  console.log(`counter value is: ${counter}`);
}
```

**每当redux store更新后，`useSelector`都会再运行一次我们提供的*selector*函数，如果值发生了变化(或对于引用类型，指向改变时），就会触发react组件重新渲染以达到视图的更新。**

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
  

## 4、深入理解

### 4.1、*`dispatch`*

Basically, *`dispatch`* 是一个同步方法，它 **只接收`plain object`**。

但是可以用中间件来包装，这样就可以在业务层派发`promise`、`类似异步任务`等类型的事件了。

dispatch源码:

```ts
function dispatch(action: A) {
  if (!isPlainObject(action)) {
    throw new Error(
      `Actions must be plain objects. Instead, the actual type was: '${kindOf(
        action
      )}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`
    )
  }

  if (typeof action.type === 'undefined') {
    throw new Error(
      'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
    )
  }

  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.')
  }

  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  return action
}
```

### 4.2、`redux-thunk`

redux-thunk的源码非常简单：

```ts
function createThunkMiddleware(extraArgument) {
  // 返回的这个函数就是thunk中间件，所有中间件都要符合这个签名，即接收一个对象（其中有dispatch、getState，这是redux暴露给中间件的），返回一个函数，这个函数参数是一个符合store.dispatch接口的函数，因为前一个中间件的返回结果，将会作为下一个中间件的输入，每个中间件都要能够处理dispatch。
  // 当上层调用store.dispatch时，thunk判断如果传入的action是一个函数，则直接调用它并返回。如果不是，则调用next传递给下一个中间件处理。
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

```ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

```

`applyMiddleware`

中间件源码：

```ts
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) =>
    <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      preloadedState?: PreloadedState<S>
    ) => {
      const store = createStore(reducer, preloadedState)
      let dispatch: Dispatch = () => {
        throw new Error(
          'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        )
      }

      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
}
```


```ts
// compose中，对funcs执行了reduce，看着很晕。。对中间件数组从后到前执行的？错，从前到后，按数组下标顺序执行。
// 假设数组为[a, b, c]，那么返回的这个函数执行时，会将参数args给c执行，c返回的结果再作为b的输入，b的输出再作为a的输入。
// 返回的composedFunc为: a(b(c(d(store.dispatch))))的执行结果，它是一个函数。
// 这个composedFunc赋值给了store.dispatch。当上层调用时，先调用中间件a，如果a不拦截，a里会调用next(action)以将action委托为下一个中间件b处理，以此类推直到跑完所有中间件，如果都没人处理，就用redux原生的store.dispatch来处理。
return funcs.reduce(
  (a, b) =>
    (...args: any) =>
      a(b(...args))
)
```

chain中的每个元素都是这样的格式：接收1个参数next，返回一个函数。

实质上从中间件chain最开始执行时，传入的参数就是`store.dispath`。它经过这些中间件挨个处理，

```ts
(next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState, extraArgument);
  }

  return next(action);
}
```