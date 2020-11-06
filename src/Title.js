import React from 'react';
import {
  Div
} from '@cbryant24/styled-react';
import { continousAnimation } from './style/animation';

const Title = () => {

  const customAnimation = {
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    delay_between: 4,
    out: {
      from: { 'background-color': 'red' },
      to: { 'background-color': 'yellow' }
    },
    duration_out: 3,
    duration_in: 2
  };

  return (
    <Div bg="black" height="200px" width="400px" display="flex" justifyContent="center" alignItems="center">
      <Div themeStyle="animationStyle">Hello Old Friend</Div>
    </Div>
  );
};

export default Title;
