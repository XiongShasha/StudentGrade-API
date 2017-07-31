/**
 * Created by xiongshasha on 17-7-27.
 */
"use strict";
var express = require('express');
var app = express();
var redis = require('redis')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false})
var client = redis.createClient();//获得redis用来存储的数据库client
var count = 0;
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    count++;
    client.set('times', count);
    client.get('times', function(err, reply) {
        res.send(reply);//向服务器发送请求
    });
});

app.get('/postindex.htm',function(req, res){
    res.sendFile(__dirname+'/'+'postindex.html');
})

app.post('/student',urlencodedParser,function(req,res){
    var student = {};
    student.name = req.body.inputname;
    student.id = req.body.inputxuehao;
    student.nation = req.body.inputnation;
    student.klass = req.body.inputklass;
    student.math = req.body.inputmath;
    student.chinese = req.body.inputchinese;
    student.english = req.body.inputenglish;
    student.program = req.body.inputprogram;
    var name=/[\u4e00-\u9fa5]{2,}/;
    var id=/\d{10}/;
    var nation=/[\u4e00-\u9fa5]{2,}/;
    var klass=/\d{1,4}/;
    var math=/\d{1,3}/;
    var chinese=/\d{1,3}/;
    var english=/\d{1,3}/;
    var program=/\d{1,3}/;
    var studentMessageArr=[student.name,student.id,student.nation,student.klass,student.math,student.chinese,student.english,student.program];
     var reg =[name,id,nation,klass,math,chinese,english,program];
    var isCorrectFormat;
    for (let index in reg){
        isCorrectFormat = reg[index].test(studentMessageArr[index]);
        if(!isCorrectFormat){
            res.send('please input in the correct format ! ');
            res.status(404);
            break;
        }
    }
    if(isCorrectFormat){
        client.set(req.body.inputxuehao,JSON.stringify(student));
        client.get(req.body.inputxuehao, function(err, reply) {
            res.send(reply);
        });
    }
});

app.post('/students',urlencodedParser,function(req,res){
    let studentxuehao = req.body.xuehao
    studentxuehao = studentxuehao.split(',');
    client.mget(studentxuehao,function(err,reply){
        res.send(JSON.stringify(reply));
    });

});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});//监听端口8081