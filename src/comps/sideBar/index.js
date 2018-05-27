import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CrossWord from '../../assets/crossWord.png'
import WordSearch from '../../assets/WordSearch.png'
import './style.css'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const buttons = [
  {n:'Export', g: 'export' },
  {n:'WordSearch', g:'search', p: true},
  {n:'CrossWord', g:'plus', p: true}
]

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
    this.toggleType('WordSearch')
  }

  write(){
    for (let i in this.props.store.wordsearch.length){
      if (i % 40 === 0) {
        console.log(this.props.store.wordsearch[i])
        this.props.store.wordsearch[i] = this.props.store.wordsearch[i]+'\n'
      }
    }
    var docDefinition = { content: this.props.store.wordsearch.toString().toUpperCase().split(',').join('') };
    pdfMake.createPdf(docDefinition).download();
    // pdfMake.createPdf(docDefinition).open();

  }

  handleClicks(e) {
    const name = e.target.classList[0]
    switch(name){
      case 'Save':
        break
      case 'Export':
        this.write()
        break
      case 'ModeText':
        this.props.store.toggleAutoAdd()
        break
      case 'WordSearch':
        this.toggleType(name)
        break
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
            (el.n === 'WordSearch' || el.n === 'CrossWord')
              ? (el.n === 'WordSearch')
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
      <div className='ModeText Button'>
        <div>
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
