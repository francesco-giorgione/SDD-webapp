import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {FormLabel} from "react-bootstrap";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";

const provenienza_silos_options = [
    { value: "Provincia di Parma", label: "Provincia di Parma" },
    { value: "Provincia di Reggio Emilia", label: "Provincia di Reggio Emilia" },
    { value: "Provincia di Modena", label: "Provincia di Modena" },
    { value: "Provincia di Bologna (ovest del Reno)", label: "Provincia di Bologna (ovest del Reno)" },
    { value: "Provincia di Mantova (sud del Po)", label: "Provincia di Mantova (sud del Po)" }
]

function FormMilkhubAcquistaSilos() {
    const [selectedProvenienza, setSelectedProvenienza] = useState("");

    const [selectedDateTimeProduzione, setSelectedDateTimeProduzione] = useState("");

    const [selectedDateTimeScadenza, setSelectedDateTimeScadenza] = useState("");

    // Event handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(e.target);

        const formData = new FormData(e.target);

        console.log(formData);

        var timeScad = convertDateTimetoEpochSeconds(selectedDateTimeScadenza)

        var timeProd = convertDateTimetoEpochSeconds(selectedDateTimeProduzione);


        var input = {
            "input": {
                "_alimentazioneMucca": formData.get("alimentazione"),
                "_dataProduzione": timeProd.toString(),
                "_dataScadenza": timeScad.toString(),
                "_fornitore": formData.get("fornitore"),
                "_provenienza": selectedProvenienza,
                "_quantita": formData.get("quantita"),
                "_razzaMucca": formData.get("razza"),
                "user": sessionStorage.getItem("username")
            }
        }

        console.log(input);
    };


    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Fornitore:</FormLabel>
                <Form.Control
                    type="text"
                    name="fornitore"
                    required={true}
                />
                <br/>
                <FormLabel>Selezionare la provenienza: </FormLabel>
                <Form.Select
                    required={true}
                    value={selectedProvenienza}
                    onChange={e => {
                        setSelectedProvenienza(e.target.value)
                    }}>
                    <option value="">Nessuna provenienza selezionata</option>
                    <option value="Provincia di Parma">Provincia di Parma</option>
                    <option value="Provincia di Reggio Emilia">Provincia di Reggio Emilia</option>
                    <option value="Provincia di Modena">Provincia di Modena</option>
                    <option value="Provincia di Bologna (ovest del Reno)">Provincia di Bologna (ovest del Reno)</option>
                    <option value="Provincia di Mantova">Provincia di Mantova (sud del Po)</option>
                </Form.Select>
                <br/>
                <FormLabel>Data di produzione:</FormLabel>
                <br/>
                <input aria-label="Date and time"
                       value={selectedDateTimeProduzione}
                       onChange={e => {
                           setSelectedDateTimeProduzione(e.target.value)
                       }}
                       max={getMinMaxDateTime(-1)}
                       type="datetime-local"/>
                <br/>
                <br/>
                <FormLabel>Razza mucche: &nbsp;&nbsp;</FormLabel>
                <span>
                    <Form.Check
                        inline
                        label="frisona"
                        name="razza"
                        required={true}
                        type={"radio"}
                        value="frisona"
                        id={"radio-razza"}
                    />
                    <Form.Check
                        inline
                        label="reggiana"
                        name="razza"
                        type={"radio"}
                        value="reggiana"
                        id={"radio-razza"}
                    />
                </span>
                <br/>
                <FormLabel>Alimentazione mucche: &nbsp;&nbsp;</FormLabel>
                <span>
                    <Form.Check
                        inline
                        label="erba"
                        name="alimentazione"
                        type={"radio"}
                        required={true}
                        value="erba"
                        id={"radio-alimentazione"}
                    />
                    <Form.Check
                        inline
                        label="fieno"
                        name="alimentazione"
                        type={"radio"}
                        value="fieno"
                        id={"radio-alimentazione"}
                    />
                </span>
                <br/>
                <FormLabel>Quantità:</FormLabel>
                <br/>
                <input type="number" name="quantita" min="1" step="1" max="100"/>
                <br/>
                <FormLabel>Data di scadenza:</FormLabel>
                <br/>
                <input aria-label="Date and time"
                       value={selectedDateTimeScadenza}
                       onChange={e => {
                           setSelectedDateTimeScadenza(e.target.value)
                       }}
                       min={getMinMaxDateTime(1)}
                       type="datetime-local"/>
                <br/>
                <br/>
                <Button variant="primary" type="submit">Registra Acquisto</Button>
            </Form>
        </Container>
    );
}

export default FormMilkhubAcquistaSilos;