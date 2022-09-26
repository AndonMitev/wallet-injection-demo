import Modal from 'react-modal'

const customStyles = {
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CustomModal = ({ children, isOpen }) => {
  return <Modal
    isOpen={isOpen}
    style={customStyles}
    contentLabel="Example Modal"
  >
    {children}
  </Modal>
}