import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Operazioni from "./pages/Operazioni";
import Movimenti from "./pages/Movimenti";
import Profilo from "./pages/Profilo";
import Traccia from "./pages/Traccia";
import Partita from "./pages/prodotti/Partita";
import Formaggio from "./pages/prodotti/Formaggio";
import Pezzo from "./pages/prodotti/Pezzo";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App />
            <Routes>
                <Route exact path="/" element={< Traccia />} />
                <Route exact path="/Traccia" element={< Traccia />} />
                <Route exact path="/Operazioni" element={< Operazioni />} />
                <Route exact path="/Movimenti" element={< Movimenti />} />
                <Route exact path="/Profilo" element={< Profilo />} />
                <Route exact path="/Partita" element={< Partita />} />
                <Route exact path="/Formaggio" element={< Formaggio />} />
                <Route exact path="/Pezzo" element={< Pezzo />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();