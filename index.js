var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var cookieParser = require('cookie-parser');



//自己定义的router
var index   = require('./routes/index.js')();
var getBlog = require('./routes/getBlog.js')();
var app = express();
app.use(express.static('public'));
app.use(cookieParser());

// app.use(bodyParser.urlencoded({ extended: false }));//解析请求体
app.use('/', index);//对所有路径应用这个路由
app.use('/blog', getBlog);
//app.use('/manager', manager);//对/manager应用这个路由


app.listen(3000);
console.log("服务器已启动")