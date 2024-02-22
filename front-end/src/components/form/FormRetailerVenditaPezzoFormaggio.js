import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";

function FormRetailerVenditaPezzoFormaggio() {
    const [formaggi, setFormaggi] = useState([]);
    let username = sessionStorage.getItem('username');

    useEffect(() => {
        const fetchFormaggiId = async (username) => {
            try {
                const response = await fetch(`/profilo/formaggi/acquistati/${username}`);
                const jsonData = await response.json();
                setFormaggi(jsonData.map((formaggio) => formaggio.id));
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        };

        fetchFormaggiId(username);
    }, [username]);

    return (
        <div>
            <label>Vendita Pezzo di Formaggio:</label>
            <Container className={"border border-primary rounded"}>
                <br /><h6>Formaggio di provenienza:</h6>
                <RadioButtonForm formaggi={formaggi} username={username} />
            </Container>
        </div>
    );
}

function RadioButtonForm({ formaggi, username }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption) {
            registraVendita(selectedOption, username); // Passa anche lo username
        } else {
            alert("Seleziona un'opzione!");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <fieldset>
                {formaggi.length === 0 ? (
                    <legend>Formaggio usato</legend>
                ) : (
                    formaggi.map((formaggio, index) => (
                        <Form.Check key={index}>
                            <input
                                type="radio" id={`option${index}`} name="options" value={formaggio}
                                checked={selectedOption === formaggio} onChange={handleOptionChange}
                            />
                            <label htmlFor={`option${index}`}>{formaggio}</label>
                        </Form.Check>
                    ))
                )}
            </fieldset>
            <br />
            <Button variant="primary" type="submit">Metti in vendita</Button>
        </Form>
    );
}

function registraVendita(selectedOption, username) {
    let api = 'http://127.0.0.1:5002/api/v1/namespaces/default/apis/retailerInterface_2/invoke/mettiInVenditaPezzoFormaggio'
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
                "idFormaggioUsato": selectedOption,
                "user": username
            }
        })
    };

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

export default FormRetailerVenditaPezzoFormaggio;
