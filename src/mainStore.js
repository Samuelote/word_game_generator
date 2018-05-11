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
      wordBank: [],
      crossword: [],
      wordsearch: [],
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
      }),
      regenWordSearch: action(() => {
        this.wordsearch = wordSearchGenerator(testWords)
      })
    })
  }
}

export default new MainStore()
