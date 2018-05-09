import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const SideBar = observer(class App extends Component {
  constructor(){
    super();
    this.state = {
      toggle: true,
      mode: 'Auto mode',
      puzzleType: 'cross'
    }
  }

  toggleMode() {
    if (this.state.toggle) this.setState({mode: 'Edit mode'})
    else this.setState({mode: 'Auto mode'})
    this.setState({toggle: !this.state.toggle})
  }

  toggleType(e) {
    if (e.target.innerText === 'Word Search') {
      document.querySelector('.WordSearch').style.background = 'rgba(0,0,0,.5)'
      document.querySelector('.CrossWord').style.background = '#379683'
    } else {
      document.querySelector('.CrossWord').style.background = 'rgba(0,0,0,.5)'
      document.querySelector('.WordSearch').style.background = '#379683'
    }

    this.setState({puzzleType: !this.state.puzzleType})
  }
  render() {
    return (
      <div className="Container">
        <div className='SideBar'>
          <div alt='save' className='Save Button'>
            <div className='glyphicon glyphicon-save'></div>
            <div className='tooltip'>Save</div>
          </div>

          <div className='Export Button'>
            <div className='glyphicon glyphicon-export'></div>
            <div className='tooltip'>Export</div>
          </div>
          <div id='WordSearch'className='WordSearch Button' onClick={this.toggleType.bind(this)}>
            <div className='glyphicon glyphicon-search'></div>
            <div className='tooltip'>Word Search</div>
          </div>
          <div id='CrossWord' className='CrossWord Button' onClick={this.toggleType.bind(this)}>
            <div className='glyphicon glyphicon-plus'></div>
            <div className='tooltip'>Cross Word</div>
          </div>
          <div className='SliderButton Button' onClick={this.toggleMode.bind(this)}>
            <div className='ModeText'>{this.state.mode}</div>
          </div>
        </div>
      </div>
    );
  }
})

export default SideBar;
