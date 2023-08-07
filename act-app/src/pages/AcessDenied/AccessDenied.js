import MenuBar from "../../components/MenuBar/MenuBar";
import "./AccessDenied.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const  AcessDenied = () => {
    return (
        <div className="bg">
            <MenuBar/>
            <Container>
                <Row className="pt-5">
                    <Col><h4 className="pt-5">Welcome to ACTapp!</h4></Col>
                </Row>
                <Row>
                    <Col><div className="white-text">Sign in or register to use the system</div></Col>
                </Row>
            </Container>
        </div>
    );
}

export default AcessDenied;