import MenuBar from "../../components/MenuBar/MenuBar";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import NewDiaryForm from "../../components/NewDiaryForm/NewDiaryForm";
import DiaryModal from "../../components/DiaryModal/DiaryModal";
import { getAllUserEntries, addEntry, deleteEntry, getEntry, updateEntry } from "../../api/firestoreApi";
import { getCurrentUser }  from "../../api/auth";

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

  const handleView = async (e) => {
    const entryId = e.target.name;
    setEditMode(false);
    getEntryInfo(entryId);
    toggle();
  };

  const handleDelete = async (e) => {
    const entryId = e.target.name;
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
      <Container fluid="md">
      <Row className="mx-2 my-0">
        <Col><p>Diary</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>Reflect on situations that made you feel uncomfortable or actions your partook in which do not align with your values, this can help you recognize unfavorable patterns of behaviour and thoughts. You can also keep track of positive steps and attitudes you took towards your values and apreciate your improvement. </p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>New diary entry</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col>
          <NewDiaryForm handleNewEntry={handleNewEntry}/>
        </Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>All entries</p></Col>
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
              entries.map((entry, index) => {
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
  
export default Diary;