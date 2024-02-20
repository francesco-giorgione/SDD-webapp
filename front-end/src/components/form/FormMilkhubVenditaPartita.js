import React, { useEffect, useState } from "react";
import { convertDateTimetoEpochSeconds, getMinMaxDateTime } from "../../utils/DateTimeUtils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Bounce, toast} from "react-toastify";

const trasformazioniRichieste = [
    "Separazione della crema per l'ottenimento di una miscela parzialmente scremata",
    "Aggiunta di siero contenente batteri acidi per 10-12 minuti a temperatura di 33-35 gradi",
    "Aggiunta di caglio di vitello e riposo per 10-12 minuti a temperatura di 33-35 gradi",
    "Rottura della cagliata in piccoli pezzi per 10-12 minuti a temperatura di 55 gradi"
];

function FormMilkhubVenditaPartita() {
    const [silos, setSilos] = useState([]);
    const [checkedItems, setCheckedItems] = useState({}); // Stato per gestire le checkbox selezionate
    const [selectedDateTimeScadenza, setSelectedDateTimeScadenza] = useState("");

    const username = sessionStorage.getItem("username");

    useEffect(() => {
        const fetchSilosId = async (username) => {
            try {
                const response = await fetch(`/profilo/silos/acquistati/${username}`);
                const jsonData = await response.json();
                setSilos(jsonData.map((silos) => silos.id));
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchSilosId(username);
    }, []);

    // Event handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();

        // Controlla se almeno un silos è selezionato
        const isAtLeastOneSelected = Object.values(checkedItems).some((checked) => checked);

        if (!isAtLeastOneSelected) {
            alert("Seleziona almeno un silos");
            return;
        }

        const formData = new FormData(e.target);
        registraVendita(formData, checkedItems, username, selectedDateTimeScadenza)
    };

    // Event handler per gestire il cambiamento di stato delle checkbox
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };

    return (
        <div>
            <label>Vendita Partita di latte:</label>
            <Container className={"border border-primary rounded"}>
                <Form onSubmit={handleSubmit}>
                    <FormLabel htmlFor="tipoTrasformazioni">Tipo di trasformazioni:</FormLabel> {/* Aggiungi htmlFor e id qui */}
                    <br />
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
                        name="aggiunta_siero"
                        type={"checkbox"}
                        required={true}
                        value={trasformazioniRichieste[1]}
                        id={"check-siero"}
                    />
                    <Form.Check
                        inline
                        label="Aggiunta di caglio"
                        name="aggiunta_caglio"
                        type={"checkbox"}
                        required={true}
                        value={trasformazioniRichieste[2]}
                        id={"check-caglio"}
                    />
                    <Form.Check
                        inline
                        label="Rottura della cagliata"
                        name="rottura_cagliata"
                        type={"checkbox"}
                        required={true}
                        value={trasformazioniRichieste[3]}
                        id={"check-rottura"}
                    />
                    <br />
                    <FormLabel>Data di scadenza:</FormLabel> {/* Aggiungi htmlFor e id qui */}
                    <br />
                    <input
                        required={true}
                        value={selectedDateTimeScadenza}
                        onChange={(e) => {
                            setSelectedDateTimeScadenza(e.target.value);
                        }}
                        className={"form-control"}
                        min={getMinMaxDateTime(1)}
                        type="datetime-local"
                    />
                    <br />
                    <FormLabel htmlFor="silosUsati">Silos usati (seleziona gli id):</FormLabel> {/* Aggiungi htmlFor e id qui */}
                    <br />
                    {/* Passa lo stato delle checkbox come prop al componente CheckboxList */}
                    <CheckboxList items={silos} checkedItems={checkedItems} onChange={handleCheckboxChange} />
                    <br />
                    <FormLabel>Quantità:</FormLabel>
                    <br />
                    <input type="number" required={true} name="quantita" className={"form-control"} min="1" step="1" id={"quantita"} /> {/* Aggiungi l'id qui */}
                    <br />
                    <FormLabel>Temperatura di conservazione (°C):</FormLabel>
                    <br />
                    <input type="number" required={true} name="temperaturaConservazione" className={"form-control"} min="18" step="1" id={"temperaturaConservazione"} />
                    <br />
                    <Button variant="primary" type="submit">
                        Metti in Vendita
                    </Button>
                    <br />
                    <br />
                </Form>

            </Container>
        </div>
    );
}

function CheckboxList({ items, checkedItems, onChange }) {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={item}
                        name={item}
                        checked={checkedItems[item] || false}
                        onChange={onChange} // Usa la funzione di cambio di stato passata come prop
                    />
                    <label htmlFor={item}>{item}</label>
                </div>
            ))}
        </div>
    );
}

function registraVendita(formData, checkedItems, username, dataScadenza) {
    let api = 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/MilkhubInterface_6.2.15/invoke/mettiInVenditaPartitaLatte'
    let timeScad = convertDateTimetoEpochSeconds(dataScadenza);

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "input": {
                "dataScadenza": timeScad,
                "idSilosUsati": Object.keys(checkedItems),
                "quantita": formData.get('quantita'),
                "temperaturaConservazione": formData.get('temperaturaConservazione'),
                "tipoTrasformazione": trasformazioniRichieste,
                "user": username
            }
        })
    };

    console.log(requestOptions)

    fetch(api, requestOptions)
        .then((response) => {

            let res = response.json();
            console.log(res)

            toast.info("Messa in vendita effettuata", {
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
}

export default FormMilkhubVenditaPartita;
