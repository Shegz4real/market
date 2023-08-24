const express = require("express");
const {verifyTokenAndVendor}= require('../../controllers/verify');
const { getVendorProducts, createProduct } = require("../../controllers/productController");
const router = express.Router();




//router.get('/:id', venController.venProducts);
router.get('/products/:vendor_id', verifyTokenAndVendor, getVendorProducts)
router.put('/products/:id', verifyTokenAndVendor, updateProduct);
router.delete('/products/:id')

module.exports = router;