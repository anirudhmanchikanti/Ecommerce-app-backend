var express=require('express');
var mongoose= require('mongoose');


var app=express();

var CustomerRouter=require('./routes/customer.route');
var AdminRouter= require('./routes/admin.route');
var Config= require('./config');
var cors = require('cors');


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
app.use(cors());

app.use('/customer',CustomerRouter);
app.use('/admin',AdminRouter);

app.get('/healthcheck', (req,res) => {
res.send({'message':' app running successfully!'});
})

app.listen(Config.AppConfig.PORT,() => {

    console.log('server started');

})
