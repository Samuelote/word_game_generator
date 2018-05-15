import { action, extendObservable } from 'mobx'
import crosswordGenerator from './models/crosswordGenerator'
import wordSearchGenerator from './models/wordSearchGenerator'


const testWords = [
  'TABULAR',
  'HAZARD',
  'ADDITIONALTRANSPORTATION',
  'DIGITIZE',
  'FREEFORM',
  'ELIGIBLE',
  'CREATESTUDENT',
  'RUN',
  'ROUTE',
  'STOPSERVICE',
  'ADVANCEDSEARCH',
  'TRANSPORTATIONNEEDS',
  'STUDENTTRIP',
  'ANCHORSCHOOL',
  'CLEAR',
  'WORKINGSET'
]

export class MainStore {
  constructor() {
    extendObservable(this, {
      //unamed keys are observables

      //observables
      wordMap: new Map(),
      wordBank: [],
      crossword: {plantedWords: [], mtrx: [], top:0},
      wordsearch: [],
      autoAdd: false,
      puzzleType: 'WordSearch',


      //actions
      deleteWord: action ((e)=>{
        console.log(e)
      }),
      addWord: action((nw, loc) => {
        this.wordMap.set(loc, nw.toUpperCase())
        this.wordBank.push(nw.toUpperCase())
        if (this.autoAdd) this.regenPuzzle('CrossWord')
      }),

      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),

      setPuzzleType: action((pt) => this.puzzleType = pt),

      regenPuzzle: action((name) => {
        (name === 'WordSearch') ? this.wordsearch = wordSearchGenerator(this.wordBank) :
        this.crossword = crosswordGenerator(this.wordBank)
      })
    })
  }
}

export default new MainStore()
