import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Bounce, toast} from "react-toastify";

function FormProducerAcquistaPartita() {
    const [partiteInVendita, setPartiteInVendita] = useState();

    useEffect(() => {
        const fetchPartiteInVendita = async () => {
            try {
                const response = await fetch('/all/partite/in-vendita');
                const data = await response.json();
                setPartiteInVendita(data.map((partita => partita.id)));
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        };

        fetchPartiteInVendita();
    }, []);

    return(<RadioButtonForm options={partiteInVendita} />);
}

function RadioButtonForm({ options }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    if(options && options.length === 0) {
        return(
            <fieldset>
                <legend>Partite di latte disponibili</legend>
                Non ci sono partite di latte in vendita
            </fieldset>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption) {
            registraAcquisto(selectedOption)
        } else {
            alert("Seleziona un'opzione!");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Partite di latte disponibili</legend>
                {options && options.map((option, index) => (
                    <Form.Check key={index}>
                        <input
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor={`option${index}`}>{option}</label>
                    </Form.Check>
                ))}
            </fieldset>
            <br/>
            <Button variant="primary" type="submit">Registra acquisto</Button>
        </Form>
    );
}

function registraAcquisto(id) {
    let api = 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ProducerInterface_6.2.16/invoke/acquistaPartitaLatte'

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "input": {
                "id": id,
                "user": sessionStorage.getItem("username")
            }
        })
    };

    fetch(api, requestOptions)
        .then((response) => {
            let res = response.json();

            toast.info("Acquisto effettuato", {
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



export default FormProducerAcquistaPartita;