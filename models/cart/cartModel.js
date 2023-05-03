const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

        userId:{type:String, requied:true},
        product:[
            {
                productId:{
                    type:String,
                    required:true
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }]
}, {timestamps:true});

module.exports = mongoose.model('Cart', cartSchema);