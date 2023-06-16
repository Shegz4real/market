const express = require("express");
const venController = require('../../controllers/venController')
const router = express.Router();


router.get('/', (req, res)=>{
    if(req.session.user){
        res.send('vendor dashboard');
    }else{
        res.redirect('/');
    }
});


router.get('/:id/products', venController.venProducts);

router.get('/:id/products/add', (req, res)=>{
    res.send(`this is the list of your products`);
})

router.put('/products/add', venController.addItem);

module.exports = router;