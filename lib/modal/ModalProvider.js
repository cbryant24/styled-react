import React, { useState, useEffect, useRef } from 'react';
import ModalContext from './context';
import { usePrev } from '../hooks';
import ModalBackground from './ModalBackground';

const ModalProvider = (props) => {
  const [modalNode, setModalNode]                     = useState(null);
  const [BackgroundComponent, setBackgroundComponent] = useState(ModalBackground);
  const prevBackgroundComponent                       = usePrev(BackgroundComponent);
  const modalDiv                                      = useRef();
  
  useEffect( () => {
    setModalNode(modalDiv);
  }, [modalDiv]);
  
  //TODO: need to add a check for a proper background and and if they want "no background"
  //TODO: check if this can be set to only changes with props.BackgroundComponent?
  // if no BackgroundComponent is provided set to default background component
  useEffect( () => {
    if(props.BackgroundComponent !== prevBackgroundComponent && props.BackgroundComponent) {
      debugger
      setBackgroundComponent(props.BackgroundComponent);
    }
  });

  // context provider providing the modal component with the node ref for the div  
  // that will sit sibling to main app and house the modal component
  return (
    <ModalContext.Provider value={{
      modalNode,
      BackgroundComponent
    }}>
      {props.children}
      <div id="styled-react-modal" ref={modalDiv}/>
    </ModalContext.Provider>
  );

}

export default ModalProvider;
