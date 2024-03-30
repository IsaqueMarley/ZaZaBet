// VERIFICA SE A PÁGINA ATUAL É DO CARRINHO E LOGO EM SEGUIDA EXECUTA A FUNÇÃO updateCartDisplay()
if (window.location.pathname === '/carrinho.php') {
  updateCartDisplay();
}

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

/* SETAS INTERATIVAS */
const setaBaixo = document.getElementById("seta-baixo");
const produtosDinamico = document.querySelector(".titulo-produtos");

setaBaixo.addEventListener('click', () => {
  produtosDinamico.scrollIntoView({ behavior: 'smooth' });
});

/* EXIBIR MENU SUSPENSO DOS PRODUTOS */
const produtos = document.querySelectorAll(".produto");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductName = document.getElementById("modal-product-name");
const modalProductDescription = document.getElementById("modal-product-description");
const modalProductPrice = document.getElementById("modal-product-price");

produtos.forEach((produto) => {
    produto.addEventListener("click", () => {
        // PEGAR AS INFORMAÇÕES DOS PRODUTOS
        const productName = produto.querySelector(".pegar_titulo_produto").textContent;
        const productImage = produto.querySelector(".pegar_imagem_produto").getAttribute("src");
        const productDescription = produto.querySelector(".pegar_descricao_produto").textContent;
        const productPrice = produto.querySelector(".pegar_preco_produto").textContent;

        // PREENCHER O MODAL COM AS INFORMAÇÕES DOS PRODUTOS
        modalProductName.textContent = productName;
        modalProductImage.setAttribute("src", productImage);
        modalProductDescription.textContent = productDescription;
        modalProductPrice.textContent = productPrice;

        modal.style.display = "block";

        /* FECHAR O MENU AO CLICAR FORA DELE */
        document.addEventListener("click", closeOnClickOutside);
    });
});

/* FUNÇÃO PARA FECHAR O MENU AO CLICAR FORA DELE */
function closeOnClickOutside(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.removeEventListener("click", closeOnClickOutside);
    }
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

  // Atualizar a visualização do carrinho
  updateCartDisplay();
}

// SELETORES DOS BOTÕES "ADICIONAR AO CARRINHO" NA PÁGINA INICIAL
const addToCartButtonsOnHomepage = document.querySelectorAll('.add-carrinho-homepage');

// Adicionar evento de clique a cada botão na página inicial
addToCartButtonsOnHomepage.forEach(button => {
  button.addEventListener('click', addProductToCart);
});