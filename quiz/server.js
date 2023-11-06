const express=require("express");
const app=express();
const path=require("path");

port=process.env.PORT||8080;
address="0.0.0.0";

app.use(express.static(path.join(__dirname,"quizstatic")));

app.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname,"quiz.html"));
})

app.listen(port,address,e=>{
	console.log(" server running on "+address+" "+port);
})