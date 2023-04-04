const express = require("express");
const  router = express.Router();
const userConntroller = require("../../controllers/userController");
const venController = require("../../controllers/venController");

//@desc     user signup route
router.get('/', (req, res)=>{
    if(req.session.authorized){
       res.redirect('/logout'); 
    }
    res.send(`this is the signup page`);
});
router.post('/',userConntroller.createUser);

//@desc     vendor signup route
router.get('/vendor', (req, res)=>{
    res.send("vendor signup");
});
router.post('/vendor', venController.createVendor);

//@desc     logistics signup route
router.get('/logis', (req, res)=>{
    res.send('logistics agency signup');
});   

module.exports = router;