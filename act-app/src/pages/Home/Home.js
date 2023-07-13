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

const  Home = () => {
    const {mmLevel} = useContext(MMContext);
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
              <Card.Img style={{ width: '86px' }} variant="top" src={heartIcon} />
              <Card.Body>
                <Card.Title>{mmLevel}</Card.Title>
                <Card.Text>
                  This is your current MM level.
                </Card.Text>
                <MoodmetricInteractionButtons/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
      </div>
    );
}
  
export default Home;