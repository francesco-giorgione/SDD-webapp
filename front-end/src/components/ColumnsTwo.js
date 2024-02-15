import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormOne from "./FormOne";

function ColumnsTwo() {
    return (
        <Container fluid>
            <Row>
                <Col sm><FormOne/></Col>
                <Col sm><FormOne/></Col>
            </Row>
        </Container>
    );
}

export default ColumnsTwo;