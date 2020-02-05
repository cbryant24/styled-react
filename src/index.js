import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@cbryant24/styled-react';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, 
  document.getElementById('root')
);