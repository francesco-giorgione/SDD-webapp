import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function FormRetailerAcquistaFormaggio() {
    const[parita, setPartita] = useState([]);

    const username = sessionStorage.getItem("username");

    useEffect(() => {
        fecthPartitaId(username)
    }, []);

    const fecthPartitaId = async (username) => {
        try {
            const response = await fetch(`/profilo/silos/acquistati/${username}`);
            const jsonData = await response.json();
            console.log(jsonData);
            console.log("okay")
            setPartita(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
    }

    return(
        <div>
            <label>Acquisto Formaggio:</label><br/>
            <Container className={"border border-primary rounded"}>
                <Form onSubmit={handleSubmit}>
                    <FormLabel>Formaggi in vendita: &nbsp;&nbsp;</FormLabel>
                    <br/>
                    <Form.Check
                        inline
                        label={"formaggio1"}
                        name={"formaggio1"}
                        type={"checkbox"}
                        value={"formaggio1"}
                        id={"formaggio1"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio2"}
                        name={"formaggio2"}
                        type={"checkbox"}
                        value={"formaggio2"}
                        id={"formaggio2"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio3"}
                        name={"formaggio3"}
                        type={"checkbox"}
                        value={"formaggio3"}
                        id={"formaggio3"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio4"}
                        name={"formaggio4"}
                        type={"checkbox"}
                        value={"formaggio4"}
                        id={"formaggio4"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio5"}
                        name={"formaggio5"}
                        type={"checkbox"}
                        value={"formaggio5"}
                        id={"formaggio5"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio6"}
                        name={"formaggio6"}
                        type={"checkbox"}
                        value={"formaggio6"}
                        id={"formaggio6"}
                    />
                    <Form.Check
                        inline
                        label={"formaggio7"}
                        name={"formaggio7"}
                        type={"checkbox"}
                        value={"formaggio7"}
                        id={"formaggio7"}
                    />
                    <br/>
                    <br/>
                    <Button variant="primary" type="submit">Registra acquisto</Button>
                    <br/>
                    <br/>
                </Form>
            </Container>
        </div>
    );
}

export default FormRetailerAcquistaFormaggio;