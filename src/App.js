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
  componentDidMount(){
    document.title = "Word Game Generator"
  }

  hideDiv(){
    document.querySelector('.Error').style.height = 0
    document.querySelector('.ErrorChildren').style.opacity = 0
    document.querySelector('.ErrorChildren').style.top = '-600px'
    setTimeout(()=>document.querySelector('.Error').style.visibility = 'hidden', 100);
  }

  render() {
    return (
      <div className="App">
        <div className='Error'>
          <div className='ErrorChildren'>
            <button onClick={this.hideDiv.bind(this)}>X</button>
            <div className='msg'>This is an error that needs to extend extremly far for warpping</div>
          </div>
        </div>
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
