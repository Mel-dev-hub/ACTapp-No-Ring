import MenuBar from "../../components/MenuBar/MenuBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import heartIcon from '../../images/heart-rate-256x256.png';
import "./Home.css";
import MoodmetricInteractionButtons from "../../components/MoodmetricInteractionButtons/MoodmetricInteractionButtons";
import {useContext} from "react";
import {MMContext} from "../../context/MMContext";
import Button from 'react-bootstrap/Button';
import {sendNotifEmail} from "../../api/emailApi";

const  Home = () => {
    const {mmLevel} = useContext(MMContext);
    const {status} = useContext(MMContext);
    const {statusBits} = useContext(MMContext);

    const sendTestPushNotif = () => {
      const name = "Naruto Uzumaki";
      const email = "chezhire.cat@gmail.com";
      sendNotifEmail(name,email);
    };

    return (
      <div>
        <MenuBar/>
        <Container fluid="md">
        <Row className="mx-2 my-0">
          <Col><p>Home</p></Col>
        </Row>
        <Row className="mx-2 my-0">
          <Col>
            <Card>              
              <Card.Body>
                <Card.Img style={{ width: '86px' }} variant="top" src={heartIcon} />
                <Card.Text>Status: {status}</Card.Text>
                <Card.Title>Status bits = {statusBits}</Card.Title>
                <Card.Title>MM Level = {mmLevel}</Card.Title>
                <Card.Text>Current MM level.</Card.Text>
                <MoodmetricInteractionButtons/>
                <Row> 
                  <Button size="lg" variant="success" onClick={(sendTestPushNotif)}>Send test notif</Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
      </div>
    );
}
  
export default Home;