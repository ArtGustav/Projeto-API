# API de Produtos - Express + PostgreSQL

API RESTful para gerenciamento de produtos, construída com **Node.js**, **Express** e **PostgreSQL**, com frontend interativo em HTML/CSS/JS.

## Tecnologias

- Node.js
- Express
- PostgreSQL (driver `pg`)
- Nodemon (desenvolvimento)
- dotenv (variáveis de ambiente)

## Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js** (versão 14 ou superior)
- **PostgreSQL** (versão 12 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

## Configuração

### 1. Clone ou extraia o projeto

Se você recebeu este projeto como arquivo compactado, extraia-o em uma pasta de sua escolha.

### 2. Instale as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 3. Configure o banco de dados

Abra o **pgAdmin** ou **DBeaver** e execute o script SQL que está na pasta `database/`:

```bash
psql -U postgres -d postgres -f database/tabela_produtos.sql
```

Ou manualmente no DBeaver/pgAdmin:
1. Conecte-se ao PostgreSQL
2. Crie um novo banco de dados chamado `atv_ios` (se não existir)
3. Abra o arquivo `database/tabela_produtos.sql`
4. Execute o script completo

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou edite o existente) com as credenciais do seu PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=atv_ios
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
PORT=3000
```

**Importante:** Substitua `sua_senha_aqui` pela senha do seu usuário PostgreSQL.

### 5. Inicie o servidor

```bash
npm start
```

Você verá as seguintes mensagens no terminal se tudo estiver correto:

```
Servidor rodando na porta 3000
Frontend: http://localhost:3000
Endpoint: http://localhost:3000/produtos
Conectado ao PostgreSQL com sucesso!
```

### 6. Acesse a aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

## Funcionalidades

### Frontend (Interface Web)

- **Cadastrar Produto**: Formulário para adicionar novos produtos
- **Listar Produtos**: Visualização em cards com layout moderno
- **Buscar Produtos**: Campo de busca por nome em tempo real
- **Filtrar por Preço**: Filtros de preço mínimo e máximo
- **Visualizar Produto**: Modal com detalhes completos do produto
- **Editar Produto**: Modal de edição com dados preenchidos
- **Excluir Produto**: Confirmação antes de remover

### Backend (API REST)

- **GET /produtos** - Lista todos os produtos
- **GET /produtos/:id** - Retorna um produto pelo ID
- **POST /produtos** - Cadastra um novo produto
- **PUT /produtos/:id** - Atualiza um produto existente
- **DELETE /produtos/:id** - Remove um produto

### Sincronização com SQL

Todas as alterações feitas pela interface (cadastro, edição, exclusão) são automaticamente refletidas no arquivo `database/tabela_produtos.sql`. Você pode ver os dados atualizados tanto no DBeaver/pgAdmin quanto no próprio arquivo SQL.

## Estrutura do Projeto

```
.
├── backend/
│   ├── server.js              # Entrada do servidor Express
│   ├── db/
│   │   └── index.js           # Conexão com PostgreSQL
│   ├── routes/
│   │   └── produtos.js        # Rotas da API de produtos
│   └── exemplos/
│       └── index.js           # Exemplos didáticos de async/await/try/catch/finally
├── frontend/
│   ├── index.html             # Página inicial
│   ├── script.js              # JavaScript da interface
│   └── style.css              # Estilos da página
├── database/
│   └── tabela_produtos.sql    # Script SQL de criação e seed (atualizado automaticamente)
├── package.json
├── .env                       # Variáveis de ambiente (não commitado)
├── .gitignore
└── README.md
```

## Testando a API

Além da interface web, você pode testar os endpoints diretamente usando ferramentas como **Thunder Client** (extensão VS Code) ou **Postman**.

### Exemplos de requisições:

**Listar todos os produtos:**
```bash
GET http://localhost:3000/produtos
```

**Buscar produto por ID:**
```bash
GET http://localhost:3000/produtos/1
```

**Cadastrar novo produto:**
```bash
POST http://localhost:3000/produtos
Content-Type: application/json

{
  "nome": "Teclado Virtual",
  "preco": 89.90,
  "descricao": "Teclado sem fio virtual para apresentações."
}
```

**Atualizar produto:**
```bash
PUT http://localhost:3000/produtos/1
Content-Type: application/json

{
  "nome": "Teclado Mecânico Atualizado",
  "preco": 299.90,
  "descricao": "Descrição atualizada"
}
```

**Excluir produto:**
```bash
DELETE http://localhost:3000/produtos/1
```

## Solução de Problemas

### Erro de conexão com o banco de dados

- Verifique se o PostgreSQL está rodando
- Confira se as credenciais no arquivo `.env` estão corretas
- Verifique se o banco `atv_ios` existe
- Verifique se a tabela `produtos` foi criada (execute o script SQL)

### Porta 3000 já está em uso

Altere a porta no arquivo `.env`:

```env
PORT=3001
```

### Dados não aparecem no DBeaver

- Certifique-se de estar conectado ao banco correto (`atv_ios`)
- Execute `SELECT * FROM produtos;` para ver os dados
- O arquivo SQL é atualizado automaticamente, mas pode ser necessário recarregá-lo no DBeaver

## Scripts Disponíveis

```bash
npm start      # Inicia o servidor com nodemon (auto-reload)
npm run dev    # Mesmo que npm start
npm run db:seed # Executa o script SQL no banco de dados
```

## Autor

Prof. Joelson Silva
