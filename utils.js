const axios = require("axios");

async function getSilos(id) {
    return await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/AcquistoMilkhub_6.2.14/query/getById')
}

async function getPartita(id) {
    return await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioMilkhubProducer_6.2.14/query/getById')
}

async function getFormaggio(id) {
    return await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioProducerRetailer_6.2.14/query/getById')
}

async function getPezzo(id) {
    return await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioRetailerConsumer_6.2.14/query/getById')
}

async function getSilosAcquistati(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/AcquistoMilkhub_6.2.14/query/getIdSilosByCompratore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}

}

async function getPartiteInVendita(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioMilkhubProducer_6.2.14/query/getIdPartiteLatteByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(partita => partita.compratore === "")
    }
    return {"success": "false"}
}

async function getPartiteVendute(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioMilkhubProducer_6.2.14/query/getIdPartiteLatteByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(partita => partita.compratore !== "")
    }
    return {"success": "false"}
}

async function getPartiteAcquistate(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioMilkhubProducer_6.2.14/query/getIdPartiteLatteByCompratore')
    return ids.success === "true" ? ids.output : {"success": "false"}
}

async function getFormaggiInVendita(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioProducerRetailer_6.2.14/query/getIdFormaggiByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(formaggio => formaggio.compratore === "")
    }
    return {"success": "false"}
}

async function getFormaggiVenduti(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioProducerRetailer_6.2.14/query/getIdFormaggiByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(partita => partita.compratore !== "")
    }
    return {"success": "false"}
}

async function getFormaggiAcquistati(retailer) {
    let ids = await fetchDataProfilo(retailer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioProducerRetailer_6.2.14/query/getIdFormaggiByCompratore')
    return ids.success === "true" ? ids.output : {"success": "false"}
}

async function getPezziInVendita(retailer) {
    let ids = await fetchDataProfilo(retailer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioRetailerConsumer_6.2.14/query/getIdPezziFormaggioByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(pezzo => pezzo.compratore === "")
    }
    return {"success": "false"}
}

async function getPezziVenduti(retailer) {
    let ids = await fetchDataProfilo(retailer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/ScambioRetailerConsumer_6.2.14/query/getIdPezziFormaggioByVenditore')

    if(ids.success === "true") {
        return ids.output.filter(pezzo => pezzo.compratore !== "")
    }
    return {"success": "false"}
}

async function fetchDataTrace(id, url) {
    try {
        const credentials = Buffer.from("admin:admin").toString('base64');
        const authHeader = `Basic ${credentials}`;

        const response = await axios.post(url, {
            input: {
                id: id
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Request-Timeout': '2m0s',
                'Content-Type': 'application/json',
                'Authorization': authHeader // Aggiunge l'header di autenticazione HTTP Basic
            }
        });

        return response.data.output.quantita === "0" || response.data.output.altezza === "0" ?
            {"success": "true"} : {...{"success": "true"}, ...response.data}

    } catch (error) {
        console.error('Error fetching data:', error);
        return {"success": "false"}
    }
}

async function fetchDataProfilo(user, url) {
    try {
        const credentials = Buffer.from("admin:admin").toString('base64');
        const authHeader = `Basic ${credentials}`;

        const response = await axios.post(url, {
            input: {
                user: user
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Request-Timeout': '2m0s',
                'Content-Type': 'application/json',
                'Authorization': authHeader // Aggiunge l'header di autenticazione HTTP Basic
            }
        });

        return {...{"success": "true"}, ...response.data}

    } catch (error) {
        console.error('Error fetching data:', error);
        return {"success": "false"}
    }
}

module.exports = {
    getSilos,
    getPartita,
    getFormaggio,
    getPezzo,
    getSilosAcquistati,
    getPartiteInVendita,
    getPartiteVendute,
    getPartiteAcquistate,
    getFormaggiInVendita,
    getFormaggiVenduti,
    getFormaggiAcquistati,
    getPezziInVendita,
    getPezziVenduti
}