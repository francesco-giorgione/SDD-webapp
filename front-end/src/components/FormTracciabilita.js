import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SchedaPezzo from "./schede/SchedaPezzo";

function FormTracciabilita() {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true); // Stato per tracciare se il campo del form è valido o non valido
    const [result, setResult] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita il comportamento predefinito del form (ricaricamento della pagina)
        let pezzo = await getPezzo(inputValue);

        if (pezzo.success !== "false" && pezzo.output !== undefined) {
            setResult(<SchedaPezzo pezzo={pezzo} />)
        } else {
            setIsValid(false)
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsValid(true); // Resetta lo stato di validità quando l'utente modifica il campo
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6"> {/* Occupa metà della larghezza su schermi medi e più grandi */}
                        <Form style={{ padding: '30px' }} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="idPezzo">
                                <Form.Label>Id pezzo di formaggio</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    required
                                    isInvalid={!isValid} // Aggiungi l'attributo isInvalid
                                />
                                {/* Feedback di Bootstrap per visualizzare il messaggio di errore */}
                                <Form.Control.Feedback type="invalid">
                                    Errore: il pezzo non è stato trovato.
                                </Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    Trovi l'id sulla confezione del prodotto.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="col-md-6 mt-4 mt-md-0"> {/* Occupa metà della larghezza su schermi medi e più grandi */}
                        {result && <div>{result}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

async function getPezzo(id) {
    try {
        const response = await fetch('/trace/pezzo/' + id);
        return await response.json();
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
    }
}

export default FormTracciabilita;
