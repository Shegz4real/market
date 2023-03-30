const express = require("express");
const  router = express.Router();
const userConntroller = require("../../controllers/userController");
const venController = require("../../controllers/venController");

router.get('/', (req, res)=>{
    res.send(`this is the signup page`);
});
router.post('/',userConntroller.createUser);
//router.get('/', venController.createVendor);

module.exports = router;