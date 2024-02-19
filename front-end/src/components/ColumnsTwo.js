import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormMilkhubAcquistaSilos from "./form/FormMilkhubAcquistaSilos";
import FormMilkhubVenditaPartita from "./form/FormMilkhubVenditaPartita";
import FormProducerAcquistaPartita from "./form/FormProducerAcquistaPartita";
import FormProducerVenditaFormaggio from "./form/FormProducerVenditaFormaggio";
import FormRetailerAcquistaFormaggio from "./form/FormRetailerAcquistaFormaggio";
import FormRetailerVenditaPezzoFormaggio from "./form/FormRetailerVenditaPezzoFormaggio";

function ColumnsTwo() {

    const username = sessionStorage.getItem("username");

    if (username){
        if (username.slice(0,username.length-1) === "milkhub") {
            return(<Container fluid>
                <Row>
                    <Col sm><FormMilkhubAcquistaSilos/></Col>
                    <Col sm><FormMilkhubVenditaPartita/></Col>
                </Row>
            </Container>)
        }
        else if (username.slice(0,username.length-1) === "producer") {
            return(<Container fluid>
                <Row>
                    <Col sm><FormProducerAcquistaPartita/></Col>
                    <Col sm><FormProducerVenditaFormaggio/></Col>
                </Row>
            </Container>)
        }
        else if (username.slice(0,username.length-1) === "retailer") {
            return(<Container fluid>
                <Row>
                    <p>Retailer</p>
                    <Col sm><FormRetailerAcquistaFormaggio/></Col>
                    <Col sm><FormRetailerVenditaPezzoFormaggio/></Col>
                </Row>
            </Container>)
        } else {
            return(<Container><p>Non disponi di uno username valido per visualizzare questa pagina</p></Container>)
        }
    } else {
        return (<Container><p>Non disponi delle autorizzazioni necessarie per visualizzare questa pagina</p></Container>)
    }
}

export default ColumnsTwo;