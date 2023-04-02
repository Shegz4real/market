const express = require('express');
const userController = require('../../controllers/userController')
const router = express.Router();


router.get('/', (req, res)=>{
    res.send("this is the user route");
});

router.get('/:id', userController.getProfileInfo);

module.exports = router;

