var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var cors = require('cors')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customer=require('./routes/customer');




var app = express();
app.use(cors())

mongoose.connect('mongodb://localhost:27017/nodeCrud',(err)=>{
    if(err)
        console.log(err)
    else
        console.log("Server currently running on port 3000")
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer', customer);

module.exports = app;
