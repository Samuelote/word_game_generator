import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './styles.css'

const Crossword = observer(class Crossword extends Component {
  componentWillMount() {
    console.log(this.props.store.crossword)
  }
  render() {
    // console.log(style.CrosswordWrapper, style.CWCell)
    const { mtrx, top } = this.props.store.crossword
    return(
      <div className={"CrosswordWrapper"}>
        {
          mtrx.map((row, y) => row.map((cell, x) => (
            <div style={{ left: `${x * 1.5}em`, top:`${(y - top + 1) * 1.5}em`}} className={`CWCell ${cell !== 0 ? "Filled" : ""}`}>
              {(cell !== 0) ? cell : ""}
            </div>
          )))
        }
      </div>
    )
  }
})

export default Crossword
