import React, { useState } from 'react';
import { styleBuildRemove } from './utils';

import { Div, FlexDiv } from './Div';
import { FlexP, P } from './Paragraph';
import { Li } from './Li';
import { Ul } from './Ul';
import Box from './Box';

//TODO: ADD ANIMATION OPTION FOR ERROR MESSAGE
//TODO: ADD OPTION FOR REMOVING BULLET POINT
const handleErrorMessages = errorMessages => {
  return errorMessages.map(errorMessage => (
    <Li 
      key={errorMessage}
      listStyle="none"
    >
      <FlexP
        pseudo="true"
        color="#e42d42"
        fontSize="8px"
        key={`error-${errorMessage}`}
        textTransform='lowercase'
        alignItems="center"
        margin=".5em 0"
        before={{
          content: '•',
          mr: '4px'
        }}
      >
        {errorMessage}
      </FlexP>
    </Li>
  ));
};

//TODO: add option to chose normal password field no "show" option
//TODO: add theme keys to allow styling for form input
//TODO: TYPESCRIPT UPDATE
// remove necessary field props and set defaults
const Field = ({
  data: {
    name = 'field',
    type = 'input',
    placeholder = 'placeholder',
    label = 'field',
    inputData = null
  } = {},
  fieldStyle = {},
  inputStyle = {},
  errors = [],
  ...props
}) => {
  try {
    if (typeof name === 'undefined' || typeof name !== 'string')
      throw TypeError('name cannot be undefined and must be type string');
    if (typeof type !== 'undefined' && typeof type !== 'string')
      throw TypeError('type cannot be undefined and must be type string');
    if (typeof placeholder !== 'undefined' && typeof placeholder !== 'string')
      throw TypeError(
        'placeholder cannot be undefined and must be type string'
      );
    if (typeof inputData !== 'undefined' && typeof inputData !== 'object')
      throw TypeError('inputData cannot be undefined and must be type object');

    if (type === 'select') {
      if (inputData) {
        if (typeof inputData.value !== 'string')
          throw TypeError('inputData value for select should be a string');
        if (typeof inputData.display !== 'string')
          throw TypeError('inputData display for select should be a string');
        if (
          typeof inputData.options === 'undefined' ||
          !Array.isArray(inputData.options)
        )
          throw TypeError('options with inputData select must be an array');
        inputData.options.forEach(inputOption => {
          for (const key in inputOption) {
            if (inputOption.hasOwnProperty(key)) {
              const option = inputOption[key];

              if (typeof option !== 'string' && typeof option !== 'number')
                throw TypeError(
                  'options property values must be string or integer'
                );
            }
          }
        });
      }
    }

    if (fieldStyle) {
      if (typeof fieldStyle !== 'object')
        throw TypeError('fieldStyle should be an object');
    }

    if (inputStyle) {
      if (typeof fieldStyle !== 'object')
        throw TypeError('fieldStyle should be an object');
    }

    if (errors) {
      if (!Array.isArray(errors))
        throw TypeError('fieldStyle should be an object');
    }
  } catch (err) {
    console.log('Im the error in the field component', err);
    return <div>Error in Field Component{err}</div>;
  }

  const [shown, setShown] = useState(false);
  const errorColor = errors.length >= 1 ? '#e95667' : null;
  let {
    fontSize: inputFontSize, 
    fontFamily: inputFontFamily,
    fontWeight: inputFontWeight,
    fontStyle: inputFontStyle,
    ...restInputStyles
  } = inputStyle;
 
  const buildInput = () => {
    const inputType =
      {
        select: 'select',
        slider: 'slider',
        textarea: 'textarea'
      }[type] || 'input';
      
    const inputProps = {
      ...props,
      pseudo: true,
      background: 'transparent',
      width: type === 'password' ? '75%' : '100%',
      height: 'auto',
      border: 'none',
      color: 'inherit',
      fontSize: inputFontSize,
      fontWeight: inputFontWeight,
      fontFamily: inputFontFamily,
      fontStyle: inputFontStyle,
      margin: '0',
      padding: '0 1em',
      focus: { outline: 'none' },
      isA: inputType,
      name,
      type: shown && type === 'password' ? 'text' : type,
      placeholder,
      themeStyle: restInputStyles.themeStyle,
      filterThemeStyles: restInputStyles.themeStyle ? ['fontSize', 'fontWeight', 'fontFamily', 'fontStyle'] : ''
    };

    switch (inputType) {
      case 'input':
        return (
          <Box
            className={`styled-react-input__${name.trim().replace(/\s/g, '-')}`}
            {...inputProps}
          />
        );
      case 'select':
        //TODO: ADD ERROR CATCH, NEED TO PASS OPTIONS FOR SELECT AND OPTIONS NEEDS TO BE TYPE ARRAY
        return (
          <Box className={`styled-react-select__${name.trim().replace(/\s/g, '-')}`} {...inputProps}>
            {inputData.options.map(option => (
              <option
                key={option[inputData.value]}
                value={option[inputData.value]}
              >
                {option[inputData.display]}
              </option>
            ))}
          </Box>
        );
    }
  };

  //TODO: Change tags to fieldset html elements for form
  return (
    <Div {...styleBuildRemove(fieldStyle)}>
      <FlexDiv flexDirection="column">
        <Box isA="label" htmlFor={name}>
          {label}
        </Box>
        {errors.length >= 1 ? (
          <Ul color={errorColor} fontSize="1em" className={`styled-react-errors__${name.trim().replace(/\s/g, '-')}`}>
            {handleErrorMessages(errors)}
          </Ul>
        ) : (
          ''
        )}
      </FlexDiv>
      <Div
        {...styleBuildRemove(restInputStyles, ['display', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle'])}
        display="flex"
        justifyContent="space-between"
        borderColor={errorColor}
        focusColor={errorColor}
        foucsBoxShadowColor={errorColor}
      >
        {buildInput()}
        {type === 'password' ? (
          <P
            fontSize="8px"
            m="auto"
            onClick={() => setShown(!shown)}
            textTransform="lowercase"
            cursor="pointer"
          >
            {shown ? 'hide' : 'show'}
          </P>
        ) : (
          ''
        )}
      </Div>
    </Div>
  );
};

export default Field;
