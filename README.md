# Styled-React

======

Library for styling React components using `css-in-js` and theming.

`npm install @cbryant24/styled-react`

## Getting Started

The following html elements are exported for use in component rendering and styling

* `Box - Default Div type which can be set to any html type` [see isA attribute](#Element-Types)
* `Div`
* `FlexDiv - Div with the flex type set`
* `GridDiv - Div with the grid type set`
* `Form`
* `FlexForm - Form with the flex type set`
* `GridForm - Form with the grid type set`
* `Button`
* `FlexButton - Button with the flex type set`
* `GridButton - Button with the grid type set`
* `Li`
* `FlexLi - Li with the flex type set`
* `GridLi - Li with the grid type set`
* `Ul`
* `FlexUl - Ul with the flex type set`
* `GridUl - Ul with the grid type set`
* `Field - See Field instructions` [here](#Field)

Styles can be applied to components by writing css styles directly as props

```javascript
import { Div } from '@cbryant24/styled-react';

function App() {
  return (
    <Div display="block" color="red">Im a Div</Div>
  )
}
```

Optionally styles can be defined and spread onto the component to provide reusability for styles

```javascript
  const styles = {
    width: [1, 2],
    fontSize: [1, 2],
    color: 'black',
    border: '1px solid black'
  }
  <Box
    {...styles}
  >
    I'm a styled div
  </Box>
```

## Theming

Theming allow for consistent styling by providing preset scales for various css properites. Theming provides quick responsive design by providing array values that correspond to specified breakpoints.

See table for theming properties

See default theming option for explanations on theme properties and reference [here](https://github.com/cbryant24/styled-react/blob/master/lib/theme.js))

For detailed guide and philosophy behind theming see [styled-system theming guide](https://styled-system.com/guides/theming)

## Global Style

Global styling can be done by importing the `createGlobalStyle` function and using tagged template literals to set global css values.

```javascript
import { createGlobalStyle } from '@cbryant24/styled-react';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
`;

function App() {

  return (
    <Fragment>
      <GlobalStyle />
      <Div>Hello World</Div>
    </Fragment>
  )
}
```

To learn more about the global styling see [styled-components api](https://styled-components.com/docs/api#createglobalstyle)

A default global styling with the most common global styling is also exported as `DefaultGlobalStyle`.

## Elements

### Field

The field component creates a group of elements containing label, input, and errors. The element takes the following props for the `data` props to set the label, placeholder, name attribute, and any data for the input to prefill or autoselect.

| Prop        | Type   | Description                                                                |
|-------------|--------|----------------------------------------------------------------------------|
| name        | string | used for `name` attribute on `input` and `for` attribute on label          |
| type        | string | determine which input type.  * email * text * password * textarea * select |
| placeholder | string | text to be used in the input for placeholder text                          |
| label       | string | text to be used for the label text value                                   |
| inputData   | varies | see list of options available for `inputData`                              |


#### inputData

##### select

The select input type inputData takes the properties listed below

| InputType | Select | Description                                                  |
|-----------|--------|--------------------------------------------------------------|
| options   | array  | array of objects with the property `id`                      |
| value     | string | used to set value field with the provided option object `id` |
| display   | string | used to display the text in the provided option field        |

#### Styling The Field

The `Field` component takes a `fieldStyle` object with css list properties

The `Field` component takes a prop `inputStyle` object with css list properties

If using a `theme` with the `ThemeProvider` wrapper the prop `fieldStyle` and `inputStyle` can take the `string` name reference to the theme object or array of strings referencing theme styles.

```javascript
import { Field, Form } from '@cbryant24/styled-react';

const App = () => {

  const fieldStyle = {
    width: '75%',
    maxHeight: '11rem',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  inputStyle = {
    background: 'white', color: 'black', borderRadius: '1em', minHeight: '2.5em'
  }

  
  return (
    <Form
      width="30vw"
      height="30vh"
      backgroundColor="red"
      color="black"
    >
      <Field
        data={{ name: "field-test", type: 'select', inputData: {
          value: "id",
          display: "name",
          options:
            [
              {name: "Dev", id: 2 },
              {name: "Mac", id: "3"},
            ]
          }
        }}
        fieldStyle={fieldStyle}
        inputStyle={inputStyle}
      />
    </Form>
  )
}
```

The input can't be styled but takes on the styling of the parent field styled with `inputStyle`

note: `display` property is set to flex for the field element and cannot be changed

## Adding Props

If props need to be added to a passed styled-system component a helper function can be imported and used

```javascript
export const Input = (
  <Input
    width="45%"
    color="#ffffff"
  />
);

import { addProps } from 'styled-react;
import { Input } from './Input';

export default Form = (props) => {
  const InputPassword = addProps(Input, { type: 'password'});

  return (
    <div>
      {InputPassword}
    </div>
  )
}
```

Adding props to multiple elements can be done by passing an array of styled-system Components

import { Input } from './Input';

```javascript
export default Form = (props) => {
  const InputPassword = addProps([Input, Input], { type: 'password'});

  return (
    <div>
      {InputPassword}
    </div>
  )
}
```

Adding props to multiple elements with varying props can be done by passing an array of styled-system Components and an array of props. Note that the props applied to each is done in a one to one application

```javascript
import { Input } from './Input';

export default Form = (props) => {
  const Inputs = addProps([Input, Input], [{ type: 'text'}, { type: 'password'}]);

  return (
    <div>
      {Inputs}
    </div>
  )
}
```

## Input

| Props              | CSS Style                | Value      |
|--------------------|:------------------------:|:-----------|
| placeHolderColor     ::placeholder -> {color}   [rgba, hex]|
| focusOutline         :focus { outline }         string     |
| focusBorderColor     :focus { boder }           string     |
| focusBoxShadow       :focus { box-shadow }      string     |

## Animations/Transitions

To define the animations provide an object to the `animation` prop with the appropriate properties

* `in`: This property receives an animation keyframe that will be used to animate in the component.
  * If providing an an animation a `duration_in` property and value must be provided
* `delay_in`: This property receives and integer and will set the time that the component will take to start being animated. While this time isn't reached, the component will be mounted but will display nothing. If this property is not setted there won't be any delay in for the component to start animating.
* `duration_in`: This property receives and integer greater than 0 and will set the duration in seconds for the in animation.
* `continuous`: This property receives an animation keyframe that will be used to animate between in and out (if proceed).
* `duration_continuous`: This property receives an integer greater than 0 and will set the duration in seconds for the continuous animation.
* `out`:  This property receives an animation keyframe that will be used to animate out the component.
* `duration_out`: This property receives and integer greater than 0 and will set the duration in seconds for the out animation.
* `delay_between`: This property receives and integer geater or equals to 0 and will set the time that will wait between the in and out animations.
* `iteration`: This property receives and integer greater than 0 or the literal 'infinite' and will set the amount of iterations the animation should be doing until it goes out (if it should)
* `animation_fill_mode`: property accepts `none | forwards | backwards | both | initial | inherit;` if none is provided the default value `none` will be used.
* `animation_timing_function`: property accepts `linear | ease | ease-in | ease-out | ease-in-out | step-start | step-end | steps(int, start|end) | cubic-bezier(n,n,n,n) | initial | inherit` if none is provided the default value of `ease` will be used.
* `animation_direction`: property accepts `normal | reverse | alternate | alternate-reverse | initial | inherit ` if none is provided the default value of `normal` will be used.

```javascript
  <Box
    animation={{
      delay_in: 5,
      in: FadeAnimations.FadeInBottom,
      duration_in: 2,
      out: FadeAnimations.FadeOutTop,
      duration_out: 1,
      delay_between: 5
    }}
  >
    I'm animating
  </Box>
```

```javascript
  <Box
    animation={{
      continuous: RotateAnimations.RotateCenter,
      duration_continuous: 3,
    }}
  >
    I'm animating
  </Box>
```

```javascript
  <Box
    animation={{
      delay_in: 5,
      in: FadeAnimations.FadeInBottom,
      duration_in: 1,
      continuous: RotateAnimations.RotateInCenter,
      duration_continuous: 1,
      out: FadeAnimations.FadeOutTop,
      duration_out: 1,
      delay_between: 5,
      animation_fill_mode: 'forwards'
    }}
  >
    I'm animating
  </Box>
```

### Custom Animations

A function `keyframes` is made available to create custom animations. To create a custom animation pass the created keyframes animation to Animated component in the appropriate places where keyframes are expected.

```javascript
  import { keyframes } from '@cbryant24/styled-react';

  const slideInTop = keyframes`
    0% {
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;

  <Box
    animation={{
      delay_in: 5,
      in: slideInTop,
      duration_in: 1,
      continuous: RotateAnimations.RotateInCenter,
      duration_continuous: 1,
      out: FadeAnimations.FadeOutTop,
      duration_out: 1,
      delay_between: 5,
      animation_fill_mode: 'forwards'
    }}
  >
    I'm animating
  </Box>
```

## Psuedo Classes/Elements

The pseudo classes `active, focus, hover, lang, link, visited` and pseudo elements `after, before, first-letter, first-line, selection` can be used to further style elments. Include the keyword `pseudo` and pass an object using the appropriate pseudo name to style.

```javascript
  <Box
    pseudo
    hover={{ fontSize: [1, 2], color: 'blue.1'}}
  >
    I am a pseudo element
  </Box>
```

## Transitions

Transitions can be added for the following states `hover, focus, & active` you can add a transition by either adding the pseudo class as instructed to [here](#Psuedo-Classes/Elements) then define the transition in the `transition` property

```javascript
<BoxPseudo
  pseudo
  hover={ { fontSize: [4] } }
  transition="font-size 4s linear"
>
  I will transition on hover
<BoxPseudo>
```

## Modal

To use a styled-react-modal import both the `ModalProvider, Modal` components. Set the `<ModalProvider></ModalProvider>` at the level you want to render the modal. The modal takes a single parent element with no sibling elements. To pass sibling elements use the `Fragment` component to do so.

```javascript
import { ModalProvider, Modal } from 'styled-react';


<ModalProvider BackgroundComponent={ModalBackground}>
    <App />
</ModalProvider>


function ModalDemo(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = e => setIsOpen(!isOpen);

  return (
      <Modal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Box>
          <Box>I am a modal!</Box>
          <Box>I am another box in the modal</Box>
          <button onClick={toggleModal}>Close Me</button>
        </Box>
      </Modal>
  )
}
```

| Property          | Type     | Description                                                                                                                                     |
|-------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| isOpen            | Boolean  | A boolean that indicates whether the modal is to be open or closed.                                                                             |
| onBackgroundClick | Function |  A function that is called when the modal background is clicked.                                                                                |
| onEscapeKeydown   | Function | A function that is called when the escape key is pressed while the modal is open.                                                               |
| backgroundProps   | Object   | A props object that adds props to the backgroundComponent when included.                                                                       |
| allowScroll       | Boolean  | When true, scrolling in the document body is not disabled when the modal is open.                                                               |
| beforeOpen        | Function | A function that is called before the modal opens. If this function returns a promise, then the modal is opened after the promise is resolved.   |
| afterOpen         | Function | A function that is called after the modal opens.                                                                                                |
| beforeClose       | Function | A function that is called before the modal closes. If this function returns a promise,  then the modal is closed after the promise is resolved. |
| afterClose        | Function |  A function that is called after the modal closes.                                                                                              |

The `BackgroundComponent` Takes a component that will be rendered as the background for this level modal if one is not provided the default `BackgroundComponent` will be used

```javascript
<Box
  display='flex'
  position='fixed'
  top="0"
  left="0"
  width='100vw'
  height='100vh'
  zIndex="30"
  backgroundColor='rgba(0, 0, 0, 0.5)'
  alignItems='center'
  justifyContent='center'
/>
```

## Element Types

To change the `Box` component to different element types i.e. `<span></span> <p></p>` use the prop `isA` and select the element type needed.

```javascript
<Box
  isA="p"
  fontSize={[1,2]}
  zIndex='10'
>
  I am now a styled paragraph element
</Box>
```

## Theme 

To create a theme provide a `theme` object and prop for the `ThemeProvider`. See [here](https://github.com/cbryant24/styled-react/blob/master/lib/theme.js) for example/default theme

```javascript
const breakpoints = ['544px', '768px', '1012px', '1280px'];
export const sizes = ['0%', '100%', '75%', '50%', '25%'];
const colors = {
  black: '#000000',
  white: '#ffffff',
  red: '#FF0000'
}
const fontSizes = [0, '1.6em', '1.4em', '1.2em', '.9em', '.8em' ];

const theme = {
  breakpoints,
  sizes,
  colors,
  fontSizes
}

import {ThemeProvider} from 'styled-react';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
  document.getElementById('root')
);
```

### Passing Theme Names

Defined styles in the theme can be used on components by using the `themeStyles` prop and passing either a string representing the object name or an array of strings to provide multiple styles defined in the theme.

Note when using an array any shared properties will be overriden by the last item in the array.

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
  color: 'yellow.2'
}

const theme = {
  squareButton,
  largeButton
}

const Buttons = (props) => {
  return (
    <Box
      isA="button"
      type='text'
      themeStyle="squareButton"
    >
      I'm a square button style
    </Box>
    <Box
      isA="button"
      type='text'
      themeStyle={["squareButton", "largeButton"]}
    >
      I'm a large square button style
    </Box>
  )
}
```

For styles defined in the theme and passed as a string or an array the following values can be used with your theme values

| Property            | Theme Key      |
|---------------------|----------------|
| fontFamily          | fonts          |
| fontSize            | fontSizes      |
| fontWeight          | fontWeights    |
| lineHeight          | lineHeights    |
| letterSpacing       | letterSpacings |
| color               | colors         |
| backgroundColor, bg | colors         |
| margin,m            | space          |
| marginTop, mt       | space          |
| marginRight, mr     | space          |
| marginBottom, mb    | space          |
| marginLeft, ml      | space          |
| marginX, mx         | space          |
| marginY, my         | space          |
| padding, p          | space          |
| paddingTop, pt      | space          |
| paddingRight, pr    | space          |
| paddingBottom       | space          |
| paddingLeft, pl     | space          |
| paddingX, px        | space          |
| paddingY, py        | space          |
| top                 | space          |
| bottom              | space          |
| left                | space          |
| right               | space          |
| border              | borders        |
| borderTop           | borders        |
| borderBottom        | borders        |
| borderLeft          | borders        |
| borderColor         | colors         |
| borderWidth         | borderWidths   |
| borderStyle         | borderStyles   |
| borderRadius        | radii          |
| boxShadow           | shadows        |
| textShadow          | shadows        |
| zIndex              | zIndices       |
| width               | sizes          |
| minWidth            | sizes          |
| maxWidth            | sizes          |
| height              | sizes          |
| minHeight           | sizes          |
| maxHeight           | sizes          |
| size                | sizes          |
