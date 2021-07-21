import React from 'react';
import logo from './logo.svg';
import './App.css';
import Child from './examples/life-cycle/function-component-style/child';
import Parent from './examples/life-cycle/function-component-style/parent';
// import { Parent } from './examples/life-cycle/class-component-style/parent';

function App() {
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
      <Parent />
    </div>
  );
}

export default App;
