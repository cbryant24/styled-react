import React from 'react';
import { Div } from '@cbryant24/styled-react';
import Form from '@cbryant24/styled-react-form';

const App = () => {
  const signinValidation = {
    title: 'signup',
    description: 'User Signin',
    inputs: [
      {
        name: 'email',
        blur: 'emptyOrEmail',
        change: 'emptyOrSafeString'
      },
      {
        name: 'password',
        blur: 'emptyOrSafeString',
        change: 'emptyOrSafeString'
      }
    ],
    inputErrorMessages: {
        email: 'Email should be in email format',
        password: 'Password should only contain letters, numbers, and ! @ # $ % characters'
    },
    submit: [
      {
        name: 'email',
        validate: 'safeString'
      },
      {
        name: 'password',
        validate: 'safeString',
      },
    ],
    submitErrorMessages: {
      email: 'There was an error in the email field',
      password: 'There was an error in the password field'
    }
  }

  const inputs = [
    {
      data: { type: 'email', name: 'email', label: 'email', placeholder: 'enter email', required: true },
      fieldStyle: 'field',
      inputStyle: { themeStyle: 'inputNorm'}
    },
    {
      data: { type: 'password', name: 'password', label: 'password', placeholder: 'enter password', required: true },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: { themeStyle: 'inputNorm'}
    }
  ];

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: 'squareButton' },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ];

  const form = {
    data: { name: 'signinForm', submit: 'signup' },
    style: 'authForm'
  }

  

  function userSignin() {
    debugger
  }

  return (
    <Div width="20rem" height="20rem" themeStyle="colorBg" fontSize={[1]}>
      <Form
        onSubmit={userSignin}
        form={form}
        inputs={inputs}
        validate={signinValidation}
        buttons={buttons}
      />
    </Div>
  )
}

export default App;