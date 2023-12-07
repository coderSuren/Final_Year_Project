require('dotenv').config();
const express= require("express")
const https= require("https");
const bodyParser= require("body-parser");
const { log } = require('util');
const app= express();


app.set('view engine','ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("index");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is runninng on port 3000");
});