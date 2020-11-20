# Theme 

Themeing is intended to be a general purpose format for storing design system style values and scales. For more info on themeing see [styled-system documentation](https://styled-system.com/theme-specification)

## Getting Started

To begin using theming import the `ThemeProvider` from Styled-React. To using theming for the entire application Wrap the `<App></App>` component with `ThemeProvider`. For component level theming the `ThemeProvider` can be used to wrap a lower component tree for seperate component level theming. 

```javascript
import { ThemeProvider, ModalProvider } from '@cbryant24/styled-react';

  <ThemeProvider theme={componentTheme}>
    <App />
  </ThemeProvider>
```

Or for component level theming
```javascript
import { ThemeProvider, ModalProvider } from '@cbryant24/styled-react';


  <ThemeProvider theme={componentTheme}>
    <Div bg="blue" height={['100vh']} width={['100vw']}>
      <Div>
        <H1 color="black">Im Lower Level Theme</H1>
      </Div>
    </Div>
  </ThemeProvider>
```

## Theme Scale Values

Theme values that correspond to css values are described in plural format compared to their css property name and assigned a value in array or object format which can be accessed via their index or property name

```javascript
  const theme = {
    ...
    fontSizes: [0,"2em","1.5em","1em",".5em"],
    ...
    lineHeights: {
      solid: 1,
      title: 1.25,
      copy: 1.5,
    }
    ...
  }

  <ThemeProvider>
    <Div 
      fontSize={1}
      lineHeight="title"
    >
      Im Using Theme Responsiveness
    </Div>
  </ThemeProvider>
```
> will produce
```css
.guOTKZ {
  font-size: 2em;
  line-height: 1.25;
}
```

## Responsive Design

Responsive design is set using the default breakpoints `"544px", "768px", "1012px", "1280px"` for mobile first approach. When defining styles, using an array will correspond to theme breakpoints and the style theme array values mentioned [in Theme Scale Values](#theme-scale-values). The `null` or `""` will maintain the value set in the prior array spot if the need for skipping styling at a breakpoint.

```javascript
  const theme = {
    ...
    breakpoints: ["544px", "768px", "1012px", "1280px"],
    // Space is a specifically named scale that pertains to:
    // margin, padding, and layout-related CSS properties i.e. ‘grid-gap’,’grid-column-gap’
    space: [0, "1em","2em","3em","4em"],
    //width, height, min-width, max-width, min-height, max-height
    sizes: ["0%", "100%", "50%", "33%", "25%", "20%"];
    ...
  }

  <ThemeProvider>
    <Div 
      margin={[1,2,3,null,4]}      
      padding={[1,null,2,3]} 
      width={[1,null,3,4]} 
      height={[1,null,2,4]}
    >
      Im Using Theme Responsiveness
    </Div>
  </ThemeProvider>
```
> will produce Div with css @ < 544px 
```css
.hPKgNd {
  margin: 1em;
  padding: 1em;
  width: 100%;
  height: 100%;
}
```
> will produce Div with css @ > 544px
```css
@media screen and (min-width: 544px)
.bsrUSe {
    margin: 2em;
}

.bsrUSe {
    box-sizing: border-box;
    min-width: 0;
    /* margin: 1em; */
    padding: 1em;
    width: 100%;
    height: 100%;
}
```

> will produce @ > 768px

```css
@media screen and (min-width: 768px)
.bsrUSe {
    margin: 3em;
    padding: 2em;
    width: 33%;
    height: 50%;
}
@media screen and (min-width: 544px)
.bsrUSe {
    /* margin: 2em; */
}
.bsrUSe {
    /* margin: 1em; */
    /* padding: 1em; */
    /* width: 100%; /*
    /* height: 100%; /*
}
```
> will produce @ > 1012px
```css
@media screen and (min-width: 1012px)
.ioyvxB {
    padding: 3em;
    width: 25%;
    height: 25%;
}
@media screen and (min-width: 768px)
.ioyvxB {
    margin: 3em;
    /* padding: 2em; */
    /* width: 33%; */
    /* height: 50%; */
}
@media screen and (min-width: 544px)
.ioyvxB {
    /* margin: 2em; */
}
.ioyvxB {
    /* margin: 1em; */
    /* padding: 1em; */
    /* width: 100%; */
    /* height: 100%; */
}
```
> will produce @ > 1280px
```css
@media screen and (min-width: 1280px)
.ioyvxB {
    margin: 4em;
    height: 20%;
}

@media screen and (min-width: 1012px)
.ioyvxB {
    padding: 3em;
    width: 25%;
    /* height: 25%%; */
}
@media screen and (min-width: 768px)
.ioyvxB {
    /* margin: 3em; */
    /* padding: 2em; */
    /* width: 33%; */
    /* height: 50%; */
}
@media screen and (min-width: 544px)
.ioyvxB {
    /* margin: 2em; */
}
.ioyvxB {
    /* margin: 1em; */
    /* padding: 1em; */
    /* width: 100%; */
    /* height: 100%; */
}
```

## Colors

Colors are defined as a plain javascript object in the theme and accessed by their corrresponding property name. Some color properties are assigned array values and can be accessed via dot notation as a string value for the css property

```javascript
const theme = {
  ...
  colors: {
    primary: "#FE2711",
    ...
    blacks: [
    "rgba(0,0,0,.0125)",
    "rgba(0,0,0,.025)",
    "rgba(0,0,0,.05)",
    "rgba(0,0,0,.1)",
    "rgba(0,0,0,.2)",
      ...
    ],
    ...
  }
}

  <ThemeProvider>
    <Div 
      backgroundColor="primary"
      color="black.3"
    >
      Im Using Theme Color
    </Div>
  </ThemeProvider>
```
> will produce
```css
.BHyhc {
    background-color: #FE2711;
    color: rgba(0,0,0,.1);
}
```
### Default Colors

For a list of all default theme colors [see here](https://gist.github.com/cbryant24/5af1f550698c40a09c7f69e89fec45f1)

## Theme Name Styling

Defined styles can be used on components by using the `themeStyles` prop and passing either a string representing the object name or an array of strings to provide multiple styles defined in the theme.

To add the named styles to the theme use the prop `themeStyles` on the `<ThemeProvider>`. On how to use themeStyles with components see [using theme styling](#use-theme-styling)

```javascript
const smallMargin = {
  margin: [1]
}

const addedThemeStyle = {
  smallMargin: {
    margin: [1]
  }
}

<ThemeProvider themeStyle={addedThemeStyle}>
  <App/>
</ThemeProvider>

```

## Use Theme Styling

To use theme styles that have been named and added to the `ThemeProvider` use the prop `themeStyles` on the component and pass either a string if applying a single named theme style or an array of strings for application of multiple named theme styles. Note when using an array any shared properties will be overriden by the last item in the array.

```javascript

const squareButton = {
  display: "inline-block",
  boxShadow: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  transition: "box-shadow 0.125s ease-out 0s",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "currentcolor",
  px: [1, 2],
  py: [1, 2],
}

const largeButton = {
  px: [2, 3],
  py: [2, 3],
  color: "blue",
  backgroundColor: "yellow"
}

<ThemeProvider themeStyles={{ squareButton, largeButton }}>
  <Button id="button-1" themeStyle="squareButton">Square Button</Button>
  <Button id="button-2" themeStyle={["squareButton", "largeButton"]}>Large Square Button</Button>
</ThemeProvider>

```
> will produce

```css
#button-1.enrqno {
    display: inline-block;
    box-shadow: none;
    background-color: #FE2711;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: box-shadow 0.125s ease-out 0s;
    transition: box-shadow 0.125s ease-out 0s;
    border-width: 2px;
    border-style: solid;
    border-color: #FE2711;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
}

#button-2.kUVFAZ {
    display: inline-block;
    box-shadow: none;
    background-color: #FEFE32;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: box-shadow 0.125s ease-out 0s;
    transition: box-shadow 0.125s ease-out 0s;
    border-width: 2px;
    border-style: solid;
    border-color: #FE2711;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 2em;
    padding-bottom: 2em;
    color: #0147FE;
}

```

### Default Name Styling

For a list of default name styling that can be used [see list](https://gist.github.com/cbryant24/59dac2fd1c1ae6fcc97ecd1f7d5f1f94)

### Remove Prop

If using a `themeStyle` on a component you can remove specified styles from the `themeStyle` by using the `remove` prop with a `string` value of the css property (camelCase if hyphenated i.e. `max-height` as `maxHeight`) or array of css properties to remove.

```javascript
<Button
  id="button-colored"
  themeStyle={["squareButton", "largeButton"]}
  remove="backgroundColor"
  backgroundColor="#800080"
>
  Color Changed
</Button>
```

> Will produce 

```css
#button-colored.nnDmQ {
  box-sizing: border-box;
  min-width: 0;
  background-color: #800080;
  display: inline-block;
  box-shadow: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  -webkit-transition: box-shadow 0.125s ease-out 0s;
  transition: box-shadow 0.125s ease-out 0s;
  border-width: 2px;
  border-style: solid;
  border-color: #FE2711;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 2em;
  padding-bottom: 2em;
  color: #0147FE;
}
```

## Change Default Theme CSS

To change any default theme css use the `replaceTheme` prop on the `<ThemeProvider>` representing an object with either the replaced scale, object, or string value for the appropriate corresponding theme key see [list for theme properties](#theme-names-and-keys)

```javascript
  /// default theme
  theme = {
    colors: {
      primary: "#FE2711"
      ...
    },
    fontSizes: [0,"2em","1.5em","1em",".5em"]
    ...
  }

  const newThemeVals = {
    color: {
      primary: "#FFD300"
    }
    fontSizes: [0, "4em","3em","2em","1em"]
  }

  <ThemeProvider replaceTheme={newThemeVals}>
    <Div id="div-styled" fontSize={[1,null,2]} backgroundColor="primary">
      Im New Styled Theme
    </Div>
  </ThemeProvider>
```
> will produce
```css
@media screen and (min-width: 768px)
#div-styled.bxdpDO {
  font-size: 3em;
}

#div-styled.bxdpDO {
  /* font-size: 4em; */
  background-color: #FFD300;
}
```

### Theme Media Queries

To define theme media queries used in the scale for styling use the [replaceTheme property](#change-default-theme-settings) and define the `breakpoints` property with an array of css unit strings representing each breakpoint that will be used with the `@media screen and (min-width: $val)` for scaled theme values. 

`breakpoints` can also accept a mixed css units for the breakpoints scale  
  `const breakpoints = ["200px", "10vw", "42rem", "55em"]`   

`breakpoints` can contain as many breakpoints as necessary  
  `const breakpoints = ["200px", "300px", "400px", "500px", "600px", "700px"]`


```javascript
  /// default theme
  theme = {
  ...
   breakpoints: ["544px", "768px", "1012px", "1280px"];
   fontSizes: [0,"2em", "1.5em","1em", ".5em"];
    ...
  }

  const newThemeVals = {
    breakpoints: ["230px", "34em", "43rem", "900px"]
  }

  <ThemeProvider replaceTheme={newThemeVals}>
    <Div id="div-styled"  fontSize={[1,null,4,"20px","30px","36px" ]}
>
      Im New Styled Theme
    </Div>
  </ThemeProvider>
```
> will produce Div with css @ < 230px 
```css
#div-styled.dmwkrj {
  font-size: 2em;
}
```
> will produce Div with css @ > 230px 
```css
@media screen and (min-width: 230px)
#div-styled.jUmxCe {
  font-size: 1.5em;
}
#div-styled.jUmxCe {
  /* font-size: 2em; */
}
```
> will produce Div with css @ > 34em 
```css
@media screen and (min-width: 34em)
#div-styled.jUmxCe {
  font-size: 1em;
}
@media screen and (min-width: 230px)
#div-styled.jUmxCe {
  /* font-size: 1.5em; */
}
#div-styled.jUmxCe {
  /* font-size: 2em; */
}
```
> will produce Div with css @ > 43em 
```css
@media screen and (min-width: 43rem)
#div-styled.jUmxCe {
  font-size: .5em;
}
@media screen and (min-width: 34em)
#div-styled.jUmxCe {
  /* font-size: 1em; */
}
@media screen and (min-width: 230px)
#div-styled.jUmxCe {
  /* font-size: 1.5em; */
}
#div-styled.jUmxCe {
  /* font-size: 2em; */
}
```

> will produce Div with css @ > 900px 
```css
@media screen and (min-width: 900px)
#div-styled.jUmxCe {
  font-size: 20px;
}
@media screen and (min-width: 43rem)
#div-styled.jUmxCe {
  /* font-size: .5em; */
}
@media screen and (min-width: 34em)
#div-styled.jUmxCe {
  /* font-size: 1em; */
}
@media screen and (min-width: 230px)
#div-styled.jUmxCe {
  /* font-size: 1.5em; */
}
#div-styled.jUmxCe {
  /* font-size: 2em; */
}
```

### Theme Names and Keys

For styles defined in the theme and passed as a string or an array the following values can be used with your theme values

| Property            | Theme Key       | alias |
| ------------------- | --------------- | ----- |
| fontFamily          | fonts           | 
| fontSize            | fontSizes       |
| fontWeight          | fontWeights     |
| lineHeight          | lineHeights     |
| letterSpacing       | letterSpacings  |
| color               | colors          |
| backgroundColor, bg | colors          |
| margin              | space           | m     
| marginTop           | space           | mt
| marginRight         | space           | mr
| marginBottom        | space           | mb
| marginLeft          | space           | ml
| marginLeft &        | space           | mx, marginX
| marrginRight        |                 |
| marginTop &         | space           | my, marginY
| marginBottom        |                 |
| padding             | space           | p
| paddingTop          | space           | pt
| paddingRight        | space           | pr
| paddingBottom       | space           | pb
| paddingLeft         | space           | pl
| paddingLeft &       | space           | px, paddingX
| paddingRight        |                 |
| paddingBottom &     | space           | py, paddingY
| paddingTop          |                 | 
| top                 | space           |
| bottom              | space           |
| left                | space           |
| right               | space           |
| border              | borders         |
| borderTop           | borders         |
| borderBottom        | borders         |
| borderLeft          | borders         |
| borderColor         | colors          |
| borderWidth         | borderWidths    |
| borderStyle         | borderStyles    |
| borderRadius        | radii           |
| boxShadow           | shadows         |
| textShadow          | shadows         |
| zIndex              | zIndices        |
| width               | sizes           |
| minWidth            | sizes           |
| maxWidth            | sizes           |
| height              | sizes           |
| minHeight           | sizes           |
| maxHeight           | sizes           |
| size                | sizes           |
| fontSize            | fontSizeModules |