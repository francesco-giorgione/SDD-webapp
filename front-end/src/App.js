/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/AppSample.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Operazioni from "./pages/Operazioni";
import Movimenti from "./pages/Movimenti";
import Profilo from "./pages/Profilo";
import MenuNavBarDropdown from "./components/NavbarDropdown";

function App() {
  return (
        <Router>
          <MenuNavBarDropdown/>
          <Routes>
            <Route exact path="/Home" element={< Home />} />
            <Route exact path="/Operazioni" element={< Operazioni />} />
            <Route exact path="/Movimenti" element={< Movimenti />} />
            <Route exact path="/Profilo" element={< Profilo />} />
          </Routes>
        </Router>
  );
}

export default App;
