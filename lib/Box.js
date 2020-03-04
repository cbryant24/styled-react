import React from 'react';
import styled from 'styled-components';
import systemStyledCSS from '@styled-system/css';
import { css, keyframes } from 'styled-components';

import {
  ALL,
  addPseudo,
  filterProps,
  addThemeStyle,
  addCssProperties
} from './utils';
import { getAnimation } from './animations';

// base element for removing all css props to ensure proper html attributes and
// changing the element type if prop `isA` is passed
const Base = props => {
  const { isA, ...newProps } = props;
  const next = filterProps(newProps);
  const type = isA || 'div';
  // TODO: Check if issue with children being passed here
  const element = React.createElement(type, next, props.children);
  return element;
};

// base Box element which all other elements inherit to allow css props and theme styling
const Box = styled(Base)(
  {
    boxSizing: 'border-box',
    minWidth: 0
  },
  // add css properties not apart of styled-system library
  props => addCssProperties(props),
  // add all styled-system and customed styled-system css properties
  ALL,
  props => {
    const { animation, before, after, children, ...restProps } = props;
    return props.pseudo ? addPseudo(restProps) : null;
  },
  props => {
    if (!props.animation) return;
    const animationProperties = getAnimation(props);
    const animationKeyframes = keyframes`${animationProperties.animation}`;

    return css`
      animation-name: ${animationKeyframes};
      animation-duration: ${animationProperties.duration};
      animation-iteration-count: ${animationProperties.iteration};
      animation-timing-function: ${animationProperties.animationTimingFunction};
      animation-direction: ${animationProperties.animationDirection};
      animation-fill-mode: ${animationProperties.animationFillMode};
      animation-play-state: running;
    `;
  },
  props => {
    if (!props.pseudo || !props.before) return;

    const { animation, content, ...beforeProps } = props.before;

    // styled-system before pseudo element object to css conversion
    return systemStyledCSS({
      '&::before': {
        content: JSON.stringify(content),
        ...beforeProps
      }
    });
  },

  props => {
    if (!props.pseudo || !props.after) return;
    const { animation, content, ...afterProps } = props.after;
    // styled-system after pseudo element object to css conversion
    return systemStyledCSS({
      '&::after': {
        content: JSON.stringify(content),
        ...afterProps
      }
    });
  },

  props => {
    if (!props.pseudo || !props.before || !props.before.animation) return;

    const animationProperties = getAnimation(props.before);
    // create animation for before pseudo selector
    return css`
      ::before {
        animation-name: ${animationProperties.animation};
        animation-duration: ${animationProperties.duration};
        animation-iteration-count: ${animationProperties.iteration};
        animation-timing-function: ${animationProperties.animationTimingFunction};
        animation-direction: ${animationProperties.animationDirection};
        animation-fill-mode: ${animationProperties.animationFillMode};
        animation-play-state: running;
      }
    `;
  },

  props => {
    if (!props.pseudo || !props.after || !props.after.animation) return;

    const animationProperties = getAnimation(props.after);
    // create animation for after pseudo selector
    return css`
      ::after {
        animation-name: ${animationProperties.animation};
        animation-duration: ${animationProperties.duration};
        animation-iteration-count: ${animationProperties.iteration};
        animation-timing-function: ${animationProperties.animationTimingFunction};
        animation-direction: ${animationProperties.animationDirection};
        animation-fill-mode: ${animationProperties.animationFillMode};
        animation-play-state: running;
      }
    `;
  },
  addPseudo,
  props => (props.themeStyle ? addThemeStyle(props) : '')
);

export default Box;
