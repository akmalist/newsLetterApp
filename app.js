// jshint esversion:6

const  express = require("express");
const bodyParser = require("body-parser");
const request =require("request");

const app = express();
app.use(express.static("public")); // we create a folder called public and it will be accesed by using Static for files that we have on our computer locally
app.use(bodyParser.urlencoded({extended:true})); // in order to use bodyParser

app.get("/", function(req,res){ // when people get to our page theuy get to home page "/"
  res.sendFile(__dirname + "/signup.html"); // when we request the home rout from our server the it should deliver the file signup.html
});  // ___dirname its usually Desktop/Newsletter/signup.html


app.post("/", function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }

      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/c760f99081", // make sure to inclide your list ID after /lists/ it can be found in your created list settings
    // also make sure to change the //usX/ with USand whatever number you get from api KEY
    method: "POST", // defaul method is GET so we need to change this to post
    headers:{
    "Authorization":"Aki1 953b554d0bb234cfdeef1977bd0c0143-us20"
  },
    body: jsonData

  };

  request(options, function(error, response, body){
    if(error){
          res.sendFile(__dirname + "/failure.html"); //sending failure.html page
    }else {
      if(response.statusCode===200){
          res.sendFile(__dirname + "/sucess.html"); //sending sucess.html page

  }else{
         res.sendFile(__dirname+ "/failure.html"); //sending failure.html page
  }

    }
  });


});


app.post("/failure",function(req,res){
res.redirect("/");
});   //redirects from failure page to home page on html

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// API KEY
// 953b554d0bb234cfdeef1977bd0c0143-us20


//list id:
// c760f99081
