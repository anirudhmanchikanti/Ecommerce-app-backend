var mongoose= require('mongoose');

  var Schema=mongoose.Schema;

var ProductSchema =new Schema({
          productId: {
              type:Number,
              index:true,
              unique:true,
              required:[true,'productId required']
          },
          name: {
              type:String,
              required:[true,'name required']
          },
          price : {
              type:Number,
              required:[true,'price required']
          },
          imagUrl:{
              type:String,
              required:[true,'Image URL Required']
          },
          category:{
              type:String,
              required: [true,'Category Required']
          },
          color:{
              type:String,
              required:[true,'Color Required']
          },
          seller:{
              type:String,
              required: [true,'seller required']
          },
          specifications:{
              type:Array,
              required:[true,'specification required']
          }
    });

module.exports=mongoose.model('product',ProductSchema);