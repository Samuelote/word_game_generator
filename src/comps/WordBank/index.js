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
        onClick={this.props.store.deleteWord()}
      >
        {w}
      </p>
    ))
  }

  activateBtn() {
    if (this.props.store.wordBank.length > 0){
      document.querySelector('.Btn').classList.add('activeBtn')
      document.querySelector('.Btn').classList.remove('inactiveBtn')
    }
  }

  handleClick(e) {
    const arrCont = document.querySelector('.ArrayContainer')
    const store = this.props.store
    if (arrCont) arrCont.innerHTML = ''

    if (e.target.className.includes(' activeBtn')) store.regenPuzzle(store.puzzleType);
  }

  render() {
    setTimeout(()=>this.activateBtn(),0)
    return(
      <div>
        <div className="WordBank">
          <h3>Word Bank</h3>
          <div className="Words">
            {
              this.renderWords()
            }
          </div>
          <button className='Btn inactiveBtn' onClick={this.handleClick.bind(this)}>Draw Puzzle</button>
        </div>
      </div>
    )
  }
})

export default WordBank
