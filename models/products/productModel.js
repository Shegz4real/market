const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    vendorId:{type:String, required:true},
    title: {type:String, required:true},
    category: {type: Array, required: true},
    img: {type:String, required:true},
    desc:{type: String, required:true},
    quantity: String,
    date: Date.time,
    price: String
    
});

const Products = mongoose.model('products', productSchema);
module.exports = Products;