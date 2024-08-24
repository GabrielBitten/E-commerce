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
            <button><img src="img/icons8-carrinho-48 (3).png"></button>
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


function navigateTo(href) {
    window.location.hash = href;
}


async function fetchTotalProducts(url) {
  let totalProducts = 0;
  let page = 1;
  const pageSize = 20; // Ajuste de acordo com a paginação da API
  let hasMoreProducts = true;

  while (hasMoreProducts) {
      const response = await fetch(`${url}?limit=${pageSize}&page=${page}`);
      const data = await response.json();

      if (data.length === 0) {
          hasMoreProducts = false;
      } else {
          totalProducts += data.length;
          page++;
      }
  }

  console.log(`Total de produtos: ${totalProducts}`);
  return totalProducts;
}

fetchTotalProducts('https://fakestoreapi.com/products');
