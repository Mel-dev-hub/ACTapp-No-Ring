import MenuBar from "../../components/MenuBar/MenuBar";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NewDiaryForm from "../../components/NewDiaryForm/NewDiaryForm";
import DiaryModal from "../../components/DiaryModal/DiaryModal";
import { getAllUserEntries, addEntry, deleteEntry, getEntry, updateEntry, addDiaryLog } from "../../api/firestoreApi";
import { getCurrentUser }  from "../../api/auth";
import Card from 'react-bootstrap/Card';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const  Diary = () => {
  const [entries, setEntries] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState([
    {
      "title": "",
      "date": new Date(),
      "content": "",
      "id": ""
    },
  ]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getEntries();
  }, []);
  
  const getEntries = async () => {
    const user = await getCurrentUser();
    if(user){
      const userId = user.uid;
      await getAllUserEntries(userId).then(response => {
        setEntries(response);
      })
    }
  };

  const toggle = () => {
    setisOpen(!isOpen);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNewEntry = async (title,content) => {
    addEntry(title,content).then(response => {
      getEntries();
    });
  };

  const getEntryInfo = async (entryId) => {
    getEntry(entryId).then(response => {
      setCurrentEntry({
        "title": response.title,
        "date": response.date,
        "content": response.content,
        "id": entryId
      });
    });
  }

  const handleView = async (entryId) => {
    setEditMode(false);
    getEntryInfo(entryId);
    addDiaryLog("DIARY ENTRY VIEWED");
    toggle();
  };

  const handleDelete = async (entryId) => {
    deleteEntry(entryId).then(response => {
      getEntries();
    });
  };

  const handleUpdateEntry = async (id, title,content) => {
    updateEntry(id, title, content).then(response => {
      getEntryInfo(id);
      getEntries();
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
      <DiaryModal 
        isOpen={isOpen} 
        toggle={toggle} 
        id={currentEntry.id} 
        title={currentEntry.title} 
        content={currentEntry.content} 
        editMode={editMode} 
        toggleEditMode={toggleEditMode}
        handleUpdateEntry={handleUpdateEntry} 
      />
      <Container fluid="md" className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
      <Row className="mx-2 mt-5">
        <Col><h4 className="white-text">My diary</h4></Col>
      </Row>
      <Row className="mx-2 mb-3">
        <Col><p className="white-text instructions">Reflect on situations that made you feel uncomfortable or actions your partook in which do not align with your values, additionally, you can keep track of positive attitutes or actions. If the system sent you a notification it might be helpful to write down what you were doing and/or thinking about in that moment. </p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col>
          <Card>                     
            <Card.Body>
              <Card.Title className="align-left">Add diary entry</Card.Title>   
              <NewDiaryForm handleNewEntry={handleNewEntry}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mx-2 mt-5">
        <Col><h5 className="align-left white-text">All diary entries</h5></Col>
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
              entries.map((entry, index) => {
                return (
                  <tr key={entry.id}>
                    <td>{index+1}</td>
                    {/* <td>{entry.id}</td> */}
                    <td>{entry.title}</td>
                    <td>{formatDate(entry.date.toDate())}</td>
                    <td><Button id={entry.id} variant="primary"  onClick={() => handleView(entry.id)}><BiEdit color="white" size="25px"/></Button></td>
                    <td><Button id={entry.id} variant="danger" onClick={() => handleDelete(entry.id)}><RiDeleteBin5Line color="white" size="25px"/></Button></td>
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
  
export default Diary;