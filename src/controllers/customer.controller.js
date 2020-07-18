var jwt= require('jsonwebtoken');

var CustomerModel=require('../models/customer.model');

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
             
            res.status(200).send({token:token});
        }
      })
}