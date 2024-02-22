const axios = require("axios");

async function getSilos(id) {
    let silos = await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/acquistoMilkhub/query/getById')
    // let compratore = await getRagioneSociale(silos.output.compratore)
    // silos.output.compratore = compratore.output.ragioneSociale
    return silos
}

async function getPartita(id) {
    let partita = await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioMilkhubProducer/query/getById')
    // let compratore = await getRagioneSociale(partita.output.compratore)
    // let venditore = await getRagioneSociale(partita.output.venditore)
    // if(compratore.success !== "false") partita.output.compratore = compratore.output.ragioneSociale
    // if(venditore.success !== "false") partita.output.venditore = venditore.output.ragioneSociale
    return partita
}

async function getFormaggio(id) {
    let formaggio = await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioProducerRetailer/query/getById')
    // let compratore = await getRagioneSociale(formaggio.output.compratore)
    // let venditore = await getRagioneSociale(formaggio.output.venditore)
    // formaggio.output.compratore = compratore.output.ragioneSociale
    // formaggio.output.venditore = venditore.output.ragioneSociale
    return formaggio
}

async function getPezzo(id) {
    let pezzo = await fetchDataTrace(id, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioRetailerConsumer/query/getById')
    // let venditore = await getRagioneSociale(pezzo.output.venditore)
    // pezzo.output.venditore = venditore.output.ragioneSociale
    return pezzo
}

async function getSilosAcquistati(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/acquistoMilkhub/query/getIdSilosByCompratore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}

}

async function getPartiteInVendita(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioMilkhubProducer/query/getIdPartiteLatteByVenditore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}
}

async function getPartiteVendute(milkhub) {
    let ids = await fetchDataProfilo(milkhub, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioMilkhubProducer/query/getIdPartiteLatteByVenditore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}
}

async function getPartiteAcquistate(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioMilkhubProducer/query/getIdPartiteLatteByCompratore')
    return ids.success === "true" ? ids.output : {"success": "false"}
}

async function getFormaggiInVendita(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioProducerRetailer/query/getIdFormaggiByVenditore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}
}

async function getFormaggiVenduti(producer) {
    let ids = await fetchDataProfilo(producer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioProducerRetailer/query/getIdFormaggiByVenditore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}
}

async function getFormaggiAcquistati(retailer) {
    let ids = await fetchDataProfilo(retailer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioProducerRetailer/query/getIdFormaggiByCompratore')
    return ids.success === "true" ? ids.output : {"success": "false"}
}

async function getPezziInVendita(retailer) {
    let ids = await fetchDataProfilo(retailer, 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/scambioRetailerConsumer/query/getIdPezziFormaggioByVenditore')

    if(ids.success === "true") {
        return ids.output
    }
    return {"success": "false"}
}

async function getRagioneSociale(username) {
    let url = 'http://127.0.0.1:5003/api/v1/namespaces/default/apis/gestioneUtenti/query/getUtenteByUsername'

    try {
        const credentials = Buffer.from("admin:admin").toString('base64');
        const authHeader = `Basic ${credentials}`;

        const response = await axios.post(url, {
            input: {
                username: username
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Request-Timeout': '2m0s',
                'Content-Type': 'application/json',
                'Authorization': authHeader
            }
        });

        return {...{"success": "true"}, ...response.data}

    } catch (error) {
        console.error('Error fetching data:', error);
        return {"success": "false"}
    }
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

async function getProdottiProfilo(user, getter, getterProdotto, compratoreNullo) {
    let ids = await getter(user)
    let prodotti = []

    try {
        const promesse = ids.map(async (id) => {
            let tmp = await getterProdotto(id)

            if(!tmp.output) {
                return
            }

            if(tmp.output.hasOwnProperty('compratore')) {
                if(!compratoreNullo && tmp.output.compratore === '') {
                    return
                }

                if(compratoreNullo && tmp.output.compratore !== '') {
                    return
                }
            }

            return tmp.output
        });

        prodotti = await Promise.all(promesse)
    } catch (error) {
        console.error("Si è verificato un errore:", error)
        return {"success": "false"}
    }

    return prodotti.filter((prodotto) => prodotto)
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
    getProdottiProfilo
}