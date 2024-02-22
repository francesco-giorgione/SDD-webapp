import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import getStringaData from "../utils";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";


function MovimentiRetailer({username}) {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, []);

    const fetchData1 = async () => {
        try {
            const response = await fetch('/profilo/formaggi/acquistati/' + username);
            const jsonData = await response.json();
            setData1(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await fetch('/profilo/pezzi/in-vendita/' + username);
            const jsonData = await response.json();
            console.log('JSON DATA')
            console.log(jsonData)
            setData2(jsonData);
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error);
        }
    };

    const handleApriSchedaFormaggio = (idFormaggio) => {
        navigate(`/Formaggio`, {state: {idFormaggio: idFormaggio}});
    };

    const handleApriSchedaPezzo = (idPezzo) => {
        navigate(`/Pezzo`, {state: {idPezzo: idPezzo}});
    };

    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: '0 0 30%', marginRight: '10px' }}>
                <p>Prodotti acquistati</p>
                <Accordion>
                    {data1.map((formaggio, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Formaggio {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {formaggio.id}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(formaggio.dataAcquisto) * 1000))}</p>
                                <p><b>Data di scadenza:</b> {getStringaData(new Date(parseInt(formaggio.dataScadenza) * 1000))}</p>
                                <p><b>Venditore:</b> {formaggio.venditore}</p>
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
                <p>Prodotti in vendita</p>
                <Accordion>
                    {data2.map((pezzo, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>Pezzo di formaggio {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p><b>Id:</b> {pezzo.id}</p>
                                <p><b>Data di acquisto:</b> {getStringaData(new Date(parseInt(pezzo.dataAcquisto) * 1000))}</p>
                                <p><b>Quantità:</b> {pezzo.quantita} grammi</p>
                                <p><Button onClick={() => handleApriSchedaPezzo(pezzo.id)}>Apri scheda</Button></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default MovimentiRetailer;
