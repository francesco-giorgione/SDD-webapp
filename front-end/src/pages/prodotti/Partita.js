import React, { useState, useEffect } from 'react';
import SchedaPartita from "../../components/schede/SchedaPartita";
import {Link, useLocation, Navigate} from "react-router-dom";

function Partita() {
    const location = useLocation();
    const idPartita = location.state.idPartita;
    const [partita, setPartita] = useState(null);

    useEffect(() => {
        const fetchPartita = async () => {
            try {
                const response = await fetch('/trace/partita/' + idPartita);
                const data = await response.json();
                setPartita(data);
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
                return <Navigate to="/Movimenti" />;
            }
        };

        fetchPartita();
    }, [idPartita]);

    return (
        <div align='center'>
            <br/>
            <Link to="/Movimenti" className="btn btn-primary mb-3">
                Indietro
            </Link>
            {partita && <SchedaPartita partita={partita.output} />}
        </div>
    );
}

export default Partita;
