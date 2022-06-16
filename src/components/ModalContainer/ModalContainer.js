import * as React from 'react';
import { ReactModalAdaptor } from './ReactModalAdaptor';

const ModalContainer = ({ modalIsOpen, toggleModal, children }) => {
  return (
    <ReactModalAdaptor
      closeTimeoutMS={200}
      isOpen={modalIsOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </ReactModalAdaptor>
  );
};

export default ModalContainer
