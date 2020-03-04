import React from 'react';
import styled from 'styled-components';
import cleanElement from 'clean-element';
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

const createLink = link => {
  const LinkBase = props => {
    const next = filterProps(props);
    const Base = React.createElement(link, next);
    return Base;
  };

  return styled(LinkBase)(
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

      // styled-componets animation object to css conversion
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
};

export default createLink;
