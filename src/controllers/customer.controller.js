var jwt= require('jsonwebtoken');

var CustomerModel=require('../models/customer.model');
var EmailService= require('../services/email.service');
var ProductModel= require('../models/product.model');

exports.register= (req,res) => {

   var customer=req.body;

    var newCustomer=new CustomerModel(customer);

      newCustomer.save((err,doc) => {

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
                to: customer.emailId,
                subject: "Thanks for Registration and Verify Email",
                html:`
                
                      <html>

                        <body>
                          
                            <a target='_blank' href="http://localhost:3000/customer/verifyEmail">Verify Email</a>

                        </body>

                      </html>
                
                `
              };

               EmailService.sendEmail(mailOptions);
               
             
            res.status(200).send({token:token});
        }
      })
}

exports.signup= (req,res) => {

  var customer=req.body;

   var newCustomer=new CustomerModel(customer);

     newCustomer.save((err,doc) => {

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
               to: customer.emailId,
               subject: "Thanks for Registration and Verify Email",
               html:`
               
                     <html>

                       <body>
                         
                           <a target='_blank' href="http://localhost:3000/customer/verifyEmail">Verify Email</a>

                       </body>

                     </html>
               
               `
             };

              EmailService.sendEmail(mailOptions);
              
            
           res.status(200).send({token:token});
       }
     })
}
exports.verifyEmail=(req,res) => {

  var emailId=req.body.emailId;

    CustomerModel.findOne({emailId:emailId}, (err,doc) => {

            if(err){
              console.log(err);
            }
            else
            {
              if(!doc){
                res.send({'message':'This email is not registered with us!'});
              }
              else
              {
                 if(doc.isEmailVerified){
                  res.send({'message':'This email is already verified!'});
                 }
                 else
                 {
                   CustomerModel.updateOne({emailId:emailId},{isEmailVerified:true},(err,raw) => {
                    if(err){
                          console.log(err);
                        }
                        else{

                            console.log('raw',raw);
                            if(raw.nModified == 1){
                              res.send({message:'email verified'});
                            }
                            else
                            {
                              res.send({message:'some problem in verifying email'});
                            }
                          }
                   })
                 }
              }
              
            }
           
    })
}

exports.login=(req,res) => {

  var user=req.body;

  CustomerModel.findOne({emailId:user.emailId}, (err,doc) => {
    if(err){
      console.log(err);
    }
    else
    {
       if(doc){
            if(doc.password === user.password){
                 
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

exports.changePassword= (req,res) => {
    var _id=req.payload.subject;
    var e_password=req.body.e_password;
    var n_password=req.body.n_password;

        if(e_password === n_password){
          res.send({'message':'existing password and new password cannot be same'});
          return;
        }
  
    CustomerModel.findOne({_id:_id},(err, doc) => {
      if(err){
        console.log('error',err);
      }
       if(doc){
           if(doc.password ===  e_password) {
                CustomerModel.updateOne({_id:_id},{password: n_password}, (err, raw) =>{
                  
                   if(err){
                       console.log(err);
                   }
                   else
                   {
                     if(raw.nModified == 1){
                        
                         res.send({'message':'password updated'});
                     }
                     else
                     {
                       console.log('raw',raw);
                       res.send({'message':'unable to update the password'});
                     }
                   }

                })
           }
           else
           {
             res.send({'message':'password does not match'});
           }
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

exports.getProductById=(req,res) => {
       var productId=req.params.productId;
  ProductModel.findOne({productId:productId}, (err, document) => {

    if(err){
      console.log(err.message);
      res.send({ 'message':err.message })
    }
    else
    if(document)
    {
      res.send(document);
    }
    else
    {
      res.send('Product not found');
    }

  })
}

exports.lowtoHigh=(req,res) => {

  ProductModel.find({}).sort({'price':1}).exec((err, docs) => {
    if(err){
      console.log(err);
      res.send(err.message);
    }
    else
    {
       if(docs){
         res.send(docs);
       }
       else
       {
         res.send('no products');
       }
    }
  })

}

exports.hightoLow=(req,res) =>{

  ProductModel.find({}).sort({'price':-1}).exec((err, docs) => {
    if(err){
      console.log(err);
      res.send(err.message);
    }
    else
    {
       if(docs){
         res.send(docs);
       }
       else
       {
         res.send('no products');
       }
    }
  })

}