import MenuBar from "../../components/MenuBar/MenuBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YoutubeEmbed from '../../components/YoutubeEmbed/YoutubeEmbed';

function Exercises() {
    return (
      <div>
        <MenuBar/>
        <Container fluid="md">
          <Row className="mx-2 my-3">
            <Col><YoutubeEmbed embedId="XSaBR58f7I0" /></Col>
          </Row>
          <Row className="mx-2 my-3">
            <Col><YoutubeEmbed embedId="PCajG16Fryo" /></Col>
          </Row>
          <Row className="mx-2 my-3 pb-5">
            <Col><YoutubeEmbed embedId="TGD8zKvRxc4" /></Col>
          </Row>
        </Container>
      </div>
    );
}
  
export default Exercises;