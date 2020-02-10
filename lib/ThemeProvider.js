import React, { Fragment } from 'react';
import { ThemeProvider as Root } from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from './theme';

const ThemeProvider = ({ theme=defaultTheme, ...props }) => {
  // console.log('IM THE THEME')
  // theme.keyframes = keyframes;

  return (
    <Root
      theme={theme}
      {...props}
      children={<Fragment>{props.children}</Fragment>}
    />
  )
}

export default ThemeProvider
