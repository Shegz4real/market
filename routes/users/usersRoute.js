const express = require('express');
const {getProfileInfo }= require('../../controllers/userController');
const {verifyTokenAndAuthorization} = require('../../controllers/verify')
const router = express.Router();



router.get('/:id', verifyTokenAndAuthorization ,getProfileInfo);

module.exports = router;

