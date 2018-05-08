import React, { Component } from 'react'
import { observer } from 'mobx-react'

const App = observer(class App extends Component {
  render() {
    console.log(this.props.store)
    return (
      <div className="App">
      </div>
    );
  }
})

export default App;
