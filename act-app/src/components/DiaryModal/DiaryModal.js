import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateDiaryForm from '../UpdateDiaryForm/UpdateDiaryForm';

const  DiaryModal = ({isOpen, toggle, id, title, content, editMode, toggleEditMode, handleUpdateEntry}) => {

  const getTitle = () => {
    if(editMode){
      return(
        <div>Edit diary entry</div>
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
        <UpdateDiaryForm entryId={id} updateEntry={handleUpdateEntry} title={title} content={content} toggleEditMode={toggleEditMode}/>
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
        <div className="white-text">View</div>
      );
    }
    else{
        return(
          <div className="white-text">Edit</div>
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
  
export default DiaryModal;