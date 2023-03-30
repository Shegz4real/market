const express = require("express");
const userController = require("../../controllers/userController");
const vendorController = require("../../controllers/venController");
const adminController = require('../../controllers/adminController')
const router = express.Router();

router.get('/', userController.loginUser);

module.exports = router;