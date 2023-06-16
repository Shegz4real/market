 const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

    name: {type:String, required: true,},
    //lastName: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required: true},
    // business_Name:{type: String, unique: true, required: true},
    // image:{type:String },
    // DOB:{type: String, required: true},
    isAdmin:{type:Boolean, default:false}
    
});

module.exports = mongoose.model('vendor', vendorSchema);