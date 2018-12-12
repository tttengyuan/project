const express = require("express")
const http = express();
const adModel = require("./db.js")
const db = new adModel("wish")
const bodyParser = require("body-parser")
http.listen(8080,()=>{
	console.log("开启成功..yuan")
})
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*")
	next()
})
http.use(bodyParser.urlencoded({extended:false}))


//添加
http.get("/add",(req,res)=>{
	let data = req.query;
	data.time = new Date().getTime()
	db.insertOne("note",data,(err,data)=>{
				if(err) throw err;
				res.send(data)
	})
})
//全部
http.get("/msg",(req,res)=>{
	db.find("note",{},(err,data)=>{
		res.send(data)
	})
})
//删除
http.get("/del",(req,res)=>{
	let id = req.query.id
	db.deleteById("list",id,(err,data)=>{
		res.send(data)
	})
})
//变色
http.get("change",(req,res)=>{
	let id = req.query.id;
	let data = req.query;
	db.updateById("note",id,data,(err,data)=>{
//		if(err) throw err;
		res.send(data)
	})
})
