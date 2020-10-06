import React, { Fragment } from 'react';
import { ThemeProvider as Root } from 'styled-components';
import { merge} from 'lodash';
import defaultTheme from './theme';

const ThemeProvider = ({ theme=defaultTheme, themeStyles={}, replaceTheme={}, ...props }) => {
  theme = merge({}, theme, themeStyles, replaceTheme);
  return (
    <Root
      theme={theme}
      {...props}
      children={<Fragment>{props.children}</Fragment>}
    />
  )
}

export default ThemeProvider
