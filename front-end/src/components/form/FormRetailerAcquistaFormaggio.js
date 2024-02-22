import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Bounce, toast} from "react-toastify";

function FormRetailerAcquistaFormaggio() {
    const[formaggiInVendita, setFormaggiInVendita] = useState([]);

    useEffect(() => {
        const fetchFormaggiInVendita = async () => {
            try {
                const response = await fetch('/all/formaggi/in-vendita');
                const data = await response.json();
                setFormaggiInVendita(data.map((formaggio => formaggio.id)));
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        };

        fetchFormaggiInVendita();
    }, []);

    return(<RadioButtonForm options={formaggiInVendita} />);
}

function RadioButtonForm({ options }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    if(options && options.length === 0) {
        return(
            <fieldset>
                <legend>Formaggi disponibili</legend>
                Non ci sono formaggi in vendita
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
                <legend>Formaggi disponibili</legend>
                {options && options.map((option, index) => (
                    <Form.Check key={index}>
                        <input
                            type="radio" id={`option${index}`} name="options" value={option}
                            checked={selectedOption === option} onChange={handleOptionChange}
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
    let api = 'http://127.0.0.1:5002/api/v1/namespaces/default/apis/retailerInterface_2/invoke/acquistaFormaggio'
    let username = sessionStorage.getItem('username')
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
                "id": id,
                "user": sessionStorage.getItem("username")
            }
        })
    };

    fetch(api, requestOptions)
        .then((response) => {
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

export default FormRetailerAcquistaFormaggio;