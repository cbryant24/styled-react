
const red = '#e42d42'
const white = '#ffffff'
const black = '#000000'


const colors = {
  red,
  black,
  white
}

const createMediaQuery = n => `@media screen and (min-width:${n}px)`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
  //arr in this case can be either an arr or object since an array is an object with
  //key value pairs that are simply numbers e.g [1: arrItem1, 2: arrItem2 etc] 
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i]
      }
    })
  );

const aliases = ['sm', 'md', 'lg', 'xl'];
export const breakpoints = ['544px', '768px', '1012px', '1280px'];

export const mediaQueries = {
  ...breakpoints.map(createMediaQuery),
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
};

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

const emoji = '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
export const font = `development,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,${emoji}`;
export const mono = 'SFMono-Regular,"Roboto Mono",Menlo,monospace';

export const fontSizes = [0, '1.5em', '1em', '1.5em', '2em'];

//margin/padding[all, left, right top bottom] 
//grid [grid-gap, grid-column-gap, grid-row-gap]
export const space = [0, '.5em', '1em', '1.5em', '2em'];

//width, height, min-width, max-width, min-height, max-height
export const sizes = ['0%', '10%'];

export const lineHeights = { "condensedUltra": 1, "condensed": 1.25, "default": 1.5 }

//fontSizesModule is used to size for repsonsiveness using the css design philospohy
//of modular design with font-size rem for global design and font-size em for local design
//see https://css-tricks.com/rem-global-em-local/ for explanation `fontSizesModule` is a 
//custom system-styled property that can be used with the scale for parent module font-size design
export const fontSizesModule = [0, '.5rem', '1rem', '1.5rem', '2rem'];

export const light = 300;
export const regular = 400;
export const bold = 600;
export const extraBold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = { light, regular, bold, extraBold };

// default transition
export const transition = 'all 0.125s ease-out';

// styled-system’s `borderRadius` function can hook into the `radii` object/array
export const pill = '9999px';
export const radii = ['0px', '4px', '8px', '16px', pill];
export const radius = '5px';

export const shadowColor = 'rgba(0,0,0,0.16)';
export const baseShadow = '0 0 2px 0 rgba(0,0,0,.08),';
export const boxShadows = [
  baseShadow + `0 2px 4px 0 ${shadowColor}`,
  baseShadow + `0 4px 8px 0 ${shadowColor}`,
  baseShadow + `0 12px 12px 0 ${shadowColor}`,
  baseShadow + `0 24px 24px 0 ${shadowColor}`
];

export const zIndices = [0, 1, 5, 10];

//DEFAULT INPUT STYLING

export const buttonPadding = [0, '.5em', '1em']

// export const hexa = (color, alpha) => {
//   const hex = cx(color);
//   if (!includes(hex, '#')) return shadowColor
//   const r = parseInt(hex.slice(1, 3), 16),
//     g = parseInt(hex.slice(3, 5), 16),
//     b = parseInt(hex.slice(5, 7), 16)

//   if (alpha >= 0) {
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`
//   } else {
//     return `rgb(${r}, ${g}, ${b})`
//   }
// }


const button = {
  fordwardedAs: "button",
  display: "inline-block",
  verticalAlign: 'middle',
  textAlign: 'middle',
  fontFamily: 'inherit',
  appearance: 'none',
  cursor: 'pointer',
}
//THEME WILL BE PROVIDED TO FORM APP 
export const squareButton = {
  display: "inline-block",
  verticalAlign: "middle",
  textAlign: "center",
  fontSize: [1],
  minWidth: "25%",
  fontFamily: "inherit",
  fontWeight: "extraBold",
  lineHeight: "condensed",
  appearance: "none",
  cursor: "pointer",
  color: "white",
  boxShadow: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  transition: "box-shadow 0.125s ease-out 0s",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "currentcolor",
  px: [2],
  py: [1],
}

export const authForm = {
  id: 'auth-form',
  display: 'flex',
  height: [1],
  justifyContent: 'space-evenly', 
  flexDirection: 'column', 
  backgroundColor: 'gray.8',
  border: '1px solid black',
  width: [1],
  px: [4],
  zIndex: [1],
  themeStyle: ['flexSpaceEvenlyColumn']
}

export const inputNorm = {
  id: 'hello-everyone',
  appearance: 'none',
  display: 'block',
  verticalAlign: 'middle',
  width: [2],
  height: ['35%'],
  color: 'white',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  fontFamily: 'inherit',
  backgroundColor: 'red',
  borderRadius: '5px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgb(221, 225, 228)',
  transition: 'box-shadow 0.125s ease-out 0s',
  minHeight: '1.5em',
  mt: [1],
  focusWithin: {
    boxShadow: '0px 0px 8px green'
  }
};

export const field = {
  width: [1], 
  height: ['15%'], 
  justifyContent: 'space-between', 
  flexDirection: 'column'
}

export const colorBg = {
  backgroundColor: 'blue'
}

const theme = {
  breakpoints,
  mediaQueries,
  font,
  mono,
  fontSizes,
  fontSizesModule,
  fontWeights,
  transition,
  boxShadows,
  zIndices,
  field,
  inputNorm,
  authForm,
  squareButton,
  button,
  colorBg
}

export default theme;