import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function MenuNavBarDropdown() {
    return (
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/Home">Milkchain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Operazioni">Operazioni</Nav.Link>
                        <Nav.Link href="/Movimenti">Movimenti</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/Profilo">Profilo</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuNavBarDropdown;