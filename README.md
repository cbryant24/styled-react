# Styled-React

Library for styling React components using `css-in-js` and theming.

`npm install @cbryant24/styled-react`

## Getting Started

The following html elements are exported for use in component rendering and styling


| Element     | Description                                                                                  | Variations             |
|-------------|----------------------------------------------------------------------------------------------|------------------------|
| Box         | Default Div type which can be set to any html type  [ see isA attribute ] ( #Element-Types ) |                        |
| Div         | html div tag `<div></div>`                                                                   | FlexDiv, GridDiv       |
| Form        | html form element `<form></form>`                                                            | FlexForm, GridForm     |
| Button      | html button element `<button></button>`                                                      | FlexButton, GridButton |
| Li          | hmtl li element `<li></li>`                                                                  | FlexLi, GridLi         |
| Ul          | html ul element `<ul></ul>`                                                                  | FlexUl, GridUl         |
| H1-H6       | h1 through h6 element `<h1></h1>`                                                            | FlexH[1-6], GridH[1-6] |
| Span        | html span element `<span></span>`                                                            | FlexSpan, GridSpan     |
| Field       | Custom Field element for forms see [here](#Field)                                            |                        |
| StyledModal | See Modal Instructions [here](#Modal)                                                        |                        |

<br>

Styles can be applied to components by writing css styles directly as props

```javascript
import { Div } from '@cbryant24/styled-react';

function App() {
  return (
    <Div display="block" color="red">
      Im a Div
    </Div>
  );
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

Theming allows for consistent styling by providing preset scales for various css properites. Theming provides quick responsive design by providing array values that correspond to specified breakpoints.

See default theming option for explanations on theme properties and reference [here](https://github.com/cbryant24/styled-react/blob/master/lib/theme/README.md)

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
  );
}
```

To learn more about the global styling see [styled-components api](https://styled-components.com/docs/api#createglobalstyle)

A default global styling with the most common global styling is also exported as `DefaultGlobalStyle`.

## Elements

### Links

An `a` tag is currently exported for general linking.

Currently Styled-React is setup to use `react-router`. To create a link provide the exported `react-router-dom` `Link` to the `Box` element exported from the Styled-React library

```javascript
import { Link } from 'react-router-dom';
import { Div, Box } from '@cbryant24/styled-react';

const App = () => {

  return (
    <Div width="20rem" height="20rem" backgroundColor="black" fontSize={[1]}>
      <Box
        isA={Link}
        themeStyle={'linkStyle'}
        fontSize={[2]}
        color="white"
        to="/home"
      >
        Home
      </Box>
    </Div>
  );
};
```

### Field

The field component creates a group of elements containing label, input, and errors. The element takes the following props for the `data` props to set the label, placeholder, name attribute, and any data for the input to prefill or autoselect.

| Prop        | Type   | Description                                                                |
| ----------- | ------ | -------------------------------------------------------------------------- |
| name        | string | used for `name` attribute on `input` and `for` attribute on label          |
| type        | string | determine which input type. _ email _ text _ password _ textarea \* select |
| placeholder | string | text to be used in the input for placeholder text                          |
| label       | string | text to be used for the label text value                                   |
| inputData   | varies | see list of options available for `inputData`                              |

#### inputData

##### select

The select input type inputData takes the properties listed below

| InputType | Select | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
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
      background: 'white',
      color: 'black',
      borderRadius: '1em',
      minHeight: '2.5em'
    };

  return (
    <Form width="30vw" height="30vh" backgroundColor="red" color="black">
      <Field
        data={{
          name: 'field-test',
          type: 'select',
          inputData: {
            value: 'id',
            display: 'name',
            options: [
              { name: 'Dev', id: 2 },
              { name: 'Mac', id: '3' }
            ]
          }
        }}
        fieldStyle={fieldStyle}
        inputStyle={inputStyle}
      />
    </Form>
  );
};
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
export default Form = props => {
  const InputPassword = addProps([Input, Input], { type: 'password' });

  return <div>{InputPassword}</div>;
};
```

Adding props to multiple elements with varying props can be done by passing an array of styled-system Components and an array of props. Note that the props applied to each is done in a one to one application

```javascript
import { Input } from './Input';

export default Form = props => {
  const Inputs = addProps(
    [Input, Input],
    [{ type: 'text' }, { type: 'password' }]
  );

  return <div>{Inputs}</div>;
};
```

## Input

| Props                                                 | CSS Style | Value |
| ----------------------------------------------------- | :-------: | :---- |
| placeHolderColor ::placeholder -> {color} [rgba, hex] |
| focusOutline :focus { outline } string                |
| focusBorderColor :focus { boder } string              |
| focusBoxShadow :focus { box-shadow } string           |

## Animations/Transitions

Animations can be defined using the `animation` property and providing an object with the appropriate properties listed below. Note that some properties work in conjuction with only certain types of animation i.e. `duration_in` can only be used if `in` animation is defined, also some properties are required if using a certain type of animation i.e. if using `continuous` animation type then `duration_continuous` property must be defined as well.

### In Animation

The in animation provides animation for elements and components rendering to the screen

- `in`: This property receives an animation object with properties representing the keyframes that will be used to animate `in` the component.
- `duration_in`: This property receives an integer greater than 0 and will set the duration in seconds for the `in` animation. Required for using `in` animations

### Out Animation

The out animation provides animation for elements and components unmounting from the application

- `out`: This property receives an animation keyframe that will be used to animate out the component.
- `duration_out`: This property receives an integer greater than 0 and will set the duration in seconds for the out animation. Required for using `out` animations

### Continuous Animation

The continous animation provides animation for elements that need to continually animate. 

- `continuous`: This property receives an animation keyframe that will be used to animate between in and out.
- `duration_continuous`: This property receives an integer greater than 0 and will set the duration in seconds between each animation.

### Animation Timing Helpers

The `delay_between` and `iteration` properties provide timing for `in`, `out`, and `continuous` animations. The `delay_in` property can be used with `in` and `continuous`. The `iteration` property provides total number of animation counts and can be used only with the `in` and `out` animation

- `delay_between`: This property receives an integer geater or equal to 0 and will set the time that will wait between the `in` and `out` animations.
- `iteration`: This property receives an integer greater than 0 which will set the amount of iterations the animation should perform. This can be used only with the `in` and `out` animations
- `delay_in`: This property receives an integer and will set the time that the component will take to take before the animation begins. While this time isn't reached, the component will be mounted but will not animate. If this property is not set there will not be any delay for the `in` animation

### Animation CSS Properties

The properties `animation_fill_mode, animation_timing_function, animation_direction` operate exactly like normal css animation properties 
- `animation_fill_mode`: property accepts `none | forwards | backwards | both | initial | inherit;` if none is provided the default value `none` will be used.
- `animation_timing_function`: property accepts `linear | ease | ease-in | ease-out | ease-in-out | step-start | step-end | steps(int, start|end) | cubic-bezier(n,n,n,n) | initial | inherit` if none is provided the default value of `ease` will be used.
- `animation_direction`: property accepts `normal | reverse | alternate | alternate-reverse | initial | inherit` if none is provided the default value of `normal` will be used.

To create a custom pass an object representing a keyframes definition. The animation property uses css actual names so properites with a hyphen need to follow the same style in this object.

```javascript
const customAnimation = {
  in: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  delay_between: 4,
  out: {
    from: { 'background-color': 'red' },
    to: { 'background-color': 'yellow' }
  },
  duration_out: 3,
  duration_in: 3
};

<Box animation={animation}>animating div</Box>;
```

Custom animations frames can also be defined using the percentage values also

```javascript
const customAnimation = {
  in: {
    '0%': { opacity: 0 },
    '75%': { opacity: .5 },
    '100%': { opacity: 1 }
  },
  delay_between: 4,
  out: {
    '0%': { 'background-color': 'red' },
    '80%': { 'background-color': 'yellow' }
    '100%': { }
  },
  duration_out: 3,
  duration_in: 3
};

<Box animation={animation}>animating div</Box>;
```

For more details about creating custom animations [see additional documentation here](animations_readme.md)

## Psuedo Classes/Elements

The pseudo classes `active, focus, hover, lang, link, visited` and pseudo elements `after, before, first-letter, first-line, selection` can be used to further style elments. Include the keyword `pseudo` and pass an object using the appropriate pseudo name to style.

```javascript
<Box pseudo hover={{ fontSize: [1, 2], color: 'blue.1' }}>
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

To use a styled-react-modal import both the `ModalProvider, StyledModal` components. Set the `<ModalProvider></ModalProvider>` at the level you want to render the modal. The modal takes a single parent element with no sibling elements.

To style the Modal Background pass to the prop `modalBackgroundStyle` an object of camelCase css properties or if using themeimg an object with the property `themeStyle` with a string or array of strings corresponding to the theme name

The props `modalBackgroundStyle, isOpen, onBackgroundClick, onEscapeKeydown, allowScroll, beforeOpen, afterOpen, beforeClose, afterClose`

`modalBackgroundStyle`: `object` of camelCase css properties if using theming use property `themeStyle` with corresponding theme value
`isOpen`: A `boolean` that indicates whether the modal is to be open or closed
`onBackgroundClick`: A `function` that is invoked when the modal background is clicked
`onEscapeKeydown`: A `function` that is invoked when the escape key is pressed while the modal is open
`allowScroll`: A `boolean` when `true`, scrolling in the document body is not disabled when the modal is open
`beforeOpen`: A `function` that is invoked before the modal opens. If this function returns a promise, then the modal is opened after the promise is resolved
`afterOpen`: A `function` that is invoked after the modal opens
`beforeClose`: A `function` that is invoked before the modal closes
`afterClose`: A `function` that is invoked after the modal closes
`

```javascript
import { ModalProvider, Modal } from 'styled-react';

<ModalProvider>
  <App />
</ModalProvider>;

function ModalDemo(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = e => setIsOpen(!isOpen);

  function beforeOpen() {
    alert('Im about to open');
  }

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      beforeOpen={beforeOpen}
    >
      <Box>
        <Box>I am a modal!</Box>
        <Box>I am another box in the modal</Box>
        <button onClick={toggleModal}>Close Me</button>
      </Box>
    </Modal>
  );
}
```

## Element Types

To change the `Box` component to different element types i.e. `<span></span> <p></p>` use the prop `isA` and select the element type needed.

```javascript
<Box isA="p" fontSize={[1, 2]} zIndex="10">
  I am now a styled paragraph element
</Box>
```

## Theme

Theming can be used to restrict css style rules and provide easy to use responsive design. A default theme is provided if none is provided. 