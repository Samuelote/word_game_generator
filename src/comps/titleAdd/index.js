import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const titleAdd = observer(class titleAdd extends Component {
  constructor() {
    super()
    this.state ={
      newWord: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ newWord: e.target.value })
    this.props.store.title = e.target.value
  }

  render() {
    return(
      <div className="TitleContainer">
        <input
          value={ this.state.newWord }
          type="text"
          onChange={this.handleChange}
          onBlur={this.handleChange}
          placeholder="Add a title!"
          maxLength= "20"
        />
      </div>
    )
  }
})

export default titleAdd
