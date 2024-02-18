const express = require('express')
const fs = require("fs");
const router = express.Router()

router.post('/auth', async (req, res) => {
    const username = req.body.username
    const hashPassword = req.body.hashPassword

    console.log('username: ' + username)
    console.log('!username: ' + !username)

    if(!username || !hashPassword || !credenzialiOk(username, hashPassword)) {
        res.json({"success": "false"})
    }
    else res.json({"success": "true"})
})

function credenzialiOk(username, hashPassword) {
    let path = '../SDD-webapp/auth/users.json'
    console.log('path: ' + path)
    const datiJson = fs.readFileSync(path, 'utf-8');
    const dati = JSON.parse(datiJson);
    let ok = false;

    dati.forEach((user) => {
        if(!ok && user.username === username && user.password === hashPassword) {ok = true}
    });

    return ok
}

module.exports = router;


