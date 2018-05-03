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

describe('findCrossPoints', () => {
  it('With args CLEAR and ADVANCEDSEARCH -> should return an array of arrays where [w1 index, w2 index] can line up', () => {
    expect(findCrossPoints('CLEAR', 'ADVANCEDSEARCH')).toEqual(
      expect.arrayContaining([[0, 5], [0, 12], [2, 6], [2, 9], [3, 0], [3, 10]])
    )
  })
})

describe('genMatrix', () => {
  let gm = genMatrix(10)
  it('With args(10) it returns a matrix 10 cells high and 20 cells wide', () => {
    expect(gm).toHaveLength(10)
    expect(gm[0]).toHaveLength(15)
  })
})

describe('The crossword matrix', () => {
  it('Returns a matrix', () => {
    expect(m[0][0]).toBeDefined()
  })

  it('The matrix is 1.5 * the longest word wide and 1 * the longest word tall', () => {
    let lWordLen = testWords[0].length
    expect(m).toHaveLength(lWordLen)
    expect(m[0]).toHaveLength(Math.ceil(lWordLen * 1.5))
  });

  // it('uses all the words in the array', () => {
  //   let letters = m.reduce((a, b) => a.concat(b));
  //   let tletters = testWords.join('').split('');
  //   for (let i=0;i<tletters.length;i++) {
  //     expect(letters.indexOf(tletters[i])).toBeGreaterThanOrEqual(0);
  //   }
  // })
})

describe('The crossword view', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Crossword />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
