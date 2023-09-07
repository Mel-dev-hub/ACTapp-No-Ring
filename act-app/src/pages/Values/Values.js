import MenuBar from "../../components/MenuBar/MenuBar";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NewValueForm from "../../components/NewValueForm/NewValueForm";
import ValueModal from "../../components/ValueModal/ValueModal";
import { getAllUserValues, addValue, deleteValue, getValue, updateValue, addValuesLog } from "../../api/firestoreApi";
import { getCurrentUser }  from "../../api/auth";
import Card from 'react-bootstrap/Card';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

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

  const handleView = async (entryId) => { 
    setEditMode(false);
    getValueInfo(entryId);
    addValuesLog("VALUE VIEWED");
    toggle();
  };

  const handleDelete = async (entryId) => {
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
      <Container fluid="md" className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
      <Row className="mx-2 mt-5">
        <Col><h4 className="white-text">My values</h4></Col>
      </Row>
      <Row className="mx-2 mb-3">
        <Col><p className="white-text instructions">Use this section for listing life values that are important to you and would make your life more meaningful as well as actionable steps you can take towards them. If you need time to think, you can leave the second field blank and come back to it later by editing the value in the table below.</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col>
          <Card>                     
            <Card.Body>
              <Card.Title className="align-left">Add value</Card.Title>   
              <NewValueForm handleNewValue={handleNewValue}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mx-2 mt-5">
        <Col><h5 className="align-left white-text">All values</h5></Col>
      </Row>
      <Row className="mx-2 mb-3">
        <Col>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date Added</th>
                <th>View/Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {
              values.map((entry, index) => {
                return (
                  <tr key={entry.id}>
                    <td>{index+1}</td>
                    {/* <td>{entry.id}</td> */}
                    <td>{entry.title}</td>
                    <td>{formatDate(entry.date.toDate())}</td>
                    <td><Button name={entry.id} variant="primary" onClick={() => handleView(entry.id)}><BiEdit color="white" size="25px"/></Button></td>
                    <td><Button name={entry.id} variant="danger" onClick={() => handleDelete(entry.id)}><RiDeleteBin5Line color="white" size="25px"/></Button></td>
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