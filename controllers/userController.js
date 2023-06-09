/*
    users can:
        login
        signup
        search for items and available vendors
        rate vendor services
         
*/

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/users/usersModel");

//hashing passwords with bcrypt
function hashPassword(password){
    const saltRoudnds = 10;
    return bcrypt.hashSync(password, saltRoudnds);
}
 
//function that verifies a user already exist
async function userExist(email){
    try{
        const user = await User.findOne({email});
        if(!user){
            console.log(`user dosent exist`)
        }
        return !!user;

    }catch(err){
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
       
        //prevent user from signing in with an email already existing on the database
        const val = await userExist(user.email);
        
        if(val){
            res.status(200).redirect('/login');
        }else{
            
            await user.save();
            req.session.user = user; 
            req.session.authorized = true;
            res.redirect("/");
        }

            
       
    }catch(err){
        console.log(err);
    } 
}


//@desc   for userlogin
//@route   /login

exports.loginUser = async(req, res)=>{

    const {email, password}  = req.body;
    console.log(`${email}, ${password}`);
    
    try{

        const user = await User.findOne({email});

        if (!user){//verify if user is returning a null value
            return res.status(200).redirect('/login');
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        const {password2, ...others} = user; //OTHERS MEANS ANY OTHER ITEM SAVE THE PASSWORD
        

        !user && res.status(200).redirect('/login');

        !isValidPassword && res.status(401).redirect('/login');
        
        req.session.user = user; 
        req.session.authorized = true;

        //using jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, {expiresIn:"3d"});
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