const bcrypt = require("bcrypt");
const User = require("../models/users/usersModel");


function hashPassword(password){
    const saltRoudnds = 10;
    return bcrypt.hashSync(password, saltRoudnds);
}
 
//function that verifies a user already exist
async function userExist(email){

    try{
        const user = await User.findOne({email});
        console.log(user);
        return !!user;
    }catch(err){

        console.log(err);
        return false;
    }
}

 
//@desc    admin to view the list of users
//@route   admin/users/
exports.findUser = async(req, res)=>{
    const user = await User.find();
    res.send({data:user});;
}

//@desc     user signup controller
//@route    /signup
exports.createUser = async(req, res)=>{
    
    try{

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword(req.body.password)
        });
        console.log(userExist(user.email));

        await user.save();
        req.session.user = user;
        req.session.authorized = true;
        res.send({data:user});
       
    }catch(err){
        console.log(err);
    }
        
   
    
}

//@desc   for userlogin
//@route   /login

exports.loginUser = async(req, res)=>{

    const {email, password}  = req.body;
    
    
    try{
        const user = await User.findOne({email});
        const isValidPassword = bcrypt.compareSync(password, user.password);
        console.log(isValidPassword);

        if(!user){
            return res.redirect('/login');
        
        }
        if(!isValidPassword){
            return res.status(401).redirect('/login');
        }

        req.session.user = user; 
        req.session.authorized = true;
        res.redirect('/');
        

    }catch(err){
        console.log(err);
    }

} 

//@desc  get items tp be displayed on the user profilePage
//@desc  /users/profile

exports.getProfileInfo = async(req, res)=>{
    
    try{
        
        if(!req.session.authorized){    //validate if the user is signed in
            res.redirect('/login')
        }
        
        const user =  await User.findById(req.session.user._id);//pass the user id to pull out info
        console.log(user.name);
        res.send(`name: ${user.name} \n email: ${user.email}`);
                
                
    }catch(err){
        console.log(err);
    }
}