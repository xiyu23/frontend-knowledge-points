import React from 'react';
import logo from './logo.svg';
import './App.css';
import Child from './examples/life-cycle/function-component-style/child';
import Parent from './examples/life-cycle/function-component-style/parent';
import FriendStatus from './examples/custom-hook/friend-status';
import FriendItem from './examples/custom-hook/friend-item';
// import { Parent } from './examples/life-cycle/class-component-style/parent';

function App() {
  const friendList = [
    {
      id: '1',
      name: 'yuhui',
    },
    {
      id: '3',
      name: 'xiaohan',
    },
    {
      id: '4',
      name: 'sun',
    },
  ];
  const FriendList = friendList.map(friend => <FriendItem friend={{id: friend.id, name: friend.name}} key={friend.id} />);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Parent /> */}
      { FriendList }
    </div>
  );
}

export default App;
