import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function SchedaFormaggio( {formaggio} ) {
    console.log(formaggio)

    return(
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Data di acquisto</th>
                <th>Data di scadenza</th>
                <th>Diametro</th>
                <th>Altezza</th>
                <th>Certificato di stagionatura</th>
                <th>Peso</th>
                <th>Venditore</th>
                <th>Compratore</th>
                <th>Trasformazioni</th>
                <th>Partite di latte usate</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{formaggio.id}</td>
                <td>{formaggio.dataAcquisto}</td>
                <td>{formaggio.dataScadenza}</td>
                <td>{formaggio.diametro}</td>
                <td>{formaggio.altezza}</td>
                <td>{formaggio.certificatoStagionatura}</td>
                <td>{formaggio.peso}</td>
                <td>{formaggio.venditore}</td>
                <td>{formaggio.compratore}</td>
                <td>
                    {formaggio.tipoTrasformazione[0]},<br/>
                    {formaggio.tipoTrasformazione[1]},<br/>
                    {formaggio.tipoTrasformazione[2]},<br/>
                    {formaggio.tipoTrasformazione[3]},<br/>
                </td>
                <td align='center'><ButtonList partite={formaggio.partiteLatteUsate}/></td>
            </tr>
            </tbody>
        </Table>
    );
}

export default SchedaFormaggio;

function ButtonList({ partite }) {
    // Mapping degli interi per creare un array di bottoni
    const buttons = partite.map((partita, index) => (
        <Button key={index}>{partita.id}</Button>
    ));

    return (
        <div>
            {/* Visualizzazione degli array di bottoni */}
            {buttons}
        </div>
    );
}

