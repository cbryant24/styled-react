//TODO: ADD REACT MEMO, CALLBACK, REF HOOKS TO SAVE RENDERS
//TODO: Add Styling for nested themeStyles for authForm formStyle: { themeStyle: 'form'} const form = { themeStyle: ['flex']}
//TODO: Add Clearer message for animations when missing property
//TODO: Add better documentation on which properties are required when adding an animation
//TODO: Make field show text for password smaller and allow to be set externally
//TODO: Fix error when passing themeStyle with no corresponding property name in theme on the link and error ends up as property name
//TODO: IMPORTANT!! Fix error where two elements of same type have same animation it breaks
//TODO: ANIMATIONS PASSED AS FUNCTIONS TO FIX ANIMATION ISSUE
// Styled-Components Functions
export { keyframes } from 'styled-components';
export { createGlobalStyle } from 'styled-components';
export { default as ThemeProvider } from './ThemeProvider';

// Functions
export { styleBuildRemove } from './utils';
export { addProps } from './utils';

// Animations
export { FadeAnimations } from './animations';
export { BounceAnimations } from './animations';
export { ScaleAnimations } from './animations';
export { RotateAnimations } from './animations';
export { SlideAnimations } from './animations';

// Modal
export { default as StyledModal } from './modal';
export { ModalProvider } from './modal';

// // Link
export { default as createLink } from './Link';

// Elements
export { default as Box } from './Box';
export { Div } from './Div';
export { FlexDiv } from './Div';
export { GridDiv } from './Div';
export { P } from './Paragraph';
export { FlexP } from './Paragraph';
export { GridP } from './Paragraph';
export { Ul } from './Ul';
export { FlexUl } from './Ul';
export { GridUl } from './Ul';
export { default as Field } from './Field';
export { Form } from './Form';
export { FlexForm } from './Form';
export { GridForm } from './Form';
export { Li } from './Li';
export { FlexLi } from './Li';
export { GridLi } from './Li';
export { Button } from './Button';
export { FlexButton } from './Button';
export { GridButton } from './Button';
export { H1 } from './H1';
export { FlexH1 } from './H1';
export { GridH1 } from './H1';
export { H2 } from './H2';
export { FlexH2 } from './H2';
export { GridH2 } from './H2';
export { H3 } from './H3';
export { FlexH3 } from './H3';
export { GridH3 } from './H3';
export { H4 } from './H4';
export { FlexH4 } from './H4';
export { GridH4 } from './H4';
export { H5 } from './H5';
export { FlexH5 } from './H5';
export { GridH5 } from './H5';
export { H6 } from './H6';
export { FlexH6 } from './H6';
export { GridH6 } from './H6';
