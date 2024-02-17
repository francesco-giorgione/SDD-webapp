import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function FormLogin() {
    // State variables to store form input values
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // const { session, login, logout } = useContext(SessionContext);
    //
    // const navigate = useNavigate();

    // Event handler to update form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Event handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here (e.g., send it to an API)
        console.log(formData);

        // login(formData.username);

        sessionStorage.setItem("username",formData.username);

        console.log(sessionStorage.getItem("username"));

        window.location.reload();

        // Clear form fields if needed
        // setFormData({
        //     username: '',
        //     password: ''
        // });
    };

    return (
        <div>
        {/*<form onSubmit={handleSubmit}>*/}
        {/*    <label>*/}
        {/*        Username:*/}
        {/*        <input*/}
        {/*            type="text"*/}
        {/*            name="username"*/}
        {/*            value={formData.username}*/}
        {/*            onChange={handleChange}*/}
        {/*        />*/}
        {/*    </label>*/}
        {/*    <br/>*/}
        {/*    <label>*/}
        {/*        Password:*/}
        {/*        <input*/}
        {/*            type="password"*/}
        {/*            name="password"*/}
        {/*            value={formData.password}*/}
        {/*            onChange={handleChange}*/}
        {/*        />*/}
        {/*    </label>*/}
        {/*    <button type="submit">Submit</button>*/}
        {/*</form>*/}
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Inserisci lo username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Inserisci la password" />
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
        </Container>
        </div>
    );
}

export default FormLogin;
