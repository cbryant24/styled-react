// breakpoints are defined here to be used for media query creations with mobile-first responsive design i.e. min-width
const breakpoints = ['544px', '768px', '1012px', '1280px'];

// colors are defined here to be used within the styled components 
// for colors provided in array format use dot notation to access color i.e. color: 'blacks.2' will result in color: rgba(0,0,0,.05) 
const colors = {
  primary: '#FE2711',
  secondary:'#FEFE32',
  tertiary:'#0147FE',
  'near-black': '#111',
  'dark-gray': '#333',
  'mid-gray': '#555',
  silver: '#999',
  'light-silver': '#aaa',
  'moon-gray': '#ccc',
  'light-gray': '#eee',
  'near-white': '#f4f4f4',
  transparent: 'transparent',
  gray: '#777',
  grays: [
    'rgba(46, 49, 49, .0125)',
    'rgba(46, 49, 49, .025)',
    'rgba(46, 49, 49, .05)',
    'rgba(46, 49, 49, .1)',
    'rgba(46, 49, 49, .2)',
    'rgba(46, 49, 49, .3)',
    'rgba(46, 49, 49, .4)',
    'rgba(46, 49, 49, .5)',
    'rgba(46, 49, 49, .6)',
    'rgba(46, 49, 49, .7)',
    'rgba(46, 49, 49, .8)',
    'rgba(46, 49, 49, .9)',
    'rgba(46, 49, 49, 1)',  
  ],
  orange: '#f89406',
  oranges: [
    'rgba(248, 148, 6, .0125)',
    'rgba(248, 148, 6, .025)',
    'rgba(248, 148, 6, .05)',
    'rgba(248, 148, 6, .1)',
    'rgba(248, 148, 6, .2)',
    'rgba(248, 148, 6, .3)',
    'rgba(248, 148, 6, .4)',
    'rgba(248, 148, 6, .5)',
    'rgba(248, 148, 6, .6)',
    'rgba(248, 148, 6, .7)',
    'rgba(248, 148, 6, .8)',
    'rgba(248, 148, 6, .9)',
    'rgba(248, 148, 6, 1)',  
  ],
  green: '#1e824c',
  greens: [
    'rgba(30, 130, 76, .0125)',
    'rgba(30, 130, 76, .025)',
    'rgba(30, 130, 76, .05)',
    'rgba(30, 130, 76, .1)',
    'rgba(30, 130, 76, .2)',
    'rgba(30, 130, 76, .3)',
    'rgba(30, 130, 76, .4)',
    'rgba(30, 130, 76, .5)',
    'rgba(30, 130, 76, .6)',
    'rgba(30, 130, 76, .7)',
    'rgba(30, 130, 76, .8)',
    'rgba(30, 130, 76, .9)',
    'rgba(30, 130, 76, 1)',  
  ],
  blue:'#0147FE',
  blues: [
    'rgba(31, 58, 147, .0125)',
    'rgba(31, 58, 147, .025)',
    'rgba(31, 58, 147, .05)',
    'rgba(31, 58, 147, .1)',
    'rgba(31, 58, 147, .2)',
    'rgba(31, 58, 147, .3)',
    'rgba(31, 58, 147, .4)',
    'rgba(31, 58, 147, .5)',
    'rgba(31, 58, 147, .6)',
    'rgba(31, 58, 147, .7)',
    'rgba(31, 58, 147, .8)',
    'rgba(31, 58, 147, .9)',
    'rgba(31, 58, 147, 1)',  
  ],
  purple: '#9a12b3',
  purples: [
    'rgba(154, 18, 179, .0125)',
    'rgba(154, 18, 179, .025)',
    'rgba(154, 18, 179, .05)',
    'rgba(154, 18, 179, .1)',
    'rgba(154, 18, 179, .2)',
    'rgba(154, 18, 179, .3)',
    'rgba(154, 18, 179, .4)',
    'rgba(154, 18, 179, .5)',
    'rgba(154, 18, 179, .6)',
    'rgba(154, 18, 179, .7)',
    'rgba(154, 18, 179, .8)',
    'rgba(154, 18, 179, .9)',
    'rgba(154, 18, 179, 1)',  
  ],
  yellow: '#FEFE32',
  yellows: [
    'rgba(245, 229, 27, .0125)',
    'rgba(245, 229, 27, .025)',
    'rgba(245, 229, 27, .05)',
    'rgba(245, 229, 27, .1)',
    'rgba(245, 229, 27, .2)',
    'rgba(245, 229, 27, .3)',
    'rgba(245, 229, 27, .4)',
    'rgba(245, 229, 27, .5)',
    'rgba(245, 229, 27, .6)',
    'rgba(245, 229, 27, .7)',
    'rgba(245, 229, 27, .8)',
    'rgba(245, 229, 27, .9)',
    'rgba(245, 229, 27, 1)',  
  ],
  red: '#FE2711',
  reds: [
    'rgba(207, 0, 15, .0125)',
    'rgba(207, 0, 15, .025)',
    'rgba(207, 0, 15, .05)',
    'rgba(207, 0, 15, .1)',
    'rgba(207, 0, 15, .2)',
    'rgba(207, 0, 15, .3)',
    'rgba(207, 0, 15, .4)',
    'rgba(207, 0, 15, .5)',
    'rgba(207, 0, 15, .6)',
    'rgba(207, 0, 15, .7)',
    'rgba(207, 0, 15, .8)',
    'rgba(207, 0, 15, .9)',
    'rgba(207, 0, 15, 1)',  
  ],
  black: '#000',
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
    'rgba(0,0,0,1)',
  ],
  white: '#fff',
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
    'rgba(255,255,255,1)',
  ]
}

