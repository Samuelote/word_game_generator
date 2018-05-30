import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MainStore from './mainStore'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App store={MainStore}/>, document.getElementById('root'))
registerServiceWorker()
