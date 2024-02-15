const express = require('express')
const ut = require('../utils')
const router = express.Router()

router.get('/trace/silos/:id', async (req, res) => {
    res.json(await ut.getSilos(req.params.id))
})

router.get('/trace/partita/:id', async (req, res) => {
    res.json(await getPartitaCompleta(req.params.id))
})

router.get('/trace/formaggio/:id', async (req, res) => {
    res.json(await getFormaggioCompleto(req.params.id))
})

router.get('/trace/pezzo/:id', async (req, res) => {
    res.json(await getPezzoCompleto(req.params.id))
})

module.exports = router;

async function getPartitaCompleta(id) {
    return getDatiCompleti(id, ut.getPartita, "idSilosUsati", ut.getSilos, "silosUsati", true)
}

async function getFormaggioCompleto(id) {
    return getDatiCompleti(id, ut.getFormaggio, "idPartiteLatteUsate", getPartitaCompleta, "partiteLatteUsate", true)
}

async function getPezzoCompleto(id) {
    return getDatiCompleti(id, ut.getPezzo, "idFormaggioUsato", getFormaggioCompleto, "formaggioUsato", false)
}

async function getDatiCompleti(id, getter, nomeCampoJson, getterPrec, nomeNuovoCampoJson, isArray) {
    let prodotto = await getter(id)

    if(prodotto.output === undefined) {
        return {"success": "true"}
    }

    let idProdPrecUsati = prodotto.output[nomeCampoJson]
    let prodPrecUsati = []

    if(!isArray) {
        idProdPrecUsati = [idProdPrecUsati]
    }

    try {
        const promesse = idProdPrecUsati.map(async (id) => {
            tmp = await getterPrec(id);
            return tmp.success === 'true' ? tmp.output : {"success": "false"}
        });

        prodPrecUsati = await Promise.all(promesse);
    } catch (error) {
        console.error("Si è verificato un errore:", error);
        return {"success": "false"}
    }

    isArray ? prodotto.output[nomeNuovoCampoJson] = prodPrecUsati : prodotto.output[nomeNuovoCampoJson] = prodPrecUsati[0]
    delete prodotto.output[nomeCampoJson]

    return {...{"success": "true"}, ...prodotto}
}