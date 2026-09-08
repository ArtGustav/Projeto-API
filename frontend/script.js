// A URL da nossa API
const url = "http://localhost:3000/produtos";

let todosProdutos = [];

/**
 * 1. BUSCAR PRODUTOS (GET)
 */
async function buscarProdutos() {
    try {
        const resposta = await fetch(url);
        const produtos = await resposta.json();
        todosProdutos = produtos;
        aplicarFiltros();
    } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
        document.getElementById('lista-produtos').innerHTML = '<div class="empty-state"><h3>Erro ao carregar</h3><p>Tente novamente</p></div>';
    }
}

/**
 * 2. APLICAR FILTROS
 */
function aplicarFiltros() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();
    const precoMin = parseFloat(document.getElementById('preco-min').value) || 0;
    const precoMax = parseFloat(document.getElementById('preco-max').value) || Infinity;

    const produtosFiltrados = todosProdutos.filter(p => {
        const nomeMatch = p.nome.toLowerCase().includes(termoBusca);
        const preco = parseFloat(p.preco);
        const precoMatch = preco >= precoMin && preco <= precoMax;
        return nomeMatch && precoMatch;
    });

    exibirProdutos(produtosFiltrados);
}

function limparFiltros() {
    document.getElementById('campo-busca').value = '';
    document.getElementById('preco-min').value = '';
    document.getElementById('preco-max').value = '';
    aplicarFiltros();
}

/**
 * 3. SALVAR NOVO PRODUTO (POST)
 */
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async function(evento) {
    try {
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const preco = document.getElementById("preco").value;
        const descricao = document.getElementById("descricao").value;

        const dados = { nome, preco: Number(preco), descricao };

        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            formulario.reset();
            await buscarProdutos();
        } else {
            alert('Erro ao salvar produto');
        }
    } catch (erro) {
        console.error('Erro ao salvar produto:', erro);
        alert('Erro ao salvar produto');
    }
});

/**
 * 4. EDITAR PRODUTO (PUT)
 */
const formularioEditar = document.getElementById("formulario-editar");

formularioEditar.addEventListener("submit", async function(evento) {
    try {
        evento.preventDefault();

        const id = document.getElementById("editar-id").value;
        const nome = document.getElementById("editar-nome").value;
        const preco = document.getElementById("editar-preco").value;
        const descricao = document.getElementById("editar-descricao").value;

        const dados = { nome, preco: Number(preco), descricao };

        const resposta = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            fecharModal('modal-editar');
            await buscarProdutos();
        } else {
            const erro = await resposta.json();
            alert('Erro ao atualizar produto: ' + (erro.error || 'Erro desconhecido'));
        }
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro);
        alert('Erro ao atualizar produto');
    }
});

/**
 * 5. EXCLUIR PRODUTO (DELETE)
 */
async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
        return;
    }

    try {
        const resposta = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok || resposta.status === 204) {
            await buscarProdutos();
        } else {
            const erro = await resposta.json();
            alert('Erro ao excluir produto: ' + (erro.error || 'Erro desconhecido'));
        }
    } catch (erro) {
        console.error('Erro ao excluir produto:', erro);
        alert('Erro ao excluir produto');
    }
}

/**
 * 6. VISUALIZAR PRODUTO
 */
async function visualizarProduto(id) {
    try {
        const resposta = await fetch(`${url}/${id}`);
        
        if (!resposta.ok) {
            alert('Produto não encontrado');
            return;
        }

        const produto = await resposta.json();
        const conteudo = document.getElementById('conteudo-visualizar');
        conteudo.innerHTML = `
            <div class="detalhe-item"><strong>ID:</strong> <span>${produto.id}</span></div>
            <div class="detalhe-item"><strong>Nome:</strong> <span>${produto.nome}</span></div>
            <div class="detalhe-item"><strong>Preço:</strong> <span>R$ ${Number(produto.preco).toFixed(2)}</span></div>
            <div class="detalhe-item"><strong>Descrição:</strong> <span>${produto.descricao || 'Sem descrição'}</span></div>
        `;
        abrirModal('modal-visualizar');
    } catch (erro) {
        console.error('Erro ao visualizar produto:', erro);
        alert('Erro ao carregar detalhes do produto');
    }
}

/**
 * 7. PREPARAR EDIÇÃO
 */
function prepararEdicao(id) {
    const produto = todosProdutos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('editar-id').value = produto.id;
    document.getElementById('editar-nome').value = produto.nome;
    document.getElementById('editar-preco').value = produto.preco;
    document.getElementById('editar-descricao').value = produto.descricao || '';
    abrirModal('modal-editar');
}

/**
 * 8. MODAIS
 */
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('ativo');
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('ativo');
}

window.onclick = function(evento) {
    if (evento.target.classList.contains('modal')) {
        evento.target.classList.remove('ativo');
    }
}

/**
 * 9. EXIBIR PRODUTOS
 */
function exibirProdutos(produtos) {
    const lista = document.getElementById('lista-produtos');
    
    if (!produtos.length) {
        lista.innerHTML = '<div class="empty-state"><h3>Nenhum produto encontrado</h3><p>Tente ajustar os filtros</p></div>';
        return;
    }

    lista.innerHTML = produtos.map(p => `
        <div class="produto-card">
            <div class="card-header">
                <h3>${p.nome}</h3>
            </div>
            <p class="preco">R$ ${Number(p.preco).toFixed(2)}</p>
            <p class="descricao">${p.descricao || 'Sem descrição'}</p>
            <div class="acoes">
                <button class="btn-acao btn-visualizar" onclick="visualizarProduto(${p.id})">Visualizar</button>
                <button class="btn-acao btn-editar" onclick="prepararEdicao(${p.id})">Editar</button>
                <button class="btn-acao btn-excluir" onclick="excluirProduto(${p.id})">Excluir</button>
            </div>
        </div>
    `).join('');
}

/**
 * 10. EVENT LISTENERS PARA FILTROS
 */
document.getElementById('campo-busca').addEventListener('input', aplicarFiltros);
document.getElementById('preco-min').addEventListener('input', aplicarFiltros);
document.getElementById('preco-max').addEventListener('input', aplicarFiltros);

// Inicializar
buscarProdutos();
