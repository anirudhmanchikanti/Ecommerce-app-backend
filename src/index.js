var express=require('express');
var mongoose= require('mongoose');


var app=express();

var CustomerRouter=require('./routes/customer.route');
var Config= require('./config');


mongoose.connect(Config.AppConfig.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true},(err) => {
    if(err){
        console.log('error',err);
    }
    else
    {
        console.log('db connected');
    }
})

app.use(express.json());

app.use('/customer',CustomerRouter);

app.get('/healthcheck', (req,res) => {
res.send({'message':' app running successfully!'});
})


app.listen(Config.AppConfig.PORT,() => {

    console.log('server started');

})
