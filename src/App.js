import React, { useState } from 'react';
// import { Div, Button } from '@cbryant24/styled-react';
import InfiniteCarousel from './InfiniteCarousel';
import Modal from './Modal';
import {
  BounceAnimations,
  Div,
  Box,
  Ul,
  Li,
  Button,
  Field,
  P,
  H3,
} from '@cbryant24/styled-react';
import formData from './inputSingle';
import Form from './Form';
import { flashingText } from './style/animation';
import { Link } from "react-router-dom";
import LocalForm from './Field';

const App = () => {
  const [signinOpen, setSigninOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { form, inputs, buttons } = formData;
  const arr = [];

  for (let i = 0; i <= 11; i++) {
    arr.push(
      <Div
        width="85%"
        height="85%"
        border="1px solid purple"
        backgroundColor="red"
        color="white"
      >
        {i}
      </Div>
    );
  }

  const toggleModal = e => {
    setIsOpen(!isOpen);
    setModalMessage('Styled React!!');
  };

  const doStuff = () => {
    toggleModal();
    setSigninOpen(false);
  };

  function beforeOpenAsync() {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(console.log('Success'));
      }, 3000);
    });
  }

  function beforeOpening() {
    console.log('IM BEFORE OPENING');
  }

  function afterOpening() {
    console.log('IM AFTER OPENING');
  }

  function beforeClosing() {
    console.log('IM BEFORE CLOSING');
  }

  function afterClosing() {
    console.log('IM AFTER CLOSING');
  }
  // debugger;
  return (
    <Div bg="black" height="125vh" width="100vw">
      <Box isA={Link} to="/world" fontSize="20px">Hello World</Box>
      {/* <Form/> */}
      <LocalForm/>
    </Div>
  );
};

export default App;
