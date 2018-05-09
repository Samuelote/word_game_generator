import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch'
import AddWordBar from './comps/AddWordBar'
import SideBar from './comps/sideBar'
import WordBank from './comps/WordBank'
import './App.css'

const App = observer(class App extends Component {
  render() {
    return (
      <div className="App">
        <AddWordBar store={this.props.store} />
        <WordBank store={this.props.store}/>
        <SideBar />
        <div className="ContentWrapper">
          
        </div>
      </div>
    );
  }
})

export default App;
