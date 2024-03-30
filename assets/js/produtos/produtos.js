// Verifica se a página atual é a página do carrinho e, em seguida, chama a função updateCartDisplay
if (window.location.pathname === '/carrinho.php') {
    updateCartDisplay();
}

/* PÁGINA DE PRODUTOS - BARRA DE PESQUISA */
function search() {
    /* OBTER O VALOR INSERIDO NA BARRA DE PESQUISA */
    let searchTerm = document.getElementById('searchbar').value.toLowerCase();
    let produtos = document.querySelectorAll(".produto");
    let resultadosEncontrados = false;

    /* LOOP ATRAVÉS DE TODOS OS PRODUTOS */
    produtos.forEach(function (produto) {
        let titulo = produto.querySelector("h2").textContent.toLowerCase();
        let descricao = produto.querySelector("p").textContent.toLocaleLowerCase();

        /* VERIFICAR SE O TÍTULO OU DESCRIÇÃO CONTÉM A PESQUISA */
        if (searchTerm === " " || titulo.includes(searchTerm) || descricao.includes(searchTerm)) {
            // EXIBIR OS PRODUTOS
            produto.style.display = "block";
        } else {
            produto.style.display = "none"; // OCULTAR OS PRODUTOS
        }
    });

    /* VERIFICAR SE NÃO HÁ PRODUTOS VISÍVEIS E EXIBIR UMA MENSAGEM ADEQUADA */
    let produtosVisiveis = document.querySelectorAll(".produto[style='display: block;']");
    let mensagem = document.getElementById("mensagem");

    if (produtosVisiveis.length === 0) {
        mensagem.style.display = "block";
    } else {
        mensagem.style.display = "none";
    }
};

/* IMPEDIR O RECARREGAMENTO DA PÁGINA */
document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    search();
});
/* FIM DA BARRA DE PESQUISA DE PRODUTOS */

/* RESPONSIVIDADE DO MENU LATERAL */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const menuIcon = document.querySelector("#menuIcon");
    const closeIcon = document.querySelector("#closeIcon");

    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show");
        menuIcon.style.display = sidebar.classList.contains("show") ? "none" : "block";
        closeIcon.style.display = sidebar.classList.contains("show") ? "block" : "none";
    });
});

/* CONTATOS INTERATIVOS */
const contatos = document.getElementById('contatos');
const footer = document.getElementById('footer');

contatos.addEventListener('click', () => {
    footer.scrollIntoView({ behavior: 'smooth' });
});

/* CONTATOS INTERATIVOS NA RESPOSIVIDADE */
const contatosResp = document.getElementById('contatos-resp');

contatosResp.addEventListener("click", function () {
    footer.scrollIntoView({ behavior: 'smooth' }); // ROLA A PÁGINA ATÉ O FOOTER
    // FECHA O MENU LATERAL QUANDO CARREGA ATÉ O FOOTER
    sidebar.classList.toggle("show");
    menuIcon.style.display = sidebar.classList.contains("show") ? "none" : "block";
    closeIcon.style.display = sidebar.classList.contains("show") ? "block" : "none";
});

/* EXIBIR MENU SUSPENSO DOS PRODUTOS */
const produtos = document.querySelectorAll(".produto");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductName = document.getElementById("modal-product-name");
const modalProductDescription = document.getElementById("modal-product-description");
const modalProductPrice = document.getElementById("modal-product-price");
const closeWhenAdd = document.querySelector(".add-carrinho")

produtos.forEach((produto) => {
    produto.addEventListener("click", () => {
        // PEGAR AS INFORMAÇÕES DOS PRODUTOS
        // const jogoMines = produto.querySelector("")
        // const productName = produto.querySelector(".pegar_titulo_produto").textContent;
        // const productImage = produto.querySelector(".pegar_imagem_produto").getAttribute("src");
        // const productDescription = produto.querySelector(".pegar_descricao_produto").textContent;
        // const productPrice = produto.querySelector(".pegar_preco_produto").textContent;

        // // PREENCHER O MODAL COM AS INFORMAÇÕES DOS PRODUTOS
        // modalProductName.textContent = productName;
        // modalProductImage.setAttribute("src", productImage);
        // modalProductDescription.textContent = productDescription;
        // modalProductPrice.textContent = productPrice;

        // modal.style.display = "block";

        // /* FECHAR O MENU AO CLICAR FORA DELE */
        // document.addEventListener("click", closeOnClickOutside);
        
     // Obter a URL da página HTML correspondente ao produto clicado
     const pageURL = produto.dataset.page;
        
     // Redirecionar para a página HTML
     window.location.href = pageURL;
         

    });
});

/* FUNÇÃO PARA FECHAR O MENU AO CLICAR FORA DELE */
function closeOnClickOutside(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.removeEventListener("click", closeOnClickOutside);
    }
}
function closeWhenAddProdToCart() {
    modal.style.display = "none";
    document.removeEventListener("click", closeWhenAddProdToCart);

}
/* FECHAR O MENU SUSPENSO CLICANDO NO X */
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

/* CARRINHO */
/* SELETORES DOS BOTÕES DO CARRINHO */
const addToCartButtons = document.querySelectorAll('.add-carrinho');
/* INSERINDO OS PRODUTOS NO ARRAY */
const cart = JSON.parse(localStorage.getItem('cart')) || [];

for (const button of addToCartButtons) {
  button.addEventListener('click', addProductToCart);
}

// FUNÇÃO PARA ADICIONAR OS PRODUTOS AO CARRINHO
function addProductToCart() {
    const productImage = document.querySelector("#modal-product-image").getAttribute("src");
    const productName = document.querySelector("#modal-product-name").textContent;
    const productPrice = document.querySelector("#modal-product-price").textContent;
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = -1;
  
    // Verificar se o produto já está no carrinho
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === productName) {
        productIndex = i;
        break;
      }
    }
  
    if (productIndex !== -1) {
      // Se o produto já estiver no carrinho, atualizar a quantidade
      cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
    } else {
      // Se o produto não estiver no carrinho, adicioná-lo
      const product = {
        image: productImage,
        name: productName,
        price: productPrice,
        quantity: 1,
      };
      cart.push(product);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // FECHAR O MODAL
    document.querySelector('.modal').style.display = 'none';
  
    // ATUALIZAR A VISUALIZAÇÃO DO CARRINHO
    updateCartDisplay();
  }
  
  // SELETOR DO BOTÃO DE ADICIONAR AO CARRINHO
  const addToCartButtonInModal = document.querySelector('.add-carrinho');
  addToCartButtonInModal.addEventListener('click', addProductToCart);
  