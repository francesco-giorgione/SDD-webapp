import Table from "react-bootstrap/Table";
import Modal from 'react-modal';
import Container from "react-bootstrap/Container";
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import SchedaFormaggio from "./SchedaFormaggio";


function SchedaPezzo( {pezzo} ) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <Container fluid>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Data di Acquisto</th>
                    <th>Quantità (g)</th>
                    <th>Venditore</th>
                    <th>ID Formaggio</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{pezzo.output.id}</td>
                    <td>{pezzo.output.dataAcquisto}</td>
                    <td>{pezzo.output.quantita}</td>
                    <td>{pezzo.output.venditore}</td>
                    <td align='center'><Button onClick={() => {
                        setModalIsOpen(true)
                    }}>{pezzo.output.formaggioUsato.id}</Button></td>
                </tr>
                </tbody>
            </Table>
            <Modal isOpen={modalIsOpen} onRequestClose={(setModalIsOpen) => setModalIsOpen(false)}>
                <CustomModal formaggio={pezzo.output.formaggioUsato} setModalIsOpen={setModalIsOpen} />
            </Modal>
        </Container>
    )
}

function CustomModal({formaggio, setModalIsOpen}) {
    return(
        <Container fluid>
            <SchedaFormaggio formaggio={formaggio} />
            <Button onClick={() => setModalIsOpen(false)}>Chiudi scheda</Button>
        </Container>
    )
}

export default SchedaPezzo;
