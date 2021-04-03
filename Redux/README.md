npm i @reduxjs/toolkit
npx create-react-app my-app --template redux
npm i redux

## 2. 基本概念

### 2.1 `Actions`

一个`Action`就是一个*plain javascript object*，必须有一个`type`属性，也可以增加其它额外属性名，一般会加一个`payload`形如以下：

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

`type`是一个*string*类型，一般以`domain/eventName`的风格命名。

### 2.2 `Action Creators`

