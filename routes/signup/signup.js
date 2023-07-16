const express = require("express");
const  router = express.Router();
const {createUser} = require("../../controllers/userController");
const venController = require("../../controllers/venController");

//@desc     user signup route
router.get('/', (req, res)=>{
    if(req.session.authorized){
       res.redirect('/logout'); 
    }else{
        res.send(`this is the signup page`);
    }
    
});

router.post('/', createUser);

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