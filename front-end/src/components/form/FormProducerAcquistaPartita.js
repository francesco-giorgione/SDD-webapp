import React, {useEffect, useState} from "react";
import {FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function FormProducerAcquistaPartita() {

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
            <label>Acquisto Partita:</label><br/>
            <Container className={"border border-primary rounded"}>
                <Form onSubmit={handleSubmit}>
                    <FormLabel> Partite in vendita: &nbsp;&nbsp;</FormLabel>
                    <br/>
                    <Form.Check
                        inline
                        label={"partita1"}
                        name={"partita1"}
                        type={"checkbox"}
                        value={"partita1"}
                        id={"partita1"}
                    />
                    <Form.Check
                        inline
                        label={"partita2"}
                        name={"partita2"}
                        type={"checkbox"}
                        value={"partita2"}
                        id={"partita2"}
                    />
                    <Form.Check
                        inline
                        label={"partita3"}
                        name={"partita3"}
                        type={"checkbox"}
                        value={"partita3"}
                        id={"partita3"}
                    />
                    <Form.Check
                        inline
                        label={"partita4"}
                        name={"partita4"}
                        type={"checkbox"}
                        value={"partita4"}
                        id={"partita4"}
                    />
                    <Form.Check
                        inline
                        label={"partita5"}
                        name={"partita5"}
                        type={"checkbox"}
                        value={"partita5"}
                        id={"partita5"}
                    />
                    <Form.Check
                        inline
                        label={"partita6"}
                        name={"partita6"}
                        type={"checkbox"}
                        value={"partita6"}
                        id={"partita6"}
                    />
                    <Form.Check
                        inline
                        label={"partita7"}
                        name={"partita7"}
                        type={"checkbox"}
                        value={"partita7"}
                        id={"partita7"}
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

export default FormProducerAcquistaPartita;