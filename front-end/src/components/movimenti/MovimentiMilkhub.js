import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getStringaData from "../utils";
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

function MovimentiMilkhub({username}) {
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
            const response = await fetch('/profilo/silos/acquistati/' + username);
            const jsonData = await response.json();
            setData1(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await fetch('/profilo/partite/in-vendita/' + username);
            const jsonData = await response.json();
            setData2(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData3 = async () => {
        try {
            const response = await fetch('/profilo/partite/venduti/' + username);
            const jsonData = await response.json();
            setData3(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const handleApriScheda = (idPartita) => {
        navigate(`/Partita`, {state: {idPartita: idPartita}});
    };

    const navigate = useNavigate();

    return (
        <div style={{display: 'flex'}}>
            <div style={{flex: '0 0 30%', marginRight: '10px'}}>
                <p>Prodotti acquistati</p>
                <Accordion>
                    {data1.map((silos, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Silos {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {silos.id}</p>
                                <p><b>Alimentazione mucca:</b> {silos.alimentazioneMucca}</p>
                                <p><b>Compratore:</b> {silos.compratore}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(silos.dataAcquisto)))}</p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(silos.dataScadenza)))}</p>
                                <p><b>Fornitore:</b> {silos.fornitore}</p>
                                <p><b>Provenienza:</b> {silos.provenienza}</p>
                                <p><b>Quantità:</b> {silos.quantita} litri</p>
                                <p><b>Razza mucca:</b> {silos.razzaMucca}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{flex: '0 0 30%', marginRight: '10px'}}>
                <p>Prodotti in vendita</p>
                <Accordion>
                    {data2.map((partita, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>
                                Partita di latte {index + 1}
                            </Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {partita.id}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(partita.dataAcquisto)))}
                                </p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(partita.dataScadenza)))}
                                </p>
                                <p><b>Id silos usati:</b> {partita.idSilosUsati}</p>
                                <p><b>Quantità:</b> {partita.quantita} litri</p>
                                <p><Button onClick={() => handleApriScheda(partita.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{flex: '0 0 30%', marginRight: '10px'}}>
                <p>Prodotti venduti</p>
                <Accordion>
                    {data3.map((partita, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Partita di latte {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {partita.id}</p>
                                <p><b>Compatore:</b> {partita.compratore}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(partita.dataAcquisto)))}
                                </p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(partita.dataScadenza)))}
                                </p>
                                <p><b>Quantità:</b> {partita.quantita} litri</p>
                                <p><Button onClick={() => handleApriScheda(partita.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default MovimentiMilkhub;
