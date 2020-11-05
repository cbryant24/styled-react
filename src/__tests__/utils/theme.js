const red = '#e42d42';
const white = '#ffffff';
const black = '#000000';
const primary = '#ffff00';
const secondary = '#4F4FEB';
export const colors = {
  red,
  black,
  white,
  primary,
  secondary
};

const createMediaQuery = n => `@media screen and (min-width:${n})`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    //arr in this case can be either an arr or object since an array is an object with
    //key value pairs that are simply numbers e.g [1: arrItem1, 2: arrItem2 etc]
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i];
      }
    })
  );

const aliases = ['sm', 'md', 'lg', 'xl'];
const breakpoints = ['45px', '45em', '50em', '60em'];

const mediaQueries = {
  ...breakpoints.map(createMediaQuery),
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
};

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

const emoji = '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
const font = `development,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,${emoji}`;
const mono = 'SFMono-Regular,"Roboto Mono",Menlo,monospace';

const fontSizes = [0, '12px', '16px', '18px', '20px'];

//margin/padding[all, left, right top bottom]
//grid [grid-gap, grid-column-gap, grid-row-gap]
const space = [0, '.5rem', '1rem', '1.5rem', '2rem'];

//width, height, min-width, max-width, min-height, max-height
const sizes = ['0%', '100%', '50%', '33%', '25%', '20%', '10%'];

const lineHeights = { condensedUltra: 1, condensed: 1.25, default: 1.5 };

//fontSizesModule is used to size for repsonsiveness using the css design philospohy
//of modular design with font-size rem for global design and font-size em for local design
//see https://css-tricks.com/rem-global-em-local/ for explanation `fontSizesModule` is a
//custom system-styled property that can be used with the scale for parent module font-size design
const fontSizesModule = [0, '2.5rem', '2rem', '1.5rem', '1rem'];

const light = 300;
const regular = 400;
const bold = 600;
const extraBold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
const fontWeights = { light, regular, bold, extraBold };

// default transition
const transition = 'all 0.125s ease-out';

// styled-system’s `borderRadius` function can hook into the `radii` object/array
const pill = '9999px';
const radii = ['0px', '4px', '8px', '16px', pill];
const radius = '5px';

const shadowColor = 'rgba(0,0,0,0.16)';
const baseShadow = '0 0 2px 0 rgba(0,0,0,.08),';
const boxShadows = [
  baseShadow + `0 2px 4px 0 ${shadowColor}`,
  baseShadow + `0 4px 8px 0 ${shadowColor}`,
  baseShadow + `0 12px 12px 0 ${shadowColor}`,
  baseShadow + `0 24px 24px 0 ${shadowColor}`
];

const zIndices = [0, 1, 5, 10];

const linkStyle = {
  pseudo: true,
  color: 'white',
  width: [1, 2],
  hover: { color: 'red' }
};

const animationStyle = {
  width: [1, 2], 
  height:"20vh", 
  bg:"white",
  animation: {
    continuous: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    duration_continuous: 1,
    animation_direction: 'alternate-reverse'
  }

}

const newAnimationStyle = {
  width: [1, 2], 
  height:"20vh", 
  bg:"white",
  animation: {
    continuous: {
      '0%': { 'width': '50%' },
      '100%': { 'width': '100%' }
    },
    duration_continuous: 3,
    animation_direction: 'alternate-reverse'
  }
}

const marginLarge = {
  margin: '2rem'
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
  sizes,
  space,
  colors,
  lineHeights,
  linkStyle,
  animationStyle,
  newAnimationStyle,
  marginLarge,
  radii,
};

export default theme;
