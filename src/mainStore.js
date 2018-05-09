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

      //actions
      addWord: action((nw) =>{
        this.wordBank.push(nw)
      }),
      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd)

    })
  }
}

export default new MainStore
