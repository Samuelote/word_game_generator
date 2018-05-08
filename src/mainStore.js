import React from 'react'
import { computed, observable, action, extendObservable } from 'mobx'

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
      wordBank: {},
      autoAdd: false,

      //actions
      addWord: action((nw) => this.wordBank[nw] = Word(nw, this.autoAdd)),
      toggleAutoAdd: action(() => this.autoAdd = !this.autoAdd)

    })
  }
}

export default new MainStore
