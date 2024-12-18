# Learning React
===React相关知识点===

*在vscode中，按下F1键以调出命令，输入`Create Table of Contents`来创建目录。*

- [Learning React](#learning-react)
  - [1. JSX](#1-jsx)
    - [1.1 可以嵌入表达式](#11-可以嵌入表达式)
    - [1.2 JSX中的属性](#12-jsx中的属性)
    - [1.3 JSX中的用户输入部分是安全的](#13-jsx中的用户输入部分是安全的)
    - [1.4 JSX其实是个语法糖](#14-jsx其实是个语法糖)
  - [2. 快让我们用上JSX！](#2-快让我们用上jsx)
    - [2.1 引入React library](#21-引入react-library)
    - [2.2 引入babel](#22-引入babel)
    - [2.3 在HTML中使用jsx](#23-在html中使用jsx)
    - [2.4 jsx预处理器(JSX preprocessor)](#24-jsx预处理器jsx-preprocessor)
    - [2.5 创建typescript写React的工程](#25-创建typescript写react的工程)
  - [3. 渲染React Element](#3-渲染react-element)
    - [3.1 函数组件(`function component`)和类组件(`class component`)](#31-函数组件function-component和类组件class-component)
      - [3.1.1、定义](#311定义)
      - [3.1.2、区别](#312区别)
      - [3.1.3 函数组件](#313-函数组件)
      - [3.1.4 类组件](#314-类组件)
    - [3.1 对于函数组件，当`props`变化时发生了什么？](#31-对于函数组件当props变化时发生了什么)
    - [3.2 对于函数组件，当内部`state`(通过`useState`添加的状态)变化时发生了什么？](#32-对于函数组件当内部state通过usestate添加的状态变化时发生了什么)
    - [3.3 对于类组件，当`props`变化时发生了什么？](#33-对于类组件当props变化时发生了什么)
    - [3.4 对于类组件，当`state`变化时发生了什么？](#34-对于类组件当state变化时发生了什么)
  - [4. Components和Props](#4-components和props)
    - [4.1 这就是一个*React Component*](#41-这就是一个react-component)
    - [4.2 使用组件渲染](#42-使用组件渲染)
    - [4.3 组件也可以引用另一个组件](#43-组件也可以引用另一个组件)
    - [4.4 `props` are Read-Only](#44-props-are-read-only)
  - [5. 使用`setState`来更新DOM](#5-使用setstate来更新dom)
    - [5.1 一个错误的例子](#51-一个错误的例子)
    - [5.2 `state`来了！](#52-state来了)
      - [5.2.1 将function component转换为class component](#521-将function-component转换为class-component)
      - [5.2.2 添加local state](#522-添加local-state)
      - [5.2.3 添加lifecycle methods](#523-添加lifecycle-methods)
      - [5.2.4 关键的更新操作：`setState`](#524-关键的更新操作setstate)
    - [5.3 关于`state`的注意点](#53-关于state的注意点)
  - [6. Handling Events](#6-handling-events)
    - [6.1 定义一个事件](#61-定义一个事件)
    - [6.2 在事件处理函数中，阻止默认行为](#62-在事件处理函数中阻止默认行为)
    - [6.3 注意`this`的绑定](#63-注意this的绑定)
      - [6.3.1 方法一：在构造函数中`bind`](#631-方法一在构造函数中bind)
      - [6.3.2 方法二：一种实验性(*experimental*)的语法](#632-方法二一种实验性experimental的语法)
      - [6.3.3 方法三：箭头函数](#633-方法三箭头函数)
  - [7. 条件渲染(Conditional Rendering)](#7-条件渲染conditional-rendering)
    - [7.1 方法一：`if-else`判断，返回不同的`JSX`](#71-方法一if-else判断返回不同的jsx)
    - [7.2 方法二：直接内联式地写在`JSX`中](#72-方法二直接内联式地写在jsx中)
    - [7.3 特殊：我不想渲染某个组件该怎么做？](#73-特殊我不想渲染某个组件该怎么做)
  - [8. Lists and Keys](#8-lists-and-keys)
    - [8.1 原理](#81-原理)
    - [8.2 但是为什么不建议用`index`呢？](#82-但是为什么不建议用index呢)
    - [8.3 什么是`key`？](#83-什么是key)
  - [9. Forms](#9-forms)
    - [9.1 Controlled Components](#91-controlled-components)
    - [9.2 Uncontrolled Components（React大多情况下推荐用此类组件实现Form）](#92-uncontrolled-componentsreact大多情况下推荐用此类组件实现form)
  - [10.](#10)
  - [11. 组合替代继承](#11-组合替代继承)
  - [12. React.Fragment](#12-reactfragment)
  - [13. Forwarding Refs](#13-forwarding-refs)
  - [14. HOC(Higher-Order Components)](#14-hochigher-order-components)
  - [15. Code-Splitting](#15-code-splitting)
  - [16. The Component Lifecycle](#16-the-component-lifecycle)
  - [17.JSX In Depth](#17jsx-in-depth)
  - [18. Optimizing Performance讲到了react更新的一点东西](#18-optimizing-performance讲到了react更新的一点东西)
  - [19. Render Props](#19-render-props)
  - [20. Portals](#20-portals)
  - [21. Reconciliation](#21-reconciliation)
  - [22. Hooks](#22-hooks)
    - [22.1 什么是hooks？](#221-什么是hooks)
    - [22.2 State Hook: `useState`](#222-state-hook-usestate)
    - [22.3 Effect Hook: `useEffect`](#223-effect-hook-useeffect)
      - [22.3.1 在函数组件中，我只想在**初始渲染**之后做一件事，并不想每次更新后都执行呢？](#2231-在函数组件中我只想在初始渲染之后做一件事并不想每次更新后都执行呢)
      - [22.3.2 `useLayoutEffect` vs `useEffect`](#2232-uselayouteffect-vs-useeffect)
    - [22.4 hooks的规则](#224-hooks的规则)
    - [22.5 自定义hook](#225-自定义hook)
    - [22.6 Memo Hook: `useMemo`](#226-memo-hook-usememo)
    - [22.7 Callback Hook: `useCallback`](#227-callback-hook-usecallback)
    - [22.8 Ref Hook: `useRef`](#228-ref-hook-useref)
    - [22.9 `useContext`](#229-usecontext)
    - [22.12 函数组件内使用`useState`，渲染更新逻辑是怎样的？](#2212-函数组件内使用usestate渲染更新逻辑是怎样的)
      - [postMessage](#postmessage)
      - [MessageChannel](#messagechannel)
      - [postMessage vs MessageChannel](#postmessage-vs-messagechannel)
      - [queueMicrotask](#queuemicrotask)
      - [event loop](#event-loop)
  - [23. Refs and the DOM](#23-refs-and-the-dom)
  - [24. 如何为`className`写多个值？](#24-如何为classname写多个值)
  - [25. 生命周期](#25-生命周期)
    - [25.2 父子组件的生命周期顺序是怎样的？](#252-父子组件的生命周期顺序是怎样的)
  - [26. 开发模式下，灰色的log是什么？StrictMode是什么？](#26-开发模式下灰色的log是什么strictmode是什么)
  - [Q\&A](#qa)
    - [1. ts中的`React.FC`是啥？](#1-ts中的reactfc是啥)
    - [2. 使用`FC`](#2-使用fc)
    - [3. *function component*中`useState`原理](#3-function-component中usestate原理)
    - [4. 为什么React元素只能有一个根？](#4-为什么react元素只能有一个根)
    - [5. function component vs class component](#5-function-component-vs-class-component)
    - [6. props或者state变了，发生了什么？](#6-props或者state变了发生了什么)

## 1. JSX

```jsx
const element = <h1>Hello, world!</h1>;
```

这就是JSX语法，`.jsx`是对JS的一种扩展，用于在React应用中描述UI。

最终会处理为**React元素**(React Element)，赋值给了变量`element`。

### 1.1 可以嵌入表达式

任何合法的*javascript expression*都可以嵌入到`.jsx`里的`{}`中。

```jsx
const name = 'yu hui';
const element = <h1>Hello, {name}!</h1>;

function getFirstName(name) {
  return name.substring(0, name.indexOf(' '));
}

const element2 = (
  <h1>
    Hello again, {getFirstName(name)}!
  </h1>
);
// will result in <h1>Hello again, yu!</h1>
```

**注意**:

在需要跨行书写JSX时，应当用`()`包裹一下，以避免自动的`;`被添加到行尾而导致语法错误。

### 1.2 JSX中的属性

字符串值类型，用*引号*(`'`或`"`)包裹：

```jsx
const element = <div myAttr="pretty"></div>;
```

JS表达式类型，用*花括号*(`{}`)包裹：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

> React DOM使用`camelCase`命名方式，如`class`变为`className`，`tab-index`变为`tabIndex`。

### 1.3 JSX中的用户输入部分是安全的

可以将用户输入写进JSX：

```jsx
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

**因为React在渲染之前，会将JSX中嵌入的值都进行escape(转义)。**

参见：[JSX Prevents Injection Attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks)

### 1.4 JSX其实是个语法糖

**Babel**将会对JSX编译成对`React.createElement()`的调用。

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

等价于：

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`element`就是React元素。

注意和`Component`区分，`element`是构成`Component`的要素。

## 2. 快让我们用上JSX！

说了这么多，也该用`.jsx`练手了。

### 2.1 引入React library

**React**也是一个js库而已，通过`<script>`标签加载它：

```html
  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
```

问题：React vs React DOM ?

React用于更容易地构建用户界面，它和web、浏览器没直接的耦合，
比如我们用的`component`, `classes`, `elements`就属于React js库；


React DOM则是将React和browser粘合在一起，比如我们用到的`render()`或`findDOMNode()`就属于React DOM。

### 2.2 引入babel

**Babel**用来将对`.jsx`进行语法分析，并转换为`.js`。它的存在就是为了我们用*JSX*写起来爽一点，但毕竟要运行在浏览器中，需要由它帮忙转换为`.js`。

```html
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

有了上面的babel的引入，我们可以在*type*为`type=text/babel`的`<script>`标签中书写jsx语法了。

```html
  <script type='text/babel'>
    // using JSX syntax
    const element = <h1>Hello world!</h1>;
  </script>
```

### 2.3 在HTML中使用jsx

见：[在HTML中使用jsx](./using-jsx(1)/jsx-in-script-tag-with-text-babel.html)。

### 2.4 jsx预处理器(JSX preprocessor)

前置条件：
- `npm` required

安装步骤：

    npm init -y
    npm install babel-cli@6 babel-preset-react-app@3

关于命令解释，请查看[npm学习笔记](../learn.md)。

运行JSX预处理器：

    npx babel --watch src --out-dir . --presets react-app/prod

当把`.jsx`文件丢进`src`文件夹中后，`.jsx`会被*babel*立即转换为`.js`（输出到`--out-dir`指定的目录）以支持在浏览器中运行。这玩意就是*Babel*！屌！

    --presets

这个是"预置"的意思，看文档描述似乎是babel编译时，所用到的一些插件。（可能就是辅助编译？）

### 2.5 创建typescript写React的工程

创建工程：

    npx create-react-app my-app --template typescript

启动服务：

    yarn start

打开 https://localohost:3000 查看效果。

## 3. 渲染React Element

传入`element`及所要渲染到的根元素(a root DOM node)。
```html
  const element = <h1>Hi yuhui</h1>;
  ReactDom.render(element, document.getElementById('root'));
```

React element是不可变的，一旦创建好无法修改。

### 3.1 函数组件(`function component`)和类组件(`class component`)

#### 3.1.1、定义

函数组件：接收1个参数，返回1个*React Element*。

```tsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

类组件:

```tsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### 3.1.2、区别


#### 3.1.3 函数组件

1、生命周期

见[22.3 Effect Hook: `useEffect`](###-22.3-Effect-Hook:-`useEffect`)

#### 3.1.4 类组件

```tsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

1、生命周期

|生命周期阶段|触发时机|含义|备注|
|-|-|-|-|
|componentDidMount|runs after the component output has been rendered to the DOM|`render()`返回的组件被插入到DOM中后触发|-|
|componentDidUpdate|is invoked immediately after updating occurs|更新后触发（**初始渲染时不会触发**）|-|
|componentWillUnmount|is invoked immediately before a component is unmounted and destroyed|在组件卸载/销毁之前被调用|-|
|-|-|-|-|

![React Life Cycle](pics/react-life-cycle.png)


- `componentDidMount`说插入到DOM后触发，那究竟什么算**插入DOM**呢？React是怎么知道的？

  DOM3提供了接口[DOMNodeInsertedIntoDocument<sup style='color: red'>Deprecated</sup>](https://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMNodeInsertedIntoDocument)，可以监听到有节点插入到了DOM树。

  插入到DOM树，就意味着我们可以使用类似于DOM API`document.getElementById('myNewNodeId')`来获取到这个新插入的节点了。

  DOM4中引入[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)来监听对DOM树的一系列改动。


static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

### 3.1 对于函数组件，当`props`变化时发生了什么？

### 3.2 对于函数组件，当内部`state`(通过`useState`添加的状态)变化时发生了什么？

### 3.3 对于类组件，当`props`变化时发生了什么？

### 3.4 对于类组件，当`state`变化时发生了什么？

## 4. Components和Props

### 4.1 这就是一个*React Component*

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

接受一个输入参数`props`，返回一个`React Element`，这样的函数就是一个React的***Function Component***。

> When React sees an element representing a user-defined component, it passes JSX **attributes** and **children** to this component as a single object. We call this object “`props`”.

当然，也可以用*Class*来实现：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

从`React.Component`继承，并实现`render()`方法返回一个*React Element*，那么这样的一个类`Welcome`就是React的***Class Component***。

**注意**：
- *Component*的命名必须**首字母大写**

ref: [jsx in depth](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

### 4.2 使用组件渲染

```jsx
// 定义函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 使用组件渲染
// html
<div id='root'></div>

// script
const elem = <Welcome name='yuhui' />;
ReactDOM.render(
  elem,
  document.getElementById('root'),
);
```

来看看上述是怎么工作的：
1. `Welcome`是一个*function component*，React调用这个函数组件并传参数`{ name: "yuhui" }`；

2. `Welcome`组件返回*React element*为

```html
    <h1>Hello, yuhui</h1>;
```
3. 最终ReactDOM调用`render`渲染出DOM。

### 4.3 组件也可以引用另一个组件

```jsx
function Welcome(props) {
  return <h1>hi, {props.name}</h1>;
}

// 在App组件内引用另一个组件Welcome
function App() {
  return (
    <div>
      <Welcome name='yuhui' />
      <Welcome name='yunhui' />
      <Welcome name='xiaohan' />
    </div>
  );
}

// 渲染App
<div id='root'></div>

const elem = <App />
ReactDOM.render(
  elem,
  document.getElementById('root'),
);

```

### 4.4 `props` are Read-Only

什么是*pure function*?

不修改输入参数的函数，而且对于相同的参数，都返回相同的结果，这种函数就叫做**纯函数**(*pure function*)。

比如`sum`就是一个*pure function*。

```js
function sum(a, b) {
  return a + b;
}
```

相对地，以下就是*impure function*：

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

因为它修改了入参*account*。

***所有React组件都应该是pure function***。

## 5. 使用`setState`来更新DOM

### 5.1 一个错误的例子

我们知道，

> React elements are **immutable**. Once you create an element, you can’t change its children or attributes. 

所以这样写是不能更新`<clock>`的：

```jsx
// 定义clock
function Clock(props) {
  let timeString = new Date().toLocaleTimeString();
  setInterval(() => {
    timeString = new Date().toLocaleTimeString();
  }, 1000);

  return (
    <div>
      <h2>It is {timeString}.</h2>
    </div>
  );
}

// 渲染
<div id='root'></div>

const clockElem = <Clock />;

// 在这里，clockElem被创建好后，就是Immutable！所以即使修改了其内部变量，也不会更新这个React Element
ReactDOM.render(
  clockElem,
  document.getElementById('root'),
);
```

要做到类似于如下使用`<Clock>`的方式：

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root'),
);
```

我们需要引入**state**到`Clock组件`。

### 5.2 `state`来了！

`state`类似于`props`，不过它是属于组件内部私有的(*private*)，只能由组件本身来控制。

#### 5.2.1 将function component转换为class component

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock date={new Date()} />,
  document.getElementById('root'),
);
```

每次更新组件时，都会调用`render()`方法，但是如果我们只是将`<Clock />`渲染到**同一个DOM节点**，那么一直都是用的同一个类实例。

> The render method will be called each time an update happens, but as long as we render `<Clock />` into the same DOM node, only a single instance of the Clock class will be used

OK，那怎么让组件内部自己去触发更新呢？

两种方式：

1. 为类组件添加*local state*
2. 为类组件添加*lifecycle methods*

#### 5.2.2 添加local state

为类添加一个成员变量`state`，不再依赖外部传入的`props`，改用`state`代替：

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这时只会渲染一个时刻，怎么让*state*变化呢？

**引入生命周期lifecycle**来试试。

#### 5.2.3 添加lifecycle methods

向React Component类添加如下两个成员方法。

```jsx
  componentDidMount() {
    this.timerID = setInterval(() => {
      // 这里如何更新state呢？
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.timerID = 0;
  }
```

当组件被**首次**渲染到DOM上时，触发***mount***，即钩子函数*componentDidMount*会被执行；

当组件被从DOM上移除时，触发***unmount***，即钩子函数*componentWillUnmount*会被执行。

**TODO: 看下源码，生命周期的准确触发时刻。**

#### 5.2.4 关键的更新操作：`setState`

```jsx
  componentDidMount() {
    this.timerID = setInterval(() => {
      // 更新state
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }
```

整个流程：

1. `<Clock />`传入`ReactDOM.render()`后，会开始实例化一个`<Clock />`；
  
2. React调用`React.Component::render()`方法（这里其实就是**React针对接口编程，调用由子类实现父类中定义的`render()`方法来获取到用于渲染的*React Element***），即会调用`<Clock />`的`render()`方法，得到*React Element*;

3. React将上一步得到的元素渲染到界面上；

4. 当如上元素被插入到DOM后，React内部调用生命周期钩子函数，使得`Clock::componentDidMount()`被调用，从而我们的定时器开始启动；

5. 而后每过1s，通过`setState`方法来触发更新UI的请求，React发现`state`发生了改变，则再次调用子类实现的`render()`方法获取新的要渲染的内容。此时React内部对比前后渲染内容的差异(diff)，最后将diff应用到当前真实DOM上，以完成视图的更新。

总结：

从上面可见，这里可以感觉到React用到了设计模式中的*针对接口编程*（`render`)、*模板模式*（生命周期钩子函数其实就是模板的一种应用），以及常提到的**虚拟DOM**、diff算法。

### 5.3 关于`state`的注意点

1. 不能直接修改`state`变量，可以直接修改`state`的时机只能在`ctor`(*constructor*)里

```js
// correct
constructor() {
  this.state = {
    name: 'yuhui',
    age: 29,
    favor: 'unknown',
  };

  this.state.gender = 'male';
}

someMethod() {
  // wrong
  this.state.favor = 'xiaohan';

  // correct
  this.setState({
    favor: 'xiaohan',
  });
}
```

Q: 咦，那我想动态地给`state`新增一个属性呢？像这样：

```js
somethingHappened() {
  this.setState({
    isTired: true,
  });
}
```

A: 感觉我们应当遵守一个规则，即将渲染需要的属性都提前在`ctor`中声明好。另外，如果动态地新增一个并没有用于`render()`的属性的话，这个`setState`其实也没意义。

**TODO: 看看源码，`setState`一个新的属性会怎样？**

2. `setState`是异步的，可能会将多个更新合并成一个以提升性能

假设本次更新`state`需要依赖之前的状态，则

```js
// wrong, 因为此时state并不一定已经更新了，有可能还是更早之前的值。
this.setState({
  counter: this.state.counter + 1,
});

// correct
this.setState((prevState, props) => (
    { prevState.counter + 1 }
  ) 
);
```

`setState`提供了另一种形式来更新`state`，`prevState`自不必说，就是上一个状态；而`props`是**此时此刻的`props`**。

怎么理解呢？

![图片](./pics/react-setState-async.png)

四个正方形代表4个更新时刻，当第二次尚未完成时，这时第三次的更新**直接从`state`取值**就会导致仍然拿到的是1，而不是第二次更新的结果（因为`setState`内部应该(?)会搞个队列等时间到了再将队列中的更新任务合并成一次更新任务）。

而`props`虽然是构造函数传入的，但是如果外部通过`ReactDOM.render()`再次渲染，即间接地调用了我的`render()`方法，那么`props`还是会根据传入的值变化的。

3. `state`的更新是"合并式"更新(merged)

即在用`setState`设置`state`中的某些属性时，只会修改本次set的属性。

（中文真不好描述）

> your state may contain several independent variables(like `posts`, `comments`), then you can update them independently with separate `setState()`, **so `this.setState({comments: newComments})` leaves `this.state.posts` intact**, and vice versa.

```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

foo() {
  const newComments = []; // some new comments

  this.setState({
    comments: newComments,
  })
}

bar() {
  const newPosts = []; // some new posts

  this.setState({
    posts: newPosts,
  })
}
```

## 6. Handling Events

### 6.1 定义一个事件
react事件使用*camelCase*命名(e.g `onClick`)

```jsx
function clickHandler1(e) {
  // e就是Event
}

function clickHandler2(e) {
  // e就是Event
}

function clickHandler3(e, item) {
  // e就是Event
}

// 多种写法
<button onClick={clickHandler1} />
<button onClick={(e) => clickHandler2(e)}>
<button data={item} onClick={(e) => clickHandler3(e, item)}>
```

### 6.2 在事件处理函数中，阻止默认行为
在HTML中：

```html
<a href='#' onclick="console.log('clicked, but wont follow'); return false">
```

在React中必须调用`e.preventDefault()`：

```jsx
function handleClick(e) {
  e.preventDefault();
}

<a href='#' onClick={handleClick}>
```

### 6.3 注意`this`的绑定

#### 6.3.1 方法一：在构造函数中`bind`

```jsx
class LoggingButton extends React.Component {
  text = 'hello';
  constructor() {
    this.handleClick.bind(this); // 用bind绑定，那么以后执行handleClick函数时，this就固定指向了当前类实例
  }
  handleClick() {
    console.log('this is:', this.text);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click me</button> // 已经是bind过了的函数
    );
  }
}
```

当然也可以在`jsx`直接`bind`：
```jsx
  onClick={this.HandlerFunc.bind(this, arg1, arg2...)}
```

#### 6.3.2 方法二：一种实验性(*experimental*)的语法

```jsx
class LoggingButton extends React.Component {
  text = 'hello'; // 成员变量
  handleClick = () => { // 绑定了this的成员函数
    console.log('this is:', this.text); // this已绑定为当前类实例
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}
```

https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

语法：
```js
class Bork {
  //Property initializer syntax
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty; // 这里的this就已经绑定为类实例了
  };

  //Static class properties
  static staticProperty = "babelIsCool";
  static staticFunction = function() {
    return Bork.staticProperty;
  };
}
```

#### 6.3.3 方法三：箭头函数

注意！箭头函数带来一个问题是，每当这个组件被渲染时，都会创建一个新的回调函数。

虽然这个回调函数做的事情都一样，但是每每创建的函数，其**并不相等**。

大多数情况都OK，不过呢，如果这个函数会通过`props`传给孩子节点，那么每当本组件渲染，都会触发孩子节点去渲染（因为新建了回调函数呀，相当于给孩子节点的`props`改变了，所以触发孩子也重新渲染），性能不利。

```jsx
class LoggingButton extends React.Component {
  text = 'hello';
  handleClick() {
    console.log('this is:', this.text);
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

6.1 子组件中触发了一个事件，怎么抛给父组件，让父组件处理具体的业务逻辑？

## 7. 条件渲染(Conditional Rendering)

我想要当`isLoggedIn`为`true`时渲染`<Logout />`，当为`false`时渲染`<Login />`，就要用到条件渲染。

### 7.1 方法一：`if-else`判断，返回不同的`JSX`

```jsx
// 在类组件的render方法中：
render() {
  if (isLoggedIn) {
    return <Logout />;
  } else {
    return <Login />
  }
}
```

### 7.2 方法二：直接内联式地写在`JSX`中

需要用`{}`包裹条件表达式：

```jsx
render() {
  return (
    { isBirthday && <HappyBirthday /> }
    { isWeekend ? <HappyWeekend /> : <HardWorking /> }
  );
}
```

以上仅当`isBirthday`为`true`时，才会渲染`<HappyBirthday />`；为`false`时React直接跳过这句表达式。

因为在js中，
```js
    true && expr // => expr    
    false && expr // => false
```
如果为真，则react输出`expr`；否则react忽略并跳过该表达式。

### 7.3 特殊：我不想渲染某个组件该怎么做？

A组件用到了一个子组件B，我需要控制B的显隐。

可以用上面的**条件渲染**来做，另一种方法也可以让组件B根据情况，**在本应该return一个render output的地方**`return null`来跳过渲染。

```jsx
// function component B
function ComponentB(props) {
  if (!props.isShow) {
    return null; // 在这里return null
  }
}

// (function/class)component A
showB = false;
return (
  <ComponentB isShow={showB}/> // 如果showB为false，则这里不会被渲染
);
```

**注意：函数组件直接return null，而类组件是没办法的哦。因为它的类组件生命周期仍然会触发的）**。

## 8. Lists and Keys

建议为list中每一个item的属性`key`赋值，但不建议用*index*。

因为重新打乱顺序后item的*index*会变，导致非预期的行为(unexpected results)。

### 8.1 原理

React对比渲染前后的两棵树，对原节点A及新节点A'的children进行对比时，是按顺序对比的：

    A  -> A1-A2
    A' -> A1-A2-A3

React发现A3是新增的，只需要渲染A3作为A的孩子即可。

但如果是

    A  -> A1-A2
    A' -> A0-A1-A2

没有`key`的话，React默认比较发现

    A0 != A1
    A1 != A2
    A2 is a new node

即，*A1变为A0，A2变为A1，新增一个A2*。而实际上**只是A0作为新增的节点插入到开头**。

如果采用这样的默认对比机制的话，性能就不好。

正因为如此，React支持将*节点*（一般都是`<li>`等列表类的，children多的）标记上`key`属性。React将会用`key`来做比较。

发现A1、A2对应的key相同，只有A0是新增的，渲染的性能会提高很多。

### 8.2 但是为什么不建议用`index`呢？

如果对列表进行重新排序，只是改变了元素的顺序，而`key`用的是**index**，也就是说**新旧两棵树孩子节点对应的`key`还是相同的**，React认为没有变化。

### 8.3 什么是`key`？

> A `key` is a special *string attribute* you need to include when creating lists of elements. 
>
> We don’t recommend using *indexes* for keys if the order of items may change. This can negatively impact performance and may cause issues with component state.

另外，`key`属性是React用来**标记item**的，并不会传给component。

如果component需要这个值，就用另一个属性传递吧，如

```html
<Post key={post.id} somekey={post.id} title={post.title} />
```

则`Post`这个component就可以读到`props.id`，但读不到`props.key`的。

## 9. Forms

### 9.1 Controlled Components

组件的表现是由React的`state`来确定的，比如用户在`<input>`中输入的内容，我们通过为`<input>`绑定一个`onInput`事件来更新组件的`state`：

```jsx
// e.g in a class component
handleChange(event) {
  this.setState({value: event.target.value});
}

render() {
  return  (
    <input type='text' value={this.state.value} onInput={this.handleInput} />
  );
}
```

这样一来，用户输入的内容会更新`state`，而`state`又会决定组件的渲染。

> ***making the React state be the single source of truth***

组件的值和React component状态绑定，也即要为每个controlled component写event handler。

`input`、`select`等依赖用户输入的，需要设置事件将输入反应到react component的内部状态*state*中。即每当用户输入时，*state*都更新与输入一致。（p.s 这里类似于*Vue*中的双向绑定v-model）

`<select>`通过在标签上增加`value`属性来设置选中的元素。

也可以为`value`赋值一个*数组*，这样会多选：

```html
<select multiple={true} value={['A', 'B']}>
```

`<input>`，设置`value`非*null*、*undefine*时，React会将`<input>`当做只读的；`defaultValue`表示默认值。

*Fully-Fledged Solutions: Formik，用于表单验证、跟踪visited fields、处理表单提交的一个插件。

### 9.2 Uncontrolled Components（React大多情况下推荐用此类组件实现Form）

> ***keeps the source of truth in the DOM***

**通过`Refs`来访问DOM节点和React元素。**(参考：[Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs))

`Refs`通常在React Class Component的`.ctor`中初始化：

```js
// in constructor function
this.myRef = React.createRef();
```

并通过React元素的`ref`属性来关联起来：

```html
<!-- in jsx -->
<div ref={this.myRef} />
```

可通过`ref`的*current*属性来访问节点：
- 对于原生HTML元素使用`ref`，则`current`表示**底层DOM元素**
- 对于自定义的React类组件，则`current`表示**已挂载的类实例**

***ref属性只能用在HTML元素或自定义类组件，而不能用在函数组件上！***

> You may not use the `ref` attribute on *function components* because they don’t have instances

React在组件**挂载时**会将DOM元素对象赋值给`current`属性；在**卸载时**将赋值为*null*。

`ref`属性的更新是在`componentDidMount`或`componentDidUpdate`生命周期方法之前。

- Exposing DOM Refs to Parent Components（某些情况下，你想在父组件中访问子DOM节点）

  React 16.3+建议使用*ref forwarding*，即让组件选择将任何子组件的`ref`暴露给自己，以提供access。

- Callback Refs
  
  比如我们需要拿到一个list的每个item的DOM，这明显需要多个refs，之前的做法都是一个ref。
  此时可以给ref传一个函数，这种ref就叫做callback ref。当react每当要更新ref时，都会调用这个函数，并传入一个DOM Node作为参数。
  React保证在componentDidMount、componentDidUpdate事件触发前，refs已更新。


> ***Caveats with callback refs: Better do NOT define the callback as inline function***

不要将`callback refs`的回调函数定义为*内联函数*，因为每次render都会创建一个函数的实例，所以React会调用两次，第一次给callback传null，第二次才是DOM元素。

什么时候callback ref会被执行？即这个函数什么时候执行的？
每次render后会调用之前的cleanup（入参为null），再调当前的setup（入参为DOM Node）
![1](./pics/ref.png)

## 10. 

## 11. 组合替代继承

JSX tag中的内容可作为一个特殊属性`children`传递给该component。

```html
<FancyBorder>
    /* some content */
</FancyBorder>
```

在*FancyBorder*组件中，

```js
return <div> {props.children} </div>
```

这样*some content*作为`props.children`插入到div中，这些位置即***slots***。

## 12. React.Fragment

## 13. Forwarding Refs

先来看区别：

ref/React.forwardRef, React.createRef/React.useRef, useImperativeHandle

`ref`是基础，用于方便地引用到DOM节点、React组件实例，以便做一些React本身不能做的事情，如focus、scroll，只要不影响React内部state就可以做。
`React.forwardRef`只是用于包裹，把ref传递下去；

这俩都返回一个普通的js对象，但所用作用域不同；
`React.createRef`可以用在全局作用域，或者类组件构造函数内，因为它没有缓存机制，仅仅是帮你新建了一个对象而已；（后面有源码一看你就懂）
`React.useRef`它**只能**用于函数组件内（因为像`useState`一样有缓存）；

`useImperativeHandle`也是配合*ref*用的，*ref*暴露出去的属性太多，用它可以自定义暴露哪些东西（比如不暴露DOM节点，而是暴露几个方法就行）。

---

再来讲细节。

从`ref`开始说起。

比如React里要给`<input />`设置focus，只能通过DOM API来操作，*ref*这就派上用场了。

```tsx
import React, { useRef } from 'react';

export default function CustomInput() {
  // 错误！没有给类型，默认为never。ts提示ref.current可能不存在focus方法
  // const ref = useRef(null);

  // 可以！
  const ref = useRef<HTMLInputElement>(null);

  // 或者给个any类型
  // const ref = useRef<any>(null);

  const foucsInput = () => {
    if (ref.current) { // 不然ts提示ref.current可能为空
      ref.current.focus();
    }
  };
  return (<div>
    <input type="text" ref={ref} />
    <button onClick={foucsInput}>focus input</button>
  </div>
  );
}
```

> `ref`属性只能用在DOM节点、类组件、用React.forwardRef包裹后的函数组件上。

Q1：为什么*ref*可用于类组件，而不能用于函数组件？

A1：类组件创建一个实例后，*ref*引用的就是这个实例对象，这样就可以调用类上的成员方法了；而函数组件没有实例，渲染的时候是再重新执行一遍函数，没有实例的概念。因此*ref*引用不了。

接着来看`React.forwardRef`。我们可以将ref添加到DOM上，但无法直接添加到React组件上。因为React默认不会将代表组件的DOM Node赋值给传入的ref。（直接加就被认为是prop，并不是具备ref的意义），为了能让React组件也能接受ref，以便组件通过这个ref把其内的DOM Node暴露给父组件，那么就需要把这个函数组件用forwardRef包以下。这样React会认为此组件opt-in了这个ref的feature，传入的ref会最终会被设置为DOM Node。

使用`React.forwardRef`创建一个组件，接收父组件传来的`ref`，继续向下传递给子组件。相当于是一个hoc，包裹子组件，决定了ref传给谁。

`React.forwardRef`的参数是一个`render`函数，这个render函数第2个参数为`ref`，即可通过这个`ref`关联到某个子组件或DOM节点。

```tsx
/* 子组件 ChildComponent.tsx */
import React from 'react';

function ChildComponent(props) {
  const {
    forwardedRef,
  } = props;
  return <input type='text' ref={forwardedRef} />
}

// 用forwardRef包裹后导出
const WrappedChildComponent = React.forwardRef((props, ref) => {
  // 把ref通过子组件的prop传进去
  return <ChildComponent {...props} forwardedRef={ref} />
});

export default WrappedChildComponent;

/* 父组件 ParentComponent.tsx */
import React, { useRef } from 'react';
import Child from './ChildComponent';

// const myRef = React.createRef();
function ParentComponent() {
  const myRef = useRef(); // 返回一个对象 { current: null }
  return <Child ref={myRef} />
}
```

`React.forwardRef`的源码：

```ts
function forwardRef<Props, ElementType: React$ElementType>(
  render: (props: Props, ref: React$Ref<ElementType>) => React$Node,
) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
}
```

> 注意：只有用`React.forwardRef`包裹时，`render`方法的第二个参数才有`ref`。

比如这样是错的，`ref`只是当作一个普通的prop传进去了：
```ts
function Child() {
  return <input type='text' />;
}

function Parent() {
  // 错误！ref仅仅是一个普通属性，因为Child是一个普通的函数组件
  return <Child ref={ref} />;
}
```

来看看`useImperativeHandle`。

函数签名：
```ts
useImperativeHandle<T>(
  ref: { current: T | null } | null | void,
  createHandle: () => T,
  deps: Array<any> | null | void,
): void
```

重点是*createHandle*，它是一个函数，返回值将给赋值给`ref.current`。

```tsx
// child
import React, { useRef, useImperativeHandle } from 'react';

function MyInput(props: any) {
  const ref = useRef<HTMLInputElement>(null);
  const {
    forwardedRef, // 接收父组件传下来的ref
  } = props;

  // 子组件只暴露focus方法，不暴露DOM节点
  useImperativeHandle(forwardedRef, () => {
    return {
      focus: () => {
        if (ref.current) {
          ref.current.focus();
        }
      },
    };
  });

  return <input type='text' ref={ref} />
}

export default React.forwardRef((props, ref) => {
  return <MyInput {...props} forwardedRef={ref} />
});
```

```tsx
// parent
import React, { useRef } from 'react';
import Child from './child';

function Parent() {
  const ref = useRef<any>(null);
  const focusInput = () => {
    console.log(ref.current);
    ref.current?.focus(); // 注意！此时的ref.current只是一个普通的对象，而不再是DOM节点了
  };
  return (<div>
    <Child ref={ref} />
    <button onClick={focusInput}>focus input(useImperativeHandle)</button>
  </div>
  );
}

export default Parent;
```



## 14. HOC(Higher-Order Components)
HOC是一个*接受一个component作为参数、并返回一个新的component*的函数。

HOC并不属于React API，而是在React第三方库中很常见，如*Redux*的`connect`函数。

## 15. Code-Splitting
把多个文件打包合并成1个文件，最终这个文件叫做"`bundle`"。

那对于初始状态不需要加载的，可以应用*lazy load*。[dynamic import()][React.lazy][React组件: Suspense]

## 16. The Component Lifecycle
当new一个新的react component实例插入到DOM中时：
Mounting：constructor -> render -> componentDidMount

当props或state改变时：
Updating: shouldComponentUpdate -> render -> componentDidUpdate

当组件被移出DOM时：
Unmounting: componentWillUnmount

-constructor
在React中ctor就2个目的：为this.state初始化；binding event handler methods to an instance（即赋值事件处理函数前的绑定，将调用时的this指向当前react component对象实例）
不能在ctor中调用setState()，而是应该直接为this.state初始化，除ctor之外只能用setState赋值（否则会造成数据不一致）

## 17.JSX In Depth
JSX实质就是React.createElement(...)的语法糖，写起来更方便而已。
-自定义的组件首字母必须大写，否则React会当做built-in html tag
-导出多个组件的场景，可以用'.'语法来使用具体的某个组件：<MyComponents.DatePicker />
-需要在运行时决定组件类型的场景，JSX type不能是一个表达式，但可以是一个首字母大写的变量：
  [wrong]<components[type] />
  [correct]const SpecificComponent = components[type]; 
              <SpecificComponent />
-{}中可以书写js表达式，但注意if、for语句并不属于js表达式，所以不能写在{}里面
-可以给prop赋值一个string字面量，两种方式：prop='hi&lt;3'或prop={'hi<3'}. (When you pass a string literal, its value is HTML-unescaped.)
-If you pass no value for a prop, it defaults to true: <MyComponent prop/>等价于<MyComponent prop={true}/>
-当需要把一个对象传给组件props时，可以用spread attributes方式：var myprops = {a:1,b:2,c:3}; <Greeting {...myprops}/>
-render()也可以返回一个元素数组，此时就不用wrap，直接返回数组即可：return [<li key='A'>item1</li>, ...];
-map: 在原数组的每个元素上调用给定callback，然后返回一个新组成的数组: var newarr = oldarr.map(callback[, thisArg]);
callback(currentValue[, index[, array]]). thisArg如果给定，则会作为callback中的this；否则是undefined。注意：map只会调用那些有index的元素，等细节自己看MDN。
-should do vs should be doing：should be doing更强调在说话的那个语境应该做的。
-{js表达式}也可以作为JSX的children：<ul>{todos.map(msg => <Item key={msg} message={msg} />)}</ul>
-funciton as children:，通过props.children可以传任何类型的数据，如传函数（这里是个箭头函数）：
function Repeat(props){
  let items = [];
  for (let i = 0; i < props.numTimes; i++){
    items.push(props.children(i));//注意，这里props.children是一个箭头函数，而且返回值是一个component
  }
  return <div>{items}</div>;//不能写<div>items</div>，它本身就是个JSX形式的component，内部孩子可以是任何类型，如果要展开一个component数组，就要用{}包起来。
}
<Repeat numTimes={10}>
  { index => <div key={index}>This is item {index} in the list</div> }
</Repeat>
-Booleans, null, undefined, are ignored: 全都输出相同<div />, <div></div>, <div>{false}</div>, <div>{true}</div>...
-这样在条件渲染时就很方便了：<div>{timeIsUp && <Fire />}</div>，那么只有当timeIsUp为真时，才会渲染<Fire/>。但要注意，某些falsy value对于React来说是会渲染的，如0：<div>{items.length && <Buy />}</div>。如果确实想输出false, true, null, undefined，那可以将它转为string再输出：<div>This is boolean value {String(myBooleanVar)}</div>。
MDN: String is more reliable than toString(), as it works even on null, undefined, and on symbols.

## 18. Optimizing Performance讲到了react更新的一点东西
shouldComponentUpdate return false，则根本就不调用render了；否则，React调用render并对比Vitrual DOM，如果一样则不更新DOM。
-Array.prototype.concat：按给定参数顺序合并到一个新的数组，执行shallow copy

## 19. Render Props

ref: https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent

用处：在组件内动态地渲染一些内容，这些内容正好要依赖于组件内部的状态。

做法：给组件传递一个函数，这个函数可以接收组件内的状态作为参数，并返回一个React Element，组件就可以将返回的这个元素进行渲染。

例子：

```tsx
// 组件
function Mouse(props) {
  // 假设我们已经有了坐标(x, y): state = { x: xx, y: xx }
  const state = { x: 5, y: 6};
  return (
    <div>
      { /* 这里渲染动态传入的内容 */ }
      { props.render(state) }
    </div>
  );
}

// 这个组件依赖于Mouse组件内部的状态
function Cat(props) {
  const { x, y } = props; // 依赖x,y的传入
  return <img style={ left: x, top: y } src='cat.png' />
}

// 这里给<Mouse>组件传入的`render`属性就是'render props'
ReactDOM.render(
  someContainerElement,
  <Mouse render={(state) => <Cat x={state.x} y={state.y} />} />,
);
```

> A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

总结：

*render prop*是一个函数，该函数作为一个特殊的'render'属性（**当然了，你叫任何名字都是可以的，只要符合`render props`的规则就行**）传给另一个组件，这个组件使用该函数的返回结果来渲染。

`React.PureComponent`和`React.Component`类似，区别在于React.Component没有实现shouldComponentUpdate()，而React.PureComponent实现了它，（浅比较）implements it with a shallow prop and state comparison。

当然了从React.Component继承实现自己的组件，也可以自行实现shouldComponentUpdate()，如果数据是简单地比较，那完全可以从PureComponent继承，省去自己实现的麻烦~[href=https://reactjs.org/docs/optimizing-performance.html]

## 20. Portals
一般情况下render返回的React element或component会被挂在使用它的地方，如<ParentComponent><ChildComponent/><ParentComponent/>。ChildComponent的render返回结果将会挂在Parent内使用到它的地方。但有时虽然在这里写的，但想把ChildComponent挂在别处，如DOM中其它某一节点下，这里实际上就不想让React渲染任何东西。此时Portals就出现了~this is how Portals comes into...
修改ChildComponent的render，返回值如这种写法即可：
return ReactDOM.createPortal(this.props.children, domNode)或
return ReactDOM.createPortal(<h1>hi there</h1>, domNode)

## 21. Reconciliation


## 22. Hooks

> React v16.8+ required

### 22.1 什么是hooks？

当我们希望在React内部某些特定状态下做一些事情的时候，比如节点挂载完成时(`componentDidMount`)，我们可以这么做的原因是React提供了*钩子函数*，当它内部到达此状态时会调用*钩子函数*，而钩子函数的具体实现可以由*Client Code*来完成（**可参考《Head-First》的模板模式）**。

***Hooks只在function components中可用，不能在Class Components中使用***。

### 22.2 State Hook: `useState`

`useState`是一个Hook，它为函数组件(*function component*)添加局部状态。

它和类组件中的`setState`类似，但是它**不会合并state**。

```jsx
const { useState } = React; // 注意，React得保证导入到scope中

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

给`useState`传入一个初始状态值*initial state*，这里`count`就是我们的状态变量。`setCount`是用于更新它的函数。

如果我们还有状态需要保存，那就再类似地写一次`useState`：

```js
const [count, setCount] = useState(0);
const [fruit, setFruit] = useState('apple');
const [todo, setTodo] = useState(
  [
    { name: 'clean room', timeCost: 2, isDone: false },
    { name: 'exercise', timeCost: 1, isDone: false },
  ]
);

function onCleanRoomDone() {
  // 需要修改todo中的第一项，我们必须整个todo来替换，而不要仅修改一项
  
  const cleanRoom = todo[0];
  cleanRoom.isDone = true;
  setTodo(todo); // 整个todo替换state，因为useState不能像Class Components中this.setState那样merge。
}
```

**`useState`可以在函数组件的多次更新间保留状态。**

> This is a way to “preserve” some values between the function calls

### 22.3 Effect Hook: `useEffect`

**用处**：当你想在DOM更新完成后做点什么时，就可以用它。

*side effects*, short for ***effects***.

传给`useEffect`的那个函数，就叫做*effect*，就是说我们希望在render完成之后做点事情，这个事情被赋予*effect*的代名词。

而`useEffect`传入的函数，它可以返回一个函数，这个函数就叫做*cleanup function*，意味着**每次effect运行前，都会调用cleanup函数**（即不仅会在*unmounted*调用，也会**每次render**时）。

**意义：将原本分散在生命周期钩子中的代码，集中于一处管理。**

总结：

- 传入的函数参数，函数体相当于在`componentDidMount`、`componentDidUpdate`后执行
- 传入的函数参数返回的函数，将会在`componentUnmount`执行

比如有时你希望每次渲染完成之后（`render()`不行，因为这个太早，我们需要**在渲染完成之后**），都做一些操作，如修改一下浏览器的`title`。在***function components***中，React提供了`useEffect`以来实现：

```jsx
const { useEffect } = React; // 注意，React得保证导入到scope中

// Similar to componentDidMount and componentDidUpdate in Class:
useEffect(() => {
  // Update the document title using the browser API
  document.title = `You clicked ${count} times`;
});
```

这意味着，**每当React更新了组件后，就运行作为参数传入`userEffect`的函数**。

再比如，我们有一对操作**订阅**、**注销**，希望在更新DOM后订阅、组件卸载后**注销**。

那么在*Class Component*中我们想到用生命周期来实现：

```js
// in class

// 订阅，首次挂载执行
componentDidMount() {
  // do subscribe
}

// 非首次，更新时执行
componentDidUpdate() {
  // do nothing
}

// 注销
componentWillUnmount() {
  // do unsubscribe
}
```

但在*function component*中怎么做呢？

可以为`useEffect`传入一个**返回一个cleanup函数**的函数）：

```jsx
useEffect(() => {
  // do subscribe

  // 返回的这个函数就被React当做是"cleanup function"
  return () => {
    // do unsubscribe
  };
});
```

这样的话，**当组件被卸载(*unmount*)时，这个*cleanup function*就会被调用**。

当然，下一次再渲染组件完成后（相当于重新走一遍全新的生命周期），`useEffect`又会被调用。

**注意：**

函数组件(*function component*)一旦渲染便是*immutable*，即这个实例不可被修改。

因此当需要再次渲染这个函数组件时，React会先将它从DOM树卸载、而后再重新实例化一个并挂载到DOM上。

比如对以下代码，

```jsx
const { useState, useEffect } = React;

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`updated in useEffect: ${count}`);
    return () => {
      console.log(`unmounted in useEffect: ${count}`);
    };
  });

  function onBtnClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={onBtnClick}>You have clicked {count} times</button>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```

渲染完成后，点击2次button后的输出结果：
```js
updated in useEffect: 0 // 首次渲染函数组件完成
unmounted in useEffect: 0 // 第一次点击button，首先触发函数组件卸载
updated in useEffect: 1 // 其次React开始生成一个新的函数组件实例，使得新的函数组件被挂载，状态保持并更新到了1
unmounted in useEffect: 1 // 第二次点击button，类似于上述逻辑...
updated in useEffect: 2 // ...
```

**注意：**

上述例子中函数组件更新的，是由于内部`state`发生变化（点击组件内的`<button>`出发了`state.count`自增导致。

而如果函数组件的`props`发生变化，也会触发函数组件的重新渲染。

> By default, React runs the effects after every render — including the first render.  
> The Effect Hook, ***useEffect***, adds the ability to perform side effects from a function component. It serves the same purpose as *componentDidMount*, *componentDidUpdate*, and *componentWillUnmount* in React classes, but unified into a single API

#### 22.3.1 在函数组件中，我只想在**初始渲染**之后做一件事，并不想每次更新后都执行呢？

```tsx
// 标准方法
useEffect(() => {
  // only run once
}, []);

// 语义化的写法
const useMountEffect = (func) => useEffect(func, []);
useMountEffect(() => {
  // only run once
});
```

为什么呢？

`useEffect`在**第一次渲染**后会执行callback，并且在每次更新DOM后也会执行callback。

但是如果给`useEffect`提供了第二个参数，React除了第一次渲染后调用callback，也会在数组中任意一个元素发生改变时调用callback。

那么给一个空数组，就表示没变化，所以只会在第一次渲染后调用。

> useEffect runs by default after every render of the component (thus causing an effect).
> 
> When placing useEffect in your component you tell React you want to run the callback as an effect. React will run the effect after rendering and after performing the DOM updates.
> 
> If you pass only a callback - the callback will run after each render.
> 
> If passing a second argument (array), React will run the callback after the first render and every time one of the elements in the array is changed. for example when placing   
> `useEffect(() => console.log('hello'), [someVar, someOtherVar])`  
> the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.
> 
> By passing the second argument an empty array, React will compare after each render the array and will see nothing was changed, thus calling the callback only after the first render.

#### 22.3.2 `useLayoutEffect` vs `useEffect`

useEffect是在paint之后执行；

useLayoutEffect是在pait之前。


- `useLayoutEffect`: If you need to mutate the DOM and/or do need to perform measurements
- `useEffect`: If you don't need to interact with the DOM at all or your DOM changes are unobservable (seriously, most of the time you should use this).

![useLayoutEffect](pics/uselayout.png)

### 22.4 hooks的规则

就两点，
- 只在顶部作用域(*top-level*)调用，不能有条件式的调用，以保证每次函数组件渲染时，hooks执行的顺序都是一致的
- 只在*function component*、或者自定义hooks中调用

Q1. 为什么只能在*top-level*调用？

hooks依赖于调用的顺序，每次渲染时，调用hooks的顺序都应该是一样的。

为什么呢？



### 22.5 自定义hook



### 22.6 Memo Hook: `useMemo`

目的：开销大的函数，可以将其缓存，以避免每次render时都要重新计算。

***memoize***: To store (the result of a computation) so that it can be subsequently retrieved without repeating the computation

语法：

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo`返回一个被缓存起来的值，只有当后续`a`或`b`发生变化时，`useMemo`才会重新计算这个值。

如果依赖是一个空数组，则每次render时都会执行。

传给`userMemo`的函数（第一个参数）在*rendering*阶段运行。

首次执行时（实际调用`mountMemo`），在memo这个hook上缓存了value和deps，像这样：

```ts
hook.memoizedState = [prevValue, prevDeps];
```

`useMemo`将计算的值返回。

后续执行时（实际调用`updateMemo`），会先判断上一次的`prevDeps`和当前的`deps`是否***相同***，如果相同则返回`prevValue`，无需计算，不同则需要重新计算。

***相同***：内部使用`Object.is` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来判断是否相同。

### 22.7 Callback Hook: `useCallback`

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

其实上述等价于`userMemo`的另一种形式——记忆一个*函数*：

```js
const memoizedCallback = useMemo(
  () => {
    return () => {
      doSomething(a, b);
    }
  },
  [a, b],
);
```

即第一个参数是一个函数，它这次返回一个**函数**，而不是**value**了。

`useCallback`可以用`useMemo`来表达，以下两者是等价的：

```js
useCallback(fn, deps)
useMemo(() => fn, deps)
```

### 22.8 Ref Hook: `useRef`

> `useRef`不会触发rerender，因为只是相当于改了这个plain object，不会调react渲染相关的函数

`useRef`返回一个可修改的对象，它的`current`属性被初始化为传入的值。

```js 
const myRef = useRef(5);
myRef.current === 5; // true
```

返回的这个对象*myRef*将在整个组件的生命周期中存活。

**它类似于类中的成员变量。**

当为react组件/DOM元素设置`ref`属性后，只要节点发生改变，React都会设置`current`属性为对应的DOM元素。

和`{ current: xxx }`的区别？`useRef`所创建的对象会保持不变，每当重新渲染时，`useRef`所创建的对象引用都是一样的。而*plain javascript object*则每次都会不一样。

### 22.9 `useContext`


```tsx
import React, { useContext } from 'react';

const theme = {
  foreground: "#000000",
  background: "#eeeeee",
};

const myContext = React.createContext(theme);

function ChildComponent() {
  const ctx = useContext(myContext);
  // ctx is theme
}
```

但如果`myContext`改变了，没办法触发*ChildComponent*重新渲染。为了触发它渲染，可以通过渲染它的外层节点来间接触发。

```diff
import React, { useContext } from 'react';

const theme = {
  foreground: "#000000",
  background: "#eeeeee",
};

const myContext = React.createContext(theme);

function ChildComponent() {
  const ctx = useContext(myContext);
  // ctx is theme
}

+ <myContext.Provider value={theme}>
+   <ChildComponent />
+ </myContext.Provider>
```

React也会把`<Provider>`作为组件的一种类型来渲染。`value`变化时，触发其渲染，继而触发子组件的渲染。

子组件通过`useContext`读取到最新的*value*值。

```ts
// 这里的语法是flow的，"mixed"类似于any
// https://flow.org/en/docs/types/mixed/
const contextItem = {
  context: ((context: any): ReactContext<mixed>),
  memoizedValue: value,
  next: null,
};
```

useContext对于mount/update/rerender，用的是同一个函数`readContext`：
第一次执行，创建一个node保存context；后续每次调用，都会创建一个新的挂到末尾。
![img](./pics/useContext.png)


### 22.12 函数组件内使用`useState`，渲染更新逻辑是怎样的？

`useState`创建一个闭包，返回一个数组`[state, setState]`。

`state`引用闭包内的变量，可以使用`setState`来修改这个变量，触发组件重新渲染，再次执行到`useState`时，由于之前已维护了变量，这次调用并不会让state重置，类似于：

```js
let _val;
useState(initialValue) {
  _val = _val || initialValue // assign anew every run
  function setState(newVal) {
    _val = newVal
  }
  return [_val, setState]
}
```

相当于啥都不会发生。（如果当前值是false，而初始值是true，岂不是渲染后会变成true？？）

如何开启`enableDebugTracing`，就可以打印state的更新log


```tsx
const onTriggerMultiSetState = () => {
  console.log(`before 1st setName: name=${name}`);
  setName('alpha');
  console.log(`before 2nd setName: name=${name}`);
  setName('beta');
  console.log(`before 3rd setName: name=${name}`);
  setName('charlie');
  console.log(`after setNames: name=${name}`);
};
```

> ***`v17.0.2`(2021.2.19)的版本，和`ca106a02`(2021.11.15)的版本不一样[捂脸]***
>
> 这里以`v17.0.2`为例。后者把任务放进一个react自己维护的synccallbackqueue里了，而后会schedule一个微任务来刷新这个queue。看起来比之前更快了？

第一次setName时，state `name`对应hook的*pending*为空，给`hook.queue.pending`维护一个循环单链表。而后添加一个异步**宏任务***task*。调用链：
```ts
scheduleUpdateOnFiber
ensureRootIsScheduled
scheduleSyncCallback
Scheduler_scheduleCallback
requestHostCallback
port.postMessage(null) // 用到了MessageChannel，port2发出消息，port1接收并用performWorkUntilDeadline处理
```

> 事件处理函数`performWorkUntilDeadline`中，执行的`scheduledHostCallback`实际上执行的就是`flushWork`。`flushWork`需要返回一个boolean，表示是否还有work需要做。如还有，则再通过`port.postMessage(null)`的方式*schedule*这个任务（看代码代表任务的那个callback其实并没变，可能是任务本身可重入，像执行到某个地方了下次可以断点继续执行？）.
> 
> `flushWork`是在`requestHostCallback`传入的。当安排的这个宏任务开始执行时，它后续会触发`beginWork`，最终到`updateFunctionComponent`渲染我们的组件。
> 在渲染函数组件时，又执行到`useState`这一行，react将维护的`hook.queue.pending`拿出来，合并到`hook.baseQueue`上，而后循环处理每个update，最后计算出一个最终的state值返回。
> 3 


第二次setName时，state `name`对应hook的*pending*不空，插入一个新的*Update*节点，维护循环单链表（此时`pending`指向新插入的节点）。在执行`ensureRootIsScheduled`时发现之前已经有了一个task，且优先级一样，直接复用现有的task，返回。

第三次setName时，类似于上次。


1. fiber vs fiber.alternate  
每个ReactElement都用一个FiberNode对象表示，当前已渲染的节点对应的fiber叫做*current fiber*；在更新过程中（workInProgress），react为每个ReactElement创建对应的FiberNode，称之为*alternate fiber*(workInProgressFiber)。Fiber有一个`alternate`字段指向alternate。
https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react#current-and-work-in-progress-trees
2. fiber.memoizedState vs fiber.alternate.memoizedState
3. currentHook vs workInProgressHook  
currentHook用于对当前状态下的hook list进行遍历； 
workInProgressHook是在更新阶段，从hook list clone一个节点、并更新它的state，而后再clone并尾插入list、更新（更新时，实际上修改的是这个新clone的hook中的state，并没有改当前hook中的state，见`updateReducer`），最后形成了一个updated list。




1. 

#### postMessage

ref: https://html.spec.whatwg.org/multipage/web-messaging.html#posted-message-task-source

作用：不同的*browsing context*之间可以通信。比如window和内嵌的iframe之间。

用法：

```js
// window1，给window2发消息
// 页面域名：www.example.com
const targetWindow = getTargetWindow() // 获取到目标window对象
targetWindow.postMessage('this is message from example.com', { targetOrigin : 'https://www.target.com' })
```

```js
// window2，接收消息（需要判断是否是来自window1）
// 页面域名：www.target.com
window.addEventListener('message', receiver, false);
function receiver(e) {
  if (e.origin == 'https://www.target.com') {
    if (e.data == 'this is message from example.com') {
      e.source.postMessage('i got it', e.origin);
    } else {
      // ...
    }
  }
}
```

原理：

在目标*targetWindow*调用`postMessage`时，会向*event loop*的[**posted message task source**](https://html.spec.whatwg.org/multipage/web-messaging.html#posted-message-task-source)添加一个任务（因此它是一个**宏任务**），这个任务派发出一个`message`事件，再被*targetWindow*接收处理。

> Queue a global task on the posted message task source[<sup>1</sup>](https://html.spec.whatwg.org/multipage/web-messaging.html#posted-message-task-source)

（看起来这里有两次异步？1次post message，1次dispatch event？派发事件确认是异步的？）

#### MessageChannel

作用：使得不同*browsing contexts*之间的代码可以通信。

用法：

```js
// 创建一个message channel
var channel = new MessageChannel();

// 首先得持有另一个window的引用`otherWindow`，而后通过postMessage关联这两个port
// 把port1留给本地(local code)用，port2丢给另一端的window
otherWindow.postMessage('hi from port1', 'https://whatsbest.com', [channel.port2]);

// 此时port1、port2已对接，可以发消息了
// 调用port上的方法发送消息
channel.port1.postMessage('hello');

// -----------------------------------------------------------

// 另一端，接收消息
window.addEventListener("message", (event: { data: any, origin: string, source: Object }) => {
  // origin: 对方通过postMessage发送消息时的origin
  // source: 一个引用，指向发送消息的window
  if (event.origin !== "https://whatsbest.com") {
    return;
  }

  // 可信来源
  
  // ...
}, false);

channel.port1.onmessage = handleMessage;
function handleMessage(event) {
  // message is in event.data
  // ...
}
```

原理：

`postMessage`调用后，将会派发一个*MessageEvent*事件，不过这个事件会等待执行栈执行完毕后（*after all pending execution contexts have finished*）才会派发。


> Messages are delivered as DOM events, without interrupting or blocking running tasks[<sup>2</sup>](https://html.spec.whatwg.org/multipage/web-messaging.html#message-channels)

> After postMessage() is called, the MessageEvent will be dispatched only after all pending execution contexts have finished.[<sup>3</sup>](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

#### postMessage vs MessageChannel

1. postMessage每次都要在`window.addEventListener('message', ...)`检查域名来源，MessageChannel只有建立连接的第一次要，后续就在一对port之间传输数据；
2. 好像没别的了？

> When you create a new MessageChannel object, it has two connected MessagePort objects (port1 and port2). One of the ports is sent to another window or frame, and messages can be sent and received without repeated origin checking that is needed when using window.postMessage. Validation of the origin of a port and messages need only be done when a port is sent to windows other than the one that created them. MessagePort simplifies the messaging process by sending and receiving messages through two (and only those two) connected ports. Messages are posted between the ports using postMessage. Since the ports will only accept messages between the connected ports, no further validation is required once the connection is established. MessageChannel enables asynchronous communication between IFrameElements, cross-domain windows, or same page communications[<sup>4</sup>](https://stackoverflow.com/questions/18934027/whats-difference-between-web-messaging-with-messagechannel-and-without). http://msdn.microsoft.com/en-us/library/windows/apps/hh441303.aspx


#### queueMicrotask




#### event loop

每个user agent都有一个event loop来协调事件、脚本、网络等事件的运行。
window中的叫做*window event loop*，worker中的叫做*worker event loop*。

一个event loop有多个*task queue*，1个*microtask queue*。

task source: 是HTML标准中，用于在逻辑上区分不同类型的task，也就是同一类task放在一起叫做xxx类型的task source，每个task source都有一个关联的task queue。task queues是浏览器(user agent)在event loop中用于合并task sources的。（感觉像是event loop中有多个task queue，每个task queue代表不同类型的task source，每个task queue就是同类task的集合）

To queue a task: 创建一个task结构体对象，然后append到这个task source所关联的task queue上

task queue: **注意它是一个set而不是queue**，运行时从这些*task queues*中按某个算法机制选择一个当前可运行的task（runnable task）来执行。
某一类型的task都会放在一种task queue里。
不同类的task source(和task queue是一一对应关系？好像是近义词？）可以有不同的有优先级，通用的有：
- DOM manipulation
- User interaction
- Networking
- History traversal（history API）

microtask queue: **它的确是一个队列**，存放微任务（*microtasks*）。

microtask: 可以通过这些方法来schedule一个微任务：**Promise**、**MutationObserver**、**queueMicrotask**。

> A microtask is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent to drive the script's execution environment.

macrotask: task queue中的任务都是**宏任务**，也可以通过`setTimeout`、`setInterval`等来schedule一个宏任务。
注意：**执行一段代码本身就是一个宏任务。**

event loop的[执行顺序模型](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)：

1. 选一个task queue（它必须有可运行的task），而后从中取出第一个可运行的task
2. 运行这个task
3. 检查microtask queue是否有任务，如有则将它们依次按顺序出队执行完毕。注意，如果微任务处理过程中又新增了微任务，则这些新增的微任务也会在当前的迭代(*iteration*)中依次执行完毕
4. Update the rendering（复杂很，没看太懂），总之就是60HZ的频率，16.7ms得来一次这样的iteration


例1 微任务
```js
console.log("Before enqueueing the microtask");
queueMicrotask(() => {
  console.log("The microtask has run.")
});
console.log("After enqueueing the microtask");
```

ref:

微任务可以用来批处理任务（这篇文章好好读）：https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#batching_operations

Q1、`resolve`都做了啥？是否会立即执行后续的代码？

#1返回后，是否立即执行#2？- 否

```js
bar();
console.log(3);

async function bar() {
  console.log('bar')
  const ret = await foo(); // #1
  console.log(ret) // #2
}

function foo() {
  console.log('foo')
  return new Promise((resolve, reject) => {
    console.log(1);
    resolve(2);
  })
}
```

运行结果：
```
bar
foo
1
3
2
```

`bar`中的*async...await*等价于：

```js
function bar() {
  console.log('bar')
  foo().then((ret) => {
    console.log(ret)
  })
}
```
问题实质上等价于，某个promise resolve了，后续chain上的是否会立即执行。

答案是不会。当前task执行完，才会检查微任务队列，因此3出现在2之前。


## 23. Refs and the DOM

## 24. 如何为`className`写多个值？

```jsx
<div className={[classname1, classname2].join(' ')}></div>
```

## 25. 生命周期

### 25.2 父子组件的生命周期顺序是怎样的？

对于函数组件而言：

1、执行函数组件时，由外层到内层；  
2、cleanup阶段，由内层到外层（每个组件的cleanup可能有多个，按书写顺序由上到下依次执行）；  
3、React执行更新；  
4、rendered阶段，有内层到外层；  
5、结束

```
// 首次
父组件render
子组件render
子组件挂载
父组件挂载

// 子组件自己更新
子组件render
子组件cleanup (#1 注意与卸载的区别)
子组件rendered (#2 注意与挂载的区别)
```

> `mounted`与`rendered`都表示渲染完毕，只不过第一次渲染完毕时，称之为`mouted`而已。
> 
> 挂载后组件的更新，每次更新时都会重新执行一遍函数组件，来获取需要显示的DOM结构。React对比前后两个DOM结构，得出一个patch来更新真实的DOM树。更新前调用钩子`cleanup`，更新后调用钩子`rendered`（即`useEffect`提供的能力）。
>
> 当然，`useEffect`可以传入依赖项，可以帮助React确定是否要执行effect。

```ts
useEffect(() => {
  document.title = `hello ${name}`;
}, [name]);

// somehow in useEffect
if (previousName === newName) {
  // wont run the effect, since they are same
  return;
}

// do effect with newName
```

例如`<Parent>`组件里面有一个`<Child>`，子组件接收父组件通过`props`传来的属性(`props: { step: number }`)。
```ts
// 首次
Parent runs with props
Child runs with props: {"step":1}
Child rendered done, do effects
Parent rendered done, do effects

// 子组件setState后
Child runs with props: {"step":1}
Child cleanup 0 // 0是上一次render时，step的值
Child rendered done, do effects

// 父组件状态改变，给子组件的props中，step发生变化，1变为2
Parent runs with props
Child runs with props: {"step":2}
Parent cleanup
Parent rendered done, do effects

// 父组件通过修改props，不再渲染子组件
Parent runs with props
Child cleanup
Parent cleanup
Parent rendered done, do effects
```

e.g 1 **渲染完成，应该就是指mounted**的顺序是深度优先遍历

```tsx
<Component id="A0">
  <Component id="B0" />
  <Component id="B1">
    <Component id="C0" />
    <Component id="C1" />
  </Component>
  <Component id="B2" />
</Component>
```

渲染的顺序是：
```
B0
C0
C1
B1
B2
A0
```

即**后序遍历**，React采用深度优先渲染，所以根结点的渲染完成事件总是最后触发。

e.g 2 见[my-app/src/examples/life-cycle](./my-app/src/examples/life-cycle/).

```tsx
// Parent
class Parent extends React.Component {
  render() {
    return (
      <>
        <Child id='C0' />
        <Child id='C1' />
      </>
    )
  }
}
```

首次渲染触发的周期顺序：

```
parent::ctor
parent::render
child-C0::ctor
child-C0::render
child-C1::ctor
child-C1::render
child-C0::componentDidMount
child-C1::componentDidMount
parent::componentDidMount
```


## 26. 开发模式下，灰色的log是什么？StrictMode是什么？
![f](./pics/strict-mode-1.png)

是strict mode导致的，它用于开发环境下辅助找到潜在bug。strict mode下，react会对组件“再额外渲染一次”，在额外渲染过程中打印的console.log都会被标记为淡灰色。
额外渲染是指react会再执行一遍函数体（function component body）。
```jsx
  <React.StrictMode>
    <App />
  </React.StrictMode>
```
它用来发现什么bug？

- [pure component渲染两次结果不一样](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development)，可能就存在bug。比如每次render结果都不一样，但我们props、state并没改变，输出却变了。这样不符合pure component的理念，容易出bug。
![f](./pics/strict-mode-2.png)
- [检查effect是否漏掉了cleanup](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development)。比如常见的event listener、timer。react会对每个effect“再额外执行一次setup + cleanup”，如果我们漏了cleanup，功能表现上会更容易发现。
- [检查callback refs](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development)，strict mode下react会对callback refs “额外执行一次setup + cleanup"。和effect很类似，检查我们是否cleanup。



## Q&A

### 1. ts中的`React.FC`是啥？

typescript中为*React Function Component*定义了类型，即描述React函数组件的类型。

**FC**（它是*FunctionComponent*的简写)是一个*泛型接口*：

```ts
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
```

它描述了应该具有的字段：

- 一个函数：形参为`props`、以及或有的`context`，返回值为`ReactElement`或`null`
- 或有字段`propTypes`
- 或有字段`contextTypes`
- 或有字段`defaultProps`
- 或有字段`displayName`

其中修饰`props`的类型`PropsWithChildren<P>`定义为：

```ts
type PropsWithChildren<P> = P & { children?: ReactNode };
```

上面的`PropsWithChildren<P>`表示，这个类型修饰的变量，除了包含`P`所定义的接口，还需要包含`{ children?: ReactNode }`定义的成员（不过这里`children`是*optional*属性，故意味着不要求一定有）。

### 2. 使用`FC`

```tsx
import React, { FC } from "react";

type GreetingProps = {
  name: string;
}

const Greeting:FC<GreetingProps> = ({ name }) => {
  // name is string!
  return <h1>Hello {name}</h1>
};
```

### 3. *function component*中`useState`原理

```jsx
function Hello(props) {
  const [names, setNames] = useState(props.names);

  // something happened
  function foo() {
    names.pop(); // remove the last one
    
    // won't work
    setNames(names);

    // works, but why?
    setNames([...names]);
  }

  const welcomeAll = props.names.map(name => <h1>{name}</h1>);
  return welcomeAll;
}
```

React给每个组件实例都会添加一个`updater`，它持有对*renders*的引用(**#1**)。

```ts
const inst = new MyReactComponent();
inst.props = props;
inst.updater = ReactDOMUpdater; // #1
```

`ReactDOMUpdater`是*render*提供的，即*React*库是针对接口编程，给它一个具体平台的*render*，就能将视图渲染在具体平台之上。

*ReactDOM*其实就是一个*render*，用于浏览器端的渲染；

*ReactNative*是面向iOS/Android原生端的渲染；

*ReactDOMServerUpdater*是服务端渲染所用。

`useState`内部分了三种类型：*mount*, *update*, *rerender*。



初始时用`HooksDispatcherOnMount`，后续更新时用`HooksDispatcherOnUpdate`。

![1](./pics/learn-useState-1.PNG)

```ts
```

一些变量和概念的解释：

什么是*Fiber*？

> A Fiber is work on a Component that needs to be done or was done. There can be more than one per component.

*currentlyRenderingFiber*: The work-in-progress fiber

*workInProgress*：一个*Fiber*

上面这俩Fiber有什么区别？

`ReactCurrentDispatcher.current`：是一个`Dispatcher`

*Dispatcher*：

*queue*: 是一个对象，维护了一个*update*链表。

定义：

```ts
export type UpdateQueue<S, A> = {|
  pending: Update < S, A > | null,
  interleaved: Update < S, A > | null,
  lanes: Lanes,
  dispatch: (A => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null,
  lastRenderedState: S | null,
|};

type Update<S, A> = {|
  lane: Lane,
  action: A,
  eagerReducer: ((S, A) => S) | null,
  eagerState: S | null,
  next: Update < S, A >,
|};
```

*hook*: hook节点，多个hook组成一个链表。

```ts
export type Hook = {|
  memoizedState: any,
  baseState: any,
  baseQueue: Update < any, any > | null,
  queue: UpdateQueue < any, any > | null,
  next: Hook | null,
|};
```


示例代码
```tsx
function Foo() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  // ...
}
```

React第一次执行Foo时，创建一个单链表，挂载形如：


### 4. 为什么React元素只能有一个根？

### 5. function component vs class component

### 6. props或者state变了，发生了什么？

===在写React时想到的一些疑问===
Q1: React function写法和class写法的区别？以及何时应该使用何种？
A1. function是简单的写法，只有props传入；class则功能更强，有内部state，还有lifecycle。
当需要用到状态state、或需要绑定方法时，需要定义constructor，即应通过class定义

Q2: React更新状态为什么建议用this.setState，而不能用this.state=xxx呢？
A2. React称将state当做是不可更改的（immutable）。要触发React组件重绘，就需要让内部状态不一样。需要通过setState修改状态，可以连续调用，这个并不是同步的。对React来讲为了性能，可能是异步批量处理的。
而直接设置state，React是不清楚的。只有在ctor才可以直接赋值。
https://reactjs.org/docs/react-component.html#setstate
setState的两种形式；异步更新的。this.state不会重新渲染。
由于this.state和this.props可能是异步更新的，所以如果需要设置的新state需要依赖于之前的state，则应使用
this.setState((prevState, props)=>{});
//prevState是之前状态，props是当前更新时刻的值。
这种形式。

Q3：props和state有什么区别？
A3. props好比传入的参数；state好比内部的数据。props不可修改，state可以。
props是从上向下传递给组件的props属性，组件不可修改此值。父子关系的组件，父组件可以将自己的state作为props传递给子组件，子组件尽量实现为无状态（stateless）组件、只负责根据传来的数据绘制UI。当然，如果子组件上的UI想要修改传来的值，那就需要定义一个函数（当值需要修改时触发），父组件定义并实现一个修改值来源的函数，并将此函数作为props传递给子组件。
    state是组件内部的状态，可以修改，修改会触发重绘。

Q4：在TodoList项目中，子组件TaskItem状态修改为完成，我需要反应到TodoList组件state中的list，如何做？
类似于
//list = [{a:1, b:2}, ...]
//change to
//list = [{a:1, b:3}, ...]
//我只是想改变个属性值，其实只有child要re-render，parent（TodoList）是不需要重绘的
//那这里如果重新setState，岂不是parent也要重绘，相当于child重绘了两次！
A4. React中的state不可以直接修改，它作为immutable存在。React并不是面向nested state设计的，如果过多的nest则会导致更新代价很高（可能需要创建新的对象）。
修改思路：既然state不能直接修改，那就要先复制一份，修改后再重新设置state。这里首先复制要修改的对象{a:1, b:2}，然后修改此新对象的b属性，最后设置state。
var copyList = [...list];//spread syntax的浅拷贝，想象下内存分布情况：copyList指向一个是指针数组，其中每个元素都是一个指向对象的指针。只不过复制的只是指针，而不是对象！

//Wrong! 不能试图直接修改这个对象，因为state间接引用的它！
var obj = copyList[0];
obj.b = 3;
//Wrong!

//Correct
var obj = {...copyList[0]};//此时obj是一个新的对象，已经将原对象的属性赋值到了新对象中
obj.b = 3;//大胆地修改新对象上的b属性
//Correct

copyList[0] = obj;//时刻注意，这次也是修改的复制数组的第一个元素，而且令它指向新的对象obj。此刻state.list仍然是没有被修改的。
this.setState({list: copyList});//最后设置state，实际上我们只修改了state中的某一小块数据
//总结：先复制出来，再修改，最后重新设置state。总之别动state！

this.state = {name:xx, age:xx};//React expected
this.setState({name:'xiyu'});

this.state = {user:{name:xx, age:xx}};//nested
var { user } = { ...this.state };//copy user property of state into a new object 'user'
user.name = 'xiyu';//assign new value
this.setState(user);

I would suggest you avoid using nested state, if you must then endeavor to make it as light as possible because the downside is every tiny piece of change will recreate the parent object, which is not good for performance.

Q5：如何实现React动画Animation。给TodoList加了类似微信左滑出现删除的css，jQuery.animate如何转换为js+React？CSS的transition不适用，因为我只想在touchEnd的时候进行过渡。
A5：


Q6. static getDerivedStateFromProps(props, state)
这个方法存在的意义只有一个：在组件的state需要根据props来变化时，可以在这里设置state。组件创建、每当接收到新props时，本方法都会被调用。
该静态方法返回一个object来更新state，如果返回null则表示不需要更新。
P.s. 旧式的方法是用componentWillReceiveProps(nextProps)，从16.3+建议用getDerivedStateFromProps。
getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props
准则：应尽量避免使用继承状态（derived state should be used sparingly）。
所谓继承状态，应该就是指组件将从父组件接收到的props，直接或间接地作为组件本身的state。
[ref]https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state
[ref]https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

Q7. shouldComponentUpdate(nextProps, nextState)
A7. 用于告诉React一个组件的render结果，因为当前props、state改变后，是否需要修改。在render之前被调用，但初次挂载时、forceUpdate()调用时不触发。
【Use shouldComponentUpdate() to let React know if a component’s output is not affected by the current change in state or props.】
PureComponent实现了shouldComponentUpdate()，以一种shallow comparison的方式进行。
自己可以从React.Component继承并实现该接口，比较nextProps和this.props、nextState和this.state。返回false表示跳过本次渲染（render）。注意：当子组件自己的state变化时，父组件通过shouldComponentUpdate返回false来跳过渲染，并不会阻止子组件因state而引起的重新渲染。
【Note that returning false does not prevent child components from re-rendering when their state changes.】

Q8. controlled vs uncontrolled
A8. 组件的数据是由父组件以props传入来控制的，则称为controlled component（因为数据是由父组件控制的）；对于与内部state相关的组件，则是uncontrolled component。
Data passed in as props can be thought of as controlled (because the parent component controls that data). Data that exists only in internal state can be thought of as uncontrolled (because the parent can’t directly change it).

Q9. 跨多层级传输数据：context；或将用到此数据的子组件提升到数据源处。
GameBody如何优雅地自下而上将修改后的状态反馈给父组件？如全局state我都放在了UNOClient里，然后GameBody肯定要引用这个UNOClient里的state数据的。
我的gameBody->scorebody->scorerow->row->cell，层级很多，cell需要修改的state，现在是一层层传下来的，如何更好组织这种意图？
A9. Context了解下。
[ref=https://reactjs.org/docs/context.html#when-to-use-context]

Q10. 事件也是逐层下传，如填写新一轮分数时，input的状态由input逐层向上传递：input->inputRow->scoreBody->gamebody这样写不科学吧，正确的写法是什么？

Q11. forwarding refs，一层好说，跨多层呢？如何引用最底层的input DOM？

Q12. Error: this.setState is not a function
A12. 这就说名this实际所代表的context不对嘛。
错误代码：
//父组件中
//游戏开始
handleStartGame(totalScore){
	console.log('Game started! Total score now has been set to: ' + totalScore)
	this.setState({#3
		gameStatus:'InPlaying',
		totalScore:totalScore
	})
}
<GameBody handleStartGame={this.handleStartGame}/> #1【THIS IS THE ERROR PRONE】
<GameBody handleStartGame={this.handleStartGame.bind(this)}/> #1【THIS IS THE RIGHT WAY】

//子组件GameBody中
handleStartGameClick(e){
	this.props.handleStartGame(this.state.totalScore) #2
}

为什么错：
#2中的2个this，都是调用handleStartGameClick函数的对象，没问题；
#1的方式传递函数，当#2要执行这个传递的函数时，handleStartGame是在handleStartGameClick函数中执行的，它没有显式指定this对象的指向，因此this就是不确定的。（实际上调试时显示的this仅仅是一个从Object继承的对象，却不是子组件，也不是父组件。）为啥仅仅是一个object继承而来的对象？

Q13. 组件间如何通信？我想在UNOClient里面的一些console.log报错，能否发给一个平级的React组件，专门显示错误信息
A13. doc says对于没有父子关系的组件通信时，可以设置全局事件订阅系统，然后调用组件的setState来达到更新之目的。
Flux了解下：单向数据流动的一种pattern，主要是dispatcher将接收action，然后分发给每一个注册的store，store更新数据，然后触发change事件，以更新view。
https://react-cn.github.io/react/tips/communicate-between-components.html

Q14. 有没有一种可能，将js中的变量值赋值给reactDOM对象内的state？
A14. state是表达组件随事件会变化(changes over time)的一种组件状态，既然会变化，那不如直接将此变量移动到React组件内部。

Q15. 组件接收的props变了，想修改组件自己的state
A15. getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props

Q16. render props，复用的一种pattern(https://reactjs.org/docs/render-props.html)
A16.



===Nodejs相关知识点===
单线程服务器，event-driven型I/O模型，善于应对高并发、CPU计算量不大的请求。
1.package.json
描述了工程所需要的一些依赖，如依赖什么模块、什么版本的等。

2.express

3.npm
管理js库，可通过npm install <package name>来下载中意的开源js代码。

4.如果每访问一个页面，都要写app.get，显然不实际。更好的方法呢？

5.res.json vs res.send vs res.end
现象：app.post里面，写了res.json(xx)，却抛异常"Can't set headers after they are sent"。后面加一条语句res.end()就好了。
原因：
首先，
res.send(body)用于发送HTTP Response body数据，不需要显式再调用res.end。
res.json(body)发送JSON Response（会将body转换为JSON，前端收到的res就是一个json）。也不需要显式调用res.end。
res.end([data])用于快速结束Response Process，而不发送数据（当然也可以附带些data，这个会附着在整个body最后）。
"Can't set headers after they are sent"：即当前处理响应时已经发送了header，此时可能又有哪块想要设置header，故此报错。
当使用next()跳过当前route处理时，node***仍然会***执行紧跟着next()后面的语句！而当前代码下方就会执行到res.json(xx)。又可能因为刚才调用了next()，就可能使用下一个route来处理，导致此错误发生。

6.node中处理ajax请求的模式是什么？一般怎么书写程序结构？
原生node：需自行判断，结合request.method == 'GET'或'POST'、request.url，或其他因素，来决定具体如何响应（这相当于router的工作）
express框架：app.get('/search', (req, res, next) => {});


7.node中如何响应脚本文件的请求，如html中<script src='js/myscript.js'></script>
A3. 用express将静态资源映射，以中间件的形式提供对这些资源的响应。
var express = require('express');
var app = express();
app.use(express.static('public'));//works as middleware for serving static files
此时当访问js/myscripts.js时，中间件会在public目录下找js/myscript.js，找到则返回；否则略过中间件，交给后面的router处理。

8.[websocket]服务器主动推送消息到客户端
2008年讨论这种技术后，商定名为websocket。ws://（over HTTP 80 port），以及wss://（over HTTPS 443 port）
websocket和HTTP都是应用层协议，而且也是基于TCP。但websocket是被设计为工作在HTTP或HTTPS之上的协议。这样就与HTTP协议兼容。
通常为了采用websocket协议通信，首先要执行websocket握手。客户端首先发送一个websocket握手请求，但是使用的是HTTP Upgrade Header(Upgrade: websocket; Connection: Upgrade)。服务端返回响应"101 Switching Protocols"，从HTTP升级为websocket协议，建立后就可以进行websocket通信了。
websocket的数据传输称作”消息“(messages)，which means一个消息可以被分割为多块传输（尤其是在初始化时，有时候数据大小并不确定）。

9. socket.io is NOT a implementation of WebSocket. (BUT a library to abstract the WebSocket connections)
WebSocket:是一个基于HTTP/HTTPS的允许client-server进行全双工通信的应用层协议。
socket.io:是一个WebSocket库。可以说是mounts on http。像是依附在http上的一个js库。

WebSocket client无法连接到Socket.IO server;
Socket.IO client也同样无法连接到WebSocket server。

socket.io: https://github.com/socketio/socket.io

10.  纳闷于<script src="/socket.io/socket.io.js"></script>这玩意到底是咋加载的。。
代码：
var express = require('express')
var app = express();
var http = require('http').Server(app);//#1
var io = require('socket.io')(http);
http.listen(3000, function(){
  console.log('listening on *:3000');
});

解释：
#1 Server函数是在socket.io/index.js, Ln36。但是为啥没返回值啊，不是这个函数吧？
网上说，实际创建socket server的时候，就已经添加了路由：/socket.io/socket.io.js，所以才可以请求到这个js。

另外一点，注意最后的listen是在http上调用的，而不是app。【有何区别？】像是把http warp了一个socket，然后用wrap后的server吧？看#1，把app传入后，结果得到的http是支持socket.io特性的server了？

11. socket.io通信，clientA发送msg后，服务器如何广播给其他人，不再给自己发？
我的思考：
  socket标识了唯一的client-server通信线路，也就是说每个client都有自己的socket。那如果服务器能够确定哪些socket需要接收消息，就能解决这个问题了。
  那问题来了，socket在后台如何区分？记录在map里？socket究竟是什么个类型？
  每次事件发生时，后台事件处理函数都会有个socket实参传入，标识了当前正在处理的socket。
  [ref: https://socket.io/docs/emit-cheatsheet/]
  // sending to all connected clients
  io.emit('an event sent to all connected clients');
  
  // sending to all clients in 'game' room, including sender
  io.to('game').emit('big-announcement', 'the game will start soon');
  OR (because to/in are same)
  io.in('game').emit('big-announcement', 'the game will start soon');
  
  
  【加入room】socket.join(room)
  【离开room】socket.leave(room)
  【广播消息到所在room，包括自己】io.to('game room').emit('big-announcement', 'the game will start soon');
  【广播消息到所在room，不包括自己】socket.to('game').emit('nice game', "let's play a game");
  【广播消息到所有clients】io.emit('an event sent to all connected clients', 'msg');
  【只向socket自己发送消息】socket.emit('event-name', 'msg');
  [https://socket.io/docs/rooms-and-namespaces/]
  
12.


===express相关知识点===
Express
Nodejs框架，包含router request机制等。[href: http://qnimate.com/express-js-middleware-tutorial/]
1. app.get vs app.use
app.METHOD定义对不同请求类型(POST/GET/PUT/DELETE/etc)、不同路径的请求的处理方式，参数callback称为router handler。
app.use能够定义一个中间件，其实中间件并不处理具体的请求，而是相当于一次前置预处理。参数callback被称为middleware callback function。
app.use可以多次定义中间件，这些中间件将在请求处理的flow最前端先将请求预处理一遍，而后交给我们定义的request handler做具体处理。
比如将bodyParser中间件加入到middleware-stack中，这样每个请求到来时都会由bodyParser中间件处理一次，最后再将处理结果交给更后面的请求处理函数处理。
Each app.use(middleware) is called every time a request is sent to the server.
【类似于ASP.NET IIS的pipeline中那些HTTP Modules】

2. Routing & next() & next('route')
var app = express()
app.get('/hello', function (req, res, next) {
  console.log('处理不了，交给下一个callback处理');
  next() //pass control to the next handler
}, function(req, res){
  res.send('hello world2')
}
);

对每一个route，都可以有多个route handler，如果要转到下一个callback，就需要调用callback的第三个参数next()。
与middleware不同之处在于，这些route handler可以调用'next("route")'来跳过剩余的route callback。注意跳过的是对当前route的剩余callback，跳过后将会继续向下寻找与该请求URL匹配的route（then pass control to subsequent routes）。

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

3. app.mountpath
一个sub-app也是express的一个实例(instance)，app.mountpath属性表示这个实例app被挂载的path patterns。如app1.use(['/adm*n', '/manager'], app2);//则app2.mountpath==['/adm*n', '/manager']

[An Express app is valid middleware]一个express app实例也是一个合法的中间件：
var subApp = express();
subApp.get('/', function(req,res,next){ next(); });
app.use(subApp);//使用另一个subApp作为app的中间件

4. req.baseUrl
与app.mountpath类似，只不过req.baseUrl返回的是the URL path on which a router instance was mounted.即router实例被挂载在哪个URL path上。
var greet = express.Router();
greet.get('/jp', (req, res) => {
    req.baseUrl;// /greet （因为router 'greet'被挂载在app的'/greet'上）
    //...
}
app.use('/greet', greet);// load the router on '/greet'

如果是用了path pattern，或者是一组path patterns来挂载router，则req.baseUrl返回的是matched String, not the pattern(s)。
app.use(['/gre+t', '/hel{2}o'], greet);
当request url = '/greet/jp'时，req.baseUrl = /greet
当request url = '/hello/jp'时，req.baseUrl = /hello

5. req.originalUrl
它和req.url类似（req.url是从node的HTTP module继承而来的），contains only the URL that is present in the actual HTTP request. If the request is:
GET /status?name=ryan HTTP/1.1\r\n
Accept: text/plain\r\n
则request.url == '/status?name=ryan'


==Response，express中的Response实际上（应该是）继承了Node的http module中的http.ServerResponse==
6. res.end([data] [, encoding])
和Node core中的http.ServerResponse.end()一致，用于结束当前请求。
但Node中的方法可以传回调：response.end([data][, encoding][, callback])

7. res.json([body])
发送JSON响应，res.json(myJSONObject)等价于：res.send( JSON.stringify(myJSONObject) )
 7.1 res.jsonp([body])
  与res.json相同，只不过多了JSONP callback的支持。
  // ?callback=foo
  res.jsonp({name:'xiyu'});
  // => foo({"name":""xiyu})
  p.s. url中的key'callback'是express默认的，不过也可以在app setting中修改：app.set('jsonp callback name', 'cb');
  则下次url请求用JSONP的就应该是：
  // ?cb=foo

8. res.redirect([status], path)
重定向，默认302, Found。path可以是绝对路径、fully-qualified URL去不同的site，也可以是相对于当前URL的路径。

9. res.render(view [, locals] [, callback])
从view渲染HTML，发送给客户端。参数view是一个file path，如果没有指明扩展名，则express将根据app setting中的'view engine'来决定其扩展名，然后Express将加载在'view engine'中指定的module，最后使用加载module的'__expression'函数来对view进行render。
这里的'view engine'可以称为是'template engine'，即从模板生成HTML。如EJS。

10. res.sendFile(path [, options] [, fn])
如果options中没有指明root，则文件path必须是绝对路径；
如果指明了fn，且发生了错误，则在这个callback(err)中必须自行处理response的结束，或者调用next()交给下一个route handler处理。

11. res.sendStatus(statusCode)
res.sendStatus(200); // equivalent to res.status(200).send('OK');
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')

==Router==
