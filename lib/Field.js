import styled from "styled-components";
import React, { useState } from 'react';
import { styleBuildRemove, removeStyles } from './utils';

import { Div, FlexDiv} from './Div';
import { P } from './Paragraph';
import { Li } from './Li';
import Box from './Box';

export const Error = styled(P).attrs({
  color: 'red',
  fontSize: 1,
  ml: 1,
  my: 0
})`
  font-weight: normal;
  &:before { content: '—'; }
`;

const handleErrorMessages = errorMessages => {
  return errorMessages.map( errorMessage => <Li key={errorMessage}><Error key={`error-${errorMessage}`}>{errorMessage}</Error></Li> )
}

//TODO: add option to chose normal password field no "show" option
//TODO: add theme keys to allow styling for form input
//TODO: TYPESCRIPT UPDATE
// remove necessary field props and set defaults
const Field = ({ data: { 
  name="field", 
  type="input", 
  placeholder='placeholder', 
  label="field", 
  inputData=null 
} = {}, fieldStyle={}, inputStyle={}, errors=[], ...props }) => {

  try {
    if (typeof name === 'undefined' ||
        typeof name !== 'string') throw TypeError('name cannot be undefined and must be type string');
    if (typeof type !== 'undefined' &&
        typeof type !== 'string') throw TypeError('type cannot be undefined and must be type string');
    if (typeof placeholder !== 'undefined' &&
        typeof placeholder !== 'string') throw TypeError('placeholder cannot be undefined and must be type string');
    if (typeof inputData !== 'undefined' &&
        typeof inputData !== 'object') throw TypeError('inputData cannot be undefined and must be type object');

    if (type === 'select') {
      if (inputData) {
        if (typeof inputData.value !== 'string') throw TypeError('inputData value for select should be a string');
        if (typeof inputData.display !== 'string') throw TypeError('inputData display for select should be a string');
        if (typeof inputData.options === 'undefined' || 
            !Array.isArray(inputData.options)) throw TypeError('options with inputData select must be an array');
            inputData.options.forEach( option => {
              for (const key in option) {
                if (option.hasOwnProperty(key)) {
                  const option = option[key];
                  if (typeof option !== 'string' || typeof option !== 'number') throw TypeError('options property values must be string or integer');
                }
              }
            })
      }
    }

    if (inputData) {
      if (typeof inputData !== 'string') throw TypeError('inputData should be a string');
    }

    if (fieldStyle) {
      if (typeof fieldStyle !== 'object') throw TypeError('fieldStyle should be an object');
    }

    if (inputStyle) {
      if (typeof fieldStyle !== 'object') throw TypeError('fieldStyle should be an object');
    }

    if (errors) {
      if (!Array.isArray(errors)) throw TypeError('fieldStyle should be an object');
    }
  } catch(err) {
    console.log("Im the error in the field component", err);
    return <div>Error in Field Component{err}</div>;
  }
  const [shown, setShown] = useState(false);
  const errorColor = errors.length >= 1 ? '#e95667' : null;

    const buildInput = () => {
      const inputType =
      {
        select: 'select',
        slider: 'slider',
        textarea: 'textarea'
      }[type] || 'input'

      const inputProps = {
        ...props,
        pseudo: true,
        background: "transparent",
        width: type === "password" ? "75%" : "100%",
        height: "auto",
        border: "none",
        color: "inherit",
        margin: "0",
        padding: '0 1em',
        focus: {outline: "none"},
        isA: inputType,
        name,
        type: shown && type === "password" ? 'text' : type,
        placeholder
      }


      switch(inputType) {
        case 'input':
          return (<Box {...inputProps} />);
        case 'select':
          //TODO: ADD ERROR CATCH, NEED TO PASS OPTIONS FOR SELECT AND OPTIONS NEEDS TO BE TYPE ARRAY
          return (
            <Box {...inputProps}>
              {inputData.options.map( option => <option key={option[inputData.value]} value={option[inputData.value]}>{option[inputData.display]}</option>)}
            </Box>
          )
      }
    }


  //TODO: Change tags to fieldset html elements for form
  return (
    <Div id="styled-react-field" {...styleBuildRemove(fieldStyle)}>
      <FlexDiv
        alignItems="flex-end"
      >
        <Box isA="label" htmlFor={name}>
          {label}
        </Box>
        { errors.length >= 1 ? 
          <Li ml="2rem" color={errorColor} fontSize="1rem">{handleErrorMessages(errors)}</Li> 
          : ''
        }
      </FlexDiv>
      <Div
        {...styleBuildRemove(inputStyle, 'display')}
        display="flex"
        justifyContent="space-between"
        borderColor={errorColor}
        focusColor={errorColor} 
        foucsBoxShadowColor={errorColor}
      >
        {buildInput()}
        { type === "password" ? 
        <P
          fontSize="12px"
          m="auto"
          onClick={() => setShown(!shown)}
          textTransform="uppercase"
          cursor='pointer'
        >
          {shown ? 'hide':'show'}
        </P> : '' }
      </Div>
    </Div>
  );
};

Field.displayName = 'Field';

export default Field