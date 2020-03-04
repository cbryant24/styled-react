import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider, ModalProvider } from '@cbryant24/styled-react';
import App from './App';
import theme from './style/theme';

ReactDOM.render(
  <Router>
    <ModalProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ModalProvider>
  </Router>,
  document.getElementById('root')
);
