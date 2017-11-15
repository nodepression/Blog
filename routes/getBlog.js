module.exports = function () {
    var express = require('express');
    var fs = require('fs');
    var mysql = require('mysql');
    var config = require('../config.js');

    var router = express.Router();
    //建立数据库连接
    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
    });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });


    //use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理
    router.use(function (req, res, next) {
        console.log("处于login路由。方式: " + req.method, "URL: " + req.url);
        next();
    });
    // router.get('/', function (req, res) {
    //     fs.createReadStream("./public/login.html").pipe(res);
    // });

    //得到最近发的博客
    router.get('/recent', function (req, res) {
        var getInfo = 'select * from article';
        connection.query(getInfo, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message); 
            } else {
                var myData = { "status": "200", "message": "ok","data":result}
                console.info("操作成功")
                res.json(myData);
            }
        });
    });

    return router;
}    