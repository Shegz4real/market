exports.findUser = async(req, res)=>{
    const user = await URLSearchParams.find();
    res.send({data:users});;
}