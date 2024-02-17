import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuNavBarDropdown from "./components/NavbarDropdown";
import Container from "react-bootstrap/Container";

function App() {

    var username = sessionStorage.getItem("username");

    console.log(username);

    if (username){
        return(<MenuNavBarDropdown/>);
    } else {
        return (<div><MenuNavBarDropdown/><Container>Per utilizzare la webapp, effettuare il login tramite la sezione profilo</Container></div>);
    }
}

export default App;
