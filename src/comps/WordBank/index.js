import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordBank = observer(class WordBank extends Component {
  constructor() {
    super()
    this.handleClick  = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    const { target } = e
    if (target.nodeName === 'LI') this.props.store.deleteWord(target)
  }

  handleClick(e) {
    const { store } = this.props
    if (store.wordBank.length > 0) store.regenPuzzle(store.puzzleType)
  }

  renderWords() {
    return this.props.store.wordBank.map((w,i) => (
      <li key={i} className={`word${w.added ? " added" : ""}`}>
        {w}
      </li>
    ))
  }


  render() {
    const noWords = this.props.store.wordBank.length < 1
    return(
      <div>
        <div className="WordBank">
          <h1>{ noWords ? 'Add Words' : 'DoubleClick Word To Delete' }</h1>
          <button
            className={`Btn ${noWords ? "inactiveBtn" : "activeBtn"}`}
            onClick={ this.handleClick }
          >
            Draw Puzzle
          </button>
          <h3>Word Bank</h3>
          <ul className="Words" onDoubleClick={this.handleDelete}>
            {
              this.renderWords()
            }
          </ul>
        </div>
      </div>
    )
  }
})

export default WordBank
