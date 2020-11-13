import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './components/AppContainer/AppContainer';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
