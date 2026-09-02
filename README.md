# API de Produtos - Express + PostgreSQL

API RESTful para gerenciamento de produtos, construída com **Node.js**, **Express** e **PostgreSQL**.

## Tecnologias

- Node.js
- Express
- PostgreSQL (driver `pg`)
- Nodemon (desenvolvimento)
- dotenv (variáveis de ambiente)

## Pré-requisitos

- Node.js
- PostgreSQL

## Configuração

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o banco de dados

Crie o database e a tabela de produtos executando o script SQL:

```bash
psql -U postgres -d postgres -c "CREATE DATABASE atv_ios;"
psql -U postgres -d atv_ios -f tabela_produtos.sql
```

### 3. Configure as variáveis de ambiente

Copie o `.env` e ajuste as credenciais do PostgreSQL:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=atv_ios
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
```

### 4. Inicie o servidor

```bash
npm start
```

O servidor rodará em `http://localhost:3000` com reload automático via nodemon.

## Endpoints

| Método | Rota             | Descrição                                   | Status de Sucesso |
|--------|------------------|---------------------------------------------|-------------------|
| GET    | `/`              | Página inicial com links para os endpoints | 200               |
| GET    | `/produtos`      | Lista todos os produtos                     | 200               |
| GET    | `/produtos/:id`  | Retorna um produto pelo ID                  | 200 / 404         |
| POST   | `/produtos`      | Cadastra um novo produto                    | 201               |

### GET /produtos

Retorna um array com todos os produtos cadastrados.

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "Teclado Mecânico",
    "preco": "250.00",
    "descricao": "Teclado mecânico switch blue com LED RGB."
  }
]
```

### GET /produtos/:id

Retorna um único produto pelo ID.

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Teclado Mecânico",
  "preco": "250.00",
  "descricao": "Teclado mecânico switch blue com LED RGB."
}
```

**Resposta (404):**
```json
{
  "error": "Produto não encontrado"
}
```

### POST /produtos

Cadastra um novo produto.

**Body (JSON):**
```json
{
  "nome": "Teclado Virtual",
  "preco": 89.90,
  "descricao": "Teclado sem fio virtual para apresentações."
}
```

**Resposta (201):**
```json
{
  "id": 11,
  "nome": "Teclado Virtual",
  "preco": "89.90",
  "descricao": "Teclado sem fio virtual para apresentações."
}
```

## Testando a API

Acesse `http://localhost:3000/` para uma página com links clicáveis, ou use ferramentas como **Thunder Client** (extensão VS Code) ou **Postman** para testar os endpoints diretamente.

## Estrutura do Projeto

```
.
├── server.js                 Server principal (API + conexão PostgreSQL)
├── package.json              Dependências e scripts
├── .env                      Variáveis de ambiente (não versionado)
├── .gitignore
├── tabela_produtos.sql       Script de criação da tabela e dados iniciais
└── README.md
```

## Autor

Prof. Joelson Silva
