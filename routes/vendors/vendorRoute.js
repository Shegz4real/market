const express = require("express");
const router = express.Router();


router.get('/', (req, res)=>{
    if(req.session.vendor){
        res.send('vendor dashboard');
    }else{
        res.redirect('/');
    }
});
module.exports = router;

