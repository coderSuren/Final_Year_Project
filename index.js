require('dotenv').config();
const express= require("express")
const https= require("https");
const bodyParser= require("body-parser");
const { log } = require('util');
const app= express();
const MetaMaskSDK = require('@metamask/sdk');

var db = require('./public/js/database.js')
var setTimeout=require("node:timers/promises");

app.set('view engine','ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// app.get("/",function(req,res){
//   res.render("login");  
// })

// const MMSDK = new MetaMaskSDK({checkInstallationImmediately: true});
// const ethereum = MMSDK.getProvider(); 

app.get("/",function(req,res){
  res.render("login",{display:"None", errorMessage: ""});
})

app.post("/login",function(req,res){
  login_result = db.query_login(req.body.username, req.body.password, function(status) {
    if (status) {
      console.log("Logged In!");
      // ethereum.request({ method: 'eth_requestAccounts', params: [] });
      res.render("index");   
    }
    else {
      console.log("Failed to log in!");
      res.render("login", {display:"block", errorMessage: "Incorrect Password"}); 
    }
  });
});

app.get('/setup', (req, res) => {

  const address = req.query.wallet
  app.locals.address = address

  console.log(app.locals.address)

  res.redirect('/')

})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is runninng on port 3000");
});