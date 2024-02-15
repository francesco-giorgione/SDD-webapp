
const express = require('express');
const app = express();
const traceRouter = require('./routes/trace')
const profiloRouter = require('./routes/profilo')

app.use(express.json())
app.use(traceRouter)
app.use(profiloRouter)

app.listen(3000);
console.log("Listening on port 3000");

