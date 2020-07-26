var express = require('express');
var router=express.Router();

var CustomerController= require('../controllers/customer.controller');

var Authentication=require('../middleware/authentication.middleware');


router.post('/register',CustomerController.register);

//http://localhost:3000/customer/verifyEmail
router.post('/verifyEmail', CustomerController.verifyEmail);

router.post('/login', CustomerController.login);

router.post('/changePassword',Authentication.verifyToken,CustomerController.changePassword);

router.get('/listProducts',CustomerController.listProducts);

router.get('/getProduct/:productId',CustomerController.getProductById)

router.get('/listProducts/lowtohigh',CustomerController.lowtoHigh);

router.get('/listProducts/hightoLow',CustomerController.hightoLow);

module.exports=router;

/*


 * List the products based on the category

 * List the products based on the seller

 * price range


*/










