const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/api/data', (req, res) => {
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});