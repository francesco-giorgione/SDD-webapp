import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function AccordionComp() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    useEffect(() => {
        fetchData1();
        fetchData2();
        fetchData3();
    }, []);

    const fetchData1 = async () => {
        try {
            const response = await fetch('/profilo/silos/acquistati/milkhub1');
            const jsonData = await response.json();
            setData1(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await fetch('/profilo/partite/in-vendita/milkhub1');
            const jsonData = await response.json();
            setData2(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData3 = async () => {
        try {
            const response = await fetch('/profilo/partite/venduti/milkhub1');
            const jsonData = await response.json();
            setData3(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti acquistati</p>
                <Accordion>
                    {data1.map((silos, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Silos {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p>ID: {silos.id}</p>
                                <p>Alimentazione mucca: {silos.alimentazioneMucca}</p>
                                <p>Compratore: {silos.compratore}</p>
                                <p>Data di acquisto: {silos.dataAcquisto}</p>
                                <p>Data di scadenza: {silos.dataScadenza}</p>
                                <p>Fornitore: {silos.fornitore}</p>
                                <p>Provenienza: {silos.provenienza}</p>
                                <p>Quantità: {silos.quantita} litri</p>
                                <p>Razza mucca: {silos.razzaMucca}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti in vendita</p>
                <Accordion>
                    {data2.map((partita, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Partita di latte {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p>ID: {partita.id}</p>
                                <p>Data di acquisto: {partita.dataAcquisto}</p>
                                <p>Data di scadenza: {partita.dataScadenza}</p>
                                <p>Id silos usati: {partita.idSilosUsati}</p>
                                <p>Quantità: {partita.quantita} litri</p>
                                <p>Trasformazioni: {partita.tipoTrasformazione[0]},<br/> {partita.tipoTrasformazione[1]}, <br/>
                                    {partita.tipoTrasformazione[2]}, <br/> {partita.tipoTrasformazione[3]}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti venduti</p>
                <Accordion>
                    {data3.map((partita, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Partita di latte {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p>ID: {partita.id}</p>
                                <p>Compatore: {partita.compratore}</p>
                                <p>Data di acquisto: {partita.dataAcquisto}</p>
                                <p>Data di scadenza: {partita.dataScadenza}</p>
                                <p>Id silos usati: {partita.idSilosUsati}</p>
                                <p>Quantità: {partita.quantita} litri</p>
                                <p>Trasformazioni: {partita.tipoTrasformazione[0]},<br/> {partita.tipoTrasformazione[1]}, <br/>
                                    {partita.tipoTrasformazione[2]}, <br/> {partita.tipoTrasformazione[3]}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default AccordionComp;
