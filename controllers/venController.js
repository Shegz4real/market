const Vend = require("../models/vendors/vendorsModel");

var vend_id;

function getId(id){
    this.vend_id = id;
    return id;
}
exports.createVendor = async(req, res)=>{
    const vend = new Vend(req.body);
    vend.save();
}