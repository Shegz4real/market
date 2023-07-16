const express = require('express');
const adminController = require('../../controllers/adminController');
const {getUsers} = require('../../controllers/userController')
const router = express.Router();


router.post('/', adminController.loginAdmin)
router.get('/users', getUsers);

module.exports = router;
