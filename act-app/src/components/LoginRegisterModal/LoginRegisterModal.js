import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const LoginRegisterModal = ({isOpen, toggle, isLoggedIn}) => {
    const [isLoginContent, setIsLoginContent] = useState(true);

    const toggleContent = () => {
        setIsLoginContent(!isLoginContent);
    };

    return (
        <Modal show={isOpen} onHide={toggle}>
            {
                isLoginContent
                    ? (<LoginForm onRegisterClicked={toggleContent} toggleShowParent={toggle} isLoggedIn={isLoggedIn} />)
                    : (<RegisterForm onLoginClicked={toggleContent} toggleShowParent={toggle} isLoggedIn={isLoggedIn} />)
            }
        </Modal>
    );
};

export default LoginRegisterModal;