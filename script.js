
function navigateTo(href) {
  window.location.hash = href;
}

//----------------------------------------------------------------------------------
//consumo da api e criação de produtos no HTML
document.addEventListener('DOMContentLoaded', function () {
  let productSection = document.querySelector('.products-section');


  async function fetchProdutos(url) {
    let data = await fetch(url);
    let response = await data.json();

    console.log(response);

    response.forEach(product => {
      const rating = product.rating.rate;

      const productHtml = `
        <div class="product">
          <div class="imagem-container">
            <img src="${product.image}" alt="Category Image">
          </div>
          <div class="info-product">
            <h1 class="titulo">${product.title}</h1>
            <div class="stars" data-rating="${rating}">
              <span class="star" data-value="1"><i class="fa-solid fa-star"></i></span>
              <span class="star" data-value="2"><i class="fa-solid fa-star"></i></span>
              <span class="star" data-value="3"><i class="fa-solid fa-star"></i></span>
              <span class="star" data-value="4"><i class="fa-solid fa-star"></i></span>
              <span class="star" data-value="5"><i class="fa-solid fa-star"></i></span>
              <span class="nota">${product.rating.rate}</span>
            </div>
            <p>${product.rating.count} Avaliações</p>
            <p class="preco">R$${product.price}</p>
            <button onclick="addCarrinho(${product.id})"><img src="img/icons8-carrinho-48 (3).png"></button>
          </div>
        </div>
      `;

      productSection.innerHTML += productHtml;

      const stars = productSection.querySelector(`.product:last-child .stars`);
      const starElements = stars.querySelectorAll('.star');

      starElements.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));

        if (value <= rating) {
          star.classList.remove('starGray');
        } else {
          star.classList.add('starGray');
        }
      });
    });
  }

  fetchProdutos('https://fakestoreapi.com/products');
});




//----------------------------------------------------------------------------------
//Abrir perfil e carrinho
function acao() {
  event.preventDefault()
  let janela = document.querySelector('.janela-carrinho');
  let sombra = document.querySelector('.sombra');


   janela.classList.toggle('active')

 

  if (sombra.style.display === 'none' || sombra.style.display === '') {
 
    sombra.style.display = 'block'; 
 

  } else {
    sombra.style.display = 'none';
  
  }
     
}

function abrirPerfil(){
  event.preventDefault()
  let login_register = document.querySelector('.login-register')
  let sombra = document.querySelector('.sombra');

  login_register.classList.toggle('active')

  if (sombra.style.display === 'none' || sombra.style.display === '') {
    sombra.style.display = 'block'; 
  } else {
    
    sombra.style.display = 'none';
  }
}


//----------------------------------------------------------------------------------
//banner slider
let count = 1;

document.getElementById('item1').checked = true

setInterval(function(){
 nextImage()
},10000)

function nextImage(){
  count++
  if(count > 3){
    count = 1
  }

  document.getElementById('item'+ count).checked = true
}
//----------------------------------------------------------------------------------
//adicionar ao carrinho
let itens = []

let itensCheck = []

let no_item = document.querySelector('.no-item')
let containerItem = document.querySelector('.itens-carrinho')
let carrinhoButton = document.querySelector('.fechar-pedido')

function teste(){
  carrinhoButton.classList.toggle('active', itens.length > 0);
  containerItem.classList.toggle('active', itens.length > 0);

  no_item.classList.add('active', itens.length === 0);
}


function addCarrinho(produtoId) {
  event.preventDefault();

  let itens_section = document.querySelector('.itens-carrinho')
  async function fetchProduto(url) {


      let data = await fetch(url);
    
      let produto = await data.json();
      itens.push(produto);  
      itensCheck.push(produto)
      teste()
      console.log(itensCheck)
      console.log(itens);

      itens.forEach(produto =>{
        const itensHTML = `
            <div class="item-carrinho">

           <img src="${produto.image}" alt="">
           <input type="checkbox">
            <h2 class="titulo">${produto.title}</h2>
             <p class="price">Preço: ${produto.price}</p>
              <p class="quantidade">Quantidade: 10</p>
                <span><i class="fa-solid fa-x"></i></span>
          
         </div>
        `
        itens = []
        itens_section.innerHTML += itensHTML;
      })
   
  }

  fetchProduto(`https://fakestoreapi.com/products/${produtoId}`);
}