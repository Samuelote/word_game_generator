import { action, extendObservable } from 'mobx'
import crosswordGenerator from './models/crosswordGenerator'
import wordSearchGenerator from './models/wordSearchGenerator'
import writeSearchPdf from './models/writeSearchPdf'
import writeCrossPdf from './models/writeCrossPdf'


const testWords = [
  // 'OVEROBSESSIONIST',
  // 'ANCHORSCHOOL',
  // 'MUTILATION',
  // 'EXPLOSION',
  // 'LEVERAGE',
  // 'TABULAR',
  // 'CLOSURE',
  // 'FISSURE',
  // 'TROUBLE',
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
        if (this.wordBank.length < 20){
          if (this.wordBank.length > 3) this.regenPuzzle(this.puzzleType)
          // this.wordMap.set(loc, nw.toUpperCase())
          this.wordBank.push(nw.toUpperCase())
          if (this.autoAdd) this.regenPuzzle('CrossWord')

          //Scrolls to bottom automatically
          const el = document.querySelector('.Words')
          el.scrollTop = el.scrollHeight
        } else this.showError('Maximum word count reached')
      }),

      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),

      setPuzzleType: action((pt) => this.puzzleType = pt),

      regenPuzzle: action((name) => {
        (name === 'WordSearch')
          ? this.wordsearch = wordSearchGenerator(this.wordBank)
          : this.crossword  = crosswordGenerator(this.wordBank)
      }),
      write: action((name) => {
        if (!this.title) this.showError('Must Insert Title')
        else if (name === 'WordSearch' && this.wordsearch.length){
          writeSearchPdf(this.wordsearch, this.title, [...this.wordBank])
        }
        else if (name === 'CrossWord' && this.crossword.mtrx.length){
          if (this.hintList.length != this.wordBank.length) this.showError('Must fill out hint list')
          else if (this.hintList.includes(undefined)) this.showError('Must fill out every hint')
          else writeCrossPdf(this.crossword, this.title, this.hintList)
        }
        else {
          alert('Draw puzzle before exporting')
        }
      }),
      showError: action((msg)=>{
        const el = document.querySelector('.Error')
        const child = document.querySelector('.msg')
        const child2 = document.querySelector('.ErrorChildren')
        el.style.visibility = 'visible'
        el.style.height = '100%'
        child2.style.height = '200px'
        child2.style.opacity = 1
        child2.style.top = '0px'
        child.innerText = msg
        el.style.animation = 'blinker .3s 1 forwards'
      })
    })
  }
}

export default new MainStore()
