import React, { useState, useEffect, useRef } from 'react';
import ModalContext from './context';
import { usePrev } from '../hooks';

const ModalProvider = props => {
  const [modalNode, setModalNode] = useState(null);
  const modalDiv = useRef();

  useEffect(() => {
    setModalNode(modalDiv);
  }, [modalDiv]);

  // context provider providing the modal component with the node ref for the div
  // that will sit sibling to main app and house the modal component
  return (
    <ModalContext.Provider value={{ modalNode }}>
      {props.children}
      <div id="styled-react-modal" ref={modalDiv} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
