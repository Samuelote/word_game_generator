import { action, extendObservable } from 'mobx'
import crosswordGenerator from './models/crosswordGenerator'
import wordSearchGenerator from './models/wordSearchGenerator'
import writeSearchPdf from './models/writeSearchPdf'
import writeCrossPdf from './models/writeCrossPdf'


const testWords = [
  'OVEROBSESSIONIST',
  'ANCHORSCHOOL',
  'MUTILATION',
  'EXPLOSION',
  'LEVERAGE',
  'TABULAR',
  'CLOSURE',
  'FISSURE',
  'TROUBLE',
  // 'ILLUSIONISITIC',
  // 'ACRONOPHOBIA',
  // 'APHASIA',
  // 'ATTALATION',
  // 'ASPPHYXIATION',
  // 'INTROPOLATION',
  // 'ENTROY'
]


export class MainStore {
  constructor() {
    extendObservable(this, {
      //unamed keys are observables

      //observables
      wordBank: testWords,
      crossword: { plantedWords: [], mtrx: [], top:0 },
      wordsearch: [],
      autoAdd: false,
      puzzleType: 'WordSearch',
      title: '',
      hintList: new Array(),

      //actions
      deleteWord: action ((e)=>{
        let word = e.innerText
        const index = this.wordBank.indexOf(word)
        this.wordBank.splice(index,1)
      }),

      addWord: action((nw, loc) => {
        // this.wordMap.set(loc, nw.toUpperCase())
        this.wordBank.push(nw.toUpperCase())
        if (this.autoAdd) this.regenPuzzle('CrossWord')

        //Scrolls to bottom automatically
        const el = document.querySelector('.Words')
        el.scrollTop = el.scrollHeight
      }),

      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),

      setPuzzleType: action((pt) => this.puzzleType = pt),

      regenPuzzle: action((name) => {
        (name === 'WordSearch')
          ? this.wordsearch = wordSearchGenerator(this.wordBank)
          : this.crossword  = crosswordGenerator(this.wordBank)
      }),
      write: action((name) => {
        if (!this.title) alert('Please add a title for your puzzle.')
        else if (name === 'WordSearch' && this.wordsearch.length){
          writeSearchPdf(this.wordsearch, this.title)
        }
        else if (name === 'CrossWord' && this.crossword.mtrx.length){
          if (this.hintList.length != this.wordBank.length) alert('Please fill out of the hints')
          else if (this.hintList.includes(undefined)) alert('Please fill out all of the hints')
          else writeCrossPdf(this.crossword, this.title, this.hintList)
        }
        else {
          alert('Draw puzzle before exporting')
        }
      })
    })
  }
}

export default new MainStore()
