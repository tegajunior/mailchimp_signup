//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var userEmail = req.body.email;
  console.log(firstName + " " + lastName + " " + userEmail);
   var data = {
     members:[
       {
         email_address: userEmail,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
   };
const jsonData = JSON.stringify(data);
const url = "https://us4.api.mailchimp.com/3.0/lists/13f272d0d3";
const options = {
  method: "POST",
  auth: "chidiebere:c8c16e45f2c27978566f41e6a474dae9-us4"
};
 const request = https.request(url, options, function(response) {
    const statusCode = response.statusCode;
    if (statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  response.on("data", function (data) {
    console.log(JSON.parse(data));

  });
});

request.write(jsonData);
request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000");
});


//Mailchimp API Key   c8c16e45f2c27978566f41e6a474dae9-us4
//Mailchimp List ID   13f272d0d3
