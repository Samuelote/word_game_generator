import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './styles.css'

const Crossword = observer(class Crossword extends Component {
  render() {
    // console.log(style.CrosswordWrapper, style.CWCell)
    return(
      <div className={"CrosswordWrapper"}>
        {
          this.props.store.crossword.map((row, y) => row.map((cell, x) => (
            <div style={{ left: `${x * 1.5}em`, top:`${y * 1.5}em`}} className={`CWCell ${cell !== 0 ? "Filled" : ""}`}>
              {(cell !== 0) ? cell : ""}
            </div>
          )))
        }
      </div>
    )
  }
})

export default Crossword
