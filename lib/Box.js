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

let themeStyleAnimation = false;

const createAnimation = (animation, psuedo=false) => {
  if (!animation) return;
  const animationProperties = getAnimation(animation);
  const animationKeyframes = () => keyframes`${animationProperties.animation}`;

  // ensuring if animation created locally does not carry over for each element
  clearLocalAnimation();
  return css`
    ${psuedo ? '::' + psuedo : ''}
    animation-name: ${animationKeyframes};
    animation-duration: ${animationProperties.duration};
    animation-iteration-count: ${animationProperties.iteration};
    animation-timing-function: ${animationProperties.animationTimingFunction};
    animation-direction: ${animationProperties.animationDirection};
    animation-fill-mode: ${animationProperties.animationFillMode};
    animation-play-state: running;
    ${psuedo ? '}': ''}
  `;
}

const clearLocalAnimation = () => themeStyleAnimation = false;

// base element for removing all css props to ensure proper html attributes and
// changing the element type if prop `isA` is passed
const Base = props => {
  const { isA, ...newProps } = props;
  const next = filterProps(newProps);
  const type = isA || 'div';

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
    return createAnimation(props.animation);
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
    return createAnimation(props.before.animation, 'before');
  },

  props => {
    if (!props.pseudo || !props.after || !props.after.animation) return;
    return createAnimation(props.aftr.animation, 'after');
  },
  addPseudo,
  props => (props.themeStyle ? () => {
    const { styledCSS, animation } = addThemeStyle(props, themeStyleAnimation);
    themeStyleAnimation = animation;
    return styledCSS();
  } : ''),
  props => {
    if (themeStyleAnimation && !props.animation) {
      return createAnimation(themeStyleAnimation)
    }
  }
);

export default Box;
