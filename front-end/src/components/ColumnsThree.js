import MovimentiMilkhub from "./movimenti/MovimentiMilkhub";
import MovimentiProducer from "./movimenti/MovimentiProducer";
import MovimentiRetailer from "./movimenti/MovimentiRetailer";


function ColumnsThree() {
    let username = sessionStorage.getItem("username")
    let ruolo = sessionStorage.getItem("ruolo")

    if(parseInt(ruolo) === 1) {
        return (<MovimentiMilkhub username={username}/>);
    }

    if(parseInt(ruolo) === 2) {
        return (<MovimentiProducer username={username}/>);
    }

    if(parseInt(ruolo) === 3) {
        return (<MovimentiRetailer username={username}/>);
    }
}


export default ColumnsThree;