import React, { Fragment } from 'react';
import { ThemeProvider as Root } from 'styled-components';
import defaultTheme from './theme';

const ThemeProvider = ({ theme=defaultTheme, ...props }) => {

  return (
    <Root
      theme={theme}
      {...props}
      children={<Fragment>{props.children}</Fragment>}
    />
  )
}

export default ThemeProvider
