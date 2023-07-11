import MenuBar from "../../components/MenuBar/MenuBar";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import DiaryForm from "../../components/DiaryForm/DiaryForm";
import DiaryModal from "../../components/DiaryModal/DiaryModal";
import {getAllEntries} from "../../api/diaryApi";
import {addEntry} from "../../api/diaryApi";
import {getEntry} from "../../api/diaryApi";

const  Diary = () => {
  const [entries, setEntries] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState([
    {
      "title": "",
      "date": new Date(),
      "content": "",
      "id": 0
    },
  ]);

  useEffect(() => {
    getEntries();
  }, []);
  
  const getEntries = async () => {
    getAllEntries().then(response => {
      setEntries(response.data);
    })
  };

  const toggle = () => {
    setisOpen(!isOpen);
  };

  const handleNewEntry = async (title,content) => {
    const entryObject = {
      "title": title,
      "date": new Date(),
      "content": content
    }
    addEntry(entryObject).then(response => {
        getEntries();
      });
  };

  const handleViewEntry = async (e) => {
    const entryId = e.target.name;
    getEntry(entryId).then(response => {
      setCurrentEntry(response.data);
    });
    toggle();
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
      <DiaryModal isOpen={isOpen} toggle={toggle} title={currentEntry.title} content={currentEntry.content} />
      <Container fluid="md">
      <Row className="mx-2 my-0">
        <Col><p>Diary</p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>Reflect on situations that made you feel uncomfortable or actions your partook in which do not align with your values, this can help you recognize unfavorable patterns of behaviour and thoughts. You can also keep track of positive steps and attitudes you took towards your values and apreciate your improvement. </p></Col>
      </Row>
      <Row className="mx-2 my-0">
        <Col><p>New diary entry</p></Col>4
      </Row>
      <Row className="mx-2 my-0">
        <Col>
          <DiaryForm handleNewEntry={handleNewEntry}/>
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
                <th>#</th>
                <th>Title</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              entries.map(entry => {
                return (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.title}</td>
                    <td>{formatDate(entry.date)}</td>
                    <td><Button name={entry.id} variant="primary" onClick={(handleViewEntry)}>View</Button></td>
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