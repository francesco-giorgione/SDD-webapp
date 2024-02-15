import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccordionComp from "./AccordionComp";

function ColumnsThree() {
    return (
        <Container fluid>
            <Row>
                <Col sm><AccordionComp/></Col>
                <Col sm><AccordionComp/></Col>
                <Col sm><AccordionComp/></Col>
            </Row>
        </Container>
    );
}

export default ColumnsThree;