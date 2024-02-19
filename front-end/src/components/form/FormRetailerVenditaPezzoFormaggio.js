import React, {useState} from "react";
import {convertDateTimetoEpochSeconds, getMinMaxDateTime} from "../../utils/DateTimeUtils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function formRetailerVenditaPezzoFormaggio() {

    const handleSubmit = (e) => {

    }

    return(
        <div>
            <label>Vendita Pezzo di Formaggio:</label>
            <Container className={"border border-primary rounded"}>
                <Form onSubmit={handleSubmit}>
                    <FormLabel>Data di acquisto:</FormLabel>
                    <br/>
                    <input aria-label="Date and time"
                           required={true}
                           className={"form-control"}
                           min={getMinMaxDateTime(0)}
                           type="datetime-local"/>
                    <br/>
                    <FormLabel>Quantità:</FormLabel>
                    <br/>
                    <input type="number"
                           required={true}
                           name="quantita"
                           className={"form-control"}
                           min="1"
                           step="1"
                           max="99"/>
                    <br/>
                    <FormLabel>Formaggio usato: &nbsp;&nbsp;</FormLabel>
                    <br/>
                    <Form.Check
                        inline
                        label="formaggio1"
                        name="formaggio"
                        required={true}
                        type={"radio"}
                        value={"1"}
                        id={"radio-formaggio"}
                    />
                    <Form.Check
                        inline
                        label="formaggio2"
                        name="formaggio"
                        type={"radio"}
                        value={"2"}
                        id={"radio-formaggio"}
                    />
                    <Form.Check
                        inline
                        label="formaggio3"
                        name="formaggio"
                        type={"radio"}
                        value={"3"}
                        id={"radio-formaggio"}
                    />
                    <Form.Check
                        inline
                        label="formaggio4"
                        name="formaggio"
                        type={"radio"}
                        value={"4"}
                        id={"radio-formaggio"}
                    />
                    <br/>
                    <br/>
                    <Button variant="primary" type="submit">Metti in vendita</Button>
                    <br/>
                    <br/>
                </Form>
            </Container>
        </div>

    );

}

export default formRetailerVenditaPezzoFormaggio;