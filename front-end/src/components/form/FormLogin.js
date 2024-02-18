import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { SHA256 } from 'crypto-js';

function FormLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);

    // Event handler to update form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Event handler to submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await checkCredenziali(formData.username, formData.password)

        if (res.success === "false") {
            setIsValid(false)
            return
        }

        sessionStorage.setItem("username", formData.username);
        window.location.reload();
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container>
                <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}> {/* Aggiunta la proprietà style con maxWidth per impostare una larghezza massima */}
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Inserisci lo username"
                            required
                            style={{ width: "100%" }} // Imposta la larghezza del campo input al 100%
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Inserisci la password"
                            required
                            style={{ width: "100%" }} // Imposta la larghezza del campo input al 100%
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {!isValid && (
                        <Form.Text className="text-danger">
                            Username o password errati
                        </Form.Text>
                    )}
                </Form>
            </Container>
        </div>
    );
}

async function checkCredenziali(username, password) {
    const url = '/auth';

    try {
        const response = await axios.post(url, {
            username: username,
            hashPassword: SHA256(password).toString()
        }, {
            headers: {
                'Accept': 'application/json',
                'Request-Timeout': '2m0s',
                'Content-Type': 'application/json'
            }
        });

        return response.data

    } catch (error) {
        console.error('Error fetching data:', error);
        return {"success": "false"}
    }
}


export default FormLogin;
