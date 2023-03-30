const Admin = require("../models/admin/adminModel");


//@desc     landing for admin route. 
//@route    /admin
exports.loginAdmin = async(req, res)=>{
    
    res.redirect('/admin/dashboard')
}


