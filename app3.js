//利用处理器链组来实现数据库和路由分离
"use strict"
const express = require("express");
const app = express();

//同名的时候, 可以通过next()顺序依次执行,直到调用res.send 这样就可以实现分离
app.get('/',function(req,res,next){
	console.log("1");
	next();
})
app.get('/',function(req,res,next){
	console.log("2");
	next();
})

app.get("/",function(req,res){
	console.log("3");
	res.send("hello");

})

//也可以通过这样
app.get("/app",
	function(req,res,next){
		console.log(1);
		next();
	},function(req,res,next){
		console.log(2);
		next();
}	,function(req,res,next){
		console.log("3");
		res.send("hello app");
})

//通过这种方式就可以实现了
//比如:在加载首页时, 还需要从数据库中获取数据
// getData(req,res,next){
// 	在这个方法里可以进行数据获取, 最后next返回
// 	//next()
// }

// app.get("/",getData(),function(req,res.next){
// 	//这里直接拿到数据进行渲染
// 	//res.render("")
// })


app.listen(3000)

