import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as Yup from "yup";
import { register } from "../../api/auth";
import { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const  RegisterForm = ({onLoginClicked, toggleShowParent}) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const schema = Yup.object().shape({
        displayName: Yup.string().required("Required field."),
        email: Yup.string().required("Required field."),
        password: Yup.string().required("Required field.")
    });

    return (
        <div>

            <Modal.Header closeButton>
                <Modal.Title data-testid="signup-title">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    { alertMessage }
                </Alert>

                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        register(values.displayName, values.email, values.password).then((result) => {
                            if (result.status===200) {
                                setUser(result.user);
                                navigate("/");
                                toggleShowParent();                                
                            } 
                            else {
                                if(result.message) {
                                    setAlertMessage(result.message);
                                } else {
                                    setAlertMessage("Register failed, unknown error.");
                                }
                                setShowAlert(true);
                            }
                        });
                    }}
                    initialValues={{
                        displayName: "",
                        email: "",
                        password: ""
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} md="3" controlId="displayName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    data-testid="displayName"
                                    type="text"
                                    name="displayName"
                                    value={values.displayName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.displayName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.displayName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} md="3" controlId="emailField">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    data-testid="email-signup"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} md="3" controlId="passwordField">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    data-testid="password-signup"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} md="3" className="mt-3">
                                <Button data-testid="signup-submit" type="submit">Register</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={onLoginClicked}>
                    Sign in
                </Button>
            </Modal.Footer>
        </div>
    );
}
  
export default RegisterForm;

