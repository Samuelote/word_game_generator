import toBeType from 'jest-tobetype'

import crosswordGenerator from '../crosswordGenerator'

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

expect.extend(toBeType)

test("It returns an array", () => {
  expect(crosswordGenerator(testWords)).toBeType('array')
})