// breakpoints for fontSize scale pertains to media query breakpoints i.e. fontsize: [1]
// const breakpoints = ['544px', '768px', '1012px', '1280px']; will result in 
// @media only screen and (min-width: '544px'){ font-size: 2em}
const fontSizes = [0,'1.2em', '1.6em','2em', '2.4em'];

fontSizes.sm = '.75em';
fontSizes.md = '1.75em';

const fontWeights	= [100, 200, 300, 400, 500, 600, 700, 800, 900];

fontWeights.light = 300;
fontWeights.regular = 400;
fontWeights.bold = 600;
fontWeights.extraBold = 700;

const lineHeights	= {
  default: 1,
  condensed: 1.25,
  condensedUltra: 1.5,
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
const fontSizesModule = [0, '1rem', '2rem', '3rem', '4rem'];

fontSizesModule.sm = '1.5rem';
fontSizesModule.md = '2.5rem';

// Space is a specifically named scale that pertains to:
// margin, padding, and layout-related CSS properties i.e. ‘grid-gap’,’grid-column-gap’
const space = [0, '1em','2em','3em','4em'];

space.sm = '1.5em';
space.md = '2.5em';

//const sizes specify : width, height, min-width, max-width, min-height, max-height
//The layout function adds props for widths, heights, display, and defined in theme.sizes to help ensure consistency in layout styles
//Widths and heights can use values defined in theme.sizes to help ensure consistency in layout styles.

//width, height, min-width, max-width, min-height, max-height
const sizes = ['0%', '20%', '25%', '33%', '50%', '100%'];

sizes.sm = '10%';
sizes.md = '75%';

const borders = ['1px solid black','2px solid black'];

const pill = '9999px';

const radii =  ['0px', '50px', '25px', '15px', pill];

export const shadowColor = 'rgba(0,0,0,0.16)';
export const baseShadow = '0 0 2px 0 rgba(0,0,0,.08),';
export const boxShadows = [
  baseShadow + `0 24px 24px 0 ${shadowColor}`,
  baseShadow + `0 12px 12px 0 ${shadowColor}`,
  baseShadow + `0 4px 8px 0 ${shadowColor}`,
  baseShadow + `0 2px 4px 0 ${shadowColor}`,
];

export const zIndices = [0, 1, 5, 10, 25, 50, 100];

const theme = {
  colors,
  breakpoints,
  fontSizes,
  fontSizesModule,
  fontWeights,
  lineHeights,
  letterSpacings,
  space,
  sizes,
  borders,
  radii,
  boxShadows,
  zIndices
}

export default theme;