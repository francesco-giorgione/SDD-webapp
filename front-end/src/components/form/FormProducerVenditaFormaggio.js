import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";
import Button from "react-bootstrap/Button";
function FormProducerVenditaFormaggio() {

    const trasformazioniRichieste = ["Brandizzazione con il logo del consorzio",
        "Conservazione per 6 mesi in aging room a una temperatura di 18-20 gradi",
        "Immersione per 20-25 giorni in acqua salina a temperatura di 16-18 gradi",
        "Conservazione per 2-3 giorni in una ruota d'acciaio a temperatura di 16-18 gradi"];

    const [selectedDateTimeScadenza, setSelectedDateTimeScadenza] = useState("");

    const [checkboxes, setCheckboxes] = useState({
        option1 : false,
        option2 : false,
        option3 : false
    });

    const [checkBoxesRequiredError, setCheckBoxesRequiredError] = useState(false);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var username = sessionStorage.getItem("username");

        console.log(e.target);

        const formData = new FormData(e.target);

        console.log(formData);

        var timeScad = convertDateTimetoEpochSeconds(selectedDateTimeScadenza);

        const isChecked = Object.values(checkboxes).some((value) => value);
        if (!isChecked) {
            setCheckBoxesRequiredError(true);
        } else {
            setCheckBoxesRequiredError(false);
        }

        var altezza = parseInt(formData.get("altezza")) * 100;

        var check = [];

        var i = 0
        for (const pair of formData.entries()) {
            console.log(i,pair[0], pair[1]);
            if (i >= 8){
                check.push(pair[1])
            }
            i++;
        }

        var inputJ = {
            "input": {
                "altezza": altezza.toString(),
                "dataScadenza": timeScad,
                "diametro": formData.get("diametro"),
                "idPartiteLatteUsate": check,
                "peso": formData.get("peso"),
                "stagionatura": formData.get("certificato"),
                "tipoTrasformazione": trasformazioniRichieste,
                "user": username
            }
        }

        console.log(inputJ);

    }

    return(
        <div>
            <label>Vendita Formaggio:</label>
            <Container className={"border border-primary rounded"}>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Tipo di trasformazioni: &nbsp;&nbsp;</FormLabel>
                <Form.Check
                    inline
                    label="Brandizzazione con logo"
                    name="brandizzazione_logo"
                    required={true}
                    type={"checkbox"}
                    value={trasformazioniRichieste[0]}
                    id={"check-brand"}
                />
                <Form.Check
                    inline
                    label="Conservazione per 6 mesi"
                    name="conservazione_6mesi"
                    required={true}
                    type={"checkbox"}
                    value={trasformazioniRichieste[1]}
                    id={"check-conservazione"}
                />
                <Form.Check
                    inline
                    label="Immersione per 20-25 giorni"
                    name="immersione_20-25_giorni"
                    required={true}
                    type={"checkbox"}
                    value={trasformazioniRichieste[2]}
                    id={"check-immersione"}
                />
                <Form.Check
                    inline
                    label="Conservazione per 2-3 giorni"
                    name="conservazione_2-3_giorni"
                    required={true}
                    type={"checkbox"}
                    value={trasformazioniRichieste[3]}
                    id={"check-conservazione"}
                />
                <br/>
                <FormLabel>Certficato stagionatura: &nbsp;&nbsp;</FormLabel>
                <Form.Check
                    inline
                    label="12 mesi"
                    name="certificato"
                    required={true}
                    type={"radio"}
                    value={"1"}
                    id={"radio-certificato"}
                />
                <Form.Check
                    inline
                    label="18 mesi"
                    name="certificato"
                    type={"radio"}
                    value={"2"}
                    id={"radio-certificato"}
                />
                <Form.Check
                    inline
                    label="24 mesi"
                    name="certificato"
                    type={"radio"}
                    value={"3"}
                    id={"radio-certificato"}
                />
                <Form.Check
                    inline
                    label="30 mesi"
                    name="certificato"
                    type={"radio"}
                    value={"4"}
                    id={"radio-certificato"}
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
                <FormLabel>Altezza (in pollici):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="altezza"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="100"/>
                <br/>
                <FormLabel>Diametro (in pollici):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="diametro"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="100"/>
                <br/>
                <FormLabel>Peso (in libbre):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="peso"
                       className={"form-control"}
                       min="1"
                       step="1"
                       max="100"/>
                <br/>
                <FormLabel> Partite usate: &nbsp;&nbsp;</FormLabel>
                {checkBoxesRequiredError && <p style={{ color: "red" }}>Seleziona almeno una opzione.</p>}
                <Form.Check
                    inline
                    label={"partita1"}
                    name={"partita1"}
                    type={"checkbox"}
                    value={"1"}
                    onChange={handleCheckboxChange}
                    id={"partita1"}
                />
                <Form.Check
                    inline
                    label={"partita2"}
                    name={"partita2"}
                    type={"checkbox"}
                    onChange={handleCheckboxChange}
                    value={"2"}
                    id={"partita2"}
                />
                <Form.Check
                    inline
                    label={"partita3"}
                    name={"partita3"}
                    type={"checkbox"}
                    onChange={handleCheckboxChange}
                    value={"3"}
                    id={"partita3"}
                />
                <br/>
                <br/>
                <Button variant="primary" type="submit">Metti in vendita</Button>
                <br/>
                <br/>
            </Form>
            </Container>
        </div>

    );

}

export default FormProducerVenditaFormaggio;