
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const traceRouter = require('./routes/trace')
const profiloRouter = require('./routes/profilo')
const authRouter = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(traceRouter)
app.use(profiloRouter)
app.use(authRouter)

app.listen(3000);
console.log("Listening on port 3000");