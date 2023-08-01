import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const LoginRegisterModal = ({isOpen, toggle}) => {
    const [isLoginContent, setIsLoginContent] = useState(true);

    const toggleContent = () => {
        setIsLoginContent(!isLoginContent);
    };

    return (
        <Modal show={isOpen} onHide={toggle}>
            {
                isLoginContent
                    ? (<LoginForm onRegisterClicked={toggleContent} toggleShowParent={toggle} />)
                    : (<RegisterForm onLoginClicked={toggleContent} toggleShowParent={toggle} />)
            }
        </Modal>
    );
};

export default LoginRegisterModal;