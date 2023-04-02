const express = require('express');
const adminController = require('../../controllers/adminController');
const userController = require('../../controllers/userController')
const router = express.Router();


router.post('/', adminController.loginAdmin)
router.get('/users', userController.findUser);

module.exports = router;
