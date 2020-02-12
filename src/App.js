import React from 'react';
import { Link } from 'react-router-dom';
import {
  Div,
  createLink,
  Button,
  ThemeProvider
} from '@cbryant24/styled-react';
import theme from './theme';

const App = () => {
  const StyledLink = createLink(Link);

  return (
    <ThemeProvider theme={theme}>
      <Div>
        <Div
          width="20rem"
          height="20rem"
          backgroundColor="black"
          themeStyle={['']}
        >
          <StyledLink
            animation={{
              continuous: {
                from: { opacity: 0 },
                to: { opacity: 1 }
              },
              duration_continuous: 2
            }}
            themeStyle="linkStyle"
            to="/home"
          >
            Home
          </StyledLink>
          <Button
            themeStyle={['buttonSmall', 'marginSmall']}
            remove={['color', 'm']}
            color="yellow"
            m="2em"
          >
            Click Me
          </Button>
        </Div>
      </Div>
    </ThemeProvider>
  );
};

export default App;
