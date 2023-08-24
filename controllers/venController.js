const Vend = require("../models/vendors/vendorsModel");
const hash = require("./hasher");


//funtion to check if vendor already exist

async function vendorExists(email){
     
    try{
        const vend = await Vend.findOne({email});
        !vend && console.log('email can be used');
        return !!vend;

    }catch(e){
        console.log(e)
    }
}


//@desc     create a new vendor acct
//@route    /signup/vendor

exports.createVendor = async(req, res)=>{
    
    try{
        
        const vendor = new Vend(req.body);
        const val = await vendorExists(vendor.email);
        console.log(val);

        if(!val){
            vendor.password = hash.hashPassword(req.body.password);
            await vendor.save();
            req.session.user = vendor;
            req.session.authorized = true;
            res.redirect('/vendor');

        }else{

            res.send(`user already exists`);
        }   

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
        res.redirect(`/vendor/${vendor._id}`); // redirct to vendor dahboard


    }catch(err){
        console.log(err)
    }
}

//@desc display vendor dashboard
//@route = vendor/:id
exports.venDashboard = async(req, res)=>{

};

