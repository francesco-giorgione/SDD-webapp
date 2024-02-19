import Table from "react-bootstrap/Table";
import Modal from 'react-modal';
import Container from "react-bootstrap/Container";
import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import getStringaData from "../utils"
import { CustomModalFormaggio } from "../Modals";

function SchedaPezzo( {pezzo} ) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <Container fluid>
            <h5 align='center'>Scheda pezzo di formaggio</h5>
            <br/>
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
                    <td>{pezzo.id}</td>
                    <td>{getStringaData(new Date(parseInt(pezzo.dataAcquisto)))}</td>
                    <td>{pezzo.quantita}</td>
                    <td>{pezzo.venditore}</td>
                    <td align='center'><Button onClick={() => {
                        setModalIsOpen(true)
                    }}>{pezzo.formaggioUsato.id}</Button></td>
                </tr>
                </tbody>
            </Table>
            <Modal isOpen={modalIsOpen} onRequestClose={(setModalIsOpen) => setModalIsOpen(false)}>
                <CustomModalFormaggio formaggio={pezzo.formaggioUsato} setModalIsOpen={setModalIsOpen} />
            </Modal>
        </Container>
    )
}



export default SchedaPezzo;
