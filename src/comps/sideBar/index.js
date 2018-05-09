import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CrossWord from '../../assets/crossWord.png'
import WordSearch from '../../assets/WordSearch.png'
import './style.css'

const buttons = [{n:'Save', g: 'save'}, {n:'Export', g: 'export' }, {n:'WordSearch', g:'search', p: true}, {n:'CrossWord', g:'plus', p: true}]

const SideBar = observer(class SideBar extends Component {
  constructor(){
    super();
    this.state = {
      toggle: true,
      mode: 'Auto mode',
      puzzleType: 'Word Search'
    }

    this.handleClicks = this.handleClicks.bind(this)
  }
  componentDidMount(){
    this.toggleType()
  }

  componentDidMount() {
    document.querySelector('.WordSearch').classList.add('ToggleOn')
  }

  handleClicks(e) {
    const name = e.target.classList[0]
    switch(name){
      case 'Save':
        break
      case 'Export':
        break
      case 'ModeText':
        this.props.store.toggleAutoAdd()
        break
      case 'WordSearch':
      case 'CrossWord':
        this.toggleType(name)
        break
      default:
        console.log(name)
    }
  }

  toggleType(name) {
    const other = name === 'WordSearch' ? 'CrossWord' : 'WordSearch'
    document.querySelector('.' + name).classList.add('ToggleOn')
    document.querySelector('.' + other).classList.remove('ToggleOn')
    this.props.store.setPuzzleType(name)
  }

  renderSideButtons(arr) {
    return arr.map(el => (
      <div key={el.n} className={`${el.n} Button`}>
        <div className={`glyphicon ${!el.p ? "glyphicon-" + el.g : ""}`}>
          {
            (el.n == 'WordSearch' || el.n == 'CrossWord')
              ? (el.n == 'WordSearch')
                ? <img alt={el.n} src={WordSearch}/>
                : <img alt={el.n} src={CrossWord}/>
              : ""
          }
        </div>
        <div className='tooltip'>{el.n}</div>
      </div>
    ))
  }

  renderMode() {
    const { autoAdd } = this.props.store
    return(
      <div className='Button'>
        <div className='ModeText'>
            { autoAdd ? 'Auto' : 'Edit' }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Container">
        <div className='SideBar' onClick={this.handleClicks}>
          { this.renderSideButtons(buttons) }
          { this.renderMode() }
        </div>
      </div>
    );
  }
})

export default SideBar;
