const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

    firstName: {type:String, required: true,},
    lastName: {type: String, required:true},
    business_Name:{type: String, unique: true, required: true},
    image:{type:String,},
    DOB:{type: String, required: true}
    
});

module.exports = mongoose.model('vendor', vendorSchema);