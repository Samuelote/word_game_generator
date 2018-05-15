t
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordSearch = observer(class WordSearch extends Component {

  constructor(){
    super();
    this.state = {
      grid: null,
    }
  }
  componentDidMount(){
    // This is not the best way to call this but its what i found worked best rn. Still doesnt update with refresh.
    // It updates if you switch to crossword and back. Not sure what the solution is.
    this.props.store.regenWordSearch();
    if (this.props.store.wordsearch[0]) this.print();
  }

// I had to use this print function because the double map didnt work.
// I needed to map a div inside another mapped div (row and letter) and you can't go that deep within jsx.
  print(){
    const grid = this.props.store.wordsearch[0];
    const parentContainer = document.querySelector('.ArrayContainer')
    for (let i = 0; i < grid.length; i++){
      const div = document.createElement('div')
      div.className = 'Row'
      parentContainer.appendChild(div)
      for (let j = 0; j < grid[i].length; j++){
        const el = document.createElement('div')
        el.className = 'Element'
        if (grid[i][j] === grid[i][j].toLowerCase()) el.classList.add('Word')
        el.innerHTML = grid[i][j].toUpperCase()
        document.getElementsByClassName('Row')[i].appendChild(el)
      }
    }
  }

  render() {
    return (
        <div className="GridContainer">
          <div className='ArrayContainer'>
          </div>
        </div>
    );
  }
})

export default WordSearch;
