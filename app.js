"use strict"
var express = require("express");



//创建一个子路由
var  router = express.Router();


//定义该路由行为,像app一样, 有get和post方法.
//但是这种子路由和路由是有区别的, 相对于use方法的地址(/router1)
//相当于localhost:3000/router1能访问到
router.get("/",function(req,res){
	res.send("router1");	
})

//相当于localhost:3000/router1/url1能访问到
router.get("/url1",function(req,res){
	res.send("url1 text");
})
//创建一个app 
var app = express();

//使用该路由
app.use("/router1",router);


//创建一个中间键函数
function textmiddleware(req,res,next){
	console.log("text middleware!!!!");
	next();
}
//让app使用这个中间键, 也就是说, 访问任何路径都会调用该中间件内的函数,需要在有send方法的调用之前触发该中间件,在next()了
//不然send一调用, 也就无法触发中间件了
app.use(textmiddleware);

//路由
app.get("/",function(req,res){
	res.send("hello world!!!!");
})


var  router2 =express.Router();
//获得参数的属性 有冒号在内部会根据路径的信息会转化一个叫params的josn对象中. 
router2.get("/users/:name",function(req,res,next){
	//通过req.param.name可以获取到url路径中对应:name的值
	let name  =  req.params.name;
	res.send(`你的名字叫 ${name}`);

})
//在制定的路径下使用这个路由
app.use("/",router2);


//根据需要创建路由时,进行配置
//在默认情况下,该路由(router3)是无法获取到上一个路由(router2)的params的,如果要获得的话,需要对该路由进行一下配置
var router3 = express.Router({
	//合并参数:默认false不合并, true即将获取上一个路由的params
	mergeParams:true,
	//匹配的路径是否区分大小写, 默认是false不区分,
	caseSensitive:false,
	//是否打开路径严格模式,即最后带/的和没有/是否是同一个,默认是false不打开,
	strict:false
});

//同样的,app也可以像router一样的配置,APP开启的话, 范围则是全局
//设置打开严格模式
app.set("strict routing",true);
//设置大小写敏感
app.set("case sensitive routing",true);


router3.get("/age",function(req,res){
	let name = req.params.name;

	res.send(`你的名字叫${name},年龄是30`);
})

app.use("/users/:name",router3);



app.listen(3000)