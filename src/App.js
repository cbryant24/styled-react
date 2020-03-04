import React, { useState } from 'react';
// import { Div, Button } from '@cbryant24/styled-react';
import InfiniteCarousel from './InfiniteCarousel';
import Modal from './Modal';
import {
  BounceAnimations,
  Div,
  Ul,
  Li,
  Button,
  Field,
  P,
  H3
} from '@cbryant24/styled-react';
import formData from './inputSingle';
import Form from '@cbryant24/styled-react-form';
import { flashingText } from './style/animation';

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
      <Modal
        id="chapivia-modal"
        modalMessage={modalMessage}
        isOpen={isOpen}
        toggleModal={toggleModal}
        beforeOpen={beforeOpening}
        afterOpen={beforeOpenAsync}
        beforeClose={beforeClosing}
        afteClose={afterClosing}
        allowScroll={false}
        afterClose={afterClosing}
      >
        <Div
          themeStyle={'modalContainer'}
          animation={{
            in: BounceAnimations.BounceInTop,
            duration_in: 1,
            animation_fill_mode: 'both'
          }}
        >
          <Div>Hell</Div>
          <Div>World</Div>
        </Div>
      </Modal>
      {/* <Field
        data={inputs[0].data}
        fieldStyle={inputs[0].fieldStyle}
        inputStyle={inputs[0].inputStyle}
      /> */}
      {/* <Form inputs={inputs} form={form} buttons={buttons} /> */}
      {/* <Button
        width="100px"
        height="100px"
        backgroundColor="red"
        onClick={doStuff}
      >
        Click Me
      </Button>
      <H3
        display={signinOpen ? 'none' : 'block'}
        textTransform="uppercase"
        themeStyle={['marginLargeY']}
        onClick={() => setSigninOpen(true)}
        color="primary"
        animation={flashingText}
      >
        Press Start To Play
      </H3>
      <Div height="90em"></Div> */}
      <InfiniteCarousel
        width="90vw"
        bp={50}
        carouselStyle={{ themeStyle: 'carouselNormal' }}

        //initialSlide={10}
      >
        {arr}
      </InfiniteCarousel>
    </Div>
  );
};

export default App;
