const express = require('express')
const ut = require('../utils')
const router = express.Router()

router.get('/profilo/silos/acquistati/:milkhub', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.milkhub, ut.getSilosAcquistati, ut.getSilos))
})

router.get('/profilo/partite/in-vendita/:milkhub', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.milkhub, ut.getPartiteInVendita, ut.getPartita))
})

router.get('/profilo/partite/venduti/:milkhub', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.milkhub, ut.getPartiteVendute, ut.getPartita))
})

router.get('/profilo/partite/acquistati/:producer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.producer, ut.getPartiteAcquistate, ut.getPartita))
})

router.get('/profilo/formaggi/in-vendita/:producer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.producer, ut.getFormaggiInVendita, ut.getFormaggio))
})

router.get('/profilo/formaggi/venduti/:producer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.producer, ut.getFormaggiVenduti, ut.getFormaggio))
})

router.get('/profilo/formaggi/acquistati/:retailer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.retailer, ut.getFormaggiAcquistati, ut.getFormaggio))
})

router.get('/profilo/pezzi/in-vendita/:retailer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.retailer, ut.getPezziInVendita, ut.getPezzo))
})

router.get('/profilo/pezzi/venduti/:retailer', async (req, res) => {
    res.json(await getProdottiProfilo(req.params.retailer, ut.getPezziVenduti, ut.getPezzo))
})

async function getProdottiProfilo(user, getter, getterProdotto) {
    let ids = await getter(user)
    let prodotti = []

    try {
        const promesse = ids.map(async (id) => {
            let tmp = await getterProdotto(id)
            return tmp.output
        });

        prodotti = await Promise.all(promesse)
    } catch (error) {
        console.error("Si è verificato un errore:", error)
        return {"success": "false"}
    }

    return prodotti
}

module.exports = router;