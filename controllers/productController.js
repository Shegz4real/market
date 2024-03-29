const Prod = require('../models/products/productModel');

//@desc     to create new product
//@route    /vendors/addProduct
exports.createProduct = async (req, res)=>{

    const prod = new Prod(req.body);
    try{
        await prod.save();
        res.status(200).json(prod);
    }catch(err){
        res.status(500).json(err);
    }
    
}

//@desc ..... vendor and admin can delete product
//@route ..... /product/:productId

exports.deleteProduct = async (req, res)=>{

    try{
        await Prod.findByIdAndDelete(req.params.productId);
        res.status(200).json("sucesfully deleted");
    }catch(err){
        res.status(500).json(err);
    }
}

//@desc     to list all products of a given vendor
//@route    /vendors/products/:vendorID
exports.getVendorProducts = async(req, res)=>{

    try{
        const products = Prod.find({vendor_id: req.params.id});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err)
    }
    
}
//@desc ..... edit product info
//@route ..... /products/:productId

 exports.editProduct = async (req, res)=>{
    const product = Prod.findByIdAndUpdate(
        req.params.id, {
            $set : req.body,
        },{new : true});
    res.status(200).json(product)
 }

//@desc ..... product search and filter
//@route ...... product