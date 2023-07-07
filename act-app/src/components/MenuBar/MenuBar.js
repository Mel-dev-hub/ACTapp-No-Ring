import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function MenuBar() {
    return (
        <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
                <Nav.Link as={Link} to="/">Exercises</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={Link} to="/diary">Diary</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={Link} to="/values">Values</Nav.Link>
            </Nav.Item>
        </Nav>
    );
  }
  
  export default MenuBar;