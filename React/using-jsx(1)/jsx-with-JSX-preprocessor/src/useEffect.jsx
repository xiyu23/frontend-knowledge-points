// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 0,
//     };
//   }

//   componentDidMount() {
//     console.log('componentDidMount');
//   }

//   componentDidUpdate() {
//     console.log('componentDidUpdate');
//   }

//   componentUnmount() {
//     console.log('componentUnmount');
//   }

//   onBtnClick() {
//     this.setState({
//       counter: this.state.counter + 1,
//     });
//   }

//   render() {
//     return (
//       <button onClick={this.onBtnClick.bind(this)}>You have clicked {this.state.counter} times</button>
//     );
//   }
// }

// import React, { useState, useEffect } from '../../../lib/react.js';

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