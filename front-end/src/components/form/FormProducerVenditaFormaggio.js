import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import React, {useState} from "react";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";
import Button from "react-bootstrap/Button";
import {useEffect} from "react";
import {Bounce, toast} from "react-toastify";

const trasformazioniRichieste = ["Brandizzazione con il logo del consorzio",
    "Conservazione per 6 mesi in aging room a una temperatura di 18-20 gradi",
    "Immersione per 20-25 giorni in acqua salina a temperatura di 16-18 gradi",
    "Conservazione per 2-3 giorni in una ruota d'acciaio a temperatura di 16-18 gradi"];

function FormProducerVenditaFormaggio() {
    const username = sessionStorage.getItem("username");
    const [selectedDateTimeScadenza, setSelectedDateTimeScadenza] = useState("");
    const [partite, setPartite] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkBoxesRequiredError, setCheckBoxesRequiredError] = useState(false);

    useEffect(() => {
        const fetchPartiteId = async (username) => {
            try {
                const response = await fetch(`/profilo/partite/acquistati/${username}`);
                const jsonData = await response.json();
                setPartite(jsonData.map((partita) => partita.id));
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchPartiteId(username);
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckedItems({
            ...checkedItems,
            [name]: checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Controlla se almeno una partita è selezionata
        const isAtLeastOneSelected = Object.values(checkedItems).some((checked) => checked);

        if (!isAtLeastOneSelected) {
            alert("Seleziona almeno un silos");
            return;
        }

        const formData = new FormData(e.target);
        registraVendita(formData, checkedItems, username, selectedDateTimeScadenza)
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
                <FormLabel>Mesi di stagionatura: &nbsp;&nbsp;</FormLabel>
                <input type="number" required={true} name="stagionatura" className={"form-control"} min="12" step="1"/>
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
                       min="71"
                       step="1"
                       max="94"/>
                <br/>
                <FormLabel>Diametro (in pollici):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="diametro"
                       className={"form-control"}
                       min="16"
                       step="1"
                       max="18"/>
                <br/>
                <FormLabel>Peso (in libbre):</FormLabel>
                <br/>
                <input type="number"
                       required={true}
                       name="peso"
                       className={"form-control"}
                       min="84"
                       step="84"
                       max="100"/>
                <br/>
                <FormLabel> Partite di latte usate: &nbsp;&nbsp;</FormLabel>
                {checkBoxesRequiredError && <p style={{ color: "red" }}>Seleziona almeno una opzione.</p>}
                <br />
                <CheckboxList items={partite} checkedItems={checkedItems} onChange={handleCheckboxChange} />
                <br/><br/>
                <Button variant="primary" type="submit">Metti in vendita</Button><br/>
            </Form>
            </Container>
        </div>

    );

}

function CheckboxList({ items, checkedItems, onChange }) {
    if(items && items.length === 0) {
        return(<div>Non ci sono partite disponibili</div>)
    }

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
    let api = 'http://127.0.0.1:5001/api/v1/namespaces/default/apis/producerInterface/invoke/mettiInVenditaFormaggio'
    let timeScad = convertDateTimetoEpochSeconds(dataScadenza)
    let hashPassword = sessionStorage.getItem('hashPassword')
    const credentials = btoa(username + ":" + hashPassword);
    const authHeader = `Basic ${credentials}`

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            "input": {
                "altezza": formData.get('altezza'),
                "dataScadenza": timeScad,
                "diametro": formData.get('diametro'),
                "idPartiteLatteUsate": Object.keys(checkedItems),
                "peso": formData.get('peso'),
                "stagionatura": formData.get('stagionatura'),
                "tipoTrasformazione": trasformazioniRichieste,
                "user": username
            }
        })
    };

    fetch(api, requestOptions)
        .then((response) => {
            let res = response.json();

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

export default FormProducerVenditaFormaggio;