let products = [];

fetch('../products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts();
  })
  .catch(err => console.log(err));

function displayProducts() {
  const container = document.getElementById('admin-products');
  container.innerHTML = '';
  products.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span>${item.price}</span>
          <button onclick="deleteProduct(${index})">Sil</button>
      `;
      container.appendChild(div);
  });
  updateMenuPage();
}

document.getElementById('product-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value || 'images/placeholder.jpg';

  products.push({ name, description, price, image });
  displayProducts();
  document.getElementById('product-form').reset();
});

function deleteProduct(index) {
  products.splice(index, 1);
  displayProducts();
}

// Menü sayfasını güncelle
function updateMenuPage() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;
  menuContainer.innerHTML = '';
  products.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="200">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>${item.price}</span>
    `;
    menuContainer.appendChild(card);
  });
}
