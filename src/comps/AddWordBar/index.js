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

  handleClick() {
    const { newWord } = this.state
    this.props.store.addWord(newWord)
  }

  handleChange(e) {
    this.setState({ newWord: e.target.value })
  }

  render() {
    return(
      <div className="AddWordBar">
        <input
          value={ this.state.newWord }
          type="text"
          onChange={ this.handleChange }
          placeholder="Add a word!"
        />
        <button onClick={ this.handleClick }></button>
      </div>
    )
  }
})

export default AddWordBar
