const pool = require('../db');

// ==========================================
// AULA: exemplo didático separado de
// async, await, try, catch e finally
// ==========================================

async function exemploBuscarProdutos() {
  try {
    console.log('[AULA] Iniciando busca de produtos...');
    const result = await pool.query('SELECT * FROM produtos');
    console.log('[AULA] Produtos encontrados:', result.rows.length);
    return result.rows;
  } catch (err) {
    console.error('[AULA] Erro ao buscar produtos:', err.stack);
    throw err;
  } finally {
    console.log('[AULA] finally: bloco de busca executado (sempre roda)');
  }
}

async function exemploSalvarProduto(nome, preco, descricao) {
  try {
    console.log('[AULA] Iniciando cadastro de produto...');
    const result = await pool.query(
      'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome, preco, descricao]
    );
    console.log('[AULA] Produto salvo:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('[AULA] Erro ao salvar produto:', err.stack);
    throw err;
  } finally {
    console.log('[AULA] finally: bloco de cadastro executado (sempre roda)');
  }
}

module.exports = {
  exemploBuscarProdutos,
  exemploSalvarProduto,
};
