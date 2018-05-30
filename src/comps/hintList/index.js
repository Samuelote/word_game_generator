import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'


const HintList = observer(class HintList extends Component {
  constructor(){
    super();
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const {hintList, wordBank} = this.props.store
    let index = 0;
    let {placeholder, value} = e.target
    for (let i =0; i < wordBank.length; i++){
      if (wordBank[i] === placeholder) index = i
    }
    hintList.length = wordBank.length
    hintList[index] = value
  }


  render() {
    const words = this.props.store.wordBank
    return (
      <div className="HintList">
        Create your hints!
        {

          this.props.store.wordBank.map((word, i)=> {
              if (word) return <input onChange={this.handleChange} placeholder={word} key={i}/>
          })
        }

      </div>
    );
  }
})

export default HintList;
