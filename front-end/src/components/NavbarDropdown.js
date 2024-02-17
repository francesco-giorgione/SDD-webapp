import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComplete() {
    return(
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Milkchain</Navbar.Brand>
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

function NavbarIncomplete() {
    return(
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Milkchain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
        return(<NavbarComplete/>);
    } else {
        return (<NavbarIncomplete/>);
    }
}

export default MenuNavBarDropdown;