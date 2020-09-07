import React from 'react';
import { system } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import styledCSS from '@styled-system/css';
import { omit } from 'lodash';

import { cssListObj, pseudoClasses, pseudoElements } from './cssHelpers';

// add css properties not included in styled-system library see styled Box
export const addCssProperties = props => {
  const cssProps = {};
  for (let key in props) {
    if (cssListObj[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

//TODO: Add theming access for pseudo elements
// checks props passed from component if psuedo elements exist except for before and after which are handled specially
export const addPseudo = (props, isThemeStyled = false) => {
  if (!props.pseudo) return;

  const elementProps = Object.getOwnPropertyNames(props),
    pseudoClassProps = elementProps.filter(prop =>
      pseudoClasses.includes(prop)
    ),
    pseudoElementProps = elementProps.filter(prop =>
      pseudoElements.includes(prop)
    ),
    pseudo = {};

  if (!pseudoClassProps && !pseudoElementProps) return;

  pseudoClassProps.forEach(
    pseudoType => (pseudo[`:${pseudoType}`] = props[pseudoType])
  );
  pseudoElementProps.forEach(
    pseudoType => (pseudo[`::${pseudoType}`] = props[pseudoType])
  );

  //TODO: add hyphenated pseudo elements/classes pseudoClasses and pseudoElements
  //add hyphenated pseudo elements and classes if present in props
  if (pseudoClassProps.indexOf('focusWithin') >= 0)
    pseudo[':focus-within'] = pseudo[':focusWithin'];

  if (pseudoElementProps.indexOf('firstLine') >= 0)
    pseudo['::first-line'] = pseudo['::firstLine'];

  if (pseudoElementProps.indexOf('firstLetter') >= 0)
    pseudo['::first-letter'] = pseudo['::firstLetter'];

  // if themeStyled return plain pseudo object to invoked function for theme styling changes
  if (isThemeStyled) return pseudo;

  // @styled-system/css converts object written style to css with theming access
  return styledCSS({ ...pseudo });
};

//TODO: DRY addThemeStyle && addThemeStyleAnimation && addThemeStylePsuedoAnimation possibly returning an object with the three necesary values and destructuring them off

// hooks into theme and adds appropriate styling determined by string or array of strings of appropriate theme objects
export const addThemeStyle = (props, themeStyleAnimation) => {
  if (!props.themeStyle) return;

  if (Array.isArray(props.themeStyle)) {
    let combinedStyle = {};

    props.themeStyle.forEach(themeProp => {
      const themeVals = themeGet(themeProp)(props);
      combinedStyle = { ...combinedStyle, ...themeVals };
    });

    if (combinedStyle.pseudo)
      combinedStyle = { ...combinedStyle, ...addPseudo(combinedStyle, true) };

    let { animation, ...combinedStylesNoAnimation } = combinedStyle;

    if (props.remove)
      combinedStylesNoAnimation = removeStyles(
        combinedStylesNoAnimation,
        props.remove
      );

    //TODO: ADD type check for array possibly typescript...
    // IF ONLY SPECIFIC PROPS ARE NEEDED OFF THEMESTYLE FIND THOSE AND SET STYLE
    if(props.filterThemeStyles) {
      let filteredStyle = {};
      props.filterThemeStyles.forEach( cssProp => {
        filteredStyle = {...filteredStyle, [cssProp]: combinedStylesNoAnimation[cssProp] }
      });
      
      combinedStylesNoAnimation = filteredStyle;
    }

    return {
      styledCSS: () => styledCSS(combinedStylesNoAnimation),
      animation
    }
  }

  let themedStyles = themeGet(props.themeStyle)(props);
  try {
    if (themedStyles.pseudo)
      themedStyles = { ...themedStyles, ...addPseudo(themedStyles, true) };
  } catch (err) {
    return err;
  }

  // allows for passage of special prop `remove` to remove styling for strict control over specific necessary css styling
  if (props.remove) themedStyles = removeStyles(themedStyles, props.remove);

  let { animation, ...themedStylesNoAnimation } = themedStyles;
  themeStyleAnimation = animation; 

  if(props.filterThemeStyles) {
    let filteredStyle = {};
    props.filterThemeStyles.forEach( cssProp => {
      filteredStyle = {...filteredStyle, [cssProp]: themedStylesNoAnimation[cssProp] }
    });
    
    themedStylesNoAnimation = filteredStyle;
  }

  return {
    styledCSS: () => styledCSS(themedStylesNoAnimation),
    animation
  };
};

//TODO: add another property for string/array and removal of styles to object version if remove is not null
// checks if the style is string or array then returns an object with themeStyle property for later parsing in
// addThemeStyle function  otherwise if object passes on to removeStyle for style removal
export const styleBuildRemove = (styles, remove) => {
  return typeof styles === 'string' || Array.isArray(styles)
    ? { themeStyle: styles, remove }
    : styles.themeStyle ?
    {...styles, remove }
    : remove ? 
    removeStyles(styles, remove)
    : { ...styles };
};

// remove styles from object takes array to remove multiple or string to remove one
// if no value for remove original styles returned
export const removeStyles = (styles, remove) => {
  let removedStyles = styles;

  if (Array.isArray(remove)) {
    remove.forEach((style, idx) => {
      const { [style]: removed, ...rest } = removedStyles;
      removedStyles = rest;
    });

    return removedStyles;
  }
  const { [remove]: removed, ...rest } = styles;
  removedStyles = rest;

  return removedStyles;
};

export const addProps = (component, props) => {
  if (!component || !props) return;

  if (Array.isArray(component)) {
    if(Array.isArray(props)) {
      const newComponentsArr = component.map( (component, idx) => {
        return React.cloneElement( component, { ...props[idx]})
      })

      return newComponentsArr;
    }
    const newComponents = component.map( component => {
      return React.cloneElement( component, { ...props });
    })
    return newComponents;
  }

  const newComponent = React.cloneElement(component, { ...props })

  return newComponent;
}

export const filterProps = props => {
  // debugger
  return omit(props, [
    'theme',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'color',
    'bg',
    'fill',
    'fontSize',
    'fontFamily',
    'fontStyle',
    'f',
    'image',
    'maxWidth',
    'bold',
    'regular',
    'caps',
    'wrap',
    'size',
    'height',
    'boxShadowSize',
    'remSizes',
    'templateRows',
    'templateColumns',
    'alignSelf',
    'justifySelf',
    'gridColumn',
    'gridRow',
    'alignContent',
    'gridGap',
    'textTransform',
    'minHeight',
    'flexDirection',
    'borderColor',
    'justifyContent',
    'borderRadius',
    'borderWidth',
    'bgAnimation',
    'backgroundColor',
    'textShadow',
    'zIndex',
    'backgroundImage',
    'backgroundSize',
    'transformOrigin',
    'alignItems',
    'boxShadow',
    'fontSmooth',
    'bgAnimation',
    'windowBorder',
    'bgAnimationGlow',
    'textAlign',
    'flexGrow',
    'foucsBoxShadowColor',
    'focusColor',
    'borderFocus',
    'maxHeight',
    'foucsBoxShadowColor',
    'focusColor',
    'borderFocus',
    'error',
    'minHeight',
    'fontSmooth',
    'clipPath',
    'transformOrigin',
    'transform',
    'content',
    'all',
    'animation',
    'animationDelay',
    'animationDirection',
    'animationDuration',
    'animationFillMode',
    'animationIterationCount',
    'animationName',
    'animationPlayState',
    'animationTimingFunction',
    'appearance',
    'azimuth',
    'backdropFilter',
    'backfaceVisibility',
    'backgroundAttachment',
    'backgroundBlendMode',
    'backgroundClip',
    'backgroundOrigin',
    'backgroundPositionX',
    'backgroundPositionY',
    'blockSize',
    'borderBlockEnd',
    'borderBlockEndColor',
    'borderBlockEndStyle',
    'borderBlockEndWidth',
    'borderBlockStart',
    'borderBlockStartColor',
    'borderBlockStartStyle',
    'borderBlockStartWidth',
    'borderBottomColor',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderBottomStyle',
    'borderBottomWidth',
    'borderCollapse',
    'borderImage',
    'borderImageOutset',
    'borderImageRepeat',
    'borderImageSlice',
    'borderImageSource',
    'borderImageWidth',
    'borderInlineEnd',
    'borderInlineEndColor',
    'borderInlineEndStyle',
    'borderInlineEndWidth',
    'borderInlineStart',
    'borderInlineStartColor',
    'borderInlineStartStyle',
    'borderInlineStartWidth',
    'borderLeftColor',
    'borderLeftStyle',
    'borderLeftWidth',
    'borderRightColor',
    'borderRightStyle',
    'borderRightWidth',
    'borderSpacing',
    'borderTopColor',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderTopStyle',
    'borderTopWidth',
    'bottom',
    'boxAlign',
    'boxDecorationBreak',
    'boxDirection',
    'boxFlex',
    'boxFlexGroup',
    'boxLines',
    'boxOrdinalGroup',
    'boxOrient',
    'boxPack',
    'boxSizing',
    'breakAfter',
    'breakBefore',
    'breakInside',
    'captionSide',
    'caretColor',
    'clear',
    'clip',
    'columnCount',
    'columnFill',
    'columnRule',
    'columnRuleColor',
    'columnRuleStyle',
    'columnRuleWidth',
    'columnSpan',
    'columnWidth',
    'columns',
    'contain',
    'counterIncrement',
    'counterReset',
    'cursor',
    'direction',
    'displayInside',
    'displayList',
    'displayOutside',
    'emptyCells',
    'filter',
    'flexFlow',
    'float',
    'font',
    'fontFeatureSettings',
    'fontKerning',
    'fontLanguageOverride',
    'fontVariationSettings',
    'fontSizeAdjust',
    'fontStretch',
    'fontSynthesis',
    'fontVariant',
    'fontVariantAlternates',
    'fontVariantCaps',
    'fontVariantEastAsian',
    'fontVariantLigatures',
    'fontVariantNumeric',
    'fontVariantPosition',
    'gridColumnEnd',
    'gridColumnStart',
    'gridRowEnd',
    'gridRowStart',
    'gridTemplate',
    'hyphens',
    'imageOrientation',
    'imageRendering',
    'imageResolution',
    'imeMode',
    'initialLetter',
    'initialLetterAlign',
    'inlineSize',
    'isolation',
    'lineBreak',
    'lineHeightStep',
    'listStyle',
    'listStyleImage',
    'listStylePosition',
    'listStyleType',
    'marginBlockEnd',
    'marginBlockStart',
    'marginInlineEnd',
    'marginInlineStart',
    'markerOffset',
    'mask',
    'maskClip',
    'maskComposite',
    'maskImage',
    'maskMode',
    'maskOrigin',
    'maskPosition',
    'maskRepeat',
    'maskSize',
    'maskType',
    'maxBlockSize',
    'maxInlineSize',
    'minBlockSize',
    'minInlineSize',
    'mixBlendMode',
    'objectFit',
    'objectPosition',
    'offset',
    'offsetAnchor',
    'offsetBlockEnd',
    'offsetBlockStart',
    'offsetInlineEnd',
    'offsetInlineStart',
    'offsetDistance',
    'offsetPath',
    'offsetPosition',
    'offsetRotate',
    'order',
    'orphans',
    'outline',
    'outlineColor',
    'outlineOffset',
    'outlineStyle',
    'outlineWidth',
    'overflow',
    'overflowClipBox',
    'overflowWrap',
    'overflowX',
    'overflowY',
    'padding',
    'paddingBlockEnd',
    'paddingBlockStart',
    'paddingInlineEnd',
    'paddingInlineStart',
    'pageBreakAfter',
    'pageBreakBefore',
    'pageBreakInside',
    'perspective',
    'perspectiveOrigin',
    'pointerEvents',
    'quotes',
    'resize',
    'rubyAlign',
    'rubyMerge',
    'rubyPosition',
    'scrollBehavior',
    'scrollSnapCoordinate',
    'scrollSnapDestination',
    'scrollSnapPointsX',
    'scrollSnapPointsY',
    'scrollSnapType',
    'scrollSnapTypeX',
    'scrollSnapTypeY',
    'shapeImageThreshold',
    'shapeMargin',
    'shapeOutside',
    'tabSize',
    'tableLayout',
    'textAlignLast',
    'textCombineUpright',
    'textDecoration',
    'textDecorationColor',
    'textDecorationLine',
    'textDecorationSkip',
    'textDecorationStyle',
    'textEmphasis',
    'textEmphasisColor',
    'textEmphasisPosition',
    'textEmphasisStyle',
    'textIndent',
    'textJustify',
    'textOrientation',
    'textOverflow',
    'textRendering',
    'textSizeAdjust',
    'textUnderlinePosition',
    'touchAction',
    'transformBox',
    'transformStyle',
    'transition',
    'transitionDelay',
    'transitionDuration',
    'transitionProperty',
    'transitionTimingFunction',
    'unicodeBidi',
    'userSelect',
    'verticalAlign',
    'visibility',
    'whiteSpace',
    'widows',
    'willChange',
    'wordBreak',
    'wordSpacing',
    'wordWrap',
    'writingMode',
    'font-size',
    'fontSize',
    'font-family',
    'fontFamily',
    'width',
    'height',
    'borderstyle',
    'borderStyle',
    'lineHeight',
    'letterSpacing',
    'margin',
    'display',
    'letter-spacing',
    'm',
    'mx',
    'my',
    'ml',
    'mr',
    'mb',
    'mt',
    'p',
    'px',
    'py',
    'pl',
    'pr',
    'border',
    'opacity',
    'border-radius',
    'borderBottom',
    'borderLeft',
    'borderRight',
    'borderTop',
    'background',
    'position',
    'flex-flow',
    'grid-row-start',
    'grid-column-start',
    'grid-row-end',
    'grid-column-end',
    'itemname',
    'focus',
    '::before',
    '::after',
    'fontSizeModule',
    'borderWidth',
    'cursor',
    'errors',
    'top',
    'left',
    'right',
    'bottom',
    'themeStyle',
    'remove',
    'options',
    'paddingLeft',
    'minWidth',
    'fontWeight',
    'before',
    'after',
    'flexWrap',
    'gridTemplateRows',
    'gridTemplateColumns',
    'backgroundRepeat',
    'backgroundPosition',
    'pseudo',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
    'paddingRight',
    'paddingLeft',
    'paddingTop',
    'paddingBottom',
    'focusWithin',
    'focuswithin',
    'hover',
    ':before',
    ':after',
    'gridColumnRows',
    'isA',
    'filterThemeStyles',
    'pb'
  ]);
};