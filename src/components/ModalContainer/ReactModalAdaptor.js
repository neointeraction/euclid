import Modal from 'react-modal';

/* This just wraps react-modal to allow styling the modal overlay,
 you shouldn't have the need to change this at all */
export const ReactModalAdaptor = ({ ...props }) => {
  Modal.setAppElement('#root'); // suppresses modal-related test warnings.
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      zIndex: 9999,
      padding: 0,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(1px)',
      zIndex: 50,
    },
  };

  return (
    <Modal
      style={customStyles}
      onAfterOpen={() => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
      }}
      onAfterClose={() => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }}
      {...props}
    />
  );
};
