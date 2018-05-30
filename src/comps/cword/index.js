import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './styles.css'

const Crossword = observer(class Crossword extends Component {
  isWordStart(x, y) {
    const { plantedWords } = this.props.store.crossword
    let i
    for (i=0;i<plantedWords.length;i++) {
      let p = plantedWords[i]
      if (p.x === x && p.y === y) return "WordStart"
    }
    return ""
  }

  render() {
    if (this.props.store.crossword){
      const { mtrx, top } = this.props.store.crossword
      return(
        <div className="CrosswordWrapper">
        {
          mtrx.map((row, y) => row.map((cell, x) => (
            <div
            key={`x${x}y${y}`}
            style={{left: `${x * 1.5}em`, top:`${(y - top + 1) * 1.5}em`}}
            className={`CWCell ${cell !== 0 ? `Filled ${this.isWordStart(x, y)}` : ""}`}
            onDrop={ this.handleCellDrop }
            >
            { (cell !== 0) ? cell : "" }
            </div>
          )))
        }
        </div>
      )
    }else {
      return null
    }
  }
})

export default Crossword
