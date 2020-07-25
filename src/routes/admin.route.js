var express = require('express');
var router=express.Router();

var AdminController= require('../controllers/admin.controller');

var Authentication=require('../middleware/authentication.middleware');


router.post('/register',AdminController.register);
router.post('/login',AdminController.login);
router.post('/addProduct',Authentication.verifyToken,AdminController.addProduct);
router.put('/updateProduct/:productId',Authentication.verifyToken,AdminController.updateProduct)
router.delete('/deleteProduct/:productId',Authentication.verifyToken,AdminController.deleteProduct)
router.get('/listProducts',Authentication.verifyToken,AdminController.listProducts);



module.exports=router;