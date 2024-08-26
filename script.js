
function navigateTo(href) {
  window.location.hash = href;
}

document.addEventListener('DOMContentLoaded', function(){
  selectCategory('')
})




//----------------------------------------------------------------------------------

function displayProducts(products) {
  let productSection = document.querySelector('.products-section');
  let searchBar = document.querySelector('#barra-pesquisa')







  productSection.innerHTML = ''; 
  
  products.forEach(product => {
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
function selectCategory(category) {
  fetchProductsByCategory(category || '');
}


async function fetchProductsByCategory(category) {
  let url;
  if (category) {

    let encodedCategory = encodeURIComponent(category);
    url = `https://fakestoreapi.com/products/category/${encodedCategory}`;
  } else {

    url = 'https://fakestoreapi.com/products';
  }

  try {
    let response = await fetch(url);
    let products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}



//---------------------------------------------------------------------------------
function getInfoProduct(){
  event.preventDefault()

  const produto = document.querySelector('')
}



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

function cadastrese(){
  event.preventDefault()
  let login_register = document.querySelector('.login-register')
  let login = document.querySelector('.login')
  login_register.classList.toggle('active')
  login.classList.toggle('active')
  
}

function login(){
  event.preventDefault()
  let login_register = document.querySelector('.login-register')
  let login = document.querySelector('.login')
  let sombra = document.querySelector('.sombra');

  login_register.classList.add('active')
  login_register.classList.toggle('active')

  login.classList.toggle('active')

  
  if (login.classList.contains('active')) {
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


function atualizarCarrinho() {
  let itens_section = document.querySelector('.itens-carrinho');
  itens_section.innerHTML = '';

  itens.forEach(produto => {
    const itensHTML = `
      <div class="item-carrinho">
        <img src="${produto.image}" alt="">
        <input type="checkbox">
        <h2 class="titulo">${produto.title}</h2>
        <p class="price">Preço: ${produto.price}</p>
        <p class="quantidade">Quantidade: ${produto.quantidade}</p>
        <span onclick="removerProduto(${produto.id})"><i class="fa-solid fa-x"></i></span>
      </div>
    `;
    itens_section.innerHTML += itensHTML;
  });
}
function removerProduto(produtoId) {

  itens = itens.filter(produto => 
    produto.id !== produtoId);


  atualizarCarrinho();
}

function addCarrinho(produtoId) {
  event.preventDefault();

  async function fetchProduto(url) {
    let data = await fetch(url);
    let produto = await data.json();


    let produtoExistente = itens.find(item => item.id === produtoId);

    if (produtoExistente) {
 
      produtoExistente.quantidade++;
    } else {
  
      produto.quantidade = 1; 
      itens.push(produto);
    }

 
    itens = itens.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.id === item.id
      ))
    );

    teste();
    atualizarCarrinho();
  }

  fetchProduto(`https://fakestoreapi.com/products/${produtoId}`);
}

