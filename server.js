var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var db = require("./models");
app.get("/test", function(req, res) {
    res.json("hello there");
})

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  