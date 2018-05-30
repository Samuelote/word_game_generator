import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch'
import CrossWord from './comps/cword'
import AddWordBar from './comps/AddWordBar'
import SideBar from './comps/sideBar'
import WordBank from './comps/WordBank'
import TitleInput from './comps/titleAdd'
import HintList from './comps/hintList'
import './App.css'

const App = observer(class App extends Component {

  render() {
    return (
      <div className="App">
        <AddWordBar store={this.props.store} />
        <WordBank store={this.props.store} />
        <SideBar store={this.props.store} />
        <div className="ContentWrapper">
          <TitleInput store={this.props.store} />
          {(this.props.store.puzzleType !== "WordSearch") ? <HintList className='Hint' store={this.props.store} /> : null}
          {
            (this.props.store.wordBank.length < 1)
              ? (<div className="Warning">
                  <p>Add words to create a puzzle!</p>
                </div>)
              : ""
          }
          {
            (this.props.store.puzzleType === "WordSearch")
              ? <WordSearch store={this.props.store} />
              : (<CrossWord store={this.props.store} />)
          }
        </div>
      </div>
    );
  }
})

export default App;
