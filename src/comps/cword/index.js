import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './styles.css'

const Crossword = observer(class Crossword extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // console.log(this.props.store.wordBank())
  }

  handleClick(e) {
    const rawLoc = e.target.attributes.getNamedItem("loc")
    if (rawLoc) {
      let x = rawLoc.value.match(/x(\d+)y/)[1]
      let y = rawLoc.value.match(/y(\d+)/)[1]


    }
  }

  render() {
    const { mtrx, top } = this.props.store.crossword
    return(
      <div className={"CrosswordWrapper"} onClick={this.handleClick}>
        {
          mtrx.map((row, y) => row.map((cell, x) => (
            <div key={`x${x}y${y}`} loc={`x${x}y${y}`} style={{ left: `${x * 1.5}em`, top:`${(y - top + 1) * 1.5}em`}} className={`CWCell ${cell !== 0 ? "Filled" : ""}`}>
              {(cell !== 0) ? cell : ""}
            </div>
          )))
        }
      </div>
    )
  }
})

export default Crossword
