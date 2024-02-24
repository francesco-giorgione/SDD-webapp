import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import React from "react";
import Container from "react-bootstrap/Container";
import {useState} from "react";
import Modal from "react-modal";
import SchedaSilos from "./SchedaSilos";
import getStringaData from "../utils";

 function SchedaPartita({partita}) {
     return (
        <Container fluid>
            <h5 align='center'>Scheda partita di latte</h5>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Data di acquisto</th>
                    <th>Data di scadenza</th>
                    <th>Temperatura di conservazione</th>
                    <th>Quantità</th>
                    <th>Venditore</th>
                    <th>Compratore</th>
                    <th>Trasformazioni</th>
                    <th>Silos usati</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{partita.id}</td>
                    <td>{getStringaData(new Date(parseInt(partita.dataAcquisto) * 1000))}</td>
                    <td>{getStringaData(new Date(parseInt(partita.dataScadenza) * 1000))}</td>
                    <td>{partita.temperaturaConservazione} °C</td>
                    <td>{partita.quantita} litri</td>
                    <td>{partita.venditore}</td>
                    <td>{partita.compratore}</td>
                    <td>
                        {partita.tipoTrasformazione[0]},<br/>
                        {partita.tipoTrasformazione[1]},<br/>
                        {partita.tipoTrasformazione[2]},<br/>
                        {partita.tipoTrasformazione[3]},<br/>
                    </td>
                    <td align='center'><ButtonList silos={partita.silosUsati}/></td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
}

function ButtonList({ silos }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSilos, setSelectedSilos] = useState(null);

    const openModal = (silos) => {
        setSelectedSilos(silos);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedSilos(null);
        setModalIsOpen(false);
    };

    const buttons = silos.map((silos, index) => (
        <Container fluid key={index}>
            <Button onClick={() => openModal(silos)}>{silos.id}</Button>
        </Container>
    ));

    return (
        <div>
            {buttons}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedSilos && <CustomModal silos={selectedSilos} closeModal={closeModal} />}
            </Modal>
        </div>
    );
}

function CustomModal({ silos, closeModal }) {
    return (
        <Container fluid>
            <SchedaSilos silos={silos} />
            <Button onClick={closeModal}>Chiudi scheda</Button>
        </Container>
    );
}


async function getPartita(id) {
    try {
        const response = await fetch('/trace/partita/' + id);
        return await response.json();
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
    }
}


export default SchedaPartita;