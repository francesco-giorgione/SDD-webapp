import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {FormLabel} from "react-bootstrap";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        var api = 'http://127.0.0.1:5000/api/v1/namespaces/default/apis/milkhubInterface/invoke/acquistaSilos'

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "input": {
                    "alimentazioneMucca": formData.get("alimentazione"),
                    "dataProduzione": timeProd.toString(),
                    "dataScadenza": timeScad.toString(),
                    "fornitore": formData.get("fornitore"),
                    "provenienza": selectedProvenienza,
                    "quantita": formData.get("quantita"),
                    "razzaMucca": formData.get("razza"),
                    "user": sessionStorage.getItem("username")
                }
            })
        };

        fetch(api, requestOptions)

            .then((response) => {

                var res = response.json();

                console.log(res)

                console.log(res.value)

                toast.info("toast", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((err) => {

                console.log("error");

            });
    };


    return(
        <div>
        <label>Acquisto Silos:</label>
        <Container className={"border border-primary rounded"} id={"container1"}>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                       required={true}
                       value={selectedDateTimeProduzione}
                       onChange={e => {
                           setSelectedDateTimeProduzione(e.target.value)
                       }}
                       className="form-control"
                       max={getMinMaxDateTime(-1)}
                       type="datetime-local"/>
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
                <input type="number"
                       required={true}
                       name="quantita"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="100"/>
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
                <Button variant="primary" type="submit">Registra Acquisto</Button>
                <br/>
                <br/>
            </Form>
        </Container>
        </div>
    );
}

export default FormMilkhubAcquistaSilos;