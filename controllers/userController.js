const bodyParser = require("body-parser");
const User = require("../models/users/usersModel");

//function that stores the user id of the person currently logged in
var user_id;
 
//@desc    admin to view the list of users
//@route   admin/users/
exports.findUser = async(req, res)=>{
    const user = await User.find();
    res.send({data:user});;
}

//@desc     user signup controller
//@route    /signup
exports.createUser = async(req, res)=>{

    const user = new User(req.body);
    await user.save();
    res.cookie('email', req.body.email, {secure : false});// to be changed to email 
    res.send({data:user});
    
}

//@desc   for userlogin
//@route   /login

exports.loginUser = async(req, res)=>{

    const {email, password}  = req.body;
    
    try{
        const user = await User.findOne({email});
        
        if(!user){
            return res.redirect('/login');
        
        }
        if(password != user.password){
            return res.status(401).redirect('/login');
        }

        res.cookie('email', user.email);
        req.session.user = user;
        req.session.authorized = true;
         
        this.user_id = user.id;
        res.send('logged in');
        console.log(user_id);

    }catch(err){
        console.log(err);
    }

} 

//@desc  get items tp be displayed on the user profilePage
//@desc  /users/:id

exports.getProfileInfo = async(req, res)=>{
    
    const {name, email} = req.body;

    try{

        const user =  await User.findById(req.params.id);
        console.log(user.name);
        res.send(`name: ${user.name} \n email: ${user.email}`)

    }catch(err){
        console.log(err);
    }
}