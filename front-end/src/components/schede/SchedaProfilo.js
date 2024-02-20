import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import userImage from "../../img/user_image.png";
function SchedaProfilo() {

    const logout = () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("ruolo");

        window.location.reload();
    }

    const mapRuolo = (n) => {

        const r = parseInt(n);

        switch (r) {
            case 1 : return "milkhub";
            case 2 : return "producer";
            case 3 : return "retailer";
            case 4 : return "consumer";
            default : return "unauthorized";
        }
    }

    const[profilo, setProfilo] = useState({
        PIVA : "12345678901",
        ragioneSociale : "ragioneSociale",
        ruolo : "1",
        sede: "sede",
        username : "username"
    });

    useEffect(() => {
        // fetchProfilo();

        const api = "http://127.0.0.1:5000/api/v1/namespaces/default/apis/gestioneUtenti/query/getUtenteByUsername";

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "input": {
                    "username" : sessionStorage.getItem("username")
                }
            })
        };

        // function updateProfilo(output) {
        //     profilo.PIVA = output.PIVA;
        //     profilo.ragioneSociale = output.ragioneSociale;
        //     profilo.ruolo = output.ruolo;
        //     profilo.sede = output.sede;
        //     profilo.username = output.username;
        //
        //     console.log("Informazioni profilo:");
        //     console.log(profilo);
        // }

        fetch(api, requestOptions).then((response) => {
            response.json().then((data) => {
                setProfilo(data.output);
                console.log("Informazioni profilo (oggetto profilo):")
                console.log(profilo);
                // console.log("Informazioni output di risposta:")
                // console.log(data.output);
            }).catch((err) => {
                console.log(err);
            })
        });

    }, []);

    // const fetchProfilo = async () => {
    //
    //     const api = "http://127.0.0.1:5000/api/v1/namespaces/default/apis/gestioneUtenti/query/getUtenteByUsername";
    //
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             "input": {
    //                 "username" : sessionStorage.getItem("username")
    //             }
    //         })
    //     };
    //
    //     function updateProfilo(output) {
    //         profilo.PIVA = output.PIVA;
    //         profilo.ragioneSociale = output.ragioneSociale;
    //         profilo.ruolo = output.ruolo;
    //         profilo.sede = output.sede;
    //         profilo.username = output.username;
    //
    //         console.log("Informazioni profilo:");
    //         console.log(profilo);
    //     }
    //
    //     fetch(api, requestOptions).then((response) => {
    //         response.json().then((data) => {
    //             console.log("Informazioni output di risposta:")
    //             console.log(data.output);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     });
    // }


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={userImage} />
            <Card.Body>
                <Card.Title>{profilo.ragioneSociale}</Card.Title>
                {/*<Card.Text>*/}
                {/*    Some quick example text to build on the card title and make up the*/}
                {/*    bulk of the card's content.*/}
                {/*</Card.Text>*/}
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Partita IVA: {profilo.PIVA}</ListGroup.Item>
                <ListGroup.Item>Ruolo: {mapRuolo(sessionStorage.getItem("ruolo"))}</ListGroup.Item>
                <ListGroup.Item>Sede: {profilo.sede}</ListGroup.Item>
                <ListGroup.Item>Username: {sessionStorage.getItem("username")}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary" onClick={logout}>Logout</Button>
            </Card.Body>
        </Card>
        </div>
    );
}

export default SchedaProfilo;
