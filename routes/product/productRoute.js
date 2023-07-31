const { createProduct } = require('../../controllers/productController');
const { verifyTokenAndVendor } = require('../../controllers/verify');

const router = require('express').Router();

router.post('/', verifyTokenAndVendor, createProduct )
module.exports = router;