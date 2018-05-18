
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordSearch = observer(class WordSearch extends Component {
// I had to use this print function because the double map didnt work.
// I needed to map a div inside another mapped div (row and letter)
//and you can't go that deep within jsx. -> wrong
  print(){
    const { wordsearch } = this.props.store
    return wordsearch.map((row, y) =>(
        <div key={"row" + y} className="Row">
          {
            row.map((cell, x) => (
              <div
                key={`x${x}y${y}`}
                className={`Element ${wordsearch[y][x] === wordsearch[y][x].toLowerCase() ? "Word" : ""}`}
              >
                {cell}
              </div>
            ))
          }
        </div>
      ))
  }

  render() {
    return (
        <div className="GridContainer">
          <div className='ArrayContainer'>
            { this.print() }
          </div>
        </div>
    );
  }
})

export default WordSearch;
