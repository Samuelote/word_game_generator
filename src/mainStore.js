import { action, extendObservable } from 'mobx'

const Word = (word, added) => {
  return {
    added,
    word
  }
}

export class MainStore {
  constructor() {
    extendObservable(this, {
      //unamed keys are observables

      //observables
      wordBank: [],
      autoAdd: false,
      puzzleType: 'WordSearch',

      //actions
      addWord: action((nw) => this.wordBank.push(nw)),
      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd),
      setPuzzleType: action((pt) => this.puzzleType = pt)
    })
  }
}

export default new MainStore
