import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ThemeProvider, ModalProvider } from '@cbryant24/styled-react';
import App from './App';
import theme from './style/theme';

const squareButton = {
  display: "inline-block",
  boxShadow: "none",
  backgroundColor: "red",
  textDecoration: "none",
  transition: "box-shadow 0.125s ease-out 0s",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "red",
  px: [1, 2],
  py: [1, 2],
}

const largeButton = {
  px: [2, 3],
  py: [2, 3],
  color: 'blue',
  backgroundColor: "yellow"
}

const newThemeVals = {
  colors: {
    primary: '#FFD300'
  },
  breakpoints: ['30em', '40em', '50em', '60em']
}

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
