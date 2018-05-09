import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordBank = observer(class WordBank extends Component {

  componentDidMount() {
    document.addEventListener('mousedown', (e) => {
      const { target } = e
      if (target.classList[0] === "word") {
        console.log(target)
      }
    })
  }

  renderWords() {
    return this.props.store.wordBank.map((w,i) => (
      <p
        key={i}
        className={`word${w.added ? " added" : ""}`}
      >
        {w}
      </p>
    ))
  }

  render() {
    return(
      <div className="WordBank">
        <h3>Word Bank</h3>
        <div className="Words">
          {
            this.renderWords()
          }
        </div>
      </div>
    )
  }
})

export default WordBank
