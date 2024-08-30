
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


let productsArray = []; 

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
    productsArray = await response.json(); 


    
    displayProducts(productsArray); 
    console.log(productsArray)
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

//--------------------------------------------------------------------------------------
//local storage

function cadastrarUsuario(){
  let nome = document.getElementById('nome').value
  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value

  localStorage.setItem('nomeUsuario',nome)
  localStorage.setItem('emailUsuario',email)
  localStorage.setItem('senhaUsuario',senha)
}

function logarUsuario(){
   event.preventDefault()
  
  
  let email = document.getElementById('emailLogin').value;
  let senha = document.getElementById('senhaLogin').value;
  
  let cadastrarProdutoButton = document.getElementById('cadastrar-produto')

  let emailSalvo = localStorage.getItem('emailUsuario');
  let senhaSalva = localStorage.getItem('senhaUsuario');

  let login = document.querySelector('.login')
  let sombra = document.querySelector('.sombra');

  if(email === emailSalvo && senha === senhaSalva){
    alert("Login bem-sucedido");
    
    login.classList.toggle('active')
    cadastrarProdutoButton.classList.toggle('active')
    
    if (login.classList.contains('active')) {
      sombra.style.display = 'block'; 
    } else {
      
      sombra.style.display = 'none';
    }
    
  } else {
    alert("Email ou senha incorretos");
  }
}

//--------------------------------------------------------------------------
//cadastro de produtos



function abrirCadastroProduto(){
  event.preventDefault()
  let cadastroContainer = document.querySelector('.cadastro-produto-form')

  cadastroContainer.classList.toggle('active')
}



function salvarCategoria(category){
  event.preventDefault()
  categoriaSelecionada = category

}
function cadastrarProduto(event){
event.preventDefault()
let nomeProduto = document.getElementById('nomeProduto').value
let valorProduto = document.getElementById('valor').value
let imagemProduto = document.getElementById('imagem').files[0]

localStorage.setItem('nomeProduto', nomeProduto)
localStorage.setItem('valorProduto', valorProduto)
localStorage.setItem('imagemProduto', imagemProduto)


let cadastroContainer = document.querySelector('.cadastro-produto-form')



const produto ={
  id : Date.now(),
  title : nomeProduto,
  price : valorProduto,
  description : 'Sem descrição',
  category : categoriaSelecionada,
  image : imagemProduto ? URL.createObjectURL(imagemProduto) : '',
  rating: {
    "rate": 0,
    "count": 0
  }
}
productsArray.push(produto)
const imgContainer = document.getElementById('img-container');
imgContainer.src = produto.image;


console.log('Produto cadastrado:', produto);




cadastroContainer.classList.toggle('active')
}


let productImg = document.getElementById('img-container')
let imgInput = document.getElementById('imagem')

imgInput.onchange = function(){
  productImg.src = URL.createObjectURL(imgInput.files[0])
  productImg.style.display = 'block'
}