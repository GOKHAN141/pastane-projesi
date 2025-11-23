const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON ve form verilerini alabilmek için
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaları sun
app.use(express.static(__dirname));

// Ürünleri listeleme
app.get('/products.json', (req, res) => {
    const products = JSON.parse(fs.readFileSync('products.json'));
    res.json(products);
});

// Ürün ekleme
app.post('/add-product', (req, res) => {
    const { name, description, price, image } = req.body;
    if(!name || !description || !price || !image){
        return res.json({ success: false, message: 'Tüm alanlar gerekli!' });
    }
    const products = JSON.parse(fs.readFileSync('products.json'));
    if(products.some(p => p.name === name)){
        return res.json({ success: false, message: 'Bu ürün zaten var!' });
    }
    products.push({ name, description, price, image });
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    res.json({ success: true });
});

// Ürün silme
app.post('/delete-product', (req, res) => {
    const { name } = req.body;
    let products = JSON.parse(fs.readFileSync('products.json'));
    products = products.filter(p => p.name !== name);
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    res.json({ success: true });
});

// HTML sayfaları
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/menu.html', (req, res) => res.sendFile(path.join(__dirname, 'menu.html')));
app.get('/about.html', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/gallery.html', (req, res) => res.sendFile(path.join(__dirname, 'gallery.html')));
app.get('/admin-panel.html', (req, res) => res.sendFile(path.join(__dirname, 'admin-panel.html')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
