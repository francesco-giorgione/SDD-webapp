import React, { useState, useEffect } from 'react';
import {Link, Redirect, useLocation} from "react-router-dom";
import SchedaFormaggio from "../../components/schede/SchedaFormaggio";

function Formaggio() {
    const location = useLocation();
    const idFormaggio = location.state.idFormaggio;
    const [formaggio, setFormaggio] = useState(null);

    useEffect(() => {
        const fetchFormaggio = async () => {
            try {
                const response = await fetch('/trace/formaggio/' + idFormaggio);
                const data = await response.json();
                setFormaggio(data);
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error);
            }
        };

        fetchFormaggio();
    }, [idFormaggio]);

    return (
        <div align='center'>
            <br/>
            <Link to="/Movimenti" className="btn btn-primary mb-3">
                Indietro
            </Link>
            {formaggio && <SchedaFormaggio formaggio={formaggio.output} />}
        </div>
    );
}

export default Formaggio;
