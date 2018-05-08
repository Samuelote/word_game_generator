import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch'
import SideBar from './comps/sideBar'
import './App.css'

const App = observer(class App extends Component {
  render() {
    console.log(this.props.store)
    return (
      <div className="App">
        <SideBar />
      </div>
    );
  }
})

export default App;
