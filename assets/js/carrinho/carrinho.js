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

/* FUNÇÃO PARA FECHAR O MENU AO CLICAR FORA DELE */
function closeOnClickOutside(event) {
  if (event.target === modal) {
      modal.style.display = "none";
      document.removeEventListener("click", closeOnClickOutside);
  }
}

/* CARRINHO FUNCIONAL */
document.addEventListener('DOMContentLoaded', function () {
  // ATUALIZAR A VISUALIZAÇÃO DO CARRINHO
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbodyCarrinho = document.querySelector('.tbody-carrinho');
    tbodyCarrinho.innerHTML = '';

    let totalAmount = 0;

    for (const product of cart) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><img src="${product.image}" alt="Imagem do Produto" class="cart-product-image"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <button class="quantity-button" data-action="decrease">-</button>
          <span class="product-quantity">${product.quantity || 1}</span>
          <button class="quantity-button" data-action="increase">+</button>
        </td>
        <td><button class="remove-product-button" onclick="removeProduct(event)">Remover</button></td>
      `;
      tbodyCarrinho.appendChild(newRow);

      // Update the total amount
      const price = parseFloat(product.price.replace('R$', '').replace(',', '.'));
      totalAmount += price * (product.quantity || 1);
    }

    // EVENTO DE CLICK PARA O BOTÃO DE REMOVER
    const removeCartProductButtons = document.querySelectorAll('.remove-product-button');
    for (const button of removeCartProductButtons) {
      button.addEventListener('click', removeProduct);
    }

    // ATUALIZAR O VALOR TOTAL
    updateTotal();

    // EVENTO DE CLIQUE PARA OS BOTÕES DE QUANTIDADE
    const quantityButtons = document.querySelectorAll('.quantity-button');
    quantityButtons.forEach(button => button.addEventListener('click', updateQuantity));
  }

  // REMOVER PRODUTOS DO CARRINHO
  function removeProduct(event) {
    const button = event.target;
    // VERIFICA QUAL O ELEMENTO PAI PARA REMOVER A LINHA RESPECTIVA 
    const productRow = button.closest('tr');

    // OBTER OS DADOS DO ARRAY INCLUÍDOS NA PÁGINA DE COMPRAS
    const rowIndex = Array.from(productRow.parentNode.children).indexOf(productRow);

    // REMOVER O PRODUTO DO ARRAY
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(rowIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    // REMOVER A LINHA DO CARRINHO
    productRow.remove();

    // ATUALIZAR VALOR TOTAL DO CARRINHO
    updateTotal();
  }

  // FUNÇÃO PARA ATUALIZAR O VALOR TOTAL DO CARRINHO
  function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = 0;
  
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const price = parseFloat(product.price.replace('R$', '').replace(',', '.'));
      const quantity = parseInt(document.querySelectorAll('.product-quantity')[i].textContent) || 1;
      totalAmount += price * quantity;
    }
  
    // ATUALIZAR O VALOR TOTAL EXIBIDO
    const totalAmountFormatted = totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.querySelector('.cart-total-container span').textContent = totalAmountFormatted;
  
    // Retornar o valor total para ser usado em outros lugares, se necessário
    return totalAmount;
  }

  // ATUALIAR O VALOR AO CARRINHO SER INICIADO
  updateCartDisplay();

  /* FINALIZAR COMPRA */
  function makePurchase() {
    // VALOR TOTAL DO CARRINHO
    const totalAmount = updateTotal();
  
    if (totalAmount === 0) {
      alert("Seu carrinho está vazio!");
    } else {
      let produtos = "Olá, quero os seguintes itens:\n";
      let subtotal = 0;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const quantity = parseInt(document.querySelectorAll('.product-quantity')[i].textContent) || 1;
        const itemTotal = parseFloat(product.price.replace('R$', '').replace(',', '.')) * quantity;
        subtotal += itemTotal;
  
        const item = `${i + 1} - ${product.name} - Valor: ${product.price} (Quantidade: ${quantity}) - Subtotal: ${itemTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
        produtos += item;
      }
  
      // ADICIONAR O VALOR TOTAL NO FINAL DA MENSAGEM
      produtos += `\nValor Total: ${subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  
      var mensagem = encodeURIComponent(produtos);
      var url = "https://wa.me/+5579988024400?text=" + mensagem;
  
      window.open(url, "_blank");
  
      // ATUALIZAR O VALOR TOTAL
      updateTotal();
    }
  }  

  // ADICIONAR EVENTO AO FINALIZAR A COMPRA
  const purchaseButton = document.querySelector('.purchase-button');
  if (purchaseButton) {
    purchaseButton.addEventListener('click', makePurchase);
  }

  /* ATUALIZAR O VALOR DE ACORDO COM A QUANTIDADE DE CADA PRODUTO */
  function updateQuantity(event) {
    const button = event.target;
    const action = button.dataset.action;
    const productRow = button.closest('tr');
    const quantityElement = productRow.querySelector('.product-quantity');
    let quantity = parseInt(quantityElement.textContent);
  
    if (action === 'increase') {
      quantity++;
    } else if (action === 'decrease' && quantity > 1) {
      quantity--;
    }
  
    quantityElement.textContent = quantity;
  
    // ATUALIZAR O VALOR TOTAL
    updateTotal();
  }
});