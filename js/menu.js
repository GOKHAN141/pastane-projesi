// Menü ürünlerini products.json'dan çek ve ekrana bas
function loadMenu() {
    fetch('/products.json')
        .then(res => res.json())
        .then(products => {
            const container = document.getElementById('menu-container');
            container.innerHTML = ''; // önce temizle
            products.forEach(product => {
                const item = document.createElement('div');
                item.className = 'menu-item';
                item.innerHTML = `
                    <div class="menu-item-inner">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span>${product.price} TL</span>
                    </div>
                `;
                container.appendChild(item);
            });
        })
        .catch(err => console.error('Ürünler yüklenirken hata:', err));
}

// Sayfa yüklendiğinde menüyü yükle
window.addEventListener('DOMContentLoaded', loadMenu);
