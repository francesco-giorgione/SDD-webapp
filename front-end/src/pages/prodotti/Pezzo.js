import React, { useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import SchedaPezzo from "../../components/schede/SchedaPezzo";

function Pezzo() {
    const location = useLocation();
    const idPezzo = location.state.idPezzo;
    const [pezzo, setPezzo] = useState(null);

    useEffect(() => {
        const fetchPezzo = async () => {
            try {
                const response = await fetch('/trace/pezzo/' + idPezzo);
                const data = await response.json();
                setPezzo(data);
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        };

        fetchPezzo();
    }, [idPezzo]);

    return (
        <div align='center'>
            <br/>
            <Link to="/Movimenti" className="btn btn-primary mb-3">
                Indietro
            </Link>
            {pezzo && <SchedaPezzo pezzo={pezzo.output} />}
        </div>
    );
}

export default Pezzo;
