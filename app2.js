"use strict"
const express = require("express");
const app = express();

app.param("id",function(req,res,next,value){
	//将针对参数的处理集中在这里,这里的变量value =  req.params.id
	if(value == "001"){
		next();
	}else{
		res.send(404);
	}
})

//如果app下的param有多个的话, 可以写为数组形式,不推荐这样写, 因为param会执行2次, 你不知道何时value为id 何时为name, 建议几个参数写几次
//app.param(["id","name"],function(req,res,next,value))

//如果有多个参数就写多个param函数, 不推荐数组形式
// app.param("name",function(req,res,next,value){
// 	//将针对参数的处理集中在这里,这里的变量value =  req.params.id
// 	if(value == "001"){
// 		next();
// 	}else{
// 		res.send(404);
// 	}
// })


//:id路由的参数
app.get("/users/:id",function(req,res){
	//一般来说处理路由的参数都会堆积在这里,epxress有专门对参数处理的方式: app.param
	res.send("hello,you id is "+req.params.id);
})

app.listen(3000)