const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./src/routes/apiRoutes')
const conn = require('./src/database/connection')

var corsOptions = {
  origin: ['https://main--resplendent-marzipan-40bae4.netlify.app/', 'http://192.168.0.105:3000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get('/api/data', cors(corsOptions), (req, res) => {
  // Simulando dados dinâmicos para a página
  const data = {
    message: 'Dados dinâmicos do backend!',
    timestamp: new Date().toISOString(),
  };

  res.json(data);
});

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Node.js no Google Cloud!');
});

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});