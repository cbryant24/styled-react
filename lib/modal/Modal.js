import React, { useState, useEffect, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { usePrev } from '../hooks';
import ModalContext from './context';
import Box from '../Box';

// modal element
const StyledModal = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const prevModalOpen = usePrev(modalOpen);
  const { modalNode } = useContext(ModalContext);
  const {
    isOpen,
    afterClose,
    allowScroll,
    onEscapeKeydown,
    afterOpen,
    beforeOpen,
    beforeClose
  } = props;
  const prevIsOpen = usePrev(isOpen);

  const afterCloseCallback = useCallback(afterClose);
  const afterOpenCallback = useCallback(afterOpen);
  const beforeOpenCallback = useCallback(beforeOpen);
  const beforeCloseCallback = useCallback(beforeClose);

  let prevBodyOverflow = null;

  // whenever props isOpen is changed set modal to open or close
  useEffect(() => {
    isOpen && setModalOpen(isOpen);
  }, [isOpen]);

  // if modal is closing invoke afterClose callback cleanup event listeners
  // if modal is opening set scroll setting invoke afterOpen callback functions set event listeners
  useEffect(() => {
    if (prevModalOpen !== modalOpen) {
      if (!modalOpen && prevModalOpen) {
        cleanUp();

        afterCloseCallback && afterCloseCallback();
      } else if (modalOpen && !prevModalOpen) {
        document.addEventListener('keydown', onKeydown);

        if (!allowScroll) {
          prevBodyOverflow = window.getComputedStyle(document.body).overflow;

          document.body.style.overflow = 'hidden';
        }

        afterOpenCallback && afterOpenCallback();
      }
    }

    // Handle prop changes
    if (prevIsOpen !== isOpen) {
      if (isOpen) {
        try {
          beforeOpenCallback().then(handleChange(true));
        } catch (err) {
          handleChange(true);
        }
      } else if (!isOpen && prevIsOpen) {
        beforeCloseCallback && beforeCloseCallback();
        handleChange(false);
      }
    }

    return cleanUp;
  }, [prevModalOpen, prevIsOpen, modalOpen, isOpen]);

  function handleChange(state) {
    setModalOpen(state);
  }

  const cleanUp = () => {
    document.removeEventListener('keydown', onKeydown);

    if (!allowScroll) {
      document.body.style.overflow = prevBodyOverflow || '';
    }
  };

  // event handler for escape key pressing when modal is open if callback provided
  const onKeydown = e => {
    if (e.key === 'Escape') {
      onEscapeKeydown && onEscapeKeydown(e);
    }
  };

  // use useRef created in context provider for reference to element background for firing onBackgroundClick callback
  const onBackgroundClick = e => {
    if (props.id === e.target.id || e.target.id === 'background-modal') {
      props.onBackgroundClick && props.onBackgroundClick(e);
    }
  };

  if (modalNode && isOpen) {
    // When passing a styled-system component need to clone the element to add props and event handlers
    const ModalBackground = React.createElement(
      Box,
      {
        ...props.modalBackgroundStyle,
        id: props.id
          ? props.id
          : `background-modal-${Math.floor(Math.random() * 100)}`,
        onClick: onBackgroundClick
      },
      props.children
    );

    return ReactDOM.createPortal(ModalBackground, modalNode.current);
  }

  return <div></div>;
};

export default StyledModal;
