import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import Button from 'react-bootstrap/Button';
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function MenuBar() {
    const [isOpen, setisOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const toggle = () => {
        setisOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate("/accessdenied");
    };

    const getContent = () => {
        if(user){
            return(
                <div>Hello, {user.email} <Button variant="primary" onClick={handleLogout}>Logout</Button></div>
            );            
        }else{
            return(
                <div>
                    <Button variant="link" onClick={toggle}>Sign in/register</Button>                     
                </div>
            );   
        }
    };

    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand as={Link} to="/">ACTapp</Navbar.Brand>
                <Navbar.Collapse className="justify-content-start">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/exercises">Exercises</Nav.Link>
                        <Nav.Link as={Link} to="/diary">Diary</Nav.Link>
                        <Nav.Link as={Link} to="/values">Values</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        { getContent() }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <LoginRegisterModal isOpen={isOpen} toggle={toggle} />
        </div>
    );
  }
  
  export default MenuBar;