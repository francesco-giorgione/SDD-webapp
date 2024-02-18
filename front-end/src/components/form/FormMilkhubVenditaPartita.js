import React, {useState} from "react";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const trasformazioniRichieste = ["Separazione della crema per l'ottenimento di una miscela parzialmente scremata",
    "Aggiunta di siero contenente batteri acidi per 10-12 minuti a temperatura di 33-35 gradi",
    "Aggiunta di caglio di vitello e riposo per 10-12 minuti a temperatura di 33-35 gradi",
    "Rottura della cagliata in piccoli pezzi per 10-12 minuti a temperatura di 55 gradi"];

function FormMilkhubVenditaPartita() {
    const [selectedDateTimeScadenza, setSelectedDateTimeScadenza] = useState("");

    // Event handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(e.target);

        const formData = new FormData(e.target);

        var timeScad = convertDateTimetoEpochSeconds(selectedDateTimeScadenza)

        console.log(formData);


    };


    return(
        <div>
        <label>Vendita Partita di latte:</label>
        <Container className={"border border-primary rounded"}>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Tipo di trasformazioni:</FormLabel>
                <br/>
                <Form.Check
                    inline
                    label="Separazione della crema"
                    name="separazione_crema"
                    required={true}
                    type={"checkbox"}
                    value={trasformazioniRichieste[0]}
                    id={"check-crema"}
                />
                <Form.Check
                    inline
                    label="Aggiunta di siero"
                    name="aggiuinta_siero"
                    type={"checkbox"}
                    required={true}
                    value={trasformazioniRichieste[1]}
                    id={"check-siero"}
                />
                <Form.Check
                    inline
                    label="Aggiunta di caglio"
                    name="aggiuinta_caglio"
                    type={"checkbox"}
                    required={true}
                    value={trasformazioniRichieste[1]}
                    id={"check-caglio"}
                />
                <Form.Check
                    inline
                    label="Rottura della cagliata"
                    name="rottura_cagliata"
                    type={"checkbox"}
                    required={true}
                    value={trasformazioniRichieste[1]}
                    id={"check-rottura"}
                />
                <br/>
                <FormLabel>Data di scadenza:</FormLabel>
                <br/>
                <input aria-label="Date and time"
                       required={true}
                       value={selectedDateTimeScadenza}
                       onChange={e => {
                           setSelectedDateTimeScadenza(e.target.value)
                       }}
                       className={"form-control"}
                       min={getMinMaxDateTime(1)}
                       type="datetime-local"/>
                <br/>
                <FormLabel>Temperatura conservazione (in gradi):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="temperatura"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="99"/>
                <br/>
                <FormLabel>Quantità:</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="quantita"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="99"/>
                <br/>



                <br/>
                <Button variant="primary" type="submit">Metti in Vendita</Button>
                <br/>
                <br/>
            </Form>
        </Container>
        </div>
    );
}

export default FormMilkhubVenditaPartita;