require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'atv_ios',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  } else {
    console.log('Conectado ao PostgreSQL com sucesso!');
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar produtos:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar produto:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/produtos', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    if (!nome || preco === undefined || preco === null) {
      return res.status(400).json({ error: 'Os campos nome e preco são obrigatórios' });
    }

    const result = await pool.query(
      'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome, preco, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar produto:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>API de Produtos</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #333; }
    .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 4px solid #0086b3; }
    .method-get { color: #28a745; font-weight: bold; }
    .method-post { color: #dc3545; font-weight: bold; }
    a { color: #0086b3; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { background: #e8e8e8; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>API de Produtos - Endpoints</h1>
  <p>Servidor rodando na porta ${port}</p>

  <div class="endpoint">
    <span class="method-get">GET</span>
    <a href="/produtos">/produtos</a>
    <p>Listar todos os produtos</p>
  </div>

  <div class="endpoint">
    <span class="method-get">GET</span>
    <a href="/produtos/1">/produtos/:id</a>
    <p>Listar um produto específico por ID</p>
  </div>

  <div class="endpoint">
    <span class="method-post">POST</span>
    <code>/produtos</code>
    <p>Adicionar um novo produto</p>
    <pre>{ "nome": "string", "preco": "number", "descricao": "string" }</pre>
  </div>

  <footer>
    <p>Banco de dados: <code>${process.env.DB_NAME || 'atv_ios'}</code></p>
  </footer>
</body>
</html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Endpoint: http://localhost:${port}/produtos`);
  console.log(`Endpoint: http://localhost:${port}/produtos/:id`);
  console.log(`Endpoint: http://localhost:${port}/produtos (POST)`);
  console.log('Conectado ao PostgreSQL com sucesso!');
});
