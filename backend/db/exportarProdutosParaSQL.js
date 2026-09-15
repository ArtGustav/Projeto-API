const fs = require('fs');
const path = require('path');

function exportarProdutosParaSQL(produtos) {
  const caminhoArquivo = path.join(__dirname, '../../database/tabela_produtos.sql');

  let sql = '-- Script para criacao da tabela e dados atuais de produtos\n';
  sql += 'CREATE TABLE produtos (\n';
  sql += '    id SERIAL PRIMARY KEY,\n';
  sql += '    nome VARCHAR(100) NOT NULL,\n';
  sql += '    preco DECIMAL(10, 2) NOT NULL,\n';
  sql += '    descricao TEXT\n';
  sql += ');\n\n';

  sql += 'TRUNCATE TABLE produtos RESTART IDENTITY;\n\n';

  if (produtos.length > 0) {
    const valores = produtos.map(p => {
      const nome = (p.nome || '').replace(/'/g, "''");
      const desc = p.descricao ? `'${String(p.descricao).replace(/'/g, "''")}'` : 'NULL';
      return `('${nome}', ${p.preco}, ${desc})`;
    }).join(',\n');
    sql += `INSERT INTO produtos (nome, preco, descricao) VALUES \n${valores};\n`;
  }

  try {
    fs.writeFileSync(caminhoArquivo, sql, 'utf8');
  } catch (err) {
    console.error('Erro ao exportar SQL:', err);
  }
}

module.exports = exportarProdutosParaSQL;
