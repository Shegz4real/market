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
    res.send({data:user});;
}

//@desc     user signup controller
//@route    /signup
exports.createUser = async(req, res)=>{
    
    try{

        const user = new User(req.body);
        user.password = hash.hashPassword(req.body.password)
       
        //prevent user from signing in with an email already existing on the database
        const val = await userExist(user.email);

        if(!val){
            await user.save();
            req.session.user = user; 
            req.session.authorized = true;
            res.redirect("/");
            
        }else{
            res.status(200).redirect('/login');
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
        !user &&  res.status(401).json('wrong credentials');//verify if user is returning a null value
        
        const isValidPassword = bcrypt.compareSync(password, user.password);
        //const {password2, ...others} = user; OTHERS MEANS ANY OTHER ITEM SAVE THE PASSWORD
         
        !user && res.status(200).redirect('/login');  
        !isValidPassword && res.status(401).redirect('/login');
        
        req.session.user = user; 
        req.session.authorized = true;

        //using jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, 
        {expiresIn:"3d"}  );
        console.log(accessToken);
        res.redirect('/');
        

    }catch(err){
        console.log(err);
    }

} 

//@desc  get items tp be displayed on the user profilePage
//@desc  /users/profile

exports.getProfileInfo = async(req, res)=>{
    
    const session_id = req.session.user._id;
    
    try{
        
        if(!req.session.authorized){    //validate if the user is signed in
            res.redirect('/login')
        }
        
        const user =  await User.findById(session_id);//pass the user id to pull out info
        console.log(user.name);
        res.send(`name: ${user.name} \n email: ${user.email}`);
                
                
    }catch(err){
        console.log(err);
    }
}