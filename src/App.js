import React from 'react';
import {
  Div,
} from '@cbryant24/styled-react';
import { continousAnimation } from './style/animation';
import Title from './Title';

const App = () => {

  const customAnimation = {
    in: {
      '0%': { opacity: 0 },
      '10%': { opacity: .75 },
      '100%': { opacity: 1 }
    },
    duration_in: 30
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
    <Div bg="black" height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
      <Div width="20vw" height="20vh" bg="red" animation={customAnimation}>Hello World</Div>
      <Div themeStyle={["newAnimationStyle", "marginLarge"]}>Goodbye World</Div>
      <Div 
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
      <Title/>
    </Div>
  );
};

export default App;
