import * as styledSystem from 'styled-system';
const { compose, system } = styledSystem;

//TODO: do i need these? is it common enough? possibly remove check css properties lists 
const APPEARANCE = system({
  appearance: true
});

export const CURSOR = system({
  cursor: true
});

//END TODO

// fontSizeModules custom theme property see https://styled-system.com/custom-props
// see https://css-tricks.com/rem-global-em-local/ for global and local sizing design
const FONTSIZESMODULES = system({
  fontSizeModule: {
    property: 'fontSize',
    scale: 'fontSizesModule'
  }
});

// TODO: create basic more restrictive html css elements
// group most common styled-system css properties togethers for theming 
export const COMMON = compose(
  styledSystem.space,
  styledSystem.color,
  styledSystem.layout,
  styledSystem.zIndex,
  styledSystem.position,
  APPEARANCE,
  FONTSIZESMODULES,
  CURSOR
);

// TODO: create basic more restrictive html css border elements
// styled-system border properties
export const BORDER = compose(
  styledSystem.border,
  styledSystem.shadow
);


// styled-system complete transition elements with all properties
export const TRANSITION = system({
  transition: true,
  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true
});

// styled-system complete grid elements with all properties
export const GRID = compose(
  styledSystem.grid,
  system({
    gridRowStart: true,
    gridRowEnd: true,
    gridColumnStart: true,
    gridColumnEndt: true,
    itemName: true
  })
);

//TODO: add more restricitive html css typography elements
// styled-system complete typography css properties 
export const TYPOGRAPHY = compose(
  styledSystem.typography,
  system({
    textTransform: true,
    textDecoration: true
  })
)

export const FLEX       = styledSystem.flexbox;
export const SHADOW     = styledSystem.shadow;
export const BACKGROUND = styledSystem.background;

// combine all styled-system and and added styled-system custom props
export const ALL = styledSystem.compose(
  BORDER,
  BACKGROUND,
  COMMON,
  FLEX,
  GRID,
  SHADOW,
  TYPOGRAPHY,
  TRANSITION
);
