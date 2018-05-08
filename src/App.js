import React, { Component } from 'react'
import { observer } from 'mobx-react'
import WordSearch from './comps/wordSearch'
import AddWordBar from './comps/AddWordBar'


const App = observer(class App extends Component {
  render() {
    const {store} = this.props
    return (
      <div className="App">
        <AddWordBar store={store} />
      </div>
    );
  }
})

export default App;
