/*
    users can:
        login
        signup
        search for items and available vendors
        rate vendor services
         
*/

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const hash = require(`./hasher`);
const User = require("../models/users/usersModel");


//function that verifies a user already exist
async function userExist(email){
    try{
        const user = await User.findOne({email});
        if(!user){
            console.log(`new EMAIL`);
        }
        return !!user;

    }catch(err){
    }
}

 
//@desc    admin to view the list of users
//@route   admin/users/
exports.findUser = async(req, res)=>{
    const user = await User.find();
    res.status(200).json({data:user});;
}

//@desc     user signup controller
//@route    /signup
exports.createUser = async(req, res)=>{
    
    try{

        const user = new User(req.body);
        user.password = hash.hashPassword(req.body.password)
       
        await user.save();
        req.session.user = user; 
        req.session.authorized = true;
        res.status(200).json(user);
          
    }catch(err){
        res.status(500).json(err);
    } 
}


//@desc   for userlogin
//@route   /login

exports.loginUser = async(req, res)=>{

    const {email, password}  = req.body;
    console.log(`${email}, ${password}`);
    
    try{

        const user = await User.findOne({email});
        !user &&  res.status(401).json('user does not exist');//verify if user is returning a null value
        const isValidPassword = bcrypt.compareSync(password, user.password);
        const {password2, ...others} = user._doc; //OTHERS MEANS ANY OTHER ITEM SAVE THE PASSWORD
        
        !isValidPassword && res.status(401).json('invalid password');
        
        req.session.user = user; 
        req.session.authorized = true;

        //using jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, 
        {expiresIn:"3d"}  );

        console.log(accessToken);
        res.status(200).json(...others, accessToken);
        

    }catch(err){
        res.status(500).json(err)
    }

} 

//@desc  get items tp be displayed on the user profilePage
//@desc  /users/profile

exports.getProfileInfo = async(req, res)=>{
    
    const session_id = req.session.user._id;
    
    try{
        
        if(!req.session.authorized){    //validate if the user is signed in
            res.status(405).json('not signed in')
        }
        
        const user =  await User.findById(session_id);//pass the user id to pull out info
        console.log(user.name);
        res.status(200).json(`name: ${user.name} \n email: ${user.email}`);
                
                
    }catch(err){
       req.status(500).json(err);
    }
}