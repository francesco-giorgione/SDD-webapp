const express = require('express')
const fs = require("fs");
const router = express.Router()

router.post('/auth', async (req, res) => {
    const username = req.body.username
    const hashPassword = req.body.hashPassword

    if(!username || !hashPassword) {
        res.json({"success": "false"})
    }
    else res.json(credenzialiOk(username, hashPassword))
})

function credenzialiOk(username, hashPassword) {
    let path = '../SDD-webapp/auth/users.json'
    console.log('path: ' + path)
    const datiJson = fs.readFileSync(path, 'utf-8');
    const dati = JSON.parse(datiJson);
    let ok = false;
    let ruolo

    dati.forEach((user) => {
        if(!ok && user.username === username && user.password === hashPassword) {
            ruolo = user.ruolo
            ok = true
        }
    });

    return ok ? {"success": "true", "ruolo": ruolo} : {"success": "false"}
}

module.exports = router;


