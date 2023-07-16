const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const session = require('express-session');
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const connectDB = require('./models/connectDB');

//route dir
const users = require(`./routes/users/usersRoute`);
const admin = require('./routes/admin/adminRoute');
const vendors = require('./routes/vendors/vendorRoute');
const logis = require('./routes/logis/logisRoute');
const signup = require('./routes/signup/signup');
const login = require('./routes/login/login');
const logout = require('./routes/logout/logout');
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/signup', signup);
app.use('/login', login);
app.use('/users', users);
app.use('/admin', admin);
app.use('/vendor', vendors);
app.use('/logis', logis);
app.use('/logout', logout)


app.get('/', (req, res)=>{
    res.send('market');
});

//CONNECT DATABASE 
connectDB();

mongoose.connection.once('open', ()=>{
    console.log('connect to database');
    app.listen(process.env.PORT, ()=>{
        console.log(`server is listening on port ${process.env.PORT}`);
    });
});

  