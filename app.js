var express=require('express');
var app=express();

process.on('uncaughtException',function(err){
    console.log('node exiting')
    console.log(err);
    console.log(err.stack);
});
app.set('port',process.env.PORT||3000);
var firstmiddleware=function(req,res,next){
    console.log('first middleware');
    next();
};

var secondmiddleware=function(req,res,next){
    console.log('second middleware');
    res.send('second middleware gave a response');
};

var thirdmiddleware=function(req,res,next){
    console.log('third middleware');
   next();
};


var abouthandler=function(req,res,next){
    console.log(req.url);
    res.send('This is a new project from Nunoo');
};

app.use(thirdmiddleware);

app.get('/',firstmiddleware,secondmiddleware);
app.get('/about',abouthandler);

app.listen(app.get('port'));