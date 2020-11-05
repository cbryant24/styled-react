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


  return (
    <ErrorBoundary>
      <Div bg="black" height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
        <Div
          fontSizeModule={[1,2,3,4]}
          mx={[1,2,3,4]}
          py={[1,null,2,null,3]}
        >
          Color Changed
        </Div>
      </Div>
    </ErrorBoundary>
  );
};

export default App;
