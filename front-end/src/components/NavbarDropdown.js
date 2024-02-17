import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarLogged() {
    return(
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Milkchain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link href="/Traccia">Traccia</Nav.Link>
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

function NavbarConsumer() {
    return(
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Milkchain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Traccia">Traccia</Nav.Link>
                        <Nav.Link>(per altre funzionalità, effettua il login tramite la sezione profilo)</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/Profilo">Profilo</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function MenuNavBarDropdown() {
    var username = sessionStorage.getItem("username");

    if(username){
        return(<NavbarLogged/>);
    } else {
        return (<NavbarConsumer/>);
    }
}

export default MenuNavBarDropdown;