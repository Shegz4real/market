const Prod = require('../models/products/productModel');

var vend_id;

function getVendorID(id){
    id = this.vend_id;
}

//@desc     to create new product
//@route    /vendors/addProduct
exports.createProduct = async(req, res)=>{
    const prod = new Prod(req.body);
    prod.save
}

//@desc     to list all products of a given vendor
//@route    /vendors
exports.listProduct = async(req, res)=>{

}