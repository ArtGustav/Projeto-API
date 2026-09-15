const express = require('express');
const router = express.Router();
const pool = require('../db');
const exportarProdutosParaSQL = require('../db/exportarProdutosParaSQL');

async function atualizarArquivoSQLSeSolicitado(atualizarSql) {
  if (!atualizarSql) {
    return;
  }

  const todos = await pool.query('SELECT * FROM produtos');
  exportarProdutosParaSQL(todos.rows);
}

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar produtos:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    if (!nome || preco === undefined || preco === null) {
      return res.status(400).json({ error: 'Os campos nome e preco são obrigatórios' });
    }

    const result = await pool.query(
      'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome, preco, descricao]
    );

    const produtoCriado = result.rows[0];
    await atualizarArquivoSQLSeSolicitado(req.body.atualizarSql === true);

    res.status(201).json(produtoCriado);
  } catch (err) {
    console.error('Erro ao adicionar produto:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;

    if (!nome || preco === undefined || preco === null) {
      return res.status(400).json({ error: 'Os campos nome e preco são obrigatórios' });
    }

    const result = await pool.query(
      'UPDATE produtos SET nome = $1, preco = $2, descricao = $3 WHERE id = $4 RETURNING *',
      [nome, preco, descricao, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await atualizarArquivoSQLSeSolicitado(req.body.atualizarSql === true);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await atualizarArquivoSQLSeSolicitado(req.body.atualizarSql === true);

    res.status(204).send();
  } catch (err) {
    console.error('Erro ao remover produto:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
