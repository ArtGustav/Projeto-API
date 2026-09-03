require('dotenv').config();
const express = require('express');
const path = require('path');
const produtosRouter = require('./routes/produtos');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/produtos', produtosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Frontend: http://localhost:${port}`);
  console.log(`Endpoint: http://localhost:${port}/produtos`);
});
