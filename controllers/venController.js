const Vend = require("../models/vendors/vendorsModel");
const bcrypt = require("bcrypt");
const hasher = require("userController");



//@desc     create a new vendor acct
//@route    /signup/vendor

exports.createVendor = async(req, res)=>{
    
    try{
        
        const vendor = new Vend(req.body);
        vendor.password = hasher.hashedPassword(req.body.password);
        await vendor.save();
        

    }catch(err){
        console.log(err);
    }
        

}

//@desc     login vendor
//@route    /login/vendor

exports.loginVendor = async(req, res)=>{
    
    const {email, password} = req.body;
    try{
        const vendor = await Vend.findOne({email});

        if(!vendor){
            res.redirect('/login/vendor');
        }
        if(password != vendor.password){
            res.redirect('/login/vendor');
        }
        req.session.vendor = vendor;
        req.session.authorized = true;
        res.redirect('/vendor');


    }catch(err){
        console.log(err)
    }
}