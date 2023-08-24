const Admin = require("../models/admin/adminModel");



//@desc ..... create admin account
//@route ..... /admin

exports.createAdmin = async (req, res)=>{
    
    try{
        const admin = new Admin(req.body);
        await admin.save();
        res.status(200).json(admin);
    }catch(err){
        res.status(500).json(err);
    }


}

//@desc     landing for admin route. 
//@route    /admin

exports.loginAdmin = async(req, res)=>{
    const {username, password} = req.body;
    try{
        const admin = await Admin.findOne({username});
        !admin && res.status(401).json("usser does not exist");
        if(password != admin.password){
            res.status().json("wrong password")
        } 
    }catch(err){
        res.status(500).json(err)
  
    }
}