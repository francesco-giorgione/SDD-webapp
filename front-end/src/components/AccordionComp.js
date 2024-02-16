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
                                <p><b>Id:</b> {silos.id}</p>
                                <p><b>Alimentazione mucca:</b> {silos.alimentazioneMucca}</p>
                                <p><b>Compratore:</b> {silos.compratore}</p>
                                <p><b>Data di acquisto:</b> {silos.dataAcquisto}</p>
                                <p><b>Data di scadenza:</b> {silos.dataScadenza}</p>
                                <p><b>Fornitore:</b> {silos.fornitore}</p>
                                <p><b>Provenienza:</b> {silos.provenienza}</p>
                                <p><b>Quantità:</b> {silos.quantita} litri</p>
                                <p><b>Razza mucca:</b> {silos.razzaMucca}</p>
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
                                <p><b>Id:</b> {partita.id}</p>
                                <p><b>Data di acquisto:</b> {partita.dataAcquisto}</p>
                                <p><b>Data di scadenza:</b> {partita.dataScadenza}</p>
                                <p><b>Id silos usati:</b> {partita.idSilosUsati}</p>
                                <p><b>Quantità:</b> {partita.quantita} litri</p>
                                <p><b>Trasformazioni:</b> {partita.tipoTrasformazione[0]},<br/> {partita.tipoTrasformazione[1]}, <br/>
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
                                <p><b>Id:</b> {partita.id}</p>
                                <p><b>Compatore:</b> {partita.compratore}</p>
                                <p><b>Data di acquisto:</b> {partita.dataAcquisto}</p>
                                <p><b>Data di scadenza:</b> {partita.dataScadenza}</p>
                                <p><b>Id silos usati:</b> {partita.idSilosUsati}</p>
                                <p><b>Quantità:</b> {partita.quantita} litri</p>
                                <p><b>Trasformazioni:</b> {partita.tipoTrasformazione[0]},<br/> {partita.tipoTrasformazione[1]}, <br/>
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
