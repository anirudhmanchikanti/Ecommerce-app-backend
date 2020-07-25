var mongoose= require('mongoose');

  var Schema=mongoose.Schema;

var AdminSchema =new Schema({
          emailId: {
              type:String,
              index:true,
              unique:true,
              required:[true,'emailID required']
          },
          password: {
              type:String,
              required:[true,'password required']
          }
    });

module.exports=mongoose.model('admin',AdminSchema);