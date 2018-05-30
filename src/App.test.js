import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainStore from './mainStore'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={ MainStore }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
