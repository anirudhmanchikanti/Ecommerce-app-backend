var express=require('express');
var mongoose= require('mongoose');

var app=express();

var CustomerRouter=require('./routes/customer.route');

mongoose.connect('mongodb+srv://sai:sai@cluster0.1wqya.mongodb.net/ecommerce?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true},(err) => {
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


app.listen(3000,() => {

    console.log('server started');

})
