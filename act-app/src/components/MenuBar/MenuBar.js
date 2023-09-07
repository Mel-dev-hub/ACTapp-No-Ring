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
import { PiUserCircleThin, PiNotebook } from "react-icons/pi";
import { GrLogout} from "react-icons/gr";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import "./MenuBar.css";
import logo from "../../images/logo_1000x500.png";

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
                <div>Hello, {user.displayName} <button className="logout-button" onClick={handleLogout}><GrLogout size={"25px"} /></button></div>
            );            
        }else{
            return(
                <div>
                    <Button variant="link" onClick={toggle}><PiUserCircleThin color="black" size="40px"/></Button>                     
                </div>
            );   
        }
    };

    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
            <Container className="justify-content-start">
                <Navbar.Brand as={Link} to="/"><img style={{ width: '90px' }} src={logo} alt="App logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"><AiOutlineHome color="black" size="30px"/></Nav.Link>
                        <Nav.Link as={Link} to="/exercises"><GoVideo color="black" size="30px"/></Nav.Link>
                        <Nav.Link as={Link} to="/diary"><PiNotebook color="black" size="30px"/></Nav.Link>
                        <Nav.Link as={Link} to="/values"><AiOutlineStar color="black" size="30px"/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    { getContent() }
                </Navbar.Text>
            </Container>
            </Navbar>
            <LoginRegisterModal isOpen={isOpen} toggle={toggle} />
        </div>
    );
  }
  
  export default MenuBar;