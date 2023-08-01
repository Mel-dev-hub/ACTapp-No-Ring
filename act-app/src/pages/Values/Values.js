import MenuBar from "../../components/MenuBar/MenuBar";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NewValueForm from "../../components/NewValueForm/NewValueForm";
import ValueModal from "../../components/ValueModal/ValueModal";
import { getAllUserValues, addValue, deleteValue, getValue, updateValue } from "../../api/firestoreApi";
import { getCurrentUser }  from "../../api/auth";

function Values() {

  const [values, setValues] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState([
    {
      "title": "",
      "date": new Date(),
      "content": "",
      "id": ""
    },
  ]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getValues();
  }, []);
  
  const getValues = async () => {
    const user = await getCurrentUser();
    if(user){
      const userId = user.uid;
      await getAllUserValues(userId).then(response => {
        setValues(response);
      })
    }
  };

  const toggle = () => {
    setisOpen(!isOpen);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNewValue = async (title,content) => {
    addValue(title,content).then(response => {
      getValues();
    });
  };

  const getValueInfo = async (valueId) => {
    getValue(valueId).then(response => {
      setCurrentValue({
        "title": response.title,
        "date": response.date,
        "content": response.content,
        "id": valueId
      });
    });
  }

  const handleView = async (e) => {
    const entryId = e.target.name;
    setEditMode(false);
    getValueInfo(entryId);
    toggle();
  };

  const handleDelete = async (e) => {
    const entryId = e.target.name;
    deleteValue(entryId).then(response => {
      getValues();
    });
  };

  const handleUpdateValue = async (id, title,content) => {
    updateValue(id, title, content).then(response => {
      getValueInfo(id);
      getValues();
    });
  };

  const formatTime = (num) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${formatTime(date.getDate())}.${formatTime(date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

    return (
      <div>
      <MenuBar/>
      <ValueModal 
        isOpen={isOpen} 
        toggle={toggle} 
        id={currentValue.id} 
        title={currentValue.title} 
        content={currentValue.content} 
        editMode={editMode} 
        toggleEditMode={toggleEditMode}
        handleUpdateValue={handleUpdateValue} 
      />
      <Container fluid="md">
      <Row className="mx-2 my-0">
        <Col><p>Values</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>Use this section for listing life values that are important to you and would make your life more meaningful as well as actionable steps you can take towards them. If you need time to think, you can leave the second field blank and come back to it later by editing the value in the table below.</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>New value</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col>
          <NewValueForm handleNewValue={handleNewValue}/>
        </Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>All values</p></Col>
      </Row>
      <Row className="mx-2 my-3">
        <Col>
          <Table bordered>
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Date Added</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              values.map((entry, index) => {
                return (
                  <tr key={entry.id}>
                    <td>{index+1}</td>
                    <td>{entry.title}</td>
                    <td>{formatDate(entry.date.toDate())}</td>
                    <td><Button name={entry.id} variant="primary" onClick={(handleView)}>View/Edit</Button></td>
                    <td><Button name={entry.id} variant="danger" onClick={(handleDelete)}>Delete</Button></td>
                  </tr>
                );
              })
            }
            </tbody>
          </Table>
        </Col>
      </Row>
      </Container>
    </div>
    );
}
  
export default Values;