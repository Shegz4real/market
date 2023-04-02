const express = require("express");
const userController = require("../../controllers/userController");
const vendorController = require("../../controllers/venController");
const adminController = require('../../controllers/adminController')
const router = express.Router();

router.get('/', (req, res)=>{
    // if(req.session.authorized){
    //     res.redirect('/');
    // }
    res.send('login');
});

//user login
router.post('/', userController.loginUser);

module.exports = router;