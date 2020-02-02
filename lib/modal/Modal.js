import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { usePrev } from '../hooks';
import ModalContext from './context';
import Box from '../Box';

// modal element
const Modal = props => {
  const [modalOpen, setModalOpen]           = useState(false);
  const prevModalOpen                       = usePrev(modalOpen);
  const { BackgroundComponent, modalNode }  = useContext(ModalContext);
  const {isOpen, 
        afterClose, 
        allowScroll, 
        onEscapeKeydown, 
        afterOpen }                         = props;
  const prevIsOpen                          = usePrev(isOpen);
  //used to get areference to the background to click on
  const nodeRef = useRef();

  let prevBodyOverflow = null;

  // whenever props isOpen is changed set modal to open or close
  useEffect(() => {
    props.isOpen && setModalOpen(props.isOpen);
  }, [isOpen]);

  // if modal is closing invoke afterClose callback cleanup event listeners
  //if modal is opening set scroll setting invoke afterOpen callback functions set event listeners
  useEffect(() => {
    if ( prevModalOpen !== modalOpen) {
      if(!modalOpen) {
        cleanUp();

        afterClose && afterClose();
      } else if (modalOpen) {
        document.addEventListener('keydown', onKeydown);

        if (!allowScroll) {
          prevBodyOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
        }

        afterOpen && afterOpen();
      }
    }

    // Handle prop changes
    if (prevIsOpen !== isOpen) {
      if (isOpen) {
        handleChange('beforeOpen', true);
      } else {
        handleChange('beforeClose', false);
      }
    }

    return cleanUp;
    
  });

  const cleanUp = () => {
    document.removeEventListener('keydown', onKeydown)

    if (!allowScroll) {
      document.body.style.overflow = prevBodyOverflow || ''
    }
  };

  // event handler for escape key pressing when modal is open if callback provided
  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      onEscapeKeydown && onEscapeKeydown(e)
    }
  };

  //handle asynchronous callback 
  const handleChange = (event, newState) => {
    if (props[event]) {
      try {
        props[event]()
          .then( setModalOpen(newState));
      } catch (e) {
        setModalOpen(newState);
      }
    } else {
      setModalOpen(newState);
    }
  };

  // use useRef created in context provider for reference to element background for firing onBackgroundClick callback
  const onBackgroundClick = (e) => {
    
    if (nodeRef.current.props.id === e.target.id) {
      props.onBackgroundClick && props.onBackgroundClick(e)
    }
  };
  
  //TODO: need to add a check for a proper background and and if they want "no background"
  if (modalNode && BackgroundComponent && isOpen) {
    debugger 
    // When passing a styled-system component need to clone the element to add props and event handlers
    const NewModalBackground = React.cloneElement(BackgroundComponent, 
                                                  { 
                                                    id: props.id ? props.id : 'background-modal',
                                                    ...props.backgroundProps,
                                                    onClick: onBackgroundClick, 
                                                    ref: nodeRef, 
                                                  }, 
                                                  {...props.children})
                                                  debugger
    // ReactDOM will add the modal background to the element created for the modal component
    return ReactDOM.createPortal( NewModalBackground, modalNode.current);
  }

  return <div></div>
}

export default Modal;
