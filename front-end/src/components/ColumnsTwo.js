import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormMilkhubAcquistaSilos from "./form/FormMilkhubAcquistaSilos";
import FormLogin from "./form/FormLogin";

function ColumnsTwo() {

    const username = sessionStorage.getItem("username");

    if (username){
        if (username.slice(0,username.length-1) === "milkhub") {
            return(<Container fluid>
                <Row>
                    <Col sm><FormMilkhubAcquistaSilos/></Col>
                    <Col sm><FormLogin/></Col>
                </Row>
            </Container>)
        }
        else if (username.slice(0,username.length-1) === "producer") {
            return(<Container fluid>
                <Row>
                    <p>Producer</p>
                    <Col sm><FormLogin/></Col>
                    <Col sm><FormLogin/></Col>
                </Row>
            </Container>)
        }
        else if (username.slice(0,username.length-1) === "retailer") {
            return(<Container fluid>
                <Row>
                    <p>Retailer</p>
                    <Col sm><FormLogin/></Col>
                    <Col sm><FormLogin/></Col>
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