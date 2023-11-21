const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./src/routes/apiRoutes')
const conn = require('./src/database/connection')
const https = require('https');
const http = require('http');
const fs = require('fs');

var privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
var certificate = fs.readFileSync('selfsigned.crt', 'utf8');

console.log(privateKey);

const credentials = {key: privateKey, cert: certificate, rejectUnauthorized: false};

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT);

// https.createServer(options, app).listen(PORT);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
