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
      wordBank: testWords,
      crossword: {mtrx: [], top:0},
      wordsearch: [],
      autoAdd: false,
      puzzleType: 'WordSearch',


      //actions
      addWord: action((nw, loc) => {
        this.wordMap.set(loc, nw.toUpperCase())
        this.wordBank.push(nw.toUpperCase())
        if (this.autoAdd) this.regenCrossword()
      }),

      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),
      setPuzzleType: action((pt) => this.puzzleType = pt),

      regenCrossword: action(() => {
        this.crossword = crosswordGenerator(this.wordBank)
      }),
      regenWordSearch: action(() => {
        this.wordsearch = wordSearchGenerator(this.wordBank)
      })
    })
  }
}

export default new MainStore()
