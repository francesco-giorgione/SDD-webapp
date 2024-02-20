const express = require('express')
const fs = require("fs");
const ut = require("../utils");
const router = express.Router()

router.get('/all/partite/in-vendita', async (req, res) => {
    let partiteInVendita = []

    for (const user of getAllMilkhubs()) {
        let tmp = await ut.getProdottiProfilo(user.username, ut.getPartiteInVendita, ut.getPartita)
        console.log(tmp)
        partiteInVendita.concat(tmp)
    }

    res.json(partiteInVendita)
})

router.get('/all/formaggi/in-vendita', async (req, res) => {
    let formaggiInVendita = []

    for (const user of getAllProducers()) {
        let tmp = await ut.getProdottiProfilo(user.username, ut.getFormaggiInVendita, ut.getFormaggio)
        console.log(tmp)
        formaggiInVendita.concat(tmp)
    }

    res.json(formaggiInVendita)
})

module.exports = router;

function getAllMilkhubs() {
    return getAllByRuolo("1")
}

function getAllProducers() {
    return getAllByRuolo("2")
}

function getAllByRuolo(ruolo) {
    let path = '../SDD-webapp/auth/users.json'
    const datiJson = fs.readFileSync(path, 'utf-8');
    const dati = JSON.parse(datiJson);

    return dati.filter(function (user) {
        return user.ruolo === ruolo
    })
}