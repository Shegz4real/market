const express = require("express");
const userController = require("../../controllers/userController");
const vendorController = require("../../controllers/venController");
const adminController = require('../../controllers/adminController')
const router = express.Router();

router.get('/', (req, res)=>{
    if(req.session.authorized){
        res.redirect('/');
    }else{
        res.send('login page');
    }
});

//user login
router.post('/', userController.loginUser);

//@desc vendor login
router.get('/vendor', (req, res)=>{

    res.send('vendor login');

});
router.post('/vendor', vendorController.loginVendor)

module.exports = router;