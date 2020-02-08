import { system } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import styledCSS from '@styled-system/css';

import { cssListObj, pseudoClasses, pseudoElements } from './cssHelpers';


// add css properties not included in styled-system library see styled Box
export const addCssProperties = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssListObj[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

//TODO: Add theming access for pseudo elements
// checks props passed from component if psuedo elements exist except for before and after which are handled specially
export const addPseudo = (props, isThemeStyled=false) => {
  if (!props.pseudo) return;

  const elementProps  = Object.getOwnPropertyNames(props),
  pseudoClassProps    = elementProps.filter( prop => pseudoClasses.includes(prop)),
  pseudoElementProps  = elementProps.filter( prop => pseudoElements.includes(prop)),
  pseudo              = {};

  if (!pseudoClassProps && !pseudoElementProps) return;

  pseudoClassProps.forEach( pseudoType => pseudo[`:${pseudoType}`] = props[pseudoType] );
  pseudoElementProps.forEach( pseudoType => pseudo[`::${pseudoType}`] = props[pseudoType]);

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
}

// TODO: DRY addThemeStyle && addThemeStyleAnimation && addThemeStylePsuedoAnimation possibly 
// returning an object with the three necesary values and destructuring them off
// hooks into theme and adds appropriate styling determined by string or array of strings of appropriate theme objects
export const addThemeStyle = props => {
  if (!props.themeStyle) return;

  if (Array.isArray(props.themeStyle)) {
    let combinedStyle = {};

    props.themeStyle.forEach( style => {
      const themeVals = themeGet(style)(props);
      combinedStyle = { ...combinedStyle, ...themeVals }
    });

    if (combinedStyle.pseudo)
      combinedStyle = {...combinedStyle, ...addPseudo(combinedStyle, true)}
    
    const { animation, ...combinedStylesNoAnimation } = combinedStyle;

    return styledCSS(combinedStylesNoAnimation);
  }

  let themedStyles = themeGet(props.themeStyle)(props);
  try {
    if (themedStyles.pseudo) 
    themedStyles = {...themedStyles, ...addPseudo(themedStyles, true)}
  } catch(err) {
    console.log('error with getting theme style invalid theme name');
    return err;
  }


  // allows for passage of special prop `remove` to remove styling for strict control over specific necessary css styling
  if (props.remove)
    themedStyles = removeStyles(themedStyles, props.remove)

  const { animation, ...themedStylesNoAnimation} = themedStyles;

  return styledCSS(themedStylesNoAnimation);
}

export const addThemeStyleAnimation = props => {
  console.log('WE OUTCHEA', props);
  // if (!props.themeStyle) return;

  if (Array.isArray(props.themeStyle)) {
    let combinedStyle = {};

    props.themeStyle.forEach( style => {
      const themeVals = themeGet(style)(props);
      combinedStyle = { ...combinedStyle, ...themeVals }
    });

    return combinedStyle.animation
  }

  let themedStyles = themeGet(props.themeStyle)(props);
  // try {
  //   if (themedStyles.pseudo) 
  //   themedStyles = {...themedStyles, ...addPseudo(themedStyles, true)}
  // } catch(err) {
  //   console.log('error with getting theme style invalid theme name');
  //   return err;
  // }
  console.log("IM IN THE THEMED ANIMATIONs", themedStyles);
  return themedStyles.animation;
}


//TODO: add another property for string/array and removal of styles to object version if remove is not null
// checks if the style is string or array then returns an object with themeStyle property for later parsing in 
// addThemeStyle function  otherwise if object passes on to removeStyle for style removal
export const styleBuildRemove = (styles, remove) => {
  return (
    typeof styles === 'string' || Array.isArray(styles) ? { themeStyle: styles, remove } : 
                                                  remove ? removeStyles(styles, remove) : { ...styles  }
  )
}


// remove styles from object takes array to remove multiple or string to remove one  
// if no value for remove original styles returned
export const removeStyles = (styles, remove) => {
  let removedStyles = styles;

  if (Array.isArray(remove)) {
    remove.forEach( (style, idx) => {
      const { [style]: removed, ...rest} = removedStyles;
      removedStyles = rest;
    })

    return  removedStyles;
  }
  const { [remove]: removed, ...rest } = styles;
  removedStyles = rest;

  return removedStyles
}
