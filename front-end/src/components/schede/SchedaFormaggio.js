import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-modal";
import React, {useState} from 'react';
import getStringaData from "../utils";
import { CustomModalPartita } from "../Modals";

function SchedaFormaggio( {formaggio} ) {
    return(
        <Container fluid>
            <h5 align='center'>Scheda formaggio</h5>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Data di acquisto</th>
                    <th>Data di scadenza</th>
                    <th>Diametro</th>
                    <th>Altezza</th>
                    <th>Certificato di stagionatura</th>
                    <th>Peso</th>
                    <th>Venditore</th>
                    <th>Compratore</th>
                    <th>Trasformazioni</th>
                    <th>Partite di latte usate</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{formaggio.id}</td>
                    <td>{getStringaData(new Date(parseInt(formaggio.dataAcquisto) * 1000))}</td>
                    <td>{getStringaData(new Date(parseInt(formaggio.dataScadenza) * 1000))}</td>
                    <td>{formaggio.diametro} pollici</td>
                    <td>{formaggio.altezza} pollici</td>
                    <td>{getCertificato(formaggio.certificatoStagionatura)}</td>
                    <td>{formaggio.peso} libbre</td>
                    <td>{formaggio.venditore}</td>
                    <td>{formaggio.compratore}</td>
                    <td>
                        {formaggio.tipoTrasformazione[0]},<br/>
                        {formaggio.tipoTrasformazione[1]},<br/>
                        {formaggio.tipoTrasformazione[2]},<br/>
                        {formaggio.tipoTrasformazione[3]},<br/>
                    </td>
                    <td align='center'><ButtonList partite={formaggio.partiteLatteUsate}/></td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
}

function ButtonList({ partite }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPartita, setSelectedPartita] = useState(null);

    const openModal = (partita) => {
        setSelectedPartita(partita);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedPartita(null);
        setModalIsOpen(false);
    };

    const buttons = partite.map((partita, index) => (
        <Container fluid key={index}>
            <Button onClick={() => openModal(partita)}>{partita.id}</Button>
        </Container>
    ));

    return (
        <div>
            {buttons}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedPartita && <CustomModalPartita partita={selectedPartita} closeModal={closeModal} />}
            </Modal>
        </div>
    );
}

function getCertificato(tipo) {
    switch(tipo) {
        case '1':     return '12 mesi'
        case '2':     return '18 mesi'
        case '3':     return '24 mesi'
        case '4':     return '30 mesi'
    }
}


export default SchedaFormaggio;
