import React from 'react';
import { Link } from 'react-router-dom';
import { Div, createLink } from '@cbryant24/styled-react';

const App = () => {
  const StyledLink = createLink(Link);

  return (
    <Div themeStyle={'linkStyle'} width="20rem" height="20rem" backgroundColor="black">
      <StyledLink fontSize={[2]} color="white" to="/home" >Home</StyledLink>
    </Div>
  )
}

export default App;