import { action, extendObservable } from 'mobx'
import crosswordGenerator from './models/crosswordGenerator'


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
      wordBank: [],
      crossword: {mtrx: [], top:0},
      autoAdd: false,
      puzzleType: 'WordSearch',

      //actions
      addWord: action((nw) => {
        this.wordBank.push(nw)
        if (this.autoAdd) this.regenCrossword()
      }),

      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),
      setPuzzleType: action((pt) => this.puzzleType = pt),

      regenCrossword: action(() => {
        this.crossword = crosswordGenerator(testWords)
      })
    })
  }
}

export default new MainStore()
