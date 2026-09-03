// A URL da nossa API
const url = "http://localhost:3000/produtos";

/**
 * 1. BUSCAR PRODUTOS (GET)
 * AULA: async/await, try/catch/finally
 */
async function buscarProdutos() {
    try {
        console.log('[AULA] Buscando produtos...');
        // await aguarda a resposta da API sem bloquear a página
        const resposta = await fetch(url);
        const produtos = await resposta.json();
        exibirProdutos(produtos);
    } catch (erro) {
        console.error('[AULA] Erro ao buscar produtos:', erro);
        document.getElementById('lista-produtos').innerHTML = '<p>Erro ao carregar produtos</p>';
    } finally {
        console.log('[AULA] finally: busca de produtos finalizada (sempre executa)');
    }
}

/**
 * 2. SALVAR NOVO PRODUTO (POST)
 */
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async function(evento) {
    try {
        // AULA: evita que a página recarregue
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const preco = document.getElementById("preco").value;
        const descricao = document.getElementById("descricao").value;

        const dados = { nome, preco: Number(preco), descricao };

        console.log('[AULA] Salvando produto...');
        // await envia o POST e aguarda a resposta
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
        console.error('[AULA] Erro ao salvar produto:', erro);
        alert('Erro ao salvar produto');
    }
});

// Executa a busca de produtos assim que a página abre
buscarProdutos();

function exibirProdutos(produtos) {
    const lista = document.getElementById('lista-produtos');
    if (!produtos.length) {
        lista.innerHTML = '<p>Nenhum produto encontrado</p>';
        return;
    }

    lista.innerHTML = produtos.map(p => `
        <div class="produto-card">
            <h3>${p.nome}</h3>
            <p>Preço: R$ ${Number(p.preco).toFixed(2)}</p>
            <p>${p.descricao || ''}</p>
        </div>
    `).join('');
}
