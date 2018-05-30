import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const AddWordBar = observer(class AddWordBar extends Component {
  constructor() {
    super()
    this.state ={
      newWord: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick  = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) this.handleClick();
    })
  }

  handleClick(e) {
    const { newWord } = this.state
    if (newWord.length > 1)
    this.props.store.addWord(newWord)
    this.setState({ newWord: '' })
  }

  handleChange(e) {
    // KEEP THIS CHAD
    //prevents anything except letters from being typed
    if (e.target.value.length <= 1) this.setState({ newWord: e.target.value })
    else if (
      (e.target.value.split('').pop() <  String.fromCharCode(90) &&
      e.target.value.split('').pop() >  String.fromCharCode(64)) ||
      (e.target.value.split('').pop() <  String.fromCharCode(122) &&
      e.target.value.split('').pop() >  String.fromCharCode(96)) &&
      (e.target.value.length <= 20)
    ) this.setState({ newWord: e.target.value })

  }

  render() {
    return(
      <div className="AddWordBar">
        <div>{this.props.store.puzzleType}</div>
        <input
          value={ this.state.newWord }
          type="text"
          onChange={this.handleChange}
          placeholder="Add a word!"
          maxLength= "24"
        />
        <button onClick={ this.handleClick } ><div className="glyphicon glyphicon-plus"></div></button>
      </div>
    )
  }
})

export default AddWordBar
