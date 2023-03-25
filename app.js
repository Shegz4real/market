const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser= require('body-parser');
const port = 5000;
const app = express();

const connectDB = require('./models/connectDB');
const users = require(`./routes/users/usersRoute`);
const admin = require('./routes/admin/adminRoute');
const vendors = require('./routes/vendors/vendorRoute');
const logis = require('./routes/logis/logisRoute');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/users', users);
app.use('/admin', admin);
app.use('/vendor', vendors);
app.use('/logis', logis);

//CONNECT DATABASE
connectDB();

mongoose.connection.once('open', ()=>{
    console.log('connect to database');
    app.listen(port, ()=>{
        console.log(`server is listening on port ${port}`);
    });
});