import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Formik} from "formik";
import * as Yup from "yup";
import Row from 'react-bootstrap/Row';

const  UpdateValueForm = ({valueId, updateValue, title, content, toggleEditMode}) => {
    const schema = Yup.object().shape({
        title: Yup.string().required("Field is required!"),
    });
    return (
      <div>
          <Formik
                    validationSchema={schema}
                    onSubmit={(values, {resetForm}) => {
                        updateValue(valueId, values.title, values.content);
                        toggleEditMode();
                    }}
                    initialValues={{
                        title: title,
                        content: content,
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,                        
                        values,                        
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} md="3" controlId="titleField" className="mb-2">                                
                                <Form.Control                                    
                                    type="text"                                    
                                    name="title"
                                    placeholder="Enter title"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} md="3" controlId="contentField">                                
                                <Form.Control  
                                    as="textarea" 
                                    rows={3}                                                                    
                                    name="content"
                                    placeholder="Enter new diary entry"
                                    value={values.content}
                                    onChange={handleChange}
                                    isInvalid={!!errors.content}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} md="3" className="mt-3">
                                <Button type="submit" >Submit</Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
      </div>
    );
}
  
export default UpdateValueForm;