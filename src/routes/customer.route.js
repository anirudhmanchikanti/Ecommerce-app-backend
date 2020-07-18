var express = require('express');
var router=express.Router();

var CustomerController= require('../controllers/customer.controller');


router.post('/register',CustomerController.register);

module.exports=router;










