const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

        userid:{type:String, required:true},
        product:[{
            productId:{
                type: String,
                required: true
            },
            
            quantity:{
                type:Number,
                default:1
            },
            vendor:{
                type: String,
                required:true
            }
            
        }
    ],
    amount:{type: Number, required:true},
    address:{type:Object, required: true},
    status:{type: String, default: "pending"}
});

module.exports = mongoose.model('order', orderSchema);