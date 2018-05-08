import React from 'react'
import ReactDOM from 'react-dom'
import crosswordGenerator, { genMatrix, findCrossPoints } from './crosswordGenerator'
import Crossword from './index'

const testWords = [
    'ADDITIONALTRANSPORTATION',
    'TABULAR',
    'HAZARD',
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
let m = crosswordGenerator(testWords)

describe('The crossword matrix', () => {
  it('Returns a matrix', () => {
    expect(m[0][0]).toBeDefined()
  })

})

describe('The crossword view', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Crossword />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
