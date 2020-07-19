var jwt= require('jsonwebtoken');
exports.verifyToken =(req,res,next) =>{
    //check whether the user has sent any token or not.
    console.log('request',req);
   if(!req.headers.authorization){
       return res.status(401).send('unauthorized request');
   }
   console.log(req.headers.authorization);
   let token= req.headers.authorization.split(' ')[1];
   console.log(token);
   if(token == 'null'){
       console.log("inside");
    return res.status(401).send('unauthorized request');
}
   jwt.verify(token,'seckey', (error, payload)=> {
       console.log('payload',payload);
          if(error){
              console.log("message",error.message);
              res.status(401).send(error.message);
          }
          else
          { 
              req.payload=payload;
              next();
          }
   });
}