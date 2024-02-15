
const express = require('express');
const app = express();
const traceRouter = require('./routes/trace')
const profiloRouter = require('./routes/profilo')

app.use(express.json())
app.use(traceRouter)
app.use(profiloRouter)

// app.listen(3000);
// console.log("Listening on port 3000");

const path = require('path');

app.use(express.static(path.join(__dirname, '/front-end/build')));

app.use((req, res) => {
    res.status(200).send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

