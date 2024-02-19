import Container from "react-bootstrap/Container";
import SchedaFormaggio from "./schede/SchedaFormaggio";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import SchedaPartita from "./schede/SchedaPartita";
import SchedaSilos from "./schede/SchedaSilos";

function CustomModalFormaggio({formaggio, setModalIsOpen}) {
    return(
        <Container fluid>
            <SchedaFormaggio formaggio={formaggio} />
            <Button onClick={() => setModalIsOpen(false)}>Chiudi scheda</Button>
        </Container>
    )
}

function CustomModalPartita({partita, closeModal}) {
    return (
        <Container fluid>
            <SchedaPartita partita={partita}/>
            <Button onClick={closeModal}>Chiudi scheda</Button>
        </Container>
    );
}

function CustomModalSilos({ silos, closeModal }) {
    return (
        <Container fluid>
            <SchedaSilos silos={silos} />
            <Button onClick={closeModal}>Chiudi scheda</Button>
        </Container>
    );
}

export {
    CustomModalFormaggio,
    CustomModalPartita,
    CustomModalSilos
}