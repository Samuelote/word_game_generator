import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch'
import AddWordBar from './comps/AddWordBar'
import SideBar from './comps/sideBar'
import './App.css'

const App = observer(class App extends Component {
  render() {
    const {store} = this.props
    return (
      <div className="App">
        <AddWordBar store={store} />
        <SideBar />
      </div>
    );
  }
})

export default App;
