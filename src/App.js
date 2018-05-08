import React, { Component } from 'react';
import './App.css';
import WordSearch from './comps/wordSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WordSearch />
      </div>
    );
  }
}

export default App;
