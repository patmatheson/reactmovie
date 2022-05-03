import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chip from '@mui/material/Chip';
import Pat from './Pat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and/or save to fail.
        </p>
        <Chip label="Chips and Dip" />
        <Pat message="hi" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
