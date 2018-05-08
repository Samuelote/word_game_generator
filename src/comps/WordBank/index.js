import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordBank = observer(class WordBank extends Component {

  // renderWords() {
  //   const { wordBank } = this.props.store
  //   return Object.keys(wordBank).map(w => <p>{w.word}</p>);
  // }

  render() {
    console.log(this.props.store)
    return(
      <div className="WordBank">
        <h3>Word Bank</h3>
        <div className="Words">
          {
           this.props.store.wordBank.map((w,i) => <p key={i}>{w}</p>)
          }
        </div>
      </div>
    )
  }
})

export default WordBank
