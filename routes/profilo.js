const express = require('express')
const ut = require('../utils')
const router = express.Router()

router.get('/profilo/silos/acquistati/:milkhub', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.milkhub, ut.getSilosAcquistati, ut.getSilos, false))
})

router.get('/profilo/partite/in-vendita/:milkhub', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.milkhub, ut.getPartiteInVendita, ut.getPartita, true))
})

router.get('/profilo/partite/venduti/:milkhub', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.milkhub, ut.getPartiteVendute, ut.getPartita, false))
})

router.get('/profilo/partite/acquistati/:producer', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.producer, ut.getPartiteAcquistate, ut.getPartita, false))
})

router.get('/profilo/formaggi/in-vendita/:producer', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.producer, ut.getFormaggiInVendita, ut.getFormaggio, true))
})

router.get('/profilo/formaggi/venduti/:producer', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.producer, ut.getFormaggiVenduti, ut.getFormaggio, false))
})

router.get('/profilo/formaggi/acquistati/:retailer', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.retailer, ut.getFormaggiAcquistati, ut.getFormaggio, false))
})

router.get('/profilo/pezzi/in-vendita/:retailer', async (req, res) => {
    res.json(await ut.getProdottiProfilo(req.params.retailer, ut.getPezziInVendita, ut.getPezzo, true))
})



module.exports = router