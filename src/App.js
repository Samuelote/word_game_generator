import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch';


const App = observer(class App extends Component {
  render() {
    console.log(this.props.store)
    return (
      <div className="App">
        <WordSearch />
      </div>
    );
  }
})

export default App;
