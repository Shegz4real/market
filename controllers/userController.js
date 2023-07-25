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



 
//@desc    admin to view the list of users
//@route   admin/users/
exports.getUsers = async(req, res)=>{
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
        res.status(200).json(user);
          
    }catch(err){
        res.status(500).json(err);
    } 
}


//@desc   for userlogin
//@route   /login

exports.loginUser = async(req, res)=>{

    
    try{

        const user = await User.findOne({email:req.body.email});
        !user &&  res.status(401).json('user does not exist');//verify if user is returning a null value

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        !isValidPassword && res.status(401).json('invalid password');

        const {password, ...others} = user._doc; //OTHERS MEANS ANY OTHER ITEM SAVE THE PASSWORD
       
        //using jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, 

        {expiresIn:"20m"} );

        console.log(accessToken);
        res.status(200).json({...others, accessToken});
        

    }catch(err){
        res.status(500).json(err)
    }

} 

//@desc  get items tp be displayed on the user profilePage
//@desc  /users/profile

exports.getProfileInfo = async(req, res)=>{
      
    try{     

        const user =  await User.findById(req.params.id);//pass the user id to pull out info
        !user && req.status(401).json('user not found'); 
        const {pasword:password, ...others} = user._doc;
        res.status(200).json({...others});
                            
    }catch(err){
       res.status(500).json(err);
    }
}