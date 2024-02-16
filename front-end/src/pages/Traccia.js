import FormTracciabilita from "../components/FormTracciabilita";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Traccia() {
    return (
        <Container fluid>
            <Row>
                <Col sm><FormTracciabilita/></Col>
            </Row>
        </Container>
    );
}