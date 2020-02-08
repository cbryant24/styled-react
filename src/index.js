import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@cbryant24/styled-react';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>, 
  document.getElementById('root')
);