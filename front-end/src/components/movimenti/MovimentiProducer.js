import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getStringaData from "../utils"
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function MovimentiProducer({username}) {
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
            const response = await fetch('/profilo/partite/acquistati/' + username);
            const jsonData = await response.json();
            setData1(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await fetch('/profilo/formaggi/in-vendita/' + username);
            const jsonData = await response.json();
            setData2(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData3 = async () => {
        try {
            const response = await fetch('/profilo/formaggi/venduti/' + username);
            const jsonData = await response.json();
            setData3(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const handleApriSchedaPartita = (idPartita) => {
        navigate(`/Partita`, {state: {idPartita: idPartita}});
    };

    const handleApriSchedaFormaggio = (idFormaggio) => {
        navigate(`/Formaggio`, {state: {idFormaggio: idFormaggio}});
    };

    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti acquistati</p>
                <Accordion>
                    {data1.map((partita, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Partita di latte {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {partita.id}</p>
                                <p><b>Venditore:</b> {partita.venditore}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(partita.dataAcquisto) * 1000))}</p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(partita.dataScadenza) * 1000))}</p>
                                <p><b>Quantità:</b> {partita.quantita} litri</p>
                                <p><Button onClick={() => handleApriSchedaPartita(partita.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti in vendita</p>
                <Accordion>
                    {data2.map((formaggio, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Formaggio {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {formaggio.id}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(formaggio.dataAcquisto) * 1000))}</p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(formaggio.dataScadenza) * 1000))}</p>
                                <p><b>Altezza:</b> {formaggio.altezza} cm</p>
                                <p><b>Diametro:</b> {formaggio.diametro} cm</p>
                                <p><b>Peso:</b> {formaggio.peso} libbre</p>
                                <p><Button onClick={() => handleApriSchedaFormaggio(formaggio.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti venduti</p>
                <Accordion>
                    {data3.map((formaggio, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Formaggio {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {formaggio.id}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(formaggio.dataAcquisto) * 1000))}</p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(formaggio.dataScadenza) * 1000))}</p>
                                <p><b>Compratore:</b> {formaggio.compratore}</p>
                                <p><b>Altezza:</b> {formaggio.altezza} cm</p>
                                <p><b>Diametro:</b> {formaggio.diametro} cm</p>
                                <p><b>Peso:</b> {formaggio.peso} libbre</p>
                                <p><Button onClick={() => handleApriSchedaFormaggio(formaggio.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default MovimentiProducer;
