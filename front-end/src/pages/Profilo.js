import FormLogin from "../components/form/FormLogin";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const logout = () => {
    sessionStorage.removeItem("username");

    window.location.reload();
}

export default function Profilo() {

    let username = sessionStorage.getItem("username");

    console.log(username);

    if (username) {
        return(<Container>Sezione Profilo di {username} <Button variant="primary" onClick={logout}>Logout</Button></Container>);
    } else {
        return(<FormLogin/>);
    }

}