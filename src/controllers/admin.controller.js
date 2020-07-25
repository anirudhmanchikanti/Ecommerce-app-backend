var jwt= require('jsonwebtoken');
var AdminModel= require('../models/admin.model');
var EmailService= require('../services/email.service');
var ProductModel= require('../models/product.model');

exports.register= (req,res) => {

    var adminDetails=req.body;

    var newAdmin=new AdminModel(adminDetails);

    newAdmin.save((err,doc) => {

      if(err){
          console.log(err);
          res.send(err);
      }
      else
      {

            var payload={subject:doc._id};
             
            var token=jwt.sign(payload,'seckey');

           var mailOptions={
              from: 'noreply@ecommerce.com',
              to: adminDetails.emailId,
              subject: "Thanks for Registration and Verify Email",
              html:`
              
                    <html>

                      <h1>You have successfully registered as Admin</h1>

                    </html>
              
              `
            };

             EmailService.sendEmail(mailOptions);
             
           
          res.status(200).send({token:token});
      }
    })
}

exports.addProduct=(req,res) => {

    var product=req.body;

    console.log('control comes here');

    var newProduct= new ProductModel(product);

     newProduct.save((err,p) => {
         if(err){
             res.send({'message':err.message})
         }
         else
         if(p){
              res.status(200).send({'message':'product saved successfully'});
         }
     })
}

exports.updateProduct=(req,res) => {

    var productId=req.params.productId;
    console.log('pid',productId);
     var body=req.body;
     console.log('here in update product',body);

    ProductModel.find({productId:productId},(err,product) => {
        if(err){
            res.send(err.message)
        }
        else
        {
            console.log('product',product);
        if(product.length !=0){
            ProductModel.updateOne({productId:productId},body,(err,raw) => {
                  console.log('raw',raw);
                if(err){
                    res.send('error',err.message);
                }
                if(raw.nModified == 1){
                     res.send('product modified');
                }
                else
                {
                    res.send('updating product is failed');
                }
            })
        }
        else
        {
           
                res.send('product not found');
        }
    }
        
    })






}

exports.deleteProduct = (req,res) => {

}

exports.listProducts= (req,res) =>{

}


exports.login=(req,res) => {

    var admin=req.body;
  
    AdminModel.findOne({emailId:admin.emailId}, (err,doc) => {
      if(err){
        console.log(err);
      }
      else
      {
         if(doc){
              if(doc.password === admin.password){
                   
                var payload={subject:doc._id};
                 
                var token=jwt.sign(payload,'seckey');
  
                res.status(200).send(token);
              }
              else
              {
                res.send({'message':'incorrect password'})
              }
         }
         else
         {
            res.send({'message':'emailid does not exist'})
         }
      }
    })
  }