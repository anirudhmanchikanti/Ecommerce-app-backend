var jwt= require('jsonwebtoken');
var AdminModel= require('../models/admin.model');
var EmailService= require('../services/email.service');
var ProductModel= require('../models/product.model');
const productModel = require('../models/product.model');
const adminModel = require('../models/admin.model');

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

exports.changeProfile= (req,res) => {
  var _id=req.payload.subject;
  console.log("_id:",_id);
  
  var e_emailId=req.body.e_emailId;
  var n_emailId=req.body.n_emailId;

      if(e_emailId === n_emailId){
        res.send({'message':'existing profile and new profile cannot be same'});
        return;
      }

  adminModel.findOne({_id:_id},(err, doc) => {
    console.log("doc:",doc);
    if(err){
      console.log('error',err);
      
    }
     if(doc){
         if(doc.emailId ===  e_emailId) {
              adminModel.updateOne({_id:_id},{emailId: n_emailId}, (err, raw) =>{
                
                 if(err){
                     console.log(err);
                 }
                 else
                 {
                   if(raw.nModified == 1){
                      
                       res.send({'message':'profile updated'});
                   }
                   else
                   {
                     console.log('raw',raw);
                     res.send({'message':'unable to update the profile'});
                   }
                 }

              })
         }
         else
         {
           res.send({'message':'profile does not match'});
         }
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

  productId=req.params.productId;
  console.log("productId:",productId)
  ProductModel.find({productId:productId},(err, doc) => {
    if(err){
      console.log('error',err);
    }
    
    else
    if(doc){
      ProductModel.deleteOne({productId:productId},(error,raw)=>{
        if(error){
          console.log("cant delete product")
        }
        else{
      res.status(200);
      res.send({status: 'deleted successfully'});
    }
      })
    }
  })

}

exports.listProducts=(req,res) =>{

  console.log('list products');

  ProductModel.find({},(err,docs) =>{

     if(err){
       console.log(err.message);
       res.send({ 'message':err.message })
     }
     else
     {
       res.send(docs);
     }
  })
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