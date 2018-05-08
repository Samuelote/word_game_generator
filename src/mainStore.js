import React from 'react'
import { computed, observable, action, extendObservable } from 'mobx'


export class MainStore {
  constructor() {
    extendObservable(this, {
      //unamed keys are observables
      test: 'this.is.a.test'



    })
  }
}

export default new MainStore
