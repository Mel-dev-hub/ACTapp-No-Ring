import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateValueForm from '../UpdateValueForm/UpdateValueForm';

const  ValueModal = ({isOpen, toggle, id, title, content, editMode, toggleEditMode, handleUpdateValue}) => {

  const getTitle = () => {
    if(editMode){
      return(
        <div>Edit value</div>
      );
    }
    else{
        return(
          <div>{title}</div>
        );
    }
  }

  const getBody = () => {
    if(editMode){
      return(
        <UpdateValueForm valueId={id} updateValue={handleUpdateValue} title={title} content={content} toggleEditMode={toggleEditMode}/>
      );
    }
    else{
        return(
          <div>{ content }</div>
        );
    }
  }

  const getButtonLabel = () => {
    if(editMode){
      return(
        <div>View</div>
      );
    }
    else{
        return(
          <div>Edit</div>
        );
    }
  }

  return (
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={ isOpen } onHide={ toggle }>
        <Modal.Header closeButton>
          <Modal.Title>
            {getTitle()}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {getBody()}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ toggle }>Close</Button>
          <Button variant="primary" onClick={ toggleEditMode }>{getButtonLabel()}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  
export default ValueModal;