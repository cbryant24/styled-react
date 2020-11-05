import React from 'react';
import {
  Div, FadeAnimations, Button
} from '@cbryant24/styled-react';
import { continousAnimation } from './style/animation';
import Title from './Title';
import ErrorBoundary from './ErrorBoundary';

// TODO: ADD ALIAS's FOR CONTINUOUS ANIMATION FOR MISSPELLING
const App = () => {

  const customAnimation = {
    continuous: {
      from: { opacity: 1 },
      to: { opacity: 0 }
    },
    duration_continuous: 5,
    iteration: 2,
    animation_fill_mode: 'forwards'
  };

  // const continousAnimation = {
  //   continuous: {
  //     from: { opacity: 0 },
  //     to: { opacity: 1 }
  //   },
  //   duration_continuous: 3,
  //   animation_direction: 'alternate-reverse'
  // }
  
  // debugger;
  return (
    <ErrorBoundary>
      <Div bg="black" height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
        {/* <Div width="20vw" height="20vh" bg="red" animation={customAnimation} textTransform="uppercase" display="flex" justifyContent="center" alignItems="center">Hello World</Div> */}
        {/* <Div themeStyle={["newAnimationStyle", "marginLarge"]}>Goodbye World</Div> */}
        <Div
          fontSizeModule={[1,2,3,4]}
          mx={[1,2,3,4]}
          py={[1,null,2,null,3]}
        >
          Color Changed
        </Div>
        {/* <Div 
          pseudo
          hover={{fontSize: '2.4rem', color: 'blue', height: '200px', width: '300px'}} 
          backgroundColor="yellow" 
          color="orange" 
          width="200px"
          height="100px"
          transition="font-size 4s linear, height 2s linear, width 3s linear"
        >
          Im The Pseudo
        </Div>
        <Title/> */}
      </Div>
    </ErrorBoundary>
  );
};

export default App;
