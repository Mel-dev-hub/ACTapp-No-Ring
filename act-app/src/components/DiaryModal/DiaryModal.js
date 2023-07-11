import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const  DiaryModal = ({isOpen,toggle,title,content}) => {
    return (
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={isOpen} onHide={toggle}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <p>{content}</p>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={toggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
  
export default DiaryModal;