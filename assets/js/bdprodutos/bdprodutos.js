function fecharModal() {
    // FECHAR O MODAL
    document.getElementById('modalEditar').style.display = 'none';
}

function salvarEdicao() {
    // OBTER OS DADOS ATUALIZADOS DO MODAL
    var idProduto = document.getElementById('editIdProduto').value;
    var novaImagemInput = document.getElementById('nova_imagem');
    var novaImagem = novaImagemInput.files[0];
    var titulo = document.getElementById('editTitulo').value;
    var descricao = document.getElementById('editDescricao').value;

    // CRIAR UM OBJETO FORMDATA PARA ENVIAR A IMAGEM
    var formData = new FormData();
    formData.append('idProduto', idProduto);
    formData.append('nova_imagem', novaImagem);
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);

    // FAZER A REQUISIÇÃO AJAX USANDO O OBJETO FORMDATA
    $.ajax({
        url: '../acesso_produtos/atualizar_produto.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,  // EVITAR QUE O jQuery PROCESS AUTOMATICAMENTE OS DADOS
        success: function (resposta) {
            /* console.log("Resposta do servidor:", resposta); */

            // FECHAR O MODAL
            fecharModal();

            // ATUALIZAR A PÁGINA APÓS FECHAR O MODAL
            location.reload();

        },
        error: function (erro) {
            console.error("Erro na requisição AJAX:", erro);
            // TRATAR O ERRO
        }
    });
}

function editarProduto(event) {
    // Obter o elemento mais próximo com a classe pegar_id_produto
    var linha = event.target.closest('tr');

    // VERIFICAR QUE A LINHA ENCONTRADA NÃO É UNDEFINED
    if (!linha) {
        console.error("Linha não encontrada.");
        return;
    }

    // OBTER O idProduto DO CONTEÚDO DA CÉLULA
    var idProduto = linha.querySelector('.pegar_id_produto').textContent;

    // VERIFICAR SE O idProduto FOI OBTIDO CORRETAMENTE
    if (!idProduto || idProduto === '0' || idProduto === 'undefined') {
        console.error("ID do produto não encontrado ou inválido. Conteúdo da linha:", linha.innerHTML);
        return;
    }

    // PREENCHER O MODAL COM OS DADOS
    document.getElementById('editIdProduto').value = idProduto;
    document.getElementById('nova_imagem').value = '';
    document.getElementById('editTitulo').value = linha.querySelector('.pegar_titulo_produto').textContent;
    document.getElementById('editDescricao').value = linha.querySelector('.pegar_descricao_produto').textContent;

    // ABRIR O MODAL
    document.getElementById('modalEditar').style.display = 'block';
}

/* ADICIONANDO UM NOVO PRODUTO */
/* MODAL PARA ADICIONAR UM NOVO PRODUTO */
function exibirModalNovoProduto() {
    document.getElementById('modalNovoProduto').style.display = 'block';
}

function fecharModalNovoProduto() {
    document.getElementById('modalNovoProduto').style.display = 'none';
}

/* FUNÇÃO PARA OS DADOS DO NOVO PRODUTO */
function salvarNovoProduto() {
    // OBTER OS DADOS DO MODAL
    var novaImagemInput = document.getElementById('up_imagem');
    var novaImagem = novaImagemInput.files[0];
    var titulo = document.getElementById('novoTitulo').value;
    var descricao = document.getElementById('novoDescricao').value;

    // CRIAR UM OBJETO FORMDATA PARA ENVIAR A IMAGEM
    var formData = new FormData();
    formData.append('up_imagem', novaImagem); // Adicione a imagem ao FormData
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);

    // FAZER A REQUISIÇÃO AJAX USANDO O OBJETO FORMDATA
    $.ajax({
        url: '../acesso_produtos/adicionar_produto.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (resposta) {
            console.log("Resposta do servidor:", resposta);

            // FECHAR O MODAL
            fecharModalNovoProduto();

            // ATUALIZAR A PÁGINA APÓS FECHAR O MODAL
            location.reload();
        },
        error: function (erro) {
            console.error("Erro na requisição AJAX:", erro);
            // TRATAR O ERRO
        }
    });
}

// Função para abrir o modal de confirmação
function abrirModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'block';
}

// Função para fechar o modal de confirmação
function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}

// Função para remover o produto
function removerProduto(idProduto) {
    // Exibir o modal de confirmação
    abrirModalConfirmacao();

    // Configurar a função de confirmação com o ID do produto
    document.getElementById('btnRemover').onclick = function() {
        confirmarRemocao(idProduto);
    };
}

// Função para confirmar a remoção
function confirmarRemocao(idProduto) {
    abrirModalConfirmacao();

    // Configuração da função de confirmação com o ID do produto
    document.getElementById('btnRemover').onclick = function() {
        $.ajax({
            url: 'remover_produto.php',
            type: 'POST',
            data: { idProduto: idProduto },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Produto removido com sucesso
                    alert(response.success);
                    // Recarregar a página
                    location.reload();
                } else if (response.error) {
                    // Erro ao remover o produto
                    alert(response.error);
                }
                // Fechar o modal de confirmação, independentemente do resultado
                fecharModalConfirmacao();
            },
            error: function() {
                // Tratar erros de requisição AJAX
                alert('Erro na requisição AJAX');
                // Fechar o modal de confirmação em caso de erro
                fecharModalConfirmacao();
            }
        });
    };
}

// Função para fechar o modal de confirmação
function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao').style.display = 'none';
}