import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import React from "react";
import getStringaData from "../utils";

function SchedaSilos( {silos} ) {
    return(
        <Container fluid>
            <h5 align='center'>Scheda silos</h5>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Alimentazione mucca</th>
                    <th>Data di acquisto</th>
                    <th>Data di produzione</th>
                    <th>Data di scadenza</th>
                    <th>Fornitore</th>
                    <th>Compratore</th>
                    <th>Provenienza</th>
                    <th>Quantità</th>
                    <th>Razza mucca</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{silos.id}</td>
                    <td>{silos.alimentazioneMucca}</td>
                    <td>{getStringaData(new Date(parseInt(silos.dataAcquisto)))}</td>
                    <td>{getStringaData(new Date(parseInt(silos.dataProduzione)))}</td>
                    <td>{getStringaData(new Date(parseInt(silos.dataScadenza)))}</td>
                    <td>{silos.fornitore}</td>
                    <td>{silos.compratore}</td>
                    <td>{silos.provenienza}</td>
                    <td>{silos.quantita} litri</td>
                    <td>{silos.razzaMucca}</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default SchedaSilos