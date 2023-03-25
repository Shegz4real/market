const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name: String,
    category: String,
    img: String,
    desc: String,
    quantity: String,
    date: Date.time,
    price: String
});

const Products = mongoose.model('products', productSchema);
module.exports = Products;