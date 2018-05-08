import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const SideBar = observer(class App extends Component {
  constructor(){
    super();
    this.state = {
      toggle: true
    }
  }


  toggleMode() {
    if (this.state.toggle) document.querySelector('.ModeText').innerText = 'Edit mode';
    else document.querySelector('.ModeText').innerText = 'Auto mode';

    this.setState({toggle: !this.state.toggle})

  }
  render() {
    return (
      <div className="Container">
        <div className='SideBar'>
          <div alt='save' className='glyphicon glyphicon-save Save Button'><div className='tooltip'>Save</div></div>
          <div className='glyphicon glyphicon-export Export Button'><div className='tooltip'>Export</div></div>
          <div className='glyphicon glyphicon-search WordSearch Button'><div className='tooltip'>Word Search</div></div>
          <div className='glyphicon glyphicon-plus CrossWord Button'><div className='tooltip'>Crossword</div></div>
          <div className='SliderButton'>
            <div className='ModeText'>Auto mode</div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" onClick={this.toggleMode.bind(this)}></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
})

export default SideBar;
