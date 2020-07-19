var express = require('express');
var router=express.Router();

var CustomerController= require('../controllers/customer.controller');

var Authentication=require('../middleware/authentication.middleware');


router.post('/register',CustomerController.register);

//http://localhost:3000/customer/verifyEmail
router.post('/verifyEmail', CustomerController.verifyEmail);

router.post('/login', CustomerController.login);

router.post('/changePassword',Authentication.verifyToken,CustomerController.changePassword);

module.exports=router;










