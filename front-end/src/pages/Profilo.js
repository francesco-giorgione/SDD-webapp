import FormLogin from "../components/form/FormLogin";
import SchedaProfilo from "../components/schede/SchedaProfilo";
const logout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("ruolo");

    window.location.reload();
}

export default function Profilo() {

    let username = sessionStorage.getItem("username");

    console.log(username);

    if (username) {
        return(<SchedaProfilo/>)
    } else {
        return(<FormLogin/>);
    }

}
