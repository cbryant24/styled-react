import React from 'react';
import {
  StyledModal,
  BounceAnimations,
  Div,
  Ul,
  Li,
  Button,
  P
} from '@cbryant24/styled-react';

export default ({
  isOpen,
  toggleModal,
  modalMessage,
  beforeOpen,
  afterClose,
  beforeClose,
  afterOpen
}) => {
  return (
    <StyledModal
      id="styled-react-modal"
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      allowScroll={false}
      modalBackgroundStyle={{ themeStyle: 'modalBackgroundStyle' }}
      beforeOpen={beforeOpen}
      afterClose={afterClose}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
    >
      <Div
        themeStyle={['modalContainer']}
        animation={{
          in: BounceAnimations.BounceInTop,
          duration_in: 1,
          animation_fill_mode: 'both'
        }}
      >
        <Ul textAlign="center" my={[1]}>
          {Array.isArray(modalMessage) ? (
            modalMessage.map(message => (
              <Li key={message}>{message.message}</Li>
            ))
          ) : (
            <Li>
              <P>{modalMessage}</P>
            </Li>
          )}
        </Ul>
        <Button
          themeStyle={['squareButton', 'marginSmall']}
          alignSelf="flex-end"
          onClick={toggleModal}
        >
          Close
        </Button>
      </Div>
    </StyledModal>
  );
};
