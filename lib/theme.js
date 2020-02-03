// breakpoints are defined here to be used for media query creations with mobile-first responsive design i.e. min-width
const breakpoints = ['544px', '768px', '1012px', '1280px'];

// colors are defined here to be used within the styled components 
// for colors provided in array format use dot notation to access color i.e. color: 'blacks.2' will result in color: rgba(0,0,0,.05) 
const colors = {
  primary: '#FE2711',
  secondary:'#FEFE32',
  tertiary:'#0147FE',
  red: '#FE2711',
  yellow: '#FEFE32',
  blue:'#0147FE',
  black: '#000',
  'near-black': '#111',
  'dark-gray': '#333',
  'mid-gray': '#555',
  gray: ' #777',
  silver: '#999',
  'light-silver': '#aaa',
  'moon-gray': '#ccc',
  'light-gray': '#eee',
  'near-white': '#f4f4f4',
  white: '#fff',
  transparent: 'transparent',
  blacks: [
    'rgba(0,0,0,.0125)',
    'rgba(0,0,0,.025)',
    'rgba(0,0,0,.05)',
    'rgba(0,0,0,.1)',
    'rgba(0,0,0,.2)',
    'rgba(0,0,0,.3)',
    'rgba(0,0,0,.4)',
    'rgba(0,0,0,.5)',
    'rgba(0,0,0,.6)',
    'rgba(0,0,0,.7)',
    'rgba(0,0,0,.8)',
    'rgba(0,0,0,.9)',
  ],
  whites: [
    'rgba(255,255,255,.0125)',
    'rgba(255,255,255,.025)',
    'rgba(255,255,255,.05)',
    'rgba(255,255,255,.1)',
    'rgba(255,255,255,.2)',
    'rgba(255,255,255,.3)',
    'rgba(255,255,255,.4)',
    'rgba(255,255,255,.5)',
    'rgba(255,255,255,.6)',
    'rgba(255,255,255,.7)',
    'rgba(255,255,255,.8)',
    'rgba(255,255,255,.9)',
  ]
}

// breakpoints for fontSize scale pertains to media query breakpoints i.e. fontsize: [1]
// const breakpoints = ['544px', '768px', '1012px', '1280px']; will result in 
// @media only screen and (min-width: '544px'){ font-size: 2em}
const fontSizes = [0,'2em', '1.5em','1em', '.5em'];

const fontWeights	= [100, 200, 300, 400, 500, 600, 700, 800, 900];

const lineHeights	= {
  solid: 1,
  title: 1.25,
  copy: 1.5,
}

const letterSpacings = {
  normal: 'normal',
  tracked: '0.1em',
  tight: '-0.05em',
  mega: '0.25em',
};

//fontSizesModule is used to size for repsonsiveness using the css design philospohy
//of modular design with font-size rem for global design and font-size em for local design
//see https://css-tricks.com/rem-global-em-local/ for explanation `fontSizesModule` is a 
//custom system-styled property that can be used with the scale for parent module font-size design
const fontSizesModule = [0, '1.2rem', '1.6rem', '2rem', '2.4rem'];

// Space is a specifically named scale that pertains to:
// margin, padding, and layout-related CSS properties i.e. ‘grid-gap’,’grid-column-gap’
const space = [0, '1em','2em','3em','4em'];

//const sizes specify : width, height, min-width, max-width, min-height, max-height
//The layout function adds props for widths, heights, display, and defined in theme.sizes to help ensure consistency in layout styles
//Widths and heights can use values defined in theme.sizes to help ensure consistency in layout styles.

//width, height, min-width, max-width, min-height, max-height
const sizes = ['0%', '100%', '75%', '50%', '33%', '25%', '10%'];

const borders = ['1px solid black','2px solid black'];

const pill = '9999px';

const radii =  ['0px', '15px', '25px', '50', pill];

export const shadowColor = 'rgba(0,0,0,0.16)';
export const baseShadow = '0 0 2px 0 rgba(0,0,0,.08),';
export const boxShadows = [
  baseShadow + `0 2px 4px 0 ${shadowColor}`,
  baseShadow + `0 4px 8px 0 ${shadowColor}`,
  baseShadow + `0 12px 12px 0 ${shadowColor}`,
  baseShadow + `0 24px 24px 0 ${shadowColor}`
];

export const zIndices = [0, 1, 5, 10];

const theme = {
  colors,
  breakpoints,
  fontSizes,
  fontSizeModules,
  fontWeights,
  lineHeights,
  letterSpacings,
  fontSizesModule,
  space,
  sizes,
  borders,
  radii,
  shadows,
  zIndices
}

export default theme;