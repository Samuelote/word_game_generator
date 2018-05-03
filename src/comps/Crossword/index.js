import React, { Component } from 'react'
import crosswordGenerator from './crosswordGenerator'
import './styles.css'

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

export default class Crossword extends Component {
  constructor() {
    super();
    this.state = {
      crossword: crosswordGenerator(testWords)
    }
  }

  renderCrossword() {
    return this.state.crossword.map((row, y) => row.map((cell, x) => (
      <div style={{ left: `${x}em`, top:`${y}em`}} className="CWCell">
        {cell}
      </div>
    )))
  }

  render() {
    return (
        <div className="CrosswordWrapper">
            { this.renderCrossword() }
        </div>
    )
  }
}
