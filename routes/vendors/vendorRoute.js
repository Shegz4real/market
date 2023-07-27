const express = require("express");
const {verifyTokenAndVendor}= require('../../controllers/verify');
const { getVendorProducts, createProduct } = require("../../controllers/productController");
const router = express.Router();




//router.get('/:id', venController.venProducts);

router.put('/products/add', verifyTokenAndVendor, createProduct);
router.get('/products/:id', getVendorProducts);

module.exports = router;